---
toc: false
layout: post
title: "AP Requirements for Everyone (Part 1)"
description: "Dual-DB bridge and Hardware Havoc evidence"
permalink: /cores/apreqs1
breadcrumbs: false
---

<style>
/* ===========================
   APREQS1 — Matching Part 2
   Same visual style as apreqs2
=========================== */

:root{
  --bg0:#060814;
  --bg1:#070a18;

  --panel:rgba(255,255,255,.06);
  --panel2:rgba(255,255,255,.08);
  --stroke:rgba(148,163,184,.16);
  --stroke2:rgba(129,140,248,.28);

  --text:#e5e7eb;
  --muted:#a3adc2;
  --dim:#7b86a0;

  --accent:#7c3aed;
  --accent2:#22d3ee;
  --success: #10b981;

  --r:18px;
  --shadow: 0 10px 30px rgba(0,0,0,.35);
  --shadow2: 0 18px 60px rgba(0,0,0,.55);

  --max: 1180px;
}

*{ box-sizing:border-box; }
html{ scroll-behavior:smooth; }

body{
  margin:0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
  color:var(--text);
  background:
    radial-gradient(1200px 700px at 15% -10%, rgba(124,58,237,.28), transparent 55%),
    radial-gradient(900px 600px at 85% 10%, rgba(34,211,238,.22), transparent 55%),
    radial-gradient(900px 700px at 50% 110%, rgba(124,58,237,.18), transparent 60%),
    linear-gradient(180deg, var(--bg0), var(--bg1));
  line-height:1.65;
}

main{
  max-width:var(--max);
  margin:0 auto;
  padding: clamp(22px, 3vw, 42px) clamp(16px, 3vw, 26px) 64px;
  position:relative;
}

/* subtle grid */
main::before{
  content:"";
  position:fixed;
  inset:0;
  pointer-events:none;
  background:
    linear-gradient(to right, rgba(148,163,184,.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148,163,184,.06) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 15%, rgba(0,0,0,.9), rgba(0,0,0,.2) 55%, transparent 75%);
  opacity:.35;
  z-index:0;
}

main > *{ position:relative; z-index:1; }

/* ===== Header ===== */
header{
  display:flex;
  flex-direction:column;
  gap:14px;
  padding: 26px 24px;
  border:1px solid var(--stroke);
  border-radius: calc(var(--r) + 6px);
  background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.035));
  box-shadow: var(--shadow);
  overflow:hidden;
}

header::after{
  content:"";
  position:absolute;
  inset:-2px;
  background:
    radial-gradient(520px 200px at 15% 0%, rgba(124,58,237,.25), transparent 60%),
    radial-gradient(520px 200px at 85% 0%, rgba(34,211,238,.22), transparent 60%);
  pointer-events:none;
  opacity:.9;
}

h1{
  margin:0;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height:1.08;
  letter-spacing:-0.03em;
  font-weight:900;
  background: linear-gradient(90deg, #fff, rgba(255,255,255,.78), rgba(34,211,238,.9));
  -webkit-background-clip:text;
  background-clip:text;
  color:transparent;
}

header p{
  margin:0;
  max-width: 80ch;
  color:var(--muted);
  font-size: 1.05rem;
}

/* ===== Tags ===== */
ul.tags{
  list-style:none;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  padding:0;
  margin: 8px 0 0;
}

ul.tags li{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding: 7px 12px;
  border-radius: 999px;
  border:1px solid var(--stroke);
  background: rgba(255,255,255,.04);
  color: rgba(229,231,235,.92);
  font-weight:700;
  letter-spacing:.06em;
  text-transform:uppercase;
  font-size:.72rem;
}

ul.tags li::before{
  content:"";
  width:8px;
  height:8px;
  border-radius:999px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
  box-shadow: 0 0 0 3px rgba(124,58,237,.12);
}

/* ===== Sticky nav ===== */
nav{
  margin: 18px 0 24px;
  position: sticky;
  top: 12px;
  z-index: 10;
  border:1px solid var(--stroke);
  border-radius: calc(var(--r) + 6px);
  background: rgba(10,12,28,.72);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow);
}

nav ul{
  list-style:none;
  margin:0;
  padding: 12px;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  align-items:center;
}

nav ul li:first-child{
  font-weight:900;
  color:rgba(229,231,235,.92);
  padding: 8px 10px;
  border-radius: 12px;
  background: rgba(255,255,255,.04);
  border:1px solid rgba(148,163,184,.14);
}

