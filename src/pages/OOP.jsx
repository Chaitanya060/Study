import { useState } from 'react'
import { oopIntro, oopNotes, oopQuestions } from '../data/oop.js'
import { downloadTopicPdf } from '../utils/pdf.js'

const levelLabel = { basic: 'Basic', inter: 'Intermediate', adv: 'Advanced' }

export default function OOP() {
  const [tab, setTab] = useState('notes') // 'notes' | 'qa'
  const [open, setOpen] = useState({})
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }))

  return (
    <div>
      <div className="page-head">
        <h2>🧠 OOP Concept</h2>
        <p>Object-Oriented Programming explained the easy way — with real-life examples, notes & interview questions.</p>
      </div>

      {/* Intro card */}
      <div className="intro-box">
        <h3>🤔 What is OOP? (in the simplest way)</h3>
        <p>{oopIntro.what}</p>
        <div className="callout ex">
          <b>Easy analogy:</b> {oopIntro.analogy}
        </div>
        <div className="note-section" style={{ marginTop: 12 }}>
          <h4>Why do we use OOP?</h4>
          <ul>
            {oopIntro.why.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div className="topics">
        <button
          className={'topic-btn' + (tab === 'notes' ? ' active' : '')}
          onClick={() => setTab('notes')}
        >
          📘 Notes
        </button>
        <button
          className={'topic-btn' + (tab === 'qa' ? ' active' : '')}
          onClick={() => setTab('qa')}
        >
          ❓ Questions & Answers
        </button>
      </div>

      {tab === 'notes' && (
        <div className="panel">
          <div className="panel-top">
            <h3>📘 OOP Notes</h3>
            <span className="count-badge">{oopNotes.length} sections</span>
          </div>
          {oopNotes.map((s, i) => (
            <div className="note-section" key={i}>
              <h4>
                {s.heading}
                <span className={'tag ' + s.level}>{levelLabel[s.level]}</span>
              </h4>
              <div dangerouslySetInnerHTML={{ __html: s.html }} />
            </div>
          ))}
        </div>
      )}

      {tab === 'qa' && (
        <div className="panel">
          <div className="panel-top">
            <h3>
              ❓ OOP Q&A <span className="count-badge">· {oopQuestions.length} questions</span>
            </h3>
            <button
              className="btn btn-download"
              onClick={() => downloadTopicPdf('OOP Concepts', oopQuestions)}
              title="Download OOP Q&A as PDF"
            >
              ⬇ Download PDF
            </button>
          </div>
          {oopQuestions.map((it, i) => {
            const isOpen = !!open[i]
            return (
              <div className={'qa-item' + (isOpen ? ' open' : '')} key={i}>
                <button className="qa-q" onClick={() => toggle(i)}>
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
            )
          })}
        </div>
      )}
    </div>
  )
}
