---
toc: false
layout: post
title: "AP Requirements for Everyone (Part 1)"
description: "Dual-DB bridge and Hardware Havoc evidence"
permalink: /cores/apreqs1
breadcrumbs: false
---

<style>
:root {
  --bg: #0a0e27;
  --surface: #131829;
  --surface-hover: #1a1f3a;
  --border: rgba(99, 102, 241, 0.12);
  --border-hover: rgba(99, 102, 241, 0.3);
  
  --text: #e2e8f0;
  --text-dim: #94a3b8;
  --text-muted: #64748b;
  --accent: #6366f1;
  --accent-bright: #818cf8;
  --accent-glow: rgba(99, 102, 241, 0.15);
  
  --success: #10b981;
  --warning: #f59e0b;
  --info: #3b82f6;
  
  --radius: 12px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.25);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  font-size: 16px;
}

main {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

/* Typography */
h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--text) 0%, var(--accent-bright) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  margin: 3rem 0 1.5rem;
  color: var(--text);
  letter-spacing: -0.02em;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  color: var(--accent-bright);
}

p {
  margin-bottom: 1rem;
  color: var(--text-dim);
  max-width: 75ch;
}

/* Header Section */
header {
  margin-bottom: 3rem;
}

header p {
  font-size: 1.125rem;
  color: var(--text-muted);
  max-width: 80ch;
}

/* Navigation */
nav {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 2rem 0;
  box-shadow: var(--shadow);
}

nav ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
}

nav ul li:first-child {
  font-weight: 600;
  color: var(--text);
  margin-right: 0.5rem;
}

nav a {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: 999px;
  color: var(--text-dim);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

nav a:hover {
  background: var(--accent-glow);
  border-color: var(--accent);
  color: var(--accent-bright);
  transform: translateY(-1px);
}

/* Tags */
ul.tags {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

ul.tags li {
  padding: 0.4rem 1rem;
  background: var(--accent-glow);
  border: 1px solid var(--border-hover);
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--accent-bright);
}

/* Sections */
section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2.5rem;
  margin: 2rem 0;
  box-shadow: var(--shadow-lg);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

section:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
}

/* Grid Layout */
section.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

@media (max-width: 1200px) {
  section.grid {
    grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  }
}

@media (max-width: 900px) {
  section.grid {
    grid-template-columns: 1fr;
  }
}

/* Articles (Cards) */
article {
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  transition: all 0.2s ease;
  min-width: 0;
  overflow: hidden;
}

article:hover {
  border-color: var(--border-hover);
  background: linear-gradient(135deg, var(--surface-hover) 0%, rgba(99, 102, 241, 0.05) 100%);
  transform: translateY(-2px);
}

article h3 {
  margin-top: 0;
  font-size: 1.15rem;
  word-wrap: break-word;
}

article p {
  font-size: 0.95rem;
  line-height: 1.7;
  word-wrap: break-word;
}

/* Lists */
ul:not(.tags):not(nav ul) {
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;
}

ul:not(.tags):not(nav ul) li {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  position: relative;
  color: var(--text-dim);
}

ul:not(.tags):not(nav ul) li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--accent);
  font-weight: bold;
}

/* Code Blocks */
pre {
  background: #0d1117;
  border: 1px solid var(--border-hover);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
  box-shadow: var(--shadow);
  max-width: 100%;
}

code {
  font-family: 'Fira Code', 'Courier New', monospace;
  font-size: 0.85rem;
  line-height: 1.5;
  color: #e2e8f0;
  word-wrap: break-word;
  white-space: pre-wrap;
}

p code, li code, article code {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid var(--border-hover);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85em;
  color: var(--accent-bright);
}

/* Code Labels */
pre::before {
  content: attr(data-lang);
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

/* Callouts */
blockquote {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  box-shadow: var(--shadow);
}

blockquote strong {
  color: var(--accent-bright);
  font-weight: 600;
}

blockquote p {
  margin: 0.5rem 0;
}

blockquote a {
  color: var(--accent-bright);
  text-decoration: none;
  border-bottom: 1px solid var(--accent);
  transition: all 0.2s ease;
}

blockquote a:hover {
  color: var(--text);
  border-bottom-color: var(--text);
}

/* Meta Labels */
small {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--warning);
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  main {
    padding: 2rem 1rem;
  }
  
  section {
    padding: 1.5rem;
  }
  
  section.grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  article {
    padding: 1.5rem;
  }
  
  nav ul {
    flex-direction: column;
    align-items: stretch;
  }
  
  nav a {
    display: block;
    text-align: center;
  }
}

