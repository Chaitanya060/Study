import { useState } from 'react'
import { projects } from '../data/projects.js'

const levelLabel = { basic: 'Basic', inter: 'Intermediate', adv: 'Advanced' }

function ProjectCard({ project }) {
  const [open, setOpen] = useState({})
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }))

  return (
    <div className="proj-card">
      <h3>{project.name}</h3>
      <p className="muted">{project.tagline}</p>

      <div className="stack">
        {project.stack.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>

      <a className="proj-link" href={project.link} target="_blank" rel="noreferrer">
        🔗 View on GitHub
      </a>

      <div className="note-section">
        <h4>What it is</h4>
        <ul>
          {project.summary.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      <div className="note-section">
        <h4>Likely interview questions ({project.questions.length})</h4>
        {project.questions.map((it, i) => {
          const isOpen = !!open[i]
          return (
            <div className={'qa-item' + (isOpen ? ' open' : '')} key={i}>
              <button className="qa-q" onClick={() => toggle(i)}>
                <span className="num">Q{i + 1}.</span>
                <span>{it.q}</span>
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
    </div>
  )
}

export default function Projects() {
  return (
    <div>
      <div className="page-head">
        <h2>🚀 Projects</h2>
        <p>Your resume projects and the questions interviewers are likely to ask — basic to advanced.</p>
      </div>

      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  )
}
