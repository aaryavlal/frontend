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

  .cpu-visualization {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 30px 0;
  }

  .node {
    background: #1e293b;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    border: 2px solid #334155;
    transition: all 0.3s;
  }

  .node.active {
    border-color: #38bdf8;
    background: linear-gradient(135deg, #1e293b 0%, #0c4a6e 100%);
    box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
  }

  .node-icon {
    font-size: 3em;
    margin-bottom: 15px;
  }

  .node.active .node-icon {
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .node-label {
    color: #94a3b8;
    font-weight: bold;
    font-size: 1.2em;
  }

  .node.active .node-label {
    color: #38bdf8;
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
</style>

<div class="container">
  <div class="header">
    <h1>🖥️ Room System Test</h1>
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
    <h2>🖥️ Step 3: Room Progress (CPU Nodes)</h2>
    <div class="cpu-visualization">
      <div class="node" id="node1">
        <div class="node-icon">⚡</div>
        <div class="node-label">NODE 1</div>
      </div>
      <div class="node" id="node2">
        <div class="node-icon">⚡</div>
        <div class="node-label">NODE 2</div>
      </div>
      <div class="node" id="node3">
        <div class="node-icon">⚡</div>
        <div class="node-label">NODE 3</div>
      </div>
      <div class="node" id="node4">
        <div class="node-icon">⚡</div>
        <div class="node-label">NODE 4</div>
      </div>
      <div class="node" id="node5">
        <div class="node-icon">⚡</div>
        <div class="node-label">NODE 5</div>
      </div>
      <div class="node" id="node6">
        <div class="node-icon">⚡</div>
        <div class="node-label">NODE 6</div>
      </div>
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
      <button class="btn btn-secondary" onclick="loadRoomProgress()">🔄 Refresh Progress</button>
      <div id="lastRefresh" style="color: #94a3b8; font-size: 0.9em;">
        Auto-refresh every 5 seconds
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

  function getApiUrl() {
    return document.getElementById('apiUrl').value.trim();
  }

  function showStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `status ${type}`;
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
      alert('✅ Token is VALID!\n\n' + JSON.stringify(data, null, 2));
      console.log('Token test success:', data);
    } catch (error) {
      alert('❌ Token is INVALID!\n\nError: ' + error.message);
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
      alert('Please enter a room name');
      return;
    }

    try {
      const data = await apiCall('/api/rooms', 'POST', { name: roomName });
      alert(`Room created! Code: ${data.room.room_code}`);
      document.getElementById('roomName').value = '';
    } catch (error) {
      alert(`Failed to create room: ${error.message}`);
    }
  }

  async function joinRoom() {
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();

    if (!roomCode || roomCode.length !== 6) {
      alert('Please enter a valid 6-character room code');
      return;
    }

    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: roomCode });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      
      alert(`Joined room: ${data.room.name}`);
      await loadCurrentRoom();
    } catch (error) {
      alert(`Failed to join room: ${error.message}`);
    }
  }

  async function joinDemoRoom() {
    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: 'DEMO01' });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      
      alert(`Joined Demo Room! This room never deletes - it just resets when complete.`);
      await loadCurrentRoom();
    } catch (error) {
      alert(`Failed to join demo room: ${error.message}`);
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
      alert(`Failed to load room: ${error.message}`);
    }
  }

  async function leaveRoom() {
    if (!currentRoomId) return;

    if (!confirm('Are you sure you want to leave this room?')) return;

    try {
      await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
      
      currentRoomId = null;
      currentRoomData = null;

      document.getElementById('joinRoomSection').classList.remove('hidden');
      document.getElementById('currentRoomInfo').classList.add('hidden');
      document.getElementById('cpuSection').style.display = 'none';
      document.getElementById('moduleSection').style.display = 'none';
      document.getElementById('membersSection').style.display = 'none';

      // Reset nodes
      for (let i = 1; i <= 6; i++) {
        document.getElementById(`node${i}`).classList.remove('active');
      }

      alert('Left room successfully');
    } catch (error) {
      alert(`Failed to leave room: ${error.message}`);
    }
  }

  async function completeModule(moduleNumber) {
    try {
      const data = await apiCall('/api/progress/complete', 'POST', { module_number: moduleNumber });
      
      // Update button
      const buttons = document.querySelectorAll('.module-btn');
      buttons[moduleNumber - 1].classList.add('completed');

      // Show message
      if (data.room_progress) {
        if (data.room_progress.room_complete) {
          if (data.room_progress.is_demo) {
            // Demo room - resets instead of deleting
            alert('🎉 CONGRATULATIONS! All modules complete!\n\n✨ Demo room has been reset - all progress cleared!\n\nYou can start over immediately.');
            
            // Clear all UI elements immediately
            const allButtons = document.querySelectorAll('.module-btn');
            allButtons.forEach(btn => btn.classList.remove('completed'));
            
            for (let i = 1; i <= 6; i++) {
              document.getElementById(`node${i}`).classList.remove('active');
            }
            
            // Wait a moment for backend to finish reset, then reload
            setTimeout(async () => {
              await loadRoomProgress();
            }, 500);
          } else {
            // Regular room - gets deleted
            alert('🎉 CONGRATULATIONS! All modules complete! The room has been closed.');
            window.location.reload();
          }
        } else if (data.room_progress.module_complete) {
          alert(`✨ Module ${moduleNumber} completed by entire room! Node ${moduleNumber} lit up!`);
          await loadRoomProgress();
        } else {
          alert(`✅ Module ${moduleNumber} completed! Waiting for other members...`);
          await loadRoomProgress();
        }
      } else {
        alert(`✅ Module ${moduleNumber} completed!`);
        await loadRoomProgress();
      }
    } catch (error) {
      alert(`Failed to complete module: ${error.message}`);
    }
  }

  async function loadRoomProgress() {
    if (!currentRoomId) return;

    try {
      // Add timestamp to prevent caching
      const data = await apiCall(`/api/rooms/${currentRoomId}/progress?t=${Date.now()}`);

      // Update member count in room info
      document.getElementById('displayMemberCount').textContent = data.total_members;

      // Update CPU nodes - RESET FIRST
      for (let i = 1; i <= 6; i++) {
        const node = document.getElementById(`node${i}`);
        node.classList.remove('active');  // Remove all first
      }
      // Then add active ones
      data.completed_modules.forEach(moduleNum => {
        const node = document.getElementById(`node${moduleNum}`);
        node.classList.add('active');
      });

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
      const buttons = document.querySelectorAll('.module-btn');
      
      // Reset ALL buttons first
      buttons.forEach(btn => btn.classList.remove('completed'));
      
      // Mark only the completed ones
      myProgress.completed_modules.forEach(moduleNum => {
        buttons[moduleNum - 1].classList.add('completed');
      });

      // Update last refresh time
      const now = new Date().toLocaleTimeString();
      const lastRefreshEl = document.getElementById('lastRefresh');
      if (lastRefreshEl) {
        lastRefreshEl.textContent = `Last updated: ${now}`;
      }
      console.log(`✅ Refreshed at ${now} - Members: ${data.total_members}, Completed: [${data.completed_modules}]`);

    } catch (error) {
      console.error('Failed to load room progress:', error);
    }
  }

  // Auto-refresh progress every 5 seconds if in a room
  setInterval(() => {
    if (currentRoomId && authToken) {
      loadRoomProgress();
    }
  }, 5000);
</script>