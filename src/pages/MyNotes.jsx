import { useState, useEffect, useRef, useCallback } from 'react'
import { idbGetAll, idbPut, idbDelete } from '../utils/store.js'
import CodeBlock from '../components/CodeBlock.jsx'

/* ---------------- helpers ---------------- */
const uid = () => 'b' + Math.random().toString(36).slice(2, 9)
const newBlock = (type = 'p', extra = {}) => ({ id: uid(), type, html: '', ...extra })
const newNote = () => ({
  id: 'note-' + Date.now(),
  title: 'Untitled note',
  blocks: [newBlock('p')],
  createdAt: Date.now(),
  updatedAt: Date.now(),
})

function placeCaret(el, atStart = false) {
  if (!el) return
  el.focus()
  const range = document.createRange()
  const sel = window.getSelection()
  range.selectNodeContents(el)
  range.collapse(atStart)
  sel.removeAllRanges()
  sel.addRange(range)
}
function caretAtStart(el) {
  const sel = window.getSelection()
  if (!sel.rangeCount) return false
  const r = sel.getRangeAt(0)
  const pre = r.cloneRange()
  pre.selectNodeContents(el)
  pre.setEnd(r.startContainer, r.startOffset)
  return pre.toString().length === 0
}
function splitAtCaret(el) {
  const sel = window.getSelection()
  if (!sel.rangeCount) return ''
  const r = sel.getRangeAt(0)
  const after = r.cloneRange()
  after.selectNodeContents(el)
  after.setStart(r.endContainer, r.endOffset)
  const frag = after.extractContents()
  const tmp = document.createElement('div')
  tmp.appendChild(frag)
  return tmp.innerHTML
}

/* ---------------- slash menu options ---------------- */
const SLASH = [
  { type: 'p', icon: '¶', label: 'Text', desc: 'Plain paragraph' },
  { type: 'h1', icon: 'H1', label: 'Heading 1', desc: 'Big title' },
  { type: 'h2', icon: 'H2', label: 'Heading 2', desc: 'Section heading' },
  { type: 'h3', icon: 'H3', label: 'Heading 3', desc: 'Sub-heading' },
  { type: 'bullet', style: 'dot', icon: '•', label: 'Bulleted list', desc: 'Round bullets' },
  { type: 'bullet', style: 'arrow', icon: '▸', label: 'Arrow list', desc: 'Arrow bullets' },
  { type: 'bullet', style: 'dash', icon: '–', label: 'Dashed list', desc: 'Dash bullets' },
  { type: 'number', icon: '1.', label: 'Numbered list', desc: 'Ordered list' },
  { type: 'todo', icon: '☑', label: 'To-do', desc: 'Checklist item' },
  { type: 'quote', icon: '❝', label: 'Quote', desc: 'Quotation' },
  { type: 'callout', icon: '💡', label: 'Callout box', desc: 'Text in a separate box' },
  { type: 'code', icon: '{ }', label: 'Code (runnable)', desc: 'Run Java, Python, C…' },
  { type: 'image', icon: '🖼️', label: 'Image', desc: 'Upload & position' },
  { type: 'divider', icon: '—', label: 'Divider', desc: 'Separator line' },
]

/* ---------------- editable text block ---------------- */
function EditableBlock({ block, register, onChange, onEnter, onBackspace, onSlash, onSlashClose, slashActive, placeholder }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = block.html || ''
      register(block.id, ref.current)
    }
    return () => register(block.id, null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block.id])

  const cls =
    block.type === 'h1' ? 'nb-ed nb-h1'
    : block.type === 'h2' ? 'nb-ed nb-h2'
    : block.type === 'h3' ? 'nb-ed nb-h3'
    : 'nb-ed'

  return (
    <div
      ref={ref}
      className={cls}
      contentEditable
      suppressContentEditableWarning
      data-ph={placeholder}
      onInput={() => {
        onChange(block.id, ref.current.innerHTML)
        const t = ref.current.textContent
        const m = t.match(/^\/(\w*)$/)
        if (m) onSlash(block.id, m[1], ref.current.getBoundingClientRect())
        else onSlashClose()
      }}
      onKeyDown={(e) => {
        if (slashActive && ['Enter', 'ArrowUp', 'ArrowDown', 'Escape', 'Tab'].includes(e.key)) return
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          const after = splitAtCaret(ref.current)
          onChange(block.id, ref.current.innerHTML)
          onEnter(block.id, after)
        } else if (e.key === 'Backspace') {
          if (caretAtStart(ref.current)) {
            e.preventDefault()
            onBackspace(block.id, ref.current.textContent === '')
          }
        }
      }}
    />
  )
}

