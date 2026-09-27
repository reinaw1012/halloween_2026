# Gaslight, Gatekeep, Glitch

A static, scroll-driven interactive phone story built with React, TypeScript, Vite, and Motion. Readers follow Reina or KyunYong, then unlock Jack after completing both perspectives. The current routes contain placeholder dialogue to demonstrate the engine; the actual story has not been written.

Run `npm ci` and `npm run dev` for local development. Run `npm run lint` and `npm run build` before deploying. The existing GitHub Actions workflow publishes `dist` to GitHub Pages. Vite's `base` is `/halloween_2026/`, matching this repository's project Pages URL.

Story content is in `src/story/routes/`; phone personalities and inbox data are in `src/story/phoneConfigs.ts`. See [STORY_AUTHORING.md](STORY_AUTHORING.md) for examples and the event format.

For landing, contact, and group-chat photos, use the prepared folders under `public/images/` and follow [ASSETS.md](ASSETS.md).
