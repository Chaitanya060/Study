import { useState } from 'react'
import { selfIntro, hrQuestions } from '../data/hr.js'
import importedHR from '../data/importedHR.json'

const levelLabel = { basic: 'Common', inter: 'Frequent', adv: 'Tricky' }
const impLabel = { basic: 'Basic', inter: 'Important', adv: 'Advanced' }

function Accordion({ items, open, toggle, prefix, labels }) {
  let lastSection = null
  return items.map((it, i) => {
    const key = `${prefix}-${i}`
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
            {it.level && <span className={'tag ' + it.level}>{labels[it.level]}</span>}
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
  })
}

export default function HR() {
  const [open, setOpen] = useState({})
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))

  return (
    <div>
      <div className="page-head">
        <h2>🧑‍💼 HR &amp; Self Introduction</h2>
        <p>A ready self-intro plus the HR questions you’ll most likely be asked, with sample answers.</p>
      </div>

      <div className="intro-box">
        <h3>🎤 Self Introduction (quick version)</h3>
        <p>{selfIntro.short}</p>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-top">
          <h3>🗣️ Full Self Introduction</h3>
        </div>
        {selfIntro.paragraphs.map((p, i) => (
          <p key={i} style={{ marginTop: 10 }}>
            {p}
          </p>
        ))}
        <div className="note-section" style={{ marginTop: 18 }}>
          <h4>Tips to deliver it well</h4>
          <ul>
            {selfIntro.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-top">
          <h3>💬 Common HR Questions</h3>
          <span className="count-badge">{hrQuestions.length} questions</span>
        </div>
        <Accordion items={hrQuestions} open={open} toggle={toggle} prefix="c" labels={levelLabel} />
      </div>

      <div className="panel">
        <div className="panel-top">
          <h3>🎯 HR &amp; Career-Gap Bank (tailored to your resume)</h3>
          <span className="count-badge">{importedHR.length} questions</span>
        </div>
        <p className="muted" style={{ marginTop: 0 }}>
          Career-gap, resume-based and managerial questions with sample answers you can adapt.
        </p>
        <Accordion items={importedHR} open={open} toggle={toggle} prefix="i" labels={impLabel} />
      </div>
    </div>
  )
}
