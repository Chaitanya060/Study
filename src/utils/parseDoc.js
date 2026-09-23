// Pure text -> Q&A parser (no PDF dependency, so it is easy to test).
// Turns extracted document text into [{ level, section, q, a }].
//
// Two passes:
//   1) STRICT — numbered "Qn." questions + "N. Title" sections (used by the app's PDFs).
//   2) LOOSE  — "Q:" questions + generic document headings (for free-form docs).
// Whichever finds a solid set of questions wins; otherwise the text is shown as a
// readable document (headings + paragraphs).

const LIG = { 'ﬀ': 'ff', 'ﬁ': 'fi', 'ﬂ': 'fl', 'ﬃ': 'ffi', 'ﬄ': 'ffl', 'ﬅ': 'ft', 'ﬆ': 'st' }

function deligature(s) {
  let out = s
  for (const k in LIG) out = out.split(k).join(LIG[k])
  return out
}

function tidy(s) {
  s = deligature(s)
  s = s.replace(/[⭐★✔]/g, '')
  s = s.replace(/\s+\)/g, ')').replace(/\(\s+/g, '(')
  s = s.replace(/\s+([,.;:?!])/g, '$1')
  s = s.replace(/[ \t]+/g, ' ')
  return s.trim()
}

const norm = (s) => tidy(s).replace(/\s+/g, ' ').trim()

const ADV = ['multithread', 'concurren', 'java 8', 'jvm', 'memory', 'garbage', 'serial', 'reflect', 'design pattern', 'solid', 'advanced', 'coding', 'optimiz', 'microservice', 'security', 'scenario', 'architecture', 'disaster', 'container', 'devops', 'reactive', 'scheduling', 'kubernetes', 'scaling', 'monitoring']
const BASIC = ['basic', 'introduction', 'string', 'function', 'module', 'package', 'environment', 'overview', 'fundamental', 'golden rules', 'checklist', 'project explanation', 'explanation']

function levelFor(title) {
  const t = (title || '').toLowerCase()
  if (ADV.some((k) => t.includes(k))) return 'adv'
  if (BASIC.some((k) => t.includes(k))) return 'basic'
  return 'inter'
}

const ANS_MARKER = /^(Answer:|Why they ask|Why:|How to answer|Sample answer|Sample:|A:)/i
const BULLET = /^(\d+\.\s|[•–▪◦·*-]\s|Simple picture:|Simple line:|Easy line:|Example[:-]|Note:|Tip:|Simple:|Analogy:|Why they ask:|How to answer:|Sample answer:|Sample:|STAR)/i
const PAGE = /^Page \d+ of \d+$/i
const Q_STRICT = /^Q\s*\d+[.)]\s*(.*)$/i
const Q_LOOSE = /^Q\s*\d*\s*[:.)]\s*(.*)$/i
// Numbered section heading: "N. Title" — no colon, no trailing period.
const SECTION_NUM = /^(\d+)\.\s+([A-Z][A-Za-z0-9 ,&/+()'’–—\-]{2,46}[A-Za-z)])$/

// A generic document heading like "BrewBean (Café Management System)", "Part 2: Core...",
// "Spring Boot & Architecture" — short, title-like, not a sentence/bullet/question.
function genericHeading(line) {
  const h = line.replace(/[⭐★✔]/g, '').trim()
  if (h.length < 3 || h.length > 70) return null
  if (Q_LOOSE.test(h)) return null
  if (/^(\d+\.\s|[•–▪◦·*\-])/.test(h)) return null
  if (/^["“'']/.test(h)) return null
  if (/[.!?][")']?\s*$/.test(h)) return null
  if (/^Part\s+\d+/i.test(h)) return h.replace(/:\s*$/, '').trim()
  if (/^[A-Z0-9]/.test(h) && h.split(/\s+/).length <= 8 && /^[A-Za-z0-9 ,&/()'’:+.\-–—]+$/.test(h)) {
    return h.replace(/:\s*$/, '').trim()
  }
  return null
}

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

// Core pass. loose=false: numbered only. loose=true: "Q:" + generic headings.
function runPass(lines, noise, loose) {
  const Q = loose ? Q_LOOSE : Q_STRICT

  const matchSection = (line) => {
    const cleaned = norm(line).replace(/\s*\((?:Most|Very|Frequently)[^)]*\)\s*$/i, '').trim()
    const m = cleaned.match(SECTION_NUM)
    if (m) return m[2].trim()
    return loose ? genericHeading(cleaned) : null
  }
  const headingFollowedByQ = (idx) => {
    let seen = 0
    for (let k = idx + 1; k < lines.length && seen < 4; k++) {
      const t = lines[k].trim()
      if (!t || PAGE.test(t) || noise.has(t)) continue
      if (Q.test(t)) return true
      if (matchSection(t)) return loose // nested headings only in loose mode
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
      const q = norm(curQ).replace(/^["“'']+/, '').replace(/["”'']+$/, '').trim()
      const a = cleanAnswer(curAns)
      if (q.length >= 5 && a.length >= 2) {
        results.push({ level: levelFor(curSection), section: curSection, q, a })
      }
    }
    curQ = null
    curAns = []
  }

  const n = lines.length
  let firstQ = n
  for (let k = 0; k < n; k++) {
    if (Q.test(lines[k].trim())) {
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

    const mq = s.match(Q)
    if (mq) {
      commit()
      let q = mq[1]
      let j = i + 1
      let qn = norm(q)
      while (j < n) {
        const nxt = lines[j].trim()
        if (!nxt) break
        if (ANS_MARKER.test(nxt) || Q.test(nxt)) break
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

    const secTitle = matchSection(s)
    if (secTitle && headingFollowedByQ(i)) {
      commit()
      curSection = secTitle
      continue
    }

    if (curQ) curAns.push(lines[i])
  }
  commit()
  return results
}

// Fallback: format a free-form document into readable heading + paragraph chunks.
function documentChunks(lines, noise) {
  const items = []
  let section = 'Document'
  let heading = null
  let buf = []
  const flush = () => {
    const a = cleanAnswer(buf)
    if (a.length > 1) {
      items.push({ level: 'inter', section, q: heading || a.split(/[.?!]/)[0].slice(0, 90).trim() || 'Section', a })
    }
    buf = []
  }
  for (const raw of lines) {
    const s = raw.trim()
    if (!s || PAGE.test(s) || noise.has(s)) continue
    const h = genericHeading(s)
    if (h) {
      flush()
      heading = h
      section = h
      continue
    }
    buf.push(raw)
  }
  flush()
  return items
}

export function parseDoc(rawText) {
  const text = deligature(rawText || '')
  const lines = text.split(/\r?\n/)

  const freq = {}
  for (const l of lines) {
    const s = l.trim()
    if (s) freq[s] = (freq[s] || 0) + 1
  }
  // Lines repeating 3+ times are page headers/footers (real headings appear at most twice).
  const noise = new Set(
    Object.keys(freq).filter((s) => freq[s] >= 3 && s.length <= 70 && !Q_LOOSE.test(s)),
  )

  const strict = runPass(lines, noise, false)
  if (strict.length >= 5) return strict

  const loose = runPass(lines, noise, true)
  if (loose.length >= 2) return loose

  const chunks = documentChunks(lines, noise)
  if (chunks.length) return chunks

  return [{ level: 'inter', section: 'Document', q: 'Document text', a: norm(text) }]
}
