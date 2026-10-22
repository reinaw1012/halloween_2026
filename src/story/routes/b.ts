import type { AppId, StoryEvent, StoryMessage, StoryRoute } from '../types'
import { kyunyongScenes, type KyunYongScene } from './kyunyongScenes'

const events: StoryEvent[] = []
let activeApp: AppId | null = null
let activeThread: string | null = null
const starrCallWarning = 'Do not attempt another call with Reina.'

const title: Record<string, string> = {
  'b-starr': 'daddy ⭐️',
  'b-eddie': 'eddie',
  'b-a': 'Reina',
  'b-soldiers': "starr's child soldiers",
  'b-family': 'starry night fam',
}

function shortTime(time: string) {
  return time.replace(/ [AP]M$/, '')
}

function messageFor(scene: KyunYongScene, index: number): StoryMessage {
  const [sender, text] = scene.lines[index]
  const historical = index < scene.historyCount
  const intercepted = scene.id === 'k05' && index < 3
  const forged = (scene.id === 'k03' && index === 7) || (scene.id === 'k23' && index === 0) || (scene.id === 'k41' && index === 0)
  return {
    id: `${scene.id}-m${index + 1}`,
    threadId: scene.threadId,
    sender,
    text,
    ...(!historical ? { timestamp: shortTime(scene.time) } : {}),
    app: scene.app,
    ...(sender === 'b' && !historical ? { status: 'delivered' as const } : {}),
    ...(forged ? { compromised: true, shadow: true } : {}),
    ...(intercepted ? { shadow: true } : {}),
    ...(scene.id === 'k03' && index === 5 ? { reaction: '😂' } : {}),
  }
}

function openScene(scene: KyunYongScene) {
  if (activeApp === scene.app && activeThread === scene.threadId) return
  const seedMessages = scene.lines.slice(0, scene.historyCount).map((_, index) => messageFor(scene, index))
  events.push({ id: `${scene.id}-open`, type: 'openThread', app: scene.app, threadId: scene.threadId, ...(seedMessages.length ? { seedMessages } : {}), cue: `${scene.time} · ${title[scene.threadId]}`, time: scene.time })
  activeApp = scene.app
  activeThread = scene.threadId
}

function pause(id: string, cue: string, time?: string) {
  events.push({ id, type: 'pause', cue, time })
}

function afterMessage(scene: KyunYongScene, count: number) {
  if (scene.id === 'k03' && count === 16) pause('b-lego-pause', 'A pause before KyunYong guesses again')
  if (scene.id === 'k05' && count === 3) pause('b-intercepted-wait', 'KyunYong waits for a reply')
  if (scene.id === 'k21' && count === 6) pause('b-bait-standoff', 'Neither girl moves')
  if (scene.id === 'k30' && count === 5) pause('b-mission-pause', 'The watch is still on the table')
  if (scene.id === 'k31' && count === 7) pause('b-missing-watch-question', 'Reina’s next message never arrives')
  if (scene.id === 'k33' && count === 6) pause('b-starr-too-fast', 'Starr answers too quickly')
  if (scene.id === 'k37' && count === 1) pause('b-messenger-rewrite', 'KyunYong sees what she sent')
  if (scene.id === 'k38' && count === 5) pause('b-eddie-realization', 'KyunYong realizes messages can be changed')
  if (scene.id === 'k39' && count === 13) pause('b-seals-realization', 'The two girls realize what Starr did')
  if (scene.id === 'k39' && scene.lines[count - 1]?.[1] === 'HE TOLD ME THE SAME THING ABOUT YOU') pause('b-watch-ipad-pause', 'The two girls absorb what Starr told them')
  if (scene.id === 'k41' && count === 1) pause('b-forged-warning', 'A warning neither girl believes')
}

