---
title: "Hardware Havoc - N@tM Preparation Plan"
permalink: /NATM_PLAN
layout: post
---

# Hardware Havoc - N@tM Preparation Plan

**Name/Team:** [Your Name] / Hardware Havoc Team
**Skills:** A, B, C
**Purpose:** Checkpoint → Summative
**Timeline:** 10 School Days Before N@tM

---

## Project Overview

**Hardware Havoc** is a Parallel Computing Education Platform that teaches CPU concepts through gamified multiplayer collaboration.

---

### THE SUPERPOWER: Room Code Multiplayer System

> **"Learn together, light up the CPU together"**

Our standout feature is the **collaborative room system**:
1. **Create/Join Rooms** - Teachers create rooms, students join with a 6-character code (e.g., `ABC123`)
2. **Synchronized Progress** - Everyone in the room sees each other's module completion in real-time
3. **Collective Achievement** - A CPU core only lights up when **ALL members** complete that module
4. **Visual Reward** - Watch the CPU visualization glow as your team progresses together

This mirrors real parallel computing: just like CPU cores must synchronize, students must all complete a module before the "core" activates. **The metaphor IS the lesson.**

---

### Core Features:
- **Room Code Multiplayer** - Join collaborative rooms with 6-character codes (THE SUPERPOWER)
- **6 CPU Modules** - Learning modules that "light up" CPU cores when completed
- **Progress Tracking** - Individual + room-wide completion tracking
- **Glossary System** - Shared term definitions within rooms
- **AI Quiz Grading** - Gemini AI grades free-response answers about parallel computing
- **Speedup Calculator** - Calculate parallel speedup (Amdahl's Law)

### Tech Stack:
- **Backend:** Flask + SQLite + JWT Auth + Gemini AI
- **Frontend:** Jekyll GitHub Pages
- **Key Files:**
  - Frontend: `frontend/hacks/frontend.md`
  - Backend Quest API: `backend/Quest/routes/`

---

## 10-Day Calendar Plan

### Day 1 - Foundation & Task Selection
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Identify YOUR individual task from the features below | Skill A | ☐ |
| 2 | Review Quest API routes in `backend/Quest/routes/` | Skill B | ☐ |
| 3 | Map your task to specific frontend + backend code | Skill B | ☐ |
| 4 | Draft 1-minute video script outline | Skill A | ☐ |
| 5 | Team sync: assign presentation roles | Skill C | ☐ |

---

### Day 2 - Code Deep Dive
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Document your task's INPUT (form, button, Postman) | Skill B | ☐ |
| 2 | Document your task's OUTPUT (API response, UI update) | Skill B | ☐ |
| 3 | Identify the PROCEDURE (backend function) | Skill B | ☐ |
| 4 | Trace data flow: Frontend fetch → API → Database → Response | Skill B | ☐ |
| 5 | **CHECKPOINT:** Show instructor your task selection | Checkpoint | ☐ |

---

### Day 3 - Create PT Written Response Draft
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Write PPR 3a: Describe your procedure | Skill B | ☐ |
| 2 | Write PPR 3b: Describe sequencing/selection/iteration | Skill B | ☐ |
| 3 | Write PPR 3c: Describe your list/collection usage | Skill B | ☐ |
| 4 | Screenshot your code segments (input, output, procedure) | Skill B | ☐ |
| 5 | Annotate code with comments explaining logic | Skill B | ☐ |

---

### Day 4 - Video Recording Prep
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Finalize 1-minute video script | Skill A | ☐ |
| 2 | Set up screen recording software | Skill A | ☐ |
| 3 | Practice demo walkthrough (input → process → output) | Skill A | ☐ |
| 4 | Prepare localhost environment for recording | Skill A | ☐ |
| 5 | **CHECKPOINT:** Review video script with peer | Checkpoint | ☐ |

---

### Day 5 - Video Recording & Iteration
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Record first draft of 1-minute video | Skill A | ☐ |
| 2 | Review timing (must be under 60 seconds) | Skill A | ☐ |
| 3 | Re-record if needed | Skill A | ☐ |
| 4 | Export video in required format | Skill A | ☐ |
| 5 | **CHECKPOINT:** Submit video draft for feedback | Checkpoint | ☐ |

---

### Day 6 - Team Presentation Planning
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Team: Draft 1-minute primary overview script | Skill C | ☐ |
| 2 | Lead with the SUPERPOWER: "Join a room, learn together, light up the CPU together" | Skill C | ☐ |
| 3 | Demo flow: Create Room → Share Code → Multiple users join → Complete module → Core lights up for ALL | Skill C | ☐ |
| 4 | Assign individual 1-minute presentations | Skill C | ☐ |
| 5 | Prepare deployment diagram (Frontend → Backend → SQLite) | Skill C | ☐ |

---

### Day 7 - Individual N@tM Presentation Prep
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Prepare YOUR individual presentation (choose focus below) | Skill C | ☐ |
| 2 | Option A: UI Walkthrough - Room join, module completion, CPU glow effect | Skill C | ☐ |
| 3 | Option B: API demo via Postman - Auth, progress, rooms endpoints | Skill C | ☐ |
| 4 | Option C: Debugging session showing fetch → Flask → SQLite | Skill C | ☐ |
| 5 | **CHECKPOINT:** Practice presentation with teammate | Checkpoint | ☐ |

---

### Day 8 - Transactional & Bulk Data Demos
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Prepare CRUD demo: Create room, Join room, Complete module, Leave room | Skill C | ☐ |
| 2 | Show database changes via SQLite viewer (Quest/database.db) | Skill C | ☐ |
| 3 | Prepare room reset demo (reset progress mid-game) | Skill C | ☐ |
| 4 | Demo destroy & restart on localhost | Skill C | ☐ |
| 5 | Document your "happy moments" / eureka events | Skill C | ☐ |

---

### Day 9 - Final Polish & Integration
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Finalize Create PT video (final edit) | Skill A | ☐ |
| 2 | Finalize PPR written responses | Skill B | ☐ |
| 3 | Team run-through of full presentation | Skill C | ☐ |
| 4 | Test all demos work on presentation device | Skill C | ☐ |
| 5 | **CHECKPOINT:** Full presentation dry run | Checkpoint | ☐ |

---

### Day 10 - Pre-N@tM Final Prep
| # | Item | Type | Status |
|---|------|------|--------|
| 1 | Submit Create PT (Video + Code + PPR) | Skill A/B | ☐ |
| 2 | Final team presentation practice | Skill C | ☐ |
| 3 | Prepare backup demo (screenshots if live fails) | Skill C | ☐ |
| 4 | Feature/Issue lifecycle documentation complete | Skill C | ☐ |
| 5 | **READY FOR N@tM** | Summative | ☐ |

---

## Skill A/B - Individual Task Options (Pick ONE)

Based on Hardware Havoc's actual codebase:

### Option 1: Module Completion + CPU Core Lighting
**Best for showing input/output/procedure with visual feedback**
- **Frontend:** `frontend/hacks/frontend.md` - `completeModule()` function (line ~2081)
- **Backend:** `backend/Quest/routes/progress.py` - `complete_module()` endpoint
- **Input:** User clicks module button after learning
- **Output:** CPU core lights up, room progress updates
- **List Used:** `completed_modules` array tracking which modules done
- **Procedure:** `User.mark_module_complete()` + `Room.check_and_update_room_progress()`

### Option 2: Room Join/Create System (THE SUPERPOWER)
**Best for showing CRUD operations + the core multiplayer feature**
- **Frontend:** `frontend/hacks/frontend.md` - `joinRoom()`, `createRoom()` functions
- **Backend:** `backend/Quest/routes/rooms.py` - `/join`, `/` POST endpoints
- **Input:** User enters 6-character room code (e.g., `ABC123`)
- **Output:** User added to room, room info displayed, synced with other members
- **List Used:** `room_members` table, rooms list
- **Procedure:** `Room.add_member()`, `Room.find_by_code()`
- **Why this option:** This IS the superpower - the multiplayer room system that makes learning collaborative

### Option 3: AI Quiz Grading (Gemini)
**Best for showing external API integration**
- **Frontend:** Quiz submission form
- **Backend:** `backend/main.py` - `grade_quiz()` endpoint (line ~244)
- **Input:** Student's free-response answer about parallel computing
- **Output:** AI-graded score (0-3) + feedback
- **List Used:** `RECENT_ATTEMPTS` list storing attempt history
- **Procedure:** `summarize_attempts()` - shows sequencing, selection, iteration

### Option 4: Glossary System
**Best for showing collaborative data**
- **Frontend:** `frontend/hacks/frontend.md` - `addGlossaryEntry()`, `loadGlossary()`
- **Backend:** `backend/Quest/routes/glossary.py`
- **Input:** User adds term + definition
- **Output:** Term appears in shared room glossary
- **List Used:** Glossary entries list per room
- **Procedure:** Create, read, update, delete glossary terms

### Option 5: Room Progress Tracking
**Best for showing aggregation logic**
- **Frontend:** `frontend/hacks/frontend.md` - `loadRoomProgress()` function
- **Backend:** `backend/Quest/routes/rooms.py` - `/<room_id>/progress` endpoint
- **Input:** Room ID (automatic from current room)
- **Output:** All members' progress, which CPU cores are lit
- **List Used:** `member_progress` list with each user's completed modules
- **Procedure:** `Room.get_room_stats()`, progress percentage calculation

---

## Skill B - Code Documentation Template

```markdown
### My Task: [TASK NAME]

#### Input
- **File:** [frontend file]
- **Code:**
```javascript
// Show the fetch call or form submission
```

#### Output
- **File:** [API response handling]
- **Code:**
```javascript
// Show what happens with the response
```

#### Procedure (Backend)
- **File:** `backend/Quest/routes/[file].py`
- **Function:** [function_name]
- **Contains:**
  - Sequencing: [describe order of operations]
  - Selection: [describe if/else logic]
  - Iteration: [describe any loops]

#### List/Collection
- **Data Structure:** [SQLite table or Python list]
- **How it's used:** [describe read/write operations]
```

---

## Skill C - N@tM Presentation Outline

### Primary Team Overview (1 min)

**LEAD WITH THE SUPERPOWER:**

- [ ] **Hook:** "What if learning felt like a multiplayer game?"
- [ ] **The Superpower:** "Hardware Havoc uses room codes to connect learners. Join with a 6-character code, complete modules together, and watch CPU cores light up - but ONLY when everyone finishes."
- [ ] **Why it matters:** "This mirrors real parallel computing - cores must synchronize. The multiplayer mechanic IS the lesson."
- [ ] **Demo:** Show 2+ users in same room → one completes module → core stays dark → other completes → CORE LIGHTS UP

### Your Individual Presentation (1 min)
Choose 2-3:
- [ ] **Superpower Deep Dive:** Show room code generation, how multiple users sync, the "waiting for others" state
- [ ] **UI Walkthrough:** Show the room join flow → enter code → see other members → complete together
- [ ] **API Demo:** Use Postman to show `/api/rooms/join`, `/api/rooms/<id>/progress`, `/api/progress/complete`
- [ ] **Database:** Open SQLite viewer, show `room_members` table linking users to rooms
- [ ] **Code Walkthrough:** Show `joinRoom()` → `apiCall()` → `Room.add_member()` → member sync
- [ ] **Debugging:** Network tab showing room progress polling, Flask logs showing member updates
- [ ] **Happy Moment:** The first time multiple users saw the same core light up simultaneously

---

## Key Files Quick Reference

### Frontend
```
frontend/hacks/frontend.md          # Main Hardware Havoc UI (all JS + HTML)
  - Line ~1935: createRoom()
  - Line ~1951: joinRoom()
  - Line ~2081: completeModule()
  - Line ~2114: loadRoomProgress()
  - Line ~2361: loadGlossary()
```

### Backend Quest API
```
backend/Quest/routes/
  auth.py       # /api/auth - Register, login, JWT
  rooms.py      # /api/rooms - Create, join, leave rooms
  progress.py   # /api/progress - Complete modules, track progress
  glossary.py   # /api/glossary - CRUD glossary terms
  speedup.py    # /api/speedup - Amdahl's law calculator

backend/main.py
  - Line ~244: grade_quiz() - AI grading with Gemini
  - Line ~196: summarize_attempts() - List + procedure example
```

### Database
```
backend/Quest/database.db           # SQLite database
backend/Quest/models/
  user.py       # User model + completed_modules
  room.py       # Room model + room_members
```

---

## Checkpoint Schedule

| Checkpoint | Day | What to Show |
|------------|-----|--------------|
| 1 | Day 2 | Task selection + code file mapping |
| 2 | Day 4 | Video script review |
| 3 | Day 5 | Video draft |
| 4 | Day 7 | Presentation practice |
| 5 | Day 9 | Full dry run |

---

## Remember

> "Computer Science is best done through iteration; you will never be done with these items."

> "I am already late for my next checkpoint."

**Checkpoint multiple times = Engineer mindset**

---

## Quick Start Commands

```bash
# Start backend
cd backend
python main.py

# Frontend is served via Jekyll/GitHub Pages
# Access at localhost or deployed URL

# Test API with curl
curl -X POST http://localhost:8405/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```
