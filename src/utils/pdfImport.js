// Reads a PDF in the browser and turns it into Q&A items.
import * as pdfjsLib from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { parseDoc } from './parseDoc.js'

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl

// Extract text from a PDF File/Blob, keeping line breaks.
export async function extractPdfText(file) {
  const data = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data }).promise
  let text = ''
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p)
    const content = await page.getTextContent()
    let line = ''
    for (const item of content.items) {
      line += item.str
      if (item.hasEOL) {
        text += line + '\n'
        line = ''
      }
    }
    if (line) text += line + '\n'
    text += '\n'
  }
  return text
}

// Read a PDF file and return { items, text }.
export async function importPdf(file) {
  const text = await extractPdfText(file)
  const items = parseDoc(text)
  return { items, text }
}
