import { useState, useEffect, useRef, useCallback } from 'react'
import { idbGetAll, idbPut, idbDelete } from '../utils/store.js'

// Toolbar actions use the browser's rich-text editing on a contentEditable area.
const exec = (cmd, val = null) => document.execCommand(cmd, false, val)

const tools = [
  { cmd: 'formatBlock', val: 'H1', label: 'H1', title: 'Heading 1' },
  { cmd: 'formatBlock', val: 'H2', label: 'H2', title: 'Heading 2' },
  { cmd: 'formatBlock', val: 'H3', label: 'H3', title: 'Heading 3' },
  { cmd: 'formatBlock', val: 'P', label: '¶', title: 'Normal text' },
  { sep: true },
  { cmd: 'bold', label: 'B', title: 'Bold (Ctrl+B)', style: { fontWeight: 800 } },
  { cmd: 'italic', label: 'I', title: 'Italic (Ctrl+I)', style: { fontStyle: 'italic' } },
  { cmd: 'underline', label: 'U', title: 'Underline', style: { textDecoration: 'underline' } },
  { cmd: 'strikeThrough', label: 'S', title: 'Strikethrough', style: { textDecoration: 'line-through' } },
  { cmd: 'hiliteColor', val: '#fde68a', label: '🖍', title: 'Highlight' },
  { sep: true },
  { cmd: 'insertUnorderedList', label: '• List', title: 'Bullet list' },
  { cmd: 'insertOrderedList', label: '1. List', title: 'Numbered list' },
  { cmd: 'todo', label: '☑ To-do', title: 'Insert checkbox' },
  { cmd: 'formatBlock', val: 'BLOCKQUOTE', label: '❝ Quote', title: 'Quote' },
  { cmd: 'formatBlock', val: 'PRE', label: '{ } Code', title: 'Code block' },
  { sep: true },
  { cmd: 'createLink', label: '🔗 Link', title: 'Add link' },
  { cmd: 'removeFormat', label: '⌫ Clear', title: 'Clear formatting' },
]

