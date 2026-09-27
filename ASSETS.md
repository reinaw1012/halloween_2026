# Adding photos

The landing page uses `public/images/landing/background.jpg` automatically. Replace that file to change its background. Put contact or group-chat pictures in `public/images/avatars/`. JPG, PNG, and WebP work for avatars; use descriptive filenames such as `reina.jpg` or `starry-night-family.jpg`.

Contact and group-chat images are configured in `src/story/phoneConfigs.ts`. Set a contact's `photo` or a thread's `photo` to the path **after** `public/`, for example:

```ts
const contact = (id: string, name: string, initials: string, color: string, photo?: string) =>
  ({ id, name, initials, color, photo })

// Contact example:
contact('a', 'Reina', 'R', '#738dab', 'images/avatars/reina.jpg')

// Group-chat thread example:
{ id: 'b-family', app: 'messages', title: 'Starry Night Family',
  participants: ['b', 'a', 'starr'], preview: 'Please answer.', time: '9:13',
  group: true, photo: 'images/avatars/starry-night-family.jpg' }
```

The avatar renderer adds Vite's base path automatically, so these image paths also work on this project's GitHub Pages site. A dark overlay over `background.jpg` keeps the landing text readable; its strength is set in `src/components/phone/ui-refresh.css`.

Incoming iMessage group messages show each sender's avatar beside their bubble. To give a sender a photo without changing their one-to-one iMessage icon, add `groupPhoto: 'images/avatars/name.jpg'` to that contact in `src/story/phoneConfigs.ts`. Reina and KyunYong already use their uploaded photos this way; other senders display their initials until a photo is assigned.

For regular iMessage icons, edit the matching entry in a phone's `contacts` map. `initials` is the text inside the circle and `color` is its background; set `photo` to replace the initials with an image. For example, KyunYong's `starr` contact currently has `initials: '⭐'`, while Tom has `initials: 'T'`. A thread's `photo` overrides the contact image in that conversation's inbox row and header. The existing Reina/KyunYong photos are attached to Messenger threads, so their regular iMessage icons remain unchanged.
