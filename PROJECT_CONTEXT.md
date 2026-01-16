# Scoop AI - Project Context

> 📋 ეს ფაილი შეიცავს პროექტის კონტექსტს AI აგენტებისთვის.  
> **ინსტრუქცია აგენტს:** "წაიკითხე PROJECT_CONTEXT.md და შეასრულე NEXT_TASK სექციაში მითითებული დავალება"

---

## ✅ COMPLETED: V2 Finalization (2026-01-16)

### რა გაკეთდა:

#### Task #1: Memory Fix ✅
**პრობლემა:** `run_graph()` ფუნქცია ყოველთვის `messages: []` აგზავნიდა - ისტორია არ გადაეცემოდა LangGraph-ს.

**ფიქსი:**
1. `builder.py` - დაემატა `conversation_history` პარამეტრი `run_graph()` ფუნქციას
2. `main.py` - დაემატა Gemini→LangChain ფორმატის კონვერტერი:
   - Gemini: `{'role': 'user/model', 'parts': [{'text': '...'}]}`
   - LangChain: `{'role': 'user/assistant', 'content': '...'}`

**ვერიფიკაცია (3-step curl test):**
| Step | შეტყობინება | შედეგი |
|------|-------------|--------|
| 1 | "მაქვს დიაბეტი..." | ✅ მოდელმა აღიარა |
| 2 | "რა გაქვთ?" | ✅ **გახსოვდა:** "რადგან აღნიშნეთ, რომ გაქვთ დიაბეტი" |
| 3 | "რომელი მირჩევ?" | ✅ **გახსოვდა:** "რადგან დიაბეტი გაქვთ" |

#### Task #2: MongoDB Verification ✅
- ისტორია სწორად ინახება და იტვირთება

#### Task #3: Frontend V2 Integration ✅
- `Chat.tsx` - SSE `/chat/stream` შეიცვალა JSON `/chat/v2` -ით
- Response handling გამარტივდა (არ არის streaming parsing)

---

## 🎯 NEXT_TASK: Frontend Local Testing

> [!IMPORTANT]  
> **შემდეგი ნაბიჯი:** ფრონტენდის ლოკალური ტესტირება

### ნაბიჯები:
```bash
cd scoop-frontend-original && npm run dev
# გახსენი http://localhost:3000
# გატესტე ჩატი - შეამოწმე V2 endpoint-ის მუშაობა
```

---

## 📁 პროექტის სტრუქტურა

### Backend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-backend-original/
├── main.py                    # FastAPI + /chat/v2 endpoint
├── graph/
│   ├── builder.py            # run_graph() with conversation_history ✅
│   ├── state.py              # ScoopState TypedDict
│   └── nodes/
│       ├── intent_classifier.py
│       ├── product_search.py
│       └── responder.py
├── app/memory/mongo_store.py  # Gemini format history storage
└── prompts/system_prompt.py
```

### Frontend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-frontend-original/
├── src/components/Chat.tsx    # Uses /chat/v2 now ✅
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

## 📊 LangGraph Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    LangGraph StateGraph                       │
├──────────────┬───────────────┬───────────────┬───────────────┤
│  START       │  intent_node  │  search_node  │  responder    │
│     ○───────▶│   (Gemini)    │──▶ (MongoDB)  │──▶ (Gemini)   │
│              │       │       │               │       │       │
│              │   conversation_history        │       ▼       │
│              │      passed throughout        │     END       │
└──────────────┴───────────────┴───────────────┴───────────────┘
```

---

## 🔧 ბოლო ცვლილებები (2026-01-16)

### builder.py
```python
# BEFORE:
def run_graph(user_id, message, session_id):
    initial_state = {"messages": []}  # ❌ ცარიელი

# AFTER:
def run_graph(user_id, message, session_id, conversation_history=None):
    initial_state = {"messages": conversation_history or []}  # ✅ ისტორია
```

### main.py (/chat/v2)
```python
# გემინი→ლანგჩეინ კონვერტერი:
langchain_history = []
for msg in history:
    role = msg.get("role", "user")
    parts = msg.get("parts", [])
    content = parts[0].get("text", "") if parts else ""
    lc_role = "assistant" if role == "model" else role
    langchain_history.append({"role": lc_role, "content": content})

result = run_graph(..., conversation_history=langchain_history)
```

### Chat.tsx
```typescript
// BEFORE: SSE streaming
const response = await fetch(`${BACKEND_URL}/chat/stream`, ...);
// Complex SSE parsing...

// AFTER: Simple JSON
const response = await fetch(`${BACKEND_URL}/chat/v2`, ...);
const data = await response.json();
const responseText = data.response_text_geo || data.response;
```

---

**Last Updated:** 2026-01-16T19:29
