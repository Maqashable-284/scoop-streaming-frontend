# Scoop AI - Next.js Frontend (Fresh UI v2.0)

Modern chat interface for Scoop.ge AI nutritionist with redesigned UI components.

## 🎨 UI Redesign Highlights (Jan 2026)

### Amber TIP Boxes
- Changed from Pine Green to warm Amber color scheme
- Variables: `--tip-bg: #FEF3C7`, `--tip-border: #FBB034`
- Lightbulb icon with enhanced visibility

### Horizontal Product Cards
- New horizontal layout (replaced vertical cards)
- **Pine Green metadata** (`#0A7364`) for servings/pricing
- **scoop.ge source pills** with external link icons
- Hover effects on product rows

### Category Cards with Icons
- Icon-based category starters (Dumbbell, Zap, Flame, Heart)
- Color-coded categories (Gold, Pine Green, Red)
- Pine Green hover effects

### Input Styling
- Pine Green focus ring
- Rounded corners
- Updated send button

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:3000
```

## 🔧 Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

## 📦 Tech Stack

- **Framework:** Next.js 16.1.1 with Turbopack
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Markdown:** react-markdown

## 🎯 Key Features

- ✅ Real-time chat with Scoop AI backend
- ✅ Product card rendering with parseProducts.ts
- ✅ TIP box with contextual advice
- ✅ Quick replies for conversation flow
- ✅ Category-based conversation starters
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Privacy controls (GDPR compliant)
- ✅ Conversation history sidebar

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Amber TIP colors, Pine Green variables
│   └── layout.tsx
├── components/
│   ├── Chat.tsx              # Main chat component, input field
│   ├── chat-response.tsx     # TIP boxes (Amber)
│   ├── thinking-steps-loader.tsx  # AI Thinking Steps (animated)
│   ├── ProductCard.tsx       # Horizontal layout (Pine Green metadata)
│   ├── empty-screen.tsx      # Category cards with icons
│   └── sidebar.tsx           # Conversation history
└── lib/
    └── parseProducts.ts      # Product markdown parser
```

## 🎨 Design System

### Colors
- **Primary:** Pine Green `#0A7364`
- **TIP Background:** Amber `#FEF3C7`
- **TIP Border:** Amber `#FBB034`
- **Metadata:** Pine Green `#0A7364`
- **Category Gold:** `#D9B444`
- **Category Red:** `#CC3348`

### Product Format (from Backend)
```markdown
**რეკომენდებული**
**Product Name**
*Brand*
**Price ₾** · Servings პორცია · Price/Serving ₾/პორცია
Description
[ყიდვა →](url)
---
```

## 🔗 Related Repositories

- **Backend:** [scoop-generative-ai-sdk-28-04](https://github.com/Maqashable-284/scoop-generative-ai-sdk-28-04)
- **Old Frontend:** [scoop-vercel](https://github.com/Maqashable-284/scoop-vercel)

## 📝 Changelog

### v2.4.0 (Jan 17, 2026) - Gemini-Style Sidebar Redesign 🎨
- ✨ **New Chat Button** - Gemini-inspired design with PenLine icon
- ✨ **Cursor Pointer** - All interactive sidebar elements now show pointer cursor
- 🔧 Removed 'ბოლო საუბრები' header from sidebar
- 🔧 Hidden close (X) button on desktop (mobile only now)
- 🔧 Fixed scrolling jump behavior in Chat.tsx
- 🔧 Removed top border from quick replies container

### v2.3.0 (Jan 15, 2026) - AI Thinking Steps Loader ✨
- ✨ **ThinkingStepsLoader** - New animated 5-step loader during AI processing
  - 📦 ვამოწმებ ხელმისაწვდომობას
  - 🔍 ვეძებ შესაბამის პროდუქტებს
  - 📄 ვადარებ მახასიათებლებს
  - 🧮 ვითვლი საუკეთესო ფასს
  - ✨ ვამზადებ რეკომენდაციას
- ✨ **CSS Animations** - checkPop, thinkingBounce, progressShimmer, pulseRing
- ✨ **Progress Bar** - Visual progress indicator with shimmer effect
- ✨ **Accessibility** - `role="status"`, `aria-live="polite"`
- 🔧 Fixed Chat.tsx render logic - ThinkingStepsLoader shows during streaming

### v2.2.0 (Jan 15, 2026) - Streaming & Privacy
- ✨ **SSE Streaming** - `/chat/stream` endpoint integration for faster perceived response
- ✨ **Consent Modal** - GDPR-compliant history consent dialog
- ✨ **Delete Data** - User can delete all their data with one click
- ✨ **Session History** - Load conversation history from backend on sidebar click
- ✨ **Loading Skeleton** - Beautiful skeleton loader while fetching history
- 🔧 Fixed Quick Reply scroll to user message

### v2.1.0 (Jan 15, 2026)
- ✨ **Header Lightweight** - White bg, 32x32 green logo block, dark text
- ✨ **New Chat Button** - Outline style with Plus icon, hover fills green
- ✨ **Input Redesign** - rounded-xl like cards, 288px fixed sidebar
- ✨ **Textarea** - Auto-resize with scroll, dynamic send/stop button
- 🔧 Fixed Quick Reply borders (restored Pine Green hover)

### v2.0.0 (Jan 14, 2026)
- ✨ Redesigned TIP boxes (Pine Green → Amber)
- ✨ Horizontal ProductCard layout
- ✨ Pine Green metadata in product cards
- ✨ Category cards with Lucide icons
- ✨ Pine Green input focus ring
- 🔧 Added scoop.ge source pills to products

### v1.x
- Initial Next.js implementation
- Sidebar with conversation history
- Privacy controls (GDPR)
- Product card rendering

## 🤝 Contributing

Design from `workout-options.zip` specifications.

## 📄 License

Proprietary - Scoop.ge
