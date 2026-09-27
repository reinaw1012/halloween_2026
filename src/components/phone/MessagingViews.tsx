import { AnimatePresence, motion } from 'motion/react'
import type { AppId, PhoneConfig, PhoneView, StoryMessage, Thread } from '../../story/types'
import { PhoneIcon } from './PhoneIcon'
import { imageUrl } from '../../story/imageUrl'

export function Avatar({ name, initials, color, photo, active = false, group = false }: {
  name: string
  initials: string
  color: string
  photo?: string
  active?: boolean
  group?: boolean
}) {
  return <span className={`avatar ${active ? 'avatar--active' : ''} ${group ? 'avatar--group' : ''}`} style={{ backgroundColor: color }} aria-label={name}>
    {photo ? <img src={imageUrl(photo)} alt="" /> : initials}
  </span>
}

function getOtherContact(phone: PhoneConfig, thread: Thread) {
  return phone.contacts[thread.participants.find(id => id !== phone.id) ?? '']
}

function InboxRow({ phone, thread, messages }: { phone: PhoneConfig; thread: Thread; messages: StoryMessage[] }) {
  const recent = messages.filter(message => message.threadId === thread.id).at(-1)
  const contact = getOtherContact(phone, thread)
  return <div className={`inbox-row ${thread.pinned ? 'inbox-row--pinned' : ''}`}>
    <Avatar name={thread.title} initials={thread.group ? thread.groupIcon ?? '••' : contact?.initials ?? '?'} color={contact?.color ?? '#85859b'} photo={thread.photo ?? contact?.photo} group={thread.group} />
    <div className="inbox-row__text">
      <strong>{thread.title}{thread.pinned && thread.app === 'messages' ? '  ·  Pinned' : ''}</strong>
      <span>{recent?.text ?? thread.preview}</span>
    </div>
    <div className="inbox-row__meta">
      <small>{recent?.timestamp ?? thread.time}</small>
      {thread.unread ? <b aria-label={`${thread.unread} unread`}>{thread.unread}</b> : null}
    </div>
  </div>
}

function MessengerInbox({ phone, messages }: { phone: PhoneConfig; messages: StoryMessage[] }) {
  const threads = phone.threads.filter(thread => thread.app === 'messenger')
  return <div className="inbox messenger-inbox">
    <div className="messenger-inbox__header">
      <h2>messenger</h2>
      <span className="messenger-inbox__tool"><PhoneIcon name="compose" /></span>
      <span className="messenger-inbox__tool"><PhoneIcon name="bell" /></span>
    </div>
    <div className="messenger-inbox__search"><PhoneIcon name="search" size={18} /> <span>Ask Meta AI or search</span></div>
    <div className="messenger-active">
      <div className="messenger-active__person"><span className="messenger-active__create">＋</span><span>Create story</span></div>
      {threads.map(thread => {
        const contact = getOtherContact(phone, thread)
        return <div className="messenger-active__person" key={thread.id}>
          <Avatar name={thread.title} initials={contact?.initials ?? '?'} color={contact?.color ?? '#85859b'} photo={thread.photo ?? contact?.photo} active />
          <span>{thread.title}</span>
        </div>
      })}
    </div>
    <div className="messenger-inbox__filters" aria-hidden="true"><span className="is-selected">All</span><span>Unread</span><span>Groups</span><span>···</span></div>
    {threads.map(thread => <InboxRow key={thread.id} phone={phone} thread={thread} messages={messages} />)}
    <div className="messenger-inbox__tabs" aria-hidden="true"><span className="is-selected"><PhoneIcon name="message"/><small>Chats</small></span><span><PhoneIcon name="people"/><small>People</small></span><span><PhoneIcon name="bell"/><small>Notifications</small></span><span><PhoneIcon name="menu"/><small>Menu</small></span></div>
  </div>
}

export function Inbox({ phone, app, messages }: { phone: PhoneConfig; app: AppId; messages: StoryMessage[] }) {
  if (app === 'messenger') return <MessengerInbox phone={phone} messages={messages} />
  return <div className="inbox">
    <div className="inbox__title"><small>INBOX</small><h2>Messages</h2><span className="inbox__count">{phone.unreadMessages} unread{phone.unreadVoicemails ? ` · ${phone.unreadVoicemails} voicemails` : ''}</span></div>
    <div className="inbox__search">⌕ &nbsp; Search</div>
    {phone.threads.filter(thread => thread.app === 'messages').map(thread => <InboxRow key={thread.id} phone={phone} thread={thread} messages={messages} />)}
  </div>
}