nav a{
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding: 9px 12px;
  border-radius: 999px;
  text-decoration:none;
  color: var(--muted);
  border:1px solid rgba(148,163,184,.14);
  background: rgba(255,255,255,.03);
  transition: transform .15s ease, border-color .15s ease, background .15s ease, color .15s ease;
}

nav a::before{
  content:"↳";
  color: rgba(34,211,238,.95);
  font-weight:900;
}

nav a:hover{
  transform: translateY(-1px);
  border-color: var(--stroke2);
  background: rgba(124,58,237,.10);
  color: rgba(255,255,255,.92);
}

nav a:focus{
  outline:2px solid rgba(34,211,238,.75);
  outline-offset:2px;
}

/* ===== Sections ===== */
section{
  border:1px solid var(--stroke);
  border-radius: calc(var(--r) + 6px);
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.035));
  box-shadow: var(--shadow);
  padding: 22px;
  margin: 20px 0;
  position:relative;
  overflow:hidden;
}

section::before{
  content:"";
  position:absolute;
  inset:-1px;
  pointer-events:none;
  background: radial-gradient(650px 240px at 20% 0%, rgba(124,58,237,.16), transparent 60%);
  opacity:.9;
}

section:hover{
  box-shadow: var(--shadow2);
  border-color: rgba(129,140,248,.28);
}

section[id]{ scroll-margin-top: 84px; }

h2{
  margin: 0 0 10px;
  font-size: clamp(1.35rem, 2.6vw, 2rem);
  letter-spacing:-0.02em;
  font-weight:900;
}

p{
  margin: 0 0 10px;
  color: var(--muted);
  max-width: 78ch;
}

h3{
  margin: 12px 0 8px;
  font-size: 1.05rem;
  letter-spacing:-0.01em;
  font-weight:900;
  color: rgba(255,255,255,.92);
}

/* ===== Grid ===== */
section.grid{
  display:grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 14px;
  padding: 14px;
}

section.grid article{ grid-column: span 6; }

@media (max-width: 980px){
  section.grid{ grid-template-columns: 1fr; }
  section.grid article{ grid-column: auto; }
}

/* ===== Cards ===== */
article{
  border:1px solid rgba(148,163,184,.14);
  border-radius: var(--r);
  background:
    radial-gradient(520px 200px at 20% 0%, rgba(34,211,238,.08), transparent 60%),
    rgba(255,255,255,.03);
  padding: 16px 16px 14px;
  min-width:0;
  transition: transform .15s ease, border-color .15s ease, background .15s ease;
  overflow:hidden;
  position:relative;
}

article::after{
  content:"";
  position:absolute;
  inset:0;
  pointer-events:none;
  background: linear-gradient(135deg, rgba(124,58,237,.06), transparent 40%, rgba(34,211,238,.06));
  opacity:.9;
}

article:hover{
  transform: translateY(-2px);
  border-color: rgba(129,140,248,.28);
  background:
    radial-gradient(520px 200px at 20% 0%, rgba(34,211,238,.12), transparent 60%),
    rgba(255,255,255,.04);
}

small{
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding: 6px 10px;
  border-radius: 999px;
  border:1px solid rgba(148,163,184,.14);
  background: rgba(255,255,255,.03);
  color: var(--dim);
  font-weight:900;
  font-size:.72rem;
  letter-spacing:.08em;
  text-transform:uppercase;
  margin-bottom: 10px;
}

small::before{
  content:"";
  width:10px;
  height:10px;
  border-radius: 4px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
}

/* ===== Inline code ===== */
p code, li code, article code{
  display:inline;
  padding: .18rem .45rem;
  border-radius: 8px;
  border:1px solid rgba(129,140,248,.20);
  background: rgba(124,58,237,.10);
  color: rgba(224,231,255,.95);
  white-space: nowrap;
}

/* ===== Code blocks — FULLY EXPANDED + WRAPS LINES ===== */
pre{
  margin: 12px 0 0;
  border-radius: 14px;
  border:1px solid rgba(148,163,184,.18);
  background: #050712;
  box-shadow: 0 10px 20px rgba(0,0,0,.35);

  /* key fixes */
  max-height: none !important;
  height: auto !important;
  overflow: visible !important;
  overflow-x: hidden !important;
}

pre::before{
  content: attr(data-lang);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(148,163,184,.14);
  color: rgba(229,231,235,.75);
  font-weight:900;
  letter-spacing:.12em;
  text-transform:uppercase;
  font-size: .7rem;
  background: rgba(255,255,255,.02);
}

