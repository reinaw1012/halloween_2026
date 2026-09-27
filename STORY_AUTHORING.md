# Authoring Gaslight, Gatekeep, Glitch

The script lives in `src/story/routes/a.ts`, `b.ts`, and `jack.ts`. Each file exports a `StoryRoute` with an ordered `events` array. The player renders the phone state produced by all events through the active scroll beat. Every event needs a unique, stable `id` and a short `cue` for the scroll marker. Keep IDs stable when editing an existing route; add new IDs for new beats.

## Common beats

```ts
{ id: 'a-27', type: 'inbox', app: 'messages', cue: 'Back to the inbox' }
{ id: 'a-28', type: 'openThread', threadId: 'a-tom', cue: 'Open Tom' }
{ id: 'a-29', type: 'message', cue: 'Tom replies', message: {
  id: 'a-m7', threadId: 'a-tom', sender: 'tom', text: 'Example only.',
  timestamp: '9:47', app: 'messages', status: 'delivered'
} }
```

Add conversations to the route's phone in `src/story/phoneConfigs.ts`. Each thread declares its app (`messages` or `messenger`), participant IDs, title, initial preview, timestamp, and optional `group`, `unread`, `pinned`, or `photo` fields. Add each participant's contact record there too. A contact can also have a `photo`. Put image files in `public/images/avatars/` and use paths such as `images/avatars/reina.jpg`; see [ASSETS.md](ASSETS.md). The `PhoneConfig` object also controls battery, signal bars, Wi-Fi, mute, unread counts, flashlight, and wallpaper. To add a new phone, add a `PhoneConfig`, a route file, and register the route in `src/story/engine.ts`; landing and progress types would also need extending.

## Populating Messenger inboxes

Reina's inbox uses the `a` phone and `routes/a.ts`; KyunYong's uses the `b` phone and `routes/b.ts`. Each inbox lists every thread with `app: 'messenger'` in that phone's `threads` array. To add another conversation, first add the other person to that phone's `contacts` map, then add a thread with a unique ID, `app: 'messenger'`, a title, `participants` containing the phone ID and contact ID, `preview`, and `time`. Optionally add `photo: 'images/avatars/name.jpg'` for its inbox and chat-header picture, plus `unread` or `group: true`. For example, Reina could add `{ id: 'a-tom-messenger', app: 'messenger', title: 'Tom', participants: ['a', 'tom'], preview: 'See you soon', time: 'Yesterday' }` alongside her existing threads; her `tom` contact is already defined.

The inbox initially shows the thread's `preview` and `time`. Once a `message` event exists for that thread, the latest message text and timestamp replace them. To show the conversation in the scroll story, add an `inbox` or `appSwitch` event for Messenger, an `openThread` event using the same thread ID, then `message` events with `app: 'messenger'`, matching `threadId`, and sender IDs from `contacts` (or the phone's own ID). Add these to each perspective's route separately if both phones should show the conversation.

`openApp` or `appSwitch` opens an app inbox. `inbox` returns to an inbox. `openThread` opens one thread. A `message` adds a bubble to that route's local history. A `typing` beat with `active: true` shows the indicator; use `active: false` to stop it. Repeat these beats as often as needed. `notification` overlays the current screen for about three seconds. `call`, `notes`, and `findMy` open their scripted screens. `pause` holds the current screen for a scroll beat. `complete` marks the route finished and saves progress.

## Interception and Shadow Monster effects

Reina's and KyunYong's Messenger histories are **separate route data**. Their internal route IDs remain `a` and `b`, so existing event IDs and saved progress stay stable. Do not share a single transcript. A message in KyunYong's route can be omitted from Reina's route, rewritten on Reina's route, or inserted on either side. To show an unsent message on KyunYong's phone, add a `message` beat and then a `removeMessage` beat referencing its message ID. This removes it from later KyunYong phone states, while the earlier scroll beat still shows it when scrolling back. On Reina's route, omit that message entirely. `compromised: true` and `shadow: true` on a message add restrained visual treatment. A `glitch` beat can target either `messenger` or `messages`; targeting Messages is reserved for a later breach. Available effects are `signal`, `smudge`, `jitter`, and `vanish` in the event type; the initial UI currently renders a subtle shared jitter and a signal change for the signal effect. Additional effect variants can be added in the phone CSS without changing the story data format.

## Playback and persistence

The phone view is recomputed from the event prefix on every active beat. Scrolling backward therefore reconstructs earlier state, including removed messages and stopped typing. The active beat is selected from scroll marker positions; short notification and bubble animations then play from that beat. Only route completion and the first completed main perspective are saved under the versioned localStorage key `master-controller:progress:v1`. `Reset story progress` clears those values. Jack unlocks after both Reina and KyunYong are completed.

Use `npm run dev` to preview, `npm run lint` to check lint rules, and `npm run build` for the Pages build. Keep image references compatible with Vite's base path: import assets from `src` or use `import.meta.env.BASE_URL` for files in `public`.
