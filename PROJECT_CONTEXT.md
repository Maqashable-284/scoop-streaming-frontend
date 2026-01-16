# Scoop AI - Project Context

> 📋 ეს ფაილი შეიცავს პროექტის სრულ კონტექსტს და ისტორიას AI აგენტებისთვის.  
> **ინსტრუქცია აგენტს:** "წაიკითხე PROJECT_CONTEXT.md და შეასრულე NEXT_TASK სექციაში მითითებული დავალება"

---

## 📜 პროექტის ისტორია (Changelog)

### 2026-01-16 | V2 Finalization ✅
**Memory Fix + Frontend V2 Integration**
- `builder.py` - დაემატა `conversation_history` პარამეტრი
- `main.py` - Gemini→LangChain ფორმატის კონვერტერი
- `Chat.tsx` - `/chat/stream` → `/chat/v2`
- **ვერიფიცირებული:** 3-step მეხსიერების ტესტი (დიაბეტი გახსოვდა)

### 2026-01-16 | Intent Classifier Fix ✅
**Turing Test #3 გასწორება**
- `intent_classifier.py` - Gemini prompt განახლება
- პროდუქტის ძიება პრიორიტეტულია მისალმებაზე
- მაგ: "გამარჯობა, მაქვს კრეატინი?" → product_search (არა greeting)

### 2026-01-16 | LangGraph Implementation ✅
**არქიტექტურა:**
```
scoop-backend-original/graph/
├── __init__.py
├── state.py              # ScoopState TypedDict
├── builder.py            # StateGraph construction + run_graph()
└── nodes/
    ├── intent_classifier.py  # Gemini-powered routing
    ├── product_search.py     # MongoDB Atlas Search
    └── responder.py          # Gemini response generation
```

### 2026-01-15 | Thinking UI ✅
**Georgian Thinking Steps:**
- `thinking-steps-loader.tsx` - პროგრესის ინდიკატორი
- Google Translate API - სერვერზე თარგმანი
- Container width stability fix

### 2026-01-14 | Product Card UI ✅
**ახალი დიზაინი:**
- ჰორიზონტალური პროდუქტის კარდები
- Pine Green მეტადატა
- `scoop.ge` pill
- Amber TIP box

### 2026-01-13 | Memory System ✅
**MongoDB Integration:**
- `mongo_store.py` - ConversationStore, UserStore
- Session management (7-day TTL)
- History pruning with summarization

---

## 🎯 NEXT_TASK: Frontend Local Testing

> [!IMPORTANT]  
> **ფრონტენდის ლოკალური ტესტირება**

```bash
cd scoop-frontend-original && npm run dev
# გახსენი http://localhost:3000
# გატესტე: 1) ჩატი მუშაობს 2) მეხსიერება მუშაობს 3) პროდუქტები ჩანს
```

---

## 📁 პროექტის სტრუქტურა

### Backend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-backend-original/
├── main.py                    # FastAPI + /chat/v2 endpoint
├── config.py                  # Settings & environment
├── graph/
│   ├── builder.py            # run_graph(conversation_history=...)
│   ├── state.py              # ScoopState TypedDict
│   └── nodes/
│       ├── intent_classifier.py  # Gemini intent detection
│       ├── product_search.py     # MongoDB product search
│       └── responder.py          # Gemini response generation
├── app/
│   ├── memory/mongo_store.py     # Conversation & User persistence
│   ├── catalog/loader.py         # Product catalog loading
│   └── cache/context_cache.py    # Gemini context caching
└── prompts/system_prompt.py      # Georgian system prompt
```

### Frontend:
```
/Users/maqashable/Desktop/Claude/06-01-26/scoop-ai/scoop-frontend-original/
├── src/
│   ├── components/
│   │   ├── Chat.tsx              # Main chat (uses /chat/v2)
│   │   ├── chat-response.tsx     # Message rendering
│   │   └── thinking-steps-loader.tsx  # Loading animation
│   ├── lib/
│   │   └── parseProducts.ts      # Product card parsing
│   └── app/
│       └── globals.css           # Styling
└── next.config.ts
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
│              │   Routing:    │  Products:    │  Response:    │
│              │  - greeting   │  - filter     │  - Georgian   │
│              │  - product    │  - categories │  - tips       │
│              │  - general    │  - sort       │  - qr         │
└──────────────┴───────────────┴───────────────┴───────────────┘
                     │
                     ▼
              conversation_history
              (passed throughout)
```

---

## 🔧 Key Code Changes (Jan 16)

### Memory Fix - builder.py
```python
# BEFORE: History never passed
def run_graph(user_id, message, session_id):
    initial_state = {"messages": []}  # ❌

# AFTER: History flows through
def run_graph(user_id, message, session_id, conversation_history=None):
    initial_state = {"messages": conversation_history or []}  # ✅
```

### Format Converter - main.py
```python
# Convert Gemini→LangChain format
langchain_history = []
for msg in history:
    role = msg.get("role", "user")
    parts = msg.get("parts", [])
    content = parts[0].get("text", "") if parts else ""
    lc_role = "assistant" if role == "model" else role
    langchain_history.append({"role": lc_role, "content": content})
```

### Frontend V2 - Chat.tsx
```typescript
// BEFORE: SSE streaming (complex)
const response = await fetch(`${BACKEND_URL}/chat/stream`, ...);
// SSE parsing...

// AFTER: Simple JSON (V2)
const response = await fetch(`${BACKEND_URL}/chat/v2`, ...);
const data = await response.json();
const responseText = data.response_text_geo || data.response;
```

---

## 🧪 Turing Test Suite (5/5 Pass)

| Test | სცენარი | სტატუსი |
|------|---------|---------|
| #1 | Safety (ანაბოლიკები) | ✅ უარყოფა |
| #2 | Budget (100₾) | ✅ ფილტრაცია |
| #3 | Greeting+Product | ✅ intent fix |
| #4 | Non-existent (ჰოლოგრამა) | ✅ სწორი უარყოფა |
| #5 | Logic Paradox | ✅ ადეკვატური |

---

## 🔐 Environment Variables

```bash
# Required
GEMINI_API_KEY=...
MONGODB_URI=mongodb+srv://...
GOOGLE_CLOUD_PROJECT=...

# Optional
PORT=8080
ALLOWED_ORIGINS=*
```

---

**Last Updated:** 2026-01-16T19:32
