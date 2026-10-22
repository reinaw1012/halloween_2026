import type { PhoneView, StoryEvent, StoryRoute } from './types'
import { aStory } from './routes/a'
import { bStory } from './routes/b'
import { jackStory } from './routes/jack'
export const stories: Record<StoryRoute['id'], StoryRoute> = { a:aStory, b:bStory, jack:jackStory }
export function getView(events: StoryEvent[], index: number): PhoneView {
  const view: PhoneView = { app:'messages', screen:'home', threadId:null, time:'9:41', messages:[], previews:{}, threadVisibility:{}, lastActivity:{}, flashlightOn:null, shadowResolved:false, typing:null, notification:null, call:null, notes:null, findMy:null, glitch:null }
  let order = 0
  const lastMessageActivity: Record<string, number> = {}
  const addMessage = (message: PhoneView['messages'][number]) => { view.messages.push(message); delete view.previews[message.threadId]; view.lastActivity[message.threadId] = order; lastMessageActivity[message.threadId] = order }
  for (const event of events.slice(0, index + 1)) {
    order++
    view.notification = null
    view.glitch = null
    if (event.time) view.time = event.time
    switch (event.type) {
      case 'openApp': case 'appSwitch': view.app=event.app; view.screen='inbox'; view.threadId=null; view.typing=null; break
      case 'inbox': view.app=event.app; view.screen='inbox'; view.threadId=null; view.typing=null; break
      case 'openThread':
        view.app=event.app ?? view.app; view.threadId=event.threadId; view.screen='thread'; view.typing=null
        if (event.seedMessages) view.messages = [...view.messages.filter(message => message.threadId !== event.threadId), ...event.seedMessages, ...view.messages.filter(message => message.threadId === event.threadId)]
        break
      case 'message': addMessage(event.message); view.typing=null; break
      case 'messageBatch': event.messages.forEach(addMessage); view.typing=null; break
      case 'threadPreview':
        if (event.preview === null) {
          delete view.previews[event.threadId]
          if (lastMessageActivity[event.threadId] === undefined) delete view.lastActivity[event.threadId]
          else view.lastActivity[event.threadId] = lastMessageActivity[event.threadId]
        }
        else { view.previews[event.threadId] = { text: event.preview, time: view.time.replace(/ [AP]M$/, '') }; view.lastActivity[event.threadId] = order }
        break
      case 'threadVisibility': view.threadVisibility[event.threadId] = event.visible; if (event.visible) view.lastActivity[event.threadId] = order; break
      case 'vanishThread': view.threadVisibility[event.threadId] = false; view.messages = view.messages.filter(message => message.threadId !== event.threadId); delete view.previews[event.threadId]; delete view.lastActivity[event.threadId]; view.screen='inbox'; view.threadId=null; view.typing=null; break
      case 'editMessage': view.messages = view.messages.map(message => message.id === event.messageId ? { ...message, text: event.text, ...(event.corrupted ? { compromised:true, shadow:true } : {}) } : message); break
      case 'flashlight': view.flashlightOn = event.on; break
      case 'resolveShadow': view.shadowResolved=true; break
      case 'removeMessage': view.messages=view.messages.filter(message=>message.id!==event.messageId); break
      case 'typing': view.typing=event.active ? event.sender : null; break
      case 'notification': view.notification=event; if (event.message) addMessage(event.message); break
      case 'call': view.call=event; view.screen='call'; break
      case 'notes': view.notes=event; view.screen='notes'; break
      case 'findMy': view.findMy=event; view.screen='findMy'; break
      case 'glitch': view.glitch=event; break
      case 'pause': case 'complete': break
    }
  }
  return view
}
