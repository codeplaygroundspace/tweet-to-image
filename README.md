# Tweet to Image

Paste a Twitter/X URL, get a beautiful image of that tweet. Customize the background, theme, padding, and export as PNG.

## Features

- Faithful recreation of X's tweet UI (light and dark modes)
- 6 gradient backgrounds + dark + clean white presets
- Custom background color picker
- Adjustable padding, corner radius, shadow
- Export: download PNG, copy to clipboard, share to LinkedIn
- 1x / 2x / 4x export scale
- Loads with an example tweet so you can try it immediately

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How It Works

Fetches tweet data from Twitter's syndication endpoint (no API key needed), renders it as a React component matching X's native UI, and exports via `html-to-image`.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- html-to-image
- Tailwind CSS
