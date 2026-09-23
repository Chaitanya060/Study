import { useState, useEffect, useRef } from 'react'
import { getLanguages, runCode, STARTER } from '../utils/piston.js'

// A runnable code block: language picker + editor + Run button + output.
export default function CodeBlock({ block, update, remove }) {
  const [langs, setLangs] = useState([])
  const [loadingLangs, setLoadingLangs] = useState(true)
  const [output, setOutput] = useState(null) // { text, error }
  const [running, setRunning] = useState(false)
  const taRef = useRef(null)

  const lang = block.lang || 'python'

  useEffect(() => {
    let ok = true
    getLanguages()
      .then((l) => {
        if (!ok) return
        setLangs(l)
        setLoadingLangs(false)
        // seed starter code the first time
        if (!block.code) update(block.id, { code: STARTER[lang] || '' })
      })
      .catch(() => {
        if (ok) setLoadingLangs(false)
      })
    return () => {
      ok = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const current = langs.find((l) => l.key === lang)

  function onLang(e) {
    const key = e.target.value
    const emptyOrStarter = !block.code || Object.values(STARTER).includes(block.code)
    update(block.id, { lang: key, ...(emptyOrStarter ? { code: STARTER[key] || '' } : {}) })
    setOutput(null)
  }

  // keep textarea auto-sized
  useEffect(() => {
    if (taRef.current) {
      taRef.current.style.height = 'auto'
      taRef.current.style.height = taRef.current.scrollHeight + 'px'
    }
  }, [block.code])

  async function run() {
    if (!current) {
      setOutput({ error: true, text: 'This language is not available right now. Try again later.' })
      return
    }
    setRunning(true)
    setOutput(null)
    try {
      const r = await runCode({
        compiler: current.compiler,
        source: block.code || '',
        langKey: lang,
      })
      const text = (r.stdout || '') + (r.stderr ? (r.stdout ? '\n' : '') + r.stderr : '')
      setOutput({ error: !!r.stderr && !r.stdout, text: text || '(no output)' })
    } catch (err) {
      setOutput({ error: true, text: 'Could not run: ' + err.message })
    }
    setRunning(false)
  }

  function onKeyDown(e) {
    // Tab inserts spaces instead of moving focus
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = taRef.current
      const s = ta.selectionStart
      const val = ta.value
      const next = val.slice(0, s) + '    ' + val.slice(ta.selectionEnd)
      update(block.id, { code: next })
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = s + 4
      })
    }
  }

  return (
    <div className="code-block">
      <div className="code-head">
        <span className="code-dot" />
        <select value={lang} onChange={onLang} disabled={loadingLangs}>
          {loadingLangs && <option>Loading…</option>}
          {langs.map((l) => (
            <option key={l.key} value={l.key}>
              {l.label}
            </option>
          ))}
        </select>
        <span className="code-ver">{current ? 'v' + current.version : ''}</span>
        <div className="code-head-actions">
          <button className="code-run" onClick={run} disabled={running || loadingLangs}>
            {running ? '⏳ Running…' : '▶ Run'}
          </button>
          <button className="code-x" onClick={() => remove(block.id)} title="Remove code block">🗑</button>
        </div>
      </div>

      <textarea
        ref={taRef}
        className="code-area"
        spellCheck={false}
        value={block.code || ''}
        placeholder="Write code here…"
        onChange={(e) => update(block.id, { code: e.target.value })}
        onKeyDown={onKeyDown}
      />

      {output && (
        <div className={'code-output' + (output.error ? ' err' : '')}>
          <div className="code-output-head">Output</div>
          <pre>{output.text}</pre>
        </div>
      )}
      <div className="code-note">Runs via a public compiler service (Wandbox). Needs internet.</div>
    </div>
  )
}
