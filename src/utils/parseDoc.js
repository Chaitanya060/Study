// Pure text -> Q&A parser (no PDF dependency, so it is easy to test).
// Turns extracted document text into [{ level, section, q, a }].
// Designed for "Qn. ... Answer: ..." style interview PDFs, with graceful fallback.

const LIG = { 'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬅ': 'ft', 'ﬆ': 'st' }

function deligature(s) {
  let out = s
  for (const k in LIG) out = out.split(k).join(LIG[k])
  return out
}

function tidy(s) {
  s = deligature(s)
  s = s.replace(/[⭐★✔]/g, '') // stars / check
  s = s.replace(/\s+\)/g, ')').replace(/\(\s+/g, '(')
  s = s.replace(/\s+([,.;:?!])/g, '$1')
  s = s.replace(/[ \t]+/g, ' ')
  return s.trim()
}

const norm = (s) => tidy(s).replace(/\s+/g, ' ').trim()

const ADV = ['multithread', 'concurren', 'java 8', 'jvm', 'memory', 'garbage', 'serial', 'reflect', 'design pattern', 'solid', 'advanced', 'coding', 'optimiz', 'microservice', 'security', 'scenario', 'architecture', 'disaster', 'container', 'devops', 'reactive', 'scheduling', 'kubernetes', 'scaling', 'monitoring']
const BASIC = ['basic', 'introduction', 'string', 'function', 'module', 'package', 'environment', 'overview', 'fundamental', 'golden rules', 'checklist']

function levelFor(title) {
  const t = (title || '').toLowerCase()
  if (ADV.some((k) => t.includes(k))) return 'adv'
  if (BASIC.some((k) => t.includes(k))) return 'basic'
  return 'inter'
}

const ANS_MARKER = /^(Answer:|Why they ask|Why:|How to answer|Sample answer|Sample:|A:)/i
const BULLET = /^(\d+\.\s|[•–•*-]\s|Simple picture:|Simple line:|Easy line:|Example[:-]|Note:|Tip:|Simple:|Analogy:|Why they ask:|How to answer:|Sample answer:|Sample:|STAR)/i
const Q_LINE = /^Q\s*\d+[.)]\s*(.*)$/i
const PAGE = /^Page \d+ of \d+$/i
const NUMDOT = /^\d+\.\s/
// Section heading: "N. Title Case Words" — captures number; no colon, no trailing period.
const SECTION = /^(\d+)\.\s+([A-Z][A-Za-z0-9 ,&/+()'’–—\-]{2,46}[A-Za-z)])$/

function cleanAnswer(lines) {
  const out = []
  let buf = ''
  const flush = () => {
    if (buf.trim()) out.push(tidy(buf))
    buf = ''
  }
  for (const raw of lines) {
    const s = raw.trim()
    if (!s) {
      flush()
      continue
    }
    if (s === 'Answer:') continue
    const t = s.replace(/^Answer:\s*/i, '')
    if (BULLET.test(t)) {
      flush()
      buf = t
    } else {
      buf = buf ? buf + ' ' + t : t
    }
  }
  flush()
  return out
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
}

export function parseDoc(rawText) {
  const text = deligature(rawText || '')
  const lines = text.split(/\r?\n/)

  // Auto-detect repeated header/footer noise (title lines, etc.).
  const freq = {}
  for (const l of lines) {
    const s = l.trim()
    if (s) freq[s] = (freq[s] || 0) + 1
  }
  const noise = new Set(
    Object.keys(freq).filter(
      (s) => freq[s] >= 3 && s.length <= 60 && !Q_LINE.test(s) && !SECTION.test(s),
    ),
  )

  // Returns the section title if `line` is a "N. Title" heading (stars/parens stripped), else null.
  const matchSection = (line) => {
    const cleaned = norm(line).replace(/\s*\([^)]*\)\s*$/, '').trim()
    const m = cleaned.match(SECTION)
    return m ? m[2].trim() : null
  }
  // A real section heading is followed by a question within a few lines.
  const headingFollowedByQ = (idx) => {
    let seen = 0
    for (let k = idx + 1; k < lines.length && seen < 3; k++) {
      const t = lines[k].trim()
      if (!t || PAGE.test(t) || noise.has(t)) continue
      if (Q_LINE.test(t)) return true
      if (matchSection(t)) return false
      seen++
    }
    return false
  }

  const results = []
  let curSection = 'General'
  let curQ = null
  let curAns = []

  const commit = () => {
    if (curQ) {
      const q = norm(curQ)
      const a = cleanAnswer(curAns)
      if (q.length >= 5 && a.length >= 2) {
        results.push({ level: levelFor(curSection), section: curSection, q, a })
      }
    }
    curQ = null
    curAns = []
  }

  const n = lines.length
  // Find the body start: the first Q-line, but keep the section heading just before it.
  let firstQ = n
  for (let k = 0; k < n; k++) {
    if (Q_LINE.test(lines[k].trim())) {
      firstQ = k
      break
    }
  }
  let start = firstQ
  for (let k = firstQ - 1; k >= 0 && k >= firstQ - 4; k--) {
    if (matchSection(lines[k].trim())) {
      start = k
      break
    }
  }

  for (let i = start; i < n; i++) {
    const s = lines[i].trim()
    if (!s) continue
    if (PAGE.test(s) || noise.has(s)) continue

    const mq = s.match(Q_LINE)
    if (mq) {
      commit()
      let q = mq[1]
      let j = i + 1
      let qn = norm(q)
      while (j < n) {
        const nxt = lines[j].trim()
        if (!nxt) break
        if (ANS_MARKER.test(nxt) || Q_LINE.test(nxt)) break
        if (PAGE.test(nxt) || noise.has(nxt)) {
          j++
          continue
        }
        if (/[?:."”]\s*$/.test(qn)) break
        q = q + ' ' + nxt
        qn = norm(q)
        j++
      }
      curQ = q
      curAns = []
      i = j - 1
      continue
    }

    // Section heading: title-case "N. Title" that is followed by a question soon.
    const secTitle = matchSection(s)
    if (secTitle && headingFollowedByQ(i)) {
      commit()
      curSection = secTitle
      continue
    }

    if (curQ) curAns.push(lines[i])
  }
  commit()

  if (results.length >= 2) return results

  // Fallback: no Q&A detected — present the document as readable chunks.
  const paras = text
    .split(/\r?\n\s*\r?\n/)
    .map((p) => norm(p))
    .filter((p) => p.length > 40)
  if (paras.length) {
    return paras.map((p, idx) => ({
      level: 'inter',
      section: 'Document',
      q: p.split(/[.?!]/)[0].slice(0, 90).trim() || `Section ${idx + 1}`,
      a: p,
    }))
  }
  return [{ level: 'inter', section: 'Document', q: 'Document text', a: norm(text) }]
}
