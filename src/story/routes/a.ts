import type { AppId, StoryEvent, StoryMessage, StoryRoute } from '../types'
import { reinaScenes, type ReinaScene } from './reinaScenes'

const events: StoryEvent[] = []
let activeApp: AppId | null = null
let activeThread: string | null = null
const starrVoiceWarning = 'Do not use voice communication with KyunYong tonight.'

const title: Record<string, string> = {
  'a-starr': 'Mr. Starr',
  'a-tom': 'Tom',
  'a-b': 'KyunYong',
  'a-soldiers': "starr's child soldiers",
  'a-family': 'starry night fam',
}

function shortTime(time: string) {
  return time.replace(/ [AP]M$/, '')
}

function capitalizeSentenceStarts(text: string) {
  const firstLetter = text.search(/\p{L}/u)
  const withCapitalizedStart = firstLetter < 0 ? text : `${text.slice(0, firstLetter)}${text[firstLetter].toLocaleUpperCase('en-US')}${text.slice(firstLetter + 1)}`
  return withCapitalizedStart.replace(/([.!?]+["'”’)]*\s+["'“”‘’([{\s]*)(\p{L})/gu, (_, prefix: string, letter: string) => `${prefix}${letter.toLocaleUpperCase('en-US')}`)
}

function addSceneScreen(scene: ReinaScene) {
  if (activeApp !== scene.app || activeThread !== scene.threadId) {
    const seedMessages = scene.lines.slice(0, scene.historyCount).map((_, index) => messageFor(scene, index)).filter((message): message is StoryMessage => message !== null)
    events.push({ id: `${scene.id}-open`, type: 'openThread', app: scene.app, threadId: scene.threadId, ...(seedMessages.length ? { seedMessages } : {}), cue: `${scene.time} · ${title[scene.threadId]}`, time: scene.time })
    activeApp = scene.app
    activeThread = scene.threadId
  }
}

function messageFor(scene: ReinaScene, index: number): StoryMessage | null {
  const [sender, text] = scene.lines[index]
  if (text.startsWith('<') && text.endsWith('>')) return null
  const own = sender === 'a'
  const historical = index < scene.historyCount
  const sentOnly = (scene.id === 's23' && index === 0) || (scene.id === 's28' && index === 7) || (scene.id === 's35' && index === 0)
  const altered = (scene.id === 's09' && index === 0) || (scene.id === 's35' && index === 1) || (scene.id === 's37' && index === 0)
  return {
    id: `${scene.id}-m${index + 1}`,
    threadId: scene.threadId,
    sender,
    text: scene.threadId === 'a-tom' ? capitalizeSentenceStarts(text) : text,
    ...(!historical ? { timestamp: shortTime(scene.time) } : {}),
    app: scene.app,
    ...(own && !historical ? { status: sentOnly ? 'sent' as const : 'delivered' as const } : {}),
    ...(altered ? { compromised: true, shadow: true } : {}),
    ...(scene.id === 's03' && index === 5 ? { reaction: '😂' } : {}),
  }
}

function addPause(id: string, cue: string, time?: string) {
  events.push({ id, type: 'pause', cue, time })
}

function afterBoundary(scene: ReinaScene, index: number) {
  if (scene.id === 's03' && index === scene.historyCount) {
    events.push({ id: 'a-first-shadow', type: 'glitch', target: 'messenger', effect: 'smudge', cue: 'A nearly imperceptible flicker', time: scene.time })
  }
  if (scene.id === 's03' && index === 20) addPause('a-reina-stops-typing', 'Reina starts to answer, then stops')
  if (scene.id === 's10' && index === 8) {
    events.push({ id: 'a-tom-typing', type: 'typing', sender: 'Tom', active: true, cue: 'Tom is typing…' })
    events.push({ id: 'a-tom-stops-typing', type: 'typing', sender: 'Tom', active: false, cue: 'Tom stops typing' })
  }
  if (scene.id === 's23' && index === 1) addPause('a-sent-unreceived', 'The question stays visible as Sent')
  if (scene.id === 's28' && index === 8) addPause('a-watch-question-lost', 'The question hangs unanswered')
  if (scene.id === 's35' && index === 1) {
    events.push({ id: 'a-late-shadow', type: 'glitch', target: 'messenger', effect: 'smudge', cue: 'The Messenger thread flickers' })
    addPause('a-late-message-wait', 'Reina waits for KyunYong’s reply')
  }
  if (scene.id === 's36' && index === 13) addPause('a-seals-realization', 'The two girls realize what Starr did')
  if (scene.id === 's36' && scene.lines[index - 1]?.[1] === 'HE TOLD ME THE SAME THING ABOUT YOU') addPause('a-watch-ipad-pause', 'The two girls absorb what Starr told them')
  if (scene.id === 's37' && index === 1) addPause('a-forged-warning', 'A warning neither girl believes')
}

function addConversation(scene: ReinaScene) {
  addSceneScreen(scene)
  if (scene.historyCount) afterBoundary(scene, scene.historyCount)
  if (scene.id === 's05') {
    for (let attempt = 1; attempt <= 3; attempt++) {
      events.push({ id: `${scene.id}-typing-${attempt}`, type: 'typing', sender: 'KyunYong', active: true, cue: `KyunYong is typing… (${attempt})`, time: scene.time })
      events.push({ id: `${scene.id}-stops-${attempt}`, type: 'typing', sender: 'KyunYong', active: false, cue: 'Typing stops' })
    }
    addPause('a-typing-long-pause', 'A longer pause')
  }
  if (scene.id === 's09' || scene.id === 's21' || scene.id === 's37') {
    events.push({ id: `${scene.id}-flicker`, type: 'glitch', target: scene.app, effect: 'smudge', cue: 'The thread flickers', time: scene.time })
  }

  for (let index = scene.historyCount; index < scene.lines.length; index++) {
    const message = messageFor(scene, index)
    if (message) events.push({ id: `${scene.id}-line-${index + 1}`, type: 'message', message, cue: `${scene.time} · ${title[scene.threadId]}: ${message.text.slice(0, 48)}${message.text.length > 48 ? '…' : ''}`, time: scene.time })
    afterBoundary(scene, index + 1)
  }
}

function addIncomingCall() {
  events.push({ id: 'a-call-rings', type: 'call', contact: 'KyunYong', direction: 'incoming', outcome: 'ringing', service: 'FaceTime Audio', cue: '6:42 PM · KyunYong calls', time: '6:42 PM' })
  events.push({ id: 'a-call-answered', type: 'call', contact: 'KyunYong', direction: 'incoming', outcome: 'connected', service: 'FaceTime Audio', cue: 'Reina answers; the connection falters' })
  events.push({ id: 'a-call-fails', type: 'call', contact: 'KyunYong', direction: 'incoming', outcome: 'failed', cue: 'Call Failed' })
  activeThread = null
}

function addNotes() {
  const body = '1. KyunYong cares too much about the Master Seal\n2. KyunYong says I sent things I didn’t send\n3. KyunYong doesn’t receive things I did send\n4. I’m hungry'
  events.push({ id: 'a-notes-open', type: 'notes', title: 'THINGS CURRENTLY WRONG', body, cue: '9:17 PM · Things currently wrong', time: '9:17 PM' })
  events.push({ id: 'a-notes-add', type: 'notes', title: 'THINGS CURRENTLY WRONG', body: `${body}\n5. Messenger???`, cue: 'Reina adds one more possibility' })
  activeThread = null
}

function addInboxWarning() {
  events.push({ id: 'a-starr-inbox-preview', type: 'threadPreview', threadId: 'a-starr', preview: 'Be at the Star Gate by 11:45.', cue: 'Mr. Starr’s latest message is in place', time: '11:57 PM' })
  events.push({ id: 'a-inbox-stable', type: 'inbox', app: 'messages', cue: '11:57 PM · The Messages inbox is stable' })
  events.push({ id: 'a-inbox-messenger', type: 'appSwitch', app: 'messenger', cue: 'Reina checks Messenger' })
  events.push({ id: 'a-inbox-messenger-flicker', type: 'glitch', target: 'messenger', effect: 'smudge', cue: 'KyunYong’s row flickers' })
  events.push({ id: 'a-inbox-return', type: 'appSwitch', app: 'messages', cue: 'Back to Messages' })
  addPause('a-inbox-beat', 'Everything appears steady')
  events.push({ id: 'a-family-row-flicker', type: 'glitch', target: 'messages', effect: 'smudge', cue: 'For the first time, the family row flickers' })
  events.push({ id: 'a-family-preview-forged', type: 'threadPreview', threadId: 'a-family', preview: 'Mr. Starr: IMPORTANT: SWAP THE SEALS--', cue: 'The preview changes: SWAP THE SEALS—' })
  events.push({ id: 'a-family-preview-restored', type: 'threadPreview', threadId: 'a-family', preview: null, cue: 'The true preview returns' })
  activeApp = 'messages'
  activeThread = null
}

for (const scene of reinaScenes) {
  if (scene.id === 's07') addIncomingCall()
  if (scene.id === 's08') events.push({ id: 'a-starr-call-warning', type: 'notification', app: 'Messages', from: 'MR. STARR', text: starrVoiceWarning, message: { id: 'a-starr-voice-warning-message', threadId: 'a-starr', sender: 'starr', text: starrVoiceWarning, timestamp: '6:43', app: 'messages' }, cue: '6:43 PM · Mr. Starr warns Reina', time: '6:43 PM' })
  if (scene.id === 's27') addNotes()
  if (scene.id === 's33') events.push({ id: 'a-doordash-picked-up', type: 'notification', app: 'DoorDash', from: 'DoorDash', text: 'Your Chipotle order has been picked up.', cue: '10:47 PM · Chipotle is on its way', time: '10:47 PM' })
  if (scene.id === 's35') addPause('a-leave-for-gate', '11:17 PM · They leave for the observatory', '11:17 PM')
  if (scene.id === 's37') addInboxWarning()
  addConversation(scene)
  if (scene.id === 's37') {
    events.push({ id: 'a-midnight-pulse', type: 'glitch', target: 'messages', effect: 'jitter', cue: '12:00 AM · The Gate recognizes the exchange', time: '12:00 AM' })
    events.push({ id: 'a-shadow-stops', type: 'resolveShadow', cue: 'The disturbance stops. The screen is steady.', time: '12:00 AM' })
    events.push({ id: 'a-doordash-arrived', type: 'notification', app: 'DoorDash', from: 'DoorDash', text: 'Your Chipotle order has arrived.', cue: '12:00 AM · Dinner arrives' })
  }
}

events.push({ id: 'a-complete', type: 'complete', cue: 'The End', time: '12:01 AM' })
export const aStory: StoryRoute = { id: 'a', events }
