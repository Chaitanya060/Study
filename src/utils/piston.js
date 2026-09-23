// Runs code via the free public Wandbox API (no key, no backend — works on Vercel).
// Supports Java, Python, C, C++, JavaScript, Go, C# and more.

const LIST = 'https://wandbox.org/api/list.json'
const COMPILE = 'https://wandbox.org/api/compile.json'

const LABELS = { python: 'Python', java: 'Java', c: 'C', cpp: 'C++', javascript: 'JavaScript', go: 'Go', csharp: 'C#' }
const LANG_NAME = { python: 'Python', java: 'Java', c: 'C', cpp: 'C++', javascript: 'JavaScript', go: 'Go', csharp: 'C#' }
// Prefer these compiler-name patterns when several exist for a language.
const PREFER = {
  python: /^cpython-3/,
  javascript: /^nodejs/,
  c: /gcc.*-c$|^gcc/,
  cpp: /^gcc/,
  java: /openjdk/,
  csharp: /mono|dotnet/,
  go: /^go-/,
}

export const STARTER = {
  python: 'print("Hello, world!")\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}\n',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}\n',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, world!" << endl;\n    return 0;\n}\n',
  javascript: 'console.log("Hello, world!");\n',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, world!")\n}\n',
  csharp: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, world!");\n    }\n}\n',
}

function cmpVer(a, b) {
  const pa = String(a).split(/[.\-]/).map((x) => parseInt(x, 10) || 0)
  const pb = String(b).split(/[.\-]/).map((x) => parseInt(x, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) - (pb[i] || 0)
  }
  return 0
}

let cache = null

export async function getLanguages() {
  if (cache) return cache
  const res = await fetch(LIST)
  if (!res.ok) throw new Error('Could not load compilers')
  const list = await res.json()
  const out = []
  for (const key of Object.keys(LABELS)) {
    let comps = list.filter((c) => c.language === LANG_NAME[key])
    const pref = comps.filter((c) => PREFER[key] && PREFER[key].test(c.name))
    if (pref.length) comps = pref
    comps.sort((a, b) => cmpVer(b.version, a.version))
    const c = comps[0]
    if (c) out.push({ key, label: LABELS[key], compiler: c.name, version: c.version })
  }
  cache = out
  return out
}

export async function runCode({ compiler, source, stdin = '', langKey = '' }) {
  let code = source
  // Wandbox saves Java as prog.java, so a "public class Main" fails the filename check.
  // Drop the public modifier on top-level types so ordinary Java pastes just run.
  if (langKey === 'java') code = code.replace(/\bpublic\s+(class|interface|enum)\b/g, '$1')
  const res = await fetch(COMPILE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ compiler, code, stdin, save: false }),
  })
  if (!res.ok) {
    const t = await res.text().catch(() => '')
    throw new Error(`Execution failed (${res.status}). ${t.slice(0, 120)}`)
  }
  const d = await res.json()
  const stdout = d.program_output || ''
  const errParts = []
  if (d.compiler_error) errParts.push(d.compiler_error)
  if (d.program_error) errParts.push(d.program_error)
  return { stdout, stderr: errParts.join('\n'), code: d.status }
}
