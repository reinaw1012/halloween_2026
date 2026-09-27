export type IconName = 'phone' | 'video' | 'camera' | 'photo' | 'mic' | 'message' | 'clock' | 'close' | 'compose' | 'people' | 'bell' | 'menu' | 'smile' | 'search'

export function PhoneIcon({ name, size = 22 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  switch (name) {
    case 'phone': return <svg {...common}><path d="M5.5 3.5 8.6 3l2 4.2-2.2 1.9a17 17 0 0 0 6.5 6.5l1.9-2.2 4.2 2-.5 3.1a2 2 0 0 1-2.1 1.6C10.5 19.4 4.6 13.5 3.9 5.6a2 2 0 0 1 1.6-2.1Z" fill="currentColor" stroke="none" /></svg>
    case 'video': return <svg {...common}><rect x="2" y="5" width="15" height="14" rx="3" fill="currentColor" stroke="none"/><path d="m18 9 4-2v10l-4-2Z" fill="currentColor" stroke="none"/></svg>
    case 'camera': return <svg {...common}><path d="M3 7h4l2-2h6l2 2h4v12H3Z"/><circle cx="12" cy="13" r="3.5"/></svg>
    case 'photo': return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m4 18 5-5 3 3 3-4 5 6"/></svg>
    case 'mic': return <svg {...common}><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v4m-4 0h8"/></svg>
    case 'message': return <svg {...common}><path d="M4 5h16v11H9l-5 4V5Z" fill="currentColor" stroke="none"/></svg>
    case 'clock': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/></svg>
    case 'close': return <svg {...common}><path d="M5 5 19 19M19 5 5 19" strokeWidth="2.5"/></svg>
    case 'compose': return <svg {...common}><path d="M13 4H4v16h16v-9M10 14l2.5-.5L21 5l-2-2-8.5 8.5L10 14Z"/></svg>
    case 'people': return <svg {...common}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6M16 15c3 0 5 2 6 5"/></svg>
    case 'bell': return <svg {...common}><path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3Zm5 3h4"/></svg>
    case 'menu': return <svg {...common}><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    case 'smile': return <svg {...common}><circle cx="12" cy="12" r="9" fill="currentColor" stroke="none"/><path d="M8 14c1 2 7 2 8 0M8.5 9.5h.1m6.8 0h.1" stroke="#fff"/></svg>
    case 'search': return <svg {...common}><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>
  }
}
