import type { PhoneView, StoryEvent, StoryRoute } from './types'
import { aStory } from './routes/a'
import { bStory } from './routes/b'
import { jackStory } from './routes/jack'
export const stories: Record<StoryRoute['id'], StoryRoute> = { a:aStory, b:bStory, jack:jackStory }
export function getView(events: StoryEvent[], index: number): PhoneView {
  const view: PhoneView = { app:'messages', screen:'home', threadId:null, messages:[], typing:null, notification:null, call:null, notes:null, findMy:null, glitch:null }
  for (const event of events.slice(0, index + 1)) {
    view.notification = null
    view.glitch = null
    switch (event.type) {
      case 'openApp': case 'appSwitch': view.app=event.app; view.screen='inbox'; view.threadId=null; view.typing=null; break
      case 'inbox': view.app=event.app; view.screen='inbox'; view.threadId=null; view.typing=null; break
      case 'openThread': view.threadId=event.threadId; view.screen='thread'; view.typing=null; break
      case 'message': view.messages.push(event.message); view.typing=null; break
      case 'removeMessage': view.messages=view.messages.filter(message=>message.id!==event.messageId); break
      case 'typing': view.typing=event.active ? event.sender : null; break
      case 'notification': view.notification=event; break
      case 'call': view.call=event; view.screen='call'; break
      case 'notes': view.notes=event; view.screen='notes'; break
      case 'findMy': view.findMy=event; view.screen='findMy'; break
      case 'glitch': view.glitch=event; break
      case 'pause': case 'complete': break
    }
  }
  return view
}
