import { useState, useMemo } from 'react'
import { notesTopics } from '../data/notes.js'

const levelLabel = { basic: 'Basic', inter: 'Intermediate', adv: 'Advanced' }

export default function Notes() {
  const [active, setActive] = useState(notesTopics[0].id)
  const [query, setQuery] = useState('')

  const topic = useMemo(() => notesTopics.find((t) => t.id === active), [active])

  const sections = useMemo(() => {
    if (!query.trim()) return topic.sections
    const q = query.toLowerCase()
    return topic.sections.filter(
      (s) => s.heading.toLowerCase().includes(q) || s.html.toLowerCase().includes(q),
    )
  }, [topic, query])

  return (
    <div>
      <div className="page-head">
        <h2>📘 Notes</h2>
        <p>Pick a topic. Notes go from basic to advanced — clean and easy to read.</p>
      </div>

      <div className="topics">
        {notesTopics.map((t) => (
          <button
            key={t.id}
            className={'topic-btn' + (t.id === active ? ' active' : '')}
            onClick={() => {
              setActive(t.id)
              setQuery('')
            }}
          >
            <span className="ic">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="panel">
        <div className="panel-top">
          <h3>
            {topic.icon} {topic.label}
          </h3>
          <span className="count-badge">{topic.sections.length} sections</span>
        </div>

        <input
          className="search"
          placeholder={`Search within ${topic.label} notes...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {sections.length === 0 && <p className="muted">No sections match “{query}”.</p>}

        {sections.map((s, i) => (
          <div className="note-section" key={i}>
            <h4>
              {s.heading}
              <span className={'tag ' + s.level}>{levelLabel[s.level]}</span>
            </h4>
            <div dangerouslySetInnerHTML={{ __html: s.html }} />
          </div>
        ))}
      </div>
    </div>
  )
}
