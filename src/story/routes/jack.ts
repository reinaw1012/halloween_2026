import type { StoryEvent, StoryMessage, StoryRoute } from '../types'

const events: StoryEvent[] = []
let beat = 0
let messageId = 0
type EventWithoutId<T> = T extends unknown ? Omit<T, 'id'> : never

function add(event: EventWithoutId<StoryEvent>) {
  events.push({ ...event, id: `j-${++beat}` } as StoryEvent)
}

function history(threadId: string, lines: [string, string][]): StoryMessage[] {
  return lines.map(([sender, text], index) => ({ id: `${threadId}-history-${index + 1}`, threadId, sender, text, app: 'messages' }))
}

function open(threadId: string, time: string, cue: string, seedMessages?: StoryMessage[]) {
  add({ type: 'openThread', threadId, app: 'messages', time, cue, ...(seedMessages ? { seedMessages } : {}) })
}

function message(threadId: string, sender: string, text: string, time: string, cue = text, options: Partial<StoryMessage> = {}) {
  const id = `j-m${++messageId}`
  add({ type: 'message', cue, message: { id, threadId, sender, text, timestamp: time, app: 'messages', ...(sender === 'jack' ? { status: threadId === 'jack-unknown' ? 'not-delivered' as const : 'delivered' as const } : {}), ...options } })
  return id
}

open('jack-starr', '12:04 AM', '12:04 AM · Mr. Starr', history('jack-starr', [
  ['starr', 'Have you heard from Reina or KyunYong lately?'],
  ['jack', 'Yes.'],
  ['starr', 'And?'],
  ['jack', 'They are alive.'],
  ['starr', 'Jack.'],
  ['jack', 'You asked if I had heard from them.'],
  ['starr', 'You know what I meant.'],
  ['jack', 'Then ask better questions.'],
  ['starr', 'Sometimes I forget how annoying you are.'],
  ['jack', 'Age does that.'],
]))
for (const [sender, text] of [
  ['starr', 'It worked.'],
  ['jack', 'Of course it did.'],
  ['starr', 'You had no idea whether it would work.'],
  ['jack', 'I had confidence in them.'],
  ['starr', 'Yesterday you said, and I quote, "Could go either way."'],
  ['jack', 'Wisdom is knowing when not to make predictions.'],
  ['starr', 'What a convenient definition of wisdom.'],
  ['jack', 'Most good definitions are convenient (:'],
  ['starr', 'You guessed.'],
  ['jack', 'It was an educated guess.'],
  ['starr', 'Based on what?'],
  ['jack', 'Knowing those two for far too long.'],
]) message('jack-starr', sender, text, '12:04')

add({ type: 'notification', app: 'Messages', from: 'Reina', text: 'we won btw', message: { id: `j-m${++messageId}`, threadId: 'jack-a', sender: 'a', text: 'we won btw', timestamp: '12:06', app: 'messages' }, time: '12:06 AM', cue: '12:06 AM · Reina: we won btw' })
add({ type: 'notification', app: 'Messages', from: 'KyunYong', text: 'we won', message: { id: `j-m${++messageId}`, threadId: 'jack-b', sender: 'b', text: 'we won', timestamp: '12:06', app: 'messages' }, cue: 'KyunYong: we won' })

open('jack-a', '12:06 AM', 'Jack opens Reina’s message', history('jack-a', [
  ['a', 'random question'],
  ['a', 'do you think people actually get wiser when they get older'],
  ['jack', 'Some do.'],
  ['a', 'and the rest?'],
  ['jack', 'Become more confident while being wrong.'],
  ['a', 'which one are you'],
  ['jack', 'Very wise of you to ask.'],
  ['a', 'that\'s not an answer'],
  ['jack', 'You are learning.'],
]))
for (const [sender, text] of [
  ['jack', 'I know.'],
  ['a', 'how??'],
  ['jack', 'I know many things.'],
  ['a', 'Starr told you didn\'t he'],
  ['jack', 'Yes.'],
  ['a', 'smh y’all gossip too much'],
]) message('jack-a', sender, text, '12:06')