function addConversation(scene: KyunYongScene) {
  openScene(scene)
  if (scene.id === 'k03') events.push({ id: 'b-first-shadow', type: 'glitch', target: 'messenger', effect: 'smudge', cue: 'A nearly imperceptible flicker', time: scene.time })
  if (scene.id === 'k23' || scene.id === 'k37' || scene.id === 'k41') events.push({ id: `${scene.id}-flicker`, type: 'glitch', target: scene.app, effect: 'smudge', cue: 'The thread flickers', time: scene.time })
  for (let index = scene.historyCount; index < scene.lines.length; index++) {
    const message = messageFor(scene, index)
    events.push({ id: `${scene.id}-line-${index + 1}`, type: 'message', message, cue: `${scene.time} · ${title[scene.threadId]}: ${message.text.slice(0, 48)}${message.text.length > 48 ? '…' : ''}`, time: scene.time })
    afterMessage(scene, index + 1)
  }
  if (scene.id === 'k12') pause('b-no-hostage-message', 'KyunYong scrolls up; the quoted message is absent')
  if (scene.id === 'k23') pause('b-forged-message-remains', 'The forged request is still on KyunYong’s phone')
}

function addIncomingCall() {
  events.push({ id: 'b-call-rings', type: 'call', contact: 'Reina', direction: 'outgoing', outcome: 'ringing', service: 'FaceTime Audio', cue: '6:42 PM · KyunYong calls Reina', time: '6:42 PM' })
  events.push({ id: 'b-call-answered', type: 'call', contact: 'Reina', direction: 'outgoing', outcome: 'connected', service: 'FaceTime Audio', cue: 'Reina answers; the connection falters' })
  events.push({ id: 'b-call-fails', type: 'call', contact: 'Reina', direction: 'outgoing', outcome: 'failed', cue: 'Call Failed' })
  activeThread = null
}

function addInboxWarning() {
  events.push({ id: 'b-inbox-stable', type: 'inbox', app: 'messages', cue: '11:57 PM · The Messages inbox is stable', time: '11:57 PM' })
  events.push({ id: 'b-inbox-messenger', type: 'appSwitch', app: 'messenger', cue: 'KyunYong checks Messenger' })
  events.push({ id: 'b-inbox-messenger-flicker', type: 'glitch', target: 'messenger', effect: 'smudge', cue: 'Reina’s row flickers' })
  events.push({ id: 'b-inbox-return', type: 'appSwitch', app: 'messages', cue: 'Back to Messages' })
  pause('b-inbox-beat', 'Everything appears steady')
  events.push({ id: 'b-family-row-flicker', type: 'glitch', target: 'messages', effect: 'smudge', cue: 'The family row flickers for the first time' })
  events.push({ id: 'b-family-preview-forged', type: 'threadPreview', threadId: 'b-family', preview: 'daddy ⭐: IMPORTANT: SWAP THE SEALS--', cue: 'The preview changes: SWAP THE SEALS—' })
  events.push({ id: 'b-family-preview-restored', type: 'threadPreview', threadId: 'b-family', preview: null, cue: 'The true preview returns' })
  activeApp = 'messages'
  activeThread = null
}

for (const scene of kyunyongScenes) {
  if (scene.id === 'k09') addIncomingCall()
  if (scene.id === 'k11') events.push({ id: 'b-starr-call-warning', type: 'notification', app: 'Messages', from: 'daddy ⭐️', text: starrCallWarning, message: { id: 'b-starr-voice-warning-message', threadId: 'b-starr', sender: 'starr', text: starrCallWarning, timestamp: '6:43', app: 'messages' }, cue: '6:43 PM · Starr warns KyunYong', time: '6:43 PM' })
  if (scene.id === 'k41') addInboxWarning()
  addConversation(scene)
  if (scene.id === 'k41') {
    events.push({ id: 'b-midnight-pulse', type: 'glitch', target: 'messages', effect: 'jitter', cue: '12:00 AM · The Gate recognizes the exchange', time: '12:00 AM' })
    events.push({ id: 'b-shadow-stops', type: 'resolveShadow', cue: 'The disturbance stops. The screen is steady.' })
  }
}

events.push({ id: 'b-complete', type: 'complete', cue: 'The End', time: '12:01 AM' })
export const bStory: StoryRoute = { id: 'b', events }
