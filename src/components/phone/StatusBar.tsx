import type { PhoneConfig, PhoneView } from '../../story/types'

function WifiIcon() {
  return <svg className="status-wifi" viewBox="0 0 20 16" aria-label="Wi-Fi connected" role="img">
    <path d="M1 5.2C6.1.7 13.9.7 19 5.2M4.3 8.7c3.2-2.9 8.2-2.9 11.4 0M7.6 12.1c1.3-1.2 3.5-1.2 4.8 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="10" cy="14" r="1.1" fill="currentColor" />
  </svg>
}

function LocationIcon() {
  return <svg className="status-location" viewBox="0 0 18 18" aria-label="Location in use" role="img">
    <circle cx="9" cy="9" r="8" fill="#1689ec" />
    <path d="m4.7 8.7 8-4-2.4 8.7-1.4-3.1-4.2-1.6Z" fill="#fff" />
  </svg>
}

function MuteIcon() {
  return <svg className="status-mute" viewBox="0 0 24 24" role="img" aria-label="Muted">
    <path d="M8 17h8l-1.4-2V9a2.6 2.6 0 0 0-5.2 0v6L8 17Zm2.7 2h2.6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 4 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
}

export function StatusBar({ phone, view, glitch }: { phone: PhoneConfig; view: PhoneView; glitch: boolean }) {
  const activeBars = Math.max(0, phone.signalBars - (glitch ? 1 : 0))
  return <div className={`status-bar ${view.screen === 'call' ? 'status-bar--on-call' : ''} ${view.screen === 'findMy' ? 'status-bar--on-map' : ''}`}>
    <span className="status-bar__left"><time>9:41</time>{phone.muted ? <MuteIcon /> : null}{view.screen === 'findMy' ? <LocationIcon /> : null}</span>
    <span className="status-bar__icons">
      <span className="signal-bars" role="img" aria-label={`${activeBars} of 4 signal bars`}>
        {[1, 2, 3, 4].map(bar => <i key={bar} className={bar <= activeBars ? 'signal-bars__active' : 'signal-bars__inactive'} />)}
      </span>
      {phone.wifi ? <WifiIcon /> : null}
      <span className={`battery ${phone.battery < 20 ? 'battery--low' : ''}`} role="img" aria-label={`${phone.battery} percent battery`}>
        <span className="battery__fill" style={{ width: `${phone.battery}%` }} />
        <span className="battery__text">{phone.battery}</span>
      </span>
    </span>
  </div>
}
