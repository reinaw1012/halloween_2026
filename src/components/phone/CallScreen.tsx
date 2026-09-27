import type { PhoneView } from '../../story/types'
import { PhoneIcon, type IconName } from './PhoneIcon'

function CallAction({ icon, label, tone }: { icon: IconName; label: string; tone?: 'red' | 'green' | 'gray' }) {
  return <div className="call-action"><span className={`call-action__circle call-action__circle--${tone ?? 'plain'}`}><PhoneIcon name={icon} size={30} /></span><span>{label}</span></div>
}

export function CallScreen({ view }: { view: PhoneView }) {
  const call = view.call
  if (!call) return null
  const incoming = call.direction === 'incoming' && call.outcome === 'ringing'

  return <div className={`call-screen ${incoming ? 'call-screen--incoming' : 'call-screen--failed'}`}>
    {incoming ? <>
      <div className="incoming-call__contact"><span className="incoming-call__avatar">{call.contact.slice(0, 1)}</span><div><h2>{call.contact}</h2><p>mobile</p></div></div>
      <div className="incoming-call__bottom">
        <div className="incoming-call__quick"><CallAction icon="clock" label="Remind Me" /><CallAction icon="message" label="Message" /></div>
        <div className="incoming-call__primary"><CallAction icon="phone" label="Decline" tone="red" /><CallAction icon="phone" label="Accept" tone="green" /></div>
      </div>
    </> : <>
      <div className="failed-call__heading"><h2>{call.contact}</h2><p>{call.outcome === 'declined' ? 'Call Declined' : 'Call Failed'}</p></div>
      <div className="failed-call__actions"><CallAction icon="close" label="Cancel" tone="gray" /><CallAction icon="phone" label="Call Back" tone="green" /></div>
    </>}
  </div>
}
