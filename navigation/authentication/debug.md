---
layout: post
title: API Debug Console
permalink: /admin/debug
search_exclude: true
---

<style>
:root {
  --accent: #00ffaa;
  --accent-2: #00d4ff;
  --bg: #0a0e14;
  --font: 'Courier New', 'Consolas', monospace;
  --radius: 2px;
  --glow: 0 0 10px rgba(0,255,170,0.6), 0 0 20px rgba(0,255,170,0.4);
}

body {
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
              radial-gradient(circle at 20% 20%, rgba(0,255,170,0.08), transparent 50%),
              var(--bg);
  font-family: var(--font);
  color: #e0e6ed;
}

.debug-container {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
}

.debug-header {
  background: linear-gradient(135deg, rgba(26,32,40,0.95), rgba(18,23,30,0.95));
  border: 3px solid rgba(0,255,170,0.28);
  border-left: 6px solid var(--accent);
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 30px rgba(0,255,170,0.2);
}

.debug-header h1 {
  margin: 0 0 10px 0;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 0 15px rgba(0,255,170,0.8);
  font-size: 1.8rem;
}

.debug-header p {
  margin: 0;
  color: #8b95a5;
  font-size: 0.9rem;
}

.controls-panel {
  background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
  border: 2px solid rgba(0,255,170,0.28);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 0 0 20px rgba(0,255,170,0.15);
}

.controls-panel button {
  padding: 10px 20px;
  background: rgba(0,255,170,0.15);
  color: var(--accent);
  border: 2px solid var(--accent);
  border-radius: var(--radius);
  cursor: pointer;
  font-family: var(--font);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  box-shadow: 0 0 10px rgba(0,255,170,0.3);
}

.controls-panel button:hover {
  background: rgba(0,255,170,0.25);
  box-shadow: var(--glow);
  text-shadow: 0 0 8px var(--accent);
}

.controls-panel .danger-btn {
  border-color: #ff4444;
  color: #ff4444;
  background: rgba(255,68,68,0.15);
  box-shadow: 0 0 10px rgba(255,68,68,0.3);
}

.controls-panel .danger-btn:hover {
  background: rgba(255,68,68,0.25);
  box-shadow: 0 0 10px rgba(255,68,68,0.6), 0 0 20px rgba(255,68,68,0.4);
  text-shadow: 0 0 8px #ff4444;
}

.stats-bar {
  background: rgba(10,14,20,0.80);
  border: 2px solid rgba(0,255,170,0.28);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: 12px;
  margin-bottom: 20px;
  display: flex;
  gap: 30px;
  font-size: 0.9rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-label {
  color: #8b95a5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.8rem;
}

.stat-value {
  color: var(--accent);
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 0 8px rgba(0,255,170,0.5);
}

.error-log {
  background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
  border: 2px solid rgba(0,255,170,0.28);
  border-radius: var(--radius);
  padding: 20px;
  min-height: 400px;
  max-height: 600px;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0,255,170,0.15);
}

.error-entry {
  background: rgba(10,14,20,0.60);
  border-left: 4px solid #ff4444;
  border-radius: var(--radius);
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.2s ease;
}

.error-entry:hover {
  border-left-color: var(--accent);
  box-shadow: 0 0 15px rgba(0,255,170,0.2);
}

.error-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.error-method {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(0,255,170,0.15);
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: 700;
  margin-right: 8px;
}

.error-status {
  display: inline-block;
  padding: 4px 8px;
  background: rgba(255,68,68,0.15);
  color: #ff4444;
  border: 1px solid #ff4444;
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: 700;
}

.error-url {
  color: var(--accent-2);
  font-size: 0.95rem;
  word-break: break-all;
  margin: 5px 0;
}

.error-timestamp {
  color: #8b95a5;
  font-size: 0.85rem;
}

.error-details {
  margin-top: 10px;
  padding: 10px;
  background: rgba(0,0,0,0.40);
  border-radius: var(--radius);
  font-size: 0.85rem;
}

.error-details pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: #c9d1d9;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6b7684;
}

.empty-state-icon {
  font-size: 3rem;
  margin-bottom: 15px;
  color: var(--accent);
  opacity: 0.3;
}

/* Scrollbar styling */
.error-log::-webkit-scrollbar {
  width: 10px;
}

.error-log::-webkit-scrollbar-track {
  background: rgba(10,14,20,0.60);
  border-radius: var(--radius);
}

.error-log::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: var(--radius);
  box-shadow: 0 0 10px rgba(0,255,170,0.5);
}

.error-log::-webkit-scrollbar-thumb:hover {
  background: var(--accent-2);
}

/* Clear animation */
@keyframes fadeOutSlide {
  0% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-30px) scale(0.95);
  }
}

