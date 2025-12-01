---
toc: true
layout: post
title: Prototype of a Room Code system
description: This is a prototype to test the join code feature
permalink: /prototyperoomcode
breadcrumbs: true
---

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    color: #e2e8f0;
    min-height: 100vh;
    padding: 20px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border-radius: 15px;
    border: 2px solid #38bdf8;
  }

  .header h1 {
    color: #38bdf8;
    font-size: 2.5em;
    margin-bottom: 10px;
  }

  .section {
    background: #1e293b;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 25px;
    border-left: 4px solid #38bdf8;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  .section h2 {
    color: #38bdf8;
    margin-bottom: 20px;
    font-size: 1.8em;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: #94a3b8;
    font-weight: 500;
  }

  .form-group input {
    width: 100%;
    padding: 12px;
    background: #0f172a;
    border: 2px solid #334155;
    border-radius: 8px;
    color: #e2e8f0;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  .form-group input:focus {
    outline: none;
    border-color: #38bdf8;
  }

  .btn {
    padding: 12px 30px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    color: #0f172a;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(56, 189, 248, 0.4);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-secondary {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    color: #e2e8f0;
  }

  .btn-danger {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .status {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-weight: 500;
  }

  .status.success {
    background: rgba(34, 197, 94, 0.2);
    border: 2px solid #22c55e;
    color: #86efac;
  }

  .status.error {
    background: rgba(239, 68, 68, 0.2);
    border: 2px solid #ef4444;
    color: #fca5a5;
  }

  .status.info {
    background: rgba(56, 189, 248, 0.2);
    border: 2px solid #38bdf8;
    color: #7dd3fc;
  }

  .hidden {
    display: none;
  }

  .room-info {
    background: #0f172a;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .room-info h3 {
    color: #38bdf8;
    margin-bottom: 15px;
  }

  .room-info p {
    margin: 10px 0;
    color: #cbd5e1;
  }

  .room-code {
    font-size: 2em;
    font-weight: bold;
    color: #38bdf8;
    text-align: center;
    padding: 20px;
    background: #0f172a;
    border-radius: 8px;
    letter-spacing: 8px;
    margin: 20px 0;
  }

  .members-list {
    list-style: none;
    margin-top: 15px;
  }

  .member-item {
    background: #334155;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .member-name {
    font-weight: bold;
    color: #e2e8f0;
  }

  .member-progress {
    color: #94a3b8;
    font-size: 0.9em;
  }

  .progress-modules {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .module-badge {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    border: 2px solid #334155;
    background: #1e293b;
    color: #64748b;
  }

  .module-badge.completed {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    color: white;
    border-color: #22c55e;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.5);
  }

  /* CPU Chip Layout */
  .cpu-container {
    position: relative;
    max-width: 600px;
    margin: 30px auto;
    padding: 40px;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    border-radius: 20px;
    border: 3px solid #334155;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    transition: all 0.5s ease;
  }

  .cpu-container.all-active {
    border-color: #38bdf8;
    background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
    box-shadow: 0 0 60px rgba(56, 189, 248, 0.8), 0 10px 40px rgba(0, 0, 0, 0.5);
    animation: cpuGlow 2s infinite;
  }

  @keyframes cpuGlow {
    0%, 100% { 
      box-shadow: 0 0 60px rgba(56, 189, 248, 0.8), 0 10px 40px rgba(0, 0, 0, 0.5);
    }
    50% { 
      box-shadow: 0 0 80px rgba(56, 189, 248, 1), 0 10px 40px rgba(0, 0, 0, 0.5);
    }
  }

  .cpu-label {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.9em;
    font-weight: bold;
    color: #64748b;
    letter-spacing: 2px;
    transition: color 0.5s;
  }

  .cpu-container.all-active .cpu-label {
    color: #38bdf8;
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
  }

  .cpu-visualization {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    position: relative;
  }

  /* Pin connectors on sides */
  .cpu-pins {
    position: absolute;
    display: flex;
    gap: 8px;
  }

  .cpu-pins.left {
    left: -30px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }

  .cpu-pins.right {
    right: -30px;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
  }

  .cpu-pins.top {
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
  }

  .cpu-pins.bottom {
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
  }

  .pin {
    width: 4px;
    height: 15px;
    background: #334155;
    border-radius: 2px;
    transition: background 0.5s;
  }

  .cpu-pins.left .pin,
  .cpu-pins.right .pin {
    width: 15px;
    height: 4px;
  }

  .cpu-container.all-active .pin {
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    box-shadow: 0 0 5px rgba(56, 189, 248, 0.8);
  }

  .node {
    background: #1e293b;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 2px solid #334155;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }

  .node::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent 0%, rgba(56, 189, 248, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .node.active::before {
    opacity: 1;
  }

  .node.active {
    border-color: #38bdf8;
    background: linear-gradient(135deg, #1e293b 0%, #0c4a6e 100%);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.5);
  }

  .node-icon {
    font-size: 2.5em;
    margin-bottom: 10px;
    position: relative;
    z-index: 1;
  }

  .node.active .node-icon {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.05); }
  }

  .node-label {
    color: #94a3b8;
    font-weight: bold;
    font-size: 0.9em;
    position: relative;
    z-index: 1;
  }

  .node.active .node-label {
    color: #38bdf8;
  }

  /* Circuit traces connecting nodes */
  .circuit-trace {
    position: absolute;
    background: #334155;
    transition: background 0.5s, box-shadow 0.5s;
    z-index: 0;
  }

  .cpu-container.all-active .circuit-trace {
    background: linear-gradient(90deg, #38bdf8 0%, #3b82f6 100%);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
  }

  .trace-horizontal {
    height: 2px;
    width: 100%;
    top: 50%;
    left: 0;
  }

  .trace-vertical {
    width: 2px;
    height: 100%;
    left: 50%;
    top: 0;
  }

  .module-controls {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 20px;
  }

  .module-btn {
    padding: 15px;
    background: #334155;
    border: 2px solid #475569;
    border-radius: 8px;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.3s;
  }

  .module-btn:hover {
    background: #475569;
    border-color: #38bdf8;
  }

  .module-btn.completed {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border-color: #22c55e;
  }

  .config-section {
    background: rgba(245, 158, 11, 0.1);
    border-left-color: #f59e0b;
  }

  .config-section h2 {
    color: #f59e0b;
  }

  .inline-inputs {
    display: flex;
    gap: 15px;
    align-items: flex-end;
  }

  .inline-inputs .form-group {
    flex: 1;
  }

  /* Celebration Animations */
  .celebration-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .celebration-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    border: 3px solid;
    border-radius: 20px;
    padding: 40px;
    max-width: 500px;
    text-align: center;
    animation: slideUp 0.5s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  @keyframes slideUp {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .celebration-card.personal {
    border-color: #38bdf8;
  }

  .celebration-card.room-module {
    border-color: #22c55e;
  }

  .celebration-card.room-complete {
    border-color: #f59e0b;
    background: linear-gradient(135deg, #1e293b 0%, #451a03 100%);
  }

  .celebration-icon {
    font-size: 5em;
    margin-bottom: 20px;
    animation: bounce 0.6s ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .celebration-title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 15px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .celebration-card.room-module .celebration-title {
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .celebration-card.room-complete .celebration-title {
    background: linear-gradient(135deg, #f59e0b 0%, #ea580c 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .celebration-message {
    color: #cbd5e1;
    font-size: 1.1em;
    margin-bottom: 25px;
    line-height: 1.6;
  }

  .celebration-btn {
    padding: 15px 40px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    color: #0f172a;
    border: none;
    border-radius: 10px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .celebration-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.5);
  }

  /* Confetti Animation */
  .confetti {
    position: fixed;
    width: 10px;
    height: 10px;
    background: #38bdf8;
    position: absolute;
    animation: confetti-fall 3s linear forwards;
  }

  @keyframes confetti-fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }

  /* Toast Notification */
  .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
    color: #0f172a;
    padding: 20px 30px;
    border-radius: 12px;
    font-weight: bold;
    z-index: 999;
    animation: slideInRight 0.5s ease-out, slideOutRight 0.5s ease-out 2.5s forwards;
    box-shadow: 0 10px 30px rgba(56, 189, 248, 0.4);
  }

  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  /* Module Button Completion Animation */
  .module-btn.completing {
    animation: moduleComplete 0.6s ease-out;
  }

  @keyframes moduleComplete {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(34, 197, 94, 0.8); }
    100% { transform: scale(1); }
  }

  /* Node Activation Animation */
  .node.activating {
    animation: nodeActivate 0.8s ease-out;
  }

  @keyframes nodeActivate {
    0% { 
      transform: scale(1);
      box-shadow: 0 0 0 rgba(56, 189, 248, 0);
    }
    50% { 
      transform: scale(1.15);
      box-shadow: 0 0 50px rgba(56, 189, 248, 0.8);
    }
    100% { 
      transform: scale(1);
      box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
    }
  }
</style>

<div class="container">
  <div class="header">
    <h2>🖥️ Room System Test</h2>
    <p>Parallel Computing Education Platform</p>
  </div>

  <!-- Configuration Section -->
  <div class="section config-section">
    <h2>⚙️ Configuration</h2>
    <div class="form-group">
      <label for="apiUrl">Backend API URL:</label>
      <input type="text" id="apiUrl" value="http://localhost:5000" placeholder="http://localhost:5000">
    </div>
  </div>

  <!-- Authentication Section -->
  <div class="section">
    <h2>🔐 Step 1: Authentication</h2>
    <div id="authStatus" class="status info">
      Not logged in
    </div>

    <div id="loginForm">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" placeholder="Enter username">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" placeholder="Enter password">
      </div>
      <div style="display: flex; gap: 15px;">
        <button class="btn" onclick="login()">Login</button>
        <button class="btn btn-secondary" onclick="register()">Register</button>
      </div>
    </div>

    <div id="loggedInInfo" class="hidden">
      <p>Logged in as: <strong id="currentUsername"></strong></p>
      <p>Role: <strong id="currentRole"></strong></p>
      <div style="display: flex; gap: 15px;">
        <button class="btn btn-secondary" onclick="testToken()">🔍 Test Token</button>
        <button class="btn btn-secondary" onclick="logout()">Logout</button>
      </div>
    </div>
  </div>

  <!-- Room Management Section -->
  <div class="section" id="roomSection" style="display: none;">
    <h2>🏠 Step 2: Room Management</h2>

    <!-- Admin: Create Room -->
    <div id="createRoomSection" class="hidden">
      <h3>Create New Room (Admin Only)</h3>
      <div class="inline-inputs">
        <div class="form-group">
          <label for="roomName">Room Name:</label>
          <input type="text" id="roomName" placeholder="e.g., Computer Science 101">
        </div>
        <button class="btn" onclick="createRoom()">Create Room</button>
      </div>
    </div>

    <!-- Join Room -->
    <div id="joinRoomSection">
      <h3>Join Room</h3>
      
      <!-- Quick Join Demo Room -->
      <div style="background: rgba(34, 197, 94, 0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 2px solid #22c55e;">
        <h4 style="color: #22c55e; margin: 0 0 10px 0;">🎯 Try the Demo Room!</h4>
        <p style="color: #94a3b8; margin-bottom: 15px;">
          Join our permanent demo room - always available and auto-resets when complete!
        </p>
        <div style="display: flex; align-items: center; gap: 15px;">
          <div style="background: #0f172a; padding: 15px 25px; border-radius: 8px; font-size: 1.5em; font-weight: bold; color: #22c55e; letter-spacing: 3px;">
            DEMO01
          </div>
          <button class="btn" onclick="joinDemoRoom()" style="background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);">
            Quick Join Demo Room
          </button>
        </div>
      </div>
      
      <!-- Regular Room Join -->
      <h4 style="color: #94a3b8; margin-bottom: 15px;">Or join another room:</h4>
      <div class="inline-inputs">
        <div class="form-group">
          <label for="roomCode">Room Code:</label>
          <input type="text" id="roomCode" placeholder="Enter 6-character code" maxlength="6" style="text-transform: uppercase;">
        </div>
        <button class="btn" onclick="joinRoom()">Join Room</button>
      </div>
    </div>

    <!-- Current Room Info -->
    <div id="currentRoomInfo" class="hidden">
      <div class="room-info">
        <h3>Current Room</h3>
        <div class="room-code" id="displayRoomCode">------</div>
        <p><strong>Room Name:</strong> <span id="displayRoomName"></span></p>
        <p><strong>Members:</strong> <span id="displayMemberCount"></span></p>
        <button class="btn btn-danger" onclick="leaveRoom()">Leave Room</button>
      </div>
    </div>
  </div>

  <!-- CPU Visualization -->
  <div class="section" id="cpuSection" style="display: none;">
    <h2>🖥️ Step 3: CPU Core Status</h2>
    <p style="color: #94a3b8; margin-bottom: 20px; text-align: center;">
      Each core lights up when ALL members complete the corresponding module
    </p>
    
    <div class="cpu-container" id="cpuContainer">
      <div class="cpu-label">PARALLEL PROCESSOR</div>
      
      <!-- CPU Pins -->
      <div class="cpu-pins left">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      <div class="cpu-pins right">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      <div class="cpu-pins top">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      <div class="cpu-pins bottom">
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
        <div class="pin"></div>
      </div>
      
      <div class="cpu-visualization">
        <div class="node" id="node1">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 1</div>
        </div>
        <div class="node" id="node2">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 2</div>
        </div>
        <div class="node" id="node3">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 3</div>
        </div>
        <div class="node" id="node4">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 4</div>
        </div>
        <div class="node" id="node5">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 5</div>
        </div>
        <div class="node" id="node6">
          <div class="node-icon">⚡</div>
          <div class="node-label">CORE 6</div>
        </div>
      </div>
    </div>

    <!-- Reset Button (only shows when CPU is fully lit) -->
    <div id="resetSection" class="hidden" style="text-align: center; margin-top: 30px;">
      <button class="btn btn-danger" onclick="resetProgress()">
        🔄 Reset All Progress
      </button>
      <p style="color: #94a3b8; margin-top: 10px; font-size: 0.9em;">
        This will clear all completed modules for everyone in the room
      </p>
    </div>
  </div>

  <!-- Module Completion Section -->
  <div class="section" id="moduleSection" style="display: none;">
    <h2>📚 Step 4: Complete Modules</h2>
    <p style="color: #94a3b8; margin-bottom: 20px;">
      Complete modules to see nodes light up when ALL room members finish!
    </p>
    <div class="module-controls">
      <button class="module-btn" onclick="completeModule(1)">
        <div style="font-size: 1.5em;">📖</div>
        Module 1
      </button>
      <button class="module-btn" onclick="completeModule(2)">
        <div style="font-size: 1.5em;">💻</div>
        Module 2
      </button>
      <button class="module-btn" onclick="completeModule(3)">
        <div style="font-size: 1.5em;">⚙️</div>
        Module 3
      </button>
      <button class="module-btn" onclick="completeModule(4)">
        <div style="font-size: 1.5em;">📊</div>
        Module 4
      </button>
      <button class="module-btn" onclick="completeModule(5)">
        <div style="font-size: 1.5em;">🚀</div>
        Module 5
      </button>
      <button class="module-btn" onclick="completeModule(6)">
        <div style="font-size: 1.5em;">🎯</div>
        Module 6
      </button>
    </div>
  </div>

  <!-- Members Progress Section -->
  <div class="section" id="membersSection" style="display: none;">
    <h2>👥 Room Members Progress</h2>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <button id="refreshProgressBtn" class="btn btn-danger" onclick="resetProgressMidGame()">🔄 Reset Room Progress</button>
      <div id="lastRefresh" style="color: #94a3b8; font-size: 0.9em;">
        Click to reset all progress
      </div>
    </div>
    <ul class="members-list" id="membersList"></ul>
  </div>
</div>

<script>
  let authToken = null;
  let currentUser = null;
  let currentRoomId = null;
  let currentRoomData = null;
  let cpuFullyLit = false; // Track if all cores are active

  function getApiUrl() {
    return document.getElementById('apiUrl').value.trim();
  }

  function showStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `status ${type}`;
  }

  // Animation Helper Functions
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  function showCelebration(type, moduleNumber, message) {
    const overlay = document.createElement('div');
    overlay.className = 'celebration-overlay';
    
    let icon, title, cardClass;
    
    if (type === 'personal') {
      icon = '✅';
      title = `Module ${moduleNumber} Complete!`;
      cardClass = 'personal';
    } else if (type === 'room-module') {
      icon = '✨';
      title = `Room Module ${moduleNumber} Complete!`;
      cardClass = 'room-module';
    } else if (type === 'room-complete') {
      icon = '🎉';
      title = 'ALL MODULES COMPLETE!';
      cardClass = 'room-complete';
    }
    
    overlay.innerHTML = `
      <div class="celebration-card ${cardClass}">
        <div class="celebration-icon">${icon}</div>
        <div class="celebration-title">${title}</div>
        <div class="celebration-message">${message}</div>
        <button class="celebration-btn" onclick="closeCelebration()">Continue</button>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add confetti for room completions
    if (type === 'room-module' || type === 'room-complete') {
      createConfetti();
    }
  }

  function closeCelebration() {
    const overlay = document.querySelector('.celebration-overlay');
    if (overlay) {
      overlay.remove();
    }
  }

  function createConfetti() {
    const colors = ['#38bdf8', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#ec4899'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
    }
  }

  function animateModuleButton(moduleNumber) {
    const buttons = document.querySelectorAll('.module-btn');
    const button = buttons[moduleNumber - 1];
    button.classList.add('completing');
    
    setTimeout(() => {
      button.classList.remove('completing');
      button.classList.add('completed');
    }, 600);
  }

  function animateNode(nodeNumber) {
    const node = document.getElementById(`node${nodeNumber}`);
    node.classList.add('activating');
    
    setTimeout(() => {
      node.classList.remove('activating');
      node.classList.add('active');
    }, 800);
  }

  async function apiCall(endpoint, method = 'GET', body = null) {
    const url = `${getApiUrl()}${endpoint}`;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    if (authToken) {
      options.headers['Authorization'] = `Bearer ${authToken}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      console.error('API Error:', endpoint, data);
      throw new Error(data.error || 'Request failed');
    }

    // Log progress refresh specifically
    if (endpoint.includes('/progress')) {
      console.log('Progress data received:', data);
    }

    return data;
  }

  async function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showStatus('authStatus', 'Please enter username and password', 'error');
      return;
    }

    try {
      const data = await apiCall('/api/auth/register', 'POST', {
        username,
        email: `${username}@example.com`,
        password
      });

      authToken = data.access_token;
      currentUser = data.user;
      showStatus('authStatus', `Registered and logged in as ${username}!`, 'success');
      updateUIAfterLogin();
    } catch (error) {
      showStatus('authStatus', `Registration failed: ${error.message}`, 'error');
    }
  }

  async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
      showStatus('authStatus', 'Please enter username and password', 'error');
      return;
    }

    try {
      const data = await apiCall('/api/auth/login', 'POST', { username, password });

      authToken = data.access_token;
      currentUser = data.user;
      console.log('Login successful! Token:', authToken ? 'Token received' : 'NO TOKEN');
      console.log('User:', currentUser);
      showStatus('authStatus', `Logged in as ${username}!`, 'success');
      updateUIAfterLogin();
      
      // If user is in a room, load it
      if (currentUser.current_room_id) {
        await loadCurrentRoom();
      }
    } catch (error) {
      console.error('Login error:', error);
      showStatus('authStatus', `Login failed: ${error.message}`, 'error');
    }
  }

  function logout() {
    // Leave room before logging out
    if (currentRoomId) {
      leaveRoomSilently();
    }
    
    authToken = null;
    currentUser = null;
    currentRoomId = null;
    currentRoomData = null;
    cpuFullyLit = false;

    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loggedInInfo').classList.add('hidden');
    document.getElementById('roomSection').style.display = 'none';
    document.getElementById('cpuSection').style.display = 'none';
    document.getElementById('moduleSection').style.display = 'none';
    document.getElementById('membersSection').style.display = 'none';

    showStatus('authStatus', 'Logged out', 'info');
  }

  async function leaveRoomSilently() {
    // Leave room without confirmation or alerts
    if (!currentRoomId) return;
    
    try {
      await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
      console.log('Left room automatically');
    } catch (error) {
      console.error('Failed to auto-leave room:', error);
    }
  }

  // Auto-leave room when closing tab/window
  window.addEventListener('beforeunload', (event) => {
    if (currentRoomId && authToken) {
      // Use navigator.sendBeacon for reliable async request on page unload
      const url = `${getApiUrl()}/api/rooms/${currentRoomId}/leave`;
      const data = new Blob([JSON.stringify({})], { type: 'application/json' });
      
      // sendBeacon doesn't support custom headers easily, so we use fetch with keepalive
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({}),
        keepalive: true  // Ensures request completes even if page closes
      }).catch(err => console.log('Cleanup request sent'));
    }
  });

  async function testToken() {
    console.log('Testing token...');
    console.log('Current authToken:', authToken);
    
    try {
      const data = await apiCall('/api/test-auth', 'GET');
      showToast('✅ Token is valid!');
      console.log('Token test success:', data);
    } catch (error) {
      showToast('❌ Token is invalid!');
      console.error('Token test failed:', error);
    }
  }

  function updateUIAfterLogin() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('loggedInInfo').classList.remove('hidden');
    document.getElementById('currentUsername').textContent = currentUser.username;
    document.getElementById('currentRole').textContent = currentUser.role;

    document.getElementById('roomSection').style.display = 'block';

    if (currentUser.role === 'admin') {
      document.getElementById('createRoomSection').classList.remove('hidden');
    }
  }

  async function createRoom() {
    const roomName = document.getElementById('roomName').value.trim();

    if (!roomName) {
      showToast('⚠️ Please enter a room name');
      return;
    }

    try {
      const data = await apiCall('/api/rooms', 'POST', { name: roomName });
      showToast(`✅ Room created! Code: ${data.room.room_code}`);
      document.getElementById('roomName').value = '';
    } catch (error) {
      showToast(`❌ Failed to create room: ${error.message}`);
    }
  }

  async function joinRoom() {
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();

    if (!roomCode || roomCode.length !== 6) {
      showToast('⚠️ Please enter a valid 6-character room code');
      return;
    }

    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: roomCode });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      
      showToast(`✅ Joined room: ${data.room.name}`);
      await loadCurrentRoom();
    } catch (error) {
      showToast(`❌ Failed to join room: ${error.message}`);
    }
  }

  async function joinDemoRoom() {
    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: 'DEMO01' });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      
      showToast('✅ Joined Demo Room!');
      await loadCurrentRoom();
    } catch (error) {
      showToast(`❌ Failed to join demo room: ${error.message}`);
    }
  }

  async function loadCurrentRoom() {
    if (!currentRoomId) return;

    try {
      const data = await apiCall(`/api/rooms/${currentRoomId}`);
      currentRoomData = data.room;

      document.getElementById('joinRoomSection').classList.add('hidden');
      document.getElementById('currentRoomInfo').classList.remove('hidden');
      document.getElementById('displayRoomCode').textContent = currentRoomData.room_code;
      document.getElementById('displayRoomName').textContent = currentRoomData.name;
      document.getElementById('displayMemberCount').textContent = currentRoomData.stats.total_members;

      document.getElementById('cpuSection').style.display = 'block';
      document.getElementById('moduleSection').style.display = 'block';
      document.getElementById('membersSection').style.display = 'block';

      await loadRoomProgress();
    } catch (error) {
      showToast(`❌ Failed to load room: ${error.message}`);
    }
  }

  async function leaveRoom() {
    if (!currentRoomId) return;

    if (!confirm('Are you sure you want to leave this room?')) return;

    try {
      await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
      
      currentRoomId = null;
      currentRoomData = null;
      cpuFullyLit = false;

      document.getElementById('joinRoomSection').classList.remove('hidden');
      document.getElementById('currentRoomInfo').classList.add('hidden');
      document.getElementById('cpuSection').style.display = 'none';
      document.getElementById('moduleSection').style.display = 'none';
      document.getElementById('membersSection').style.display = 'none';
      document.getElementById('resetSection').classList.add('hidden');

      // Reset CPU visualization
      const cpuContainer = document.getElementById('cpuContainer');
      cpuContainer.classList.remove('all-active');
      for (let i = 1; i <= 6; i++) {
        document.getElementById(`node${i}`).classList.remove('active');
      }

      showToast('✅ Left room successfully');
    } catch (error) {
      showToast(`❌ Failed to leave room: ${error.message}`);
    }
  }

  async function resetProgress() {
    if (!confirm('⚠️ This will reset ALL progress for EVERYONE in the room. Are you sure?')) {
      return;
    }

    try {
      // Call backend reset endpoint
      await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');
      
      console.log('🔄 Backend reset successful, clearing UI...');
      
      // Reset local state
      cpuFullyLit = false;
      
      // Reset CPU visualization
      const cpuContainer = document.getElementById('cpuContainer');
      cpuContainer.classList.remove('all-active');
      
      for (let i = 1; i <= 6; i++) {
        document.getElementById(`node${i}`).classList.remove('active');
      }
      
      // Hide reset button
      document.getElementById('resetSection').classList.add('hidden');
      
      // FORCE CLEAR all module buttons BEFORE reload
      const buttons = document.querySelectorAll('.module-btn');
      buttons.forEach(btn => btn.classList.remove('completed'));
      
      // FORCE CLEAR members list
      const membersList = document.getElementById('membersList');
      membersList.innerHTML = '';
      
      console.log('✅ UI cleared, reloading fresh data...');
      
      showToast('🔄 Progress reset for all members!');
      
      // Wait a moment for backend to process, then reload
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reload progress with cache-busting timestamp
      await loadRoomProgress();
      
      console.log('✅ Reset complete!');
    } catch (error) {
      showToast(`❌ Failed to reset progress: ${error.message}`);
      console.error('Reset error:', error);
    }
  }

  async function resetProgressMidGame() {
    if (!confirm('⚠️ RESET ALL PROGRESS?\n\nThis will delete ALL completed modules for EVERYONE in the room.\n\nAre you absolutely sure?')) {
      return;
    }

    const refreshBtn = document.getElementById('refreshProgressBtn');
    const originalText = refreshBtn ? refreshBtn.innerHTML : '';
    
    if (refreshBtn) {
      refreshBtn.innerHTML = '⏳ Resetting...';
      refreshBtn.disabled = true;
    }

    try {
      // Call backend reset endpoint
      await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');
      
      // Reset local state
      cpuFullyLit = false;
      
      // Reset CPU visualization
      const cpuContainer = document.getElementById('cpuContainer');
      cpuContainer.classList.remove('all-active');
      
      for (let i = 1; i <= 6; i++) {
        document.getElementById(`node${i}`).classList.remove('active');
      }
      
      // Hide the post-completion reset button if it's showing
      const resetSection = document.getElementById('resetSection');
      if (resetSection) {
        resetSection.classList.add('hidden');
      }
      
      // Reset all module buttons
      const buttons = document.querySelectorAll('.module-btn');
      buttons.forEach(btn => btn.classList.remove('completed'));
      
      showToast('🔄 All progress reset!');
      
      // Wait for backend to process
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Reload progress to sync with backend
      await loadRoomProgress();
    } catch (error) {
      showToast(`❌ Failed to reset: ${error.message}`);
    } finally {
      if (refreshBtn) {
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
      }
    }
  }

  async function completeModule(moduleNumber) {
    try {
      const data = await apiCall('/api/progress/complete', 'POST', { module_number: moduleNumber });
      
      // Animate the button
      animateModuleButton(moduleNumber);

      // Show appropriate celebration
      if (data.room_progress) {
        if (data.room_progress.room_complete) {
          if (data.room_progress.is_demo) {
            // Demo room - just celebrate, DON'T auto-reset
            showCelebration('room-complete', moduleNumber, 
              '🎊 CONGRATULATIONS!\n\nAll modules completed by everyone!\n\n✨ The CPU is fully lit!\n\nUse the Reset button below to start over.');
            
            // DON'T clear anything - let the CPU stay lit!
            // The reset button will appear via loadRoomProgress()
            await loadRoomProgress();
          } else {
            // Regular room - gets deleted
            showCelebration('room-complete', moduleNumber,
              '🎊 CONGRATULATIONS!\n\nAll modules completed by everyone!\n\nThe room has been closed.');
            
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        } else if (data.room_progress.module_complete) {
          showCelebration('room-module', moduleNumber,
            `🌟 Everyone in the room has completed Module ${moduleNumber}!\n\nNode ${moduleNumber} is now lit up!`);
          
          // Animate the corresponding node
          setTimeout(() => {
            animateNode(moduleNumber);
          }, 500);
          
          await loadRoomProgress();
        } else {
          showCelebration('personal', moduleNumber,
            `Great job! You completed Module ${moduleNumber}.\n\nWaiting for other members to finish...`);
          await loadRoomProgress();
        }
      } else {
        showCelebration('personal', moduleNumber,
          `Module ${moduleNumber} completed!`);
        await loadRoomProgress();
      }
    } catch (error) {
      showToast(`❌ Failed to complete module: ${error.message}`);
    }
  }

  async function loadRoomProgress() {
    if (!currentRoomId) return;

    console.log('🔍 Loading room progress...');
    
    // Show loading indicator - use ID for more reliable selection
    const refreshBtn = document.getElementById('refreshProgressBtn');
    const originalText = refreshBtn ? refreshBtn.innerHTML : '';
    if (refreshBtn) {
      refreshBtn.innerHTML = '⏳ Refreshing...';
      refreshBtn.disabled = true;
    }

    try {
      // Add timestamp to prevent caching
      const data = await apiCall(`/api/rooms/${currentRoomId}/progress?t=${Date.now()}`);
      
      console.log('📊 Room Progress Data:', {
        total_members: data.total_members,
        completed_modules: data.completed_modules,
        member_progress: data.member_progress
      });

      // Update member count in room info
      document.getElementById('displayMemberCount').textContent = data.total_members;

      // Only update CPU if not fully lit or if explicitly resetting
      if (!cpuFullyLit) {
        // Update CPU nodes - RESET FIRST
        console.log('💡 Resetting all CPU cores...');
        for (let i = 1; i <= 6; i++) {
          const node = document.getElementById(`node${i}`);
          node.classList.remove('active');
        }
        
        // Then add active ones
        console.log('⚡ Lighting up cores:', data.completed_modules);
        data.completed_modules.forEach(moduleNum => {
          const node = document.getElementById(`node${moduleNum}`);
          node.classList.add('active');
          console.log(`  ✅ Core ${moduleNum} lit`);
        });

        // Check if all 6 modules are complete
        if (data.completed_modules.length === 6) {
          cpuFullyLit = true;
          const cpuContainer = document.getElementById('cpuContainer');
          cpuContainer.classList.add('all-active');
          document.getElementById('resetSection').classList.remove('hidden');
          console.log('🎉 CPU FULLY LIT!');
        }
      } else {
        console.log('🔒 CPU is fully lit - maintaining state until reset');
      }

      // ALWAYS update members list and buttons (even when CPU is lit)
      // This allows refresh button to show new members joining
      
      // Update members list
      const membersList = document.getElementById('membersList');
      membersList.innerHTML = '';

      data.member_progress.forEach(member => {
        const li = document.createElement('li');
        li.className = 'member-item';
        
        const info = document.createElement('div');
        info.innerHTML = `
          <div class="member-name">${member.username}</div>
          <div class="member-progress">${member.completed_modules.length}/6 modules</div>
        `;

        const modules = document.createElement('div');
        modules.className = 'progress-modules';
        for (let i = 1; i <= 6; i++) {
          const badge = document.createElement('div');
          badge.className = 'module-badge';
          badge.textContent = i;
          if (member.completed_modules.includes(i)) {
            badge.classList.add('completed');
          }
          modules.appendChild(badge);
        }

        li.appendChild(info);
        li.appendChild(modules);
        membersList.appendChild(li);
      });

      // Update my completed modules - RESET FIRST
      const myProgress = await apiCall('/api/progress/my-progress');
      console.log('👤 My Progress:', myProgress.completed_modules);
      
      const buttons = document.querySelectorAll('.module-btn');
      
      // Reset ALL buttons first
      console.log('🔄 Resetting all module buttons...');
      buttons.forEach(btn => btn.classList.remove('completed'));
      
      // Mark only the completed ones
      console.log('✅ Marking completed modules:', myProgress.completed_modules);
      myProgress.completed_modules.forEach(moduleNum => {
        buttons[moduleNum - 1].classList.add('completed');
        console.log(`  ✅ Button ${moduleNum} marked complete`);
      });

      // Update last refresh time
      const now = new Date().toLocaleTimeString();
      const lastRefreshEl = document.getElementById('lastRefresh');
      if (lastRefreshEl) {
        lastRefreshEl.textContent = `Last updated: ${now}`;
      }
      console.log(`✅ Refresh complete at ${now}`);
      console.log('='.repeat(60));
      
      // Show success toast
      showToast('✅ Progress refreshed!');

    } catch (error) {
      console.error('Failed to load room progress:', error);
      showToast(`❌ Failed to refresh: ${error.message}`);
    } finally {
      // ALWAYS restore button, even if there was an error
      console.log('🔄 Restoring refresh button...');
      if (refreshBtn) {
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        console.log('✅ Button restored');
      } else {
        console.error('❌ Could not find refresh button to restore!');
      }
    }
  }

  // Auto-refresh progress every 5 seconds if in a room (DISABLED - use manual refresh button)
  // Uncomment the lines below if you want automatic updates:
  /*
  setInterval(() => {
    if (currentRoomId && authToken) {
      loadRoomProgress();
    }
  }, 5000);
  */

</script>