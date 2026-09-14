import fs from 'fs'
import path from 'path'

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, acc)
    else if (/\.(tsx?|css)$/.test(e.name)) acc.push(p)
  }
  return acc
}

for (const f of walk('src')) {
  const b = fs.readFileSync(f)
  const t = b.toString('utf8')
  const utfOk = Buffer.compare(b, Buffer.from(t, 'utf8')) === 0
  const hasQ = /\?{4,}/.test(t)
  const hasCyr = /[А-Яа-яЁё]/.test(t)
  if (!utfOk || hasQ) {
    console.log(`${!utfOk ? 'BADUTF ' : ''}${hasQ ? 'QQQ ' : ''}${hasCyr ? 'cyr ' : 'nocyr '}${f}`)
  }
}
