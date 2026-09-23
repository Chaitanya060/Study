import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Notes from './pages/Notes.jsx'
import QA from './pages/QA.jsx'
import HR from './pages/HR.jsx'
import Projects from './pages/Projects.jsx'
import OOP from './pages/OOP.jsx'
import MyNotes from './pages/MyNotes.jsx'

export default function App() {
  return (
    <div className="app">
      {/* Flowing-water animated background */}
      <div className="bg" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>

      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/oop" element={<OOP />} />
          <Route path="/mynotes" element={<MyNotes />} />
          <Route path="/hr" element={<HR />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="footer">
        Built for interview prep · Chaitanya Kishore · Java · Spring Boot · AWS · Python
      </footer>
    </div>
  )
}
