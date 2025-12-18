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
    <h2>Login System: AP CSP Component A Requirements</h2>
    <p>This document demonstrates how the dual-database authentication system meets all AP Computer Science Principles Component A (Program Code Requirements).</p>
  </section>

  <section class="grid">
    <article>
      <small>Requirement 1</small>
      <h3>Instructions for Input</h3>
      <p><strong>Requirement:</strong> Instructions for input from one of the following: the user, a device, an online data stream, or a file</p>
      <pre data-lang="Python"><code>username = request.form['username']
password = request.form['password']</code></pre>
      <p><strong>Explanation:</strong> User enters credentials through HTML form. User actions (clicking login button) trigger authentication event. Input is captured from POST request form data.</p>
    </article>

    <article>
      <small>Requirement 2</small>
      <h3>Use of a List or Collection Type</h3>
      <p><strong>Requirement:</strong> Use of at least one list (or other collection type) to represent a collection of data that is stored and used to manage program complexity</p>
      <pre data-lang="Python"><code># Database tables are collections of user objects
user = User.query.filter_by(_uid=username).first()

# Quest database also contains collection of users
quest_user = check_quest_user(username, password)</code></pre>
      <p><strong>Explanation:</strong> Database tables (<code>User</code> and <code>QuestUser</code>) store collections of user records. Each query operates on these collections to find matching entries. Collections manage complexity by organizing multiple user accounts with their credentials and metadata.</p>
    </article>

    <article>
      <small>Database Schema</small>
      <h3>Collection Architecture</h3>
      <p>The dual-database system integrates with a comprehensive relational database structure:</p>
      <img src="{{ site.baseurl }}/images/DBflow.png" alt="Database Schema Diagram" style="width: 100%; max-width: 800px; margin: 1.5rem auto; display: block; border-radius: var(--radius); border: 1px solid var(--border); box-shadow: var(--shadow);">
      <p><strong>Core Authentication Tables:</strong></p>
      <ul>
        <li><strong>users</strong> - Main user authentication table storing credentials and profile information</li>
        <li><strong>room_members</strong> - Junction table linking users to educational rooms</li>
      </ul>
      <p><strong>Progress Tracking Tables:</strong></p>
      <ul>
        <li><strong>user_progress</strong> - Individual student progress through course modules</li>
        <li><strong>room_progress</strong> - Aggregate progress metrics for classroom groups</li>
      </ul>
      <p><strong>Content Management Tables:</strong></p>
      <ul>
        <li><strong>rooms</strong> - Educational spaces containing lessons and members</li>
        <li><strong>glossary</strong> - Technical terminology and definitions</li>
      </ul>
    </article>

    <article>
      <small>Requirement 3</small>
      <h3>At Least One Procedure</h3>
      <p><strong>Requirement:</strong> At least one procedure that contributes to the program's intended purpose, with defined name, return type, and parameters</p>
      <p><strong>Procedure 1:</strong> <code>check_quest_user</code></p>
      <pre data-lang="Python"><code>def check_quest_user(username, password):
    """Query Quest database for user credentials"""
    # Parameters: username (string), password (string)
    # Return type: QuestUser object or None

    quest_db_users = QuestUser.query.all()

    for user in quest_db_users:
        if user.username == username and user.verify_password(password):
            return user

    return None</code></pre>
      <ul>
        <li><strong>Name:</strong> check_quest_user</li>
        <li><strong>Parameters:</strong> username, password</li>
        <li><strong>Return type:</strong> QuestUser object or None</li>
        <li><strong>Purpose:</strong> Authenticates user against Quest legacy database</li>
      </ul>
    </article>

    <article>
      <small>Requirement 3 (continued)</small>
      <h3>Procedure 2: sync_quest_user_to_main</h3>
      <pre data-lang="Python"><code>def sync_quest_user_to_main(quest_user, password):
    """Create user in main database from Quest data"""
    # Parameters: quest_user (QuestUser object), password (string)
    # Return type: User object or None

    try:
        new_user = User(
            _uid=quest_user.username,
            _name=quest_user.name,
            _password=password
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
    except:
        db.session.rollback()
        return None</code></pre>
      <ul>
        <li><strong>Name:</strong> sync_quest_user_to_main</li>
        <li><strong>Parameters:</strong> quest_user, password</li>
        <li><strong>Return type:</strong> User object or None</li>
        <li><strong>Purpose:</strong> Migrates Quest user to main database on first login</li>
      </ul>
    </article>

    <article>
      <small>Requirement 4</small>
      <h3>Algorithm with Sequencing, Selection, and Iteration</h3>
      <p><strong>Requirement:</strong> An algorithm that includes sequencing, selection, and iteration</p>
      <p><strong>Full Algorithm in login() function:</strong></p>
      <pre data-lang="Python"><code>@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    next_page = request.args.get('next', '') or request.form.get('next', '')

    if request.method == 'POST':
        # SEQUENCING: Steps execute in order
        username = request.form['username']
        password = request.form['password']

        # Step 1: Check main database
        user = User.query.filter_by(_uid=username).first()

        # SELECTION: Conditional branches
        if user and user.is_password(password):
            # Main database authentication successful
            login_user(user)
            if not is_safe_url(next_page):
                return abort(400)
            return redirect(next_page or url_for('index'))

        # Step 2: Check Quest database if main auth fails
        quest_user = check_quest_user(username, password)

        if quest_user:
            # Quest user found - sync to main database
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
      <small>Algorithm Breakdown</small>
      <h3>Sequencing, Selection, Iteration</h3>
      <p><strong>SEQUENCING:</strong> Steps execute in order:</p>
      <ol>
        <li>Get username and password from form</li>
        <li>Query main database for user</li>
        <li>Validate credentials</li>
        <li>If not found, query Quest database</li>
        <li>Sync user if found in Quest</li>
        <li>Log in user and redirect</li>
      </ol>
      <p><strong>SELECTION:</strong> Multiple conditional branches:</p>
      <ul>
        <li><code>if request.method == 'POST'</code> - Check if form submitted</li>
        <li><code>if user and user.is_password(password)</code> - Validate main database credentials</li>
        <li><code>if quest_user</code> - Check if Quest user exists</li>
        <li><code>if synced_user</code> - Verify sync succeeded</li>
        <li><code>if not is_safe_url(next_page)</code> - Security check</li>
      </ul>
      <p><strong>ITERATION:</strong> Explicit iteration in check_quest_user:</p>
      <pre data-lang="Python"><code>quest_db_users = QuestUser.query.all()

# ITERATION: Loop through Quest database users
for user in quest_db_users:
    if user.username == username and user.verify_password(password):
        return user

return None</code></pre>
      <p>The login system iterates through main database User table to find matching _uid, and Quest database QuestUser table to find matching username.</p>
    </article>

    <article>
      <small>Requirement 5</small>
      <h3>Calls to Student-Developed Procedure</h3>
      <p><strong>Requirement:</strong> Calls to your student-developed procedure</p>
      <pre data-lang="Python"><code># Call to check_quest_user procedure
quest_user = check_quest_user(username, password)

# Call to sync_quest_user_to_main procedure
synced_user = sync_quest_user_to_main(quest_user, password)</code></pre>
      <p><strong>Both procedures are:</strong></p>
      <ul>
        <li>Defined by student</li>
        <li>Called within main login algorithm</li>
        <li>Essential to program functionality</li>
        <li>Used to manage dual-database complexity</li>
      </ul>
    </article>

    <article>
      <small>Requirement 6</small>
      <h3>Instructions for Output</h3>
      <p><strong>Requirement:</strong> Instructions for output (tactile, audible, visual, or textual) based on input and program functionality</p>
      <p><strong>Success Output:</strong></p>
      <pre data-lang="Python"><code>login_user(user)
return redirect(next_page or url_for('index'))</code></pre>
      <ul>
        <li><strong>Visual output:</strong> Redirects to authenticated page</li>
        <li><strong>Based on input:</strong> Successful username/password combination</li>
      </ul>
      <p><strong>Error Output:</strong></p>
      <pre data-lang="Python"><code>error = 'Invalid username or password.'
return render_template("login.html", error=error, next=next_page)</code></pre>
      <ul>
        <li><strong>Visual/textual output:</strong> Error message displayed to user</li>
        <li><strong>Based on input:</strong> Failed authentication attempt</li>
      </ul>
      <p><strong>Sync Error Output:</strong></p>
      <pre data-lang="Python"><code>error = 'Error syncing user account. Please try again.'
return render_template("login.html", error=error, next=next_page)</code></pre>
      <ul>
        <li><strong>Visual/textual output:</strong> Specific sync failure message</li>
        <li><strong>Based on program functionality:</strong> Failed database synchronization</li>
      </ul>
    </article>

    <article>
      <small>Summary</small>
      <h3>All Requirements Met</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 1rem;">
        <thead>
          <tr style="border-bottom: 2px solid var(--border-hover);">
            <th style="text-align: left; padding: 0.5rem; color: var(--accent-bright);">Requirement</th>
            <th style="text-align: left; padding: 0.5rem; color: var(--accent-bright);">Implementation</th>
            <th style="text-align: center; padding: 0.5rem; color: var(--accent-bright);">✓</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">Input from user</td>
            <td style="padding: 0.5rem;">Form data (username, password)</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">List/collection</td>
            <td style="padding: 0.5rem;">Database tables (User, QuestUser)</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">Procedure with parameters</td>
            <td style="padding: 0.5rem;">check_quest_user(), sync_quest_user_to_main()</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">Sequencing</td>
            <td style="padding: 0.5rem;">Steps execute in order</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">Selection</td>
            <td style="padding: 0.5rem;">Multiple if/else branches</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">Iteration</td>
            <td style="padding: 0.5rem;">Database queries loop through records</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.5rem;">Procedure calls</td>
            <td style="padding: 0.5rem;">Both procedures called in login flow</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem;">Output based on input</td>
            <td style="padding: 0.5rem;">Error messages and redirects</td>
            <td style="text-align: center; padding: 0.5rem; color: var(--success);">✅</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>

  <blockquote>
    <strong>Complete AP CSP Coverage:</strong> The dual-database authentication system demonstrates all required programming concepts: user input through forms, collections via database tables, student-developed procedures with clear parameters and return types, sequencing through ordered steps, selection via conditional logic, iteration through database queries, procedure calls in the main algorithm, and output based on authentication results.
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
