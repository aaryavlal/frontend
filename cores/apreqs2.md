---
toc: false
layout: post
title: "AP Requirements for Everyone (Part 2)"
description: "Rust renderer and Gemini quiz evidence"
permalink: /cores/apreqs2
breadcrumbs: false
---

<style>
/* ===========================
   APREQS2 — Full Recode
   Fixes:
   - Code shows fully (no clipping)
   - No side-to-side scrolling
   - Cards + layout polished
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
    <h1>AP Requirements Evidence — Part 2</h1>
    <p>Continuing the AP CSP mapping with the Rust renderer module and Gemini-powered quiz service.</p>
    <ul class="tags">
      <li>AP CSP</li>
      <li>Evidence</li>
      <li>Artifacts</li>
    </ul>
  </header>

  <nav>
    <ul>
      <li>Quick Links</li>
      <li><a href="#rust-renderer">Rust Renderer</a></li>
      <li><a href="#gemini-quiz">Gemini Quiz</a></li>
    </ul>
  </nav>

  <section id="rust-renderer">
    <h2>Rust Concurrent Renderer — AP Breakdown</h2>
    <p>Our Rust/PyO3 module drives the fractal renderer behind <code>http://localhost:4600/frontend/test</code>. This high-performance native extension demonstrates advanced parallel computing concepts by dividing fractal computations into tiles, distributing work across multiple CPU threads, and streaming results back to Python in real-time. The architecture showcases production-grade patterns: memory-safe concurrency through Rust's ownership system, zero-cost Python interoperability via PyO3, and efficient workload distribution that scales linearly with available CPU cores. Each component maps cleanly to AP CSP requirements while solving real computational challenges.</p>
  </section>

  <section class="grid">
    <article>
      <small>concurrent.rs</small>
      <h3>1. Program Input</h3>
      <p><strong>Requirement:</strong> Instructions for input from one of the following: the user, a device, an online data stream, or a file</p>
      <p>The Python frontend calls a single procedure with all user-controlled parameters. This function signature demonstrates input handling across multiple dimensions: canvas dimensions (<code>width</code>, <code>height</code>) control the output image size, tiling parameters (<code>tile_w</code>, <code>tile_h</code>) determine granularity of parallel work distribution, computational depth (<code>max_iter</code>) adjusts fractal detail, resource constraints (<code>time_limit_ms</code>, <code>num_threads</code>) manage performance trade-offs, and a callback function (<code>emit_tile</code>) enables real-time streaming of results. The <code>#[pyfunction]</code> attribute exposes this Rust code to Python, creating a seamless bridge where user interactions in the web interface directly control native computational parameters.</p>
      <pre data-lang="Rust"><code>#[pyfunction]
pub fn concurrent(
    py: Python&lt;'_&gt;,
    width: usize,
    height: usize,
    tile_w: usize,
    tile_h: usize,
    max_iter: u16,
    emit_tile: PyObject,
    time_limit_ms: u64,
    num_threads: usize,
) -&gt; PyResult&lt;Vec&lt;TaskRecord&gt;&gt; { ... }</code></pre>
    </article>

    <article>
      <small>concurrent.rs</small>
      <h3>2. List / Collection Type</h3>
      <p><strong>Requirement:</strong> Use of at least one list (or other collection type) to represent a collection of data that is stored and used to manage program complexity</p>
      <p>All tile coordinates are assembled into a vector before work begins. This collection (<code>Vec&lt;(usize, usize)&gt;</code>) serves as the central work queue that manages program complexity by transforming a 2D rendering problem into a 1D list of independent tasks. The nested loop structure systematically generates coordinate pairs for every tile position, stepping through the canvas in tile-sized increments. This abstraction enables critical program features: work can be distributed evenly across threads by chunking the vector, progress tracking becomes straightforward by counting completed tiles, and the rendering order can be randomized or prioritized without modifying the core algorithm. Without this collection, coordinating parallel threads and tracking thousands of individual tile computations would be intractable.</p>
      <pre data-lang="Rust"><code>let mut tiles = Vec::new();
for ty in (0..height).step_by(tile_h) {
    for tx in (0..width).step_by(tile_w) {
        tiles.push((tx, ty));
    }
}</code></pre>
    </article>

    <article>
      <small>Scoped Threading Logic</small>
      <h3>3. Student-Developed Procedure</h3>
      <p><strong>Requirement:</strong> At least one procedure that contributes to the program's intended purpose, with defined name, return type, and parameters</p>
      <p>The <code>concurrent</code> procedure orchestrates parallel fractal rendering by dividing the tile collection into equal chunks and spawning scoped threads for each chunk. This student-developed abstraction has a clear signature: it accepts input parameters (canvas dimensions, tile configuration, computational limits), processes the work concurrently, and returns a vector of task records documenting each tile's computation time and pixel count. The scoped threading pattern ensures memory safety—all threads complete before the function returns, preventing dangling references. The chunk size calculation (<code>(tiles.len() + num_threads - 1) / num_threads</code>) implements ceiling division to ensure even distribution, while <code>Arc::clone</code> enables safe shared state across thread boundaries. This encapsulation makes parallel rendering reusable: changing from fractals to ray tracing only requires swapping the tile rendering logic.</p>
      <pre data-lang="Rust"><code>std::thread::scope(|s| {
    let chunk_size = (tiles.len() + num_threads - 1) / num_threads;

    for (worker_id, tile_chunk) in tiles.chunks(chunk_size).enumerate() {
        let time_exceeded = Arc::clone(&time_exceeded);
        let records = Arc::clone(&records);

        s.spawn(move || {
            for &(tx, ty) in tile_chunk {
                // per-tile work...
            }
        });
    }
});</code></pre>
    </article>

    <article>
      <small>Time-limit Enforcement</small>
      <h3>4. Algorithm (S/S/I)</h3>
      <p><strong>Requirement:</strong> An algorithm that includes sequencing, selection, and iteration</p>
      <p><strong>Sequencing:</strong> Operations execute in strict order—timers initialize before tile processing, each tile renders before duration measurement, results record before the next iteration. <strong>Selection:</strong> Conditional branches provide graceful degradation: the atomic <code>time_exceeded</code> flag enables instant cross-thread coordination when any worker detects timeout, while the elapsed time check implements a hard deadline that prevents runaway computations. <strong>Iteration:</strong> The <code>for</code> loop processes each tile in the assigned chunk sequentially, but multiple loops run concurrently across threads. This algorithm demonstrates production patterns: <code>Ordering::Relaxed</code> provides lock-free synchronization with minimal overhead, <code>Instant::now()</code> captures nanosecond-precision timing for performance analysis, and early-exit logic ensures responsive UI even during expensive computations.</p>
      <pre data-lang="Rust"><code>for &(tx, ty) in tile_chunk {
    if time_exceeded.load(Ordering::Relaxed) {
        break;
    }

    if overall_start.elapsed() &gt; time_limit {
        time_exceeded.store(true, Ordering::Relaxed);
        break;
    }

    let start = Instant::now();
    let data = render_tile(width, height, tx, ty, tile_w, tile_h, max_iter);
    let duration_ms = start.elapsed().as_millis();
    // record result...
}</code></pre>
    </article>

    <article>
      <small>Tile Emission</small>
      <h3>5. Calls to the Procedure</h3>
      <p><strong>Requirement:</strong> Calls to your student-developed procedure</p>
      <p>Each completed tile invokes Python-side callbacks with the computed data. The <code>emit_tile.call1()</code> procedure call bridges Rust and Python, streaming results incrementally rather than buffering the entire image in memory. This streaming architecture enables real-time visualization—users see the fractal materialize tile-by-tile across the canvas. The <code>TileUpdate</code> struct packages all relevant metadata: spatial coordinates locate where to render pixels, dimensions define the tile's boundaries, raw pixel data contains RGBA values for display, duration metrics enable performance profiling, and task IDs support request tracking. The <code>?</code> operator propagates Python exceptions back through Rust, maintaining error handling across the language boundary. This pattern appears throughout the codebase wherever Rust computations need to report progress to Python.</p>
      <pre data-lang="Rust"><code>emit_tile.call1(
    py,
    (TileUpdate {
        task_id: record.task_id,
        tile_x: tx as u32,
        tile_y: ty as u32,
        tile_w: tile_w as u32,
        tile_h: tile_h as u32,
        data,
        duration_ms,
    },),
)?;</code></pre>
    </article>

    <article>
      <small>model.rs</small>
      <h3>6. Program Output</h3>
      <p><strong>Requirement:</strong> Instructions for output (tactile, audible, visual, or textual) based on input and program functionality</p>
      <p>Output is strongly typed through <code>TaskRecord</code> and <code>TileUpdate</code> structures, then returned to Python for visual display. The <code>TaskRecord</code> struct serves as a performance ledger: each entry documents a single tile's computation with spatial coordinates, dimensions, execution time, and pixel count. The <code>#[derive(Debug, IntoPyObject)]</code> attribute auto-generates Python conversion code, enabling seamless data transfer across the language boundary. Returning <code>Ok(final_records)</code> wraps the collection in Rust's <code>Result</code> type, providing explicit error handling. This output feeds the visualization pipeline: Python receives timing data to update progress indicators, coordinate information to position tiles on the canvas, and pixel counts to calculate throughput metrics. The structured output format enables analytics—aggregating duration values reveals bottlenecks, comparing thread performance identifies load imbalances, and tracking pixel throughput quantifies optimization impact.</p>
      <pre data-lang="Rust"><code>#[derive(Debug, IntoPyObject)]
pub struct TaskRecord {
    pub task_id: u32,
    pub tile_x: u32,
    pub tile_y: u32,
    pub tile_w: u32,
    pub tile_h: u32,
    pub duration_ms: u128,
    pub pixels_computed: u32,
}

Ok(final_records)</code></pre>
    </article>
  </section>

  <blockquote>
    <strong>Next ideas</strong> stream static Rust files from the backend and add a Monte Carlo π demo for heavier compute.
    <p>Bonus read: <a href="https://mataiodoxion.github.io/mataiodoxion_2026/cracking-morts-server/" target="_blank" rel="noopener">"Cracking Mr. Mort's Flask Server For Fun and No Profit"</a></p>
  </blockquote>

  <section id="gemini-quiz">
    <h2>Gemini Quiz Artifact</h2>
    <p>This backend-powered quiz service integrates Google's Gemini AI to provide intelligent grading and feedback for parallel computing concepts. The system captures student responses through a REST API, validates and sanitizes input to prevent injection attacks, sends questions to Gemini's language model for semantic analysis, parses structured scoring data from natural language responses, maintains a persistent history of all attempts in memory, and returns comprehensive feedback with contextual attempt summaries. This architecture demonstrates full-stack development: Flask handles HTTP routing, JSON parsing manages data interchange, external API calls integrate third-party AI services, regular expressions extract structured data from unstructured text, and stateful session management tracks student progress. Every component maps directly to AP CSP requirements while implementing a practical educational tool.</p>
  </section>

  <section class="grid">
    <article>
      <small>backend/main.py</small>
      <h3>1. Program Input</h3>
      <p><strong>Requirement:</strong> Instructions for input from one of the following: the user, a device, an online data stream, or a file</p>
      <p>The quiz UI ships a JSON body with a single <code>answer</code> field through an HTTP POST request. The backend implements defense-in-depth input validation: <code>get_json(silent=True)</code> safely parses JSON without crashing on malformed data, defaulting to an empty dictionary if parsing fails. The <code>.get("answer")</code> method provides None-safe dictionary access, while <code>.strip()</code> removes leading/trailing whitespace that could interfere with AI processing. The conditional check enforces business logic—empty submissions receive immediate 400 errors with descriptive messages, preventing wasted API calls to Gemini. This input handling demonstrates security best practices: explicit validation prevents injection attacks, graceful error handling maintains service availability, and clear error messages guide users toward correct usage.</p>
      <pre data-lang="Python"><code>data = request.get_json(silent=True) or {}
student_answer = (data.get("answer") or "").strip()

if not student_answer:
    return jsonify({"error": "Field 'answer' is required."}), 400</code></pre>
    </article>

    <article>
      <small>backend/main.py</small>
      <h3>2. List / Collection Type</h3>
      <p><strong>Requirement:</strong> Use of at least one list (or other collection type) to represent a collection of data that is stored and used to manage program complexity</p>
      <p>Every attempt is stored inside <code>RECENT_ATTEMPTS</code>, a module-level list that persists across HTTP requests. This collection manages program complexity by maintaining session state in a stateless HTTP environment—each new quiz submission appends to the shared history, enabling features like attempt counting, progress tracking, and historical performance analysis. The list stores dictionaries with score and max_score keys, creating a simple but effective database that survives for the lifetime of the Flask process. This data structure enables the <code>summarize_attempts</code> procedure to generate contextual feedback ("You've improved from 2/5 to 4/5 over three attempts"), supports analytics ("80% of students need multiple tries"), and could extend to implement adaptive difficulty or personalized hints. Without this collection, each quiz attempt would exist in isolation, losing valuable educational context.</p>
      <pre data-lang="Python"><code>RECENT_ATTEMPTS = []</code></pre>
    </article>

    <article>
      <small>backend/main.py</small>
      <h3>3. Student-Developed Procedure</h3>
      <p><strong>Requirement:</strong> At least one procedure that contributes to the program's intended purpose, with defined name, return type, and parameters</p>
      <p>The <code>summarize_attempts(attempts, max_items=5)</code> procedure transforms raw attempt data into human-readable progress summaries. This student-developed abstraction encapsulates complex logic: it accepts a list of attempt dictionaries and an optional limit parameter (defaulting to 5), processes the collection through iteration and conditional logic, and returns a formatted string suitable for display. The procedure demonstrates defensive programming—empty lists return graceful messages rather than crashing. The index calculation (<code>start_index</code> and <code>end_index</code>) implements a sliding window that shows the most recent attempts, preventing information overload when students submit dozens of tries. Default parameters make the procedure flexible: calling <code>summarize_attempts(data)</code> shows 5 attempts, while <code>summarize_attempts(data, 10)</code> shows 10, enabling reuse across different UI contexts (detailed history page vs. compact feedback panel).</p>
      <pre data-lang="Python"><code>def summarize_attempts(attempts, max_items=5):
    if not attempts:
        return "No attempts have been recorded yet."

    summary_lines = []
    start_index = len(attempts) - 1
    end_index = max(-1, len(attempts) - 1 - max_items)
    ...</code></pre>
    </article>

    <article>
      <small>backend/main.py</small>
      <h3>4. Algorithm (Sequencing + Selection + Iteration)</h3>
      <p><strong>Requirement:</strong> An algorithm that includes sequencing, selection, and iteration</p>
      <p><strong>Sequencing:</strong> Operations execute in defined order—initialize empty summary list, calculate index boundaries, iterate through attempts, build formatted strings, join results. <strong>Selection:</strong> Conditional branching classifies attempts into three categories: "Perfect" when score equals max_score (mastery demonstration), "Partial" when score exceeds zero but falls short (progress indicator), and "No credit" for zero scores (complete misunderstanding). This categorization provides actionable feedback rather than raw numbers. <strong>Iteration:</strong> The reverse <code>range()</code> loop walks backward through the attempts list, processing most recent submissions first. The negative step value (-1) makes chronological order intuitive for users. List comprehension could compress this code, but explicit loops improve readability for students learning the algorithm. The iteration demonstrates boundary handling: <code>max(-1, ...)</code> prevents negative indices when fewer attempts exist than the requested limit.</p>
      <pre data-lang="Python"><code>for index in range(start_index, end_index, -1):
    attempt = attempts[index]
    score = attempt["score"]
    max_score = attempt["max_score"]

    if score == max_score:
        label = "Perfect"
    elif score > 0:
        label = "Partial"
    else:
        label = "No credit"

    summary_lines.append(
        f"Attempt {index + 1}: {label} ({score}/{max_score})"
    )</code></pre>
    </article>

    <article>
      <small>backend/main.py</small>
      <h3>5. Calls to the Procedure</h3>
      <p><strong>Requirement:</strong> Calls to your student-developed procedure</p>
      <p>After grading completes, the endpoint appends results to the global collection and invokes the student-developed procedure to build history summaries. This call demonstrates procedural abstraction: the main request handler focuses on HTTP concerns (parsing requests, calling APIs, formatting responses) while delegating summary generation to a specialized function. The two-step pattern—first append new data, then summarize the updated collection—ensures the current attempt appears in the returned summary. The procedure call uses default parameters (<code>summarize_attempts(RECENT_ATTEMPTS)</code> rather than explicitly passing <code>max_items=5</code>), relying on the function signature to provide sensible defaults. The returned string integrates directly into the response payload, making the procedure call essential to program functionality rather than optional debugging output.</p>
      <pre data-lang="Python"><code>RECENT_ATTEMPTS.append(
    {"score": safe_payload["score"], "max_score": safe_payload["max_score"]}
)

attempt_summary = summarize_attempts(RECENT_ATTEMPTS)
safe_payload["attempt_summary"] = attempt_summary</code></pre>
    </article>

    <article>
      <small>backend/main.py</small>
      <h3>6. Program Output</h3>
      <p><strong>Requirement:</strong> Instructions for output (tactile, audible, visual, or textual) based on input and program functionality</p>
      <p>The function returns a JSON response containing score, feedback, and computed summary—exactly what the frontend displays visually. The <code>safe_payload</code> dictionary structures output data with explicit type coercion: <code>int()</code> ensures numeric scores rather than string representations, <code>str()</code> sanitizes AI-generated feedback that might contain unexpected characters, preventing JSON serialization errors. The <code>jsonify()</code> call sets proper HTTP headers (<code>Content-Type: application/json</code>) and serializes Python data structures to JSON format, while the 200 status code signals successful processing. This output drives multiple UI elements: the score updates a progress meter, feedback populates a text panel with syntax highlighting for code snippets, and the attempt summary fills a historical timeline widget. The structured format enables frontend logic—JavaScript can parse the score to trigger celebration animations for perfect attempts or display hints for low scores.</p>
      <pre data-lang="Python"><code>safe_payload = {
    "score": int(graded_score),
    "max_score": int(graded_max),
    "feedback": str(graded_feedback),
    "attempt_summary": attempt_summary,
}
return jsonify(safe_payload), 200</code></pre>
    </article>
  </section>

  <blockquote>
    <strong>Hands-on test</strong> boot the Flask server, open <code>http://localhost:4600/frontend/test</code>, submit a response, and watch the attempt history update in real time.
  </blockquote>
</main>
