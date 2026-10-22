export type RouteId = 'a' | 'b' | 'jack'
export type AppId = 'messages' | 'messenger'
export type Contact = { id: string; name: string; initials: string; color: string; photo?: string; groupPhoto?: string }
export type Thread = { id: string; app: AppId; title: string; participants: string[]; preview: string; time: string; photo?: string; groupIcon?: string; groupColor?: string; groupNames?: Record<string, string>; unread?: number; pinned?: boolean; group?: boolean; unknown?: boolean; initiallyHidden?: boolean }
export type PhoneConfig = { id: RouteId; label: string; role: string; battery: number; signalBars: 1 | 2 | 3 | 4; wifi: boolean; muted: boolean; unreadMessages: number; unreadVoicemails: number; flashlight: boolean; wallpaper: string; contacts: Record<string, Contact>; threads: Thread[] }
export type StoryMessage = { id: string; threadId: string; sender: string; text: string; timestamp?: string; app: AppId; status?: 'sent' | 'delivered' | 'read' | 'not-delivered'; reaction?: string; compromised?: boolean; shadow?: boolean; disappears?: boolean; animation?: 'quiet' | 'pop' }
type Base = { id: string; cue: string; time?: string }
export type StoryEvent =
  | (Base & { type: 'openApp' | 'appSwitch'; app: AppId })
  | (Base & { type: 'openThread'; threadId: string; app?: AppId; seedMessages?: StoryMessage[] })
  | (Base & { type: 'inbox'; app: AppId })
  | (Base & { type: 'message'; message: StoryMessage })
  | (Base & { type: 'messageBatch'; messages: StoryMessage[] })
  | (Base & { type: 'threadPreview'; threadId: string; preview: string | null })
  | (Base & { type: 'threadVisibility'; threadId: string; visible: boolean })
  | (Base & { type: 'vanishThread'; threadId: string })
  | (Base & { type: 'editMessage'; messageId: string; text: string; corrupted?: boolean })
  | (Base & { type: 'flashlight'; on: boolean })
  | (Base & { type: 'resolveShadow' })
  | (Base & { type: 'typing'; sender: string; active: boolean })
  | (Base & { type: 'notification'; from: string; text: string; app: string; message?: StoryMessage })
  | (Base & { type: 'call'; contact: string; direction: 'incoming' | 'outgoing'; outcome: 'ringing' | 'connected' | 'declined' | 'failed'; service?: string })
  | (Base & { type: 'pause'; duration?: number })
  | (Base & { type: 'glitch'; target: AppId; effect: 'signal' | 'smudge' | 'jitter' | 'vanish' })
  | (Base & { type: 'removeMessage'; messageId: string })
  | (Base & { type: 'notes'; title: string; body: string })
  | (Base & { type: 'findMy'; person: string; status: string })
  | (Base & { type: 'complete' })
export type StoryRoute = { id: RouteId; events: StoryEvent[] }
export type PhoneView = { app: AppId; screen: 'home' | 'inbox' | 'thread' | 'call' | 'notes' | 'findMy'; threadId: string | null; time: string; messages: StoryMessage[]; previews: Record<string, { text: string; time: string }>; threadVisibility: Record<string, boolean>; lastActivity: Record<string, number>; flashlightOn: boolean | null; shadowResolved: boolean; typing: string | null; notification: Extract<StoryEvent, {type:'notification'}> | null; call: Extract<StoryEvent, {type:'call'}> | null; notes: Extract<StoryEvent, {type:'notes'}> | null; findMy: Extract<StoryEvent, {type:'findMy'}> | null; glitch: Extract<StoryEvent, {type:'glitch'}> | null }