/* ---------------- slash menu ---------------- */
function SlashMenu({ state, onSelect, onClose }) {
  const [hi, setHi] = useState(0)
  const items = SLASH.filter(
    (o) =>
      !state.query ||
      o.label.toLowerCase().includes(state.query.toLowerCase()) ||
      o.type.includes(state.query.toLowerCase()),
  )
  useEffect(() => setHi(0), [state.query])
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        e.stopPropagation()
        setHi((h) => Math.min(h + 1, items.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        e.stopPropagation()
        setHi((h) => Math.max(h - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        if (items[hi]) onSelect(items[hi])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [items, hi, onSelect, onClose])

  if (!items.length) return null
  return (
    <div className="slash-menu" style={{ top: state.y, left: state.x }}>
      <div className="slash-hint">BLOCKS</div>
      {items.map((o, i) => (
        <div
          key={o.label}
          className={'slash-item' + (i === hi ? ' hi' : '')}
          onMouseEnter={() => setHi(i)}
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(o)
          }}
        >
          <span className="slash-ic">{o.icon}</span>
          <span className="slash-main">
            <b>{o.label}</b>
            <small>{o.desc}</small>
          </span>
        </div>
      ))}
    </div>
  )
}

/* ---------------- image block ---------------- */
function ImageBlock({ block, update, remove }) {
  const inputRef = useRef(null)
  const pick = () => inputRef.current && inputRef.current.click()
  const onFile = (e) => {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => update(block.id, { src: reader.result })
    reader.readAsDataURL(f)
  }
  return (
    <div className={'img-block align-' + (block.align || 'center')}>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFile} />
      {!block.src ? (
        <button className="img-drop" onClick={pick}>
          🖼️ Click to upload an image
        </button>
      ) : (
        <div className="img-wrap" style={{ width: (block.width || 60) + '%' }}>
          <img src={block.src} alt={block.caption || 'note image'} />
          <div className="img-tools">
            <button onClick={() => update(block.id, { align: 'left' })} title="Left">⬅</button>
            <button onClick={() => update(block.id, { align: 'center' })} title="Center">⬛</button>
            <button onClick={() => update(block.id, { align: 'right' })} title="Right">➡</button>
            <input
              type="range"
              min="20"
              max="100"
              value={block.width || 60}
              onChange={(e) => update(block.id, { width: Number(e.target.value) })}
              title="Resize"
            />
            <button onClick={() => remove(block.id)} title="Remove">🗑</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---------------- main ---------------- */
export default function MyNotes() {
  const [notes, setNotes] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [slash, setSlash] = useState({ open: false, blockId: null, query: '', x: 0, y: 0 })
  const [inlineTB, setInlineTB] = useState({ show: false, x: 0, y: 0 })
  const blockEls = useRef({})
  const pendingFocus = useRef(null)
  const saveTimer = useRef(null)
  const imgPending = useRef(null)

  const active = notes.find((n) => n.id === activeId) || null

  useEffect(() => {
    ;(async () => {
      let saved = await idbGetAll('notes')
      saved = saved.map((n) => (n.blocks ? n : { ...n, blocks: [newBlock('p', { html: n.html || '' })] }))
      saved.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
      setNotes(saved)
      setActiveId(saved.length ? saved[0].id : null)
      setLoaded(true)
    })()
  }, [])

  // apply queued focus after renders
  useEffect(() => {
    if (pendingFocus.current) {
      const { id, atStart } = pendingFocus.current
      pendingFocus.current = null
      requestAnimationFrame(() => placeCaret(blockEls.current[id], atStart))
    }
  })

  const registerRef = useCallback((id, el) => {
    if (el) blockEls.current[id] = el
    else delete blockEls.current[id]
  }, [])

  const persist = useCallback((note) => {
    idbPut('notes', note)
  }, [])

  const scheduleSave = useCallback(
    (note) => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      const n = { ...note, updatedAt: Date.now() }
      saveTimer.current = setTimeout(() => persist(n), 500)
      return n
    },
    [persist],
  )

  // update the active note's blocks
  const mutate = useCallback(
    (fn, { immediate } = {}) => {
      setNotes((list) => {
        const idx = list.findIndex((n) => n.id === activeId)
        if (idx < 0) return list
        const note = { ...list[idx], blocks: fn(list[idx].blocks), updatedAt: Date.now() }
        const copy = [...list]
        copy[idx] = note
        if (immediate) persist(note)
        else scheduleSave(note)
        return copy
      })
    },
    [activeId, persist, scheduleSave],
  )

  const onChangeBlock = useCallback(
    (id, html) => mutate((blocks) => blocks.map((b) => (b.id === id ? { ...b, html } : b))),
    [mutate],
  )
  const updateBlock = useCallback(
    (id, patch) => mutate((blocks) => blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)), { immediate: true }),
    [mutate],
  )

  function onEnter(id, afterHtml) {
    // set current block DOM to leading part already handled by splitAtCaret
    const nb = newBlock('p', { html: afterHtml || '' })
    mutate((blocks) => {
      const i = blocks.findIndex((b) => b.id === id)
      const copy = [...blocks]
      copy[i] = { ...copy[i], html: blockEls.current[id] ? blockEls.current[id].innerHTML : copy[i].html }
      copy.splice(i + 1, 0, nb)
      return copy
    })
    pendingFocus.current = { id: nb.id, atStart: true }
  }

  function onBackspace(id, isEmpty) {
    mutate((blocks) => {
      const i = blocks.findIndex((b) => b.id === id)
      if (i <= 0) return blocks
      const prev = blocks[i - 1]
      if (prev.type === 'divider' || prev.type === 'image' || prev.type === 'code') {
        if (isEmpty) {
          pendingFocus.current = null
          return blocks.filter((b) => b.id !== id)
        }
        return blocks
      }
      // merge into previous text block
      const prevEl = blockEls.current[prev.id]
      const curHtml = blockEls.current[id] ? blockEls.current[id].innerHTML : blocks[i].html
      const mergedHtml = (prev.html || '') + (isEmpty ? '' : curHtml)
      if (prevEl) prevEl.innerHTML = mergedHtml
      pendingFocus.current = { id: prev.id, atStart: false }
      const copy = blocks.filter((b) => b.id !== id)
      return copy.map((b) => (b.id === prev.id ? { ...b, html: mergedHtml } : b))
    })
  }

  function openSlash(blockId, query, rect) {
    const wrap = document.querySelector('.nb-editor')
    const wr = wrap ? wrap.getBoundingClientRect() : { left: 0, top: 0 }
    setSlash({ open: true, blockId, query, x: rect.left - wr.left, y: rect.bottom - wr.top + 4 })
  }
  const closeSlash = useCallback(() => setSlash((s) => (s.open ? { ...s, open: false } : s)), [])

  function selectSlash(opt) {
    const id = slash.blockId
    setSlash({ open: false, blockId: null, query: '', x: 0, y: 0 })
    if (!id) return
    if (blockEls.current[id]) blockEls.current[id].innerHTML = ''
    if (opt.type === 'divider') {
      const nb = newBlock('p')
      mutate((blocks) => {
        const i = blocks.findIndex((b) => b.id === id)
        const copy = [...blocks]
        copy[i] = { ...copy[i], type: 'divider', html: '' }
        copy.splice(i + 1, 0, nb)
        return copy
      })
      pendingFocus.current = { id: nb.id, atStart: true }
    } else if (opt.type === 'code') {
      updateBlock(id, { type: 'code', html: '', lang: 'python', code: '' })
    } else if (opt.type === 'image') {
      updateBlock(id, { type: 'image', html: '', src: null, align: 'center', width: 60 })
    } else {
      updateBlock(id, { type: opt.type, style: opt.style, html: '', checked: false })
      pendingFocus.current = { id, atStart: true }
    }
  }

  // add a new block after a given one and open slash on it
  function addBlockAfter(id) {
    const nb = newBlock('p')
    mutate((blocks) => {
      const i = blocks.findIndex((b) => b.id === id)
      const copy = [...blocks]
      copy.splice(i + 1, 0, nb)
      return copy
    })
    pendingFocus.current = { id: nb.id, atStart: true }
    setTimeout(() => {
      const el = blockEls.current[nb.id]
      if (el) openSlash(nb.id, '', el.getBoundingClientRect())
    }, 30)
  }

  function removeBlock(id) {
    mutate((blocks) => (blocks.length > 1 ? blocks.filter((b) => b.id !== id) : blocks))
  }

  /* ----- drag to reorder ----- */
  const dragId = useRef(null)
  function onDrop(targetId) {
    const from = dragId.current
    dragId.current = null
    if (!from || from === targetId) return
    mutate((blocks) => {
      const fromI = blocks.findIndex((b) => b.id === from)
      const toI = blocks.findIndex((b) => b.id === targetId)
      if (fromI < 0 || toI < 0) return blocks
      const copy = [...blocks]
      const [moved] = copy.splice(fromI, 1)
      copy.splice(toI, 0, moved)
      return copy
    })
  }

  /* ----- inline formatting toolbar ----- */
  useEffect(() => {
    const onSel = () => {
      const sel = window.getSelection()
      if (!sel || sel.isCollapsed || !sel.rangeCount) {
        setInlineTB((t) => (t.show ? { ...t, show: false } : t))
        return
      }
      const anchor = sel.anchorNode
      const wrap = document.querySelector('.nb-editor')
      if (!wrap || !anchor || !wrap.contains(anchor.nodeType === 3 ? anchor.parentNode : anchor)) {
        setInlineTB((t) => (t.show ? { ...t, show: false } : t))
        return
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      const wr = wrap.getBoundingClientRect()
      setInlineTB({ show: true, x: rect.left - wr.left + rect.width / 2, y: rect.top - wr.top - 42 })
    }
    document.addEventListener('selectionchange', onSel)
    return () => document.removeEventListener('selectionchange', onSel)
  }, [])

  function fmt(cmd, val) {
    document.execCommand(cmd, false, val)
    if (activeId) {
      // save current DOM of focused block
      const el = document.activeElement
      if (el && el.classList && el.classList.contains('nb-ed')) {
        const id = Object.keys(blockEls.current).find((k) => blockEls.current[k] === el)
        if (id) onChangeBlock(id, el.innerHTML)
      }
    }
  }

  /* ----- note-level actions ----- */
  function createNote() {
    const n = newNote()
    setNotes((l) => [n, ...l])
    setActiveId(n.id)
    persist(n)
    pendingFocus.current = { id: n.blocks[0].id, atStart: true }
  }
  function selectNote(id) {
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
      const idx = list.findIndex((n) => n.id === activeId)
      if (idx < 0) return list
      const note = { ...list[idx], title, updatedAt: Date.now() }
      const copy = [...list]
      copy[idx] = note
      scheduleSave(note)
      return copy
    })
  }

  if (!loaded)
    return (
      <div className="page-head">
        <h2>📝 My Notes</h2>
        <p className="muted">Loading…</p>
      </div>
    )

  // numbering for ordered lists
  let numCount = 0

  return (
    <div>
      <div className="page-head">
        <h2>📝 My Notes</h2>
        <p>
          Your own Notion / Word-style workspace. Press <b>/</b> for blocks, upload images, and run
          real code (Java, Python, C…). Everything saves on this device.
        </p>
      </div>

      <div className="notebook">
        <aside className="nb-list">
          <button className="btn btn-download nb-new" onClick={createNote}>
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
              <span className="nb-del" title="Delete note" onClick={(e) => deleteNote(n.id, e)}>🗑</span>
            </div>
          ))}
        </aside>

        <section className="nb-editor panel">
          {!active ? (
            <div className="nb-empty">
              <p>✍️ No note open.</p>
              <button className="btn btn-download" onClick={createNote}>＋ Create your first note</button>
            </div>
          ) : (
            <>
              <input
                className="nb-title-input"
                value={active.title}
                onChange={onTitle}
                placeholder="Untitled note"
              />
              <div className="nb-hint">
                Type <b>/</b> on any line for headings, lists, to-dos, callouts, images and runnable
                code. Select text for the formatting bar. Drag the ⋮⋮ handle to move blocks.
              </div>

              {inlineTB.show && (
                <div className="inline-tb" style={{ top: inlineTB.y, left: inlineTB.x }}>
                  {[
                    ['bold', 'B'],
                    ['italic', 'I'],
                    ['underline', 'U'],
                    ['strikeThrough', 'S'],
                  ].map(([c, l]) => (
                    <button key={c} onMouseDown={(e) => { e.preventDefault(); fmt(c) }}>{l}</button>
                  ))}
                  <button onMouseDown={(e) => { e.preventDefault(); fmt('hiliteColor', '#fde68a') }}>🖍</button>
                  <button
                    onMouseDown={(e) => {
                      e.preventDefault()
                      const url = window.prompt('Link URL (https://…)')
                      if (url) fmt('createLink', url)
                    }}
                  >🔗</button>
                </div>
              )}

              <div className="nb-blocks">
                {active.blocks.map((block, idx) => {
                  const slashActive = slash.open && slash.blockId === block.id
                  const handle = (
                    <span
                      className="nb-handle"
                      draggable
                      title="Drag to move"
                      onDragStart={() => (dragId.current = block.id)}
                    >
                      ⋮⋮
                    </span>
                  )
                  const addBtn = (
                    <span className="nb-add" title="Add block" onClick={() => addBlockAfter(block.id)}>＋</span>
                  )
                  const editable = (
                    <EditableBlock
                      block={block}
                      register={registerRef}
                      onChange={onChangeBlock}
                      onEnter={onEnter}
                      onBackspace={onBackspace}
                      onSlash={openSlash}
                      onSlashClose={closeSlash}
                      slashActive={slashActive}
                      placeholder={
                        block.type === 'h1' ? 'Heading 1'
                        : block.type === 'callout' ? 'Callout…'
                        : idx === 0 ? "Type '/' for commands…"
                        : ''
                      }
                    />
                  )

                  let inner
                  if (block.type === 'divider') inner = <hr className="nb-divider" />
                  else if (block.type === 'code')
                    inner = <CodeBlock block={block} update={updateBlock} remove={removeBlock} />
                  else if (block.type === 'image')
                    inner = <ImageBlock block={block} update={updateBlock} remove={removeBlock} />
                  else if (block.type === 'bullet')
                    inner = (
                      <div className="nb-li">
                        <span className="nb-marker">
                          {block.style === 'arrow' ? '▸' : block.style === 'dash' ? '–' : '•'}
                        </span>
                        {editable}
                      </div>
                    )
                  else if (block.type === 'number') {
                    numCount += 1
                    inner = (
                      <div className="nb-li">
                        <span className="nb-marker">{numCount}.</span>
                        {editable}
                      </div>
                    )
                  } else if (block.type === 'todo')
                    inner = (
                      <div className="nb-li nb-todo">
                        <input
                          type="checkbox"
                          checked={!!block.checked}
                          onChange={(e) => updateBlock(block.id, { checked: e.target.checked })}
                        />
                        <span className={block.checked ? 'done' : ''}>{editable}</span>
                      </div>
                    )
                  else if (block.type === 'quote') inner = <blockquote className="nb-quote">{editable}</blockquote>
                  else if (block.type === 'callout')
                    inner = (
                      <div className="nb-callout">
                        <span className="nb-callout-ic">💡</span>
                        {editable}
                      </div>
                    )
                  else inner = editable
                  if (block.type !== 'number') numCount = 0

                  return (
                    <div
                      className="nb-block"
                      key={block.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => onDrop(block.id)}
                    >
                      <div className="nb-gutter">
                        {addBtn}
                        {handle}
                      </div>
                      <div className="nb-body">{inner}</div>
                    </div>
                  )
                })}
              </div>

              {slash.open && <SlashMenu state={slash} onSelect={selectSlash} onClose={closeSlash} />}

              <div className="nb-footer">
                <button className="btn btn-delete" onClick={() => deleteNote(active.id)}>🗑 Delete note</button>
                <span className="nb-saved">Auto-saves ✓</span>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  )
}
