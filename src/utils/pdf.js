import { jsPDF } from 'jspdf'

// Strips very light markdown (`code`, **bold**) to plain text for the PDF.
function clean(text) {
  return String(text)
    .replace(/```[\s\S]*?```/g, (m) => m.replace(/```/g, '').trim())
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\r/g, '')
}

// Generates and downloads a PDF for one Q&A topic.
export function downloadTopicPdf(topicLabel, items) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const margin = 48
  const maxW = pageW - margin * 2
  let y = margin

  const addPageIfNeeded = (needed) => {
    if (y + needed > pageH - margin) {
      doc.addPage()
      y = margin
    }
  }

  // Title
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(40, 40, 80)
  doc.text(`${topicLabel} — Interview Q&A`, margin, y)
  y += 22
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(120, 120, 120)
  doc.text('Chaitanya Kishore · Interview Prep', margin, y)
  y += 10
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, y, pageW - margin, y)
  y += 20

  items.forEach((item, i) => {
    // Question
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(30, 30, 60)
    const qLines = doc.splitTextToSize(`Q${i + 1}. ${clean(item.q)}`, maxW)
    addPageIfNeeded(qLines.length * 15 + 10)
    doc.text(qLines, margin, y)
    y += qLines.length * 15 + 4

    // Answer
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.setTextColor(55, 55, 55)
    const aLines = doc.splitTextToSize(clean(item.a), maxW)
    aLines.forEach((line) => {
      addPageIfNeeded(15)
      doc.text(line, margin, y)
      y += 15
    })
    y += 12
  })

  // Footer page numbers
  const total = doc.internal.getNumberOfPages()
  for (let p = 1; p <= total; p++) {
    doc.setPage(p)
    doc.setFontSize(9)
    doc.setTextColor(150, 150, 150)
    doc.text(`Page ${p} of ${total}`, pageW - margin, pageH - 20, { align: 'right' })
  }

  const safe = topicLabel.replace(/[^a-z0-9]+/gi, '_')
  doc.save(`${safe}_QA_Chaitanya.pdf`)
}
