import { useState, useMemo } from 'react'
import { qaTopics } from '../data/qa.js'
import importedQA from '../data/importedQA.json'
import { downloadTopicPdf } from '../utils/pdf.js'

const levelLabel = { basic: 'Basic', inter: 'Intermediate', adv: 'Advanced' }

// Build final topic item list: use the imported (comprehensive) set when available.
function topicItems(topic) {
  return importedQA[topic.id] && importedQA[topic.id].length ? importedQA[topic.id] : topic.items
}

export default function QA() {
  const [active, setActive] = useState(qaTopics[0].id)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState({})

  const topic = useMemo(() => qaTopics.find((t) => t.id === active), [active])
  const allItems = useMemo(() => topicItems(topic), [topic])

  const items = useMemo(() => {
    if (!query.trim()) return allItems
    const q = query.toLowerCase()
    return allItems.filter(
      (it) => it.q.toLowerCase().includes(q) || it.a.toLowerCase().includes(q),
    )
  }, [allItems, query])

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  // Render items, inserting a section header whenever the section changes.
  let lastSection = null

  return (
    <div>
      <div className="page-head">
        <h2>❓ Questions &amp; Answers</h2>
        <p>
          Every topic, basic → advanced. Java, Python, Spring Boot &amp; AWS now include full
          interview banks. Java, Python &amp; AWS have a <b>Download PDF</b> button.
        </p>
      </div>

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
      </div>

      <div className="panel">
        <div className="panel-top">
          <h3>
            {topic.icon} {topic.label}
            <span className="count-badge"> · {allItems.length} questions</span>
          </h3>
          {topic.download && (
            <button
              className="btn btn-download"
              onClick={() => downloadTopicPdf(topic.label, allItems)}
              title={`Download ${topic.label} Q&A as PDF`}
            >
              ⬇ Download PDF
            </button>
          )}
        </div>

        <input
          className="search"
          placeholder={`Search ${topic.label} questions...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {items.length === 0 && <p className="muted">No questions match “{query}”.</p>}

        {items.map((it, i) => {
          const key = `${active}-${i}`
          const isOpen = !!open[key]
          const showSection = it.section && it.section !== lastSection
          if (it.section) lastSection = it.section
          return (
            <div key={key}>
              {showSection && <div className="section-head">{it.section}</div>}
              <div className={'qa-item' + (isOpen ? ' open' : '')}>
                <button className="qa-q" onClick={() => toggle(key)}>
                  <span className="num">Q{i + 1}.</span>
                  <span className="qt">{it.q}</span>
                  <span className={'tag ' + it.level}>{levelLabel[it.level]}</span>
                  <span className="chev">▾</span>
                </button>
                {isOpen && (
                  <div className="qa-a">
                    <p>{it.a}</p>
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
