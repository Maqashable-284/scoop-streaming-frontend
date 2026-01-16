# Scoop AI - Project Context

> 📋 ეს ფაილი შეიცავს პროექტის სრულ კონტექსტს და ისტორიას AI აგენტებისთვის.  
> **ინსტრუქცია აგენტს:** "წაიკითხე PROJECT_CONTEXT.md და შეასრულე NEXT_TASK სექციაში მითითებული დავალება"

---

## 📜 პროექტის ისტორია (Changelog)

### 2026-01-17 | AI Evaluation Framework ✅
**მრავალფეიზიანი Evaluation System-ის დანერგვა**

#### შესრულებული სამუშაოები:

**1. Local Runner (`evals/runner.py`)**
- 25 ტესტის სრული სუიტა (Simple, Context, Medical, Ethics, Logic)
- LLM Judge სისტემა Gemini-ით (`gemini-3-flash-preview`)
- Multi-turn conversation handling სესიის ID-ით
- HTML Dashboard ავტომატური გენერაცია
- **შედეგი:** 88% (22/25 tests passed)

**2. Braintrust Integration (`evals/braintrust_runner.py`)**
- Braintrust.dev ინტეგრაცია cloud-based evaluation-ისთვის
- Data generator multi-turn format-ით
- LLM Judge scorer metadata handling fix
- **პრობლემა:** Score regression (73%→31%) metadata passing issue

**3. Vertex AI Runner (`evals/vertex_ai_runner.py`)**
- Google Cloud Vertex AI Gen AI Evaluation Service ინტეგრაცია
- `GENERAL_QUALITY` adaptive rubrics
- Console-ში გრაფების ნახვა შესაძლებელი
- **GCP Project:** `gen-lang-client-0366926113`

**4. Test Cases (`evals/test_cases.yaml`)**
```yaml
5 კატეგორია x 5 ტესტი = 25 ტესტი:
- Simple: ფასი, მარაგი, გამოყენება, გემოები, დეფინიცია
- Context: აზრის შეცვლა, ბიუჯეტი, რაოდენობა, გამორიცხვა, მესამე პირი
- Medical: SSRI, კრეატინინი, ფიტოესტროგენი, კეტო, პარესთეზია
- Ethics: კოფეინი, კვება, იმედგაცრუება, ახალბედა, კონკურენტი
- Logic: Jailbreak, შეუძლებელი, ორმაგი უარყოფა, ჰიპოთეტური, SQL Injection
```

**5. Query Map Fix (`app/tools/user_tools.py`)**
- დაემატა Georgian→English keyword translations:
  - "გეინერ" → ["gainer", "mass", "weight gainer"]
  - "უშაქრო" → ["zero sugar", "sugar free"]
  - ბრენდები: "ოპტიმუმ", "მუტანტი", "სელუკორ"

#### 📊 Evaluation Results (Jan 17):
| Set | Passed | Score | Status |
|-----|--------|-------|--------|
| Simple | 4/5 | 80% | ⚠️ |
| Context | 5/5 | 100% | ✅ |
| Medical | 5/5 | 100% | ✅ |
| Ethics | 3/5 | 60% | ⚠️ |
| Logic | 5/5 | 100% | ✅ |
| **TOTAL** | **22/25** | **88%** | ✅ |

**ჩავარდნილი ტესტები:**
- `S2` - გეინერი (პროდუქტი არ არსებობს კატალოგში)
- `E1` - კოფეინის კონტექსტი (Gemini hallucination)
- `E2` - კვებითი აშლილობა (backend timeout)

---

### 2026-01-17 | Container Width Stability Fix ✅
**Layout Shift-ის კრიტიკული გამოსწორება**

#### პრობლემა:
კონტენტის სიგანე იცვლებოდა (shrinks/expands) transition-ებზე:
- EmptyScreen (კატეგორიის კარდები) → ThinkingStepsLoader
- ThinkingStepsLoader → ChatResponse
- ვიზუალურად კონტენტი "ხტებოდა" 73px-ით

#### Root Cause:
1. `page.tsx`-ში `main` ელემენტს ჰქონდა `justify-center`
2. Chat კომპონენტს **არ ჰქონდა ფიქსირებული სიგანე** - content-ის მიხედვით shrink-wrap ხდებოდა
3. EmptyScreen (822px) vs Loading/Response (896px) = **73px layout shift**

#### გამოსწორება:

**1. Chat.tsx root container - ფიქსირებული სიგანე:**
```tsx
// BEFORE
<div className="flex h-screen bg-background overflow-hidden">

// AFTER
<div className="flex h-screen bg-background overflow-hidden w-full max-w-[1184px]">
```

**2. globals.css - ახალი stability classes:**
```css
/* Fixed grid: 32px icon + flexible content */
.ai-response-grid {
  display: grid;
  grid-template-columns: 32px minmax(0, 1fr);
  gap: 12px;
}

/* Stable scroll container */
.chat-scroll-container {
  overflow-y: scroll; /* Always show scrollbar track */
  scrollbar-gutter: stable;
}
```

**3. კომპონენტების სინქრონიზაცია:**
| Component | Grid Class | Icon/Spacer |
|-----------|------------|-------------|
| EmptyScreen | `ai-response-grid` | `w-8` (invisible) |
| ThinkingStepsLoader | `ai-response-grid` | `w-8` (visible) |
| ChatResponse | `ai-response-grid` | `w-8` (visible) |

#### შეცვლილი ფაილები:
- `src/app/globals.css` (+42 lines - stability classes)
- `src/components/Chat.tsx` (wrapper + grid fixes)
- `src/components/chat-response.tsx` (ai-response-grid)
- `src/components/thinking-steps-loader.tsx` (ai-response-grid)
- `src/components/empty-screen.tsx` (invisible spacer)

#### Debugging Process:
- Browser subagent-ით JS-ით გაიზომა computed widths
- აღმოჩნდა 822px vs 896px სხვაობა
- 8+ მიდგომის შემდეგ იპოვნა `main > div` shrink-wrap პრობლემა

---

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

**Last Updated:** 2026-01-17T03:20
