import { useState, useMemo, useRef, useEffect } from 'react'
import { qaTopics } from '../data/qa.js'
import importedQA from '../data/importedQA.json'
import { downloadTopicPdf } from '../utils/pdf.js'
import { idbGetAll, idbPut, idbDelete } from '../utils/store.js'
import RichAnswer from '../components/RichAnswer.jsx'
// pdfImport (heavy pdf.js library) is loaded lazily on first upload.

const levelLabel = { basic: 'Basic', inter: 'Intermediate', adv: 'Advanced' }
const OLD_LS_KEY = 'ip_customTopics_v1'

// Items for a topic: custom topics carry their own items; built-ins prefer the imported bank.
function topicItems(topic) {
  if (topic.custom) return topic.items
  return importedQA[topic.id] && importedQA[topic.id].length ? importedQA[topic.id] : topic.items
}

export default function QA() {
  const [custom, setCustom] = useState([])
  const [active, setActive] = useState(qaTopics[0].id)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState({})
  const [importing, setImporting] = useState(false)
  const [notice, setNotice] = useState(null)
  const fileRef = useRef(null)

  // Load persisted PDF topics from IndexedDB on mount (migrating any old localStorage data).
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const old = localStorage.getItem(OLD_LS_KEY)
        if (old) {
          const arr = JSON.parse(old)
          for (const t of arr) await idbPut('pdfTopics', t)
          localStorage.removeItem(OLD_LS_KEY)
        }
      } catch {
        /* ignore migration errors */
      }
      const saved = await idbGetAll('pdfTopics')
      if (!cancelled) setCustom(saved.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0)))
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const allTopics = useMemo(() => [...qaTopics, ...custom], [custom])
  const topic = useMemo(
    () => allTopics.find((t) => t.id === active) || allTopics[0],
    [allTopics, active],
  )
  const allItems = useMemo(() => topicItems(topic), [topic])

  const items = useMemo(() => {
    if (!query.trim()) return allItems
    const q = query.toLowerCase()
    return allItems.filter((it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q))
  }, [allItems, query])

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  async function onFile(e) {
    const file = e.target.files && e.target.files[0]
    if (fileRef.current) fileRef.current.value = ''
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setNotice({ type: 'err', msg: 'Please choose a PDF file.' })
      return
    }
    setImporting(true)
    setNotice(null)
    try {
      const { importPdf } = await import('../utils/pdfImport.js')
      const { items } = await importPdf(file)
      if (!items.length) {
        setNotice({ type: 'err', msg: 'No readable text found in that PDF.' })
        setImporting(false)
        return
      }
      const label = file.name.replace(/\.pdf$/i, '').replace(/[_-]+/g, ' ').trim() || 'My PDF'
      const newTopic = {
        id: 'user-' + Date.now(),
        label,
        icon: '📄',
        custom: true,
        download: true,
        items,
        pdf: file, // the actual PDF file, stored in IndexedDB until deleted
        fileName: file.name,
        size: file.size,
        createdAt: Date.now(),
      }
      await idbPut('pdfTopics', newTopic)
      setCustom((c) => [...c, newTopic])
      setActive(newTopic.id)
      setQuery('')
      setOpen({})
      setNotice({ type: 'ok', msg: `Saved “${label}” (${items.length} questions). It stays until you delete it.` })
    } catch (err) {
      setNotice({ type: 'err', msg: 'Could not read that PDF. Try another file.' })
    }
    setImporting(false)
  }

  async function removeCustom(id, e) {
    if (e) e.stopPropagation()
    const t = custom.find((x) => x.id === id)
    if (!window.confirm(`Delete “${t ? t.label : 'this PDF'}”? This removes it from this device.`)) return
    await idbDelete('pdfTopics', id)
    setCustom((c) => c.filter((x) => x.id !== id))
    if (active === id) setActive(qaTopics[0].id)
    setNotice({ type: 'ok', msg: `Deleted “${t ? t.label : 'PDF'}”.` })
  }

  function downloadOriginal(t) {
    if (!t.pdf) {
      setNotice({ type: 'err', msg: 'Original PDF not available for this item.' })
      return
    }
    const url = URL.createObjectURL(t.pdf)
    const a = document.createElement('a')
    a.href = url
    a.download = t.fileName || (t.label || 'document') + '.pdf'
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1500)
  }

  let lastSection = null

  return (
    <div>
      <div className="page-head">
        <h2>❓ Questions &amp; Answers</h2>
        <p>
          Every topic, basic → advanced. Java, Python, Spring Boot &amp; AWS include full interview
          banks. <b>Upload your own PDF</b> — it is saved on this device until you delete it.
        </p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="application/pdf,.pdf"
        onChange={onFile}
        style={{ display: 'none' }}
      />

      <div className="topics">
        {qaTopics.map((t) => (
          <button
            key={t.id}
            className={'topic-btn' + (t.id === active ? ' active' : '')}
            onClick={() => {
              setActive(t.id)
              setQuery('')
              setOpen({})
            }}
          >
            <span className="ic">{t.icon}</span>
            {t.label}
            {t.download && ' ⬇'}
          </button>
        ))}

        {custom.map((t) => (
          <button
            key={t.id}
            className={'topic-btn custom' + (t.id === active ? ' active' : '')}
            onClick={() => {
              setActive(t.id)
              setQuery('')
              setOpen({})
            }}
            title="Your uploaded PDF (saved on this device)"
          >
            <span className="ic">{t.icon}</span>
            {t.label}
            <span className="remove" onClick={(e) => removeCustom(t.id, e)} title="Delete">
              ✕
            </span>
          </button>
        ))}

        <button
          className="topic-btn add-pdf"
          onClick={() => fileRef.current && fileRef.current.click()}
          disabled={importing}
        >
          {importing ? '⏳ Reading PDF…' : '➕ Add PDF'}
        </button>
      </div>

      {notice && (
        <div className={'notice ' + (notice.type === 'err' ? 'err' : 'ok')}>{notice.msg}</div>
      )}

      <div className="panel">
        <div className="panel-top">
          <h3>
            {topic.icon} {topic.label}
            <span className="count-badge"> · {allItems.length} questions</span>
          </h3>
          <div className="panel-actions">
            {topic.download && (
              <button
                className="btn btn-download"
                onClick={() => downloadTopicPdf(topic.label, allItems)}
                title={`Download ${topic.label} Q&A as PDF`}
              >
                ⬇ Download Q&amp;A
              </button>
            )}
            {topic.custom && topic.pdf && (
              <button
                className="btn btn-secondary"
                onClick={() => downloadOriginal(topic)}
                title="Download the original PDF you uploaded"
              >
                📄 Original PDF
              </button>
            )}
            {topic.custom && (
              <button
                className="btn btn-delete"
                onClick={() => removeCustom(topic.id)}
                title={`Delete ${topic.label}`}
              >
                🗑 Delete this PDF
              </button>
            )}
          </div>
        </div>

        {topic.custom && (
          <p className="muted" style={{ marginTop: 0 }}>
            📄 Uploaded PDF — the file is saved on this device (in your browser) and stays until you
            delete it. Built-in topics can’t be deleted.
          </p>
        )}

        <input
          className="search"
          placeholder={`Search ${topic.label} questions...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {items.length === 0 && <p className="muted">No questions match “{query}”.</p>}

        {items.map((it, i) => {
          const key = `${topic.id}-${i}`
          const isOpen = !!open[key]
          const showSection = it.section && it.section !== lastSection && it.section !== 'General'
          if (it.section) lastSection = it.section
          return (
            <div key={key}>
              {showSection && <div className="section-head">{it.section}</div>}
              <div className={'qa-item' + (isOpen ? ' open' : '')}>
                <button className="qa-q" onClick={() => toggle(key)}>
                  <span className="num">Q{i + 1}.</span>
                  <span className="qt">{it.q}</span>
                  {it.level && <span className={'tag ' + it.level}>{levelLabel[it.level]}</span>}
                  <span className="chev">▾</span>
                </button>
                {isOpen && (
                  <div className="qa-a">
                    <RichAnswer text={it.a} />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
