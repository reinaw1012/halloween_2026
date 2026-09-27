import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type CSSProperties } from 'react'
import type { PhoneConfig, PhoneView } from '../../story/types'
import { Inbox, ThreadView } from './MessagingViews'
import { StatusBar } from './StatusBar'
import { CallScreen } from './CallScreen'
import { FindMyScreen } from './FindMyScreen'
import { NotesScreen } from './NotesScreen'

type Props = { phone: PhoneConfig; view: PhoneView; beatId: string; complete: boolean; onExit: () => void }

function HomeScreen() {
  return <div className="phone-home">
    <div className="phone-home__clock">9:41</div><p>Saturday, October 31</p>
    <div className="phone-home__apps"><span>✉<small>Messages</small></span><span>◉<small>Messenger</small></span><span>▤<small>Notes</small></span><span>⌖<small>Find My</small></span></div>
  </div>
}

function NotificationBanner({ notification, reduced }: { notification: NonNullable<PhoneView['notification']>; reduced: boolean | null }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 3200); return () => window.clearTimeout(timer) }, [])
  return <AnimatePresence>{visible ? <motion.div className="notification" initial={reduced ? false : { opacity: 0, y: -45 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: reduced ? 0 : .22 }} role="status">
    <small>{notification.app} · now</small><strong>{notification.from}</strong><span>{notification.text}</span>
  </motion.div> : null}</AnimatePresence>
}

export function PhoneShell({ phone, view, beatId, complete, onExit }: Props) {
  const reduced = useReducedMotion()
  const glitch = !!view.glitch && view.glitch.target === view.app
  const style = { '--wallpaper': phone.wallpaper } as CSSProperties

  return <div className={`phone phone--${phone.id} phone--${view.app} phone--${view.screen} ${view.screen === 'call' && view.call?.outcome !== 'ringing' ? 'phone--call-failed' : ''} ${glitch ? 'phone--glitch' : ''}`} style={style}>
    <div className="phone__screen">
      <StatusBar phone={phone} view={view} glitch={glitch && view.glitch?.effect === 'signal'} />
      {phone.flashlight ? <div className="flashlight-dock" role="img" aria-label="Flashlight on"><svg viewBox="0 0 24 32" aria-hidden="true"><path d="M6 3h12l-1.6 7H7.6L6 3Zm1.7 10h8.6l-1.3 3v12c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V16l-1.3-3Z" fill="currentColor"/></svg></div> : null}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={`${view.screen}-${view.app}-${view.threadId ?? ''}`} className="phone__content" initial={reduced ? false : { opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .18 }}>
          {view.screen === 'home' ? <HomeScreen /> : null}
          {view.screen === 'inbox' ? <Inbox phone={phone} app={view.app} messages={view.messages} /> : null}
          {view.screen === 'thread' ? <ThreadView phone={phone} view={view} reduced={reduced} /> : null}
          {view.screen === 'call' ? <CallScreen view={view} /> : null}
          {view.screen === 'notes' ? <NotesScreen view={view} /> : null}
          {view.screen === 'findMy' ? <FindMyScreen view={view} /> : null}
        </motion.div>
      </AnimatePresence>
      {view.notification ? <NotificationBanner key={beatId} notification={view.notification} reduced={reduced} /> : null}
      <div className="home-indicator" aria-hidden="true" />
      {complete ? <div className="finish-overlay"><p>THE END</p><h2>{phone.label}'s perspective complete</h2><button type="button" onClick={onExit}>Choose another phone →</button></div> : null}
    </div>
  </div>
}
