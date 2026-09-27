import type { PhoneView } from '../../story/types'

type NoteIconName = 'undo' | 'redo' | 'share' | 'more' | 'checklist' | 'attachment' | 'markup' | 'compose'

function NoteIcon({ name }: { name: NoteIconName }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  switch (name) {
    case 'undo': return <svg {...common}><path d="M8 7H4V3"/><path d="M4 7a8 8 0 1 1-1 8"/><path d="m4 7 4 4"/></svg>
    case 'redo': return <svg {...common}><path d="M16 7h4V3"/><path d="M20 7a8 8 0 1 0 1 8"/><path d="m20 7-4 4"/></svg>
    case 'share': return <svg {...common}><path d="M12 15V3m0 0L8 7m4-4 4 4"/><path d="M5 11v9h14v-9"/></svg>
    case 'more': return <svg {...common}><circle cx="12" cy="12" r="9"/><circle cx="8" cy="12" r=".8" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r=".8" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r=".8" fill="currentColor" stroke="none"/></svg>
    case 'checklist': return <svg {...common}><circle cx="5" cy="6" r="2"/><path d="m4 6 1 1 2-3M11 6h10M3 14h3m5 0h10M3 20h3m5 0h10"/></svg>
    case 'attachment': return <svg {...common}><path d="m9 15 7-7a3 3 0 0 0-4-4l-8 8a5 5 0 0 0 7 7l8-8"/></svg>
    case 'markup': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m9 17 3-10 3 10m-5-3h4"/></svg>
    case 'compose': return <svg {...common}><path d="M19 12v8H4V5h9"/><path d="m11 13 2.5-.5L21 5l-2-2-7.5 7.5L11 13Z"/></svg>
  }
}

export function NotesScreen({ view }: { view: PhoneView }) {
  return <div className="notes-screen">
    <div className="notes-screen__toolbar">
      <span className="notes-screen__back"><b aria-hidden="true">‹</b> Back</span>
      <div className="notes-screen__actions" aria-hidden="true">
        <NoteIcon name="undo" /><NoteIcon name="redo" /><NoteIcon name="share" /><NoteIcon name="more" />
      </div>
    </div>
    <span className="notes-screen__date">October 31, 2026 at 9:46</span>
    <div className="notes-screen__body">
      <h2>{view.notes?.title}</h2>
      <p>{view.notes?.body}</p>
    </div>
    <div className="notes-screen__bottom" aria-hidden="true">
      <NoteIcon name="checklist" /><NoteIcon name="attachment" /><NoteIcon name="markup" /><NoteIcon name="compose" />
    </div>
  </div>
}
