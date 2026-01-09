---
toc: false
layout: post
title: "Core 3 — AI Digit Recognizer"
description: "Deep Learning-Powered Handwritten Digit Recognition"
permalink: /cores/core-3
breadcrumbs: false
---

<style>
  :root{
    --bg: #0a0e14;
    --paper: #12171e;
    --surface: #1a2028;
    --surface-2: #141a22;
    --ink: #e0e6ed;
    --muted: #8b95a5;
    --muted-2: #6b7684;
    --border: rgba(0,255,170,0.15);
    --border-strong: rgba(0,255,170,0.28);
    --accent: #00ffaa;
    --accent-2: #00d4ff;
    --accent-3: #ff00aa;
    --success: #00ff88;
    --warning: #ffaa00;
    --danger: #ff3366;

    --radius: 2px;
    --radius-sm: 1px;
    --shadow: 0 4px 20px rgba(0,255,170,0.15), 0 0 40px rgba(0,255,170,0.08);
    --shadow-sm: 0 2px 10px rgba(0,255,170,0.12);
    --glow: 0 0 10px rgba(0,255,170,0.6), 0 0 20px rgba(0,255,170,0.4);

    --font: 'Courier New', 'Consolas', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  .digit-recognizer-wrapper{
    font-family: var(--font);
    background:
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
      radial-gradient(circle at 20% 20%, rgba(0,255,170,0.08), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0,212,255,0.06), transparent 50%),
      var(--bg);
    color: var(--ink);
    padding: 22px;
    line-height: 1.5;
    letter-spacing: 0.3px;
  }

  .digit-recognizer-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Header */
  .header {
    text-align: center;
    margin-bottom: 26px;
    padding: 22px 24px;
    background: linear-gradient(135deg, rgba(26,32,40,0.95), rgba(18,23,30,0.95));
    border: 2px solid var(--border-strong);
    border-left: 4px solid var(--accent);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    position: relative;
  }

  .header::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2), transparent);
    opacity: 0.6;
  }

  .header h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 8px;
    text-shadow: var(--glow);
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .header p {
    color: var(--muted);
    font-size: 1rem;
  }

  .main-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  @media (max-width: 968px) {
    .main-content {
      grid-template-columns: 1fr;
    }
  }

  /* Canvas Section */
  .canvas-section {
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    padding: 20px;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .canvas-section:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow);
  }

  .canvas-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .canvas-header h3 {
    color: var(--accent);
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .canvas-controls {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    background: rgba(0,255,170,0.05);
    border-radius: var(--radius);
    border: 1px solid var(--border);
  }

  .canvas-controls label {
    color: var(--muted);
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  #brush-size {
    width: 100px;
    accent-color: var(--accent);
  }

  #brush-value {
    color: var(--accent);
    font-weight: 700;
    min-width: 25px;
    text-align: center;
  }

  #drawing-canvas {
    width: 100%;
    height: auto;
    border: 2px solid var(--accent);
    border-radius: var(--radius);
    cursor: crosshair;
    background: #fff;
    touch-action: none;
    box-shadow: var(--glow);
  }

  .canvas-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-top: 15px;
  }

  .canvas-buttons #learn-cnn-btn {
    grid-column: 1 / -1;
  }

  .btn {
    padding: 12px 20px;
    border: 2px solid;
    border-radius: var(--radius);
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: var(--font);
  }

  .btn-primary {
    background: rgba(0,255,170,0.1);
    color: var(--accent);
    border-color: var(--accent);
  }

  .btn-primary:hover {
    background: var(--accent);
    color: var(--bg);
    box-shadow: var(--glow);
  }

  .btn-secondary {
    background: rgba(255,255,255,0.05);
    color: var(--muted);
    border-color: var(--border);
  }

  .btn-secondary:hover {
    background: rgba(255,255,255,0.1);
    border-color: var(--border-strong);
    color: var(--ink);
  }

  .btn-learn {
    background: rgba(0,212,255,0.1);
    color: var(--accent-2);
    border-color: var(--accent-2);
  }

  .btn-learn:hover {
    background: var(--accent-2);
    color: var(--bg);
    box-shadow: 0 0 10px rgba(0,212,255,0.6);
  }

  /* Results Section */
  .results-section {
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    padding: 20px;
    border: 2px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .results-section:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow);
  }

  .result-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .result-header h3 {
    color: var(--accent);
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .status {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--muted-2);
    border: 2px solid var(--border);
    box-shadow: 0 0 8px rgba(0,0,0,0.3);
  }

  .status.ready {
    background: var(--success);
    border-color: var(--success);
    box-shadow: 0 0 8px var(--success);
  }

  .status.processing {
    background: var(--warning);
    border-color: var(--warning);
    box-shadow: 0 0 8px var(--warning);
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .main-result {
    text-align: center;
    padding: 30px;
    background: rgba(0,255,170,0.05);
    border-radius: var(--radius);
    border: 2px solid var(--border);
    margin-bottom: 20px;
  }

  .result-number {
    font-size: 5rem;
    font-weight: 700;
    color: var(--accent);
    text-shadow: var(--glow);
    margin-bottom: 10px;
  }

  .result-confidence {
    font-size: 1.1rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .individual-digits {
    max-height: 450px;
    overflow-y: auto;
  }

  .individual-digits::-webkit-scrollbar {
    width: 8px;
  }

  .individual-digits::-webkit-scrollbar-track {
    background: var(--surface-2);
    border-radius: var(--radius);
  }

  .individual-digits::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: var(--radius);
  }

  .digit-card {
    display: flex;
    align-items: center;
    padding: 12px;
    background: rgba(0,255,170,0.05);
    border-radius: var(--radius);
    margin-bottom: 10px;
    border: 1px solid var(--border);
    transition: all 0.2s;
  }

  .digit-card:hover {
    border-color: var(--accent);
    background: rgba(0,255,170,0.1);
    transform: translateX(4px);
  }

  .digit-card.low-confidence {
    border-left: 3px solid var(--danger);
  }

  .digit-card img {
    width: 60px;
    height: 60px;
    image-rendering: pixelated;
    border: 1px solid var(--accent);
    border-radius: var(--radius);
    margin-right: 15px;
    background: #fff;
  }

  .digit-info {
    flex: 1;
  }

  .digit-prediction {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 5px;
  }

  .digit-card.low-confidence .digit-prediction {
    color: var(--danger);
  }

  .digit-confidence {
    font-size: 0.9rem;
    color: var(--success);
    margin-bottom: 3px;
  }

  .digit-top3 {
    font-size: 0.85rem;
    color: var(--muted);
  }

  /* Info Section */
  .info-section {
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    padding: 25px;
    border-radius: var(--radius);
    border: 2px solid var(--border);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
  }

  .info-section:hover {
    border-color: var(--border-strong);
    box-shadow: var(--shadow);
  }

  .info-section h3 {
    margin-bottom: 12px;
    color: var(--accent);
    font-size: 1.3rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .info-section p {
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 15px;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    gap: 15px;
    flex-wrap: wrap;
  }

  .stat {
    padding: 15px;
    background: rgba(0,255,170,0.05);
    border-radius: var(--radius);
    flex: 1;
    min-width: 150px;
    border: 1px solid var(--border);
    text-align: center;
    transition: all 0.2s;
  }

  .stat:hover {
    border-color: var(--accent);
    background: rgba(0,255,170,0.1);
  }

  .stat strong {
    display: block;
    color: var(--accent);
    margin-bottom: 6px;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .stat div {
    color: var(--ink);
    font-size: 1.1rem;
  }

  /* CNN Modal */
  .cnn-modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    overflow-y: auto;
  }

  .cnn-modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cnn-modal-content {
    background: var(--surface);
    border-radius: var(--radius);
    padding: 30px;
    max-width: 1200px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 40px rgba(0,255,170,0.3);
    border: 2px solid var(--accent);
  }

  .cnn-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--border-strong);
  }

  .cnn-modal-header h2 {
    font-size: 1.8rem;
    color: var(--accent);
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .close-btn {
    background: transparent;
    border: 2px solid var(--danger);
    color: var(--danger);
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    background: var(--danger);
    color: var(--bg);
    box-shadow: 0 0 10px var(--danger);
  }

  /* Additional styles for slideshow and challenges would continue here... */
  /* Keeping it concise - the original digrecog.css handles the rest */
</style>

<div class="digit-recognizer-wrapper">
  <div class="digit-recognizer-container">
    <div class="header">
      <h1>Digit Recognition Tool</h1>
      <p>Deep Learning-Powered Handwritten Digit Recognition</p>
    </div>

    <div class="main-content">
      <!-- Left: Drawing Canvas -->
      <div class="canvas-section">
        <div class="canvas-header">
          <h3>Drawing Canvas</h3>
          <div class="canvas-controls">
            <label for="brush-size">Brush Size:</label>
            <input type="range" id="brush-size" min="5" max="30" value="15">
            <span id="brush-value">15</span>
          </div>
        </div>

        <canvas id="drawing-canvas" width="500" height="500"></canvas>

        <div class="canvas-buttons">
          <button id="clear-btn" class="btn btn-secondary">Clear</button>
          <button id="recognize-btn" class="btn btn-primary">Recognize</button>
          <button id="learn-cnn-btn" class="btn btn-learn">View Processing Pipeline</button>
        </div>
      </div>

      <!-- Right: Results -->
      <div class="results-section">
        <div class="result-header">
          <h3>Recognition Results</h3>
          <div id="status-indicator" class="status"></div>
        </div>

        <div id="main-result" class="main-result">
          <div class="result-number">?</div>
          <div class="result-confidence">Draw a digit to begin</div>
        </div>

        <div id="individual-digits" class="individual-digits">
          <!-- Digits will appear here -->
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3>System Information</h3>
      <p>Sequential processing pipeline trained on 60,000+ samples (MNIST dataset). Uses convolution, pooling, and matrix operations to classify digits through ~200K sequential computations.</p>

      <div class="stats">
        <div class="stat">
          <strong>Architecture</strong>
          <div>Conv → Pool → Dense</div>
        </div>
        <div class="stat">
          <strong>Operations</strong>
          <div>~200,000 per digit</div>
        </div>
        <div class="stat">
          <strong>Accuracy</strong>
          <div>98.5%</div>
        </div>
      </div>
    </div>

    <!-- CNN Visualization Modal -->
    <div id="cnn-visualization-modal" class="cnn-modal">
      <div class="cnn-modal-content">
        <div class="cnn-modal-header">
          <h2>Processing Pipeline Visualization</h2>
          <button id="close-viz-btn" class="close-btn">✕</button>
        </div>
        <div class="layer-progress">
          <div id="layer-progress-bar" class="layer-progress-bar"></div>
          <div id="layer-counter" class="layer-counter">Layer 0 / 0</div>
        </div>

        <div class="layer-info">
          <h3 id="layer-title">INPUT</h3>
          <p id="layer-description">Your drawn digit</p>
        </div>

        <div id="visual-explainer" class="visual-explainer">
          <!-- Dynamically filled with visual explanations -->
        </div>

        <div class="sequential-explanation-full">
          <h4>Sequential Computing Pipeline</h4>

          <div class="lesson-content">
            <!-- Progress dots -->
            <div class="slide-progress">
              <span class="progress-dot active" data-slide="1" onclick="showSlide(1)"></span>
              <span class="progress-dot" data-slide="2" onclick="showSlide(2)"></span>
              <span class="progress-dot" data-slide="3" onclick="showSlide(3)"></span>
              <span class="progress-dot" data-slide="4" onclick="showSlide(4)"></span>
              <span class="progress-dot" data-slide="5" onclick="showSlide(5)"></span>
            </div>

            <!-- Slideshow container -->
            <div class="slideshow-container">
              <!-- Slide 1: Pixel Grid Challenge -->
              <div class="slide active" id="slide-1">
                <div class="slide-number">1/5</div>
                <h3>Step 1: From Image to Data</h3>
                <div class="concept-intro">
                  <p><strong>The Input:</strong> Your drawing becomes a 28×28 grid = 784 numbers</p>
                  <p><strong>Data representation:</strong> Each pixel is 0-255 (brightness value)</p>
                  <p>Computers don't "see" - they process numerical data through sequential operations</p>
                </div>
                <div class="pixel-challenge">
                  <div class="pixel-visualization">
                    <div class="digit-preview-container">
                      <canvas id="digit-28x28" width="200" height="200"></canvas>
                      <div class="preview-label">Your 28×28 digit</div>
                    </div>
                    <div class="mini-pixel-grid" id="mini-pixel-grid">
                      <!-- 5x5 grid generated by JS -->
                    </div>
                  </div>
                  <div class="challenge-status" id="challenge-1-status">Click pixels to reveal their values. Find one > 150!</div>
                </div>
                <div class="concept-connection">
                  ➜ Next: Apply mathematical transformations to extract features from the data
                </div>
              </div>

              <!-- Slide 2: Filter Matcher -->
              <div class="slide" id="slide-2">
                <div class="slide-number">2/5</div>
                <h3>Step 2: Pattern Detection via Convolution</h3>
                <div class="concept-intro">
                  <p><strong>Operation:</strong> Sliding window multiplies small matrices across the image</p>
                  <p><strong>Output:</strong> Feature maps highlighting edges (vertical │, horizontal ━, diagonal ╲)</p>
                  <p>This is pure matrix multiplication - each filter produces one output map</p>
                </div>
                <div class="filter-challenge">
                  <div id="filter-preview" class="filter-preview-grid">
                    <!-- Will be filled with actual feature maps -->
                  </div>
                  <div class="filter-options">
                    <button class="filter-option" onclick="checkFilter('horizontal', this)">
                      <div class="mini-filter">━━━</div>
                      <span>Horizontal</span>
                    </button>
                    <button class="filter-option" onclick="checkFilter('vertical', this)">
                      <div class="mini-filter">┃┃┃</div>
                      <span>Vertical</span>
                    </button>
                    <button class="filter-option" onclick="checkFilter('diagonal', this)">
                      <div class="mini-filter">╲╲╲</div>
                      <span>Diagonal</span>
                    </button>
                  </div>
                  <div class="challenge-status" id="challenge-2-status">Which pattern type dominates your digit?</div>
                </div>
                <div class="concept-connection">
                  ➜ Next: Reduce data dimensionality through downsampling
                </div>
              </div>

              <!-- Slide 3: Pooling Game -->
              <div class="slide" id="slide-3">
                <div class="slide-number">3/5</div>
                <h3>Step 3: Data Reduction (Max Pooling)</h3>
                <div class="concept-intro">
                  <p><strong>Purpose:</strong> Reduce computational load - fewer numbers to process</p>
                  <p><strong>Algorithm:</strong> Take max value from each 2×2 region (downsample by 2x)</p>
                  <p>28×28 → 14×14 → 7×7. Simple, fast, preserves important features</p>
                </div>
                <div class="pooling-challenge">
                  <div class="pool-before">
                    <div class="pool-grid" id="pool-grid">
                      <!-- Generated by JS -->
                    </div>
                    <div class="pool-label">Input 2×2</div>
                  </div>
                  <div class="pool-arrow">→</div>
                  <div class="pool-after">
                    <input type="number" id="pool-answer" class="pool-input" placeholder="?" min="0" max="9">
                    <button class="check-btn" onclick="checkPooling()">Check</button>
                  </div>
                </div>
                <div class="challenge-status" id="challenge-3-status">What's the maximum value?</div>
                <div class="concept-connection">
                  ➜ Next: Flatten and classify using weighted connections
                </div>
              </div>

              <!-- Slide 4: Neuron Connection -->
              <div class="slide" id="slide-4">
                <div class="slide-number">4/5</div>
                <h3>Step 4: Classification Layer (Fully Connected)</h3>
                <div class="concept-intro">
                  <p><strong>Input:</strong> Flattened feature vector (all previous layer outputs)</p>
                  <p><strong>Process:</strong> Weighted sum: output[i] = Σ(input[j] × weight[i][j])</p>
                  <p>Each output is computed independently - fully parallelizable matrix operation</p>
                </div>
                <div class="neuron-challenge">
                  <div class="neuron-visual" id="neuron-visual">
                    <!-- Generated by JS -->
                  </div>
                  <div class="answer-options" id="neuron-answers">
                    <!-- Generated by JS -->
                  </div>
                  <div class="challenge-status" id="challenge-4-status">How many connections between layers?</div>
                </div>
                <div class="concept-connection">
                  ➜ Next: See the final prediction with confidence scores
                </div>
              </div>

              <!-- Slide 5: Speed Round -->
              <div class="slide" id="slide-5">
                <div class="slide-number">5/5</div>
                <h3>Step 5: Output & Softmax</h3>
                <div class="concept-intro">
                  <p><strong>Processing Pipeline:</strong> 784 pixels → Conv (matrix ops) → Pool (downsample) → Dense (weighted sum) → 10 outputs</p>
                  <p><strong>Final step:</strong> Softmax converts raw scores to probabilities that sum to 1.0</p>
                  <p>Total inference: ~200K multiply-add operations in sequence</p>
                </div>
                <div class="speed-challenge">
                  <canvas id="speed-canvas" width="140" height="140"></canvas>
                  <div class="speed-options" id="speed-options">
                    <!-- Generated by JS -->
                  </div>
                  <div class="challenge-status" id="challenge-5-status">What digit did you draw?</div>
                </div>
                <div class="concept-connection">
                  🎉 This is a Convolutional Neural Network - a clever application of sequential mathematical operations. Draw a new digit to explore again!
                </div>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="slide-navigation">
              <button class="nav-btn prev-btn" onclick="prevSlide()">← Previous</button>
              <button class="nav-btn next-btn" onclick="nextSlide()">Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<link rel="stylesheet" href="{{ '/assets/css/digrecog.css' | relative_url }}">
<script src="{{ '/assets/js/digit-recognizer.js' | relative_url }}"></script>
