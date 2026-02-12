---
toc: false
layout: post
title: "Hardware Havoc — N@tM Presentation"
description: "Project-Based Learning Presentation Slides"
permalink: /skillc-presentation
breadcrumbs: false
---

<style>
  /* ── Slideshow engine ── */
  .slide-deck { position: relative; width: 100%; max-width: 1000px; margin: 0 auto; }

  .slide {
    display: none;
    padding: 36px 40px;
    min-height: 520px;
    background: linear-gradient(135deg, rgba(26,32,40,0.96), rgba(18,23,30,0.96));
    border: 2px solid rgba(0,255,170,0.28);
    border-left: 5px solid #00ffaa;
    border-radius: 2px;
    box-shadow: 0 0 30px rgba(0,255,170,0.15);
    position: relative;
    overflow: hidden;
    color: #e0e6ed;
    font-family: 'Courier New', 'Consolas', monospace;
    letter-spacing: 0.3px;
    line-height: 1.65;
  }
  .slide::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #00ffaa, #00d4ff, transparent);
  }
  .slide.active { display: block; animation: fadeSlide 0.35s ease; }

  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .slide h2 {
    color: #00ffaa; font-size: 1.6rem; margin: 0 0 18px 0;
    text-transform: uppercase; letter-spacing: 2px;
    text-shadow: 0 0 12px rgba(0,255,170,0.5);
  }
  .slide h3 {
    color: #00d4ff; font-size: 1.15rem; margin: 18px 0 10px 0;
    text-transform: uppercase; letter-spacing: 1px;
  }
  .slide p, .slide li { color: #cbd5e1; font-size: 0.95rem; }
  .slide ul { margin: 8px 0 8px 22px; }
  .slide li { margin-bottom: 6px; }
  .slide strong { color: #00ffaa; }
  .slide em { color: #fbbf24; font-style: normal; }
  .slide code {
    background: rgba(0,255,170,0.12); color: #00ffaa;
    padding: 2px 6px; border-radius: 2px; font-size: 0.9em;
  }

  .slide-tag {
    position: absolute; top: 14px; right: 18px;
    font-size: 0.7rem; color: #8b95a5; text-transform: uppercase; letter-spacing: 1px;
  }

  /* Nav bar */
  .slide-nav {
    display: flex; justify-content: center; align-items: center; gap: 14px;
    margin: 18px auto; max-width: 1000px;
  }
  .slide-nav button {
    padding: 10px 22px; background: rgba(0,255,170,0.12); color: #00ffaa;
    border: 2px solid #00ffaa; border-radius: 2px; font-weight: 700; cursor: pointer;
    font-family: 'Courier New', monospace; text-transform: uppercase; letter-spacing: 1px;
    transition: all 0.2s ease; font-size: 0.85rem;
  }
  .slide-nav button:hover {
    background: rgba(0,255,170,0.22);
    box-shadow: 0 0 12px rgba(0,255,170,0.4);
    text-shadow: 0 0 8px #00ffaa;
  }
  .slide-nav button:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; text-shadow: none; }
  .slide-counter { color: #8b95a5; font-size: 0.85rem; min-width: 70px; text-align: center; }

  /* Two-col layout helper */
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 12px; }
  @media (max-width: 700px) { .two-col { grid-template-columns: 1fr; } }

  .card {
    background: rgba(10,14,20,0.6); border: 1px solid rgba(0,255,170,0.2);
    border-left: 3px solid #00ffaa; border-radius: 2px; padding: 14px 16px;
  }
  .card h4 { color: #00d4ff; margin: 0 0 8px 0; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; }

  .flow-arrow { text-align: center; color: #00ffaa; font-size: 1.1rem; margin: 8px 0; padding: 10px; background: rgba(0,255,170,0.06); border-radius: 2px; }
</style>

<!-- ════════════════════════════════════════════ -->
<!--                SLIDE DECK                   -->
<!-- ════════════════════════════════════════════ -->
<div class="slide-deck" id="deck">

<!-- ──────────── SLIDE 1: TITLE ──────────── -->
<div class="slide active">
  <span class="slide-tag">Team Overview</span>
  <h2>Hardware Havoc</h2>
  <p style="font-size:1.1rem; color:#fbbf24; margin-bottom:16px;">A Parallel Computing Education Platform</p>

  <h3>Purpose & Scope</h3>
  <p>Hardware Havoc teaches <strong>parallel and distributed computing</strong> through gamified, interactive modules. Students learn by <em>doing</em> — running real Mandelbrot fractals on Rust-powered threads, dragging tasks onto parallel pipelines, and watching AI digit recognition run through a CNN in real time.</p>

  <h3>The Superpower</h3>
  <p>You complete the game <strong>as a team</strong> to light up CPU cores on a shared dashboard — so you don't just <em>learn</em> parallel computing, you <strong>embrace it</strong>. Each member tackles modules simultaneously, and every completion lights up a core on the CPU visualization in real time. Your team literally becomes a parallel system.</p>

  <h3>Key Features</h3>
  <ul>
    <li><strong>6 interactive modules</strong> (Cores 1-6) covering computing models through case studies</li>
    <li><strong>Multiplayer room system</strong> — join with a room code, track team progress on a CPU visualization dashboard</li>
    <li><strong>Rust + PyO3 backend</strong> for real multi-threaded Mandelbrot rendering</li>
    <li><strong>AI digit recognizer</strong> (TensorFlow/Keras CNN, 98.5% accuracy) with layer visualization</li>
    <li><strong>Gemini-graded quizzes</strong> for conceptual assessment</li>
  </ul>
</div>

<!-- ──────────── SLIDE 2: USER EXPERIENCE ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — UX Walkthrough</span>
  <h2>User Experience</h2>

  <h3>Logged-In Flow</h3>
  <ul>
    <li><strong>Register / Login</strong> — JWT auth via <code>/api/auth/register</code> and <code>/api/auth/login</code></li>
    <li><strong>Join a Room</strong> — Enter a 6-char room code (e.g. <code>DEMO01</code>) or create one as admin</li>
    <li><strong>Prototype Room dashboard</strong> — CPU chip visualization lights up as modules complete; tabs for Progress, Config, Members, Glossary</li>
    <li><strong>Click any module</strong> — Overlay loads the Core page inline with full interactivity</li>
    <li><strong>Complete all 6 modules</strong> — Room marks complete; demo room auto-resets for next group</li>
  </ul>

  <h3>Module Walkthrough</h3>
  <div class="two-col">
    <div class="card">
      <h4>Core 1 — Computing Models</h4>
      <p>GPU Assembly Simulator: observe sequential, parallel, and distributed models in action.</p>
    </div>
    <div class="card">
      <h4>Core 2 — Why Parallel?</h4>
      <p>Mandelbrot fractal renderer — run sequential vs. concurrent (1-16 threads) and replay thread progress. Sub-modules on mutexes and race conditions with live C/Rust code editors.</p>
    </div>
    <div class="card">
      <h4>Core 3 — AI Digit Recognizer</h4>
      <p>Draw digits on a canvas, see CNN layer activations, watch the sequential compute pipeline process ~200K ops per digit.</p>
    </div>
    <div class="card">
      <h4>Cores 4-6</h4>
      <p><strong>4:</strong> Gamified execution time calculator with XP quests and Gemini-graded quiz. <strong>5:</strong> Drag-and-drop speedup calculator with Amdahl's Law. <strong>6:</strong> Infrastructure builder game.</p>
    </div>
  </div>
</div>

<!-- ──────────── SLIDE 3: SUPERPOWER ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Superpower</span>
  <h2>The Superpower: Embrace Parallelism</h2>

  <h3>Why It Matters</h3>
  <p>Parallelism powers every modern system — GPUs, AI training, search engines, render farms. But reading about it isn't enough. Hardware Havoc makes you <strong>live it</strong> — your team becomes a parallel system.</p>

  <h3>How You Complete the Game as a Team</h3>
  <ul>
    <li><strong>Join a room</strong> with your team — everyone sees a shared CPU chip dashboard</li>
    <li>Each member works on modules <strong>simultaneously</strong>, just like threads on a CPU</li>
    <li>Every completed module <strong>lights up a core</strong> on the CPU visualization in real time</li>
    <li>The room is only complete when <strong>all 6 cores are lit</strong> — every team member's work matters</li>
    <li>You don't just learn parallel computing — you <strong>embrace it</strong> by experiencing the power of working in parallel firsthand</li>
  </ul>

  <h3>What Powers It</h3>
  <div class="two-col">
    <div class="card">
      <h4>Frontend</h4>
      <p>Prototype Room dashboard renders a CPU chip visualization — each core node lights up as members complete modules. Progress is fetched via <code>/api/rooms/&lt;id&gt;/progress</code> and mapped to the chip in real time.</p>
    </div>
    <div class="card">
      <h4>Backend</h4>
      <p><code>POST /api/progress/complete</code> marks a module done, then <code>check_and_update_room_progress()</code> checks if all members have finished — when all 6 cores light up, the room is complete. Mandelbrot rendering uses real Rust threads via PyO3 to reinforce the parallel theme.</p>
    </div>
  </div>
</div>

<!-- ──────────── SLIDE 4: HOW IT WAS MADE ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Code & Data</span>
  <h2>How It Was Made</h2>

  <h3>Architecture</h3>
  <div class="flow-arrow">Frontend (Jekyll/GitHub Pages) &#8594; Flask API (:8405) &#8594; Rust/PyO3 + SQLite + TensorFlow/Keras + Gemini</div>

  <div class="two-col">
    <div class="card">
      <h4>Frontend Stack</h4>
      <ul>
        <li>Jekyll static site (GitHub Pages deploy)</li>
        <li>Vanilla JS interactive modules</li>
        <li>Canvas API for Mandelbrot + digit drawing</li>
        <li>LocalStorage for quiz/progress state</li>
        <li>Ace editor for live C/Rust code (mutexes)</li>
      </ul>
    </div>
    <div class="card">
      <h4>Backend Stack</h4>
      <ul>
        <li>Flask + Flask-RESTful + Flask-JWT-Extended</li>
        <li>Rust (PyO3/maturin) for Mandelbrot compute</li>
        <li>TensorFlow/Keras CNN + OpenCV for digits</li>
        <li>Gemini API for quiz auto-grading</li>
        <li>SQLite (Quest DB) — raw SQL with WAL mode</li>
        <li>Flask-SocketIO for real-time streams (:8406)</li>
      </ul>
    </div>
  </div>

  <h3>Key Code Highlights</h3>
  <ul>
    <li><code>rust/rustism/src/examples/concurrent.rs</code> — Scoped threads with <code>Arc&lt;Mutex&lt;Vec&gt;&gt;</code> collecting tile results across N workers</li>
    <li><code>api/digit_api.py</code> — Projection-based segmentation, rotation correction via OpenCV moments, TTA with 8 augmentations + ensemble</li>
    <li><code>Quest/database.py</code> — Schema: users, rooms, room_members, user_progress, room_progress, glossary; WAL journaling for concurrency</li>
  </ul>
</div>

<!-- ──────────── SLIDE 5: API & BACKEND ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — API</span>
  <h2>API & Backend Logic</h2>

  <h3>Core API Endpoints</h3>
  <ul>
    <li><code>POST /api/auth/register</code>, <code>/login</code>, <code>GET /me</code> — JWT authentication (bcrypt hashing)</li>
    <li><code>POST /api/rooms/</code>, <code>/join</code>, <code>GET /&lt;id&gt;/progress</code>, <code>DELETE /&lt;id&gt;</code> — Room CRUD + bulk-delete</li>
    <li><code>POST /api/progress/complete</code> — Mark module done; checks if whole room completed all 6</li>
    <li><code>GET /api/compute/sequential</code>, <code>/concurrent?num_threads=8</code> — Rust Mandelbrot rendering</li>
    <li><code>POST /api/digit/predict</code> — CNN digit recognition with base64 image body; <code>/visualize</code> — layer activations</li>
    <li><code>POST /api/gemini</code> — Gemini-powered text analysis and quiz grading</li>
    <li><code>POST /api/speedup/sort</code> — Serial vs. parallel sort comparison (bubble sort vs. merge-based); <code>/quiz</code> — speedup quiz; <code>GET /leaderboard</code> — top 10 scores</li>
    <li><code>POST /api/quiz/grade</code> — Gemini-graded free-response quiz on parallel computing concepts (Amdahl's Law); returns score, feedback, and attempt history</li>
    <li><code>GET /api/glossary/room/&lt;id&gt;</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code> — Collaborative per-room glossary CRUD with search and stats</li>
    <li><code>POST /api/game-logs/gpu-simulator</code> — Log GPU simulator game data; <code>GET /stats</code> — aggregated stats by stage; <code>GET /recent</code> — recent game sessions</li>
  </ul>
</div>

<!-- ──────────── SLIDE 6: DEPLOYMENT ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Deployment</span>
  <h2>Deployment & Data Flow</h2>

  <h3>Client &#8594; Server &#8594; AWS</h3>
  <div class="flow-arrow">Browser (GitHub Pages) &#8594; HTTPS &#8594; AWS EC2 (Docker) &#8594; Flask :8405 &#8594; Rust/SQLite/TensorFlow</div>

  <h3>Docker Build</h3>
  <ul>
    <li><strong>Dockerfile</strong>: Python 3.12-slim &#8594; install Rust toolchain via rustup &#8594; <code>maturin build --release</code> &#8594; install <code>.whl</code> &#8594; <code>pip install requirements.txt</code> &#8594; Gunicorn</li>
    <li><strong>docker-compose.yml</strong>: <code>web</code> service on :8405, volumes for <code>instance/</code> (SQLAlchemy DB) and <code>Quest/</code> (Quest SQLite DB)</li>
    <li>Gunicorn with 1 worker (Rust handles parallelism internally with native threads)</li>
    <li>Socket server on :8406 using Gunicorn + eventlet (for real-time WebSocket streams)</li>
  </ul>

  <h3>Examples of Data Flow</h3>
  <div class="two-col">
    <div class="card">
      <h4>Mandelbrot Path</h4>
      <p>FE <code>mandelbrot.js</code> &#8594; <code>MandelbrotAPI.start()</code> &#8594; fetch <code>/api/compute/concurrent</code> &#8594; Flask &#8594; <code>rustism.concurrent()</code> &#8594; Rust spawns N threads &#8594; returns task records JSON &#8594; FE paints tiles on canvas + builds progress bars</p>
    </div>
    <div class="card">
      <h4>Progress Path</h4>
      <p>FE click "Mark Complete" &#8594; <code>POST /api/progress/complete {module_number: 4}</code> &#8594; Flask checks JWT &#8594; writes to <code>user_progress</code> &#8594; checks if all room members completed &#8594; updates <code>room_progress</code> &#8594; FE lights up CPU node on dashboard</p>
    </div>
  </div>
</div>

<!-- ──────────── SLIDE 7: TRANSACTIONAL DATA ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Transactional Data</span>
  <h2>Transactional Data & CRUD</h2>

  <h3>Admin UI & Database</h3>
  <ul>
    <li><strong>Admin panel</strong> in Prototype Room: create/delete rooms, shutdown rooms, bulk-delete, view active rooms with member counts and progress percentages</li>
    <li><strong>Quest SQLite DB</strong> at <code>Quest/database.db</code> — viewable via VSCode SQLite editor or <code>sqlite3</code> on Cockpit</li>
    <li>Tables: <code>users</code>, <code>rooms</code>, <code>room_members</code>, <code>user_progress</code>, <code>room_progress</code>, <code>glossary</code></li>
  </ul>

  <h3>FE &#8594; Backend CRUD</h3>
  <div class="two-col">
    <div class="card">
      <h4>Create</h4>
      <p><code>POST /api/auth/register</code> &#8594; inserts into <code>users</code> with bcrypt hash<br>
      <code>POST /api/rooms/</code> &#8594; generates unique 6-char hex code, inserts into <code>rooms</code></p>
    </div>
    <div class="card">
      <h4>Read</h4>
      <p><code>GET /api/auth/me</code> &#8594; returns user + completed_modules + current_room<br>
      <code>GET /api/rooms/&lt;id&gt;/progress</code> &#8594; returns per-member module completion via JOIN query</p>
    </div>
    <div class="card">
      <h4>Update</h4>
      <p><code>POST /api/progress/complete</code> &#8594; inserts into <code>user_progress</code>, conditionally updates <code>room_progress</code><br>
      <code>PUT /api/auth/me</code> &#8594; updates student_id, github_id, email</p>
    </div>
    <div class="card">
      <h4>Delete</h4>
      <p><code>DELETE /api/rooms/&lt;id&gt;</code> &#8594; cascading delete: glossary &#8594; room_progress &#8594; room_members &#8594; room<br>
      <code>POST /api/rooms/&lt;id&gt;/reset-progress</code> &#8594; deletes progress for all members</p>
    </div>
  </div>
</div>

<!-- ──────────── SLIDE 8: BULK DATA ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Bulk Data</span>
  <h2>Bulk Data & DB Init</h2>

  <h3>Bulk Data Creation Scripts</h3>
  <ul>
    <li><strong><code>scripts/db_init.py</code></strong> (main DB) — Drops all tables &#8594; <code>db.create_all()</code> &#8594; <code>initUsers()</code> seeds test users &#8594; <code>init_microblogs()</code> seeds microblog data. Backs up old DB first.</li>
    <li><strong><code>Quest/database.py :: init_db()</code></strong> (Quest DB) — <code>CREATE TABLE IF NOT EXISTS</code> for all 6 tables &#8594; seeds admin account (bcrypt hashed) &#8594; seeds 9 test users (<code>testuser1-9</code>) &#8594; ensures demo room <code>DEMO01</code> exists</li>
    <li>Both are <strong>idempotent</strong> — check for existing records before inserting, use migrations for schema changes</li>
  </ul>

  <h3>Destroy & Restart Demo</h3>
  <ul>
    <li><strong>Localhost</strong>: <code>cd scripts && python db_init.py</code> &#8594; prompts "y/n" &#8594; backs up &#8594; drops &#8594; recreates &#8594; seeds</li>
    <li><strong>Quest DB</strong>: <code>python Quest/database.py</code> &#8594; reinitializes all Quest tables with test data</li>
    <li><strong>Docker</strong>: <code>docker compose down && docker compose up --build</code> &#8594; fresh container with clean DB</li>
    <li><strong>Room reset API</strong>: <code>POST /api/rooms/&lt;id&gt;/reset-progress</code> &#8594; clears all user_progress + room_progress without deleting users/rooms</li>
    <li><strong>Bulk delete</strong>: <code>POST /api/rooms/bulk-delete {room_ids: [1,2,3]}</code> &#8594; cascading deletes (demo room protected)</li>
  </ul>
</div>

<!-- ──────────── SLIDE 9: DEBUGGING ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Debugging</span>
  <h2>Debugging Session</h2>

  <h3>FE Fetch Receiving Changed Data</h3>
  <ul>
    <li><strong>Mandelbrot</strong>: <code>mandelbrot.js</code> fires <code>MandelbrotAPI.on('progress', data)</code> — each tile update has <code>thread_id</code>, <code>start_time_ms</code>, <code>duration_ms</code> &#8594; updates canvas + thread progress bars in real time</li>
    <li><strong>Room progress</strong>: <code>apiCall('/api/rooms/${roomId}/progress')</code> returns per-member module completion &#8594; FE renders module badges per user and lights up CPU nodes</li>
    <li><strong>Quiz grading</strong>: <code>fetch('/api/quiz/grade', {answer})</code> &#8594; Gemini returns score/feedback &#8594; FE persists to localStorage, dispatches <code>moduleQuizScored</code> CustomEvent &#8594; unlocks "Mark Complete" button if score >= 2/3</li>
  </ul>

  <h3>Backend Logic & Decision Points</h3>
  <ul>
    <li><strong>Room completion</strong> (<code>Quest/models/room.py</code>): <code>check_and_update_room_progress()</code> counts completed members via SQL JOIN &#8594; if all done, inserts into <code>room_progress</code> &#8594; if 6/6 modules, signals <code>room_complete</code> (demo rooms vs regular rooms handled differently)</li>
    <li><strong>Digit pipeline</strong> (<code>api/digit_api.py</code>): base64 decode &#8594; horizontal projection segmentation &#8594; per-digit crop &#8594; rotation correction (OpenCV moments, >10deg threshold) &#8594; morphological thinning &#8594; resize to 28x28 &#8594; TTA (8 augmentations + ensemble models) &#8594; averaged top-3 predictions</li>
    <li><strong>Concurrent Mandelbrot</strong> (<code>concurrent.rs</code>): Pre-collect tiles &#8594; chunk across threads &#8594; each thread: <code>AtomicBool</code> check for time limit &#8594; <code>render_tile()</code> &#8594; <code>Mutex</code> lock to push result &#8594; results sorted by start_time before return</li>
  </ul>
</div>

<!-- ──────────── SLIDE 10: SOCIAL & ITERATION ──────────── -->
<div class="slide">
  <span class="slide-tag">Individual — Social Influence & Feature Lifecycle</span>
  <h2>Social Influence & Feature Lifecycle</h2>

  <h3>Peer Review & Brainstorming</h3>
  <ul>
    <li>Consolidated peer reviews in <code>hacks/Final_project/peer-reviews-consolidated.md</code></li>
    <li>10-day sprint structure (Day_1 through Day_10 folders) with daily per-core progress logs</li>
    <li>Brainstorming &#8594; feedback &#8594; iteration cycle tracked through daily markdown entries</li>
  </ul>

  <h3>Feature Lifecycle: Multiplayer Room System</h3>
  <div class="two-col">
    <div class="card">
      <h4>Origin &#8594; Management</h4>
      <p><strong>Need:</strong> Students learning alone felt disconnected. <strong>Idea:</strong> Collaborative room where everyone's progress is visible on a shared CPU chip visualization.<br><br>
      <strong>Early visual:</strong> Simple room join/leave with hardcoded demo room code. No progress tracking, just member lists.</p>
    </div>
    <div class="card">
      <h4>Polished &#8594; Recent</h4>
      <p><strong>Polished:</strong> Full Quest system — JWT auth, random room codes, per-member module badges, room-wide completion detection, admin panel with bulk operations, protected demo room.<br><br>
      <strong>Recent:</strong> Glossary system (collaborative knowledge base per room), quiz gate with Gemini AI grading before module can be marked complete.</p>
    </div>
  </div>
</div>

<!-- ──────────── SLIDE 11: HAPPY MOMENTS ──────────── -->
<div class="slide">
  <span class="slide-tag">Team — Happy Moments</span>
  <h2>Happy Moments</h2>

  <h3>Eureka #1: Rust Threads Actually Working</h3>
  <p>The first time the concurrent Mandelbrot renderer ran with 8 threads and we watched the thread progress bars fill up simultaneously — and the fractal rendered <em>visibly faster</em> than sequential — that was the moment the project's concept proved itself. Students could literally <strong>see</strong> parallelism working. The replay feature, where you can scrub through the actual thread execution timeline at adjustable speed, made it even more powerful as a teaching tool.</p>

  <h3>Eureka #2: Digit Recognizer Pipeline Visualization</h3>
  <p>After wrestling with MNIST preprocessing — rotation correction via OpenCV moments, projection-based multi-digit segmentation, test-time augmentation — the moment someone drew a sloppy "7" on the canvas and it came back with 98% confidence was great. But clicking <em>"View Processing Pipeline"</em> and seeing the CNN layer activations light up, showing exactly which features each convolutional layer detected, connected the abstract idea of <strong>sequential neural network computation</strong> to something visible and real. It tied Core 3 back to the parallel computing theme beautifully: this is what a <em>sequential</em> pipeline looks like — now imagine parallelizing it.</p>
</div>

</div><!-- /slide-deck -->

<!-- Navigation -->
<div class="slide-nav">
  <button id="prevBtn" onclick="changeSlide(-1)" disabled>&#9664; Prev</button>
  <span class="slide-counter" id="slideCounter">1 / 11</span>
  <button id="nextBtn" onclick="changeSlide(1)">Next &#9654;</button>
</div>

<script>
  let current = 0;
  const slides = document.querySelectorAll('.slide');
  const total = slides.length;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    slides[n].classList.add('active');
    document.getElementById('slideCounter').textContent = `${n + 1} / ${total}`;
    document.getElementById('prevBtn').disabled = n === 0;
    document.getElementById('nextBtn').disabled = n === total - 1;
  }

  function changeSlide(dir) {
    const next = current + dir;
    if (next >= 0 && next < total) {
      current = next;
      showSlide(current);
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); changeSlide(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); changeSlide(-1); }
  });

  showSlide(0);
</script>
