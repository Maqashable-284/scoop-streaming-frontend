# Scoop AI - Project Context

> 📋 ეს ფაილი შეიცავს პროექტის კონტექსტს ახალი AI სესიებისთვის.  
> ახალ აგენტს მიეცით ინსტრუქცია: "წაიკითხე PROJECT_CONTEXT.md და..."

---

## 🏗️ აქტიური რეპოზიტორიები

| პროექტი | ლოკალური გზა | GitHub | პორტი |
|---------|--------------|--------|-------|
| **Frontend** | `scoop-frontend-original/` | [scoop-vercel-fresh](https://github.com/Maqashable-284/scoop-vercel-fresh) | 3000 |
| **Backend** | `scoop-backend-original/` | [scoop-generative-ai-sdk-28-04](https://github.com/Maqashable-284/scoop-generative-ai-sdk-28-04) | 8080 |

---

## 🚀 Quick Start

```bash
# Backend გაშვება
cd scoop-backend-original && python3 main.py

# Frontend გაშვება
cd scoop-frontend-original && npm run dev

# URLs
# Frontend: http://localhost:3000
# Backend:  http://localhost:8080
```

---

## 📁 მთავარი ფაილები

### Frontend (`scoop-frontend-original/`)
```
src/
├── components/
│   ├── Chat.tsx              # მთავარი chat კომპონენტი
│   ├── chat-response.tsx     # პასუხის რენდერი
│   ├── chat-loader.tsx       # Loading UI
│   └── ProductCard.tsx       # პროდუქტის ბარათი
├── lib/
│   └── parseProducts.ts      # Markdown → Product parsing
└── app/
    └── globals.css           # სტილები
```

### Backend (`scoop-backend-original/`)
```
├── main.py                   # FastAPI server + streaming
├── config.py                 # Settings + env vars
├── app/
│   ├── tools/user_tools.py   # search_products, get_user_profile
│   └── memory/mongo_store.py # MongoDB manager
└── prompts/system_prompt.py  # AI personality + rules
```

---

## ⚙️ Environment Variables

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8080
```

### Backend (`.env`)
```env
GEMINI_API_KEY=...
MONGODB_URI=mongodb+srv://...?maxPoolSize=5&waitQueueTimeoutMS=2500
PORT=8080
```

---

## ✅ გადაჭრილი პრობლემები

| თარიღი | პრობლემა | გადაწყვეტა |
|--------|----------|------------|
| 2026-01-16 | Parser brand detection | Fallback for plain text brands in `parseProducts.ts` |
| 2026-01-16 | MongoDB zombie connections | Added pooling params to all clients |
| 2026-01-15 | Width instability in loader | CSS Grid fix (documented but not resolved) |

---

## ⚠️ ცნობილი პრობლემები

- [ ] **Thinking UI** - მოითხოვს `scoop-thinking-test` backend-ს (8081)
- [ ] **ThinkingStepsLoader width bug** - container ვიწროვდება loading-ზე

---

## 📊 არქიტექტურა

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│   Frontend  │────▶│  Backend (API)  │────▶│   MongoDB   │
│  Next.js    │     │  FastAPI+Gemini │     │   Atlas     │
│  port 3000  │◀────│    port 8080    │◀────│             │
└─────────────┘     └─────────────────┘     └─────────────┘
```

---

**Last Updated:** 2026-01-16