const empty = () => ({
  id: 'note-' + Date.now(),
  title: 'Untitled note',
  html: '',
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

export default function MyNotes() {
  const [notes, setNotes] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [savedTick, setSavedTick] = useState(0)
  const editorRef = useRef(null)
  const saveTimer = useRef(null)

  const active = notes.find((n) => n.id === activeId) || null

  // Load notes on mount.
  useEffect(() => {
    ;(async () => {
      const saved = await idbGetAll('notes')
      const sorted = saved.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      setNotes(sorted)
      setActiveId(sorted.length ? sorted[0].id : null)
      setLoaded(true)
    })()
  }, [])

  // When the active note changes, load its HTML into the editor (imperatively, to keep the caret sane).
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = active ? active.html : ''
  }, [activeId]) // eslint-disable-line react-hooks/exhaustive-deps

  const persist = useCallback(async (note) => {
    await idbPut('notes', note)
    setSavedTick((t) => t + 1)
  }, [])

  const scheduleSave = useCallback(() => {
    if (!activeId) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => {
      const html = editorRef.current ? editorRef.current.innerHTML : ''
      setNotes((list) => {
        const updated = list.map((n) => (n.id === activeId ? { ...n, html, updatedAt: Date.now() } : n))
        const note = updated.find((n) => n.id === activeId)
        if (note) persist(note)
        return updated
      })
    }, 500)
  }, [activeId, persist])

  function newNote() {
    const n = empty()
    setNotes((list) => [n, ...list])
    setActiveId(n.id)
    persist(n)
    setTimeout(() => editorRef.current && editorRef.current.focus(), 0)
  }

  function selectNote(id) {
    // flush any pending save before switching
    if (saveTimer.current) {
      clearTimeout(saveTimer.current)
      const html = editorRef.current ? editorRef.current.innerHTML : ''
      setNotes((list) => list.map((n) => (n.id === activeId ? { ...n, html } : n)))
    }
    setActiveId(id)
  }

  async function deleteNote(id, e) {
    if (e) e.stopPropagation()
    const n = notes.find((x) => x.id === id)
    if (!window.confirm(`Delete note “${n ? n.title : ''}”? This cannot be undone.`)) return
    await idbDelete('notes', id)
    setNotes((list) => {
      const rest = list.filter((x) => x.id !== id)
      if (activeId === id) setActiveId(rest.length ? rest[0].id : null)
      return rest
    })
  }

  function onTitle(e) {
    const title = e.target.value
    setNotes((list) => {
      const updated = list.map((n) => (n.id === activeId ? { ...n, title, updatedAt: Date.now() } : n))
      const note = updated.find((n) => n.id === activeId)
      if (note) persist(note)
      return updated
    })
  }

  function runTool(t) {
    editorRef.current && editorRef.current.focus()
    if (t.cmd === 'todo') {
      exec('insertHTML', '<div class="todo"><input type="checkbox" contenteditable="false"> </div>')
    } else if (t.cmd === 'createLink') {
      const url = window.prompt('Enter the link URL (https://...)')
      if (url) exec('createLink', url)
    } else {
      exec(t.cmd, t.val)
    }
    scheduleSave()
  }

  // Keep checkbox states in the saved HTML, and let checkboxes toggle inside the editor.
  function onEditorClick(e) {
    const el = e.target
    if (el && el.tagName === 'INPUT' && el.type === 'checkbox') {
      if (el.checked) el.setAttribute('checked', '')
      else el.removeAttribute('checked')
      scheduleSave()
    }
  }

  if (!loaded) {
    return (
      <div className="page-head">
        <h2>📝 My Notes</h2>
        <p className="muted">Loading your notes…</p>
      </div>
    )
  }

  return (
    <div>
      <div className="page-head">
        <h2>📝 My Notes</h2>
        <p>
          Your own Notion / Obsidian-style notebook — write anything, format it, and it saves
          automatically on this device. Create as many notes as you like; delete any of them.
        </p>
      </div>

      <div className="notebook">
        {/* Sidebar list */}
        <aside className="nb-list">
          <button className="btn btn-download nb-new" onClick={newNote}>
            ＋ New note
          </button>
          {notes.length === 0 && <p className="muted" style={{ padding: '4px 6px' }}>No notes yet.</p>}
          {notes.map((n) => (
            <div
              key={n.id}
              className={'nb-item' + (n.id === activeId ? ' active' : '')}
              onClick={() => selectNote(n.id)}
            >
              <div className="nb-item-main">
                <div className="nb-title">{n.title || 'Untitled note'}</div>
                <div className="nb-date">{new Date(n.updatedAt).toLocaleDateString()}</div>
              </div>
              <span className="nb-del" title="Delete note" onClick={(e) => deleteNote(n.id, e)}>
                🗑
              </span>
            </div>
          ))}
        </aside>

        {/* Editor */}
        <section className="nb-editor panel">
          {!active ? (
            <div className="nb-empty">
              <p>✍️ No note open.</p>
              <button className="btn btn-download" onClick={newNote}>
                ＋ Create your first note
              </button>
            </div>
          ) : (
            <>
              <input
                className="nb-title-input"
                value={active.title}
                onChange={onTitle}
                placeholder="Note title"
              />

              <div className="nb-toolbar">
                {tools.map((t, i) =>
                  t.sep ? (
                    <span className="nb-sep" key={'s' + i} />
                  ) : (
                    <button
                      key={t.label + i}
                      className="nb-tool"
                      title={t.title}
                      style={t.style}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => runTool(t)}
                    >
                      {t.label}
                    </button>
                  ),
                )}
                <button
                  className="btn btn-delete nb-delete"
                  onClick={() => deleteNote(active.id)}
                  title="Delete this note"
                >
                  🗑 Delete
                </button>
              </div>

              <div
                ref={editorRef}
                className="nb-content"
                contentEditable
                suppressContentEditableWarning
                onInput={scheduleSave}
                onClick={onEditorClick}
                data-placeholder="Start writing… use the toolbar for headings, lists, to-dos, code and more."
              />
              <div className="nb-saved">{savedTick > 0 ? 'Saved ✓' : 'Auto-saves as you type'}</div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
