/** Fixed sample data so the preview behaves like the real launcher. */
export type Item = {
  kind: string
  name: string
  path: string
}

export const ITEMS: Item[] = [
  { kind: 'app', name: 'Google Chrome', path: 'C:\\Program Files\\Google\\Chrome\\Application' },
  { kind: 'app', name: 'Modrinth App', path: 'D:\\Games\\ModrinthApp' },
  { kind: 'folder', name: 'Documents', path: 'C:\\Users\\User\\Documents' },
  { kind: 'document', name: 'documents.pdf', path: 'C:\\Users\\User\\Documents\\documents.pdf' },
  { kind: 'document', name: 'report.docx', path: 'C:\\Users\\User\\Documents\\report.docx' },
  { kind: 'audio', name: 'podcastcast.mp3', path: 'C:\\Music\\podcastcast.mp3' },
  { kind: 'video', name: 'videodoc.mp4', path: 'C:\\Users\\User\\Videos\\videodoc.mp4' },
  { kind: 'image', name: 'screenshot.png', path: 'C:\\Users\\User\\Pictures\\screenshot.png' },
  { kind: 'archive', name: 'backup.zip', path: 'C:\\Users\\User\\backup.zip' },
  { kind: 'code', name: 'main.rs', path: 'C:\\src\\umbra\\src-tauri\\src\\main.rs' },
  { kind: 'file', name: 'notes.txt', path: 'C:\\Users\\User\\notes.txt' },
]

/** Same fuzzy-ish behaviour as the app: case-insensitive substring match. */
export function filterItems(items: Item[], query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items.filter((item) => item.name.toLowerCase().includes(q))
}

/** Wraps the matched slice in <mark>, exactly like highlightMatch() does. */
export function highlight(text: string, query: string) {
  const q = query.trim()
  if (!q) return text
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}