.error-entry.clearing {
  animation: fadeOutSlide 0.3s ease-out forwards;
}

/* Modal styling */
.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(4px);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.2s ease-out;
}

.modal-overlay.active {
  display: flex;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-content {
  background: linear-gradient(135deg, rgba(26,32,40,0.98), rgba(18,23,30,0.98));
  border: 3px solid var(--accent);
  border-radius: var(--radius);
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 0 50px rgba(0,255,170,0.4), 0 0 100px rgba(0,255,170,0.2);
  animation: modalSlideIn 0.3s ease-out;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.modal-icon {
  font-size: 2.5rem;
  color: #ff4444;
  text-shadow: 0 0 20px rgba(255,68,68,0.6);
}

.modal-title {
  color: var(--accent);
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px rgba(0,255,170,0.6);
  margin: 0;
}

.modal-body {
  color: #c9d1d9;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.modal-btn {
  padding: 12px 24px;
  border: 2px solid;
  border-radius: var(--radius);
  cursor: pointer;
  font-family: var(--font);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.modal-btn-cancel {
  background: rgba(107,118,132,0.15);
  color: #8b95a5;
  border-color: #6b7684;
}

.modal-btn-cancel:hover {
  background: rgba(107,118,132,0.25);
  box-shadow: 0 0 15px rgba(107,118,132,0.4);
}

.modal-btn-confirm {
  background: rgba(255,68,68,0.15);
  color: #ff4444;
  border-color: #ff4444;
  box-shadow: 0 0 10px rgba(255,68,68,0.3);
}

.modal-btn-confirm:hover {
  background: rgba(255,68,68,0.25);
  box-shadow: 0 0 10px rgba(255,68,68,0.6), 0 0 20px rgba(255,68,68,0.4);
  text-shadow: 0 0 8px #ff4444;
}
</style>

<div class="debug-container">
  <div class="debug-header">
    <h1>⚠️ API Debug Console</h1>
    <p>Real-time monitoring and logging of all API endpoint errors</p>
  </div>

  <div class="controls-panel">
    <button id="pauseBtn">⏸ Pause Logging</button>
    <button id="exportBtn">💾 Export Logs</button>
    <button id="clearBtn" class="danger-btn">🗑 Clear All</button>
    <label style="color: #8b95a5; margin-left: auto;">
      <input type="checkbox" id="autoScrollCheckbox" checked style="margin-right: 5px;">
      Auto-scroll
    </label>
  </div>

  <div class="stats-bar">
    <div class="stat-item">
      <span class="stat-label">Total Errors:</span>
      <span class="stat-value" id="totalErrors">0</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Last Error:</span>
      <span class="stat-value" id="lastError">Never</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Status:</span>
      <span class="stat-value" id="loggingStatus">Active</span>
    </div>
  </div>

  <div class="error-log" id="errorLog">
    <div class="empty-state">
      <div class="empty-state-icon">✓</div>
      <p>No API errors detected yet. Monitoring all endpoints...</p>
    </div>
  </div>
</div>

<!-- Confirmation Modal -->
<div class="modal-overlay" id="confirmModal">
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-icon">⚠️</div>
      <h2 class="modal-title">Confirm Clear</h2>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to clear all logged errors? This action cannot be undone.</p>
      <p style="color: #8b95a5; font-size: 0.9rem; margin-top: 10px;">All error logs will be permanently deleted from local storage.</p>
    </div>
    <div class="modal-actions">
      <button class="modal-btn modal-btn-cancel" id="modalCancel">Cancel</button>
      <button class="modal-btn modal-btn-confirm" id="modalConfirm">Clear All</button>
    </div>
  </div>
</div>

<script type="module">
import { baseurl, pythonURI } from '{{ site.baseurl }}/assets/js/api/config.js';

// Authentication check - redirect if not admin/teacher
async function checkAuth() {
  const authToken = localStorage.getItem('access_token');

  if (!authToken) {
    // No token, redirect to login
    window.location.href = baseurl + '/login';
    return false;
  }

  try {
    const response = await fetch(pythonURI + '/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      // Invalid token
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = baseurl + '/login';
      return false;
    }

    const data = await response.json();
    const user = data.user;

    // Check if user is admin or teacher
    if (user.role !== 'admin' && user.role !== 'teacher') {
      // Not authorized
      alert('Access Denied: Admin or Teacher role required');
      window.location.href = baseurl + '/';
      return false;
    }

    return true;
  } catch (error) {
    console.error('Auth check failed:', error);
    window.location.href = baseurl + '/login';
    return false;
  }
}

// Run auth check before loading the debug script
checkAuth().then(isAuthorized => {
  if (isAuthorized) {
    // Load the debug script only if authorized
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '{{ site.baseurl }}/assets/js/api/debug.js';
    document.body.appendChild(script);
  }
});
</script>