/* faux window dots */
pre::after{
  content:"";
  position:absolute;
  width: 54px;
  height: 10px;
  right: 12px;
  top: 12px;
  background:
    radial-gradient(circle, rgba(239,68,68,.9) 3px, transparent 4px) 0 0/18px 10px,
    radial-gradient(circle, rgba(245,158,11,.9) 3px, transparent 4px) 18px 0/18px 10px,
    radial-gradient(circle, rgba(34,197,94,.9) 3px, transparent 4px) 36px 0/18px 10px;
  pointer-events:none;
  opacity:.9;
}

pre{ position:relative; }

pre code{
  display:block;
  padding: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: .86rem;
  line-height: 1.55;
  color: rgba(229,231,235,.92);

  /* no sideways scroll, wrap long lines */
  white-space: pre-wrap !important;
  overflow-wrap: anywhere !important;
  word-break: break-word !important;
}

/* ===== Callouts ===== */
blockquote{
  margin: 20px 0;
  padding: 18px 18px 16px;
  border-radius: calc(var(--r) + 6px);
  border: 1px solid rgba(129,140,248,.22);
  background:
    radial-gradient(700px 220px at 15% 0%, rgba(124,58,237,.18), transparent 60%),
    radial-gradient(700px 220px at 85% 0%, rgba(34,211,238,.14), transparent 60%),
    rgba(255,255,255,.03);
  box-shadow: var(--shadow);
}

blockquote strong{
  display:inline-flex;
  align-items:center;
  gap:10px;
  font-weight:900;
  color: rgba(255,255,255,.92);
}

blockquote strong::before{
  content:"★";
  color: rgba(34,211,238,.95);
}

blockquote p{
  margin: 8px 0 0;
  color: var(--muted);
}

blockquote a{
  color: rgba(34,211,238,.95);
  text-decoration:none;
  border-bottom: 1px solid rgba(34,211,238,.45);
}

blockquote a:hover{
  color:#fff;
  border-bottom-color:#fff;
}

/* ===== Lists ===== */
ul:not(.tags):not(nav ul) {
  list-style: none;
  padding-left: 0;
  margin: 1rem 0;
}

ul:not(.tags):not(nav ul) li {
  padding-left: 1.5rem;
  margin: 0.5rem 0;
  position: relative;
  color: var(--muted);
}

ul:not(.tags):not(nav ul) li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--accent2);
  font-weight: bold;
}

ol {
  padding-left: 1.5rem;
  margin: 1rem 0;
  color: var(--muted);
}

ol li {
  margin: 0.5rem 0;
}

/* ===== Tables ===== */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table thead tr {
  border-bottom: 2px solid var(--stroke2);
}

table th {
  text-align: left;
  padding: 0.5rem;
  color: rgba(34,211,238,.95);
  font-weight: 900;
}

table tbody tr {
  border-bottom: 1px solid var(--stroke);
}

table td {
  padding: 0.5rem;
  color: var(--muted);
}

/* ===== Images ===== */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* ===== Mobile polish ===== */
@media (max-width: 640px){
  header{ padding: 20px 16px; }
  nav ul{ padding: 10px; }
  section{ padding: 18px; }
  section.grid{ padding: 12px; }
  article{ padding: 14px; }
  pre code{ font-size: .83rem; }
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
      <li>Quick Links</li>
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
      <img src="{{ site.baseurl }}/images/DBflow.png" alt="Database Schema Diagram" style="max-width: 800px; margin: 1.5rem auto; border-radius: var(--r); border: 1px solid var(--stroke); box-shadow: var(--shadow);">
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
      <table>
        <thead>
          <tr>
            <th>Requirement</th>
            <th>Implementation</th>
            <th style="text-align: center;">✓</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Input from user</td>
            <td>Form data (username, password)</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>List/collection</td>
            <td>Database tables (User, QuestUser)</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>Procedure with parameters</td>
            <td>check_quest_user(), sync_quest_user_to_main()</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>Sequencing</td>
            <td>Steps execute in order</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>Selection</td>
            <td>Multiple if/else branches</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>Iteration</td>
            <td>Database queries loop through records</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>Procedure calls</td>
            <td>Both procedures called in login flow</td>
            <td style="text-align: center; color: var(--success);">✅</td>
          </tr>
          <tr>
            <td>Output based on input</td>
            <td>Error messages and redirects</td>
            <td style="text-align: center; color: var(--success);">✅</td>
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
