import { Link } from 'react-router-dom'

const cards = [
  {
    to: '/notes',
    emoji: '📘',
    title: 'Notes',
    desc: 'Clean, easy-to-read notes for Java, Python, AWS, DBMS, OS, Spring Boot & more — basic to advanced.',
  },
  {
    to: '/qa',
    emoji: '❓',
    title: 'Questions & Answers',
    desc: 'Interview Q&A covering every topic. Download Java, Python & AWS sets as PDF.',
  },
  {
    to: '/oop',
    emoji: '🧠',
    title: 'OOP Concept',
    desc: 'Object-Oriented Programming explained the easy way — with real-life examples, notes & questions.',
  },
  {
    to: '/hr',
    emoji: '🧑‍💼',
    title: 'HR & Self Intro',
    desc: 'A ready self-introduction plus the most common HR questions with strong sample answers.',
  },
  {
    to: '/projects',
    emoji: '🚀',
    title: 'Projects',
    desc: 'Your 3 resume projects with likely interviewer questions — from basic to advanced.',
  },
]

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>
          Crack your <span>startup & MNC</span> interviews
        </h1>
        <p>
          A personal prep hub built around your resume — Java, Spring Boot, Microservices, AWS,
          Python, DBMS and more. Study notes, practice Q&amp;A, prepare HR answers, and master
          your project story.
        </p>
      </section>

      <div className="home-grid">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="home-card">
            <div className="emoji">{c.emoji}</div>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
