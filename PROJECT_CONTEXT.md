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
scoop-backend-original/graph/
├── __init__.py
├── state.py              # ScoopState TypedDict
├── builder.py            # StateGraph construction  
└── nodes/
    ├── __init__.py
    ├── intent_classifier.py
    ├── product_search.py
    ├── profile_loader.py
    └── responder.py
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
- `main.py` - chat_stream endpoint
- `app/tools/user_tools.py` - search_products, get_user_profile
- `prompts/system_prompt.py` - SYSTEM_PROMPT

---

## 🏗️ რეპოზიტორიები

| პროექტი | GitHub | Cloud Run |
|---------|--------|-----------|
| **Frontend** | [scoop-vercel-fresh](https://github.com/Maqashable-284/scoop-vercel-fresh) | scoop-vercel |
| **Backend** | [scoop-generative-ai-sdk-28-04](https://github.com/Maqashable-284/scoop-generative-ai-sdk-28-04) | scoop-ai-sdk |

---

## 📂 ლოკალური ფაილები

### Backend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-backend-original/
├── main.py, config.py
├── app/tools/user_tools.py
├── app/memory/mongo_store.py
└── prompts/system_prompt.py
```

### Frontend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-frontend-original/
├── src/components/Chat.tsx
├── src/components/chat-response.tsx
└── src/lib/parseProducts.ts
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

## 📊 Target Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    LangGraph StateGraph                       │
├──────────────┬───────────────┬───────────────┬───────────────┤
│  START       │  intent_node  │  search_node  │  response_    │
│     ○───────▶│   (Router)    │──▶ (MongoDB)  │──▶ node       │
│              │       │       │               │       │       │
│              │    profile    │               │       ▼       │
│              │     node      │               │     END       │
└──────────────┴───────────────┴───────────────┴───────────────┘
```

---

**Last Updated:** 2026-01-16T16:50
