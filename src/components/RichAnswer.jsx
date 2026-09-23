// Renders an answer string (with \n line breaks and •/-/numbered bullets) as
// readable paragraphs and lists instead of one dense block.

const BULLET = /^[•–•▪◦·*-]\s+(.*)$/
const NUMBERED = /^(\d+)[.)]\s+(.*)$/
// Bold a leading "Label:" (e.g. "Why they ask:", "Key features:").
const LABEL = /^([A-Z][A-Za-z0-9 /&'-]{1,34}:)\s*(.*)$/

function Line({ text }) {
  const m = text.match(LABEL)
  if (m && m[2]) {
    return (
      <>
        <b>{m[1]}</b> {m[2]}
      </>
    )
  }
  return text
}

export default function RichAnswer({ text }) {
  const lines = String(text || '').split('\n')
  const blocks = []
  let list = null
  let listType = null

  const closeList = () => {
    if (list) blocks.push({ type: listType, items: list })
    list = null
    listType = null
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    const mBul = line.match(BULLET)
    const mNum = line.match(NUMBERED)
    if (mBul) {
      if (listType !== 'ul') {
        closeList()
        listType = 'ul'
        list = []
      }
      list.push(mBul[1])
    } else if (mNum) {
      if (listType !== 'ol') {
        closeList()
        listType = 'ol'
        list = []
      }
      list.push(mNum[2])
    } else {
      closeList()
      blocks.push({ type: 'p', text: line })
    }
  }
  closeList()

  return (
    <div className="rich-answer">
      {blocks.map((b, i) => {
        if (b.type === 'ul')
          return (
            <ul key={i}>
              {b.items.map((t, j) => (
                <li key={j}>
                  <Line text={t} />
                </li>
              ))}
            </ul>
          )
        if (b.type === 'ol')
          return (
            <ol key={i}>
              {b.items.map((t, j) => (
                <li key={j}>
                  <Line text={t} />
                </li>
              ))}
            </ol>
          )
        return (
          <p key={i}>
            <Line text={b.text} />
          </p>
        )
      })}
    </div>
  )
}
