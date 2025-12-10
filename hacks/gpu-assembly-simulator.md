---
toc: false
layout: post
title: GPU Assembly Simulator - Hardware Havoc
description: Learn Sequential, Parallel, and Distributed Computing by Building GPUs
permalink: /gpu-assembly-simulator
breadcrumb: true
image: /images/gpu-assembly.png
show_reading_time: false
---

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  background: #0f0f23;
  color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-frame {
  width: 90vw;
  height: 90vh;
  max-width: 1400px;
  max-height: 850px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #00d4ff;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.game-header {
  background: linear-gradient(90deg, #0f1419 0%, #1a2332 100%);
  padding: 18px 30px;
  border-bottom: 1px solid #00d4ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.title-section h1 {
  font-size: 1.6rem;
  color: #00d4ff;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
  margin-bottom: 4px;
  font-weight: 800;
  letter-spacing: 1px;
}

.title-section p {
  font-size: 0.7rem;
  color: #7a8ba0;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
}

.header-stats {
  display: flex;
  gap: 20px;
}

.header-stat {
  text-align: center;
}

.header-stat-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: #00ff88;
  line-height: 1;
  text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

.header-stat-label {
  font-size: 0.65rem;
  color: #7a8ba0;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 4px;
  font-weight: 600;
}

/* Main Content Area */
.game-content {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* Left Sidebar */
.left-sidebar {
  width: 260px;
  background: #0f1419;
  border-right: 1px solid #1e2936;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
}

.stage-selector {
  padding: 15px;
  border-bottom: 2px solid #333;
}

.stage-selector h3 {
  font-size: 0.75rem;
  color: #7a8ba0;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.stage-btn {
  width: 100%;
  padding: 14px 12px;
  margin-bottom: 6px;
  background: #1a2332;
  border: 1px solid #2a3f5f;
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: 0.8rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 12px;
}

.stage-btn:hover:not(.locked) {
  background: #1e2d42;
  border-color: #00d4ff;
  transform: translateX(3px);
}

.stage-btn.active {
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  border-color: #00d4ff;
  color: #000;
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.4);
}

.stage-btn.locked {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: #1e2936;
}

.stage-icon {
  font-size: 1.5rem;
}

.stage-info {
  flex: 1;
}

.stage-name {
  font-weight: 700;
  font-size: 0.85rem;
  color: inherit;
}

.stage-type {
  font-size: 0.65rem;
  color: #7a8ba0;
  opacity: 0.8;
}

.achievements-panel {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.achievements-panel h3 {
  font-size: 0.9rem;
  color: #4CAFEF;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.achievement {
  background: rgba(42, 45, 45, 0.5);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 8px;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.achievement.unlocked {
  background: rgba(52, 199, 89, 0.15);
  border-color: #34c759;
}

.achievement-icon {
  font-size: 1.8rem;
  filter: grayscale(1) brightness(0.4);
}

.achievement.unlocked .achievement-icon {
  filter: grayscale(0) brightness(1);
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.achievement-info {
  flex: 1;
}

.achievement-name {
  font-size: 0.8rem;
  font-weight: 700;
  color: #F0F0F0;
}

.achievement-desc {
  font-size: 0.7rem;
  color: #888;
}

/* Center Area */
.center-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tutorial-box {
  background: #0f1419;
  border-bottom: 1px solid #00d4ff;
  flex-shrink: 0;
  overflow: hidden;
}

.tutorial-header {
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.2s ease;
}

.tutorial-header:hover {
  background: rgba(0, 212, 255, 0.05);
}

.tutorial-header h3 {
  color: #00d4ff;
  font-size: 0.7rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.tutorial-arrow {
  color: #00d4ff;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.tutorial-box.expanded .tutorial-arrow {
  transform: rotate(180deg);
}

.tutorial-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding: 0 20px;
}

.tutorial-box.expanded .tutorial-content {
  max-height: 500px;
  padding: 0 20px 15px 20px;
  overflow-y: auto;
}

.tutorial-content h4 {
  color: #00ff88;
  font-size: 0.75rem;
  margin: 12px 0 6px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
}

.tutorial-content p {
  font-size: 0.7rem;
  line-height: 1.5;
  color: #b8c5d6;
  margin: 6px 0;
}

.tutorial-content ul {
  margin: 6px 0;
  padding-left: 18px;
}

.tutorial-content li {
  font-size: 0.7rem;
  line-height: 1.4;
  color: #b8c5d6;
  margin-bottom: 4px;
}

.tutorial-content strong {
  color: #00d4ff;
}

.stage-brief {
  font-size: 0.75rem;
  line-height: 1.5;
  color: #b8c5d6;
  padding: 12px 20px;
}

.assembly-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: 0;
}

.assembly-area h3 {
  font-size: 0.8rem;
  color: #7a8ba0;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
}

.workstations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;
}

.workstation {
  background: #1a2332;
  border: 1px solid #2a3f5f;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s ease;
}

.workstation:hover {
  border-color: #00d4ff;
  box-shadow: 0 4px 16px rgba(0, 212, 255, 0.2);
}

.workstation-header {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #F0F0F0;
}

.station-load {
  font-size: 0.7rem;
  color: #4CAFEF;
  background: rgba(76, 175, 239, 0.1);
  padding: 4px 8px;
  border-radius: 12px;
}

.robot {
  background: #0f1419;
  padding: 14px;
  border-radius: 6px;
  margin-bottom: 10px;
  border: 1px solid #1e2936;
  position: relative;
  overflow: hidden;
}

.robot.busy {
  border-color: #00ff88;
  box-shadow: 0 0 12px rgba(0, 255, 136, 0.3);
}

.robot.busy::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 255, 136, 0.15), transparent);
  animation: progress var(--duration) linear forwards;
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}

