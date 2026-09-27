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
    <mask id="mute-bell-cut"><rect width="24" height="24" fill="white"/><path d="M3 2.5 21 21" stroke="black" strokeWidth="5"/></mask>
    <g mask="url(#mute-bell-cut)" fill="currentColor">
      <path d="M12 2.5c-3.2 0-5.4 2.4-5.4 5.7v4.3c0 1.3-.5 2.5-1.4 3.5L3.8 17.5c-.5.6-.1 1.5.7 1.5h15c.8 0 1.2-.9.7-1.5L18.8 16c-.9-1-1.4-2.2-1.4-3.5V8.2c0-3.3-2.2-5.7-5.4-5.7Z"/>
      <path d="M9.1 20h5.8a3 3 0 0 1-5.8 0Z"/>
    </g>
    <path d="M3 2.5 21 21" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
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