open('jack-b', '12:07 AM', '12:07 AM · KyunYong', history('jack-b', [
  ['b', 'jack'],
  ['jack', 'Yes?'],
  ['b', 'settle something'],
  ['jack', 'That sentence has caused me trouble before.'],
  ['b', 'if someone says "I\'m five minutes away"'],
  ['b', 'but they haven\'t left the house yet'],
  ['b', 'is that lying'],
  ['jack', 'Who is "someone."'],
  ['b', 'irrelevant'],
  ['jack', 'Reina?'],
  ['b', 'irrelevant'],
  ['jack', 'Then yes.'],
  ['b', 'THANK YOU'],
  ['jack', 'Unless it was you.'],
  ['b', '??'],
  ['jack', 'Then I assume there was a reason.'],
  ['b', 'favoritism'],
  ['jack', 'Experience.'],
]))
for (const [sender, text] of [
  ['jack', 'So I have heard.'],
  ['b', 'Starr?'],
  ['jack', 'Starr.'],
  ['b', 'I always wondered how you knew everything'],
  ['jack', 'People often mistake age for omniscience.'],
  ['b', 'doesn\'t help that you talk like that'],
  ['jack', 'Fair.'],
]) message('jack-b', sender, text, '12:07')

add({ type: 'inbox', app: 'messages', time: '12:12 AM', cue: '12:12 AM · Jack returns to Messages' })
add({ type: 'threadVisibility', threadId: 'jack-unknown', visible: true, cue: 'A new conversation appears: Unknown, with no preview' })
open('jack-unknown', '12:12 AM', 'Jack opens Unknown')

message('jack-unknown', 'unknown', 'What does Jordyn Woods\' bag mean?', '12:12')
message('jack-unknown', 'jack', 'Who is this', '12:12')
message('jack-unknown', 'unknown', 'She used it to prove her identity.', '12:12')
message('jack-unknown', 'jack', 'Oh.', '12:12')
message('jack-unknown', 'unknown', 'What does it mean.', '12:12')
message('jack-unknown', 'jack', 'I have no idea.', '12:12')
add({ type: 'pause', cue: 'Jack waits for a reply' })
message('jack-unknown', 'unknown', 'Why did telling Reina not to take the iPad make her take it.', '12:12')
message('jack-unknown', 'jack', 'Because she\'s Reina.', '12:12')
message('jack-unknown', 'unknown', 'That is not an answer.', '12:12')
message('jack-unknown', 'jack', 'It is if you know her.', '12:12')
message('jack-unknown', 'unknown', 'Then why did KyunYong take the watch.', '12:12')
message('jack-unknown', 'jack', 'Probably because Reina had the iPad.', '12:12')
message('jack-unknown', 'unknown', 'How was she supposed to know that was the correct thing to do.', '12:12')
message('jack-unknown', 'jack', 'It wasn\'t.', '12:12')
message('jack-unknown', 'unknown', '???', '12:12')
message('jack-unknown', 'jack', 'It just worked out.', '12:12')
message('jack-unknown', 'unknown', 'How do you understand these people.', '12:12')
message('jack-unknown', 'jack', 'I don\'t.', '12:12')
message('jack-unknown', 'unknown', 'You speak as though you do.', '12:12')
message('jack-unknown', 'jack', 'That\'s different.', '12:12')
message('jack-unknown', 'unknown', 'Then what DO you know.', '12:12')
message('jack-unknown', 'jack', 'Mostly that Reina and KyunYong tend to create problems faster than anyone else can understand them.', '12:12')
add({ type: 'pause', cue: 'A long pause' })
message('jack-unknown', 'unknown', 'I do not like them.', '12:12')
message('jack-unknown', 'jack', 'Most people come around.', '12:12')
message('jack-unknown', 'unknown', 'I will not.', '12:12')
message('jack-unknown', 'jack', 'We\'ll see.', '12:12')
message('jack-unknown', 'unknown', 'Tell them this isn\'t over.', '12:12')
message('jack-unknown', 'jack', 'Tell who', '12:12')
const lastUnknownMessage = message('jack-unknown', 'unknown', 'The Master and the Cont—', '12:12')
add({ type: 'editMessage', messageId: lastUnknownMessage, text: 'T̴h̶e̴ ̸M̶a̶s̸t̵e̶r̵ ̸a̶n̷d̵—', corrupted: true, cue: 'The message visibly corrupts' })
add({ type: 'vanishThread', threadId: 'jack-unknown', cue: 'The conversation disappears; Unknown is gone from the inbox' })

open('jack-starr', '12:15 AM', '12:15 AM · Mr. Starr')
for (const [sender, text] of [
  ['jack', 'Did anything unusual just happen to your phone?'],
  ['starr', 'No.'],
  ['jack', 'Good.'],
  ['starr', 'Why?'],
  ['jack', 'No reason.'],
  ['starr', 'Jack.'],
  ['jack', 'The path is clouded.'],
  ['starr', 'Jack.'],
  ['jack', 'Good night, Starr.'],
]) message('jack-starr', sender, text, '12:15')

add({ type: 'flashlight', on: false, cue: 'Jack turns his flashlight off' })
add({ type: 'complete', cue: 'The End' })

export const jackStory: StoryRoute = { id: 'jack', events }
