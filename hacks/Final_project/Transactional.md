---
permalink: /transactions
title: Quest — Transactional Data & Room Code System
lauout: post
---
# Quest — Transactional Data & Room Code System

## Database Schema

```mermaid
erDiagram
    users {
        int id PK
        string username
        string email
        string password
        string role
        int current_room_id FK
        string student_id
        string github_id
        timestamp created_at
    }

    rooms {
        int id PK
        string room_code
        string name
        int created_by FK
        timestamp created_at
    }

    room_members {
        int id PK
        int room_id FK
        int user_id FK
        timestamp joined_at
    }

    user_progress {
        int id PK
        int user_id FK
        int module_number
        timestamp completed_at
    }

    room_progress {
        int id PK
        int room_id FK
        int module_number
        timestamp completed_at
    }

    glossary {
        int id PK
        int room_id FK
        int author_id FK
        string term
        string definition
        timestamp created_at
    }

    users ||--o{ room_members : "joins"
    rooms ||--o{ room_members : "has"
    users ||--o{ user_progress : "tracks"
    rooms ||--o{ room_progress : "tracks"
    rooms ||--o{ glossary : "owns"
    users ||--o{ glossary : "authors"
    users }o--o| rooms : "current_room_id"
```

---

## Room Code System

Rooms are identified by a unique 6-character hex code (e.g. `A3F9C2`). Students never deal with internal IDs — they join by code. The demo room `DEMO01` is a special hardcoded code that always exists and cannot be deleted.

```mermaid
flowchart TD
    A[Admin: POST /api/rooms\nname] --> B[Generate random\n6-char hex code]
    B --> C{Code already\nexists?}
    C -- Yes --> B
    C -- No --> D[INSERT INTO rooms\nroom_code, name, created_by]
    D --> E[Room ready\nshare code with students]

    F[Student: POST /api/rooms/join\nroom_code] --> G[SELECT FROM rooms\nWHERE room_code = ?]
    G --> H{Room found?}
    H -- No --> I[404 Not Found]
    H -- Yes --> J[INSERT INTO room_members\nroom_id, user_id]
    J --> K[UPDATE users\nSET current_room_id = room_id]
    K --> L[Student is now\ninside the room]
```

---

## Room Membership — Two-Write Sync

Joining and leaving a room always touches two tables together. `room_members` holds the official membership record. `users.current_room_id` is a shortcut pointer used by the frontend to know which room the user is currently active in.

```mermaid
sequenceDiagram
    participant Client
    participant rooms_bp
    participant room_members
    participant users

    Note over Client,users: Join
    Client->>rooms_bp: POST /api/rooms/join { room_code }
    rooms_bp->>rooms_bp: lookup room by code
    rooms_bp->>room_members: INSERT (room_id, user_id)
    rooms_bp->>users: UPDATE current_room_id = room_id
    rooms_bp-->>Client: 200 { room }

    Note over Client,users: Leave
    Client->>rooms_bp: POST /api/rooms/:id/leave
    rooms_bp->>room_members: DELETE WHERE room_id AND user_id
    rooms_bp->>users: UPDATE current_room_id = NULL
    rooms_bp-->>Client: 200
```

---

## Module Completion — User to Room Rollup

Individual completions live in `user_progress`. A module only graduates to `room_progress` once **every member** of the room has completed it. This is the core collaborative mechanic of the room code system.

```mermaid
flowchart TD
    A[POST /api/progress/complete\nmodule_number] --> B[INSERT INTO user_progress\nuser_id, module_number\nUNIQUE constraint = idempotent]
    B --> C{User in a room?}
    C -- No --> D[Return completed_modules list]
    C -- Yes --> E["COUNT DISTINCT completions\nfor this module\nWHERE room_id = ? AND module_number = ?"]
    E --> F{count ==\ntotal members?}
    F -- No --> G[module_complete: false]
    F -- Yes --> H[INSERT INTO room_progress\nroom_id, module_number]
    H --> I[COUNT modules\nin room_progress]
    I --> J{count == 6?}
    J -- No --> K[module_complete: true\nroom_complete: false]
    J -- Yes --> L{is demo room?}
    L -- Yes --> M[room_complete: true\nis_demo: true]
    L -- No --> N[room_complete: true\nis_demo: false]
```

---

## Admin Toggle — Bidirectional Sync

Admins can manually add or remove a module completion for any user. Because `room_progress` is derived from `user_progress`, toggling one user's record must recheck whether the room-level entry should be added or revoked.

```mermaid
flowchart TD
    A[PUT /api/progress/admin/toggle\ntarget_user_id, module_number] --> B{Module already\ncompleted?}

    B -- Yes / Remove --> C[DELETE FROM user_progress]
    C --> D[recheck_room_module_progress]
    D --> E[COUNT remaining completions\nfor module in room]
    E --> F{count < total\nmembers?}
    F -- Yes --> G[DELETE FROM room_progress\nmodule un-unlocked for room]
    F -- No --> H[room_progress unchanged]

    B -- No / Add --> I[INSERT INTO user_progress]
    I --> J[check_and_update_room_progress]
    J --> K{All members\nnow complete?}
    K -- Yes --> L[INSERT INTO room_progress]
    K -- No --> M[No room-level change]
```

---

## Progress Reset

Resetting a room wipes both tiers of progress. Glossary entries survive a reset intentionally — collaborative knowledge persists across attempts.

```mermaid
flowchart TD
    A[POST /api/rooms/:id/reset-progress] --> B[DELETE FROM room_progress\nWHERE room_id = ?]
    B --> C[GET all members\nFROM room_members]
    C --> D[DELETE FROM user_progress\nWHERE user_id IN all members]
    D --> E{Is demo room?}
    E -- Yes --> F[Members stay\nRoom stays\nProgress zeroed]
    E -- No --> G[Members stay\nRoom stays\nProgress zeroed]
    F --> H[glossary untouched]
    G --> H
```

---

## Delete Cascade

Full deletion clears all relational data in dependency order.

```mermaid
flowchart TD
    subgraph Delete Room
        R1[DELETE room] --> R2[UPDATE users\nSET current_room_id = NULL\nfor all members]
        R2 --> R3[DELETE FROM glossary\nWHERE room_id]
        R3 --> R4[DELETE FROM room_progress\nWHERE room_id]
        R4 --> R5[DELETE FROM room_members\nWHERE room_id]
        R5 --> R6[DELETE FROM rooms\nWHERE id]
    end

    subgraph Delete User
        U1[DELETE user] --> U2[DELETE FROM user_progress\nWHERE user_id]
        U2 --> U3[DELETE FROM room_members\nWHERE user_id]
        U3 --> U4[DELETE FROM glossary\nWHERE author_id]
        U4 --> U5[UPDATE users\nSET current_room_id = NULL]
        U5 --> U6[DELETE FROM users\nWHERE id]
    end
```

> The demo room `DEMO01` is protected at the model layer — `delete_room()` exits early if `is_demo_room()` returns true. It can be reset but never deleted.
