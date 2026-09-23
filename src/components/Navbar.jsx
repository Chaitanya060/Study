import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const links = [
  { to: '/notes', label: 'Notes' },
  { to: '/qa', label: 'Q&A' },
  { to: '/oop', label: 'OOP Concept' },
  { to: '/hr', label: 'HR & Intro' },
  { to: '/projects', label: 'Projects' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // close mobile menu on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <nav className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          Chaitanya · Interview Prep
        </NavLink>

        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕' : '☰'}
        </button>

        <div className={'nav-links' + (open ? '' : ' closed')}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="link">
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
