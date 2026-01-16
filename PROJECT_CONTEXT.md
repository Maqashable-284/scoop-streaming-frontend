# Scoop AI - Project Context

> 📋 ეს ფაილი შეიცავს პროექტის კონტექსტს ახალი AI სესიებისთვის.  
> ახალ აგენტს მიეცით ინსტრუქცია: "წაიკითხე PROJECT_CONTEXT.md და..."

---

## 🏗️ აქტიური რეპოზიტორიები

| პროექტი | GitHub | Cloud Run URL |
|---------|--------|---------------|
| **Frontend** | [scoop-vercel-fresh](https://github.com/Maqashable-284/scoop-vercel-fresh) | https://scoop-vercel-358331686110.europe-west1.run.app |
| **Backend** | [scoop-generative-ai-sdk-28-04](https://github.com/Maqashable-284/scoop-generative-ai-sdk-28-04) | https://scoop-ai-sdk-358331686110.europe-west1.run.app |

---

## 🚀 ლოკალური გაშვება

```bash
# Backend (port 8080)
cd scoop-backend-original && python3 main.py

# Frontend (port 3000)
cd scoop-frontend-original && npm run dev
```

---

## ☁️ Cloud Run - ავტო-დეპლოი

GitHub-ზე `main` ბრენჩზე push = ავტომატური Cloud Run დეპლოი

| რეპო | Cloud Run Service | Trigger |
|------|-------------------|---------|
| scoop-generative-ai-sdk-28-04 | scoop-ai-sdk | ✅ Active |
| scoop-vercel-fresh | scoop-vercel | ✅ Active |

---

## 📁 მთავარი ფაილები

### Frontend
```
src/
├── components/
│   ├── Chat.tsx              # მთავარი chat კომპონენტი
│   ├── chat-response.tsx     # პასუხის რენდერი
│   └── ProductCard.tsx       # პროდუქტის ბარათი
├── lib/
│   └── parseProducts.ts      # Markdown → Product parsing
```

### Backend
```
├── main.py                   # FastAPI server + streaming
├── config.py                 # Settings + env vars
├── app/tools/user_tools.py   # search_products, get_user_profile
├── app/memory/mongo_store.py # MongoDB manager
└── prompts/system_prompt.py  # AI personality + rules
```

---

## 📅 სესიის შეჯამება - 2026-01-16

### ✅ დღეს გაკეთებული:

1. **პროექტების გაწმენდა**
   - წაშლილია ყველა დუბლიკატი პროექტი
   - დარჩა მხოლოდ: `scoop-frontend-original`, `scoop-backend-original`
   - ახლიდან დაკლონდა GitHub-დან

2. **Cloud Run გაწმენდა**
   - წაშლილია 11 ზედმეტი სერვისი (europe-west1 + us-central1)
   - დარჩა მხოლოდ: `scoop-ai-sdk`, `scoop-vercel`

3. **CI/CD Setup (Cloud Build Triggers)**
   - Backend: Dockerfile დაემატა რეპოში
   - Environment Variables დაყენდა Cloud Run-ზე
   - ავტო-დეპლოი GitHub → Cloud Run ჩართულია

4. **MongoDB Pooling Optimization**
   - maxPoolSize=5, waitQueueTimeoutMS=2500

5. **Parser Brand Detection Fix**
   - Fallback for plain text brands in parseProducts.ts

---

## ⚠️ ცნობილი პრობლემები

- [ ] **Thinking UI** - საჭიროებს `scoop-thinking-test` backend-ს (port 8081)
- [ ] **ThinkingStepsLoader width bug** - container ვიწროვდება loading-ზე

---

## 📊 არქიტექტურა

```
┌─────────────────────────────────────────────────────────────────┐
│                         Cloud Run                               │
├─────────────────────────────┬───────────────────────────────────┤
│      scoop-vercel           │         scoop-ai-sdk              │
│      (Frontend)             │          (Backend)                │
│      Next.js                │      FastAPI + Gemini             │
│                             │                                   │
│  NEXT_PUBLIC_BACKEND_URL ───┼──────► /chat/stream               │
│                             │        /health                    │
└─────────────────────────────┴───────────────────────────────────┘
                                         │
                                         ▼
                              ┌─────────────────────┐
                              │    MongoDB Atlas    │
                              │     scoop_db        │
                              └─────────────────────┘
```

---

**Last Updated:** 2026-01-16T15:34