.robot-name {
  font-weight: 700;
  font-size: 0.8rem;
  color: #00d4ff;
  margin-bottom: 6px;
  position: relative;
  z-index: 1;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.robot-status {
  font-size: 0.75rem;
  color: #b8c5d6;
  position: relative;
  z-index: 1;
  line-height: 1.4;
}

.task-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 10px;
  position: relative;
  z-index: 1;
}

.task-btn {
  padding: 10px 8px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 800;
  font-size: 0.7rem;
  font-family: inherit;
  transition: all 0.2s ease;
}

.task-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 212, 255, 0.5);
}

.task-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: #1e2936;
  color: #4a5568;
}

.testing-station {
  background: rgba(229, 62, 62, 0.1);
  border: 2px solid #E53E3E;
  border-radius: 8px;
  padding: 12px;
  margin-top: 10px;
}

.testing-station.busy {
  box-shadow: 0 0 15px rgba(229, 62, 62, 0.4);
}

.testing-status {
  font-weight: 700;
  font-size: 0.85rem;
  color: #E53E3E;
  margin-bottom: 8px;
}

/* Right Sidebar */
.right-sidebar {
  width: 300px;
  background: rgba(30, 30, 40, 0.8);
  border-left: 2px solid #333;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.controls-panel {
  padding: 15px;
  border-bottom: 2px solid #333;
}

.controls-panel h3 {
  font-size: 0.9rem;
  color: #4CAFEF;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn {
  width: 100%;
  padding: 14px 12px;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  color: #000;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 800;
  font-family: inherit;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 212, 255, 0.5);
}

