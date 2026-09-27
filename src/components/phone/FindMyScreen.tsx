import type { PhoneView } from '../../story/types'

type FindIconName = 'map' | 'location' | 'contact' | 'find' | 'bell'

function FindIcon({ name }: { name: FindIconName }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.9, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  switch (name) {
    case 'map': return <svg {...common}><path d="M3 5.5 9 3l6 2.5L21 3v15.5L15 21l-6-2.5L3 21V5.5Z"/><path d="M9 3v15.5M15 5.5V21"/></svg>
    case 'location': return <svg {...common}><path d="m4 11 16-7-7 16-1.9-7.1L4 11Z"/></svg>
    case 'contact': return <svg {...common}><circle cx="12" cy="8" r="3.2" fill="currentColor" stroke="none"/><path d="M5.5 19c.5-3.4 3-5.3 6.5-5.3s6 1.9 6.5 5.3" fill="currentColor" stroke="none"/></svg>
    case 'find': return <svg {...common}><path d="M12 20V4m0 0L6.5 9.5M12 4l5.5 5.5" strokeWidth="2.6"/></svg>
    case 'bell': return <svg {...common}><path d="M6 16.5h12l-2-2.7V9a4 4 0 0 0-8 0v4.8l-2 2.7ZM10 19h4" fill="currentColor" stroke="none"/></svg>
  }
}

function MapArtwork() {
  return <svg className="find-map__art" viewBox="0 0 400 470" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized neighborhood map">
    <rect width="400" height="470" fill="#e7edda" />
    <path d="M0 0h400v225c-70-26-126-8-173 7-74 23-136 17-227-18Z" fill="#c8e6a7" />
    <path d="M0 126c52 24 99 13 142-4 45-18 95-24 142-8 49 16 74 20 116 8v84c-56-8-96 15-145 24-93 16-162-11-255-9Z" fill="#addb96" opacity=".7" />
    <path d="M0 285c75 5 110-3 155-34 64-46 108-42 245-20v239H0Z" fill="#f7f5e9" />
    <path d="M-28 160C44 232 70 257 159 289c89 31 150 81 266 203" stroke="#fff" strokeWidth="23" fill="none" />
    <path d="M-28 160C44 232 70 257 159 289c89 31 150 81 266 203" stroke="#d0d5d0" strokeWidth="5" fill="none" />
    <path d="M-10 360C112 315 140 310 235 319c71 6 111-2 181-39" stroke="#fff" strokeWidth="18" fill="none" />
    <path d="M-10 360C112 315 140 310 235 319c71 6 111-2 181-39" stroke="#d5d9d3" strokeWidth="3" fill="none" />
    <path d="M98 470c15-107 46-171 103-228 41-40 103-56 203-70" stroke="#fff" strokeWidth="16" fill="none" />
    <path d="M98 470c15-107 46-171 103-228 41-40 103-56 203-70" stroke="#d9ddd6" strokeWidth="2" fill="none" />
    {Array.from({ length: 60 }, (_, index) => {
      const col = index % 10, row = Math.floor(index / 10)
      return <rect key={index} x={10 + col * 39 + (row % 2) * 6} y={250 + row * 21} width={14 + (index % 3) * 4} height="9" rx="2" fill="#e7e7db" opacity=".85" transform={`rotate(-12 ${10 + col * 39} ${250 + row * 21})`} />
    })}
    <path d="m18 40 7 10m34 17 11 7m58-35 9 8m-102 75 10-5m85-12 8 8m181 16 11-6" stroke="#f5f8ef" strokeWidth="7" opacity=".8" />
  </svg>
}

export function FindMyScreen({ view }: { view: PhoneView }) {
  const person = view.findMy?.person ?? 'Unknown'
  return <div className="find-screen">
    <div className="find-map"><MapArtwork />
      <span className="find-map__back">‹ Maps</span>
      <div className="find-map__tools" aria-hidden="true"><span><FindIcon name="map" /></span><span><FindIcon name="location" /></span></div>
      <div className="find-map__person"><span>{person.slice(0, 1)}</span><i /></div>
    </div>
    <div className="find-sheet">
      <div className="find-sheet__handle" /><div className="find-sheet__title"><div><h2>{person}</h2><p>{view.findMy?.status}</p></div><span aria-hidden="true">×</span></div>
      <div className="find-sheet__cards"><div><span className="find-sheet__icon"><FindIcon name="contact" /></span><strong>Contact</strong></div><div><span className="find-sheet__icon"><FindIcon name="find" /></span><strong>Find</strong><small>Nearby</small></div></div>
      <div className="find-sheet__notifications"><span className="find-sheet__icon find-sheet__icon--alert"><FindIcon name="bell" /></span><strong>Notifications</strong></div>
    </div>
  </div>
}