/* Smooth Scrolling */
html {
  scroll-behavior: smooth;
}

/* Focus States */
a:focus, button:focus {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>

<main>
  <header>
    <h1>AP Requirements Evidence — Part 1</h1>
    <p>A single page mapping each AP CSP requirement (input, lists, procedure, algorithm, procedure calls, output) to real code from our project artifacts.</p>
    <ul class="tags">
      <li>AP CSP</li>
      <li>Evidence</li>
      <li>Artifacts</li>
    </ul>
  </header>

  <nav>
    <ul>
      <li>Quick Links:</li>
      <li><a href="#dual-db">Dual DB</a></li>
      <li><a href="#hardware-havoc">Hardware Havoc</a></li>
    </ul>
  </nav>

  <section id="dual-db">
    <h2>Dual-Database Authentication Bridge</h2>
    <p>The login flow bridges our main Flask database with Quest's legacy users. It preserves the redirect safety checks while automatically syncing a Quest account the first time they sign in—no bulk migration required.</p>
  </section>

  <section class="grid">
    <article>
      <small>Baseline Pattern</small>
      <h3>1. Original Login Route</h3>
      <p>Started with a single-database route: query, validate via <code>is_password()</code>, run <code>login_user()</code>, and protect redirects with <code>is_safe_url()</code>.</p>
      <pre data-lang="Python"><code>@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    next_page = request.args.get('next', '') or request.form.get('next', '')
    if request.method == 'POST':
        user = User.query.filter_by(_uid=request.form['username']).first()
        if user and user.is_password(request.form['password']):
            login_user(user)
            if not is_safe_url(next_page):
                return abort(400)
            return redirect(next_page or url_for('index'))
        else:
            error = 'Invalid username or password.'
    return render_template("login.html", error=error, next=next_page)</code></pre>
    </article>

    <article>
      <small>Integration Requirements</small>
      <h3>2. Why Extend It?</h3>
      <p>The bridge had to:</p>
      <ul>
        <li>Check the primary database first for performance.</li>
        <li>Fall back to Quest only when the user is missing.</li>
        <li>Sync Quest users into the main DB after first login.</li>
        <li>Keep the main DB as the source of truth going forward.</li>
      </ul>
    </article>

    <article>
      <small>Current Implementation</small>
      <h3>3. Dual-DB Login</h3>
      <p>Main DB gets priority; if not found or password mismatch, consult Quest, sync, then log in with the new record.</p>
      <pre data-lang="Python"><code>@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    next_page = request.args.get('next', '') or request.form.get('next', '')
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = User.query.filter_by(_uid=username).first()
        if user and user.is_password(password):
            login_user(user)
            if not is_safe_url(next_page):
                return abort(400)
            return redirect(next_page or url_for('index'))

        quest_user = check_quest_user(username, password)
        if quest_user:
            synced_user = sync_quest_user_to_main(quest_user, password)
            if synced_user:
                login_user(synced_user)
                if not is_safe_url(next_page):
                    return abort(400)
                return redirect(next_page or url_for('index'))
            else:
                error = 'Error syncing user account. Please try again.'
        else:
            error = 'Invalid username or password.'

    return render_template("login.html", error=error, next=next_page)</code></pre>
    </article>

    <article>
      <small>Control Logic</small>
      <h3>4. Flow Diagram</h3>
      <pre data-lang="Diagram"><code>User Login Attempt
       ↓
Check Main Database
       ↓
   Found? ────YES───→ Authenticate → Login ✓
       ↓
       NO
       ↓
Check Quest Database
       ↓
   Found? ────YES───→ Sync to Main DB → Login ✓
       ↓
       NO
       ↓
   Error: Invalid Credentials</code></pre>
      <p>Sequencing + selection paths make the flow explicit for reviewers.</p>
    </article>

    <article>
      <small>Helper Functions</small>
      <h3>5. Supporting Procedures</h3>
      <p>Both helpers encapsulate the cross-database logic.</p>
      <pre data-lang="Python"><code>def check_quest_user(username, password):
    """Query Quest database for user credentials."""
    # Returns user object if valid, None otherwise

def sync_quest_user_to_main(quest_user, password):
    """Create user in main database from Quest data."""
    # Creates new User record
    # Returns synced user object or None on failure</code></pre>
    </article>

    <article>
      <small>Performance · Migration · Security</small>
      <h3>6. Benefits & Real Use</h3>
      <p>Fast path hits one database, new users pay the dual lookup only once, and passwords are re-hashed in our stack. This is a migration bridge pattern used when integrating institutional systems or staging enterprise rollovers.</p>
    </article>
  </section>

  <blockquote>
    <strong>Migration bridge in practice:</strong> No bulk import, no double accounts—Quest users sign in once and the system promotes them to the main database while keeping the original login safeguards intact.
  </blockquote>

  <section id="hardware-havoc">
    <h2>Hardware Havoc (Full Simulator) — AP Evidence</h2>
    <p>The full Hardware Havoc build includes richer interaction (stage buttons, achievements, audio) but the AP checklist still lines up cleanly. These are the exact structures from <code>hacks/gpu-assembly-simulator.md</code>.</p>
  </section>

  <section class="grid">
    <article>
      <small>UI Buttons + JS Handlers</small>
      <h3>1. Program Input</h3>
      <p>Students interact through multiple controls that trigger the simulation.</p>
      <pre data-lang="HTML"><code>&lt;button class="btn btn-success" onclick="startGame()"&gt;▶ Start&lt;/button&gt;
&lt;button class="btn btn-warning" onclick="resetGame()"&gt;↻ Reset&lt;/button&gt;
&lt;button class="btn" onclick="addOrder()"&gt;➕ New Order&lt;/button&gt;</code></pre>
      <p>Stage buttons and per-task controls (PCB, Cores, Memory, Test) provide additional input paths.</p>
    </article>

    <article>
      <small>Game State Arrays</small>
      <h3>2. Lists / Collections</h3>
      <p>Core game state is stored in dedicated arrays that abstract complexity.</p>
      <pre data-lang="JavaScript"><code>let orders = [];
let workstations = [];

const achievements = [
  { id: 'first', name: 'First Build', desc: 'Assemble 1 GPU', ... },
  // ...
];</code></pre>
      <p>Orders track progress, workstations drive rendering, achievements capture unlock logic.</p>
    </article>

    <article>
      <small>assignTask(stationId, robotId, task)</small>
      <h3>3. Student Procedure</h3>
      <p>Three parameters make the procedure reusable across stages and robots.</p>
      <pre data-lang="JavaScript"><code>function assignTask(stationId, robotId, task) {
  const station = workstations.find(s => s.id === stationId);
  const robot = station.robots.find(r => r.id === robotId);

  if (robot.busy || orders.length === 0) return;
  // ... validation, prerequisite checks, timers, UI updates
}</code></pre>
      <p>The abstraction encapsulates validation, scheduling, and audiovisual feedback.</p>
    </article>

    <article>
      <small>Sequencing · Selection · Iteration</small>
      <h3>4. Algorithm</h3>
      <pre data-lang="Sequencing"><code>const station = workstations.find(...);
const robot = station.robots.find(...);
robot.busy = true;
robot.task = task;</code></pre>
      <pre data-lang="Selection"><code>if (!order) {
  showToast('No orders need this task!', 'warning');
  return;
}
if (idx > 0 && !order.steps[steps[idx - 1]]) {
  showToast(`Complete ${steps[idx - 1].toUpperCase()} first!`, 'warning');
  return;
}</code></pre>
      <pre data-lang="Iteration"><code>for (let o of orders) {
  if (o.stationId !== stationId && currentStage !== 3) continue;
  if (!o.steps[task]) {
    // check prerequisites and pick the right order
  }
}</code></pre>
      <p>Conditionals enforce prerequisites; the loop scans orders to find valid work.</p>
    </article>

    <article>
      <small>HTML + Dynamic Grid</small>
      <h3>5. Procedure Calls</h3>
      <p>Buttons wired in the rendered grid call the student procedure with live IDs.</p>
      <pre data-lang="HTML"><code>&lt;button class="task-btn"
        onclick="assignTask(${station.id}, ${robot.id}, '${task}')"&gt;
  ...
&lt;/button&gt;</code></pre>
    </article>

    <article>
      <small>Visual + Audio + Modal</small>
      <h3>6. Program Output</h3>
      <p>Stats, queues, modals, and sound all respond to the algorithm.</p>
      <pre data-lang="JavaScript"><code>document.getElementById('gpusCompleted').textContent = completedGPUs;
document.getElementById('timeElapsed').textContent = timeElapsed.toFixed(1) + 's';
document.getElementById('avgTime').textContent = avg;
document.getElementById('throughput').textContent = throughput;</code></pre>
    </article>
  </section>

  <blockquote>
    <strong>Complete flow:</strong> user input → lists (orders, workstations, achievements) → <code>assignTask</code> logic → multi-modal output (visual stats, queue animations, sound, and completion modal).
  </blockquote>
</main>