.btn-success {
  background: linear-gradient(135deg, #00ff88 0%, #00cc6a 100%);
  color: #000;
}

.btn-warning {
  background: linear-gradient(135deg, #ff9500 0%, #cc7700 100%);
  color: #000;
}

.orders-panel {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}

.orders-panel h3 {
  font-size: 0.9rem;
  color: #4CAFEF;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.order-card {
  background: rgba(42, 45, 45, 0.8);
  border: 2px solid #333;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.order-card:hover {
  border-color: #4CAFEF;
  transform: translateY(-2px);
}

.order-id {
  font-weight: 700;
  font-size: 0.95rem;
  color: #4CAFEF;
  margin-bottom: 8px;
}

.order-factory {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 8px;
}

.order-progress {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.progress-step {
  aspect-ratio: 1;
  background: rgba(20, 20, 30, 0.9);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 2px solid #333;
  transition: all 0.3s ease;
}

.progress-step.completed {
  background: rgba(52, 199, 89, 0.3);
  border-color: #34c759;
  box-shadow: 0 0 10px rgba(52, 199, 89, 0.4);
  animation: pulse 0.4s ease;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

/* Game Over Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(5px);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.modal-overlay.show {
  display: flex;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 3px solid #4CAFEF;
  border-radius: 16px;
  padding: 40px;
  max-width: 600px;
  text-align: center;
  animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-emoji {
  font-size: 80px;
  margin-bottom: 20px;
}

.modal-content h2 {
  font-size: 2rem;
  color: #4CAFEF;
  margin-bottom: 20px;
}

.results-box {
  background: rgba(76, 175, 239, 0.1);
  border: 2px solid #4CAFEF;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #333;
  font-size: 1rem;
}

.result-row:last-child {
  border-bottom: none;
}

.improvement-box {
  background: rgba(52, 199, 89, 0.1);
  border: 2px solid #34c759;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.improvement-box h3 {
  color: #34c759;
  font-size: 1.3rem;
  margin-bottom: 15px;
}

.improvement-value {
  font-size: 2rem;
  color: #34c759;
  font-weight: 900;
  margin: 15px 0;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(20, 20, 30, 0.95);
  color: #F0F0F0;
  padding: 15px 25px;
  border-radius: 8px;
  border: 2px solid #4CAFEF;
  box-shadow: 0 4px 20px rgba(76, 175, 239, 0.4);
  animation: slideIn 0.3s ease;
  z-index: 2000;
  font-size: 0.9rem;
  font-weight: 700;
}

@keyframes slideIn {
  from { transform: translateX(400px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.toast.success { border-color: #34c759; }
.toast.warning { border-color: #FBBF24; }
.toast.info { border-color: #4CAFEF; }

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(20, 20, 30, 0.5);
}

::-webkit-scrollbar-thumb {
  background: #4CAFEF;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5CBFFF;
}

/* Help Button */
.help-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
  border: 2px solid #00d4ff;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #000;
  font-weight: 900;
  box-shadow: 0 4px 15px rgba(0, 212, 255, 0.5);
  transition: all 0.3s ease;
  z-index: 1500;
}

.help-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 25px rgba(0, 212, 255, 0.7);
}

.help-tooltip {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid #00d4ff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0, 212, 255, 0.4);
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1400;
  max-height: 500px;
  overflow-y: auto;
}

.help-tooltip.show,
.help-button:hover + .help-tooltip,
.help-tooltip:hover {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.help-tooltip h3 {
  color: #00d4ff;
  font-size: 1.1rem;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.help-tooltip h4 {
  color: #00ff88;
  font-size: 0.9rem;
  margin-top: 15px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.help-tooltip p {
  color: #b8c5d6;
  font-size: 0.8rem;
  line-height: 1.6;
  margin-bottom: 10px;
}

.help-tooltip ul {
  margin: 10px 0;
  padding-left: 20px;
}

.help-tooltip li {
  color: #b8c5d6;
  font-size: 0.75rem;
  line-height: 1.5;
  margin-bottom: 6px;
}
</style>
<body>

<div class="game-frame">
  <!-- Header -->
  <div class="game-header">
    <div class="title-section">
      <h1>⚡ GPU ASSEMBLY SIMULATOR</h1>
      <p>Hardware Havoc :: Computing Models Lab</p>
    </div>
    <div class="header-stats">
      <div class="header-stat">
        <div class="header-stat-value" id="gpusCompleted">0</div>
        <div class="header-stat-label">GPUs Built</div>
      </div>
      <div class="header-stat">
        <div class="header-stat-value" id="timeElapsed">0.0s</div>
        <div class="header-stat-label">Time</div>
      </div>
      <div class="header-stat">
        <div class="header-stat-value" id="avgTime">--</div>
        <div class="header-stat-label">Avg/GPU</div>
      </div>
      <div class="header-stat">
        <div class="header-stat-value" id="throughput">0.0</div>
        <div class="header-stat-label">GPUs/Min</div>
      </div>
    </div>
  </div>

  <!-- Main Content -->
  <div class="game-content">
    <!-- Left Sidebar -->
    <div class="left-sidebar">
      <div class="stage-selector">
        <h3>📊 Stages</h3>
        <button class="stage-btn active" onclick="selectStage(1)">
          <span class="stage-icon">🤖</span>
          <div class="stage-info">
            <div class="stage-name">Stage 1</div>
            <div class="stage-type">Sequential</div>
          </div>
        </button>
        <button class="stage-btn locked" id="stage2Btn" onclick="selectStage(2)">
          <span class="stage-icon">🤖🤖</span>
          <div class="stage-info">
            <div class="stage-name">Stage 2</div>
            <div class="stage-type">Parallel</div>
          </div>
        </button>
        <button class="stage-btn locked" id="stage3Btn" onclick="selectStage(3)">
          <span class="stage-icon">🏭🏭</span>
          <div class="stage-info">
            <div class="stage-name">Stage 3</div>
            <div class="stage-type">Distributed</div>
          </div>
        </button>
      </div>

      <div class="achievements-panel">
        <h3>🏆 Achievements</h3>
        <div id="achievementsList"></div>
      </div>
    </div>

    <!-- Center Area -->
    <div class="center-area">
      <div class="tutorial-box" id="tutorialBox">
        <div class="tutorial-header" onclick="toggleTutorial()">
          <h3>📚 Learning Guide: Computing Models</h3>
          <span class="tutorial-arrow">▼</span>
        </div>
        <div class="tutorial-content">
          <h4>🎯 Learning Objectives</h4>
          <ul>
            <li>Define <strong>sequential, parallel, and distributed computing</strong></li>
            <li>Identify real-world examples of each computing model</li>
            <li>Explain the concept of <strong>resource contention</strong> in parallel systems</li>
            <li>Compare performance trade-offs between different architectures</li>
            <li>Apply computing models to solve problems efficiently</li>
          </ul>

          <h4>⚙️ Stage 1: Sequential Computing — One Thing at a Time</h4>
          <p><strong>Definition:</strong> Executes instructions one after another in a single stream. Only one task runs at any moment.</p>
          <p><strong>Analogy:</strong> Single chef making pizzas — must complete each step before starting next pizza.</p>
          <p><strong>Real-World Examples:</strong> Early computers (1940s-1970s), simple calculators, single-threaded programs, following recipes</p>
          <ul>
            <li>✅ <strong>Advantages:</strong> Simple to understand, predictable execution, no coordination overhead</li>
            <li>❌ <strong>Disadvantages:</strong> Slow for large workloads, resources sit idle, can't use multi-core processors</li>
          </ul>

          <h4>⚡ Stage 2: Parallel Computing — Many Hands Make Light Work</h4>
          <p><strong>Definition:</strong> Divides tasks to execute simultaneously on multiple processors sharing the same memory and resources.</p>
          <p><strong>Analogy:</strong> 3 chefs in one kitchen with 1 shared oven — they can work in parallel but bottleneck at testing!</p>
          <p><strong>KEY CONCEPT — Resource Contention:</strong> When multiple threads compete for same resource, they must wait (the oven bottleneck).</p>
          <p><strong>Real-World Examples:</strong> Multi-core CPUs (4-16 cores), GPUs (thousands of cores), web browsers, video games, scientific simulations</p>
          <ul>
            <li>✅ <strong>Advantages:</strong> Faster than sequential, better resource utilization, handles multiple users</li>
            <li>❌ <strong>Disadvantages:</strong> Shared resources create bottlenecks, requires synchronization, harder debugging (race conditions)</li>
          </ul>

          <h4>🌐 Stage 3: Distributed Computing — Independent Powerhouses</h4>
          <p><strong>Definition:</strong> Spreads tasks across multiple independent computers connected by network. Each has own CPU, memory, resources.</p>
          <p><strong>Analogy:</strong> 3 separate pizza shops with own chefs and ovens — orders route to least busy shop. No sharing, no waiting!</p>
          <p><strong>KEY CONCEPT — Load Balancing:</strong> Distributing work evenly so no machine is overwhelmed while others sit idle.</p>
          <p><strong>Real-World Examples:</strong> Google Search (thousands of servers), Netflix CDN, blockchain networks, cloud computing (AWS/Azure), multiplayer games</p>
          <ul>
            <li>✅ <strong>Advantages:</strong> Scales horizontally (add more machines), fault tolerant, no resource contention, geographic distribution</li>
            <li>❌ <strong>Disadvantages:</strong> Network latency, complex coordination, higher cost, data consistency challenges</li>
          </ul>

          <h4>📊 Performance Comparison</h4>
          <p><strong>Sequential:</strong> Slow | Limited scaling | Simple | Low cost 💰</p>
          <p><strong>Parallel:</strong> Fast ⚡ | Moderate scaling | Medium complexity ⚠️ | Medium cost 💰💰</p>
          <p><strong>Distributed:</strong> Very Fast 🚀 | High scaling | Complex | High cost 💰💰💰</p>

          <h4>🔍 Real-World Case Study: How YouTube Works</h4>
          <p><strong>YouTube uses ALL THREE models:</strong></p>
          <ul>
            <li><strong>Sequential:</strong> Your browser processes HTML sequentially</li>
            <li><strong>Parallel:</strong> Video encoding uses multiple CPU cores to compress faster</li>
            <li><strong>Distributed:</strong> Millions of videos across thousands of servers worldwide with CDN caching</li>
          </ul>
          <p><strong>Result:</strong> You can watch 4K cat videos with no buffering!</p>

          <h4>🎮 How to Play</h4>
          <p><strong>Goal:</strong> Build 5 GPUs per stage as fast as possible</p>
          <ul>
            <li><strong>Stage 1:</strong> Click PCB → Cores → Memory → Test in order for each GPU</li>
            <li><strong>Stage 2:</strong> Assign tasks to any available robot, but watch the testing bottleneck!</li>
            <li><strong>Stage 3:</strong> Fully automated — observe load balancing route orders to least busy factory</li>
          </ul>

          <h4>💡 Key Insights</h4>
          <ul>
            <li><strong>Amdahl's Law:</strong> Not all programs can be perfectly parallelized — if only 50% can parallelize, max speedup is only 2x even with infinite processors!</li>
            <li><strong>Throughput:</strong> Measure efficiency in GPUs/minute — try to reach 10+ in Stage 3!</li>
            <li><strong>Trade-offs:</strong> More speed = more complexity and cost</li>
            <li><strong>Modern systems:</strong> Your laptop uses all three models simultaneously!</li>
          </ul>

          <h4>🏆 Challenge Yourself</h4>
          <ul>
            <li>Complete all 3 stages and compare times</li>
            <li>Calculate speedup: Stage1Time ÷ Stage3Time</li>
            <li>Achieve 10+ GPUs/minute throughput in Stage 3</li>
            <li>Unlock all achievements</li>
            <li>Reflect: Which model surprised you most?</li>
          </ul>
        </div>
        <div class="stage-brief" id="stageBrief">Click START to begin assembly!</div>
      </div>

      <div class="assembly-area">
        <h3>🏭 Assembly Line</h3>
        <div id="workstationsGrid" class="workstations-grid"></div>
      </div>
    </div>

    <!-- Right Sidebar -->
    <div class="right-sidebar">
      <div class="controls-panel">
        <h3>⚙️ Controls</h3>
        <button class="btn btn-success" onclick="startGame()">▶ Start</button>
        <button class="btn btn-warning" onclick="resetGame()">↻ Reset</button>
        <button class="btn" onclick="addOrder()">➕ New Order</button>
      </div>

      <div class="orders-panel">
        <h3>📦 Orders Queue</h3>
        <div id="ordersList"></div>
      </div>
    </div>
  </div>
</div>

<!-- Game Over Modal -->
<div id="gameOverModal" class="modal-overlay">
  <div class="modal-content">
    <div class="modal-emoji">⚡</div>
    <h2>STAGE COMPLETE!</h2>
    <div id="resultsContent"></div>
    <button class="btn btn-success" onclick="nextStage()" style="margin-top: 25px;">Next Stage →</button>
  </div>
</div>

<script type="module">
// Import API configuration
import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

// Game State
let currentStage = 1;
let gameRunning = false;
let orders = [];
let completedGPUs = 0;
let startTime = null;
let timeElapsed = 0;
let orderCounter = 1;
let workstations = [];
let totalGPUsAllTime = 0;
let fastestGPU = Infinity;
let sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
const API_URL = pythonURI;

let stageStats = {
  1: { completed: 0, time: 0, avgTime: 0 },
  2: { completed: 0, time: 0, avgTime: 0 },
  3: { completed: 0, time: 0, avgTime: 0 }
};

const achievements = [
  { id: 'first', name: 'First Build', desc: 'Assemble 1 GPU', icon: '💎', unlocked: false, check: () => totalGPUsAllTime >= 1 },
  { id: 'speed', name: 'Speed Demon', desc: 'GPU in under 10s', icon: '⚡', unlocked: false, check: () => false },
  { id: 'stage1', name: 'Sequential Master', desc: 'Complete Stage 1', icon: '🥇', unlocked: false, check: () => stageStats[1].completed >= 5 },
  { id: 'stage2', name: 'Parallel Expert', desc: 'Complete Stage 2', icon: '🥈', unlocked: false, check: () => stageStats[2].completed >= 5 },
  { id: 'stage3', name: 'Factory Mogul', desc: 'Complete Stage 3', icon: '🥉', unlocked: false, check: () => stageStats[3].completed >= 5 },
  { id: 'efficiency', name: 'Peak Efficiency', desc: '10+ GPUs/min', icon: '📈', unlocked: false, check: () => false },
  { id: 'marathon', name: 'Production Pro', desc: '20 Total GPUs', icon: '🏭', unlocked: false, check: () => totalGPUsAllTime >= 20 }
];

const TASK_DURATIONS = {
  pcb: 2000,
  cores: 1500,
  memory: 1500,
  test: 3000
};

const TASK_ICONS = {
  pcb: '🔲',
  cores: '⚙️',
  memory: '💾',
  test: '🔬'
};

const TASK_NAMES = {
  pcb: 'PCB',
  cores: 'Cores',
  memory: 'Memory',
  test: 'Test'
};

// Audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

  const freqs = {
    click: [800, 400],
    complete: [523, 659, 784],
    achievement: [659, 784, 1047],
    stage: [440, 554, 659]
  };

  if (freqs[type]) {
    osc.frequency.setValueAtTime(freqs[type][0], audioCtx.currentTime);
  }

  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + 0.2);
}

function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideIn 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function checkAchievements() {
  achievements.forEach(ach => {
    if (!ach.unlocked && ach.check()) {
      ach.unlocked = true;
      playSound('achievement');
      showToast(`🏆 ${ach.name}!`, 'success');
      renderAchievements();
    }
  });

  const throughput = timeElapsed > 0 ? ((completedGPUs / timeElapsed) * 60) : 0;
  if (throughput >= 10 && !achievements.find(a => a.id === 'efficiency').unlocked) {
    achievements.find(a => a.id === 'efficiency').unlocked = true;
    playSound('achievement');
    showToast('🏆 Peak Efficiency!', 'success');
    renderAchievements();
  }

  if (fastestGPU < 10 && !achievements.find(a => a.id === 'speed').unlocked) {
    achievements.find(a => a.id === 'speed').unlocked = true;
    playSound('achievement');
    showToast('🏆 Speed Demon!', 'success');
    renderAchievements();
  }
}

function renderAchievements() {
  const list = document.getElementById('achievementsList');
  list.innerHTML = achievements.map(a => `
    <div class="achievement ${a.unlocked ? 'unlocked' : ''}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-info">
        <div class="achievement-name">${a.name}</div>
        <div class="achievement-desc">${a.desc}</div>
      </div>
    </div>
  `).join('');
}

function toggleTutorial() {
  const tutorialBox = document.getElementById('tutorialBox');
  tutorialBox.classList.toggle('expanded');
}

function initGame() {
  renderAchievements();
  selectStage(1);
}

function selectStage(stage) {
  const btn = document.getElementById(`stage${stage}Btn`);
  if (stage > 1 && btn && btn.classList.contains('locked')) {
    showToast('Complete previous stage first!', 'warning');
    return;
  }

  currentStage = stage;
  playSound('click');

  document.querySelectorAll('.stage-btn').forEach((b, i) => {
    b.classList.remove('active');
    if (i + 1 === stage) b.classList.add('active');
  });

  resetGame();
  setupStage(stage);
}

function setupStage(stage) {
  workstations = [];
  const stageBrief = document.getElementById('stageBrief');

  if (stage === 1) {
    stageBrief.textContent = 'SEQUENTIAL: One robot processes GPUs step-by-step. Click PCB → Cores → Memory → Test in order.';
    workstations.push({
      id: 1,
      name: 'Assembly Line',
      robots: [{ id: 1, name: 'Robot-01', busy: false, task: null, timer: null }],
      tester: { busy: false, timer: null, orderId: null }
    });
  } else if (stage === 2) {
    stageBrief.textContent = 'PARALLEL: Three robots work together! But they share ONE testing station—this creates a bottleneck!';
    workstations.push({
      id: 1,
      name: 'Assembly Line',
      robots: [
        { id: 1, name: 'Robot-01', busy: false, task: null, timer: null },
        { id: 2, name: 'Robot-02', busy: false, task: null, timer: null },
        { id: 3, name: 'Robot-03', busy: false, task: null, timer: null }
      ],
      tester: { busy: false, timer: null, orderId: null }
    });
  } else if (stage === 3) {
    stageBrief.textContent = 'DISTRIBUTED: Three independent factories with their own testing! Orders auto-route to least busy factory.';
    for (let i = 1; i <= 3; i++) {
      workstations.push({
        id: i,
        name: `Factory ${String.fromCharCode(64 + i)}`,
        robots: [{ id: 1, name: `Bot-${i}`, busy: false, task: null, timer: null }],
        tester: { busy: false, timer: null, orderId: null }
      });
    }
  }

  renderWorkstations();
}

function renderWorkstations() {
  const grid = document.getElementById('workstationsGrid');
  grid.innerHTML = workstations.map(station => `
    <div class="workstation">
      <div class="workstation-header">
        <span>${station.name}</span>
        <span class="station-load">${getStationLoad(station)}</span>
      </div>
      ${station.robots.map(robot => `
        <div class="robot ${robot.busy ? 'busy' : ''}" ${robot.busy ? `style="--duration: ${TASK_DURATIONS[robot.task]}ms"` : ''}>
          <div class="robot-name">${robot.name}</div>
          <div class="robot-status">${robot.busy ? `[${TASK_NAMES[robot.task]}] GPU #${robot.orderId || '?'}` : '[IDLE]'}</div>
          ${currentStage !== 3 ? `
            <div class="task-buttons">
              ${Object.keys(TASK_DURATIONS).filter(t => t !== 'test').map(task => `
                <button class="task-btn" onclick="assignTask(${station.id}, ${robot.id}, '${task}')" ${robot.busy ? 'disabled' : ''}>
                  ${TASK_ICONS[task]}
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>
      `).join('')}
      <div class="testing-station ${station.tester.busy ? 'busy' : ''}">
        <div class="testing-status">🔬 ${station.tester.busy ? `Testing #${station.tester.orderId}` : 'Ready'}</div>
        ${currentStage !== 3 ? `
          <button class="task-btn" onclick="assignTest(${station.id})" ${station.tester.busy ? 'disabled' : ''} style="width: 100%;">
            ${TASK_ICONS.test} Test
          </button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function getStationLoad(station) {
  const busy = station.robots.filter(r => r.busy).length;
  const total = station.robots.length;
  return `${busy}/${total} ${station.tester.busy ? '🔴' : '🟢'}`;
}

function addOrder() {
  const stationId = currentStage === 3 ? findLeastBusyStation() : 1;

  const order = {
    id: orderCounter++,
    steps: { pcb: false, cores: false, memory: false, test: false },
    stationId: stationId,
    startTime: Date.now()
  };

  orders.push(order);
  playSound('click');
  renderOrders();

  if (currentStage === 3) {
    autoProcessOrder(order);
  }
}

function findLeastBusyStation() {
  let min = Infinity;
  let best = workstations[0];
  workstations.forEach(s => {
    const load = s.robots.filter(r => r.busy).length + (s.tester.busy ? 1 : 0);
    if (load < min) {
      min = load;
      best = s;
    }
  });
  return best.id;
}

function autoProcessOrder(order) {
  const station = workstations.find(s => s.id === order.stationId);
  const robot = station.robots[0];

  const processStep = (step) => {
    if (order.steps[step]) return;

    if (step === 'test') {
      if (!station.tester.busy && order.steps.pcb && order.steps.cores && order.steps.memory) {
        station.tester.busy = true;
        station.tester.orderId = order.id;
        station.tester.timer = setTimeout(() => {
          order.steps.test = true;
          station.tester.busy = false;
          station.tester.orderId = null;
          checkOrderComplete(order);
          renderOrders();
          renderWorkstations();
        }, TASK_DURATIONS.test);
        renderWorkstations();
      }
    } else {
      if (!robot.busy) {
        robot.busy = true;
        robot.task = step;
        playSound('click');
        robot.timer = setTimeout(() => {
          order.steps[step] = true;
          robot.busy = false;
          robot.task = null;
          renderOrders();
          renderWorkstations();

          const steps = ['pcb', 'cores', 'memory', 'test'];
          const idx = steps.indexOf(step);
          if (idx < steps.length - 1) {
            setTimeout(() => processStep(steps[idx + 1]), 100);
          }
        }, TASK_DURATIONS[step]);
        renderWorkstations();
      }
    }
  };

  processStep('pcb');
}

function assignTask(stationId, robotId, task) {
  const station = workstations.find(s => s.id === stationId);
  const robot = station.robots.find(r => r.id === robotId);

  if (robot.busy || orders.length === 0) return;

  // Find first available order that needs this task and meets prerequisites
  let order = null;
  for (let o of orders) {
    if (o.stationId !== stationId && currentStage !== 3) continue;

    if (!o.steps[task]) {
      const steps = ['pcb', 'cores', 'memory'];
      const idx = steps.indexOf(task);

      // Check if prerequisites are met
      if (idx === 0 || order === null) {
        if (idx === 0 || o.steps[steps[idx - 1]]) {
          order = o;
          break;
        }
      }
    }
  }

  if (!order) {
    showToast('No orders need this task!', 'warning');
    return;
  }

  if (order.steps[task]) {
    showToast(`${task.toUpperCase()} already done!`, 'warning');
    return;
  }

  const steps = ['pcb', 'cores', 'memory'];
  const idx = steps.indexOf(task);
  if (idx > 0 && !order.steps[steps[idx - 1]]) {
    showToast(`Complete ${steps[idx - 1].toUpperCase()} first!`, 'warning');
    return;
  }

  robot.busy = true;
  robot.task = task;
  robot.orderId = order.id;
  playSound('click');

  // Faster task times for Stage 2 to show parallel advantage
  const duration = currentStage === 2 ? TASK_DURATIONS[task] * 0.6 : TASK_DURATIONS[task];

  robot.timer = setTimeout(() => {
    order.steps[task] = true;
    robot.busy = false;
    robot.task = null;
    robot.orderId = null;
    playSound('complete');
    renderOrders();
    renderWorkstations();
  }, duration);

  renderWorkstations();
}

function assignTest(stationId) {
  const station = workstations.find(s => s.id === stationId);

  if (station.tester.busy || orders.length === 0) return;

  // Find first order ready for testing
  let order = null;
  for (let o of orders) {
    if (o.stationId !== stationId && currentStage !== 3) continue;

    if (!o.steps.test && o.steps.pcb && o.steps.cores && o.steps.memory) {
      order = o;
      break;
    }
  }

  if (!order) {
    showToast('No orders ready for testing!', 'warning');
    return;
  }

  if (order.steps.test) {
    showToast('Already tested!', 'warning');
    return;
  }

  station.tester.busy = true;
  station.tester.orderId = order.id;
  playSound('click');

  // Faster test times for Stage 2
  const duration = currentStage === 2 ? TASK_DURATIONS.test * 0.6 : TASK_DURATIONS.test;

  station.tester.timer = setTimeout(() => {
    order.steps.test = true;
    station.tester.busy = false;
    station.tester.orderId = null;
    playSound('complete');
    checkOrderComplete(order);
    renderOrders();
    renderWorkstations();
  }, duration);

  renderWorkstations();
}

function checkOrderComplete(order) {
  if (order.steps.pcb && order.steps.cores && order.steps.memory && order.steps.test) {
    completedGPUs++;
    totalGPUsAllTime++;
    const time = (Date.now() - order.startTime) / 1000;

    if (time < fastestGPU) {
      fastestGPU = time;
    }

    orders = orders.filter(o => o.id !== order.id);
    playSound('stage');
    showToast(`✅ GPU #${order.id} done in ${time.toFixed(1)}s!`, 'success');

    updateStats();
    checkAchievements();

    if (completedGPUs >= 5) {
      completeStage();
    }
  }
}

function renderOrders() {
  const list = document.getElementById('ordersList');

  if (orders.length === 0) {
    list.innerHTML = '<div style="opacity: 0.6; font-size: 0.85rem; text-align: center;">No orders</div>';
    return;
  }

  list.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-id">GPU #${order.id}</div>
      ${currentStage === 3 ? `<div class="order-factory">Factory ${String.fromCharCode(64 + order.stationId)}</div>` : ''}
      <div class="order-progress">
        ${Object.keys(TASK_DURATIONS).map(task => `
          <div class="progress-step ${order.steps[task] ? 'completed' : ''}">
            ${TASK_ICONS[task]}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function startGame() {
  if (gameRunning) {
    showToast('Already running!', 'info');
    return;
  }

  gameRunning = true;
  startTime = Date.now();
  playSound('stage');
  showToast('🚀 Production started!', 'info');

  for (let i = 0; i < 3; i++) {
    setTimeout(() => addOrder(), i * 500);
  }

  const addInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(addInterval);
      return;
    }
    if (orders.length < 5) {
      addOrder();
    }
  }, currentStage === 1 ? 8000 : currentStage === 2 ? 5000 : 4000);

  const updateInterval = setInterval(() => {
    if (!gameRunning) {
      clearInterval(updateInterval);
      return;
    }
    updateStats();
  }, 100);
}

function updateStats() {
  timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;

  document.getElementById('gpusCompleted').textContent = completedGPUs;
  document.getElementById('timeElapsed').textContent = timeElapsed.toFixed(1) + 's';

  const avg = completedGPUs > 0 ? (timeElapsed / completedGPUs).toFixed(1) + 's' : '--';
  document.getElementById('avgTime').textContent = avg;

  const throughput = timeElapsed > 0 ? ((completedGPUs / timeElapsed) * 60).toFixed(1) : '0.0';
  document.getElementById('throughput').textContent = throughput;
}

function completeStage() {
  gameRunning = false;
  playSound('achievement');

  stageStats[currentStage] = {
    completed: completedGPUs,
    time: timeElapsed,
    avgTime: timeElapsed / completedGPUs
  };

  // Log game data to backend
  logGameData();

  const results = document.getElementById('resultsContent');
  const improvement = currentStage > 1 ?
    ((stageStats[currentStage - 1].avgTime / stageStats[currentStage].avgTime - 1) * 100).toFixed(0) : 0;

  results.innerHTML = `
    <div class="results-box">
      <div class="result-row">
        <span>GPUs Built:</span>
        <strong>${completedGPUs}</strong>
      </div>
      <div class="result-row">
        <span>Total Time:</span>
        <strong>${timeElapsed.toFixed(1)}s</strong>
      </div>
      <div class="result-row">
        <span>Avg Time/GPU:</span>
        <strong>${(timeElapsed / completedGPUs).toFixed(1)}s</strong>
      </div>
      <div class="result-row">
        <span>Throughput:</span>
        <strong>${((completedGPUs / timeElapsed) * 60).toFixed(1)} GPUs/min</strong>
      </div>
    </div>

    ${currentStage > 1 ? `
      <div class="improvement-box">
        <h3>⚡ Performance Boost</h3>
        <div class="improvement-value">+${improvement}% FASTER</div>
        <p style="font-size: 0.9rem; line-height: 1.5; color: #ddd;">
          ${currentStage === 2 ?
            'Parallel processing increased speed, but the shared test station became a bottleneck!' :
            'Distributed computing eliminated all bottlenecks with independent resources!'}
        </p>
      </div>
    ` : `
      <p style="margin-top: 15px; font-size: 0.9rem; line-height: 1.5; color: #ddd;">
        Sequential processing is simple but slow. Ready for parallelism?
      </p>
    `}
  `;

  if (currentStage < 3) {
    document.getElementById(`stage${currentStage + 1}Btn`).classList.remove('locked');
  }

  checkAchievements();
  document.getElementById('gameOverModal').classList.add('show');
}

function nextStage() {
  document.getElementById('gameOverModal').classList.remove('show');
  playSound('click');

  if (currentStage < 3) {
    selectStage(currentStage + 1);
  } else {
    showToast('🎉 All stages complete!', 'success');
  }
}

function resetGame() {
  gameRunning = false;
  orders = [];
  completedGPUs = 0;
  timeElapsed = 0;
  orderCounter = 1;

  workstations.forEach(station => {
    station.robots.forEach(robot => {
      if (robot.timer) clearTimeout(robot.timer);
      robot.busy = false;
      robot.task = null;
      robot.timer = null;
    });
    if (station.tester.timer) clearTimeout(station.tester.timer);
    station.tester.busy = false;
    station.tester.timer = null;
    station.tester.orderId = null;
  });

  updateStats();
  renderOrders();
  renderWorkstations();
  showToast('↻ Reset complete', 'info');
}

// Backend logging function
async function logGameData() {
  try {
    const unlockedAchievements = achievements.filter(a => a.unlocked).map(a => a.id);
    const throughput = timeElapsed > 0 ? ((completedGPUs / timeElapsed) * 60) : 0;

    const gameData = {
      sessionId: sessionId,
      stage: currentStage,
      gpusCompleted: completedGPUs,
      timeElapsed: parseFloat(timeElapsed.toFixed(2)),
      avgTime: parseFloat((timeElapsed / completedGPUs).toFixed(2)),
      throughput: parseFloat(throughput.toFixed(2)),
      achievements: unlockedAchievements,
      fastestGPU: fastestGPU !== Infinity ? parseFloat(fastestGPU.toFixed(2)) : null
    };

    console.log('📊 Logging game data:', gameData);

    const response = await fetch(`${API_URL}/api/game-logs/gpu-simulator`, {
      ...fetchOptions,
      method: 'POST',
      body: JSON.stringify(gameData)
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Game data logged successfully:', result);
    } else {
      console.warn('⚠️ Failed to log game data:', response.status);
    }
  } catch (error) {
    console.error('❌ Error logging game data:', error);
    // Don't show error to user, just log it
  }
}

initGame();

// Help tooltip toggle
let helpTooltipTimeout;
document.addEventListener('DOMContentLoaded', () => {
  const helpButton = document.querySelector('.help-button');
  const helpTooltip = document.querySelector('.help-tooltip');
  
  helpButton.addEventListener('click', (e) => {
    e.stopPropagation();
    helpTooltip.classList.toggle('show');
  });
  
  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!helpButton.contains(e.target) && !helpTooltip.contains(e.target)) {
      helpTooltip.classList.remove('show');
    }
  });
  
  // Keep tooltip open when hovering over it
  helpTooltip.addEventListener('mouseenter', () => {
    clearTimeout(helpTooltipTimeout);
  });
  
  helpTooltip.addEventListener('mouseleave', () => {
    helpTooltipTimeout = setTimeout(() => {
      helpTooltip.classList.remove('show');
    }, 300);
  });
});
</script>

<!-- Help Button -->
<div class="help-button">?</div>
<div class="help-tooltip">
  <h3>How to Play</h3>

  <h4>Goal</h4>
  <p>Build 5 GPUs as fast as possible by completing all assembly steps for each order.</p>

  <h4>Controls</h4>
  <ul>
    <li><strong>Start:</strong> Begin production and spawn orders</li>
    <li><strong>Reset:</strong> Clear current stage and restart</li>
    <li><strong>New Order:</strong> Manually add an order to the queue</li>
  </ul>

  <h4>Stage 1 - Sequential</h4>
  <p>One robot processes each GPU step-by-step. Click the task buttons (PCB, Cores, Memory) in order, then Test when ready.</p>

  <h4>Stage 2 - Parallel</h4>
  <p>Three robots work simultaneously! Assign tasks to any available robot. Notice the shared testing station becomes a bottleneck.</p>

  <h4>Stage 3 - Distributed</h4>
  <p>Three independent factories with dedicated testers. Orders auto-route to the least busy factory. Fully automated!</p>

  <h4>Tips</h4>
  <ul>
    <li>Complete tasks in order: PCB → Cores → Memory → Test</li>
    <li>Watch for bottlenecks (red indicators)</li>
    <li>Track progress in the Orders Queue panel</li>
    <li>Unlock achievements for special accomplishments</li>
  </ul>
</div>