function ThreadHeader({ thread, phone }: { thread: Thread; phone: PhoneConfig }) {
  const contact = getOtherContact(phone, thread)
  if (thread.app === 'messenger') return <div className="thread-header messenger-thread-header">
    <span className="back-glyph" aria-hidden="true">‹</span>
    <Avatar name={thread.title} initials={contact?.initials ?? '?'} color={contact?.color ?? '#85859b'} photo={thread.photo ?? contact?.photo} />
    <div className="messenger-thread-header__title"><strong>{thread.title}</strong></div>
    <div className="messenger-thread-header__actions" aria-hidden="true"><span><PhoneIcon name="phone" size={24}/></span><span><PhoneIcon name="video" size={24}/></span></div>
  </div>
  return <div className="thread-header">
    <span className="back-glyph" aria-hidden="true">‹</span>
    <Avatar name={thread.title} initials={thread.group ? thread.groupIcon ?? '••' : contact?.initials ?? '?'} color={contact?.color ?? '#85859b'} photo={thread.photo ?? contact?.photo} group={thread.group} />
    <div><strong>{thread.title}</strong><small>{thread.unknown ? 'No contact details' : thread.group ? thread.participants.map(id => id === phone.id ? phone.label : phone.contacts[id]?.name ?? id).join(', ') : 'Conversation'}</small></div>
  </div>
}

function MessageBubble({ message, phone, group, threadPhoto }: { message: StoryMessage; phone: PhoneConfig; group: boolean; threadPhoto?: string }) {
  const own = message.sender === phone.id
  const sender = phone.contacts[message.sender]?.name ?? message.sender
  const isMessenger = message.app === 'messenger'
  const contact = phone.contacts[message.sender]
  const isIncomingIMessage = !own && !isMessenger
  return <div className={`bubble-row ${own ? 'bubble-row--own' : ''} ${isMessenger ? 'bubble-row--messenger' : ''} ${isIncomingIMessage ? 'bubble-row--imessage' : ''}`}>
    {isIncomingIMessage ? <span className="bubble-row__sender">{sender}</span> : null}
    <div className="bubble-row__line">
      {isMessenger && !own ? <Avatar name={sender} initials={contact?.initials ?? '?'} color={contact?.color ?? '#85859b'} photo={threadPhoto ?? contact?.photo} /> : null}
      {isIncomingIMessage ? <Avatar name={sender} initials={contact?.initials ?? '?'} color={contact?.color ?? '#85859b'} photo={group ? contact?.groupPhoto ?? contact?.photo : threadPhoto ?? contact?.photo} /> : null}
      <div className={`bubble ${own ? 'bubble--own' : ''} ${message.shadow ? 'bubble--shadow' : ''} ${message.compromised ? 'bubble--compromised' : ''}`}>
        <span>{message.text}</span>
        {message.reaction ? <em>{message.reaction}</em> : null}
      </div>
    </div>
    <small>{message.timestamp}{own && message.status ? ` · ${message.status === 'not-delivered' ? 'Not Delivered' : message.status}` : ''}</small>
  </div>
}

function TypingIndicator({ sender, app }: { sender: string; app: AppId }) {
  return <div className={`typing ${app === 'messenger' ? 'typing--messenger' : ''}`} role="status" aria-label={`${sender} is typing`}>
    <span>{sender} is typing</span><i /><i /><i />
  </div>
}

function Composer({ app }: { app: AppId }) {
  if (app === 'messenger') return <div className="composer messenger-composer" aria-hidden="true">
    <span className="messenger-composer__plus">＋</span><span className="messenger-composer__media"><PhoneIcon name="camera" size={22}/></span><span className="messenger-composer__media"><PhoneIcon name="photo" size={22}/></span><span className="messenger-composer__media"><PhoneIcon name="mic" size={22}/></span>
    <div>Aa <span><PhoneIcon name="smile" size={22}/></span></div><span className="messenger-composer__like">🥺</span>
  </div>
  return <div className="composer" aria-hidden="true"><span>＋</span><div>Message</div><span>↑</span></div>
}

export function ThreadView({ phone, view, reduced }: { phone: PhoneConfig; view: PhoneView; reduced: boolean | null }) {
  const thread = phone.threads.find(item => item.id === view.threadId)
  if (!thread) return null
  const messages = view.messages.filter(message => message.threadId === thread.id)
  return <div className="thread-view">
    <ThreadHeader thread={thread} phone={phone} />
    <div className="thread-view__messages" key={thread.id}>
      {thread.app === 'messages' ? <div className="thread-view__date">TODAY · OCTOBER 31</div> : null}
      <AnimatePresence initial={false}>{messages.map(message => <motion.div key={message.id} className={message.sender === phone.id ? 'message-wrap message-wrap--own' : 'message-wrap'} initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, scale: .96 }} transition={{ duration: reduced ? 0 : .28 }}>
        <MessageBubble message={message} phone={phone} group={!!thread.group} threadPhoto={thread.photo} />
      </motion.div>)}</AnimatePresence>
      {view.typing ? <TypingIndicator sender={view.typing} app={thread.app} /> : null}
    </div>
    <Composer app={thread.app} />
  </div>
}
