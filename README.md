# Valentine V2

A beautiful romantic web experience with password protection, built with Next.js, GSAP, and Framer Motion.

## Features

- 🔒 Password-protected gate with smooth animations
- 💝 Romantic gradient background with film grain texture
- ✨ GSAP-powered curtain reveal animation
- 🎨 Framer Motion shake effect for wrong password
- 🎯 Zustand state management
- 📱 Fully responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

Edit the magic word and clue in `components/Gate.tsx`:

```typescript
const MAGIC_WORD = "forever"; // Change this to your magic word
const CLUE = "The name of our first date spot..."; // Change this to your clue
```

## Customization

- **Background colors**: Edit the gradient in `components/Gate.tsx`
- **Animations**: Modify GSAP timings and effects in the `Gate` component
- **Main content**: Update `app/page.tsx` with your content after unlock

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- Zustand
- Lucide React (icons)

## Project Structure

```
valentine-v2/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Gate.tsx
├── store/
│   └── useStore.ts
└── package.json
```

## License

MIT
