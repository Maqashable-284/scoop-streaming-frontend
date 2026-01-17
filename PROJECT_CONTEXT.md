# Scoop AI - Project Context

> 📋 ეს ფაილი შეიცავს პროექტის კონტექსტს AI აგენტებისთვის.  
> **ინსტრუქცია აგენტს:** "წაიკითხე PROJECT_CONTEXT.md და შეასრულე NEXT_TASK სექციაში მითითებული დავალება"

---

## 🎯 NEXT_TASK: LangGraph Implementation

> [!IMPORTANT]  
> **Claude Code-მა უნდა შეასრულოს ეს დავალება**

### დავალება:
შექმენი LangGraph არქიტექტურა Scoop AI-სთვის

### ფაილები შესაქმნელად:
```
scoop-backend-original/
├── graph/
│   ├── __init__.py
│   ├── state.py              # ScoopState TypedDict
│   ├── builder.py            # StateGraph construction  
│   └── nodes/
│       ├── __init__.py
│       ├── intent_classifier.py
│       ├── product_search.py
│       ├── profile_loader.py
│       └── responder.py
```

### ნაბიჯები:
1. `pip install langgraph langchain-google-genai`
2. შექმენი `graph/state.py` - ScoopState definition
3. შექმენი `graph/nodes/intent_classifier.py`  
4. შექმენი `graph/nodes/product_search.py` - არსებული search_products ლოგიკა
5. შექმენი `graph/nodes/profile_loader.py` - არსებული get_user_profile ლოგიკა
6. შექმენი `graph/nodes/responder.py` - Gemini response
7. შექმენი `graph/builder.py` - StateGraph
8. შექმენი `/chat/v2` endpoint main.py-ში
9. გატესტე და შეადარე latency `/chat/stream`-თან

### არსებული ფაილები გასაანალიზებლად:
- `main.py` - chat_stream endpoint (line ~1500)
- `app/tools/user_tools.py` - search_products, get_user_profile
- `prompts/system_prompt.py` - SYSTEM_PROMPT

---

## 🏗️ აქტიური რეპოზიტორიები

| პროექტი | GitHub | Cloud Run URL |
|---------|--------|---------------|
| **Frontend** | [scoop-vercel-fresh](https://github.com/Maqashable-284/scoop-vercel-fresh) | https://scoop-vercel-358331686110.europe-west1.run.app |
| **Backend** | [scoop-generative-ai-sdk-28-04](https://github.com/Maqashable-284/scoop-generative-ai-sdk-28-04) | https://scoop-ai-sdk-358331686110.europe-west1.run.app |

---

## 📂 ლოკალური ფაილები

### Backend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-backend-original/
├── main.py                           # FastAPI server, chat_stream endpoint
├── config.py                         # Settings, env vars
├── app/
│   ├── tools/user_tools.py           # search_products, get_user_profile
│   └── memory/mongo_store.py         # DatabaseManager, MongoDB
└── prompts/system_prompt.py          # SYSTEM_PROMPT, AI personality
```

### Frontend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-frontend-original/
├── src/components/
│   ├── Chat.tsx                      # Main chat, SSE streaming
│   ├── chat-response.tsx             # Response renderer
│   └── chat-loader.tsx               # ThinkingStepsLoader
└── src/lib/
    └── parseProducts.ts              # Markdown parser
```

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

GitHub `main` → Cloud Build → Cloud Run (ავტომატური)

| რეპო | Service | Trigger |
|------|---------|---------|
| scoop-generative-ai-sdk-28-04 | scoop-ai-sdk | ✅ |
| scoop-vercel-fresh | scoop-vercel | ✅ |

---

## 📅 სესიის ისტორია

### 2026-01-16:
- ✅ Cloud Run cleanup (11 სერვისი წაშლილია)
- ✅ CI/CD Setup (Cloud Build Triggers)
- ✅ Thinking UI მუშაობს
- ✅ PROJECT_CONTEXT.md შექმნილია
- 🔄 LangGraph Implementation დაგეგმილია

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
│                             │        /chat/v2 (LangGraph)       │
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

## 🎯 LangGraph Target Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    LangGraph StateGraph                       │
├──────────────┬───────────────┬───────────────┬───────────────┤
│  START       │  intent_node  │  search_node  │  response_    │
│     ○───────▶│   (Router)    │──▶ (MongoDB)  │──▶ node       │
│              │               │               │       │       │
│              │    ▼ allergy  │               │       ▼       │
│              │  profile_node │               │     END       │
└──────────────┴───────────────┴───────────────┴───────────────┘
```

---

**Last Updated:** 2026-01-16T16:46
