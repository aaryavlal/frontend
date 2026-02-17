---
layout: post
title: Admin Panel
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

/* Tab navigation */
.tab-bar {
  display: flex;
  gap: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(0,255,170,0.28);
}

.tab-btn {
  padding: 12px 24px;
  background: transparent;
  color: #8b95a5;
  border: 2px solid transparent;
  border-bottom: none;
  border-radius: var(--radius) var(--radius) 0 0;
  cursor: pointer;
  font-family: var(--font);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  color: var(--accent);
  background: rgba(0,255,170,0.05);
}

.tab-btn.active {
  color: var(--accent);
  background: rgba(0,255,170,0.1);
  border-color: rgba(0,255,170,0.28);
  border-bottom: 2px solid var(--bg);
  margin-bottom: -2px;
  text-shadow: 0 0 8px rgba(0,255,170,0.5);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

/* User management styles */
.users-controls {
  background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
  border: 2px solid rgba(0,255,170,0.28);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  box-shadow: 0 0 20px rgba(0,255,170,0.15);
}

.users-controls input {
  flex: 1;
  padding: 10px 16px;
  background: rgba(10,14,20,0.80);
  color: #e0e6ed;
  border: 2px solid rgba(0,255,170,0.28);
  border-radius: var(--radius);
  font-family: var(--font);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;
}

.users-controls input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 10px rgba(0,255,170,0.3);
}

.users-controls input::placeholder {
  color: #6b7684;
}

.user-count {
  color: #8b95a5;
  font-size: 0.85rem;
  white-space: nowrap;
}

.users-table-wrapper {
  background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
  border: 2px solid rgba(0,255,170,0.28);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,255,170,0.15);
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.users-table thead th {
  background: rgba(0,255,170,0.1);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 12px 16px;
  text-align: left;
  border-bottom: 2px solid rgba(0,255,170,0.28);
}

.users-table tbody tr {
  border-bottom: 1px solid rgba(0,255,170,0.1);
  transition: all 0.2s ease;
}

.users-table tbody tr:hover {
  background: rgba(0,255,170,0.05);
}

.users-table tbody td {
  padding: 10px 16px;
  color: #c9d1d9;
}

.role-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: var(--radius);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-admin {
  background: rgba(255,68,68,0.15);
  color: #ff4444;
  border: 1px solid #ff4444;
}

.role-teacher {
  background: rgba(0,212,255,0.15);
  color: var(--accent-2);
  border: 1px solid var(--accent-2);
}

.role-user {
  background: rgba(0,255,170,0.15);
  color: var(--accent);
  border: 1px solid var(--accent);
}

.delete-user-btn {
  padding: 6px 14px;
  background: rgba(255,68,68,0.15);
  color: #ff4444;
  border: 1px solid #ff4444;
  border-radius: var(--radius);
  cursor: pointer;
  font-family: var(--font);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.delete-user-btn:hover {
  background: rgba(255,68,68,0.3);
  box-shadow: 0 0 10px rgba(255,68,68,0.5);
  text-shadow: 0 0 6px #ff4444;
}

.users-loading {
  text-align: center;
  padding: 60px 20px;
  color: #6b7684;
}

.users-loading .spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(0,255,170,0.2);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes rowFadeOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-20px); }
}

.user-row-removing {
  animation: rowFadeOut 0.3s ease-out forwards;
}

/* Debug tab styles (existing) */
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

/* Core Injections tab styles */
.ci-controls {
  background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
  border: 2px solid rgba(0,255,170,0.28);
  border-left: 4px solid var(--accent);
  border-radius: var(--radius);
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
  box-shadow: 0 0 20px rgba(0,255,170,0.15);
}

.ci-controls select {
  flex: 1;
  padding: 10px 16px;
  background: rgba(10,14,20,0.80);
  color: #e0e6ed;
  border: 2px solid rgba(0,255,170,0.28);
  border-radius: var(--radius);
  font-family: var(--font);
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s ease;
  cursor: pointer;
}

.ci-controls select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 10px rgba(0,255,170,0.3);
}

.ci-controls select option {
  background: var(--bg);
  color: #e0e6ed;
}

.ci-room-info {
  color: #8b95a5;
  font-size: 0.85rem;
  white-space: nowrap;
}

.ci-table-wrapper {
  background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
  border: 2px solid rgba(0,255,170,0.28);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0,255,170,0.15);
}

.ci-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.ci-table thead th {
  background: rgba(0,255,170,0.1);
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 12px 16px;
  text-align: center;
  border-bottom: 2px solid rgba(0,255,170,0.28);
}

.ci-table thead th:first-child {
  text-align: left;
}

.ci-table tbody tr {
  border-bottom: 1px solid rgba(0,255,170,0.1);
  transition: all 0.2s ease;
}

.ci-table tbody tr:hover {
  background: rgba(0,255,170,0.05);
}

.ci-table tbody td {
  padding: 10px 16px;
  color: #c9d1d9;
  text-align: center;
}

.ci-table tbody td:first-child {
  text-align: left;
}

.core-toggle {
  width: 36px;
  height: 36px;
  border-radius: var(--radius);
  border: 2px solid rgba(0,255,170,0.28);
  background: rgba(10,14,20,0.60);
  color: #6b7684;
  cursor: pointer;
  font-family: var(--font);
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.core-toggle:hover {
  border-color: var(--accent);
  background: rgba(0,255,170,0.1);
  color: var(--accent);
  box-shadow: 0 0 10px rgba(0,255,170,0.3);
}

.core-toggle.complete {
  background: rgba(0,255,170,0.25);
  border-color: var(--accent);
  color: var(--accent);
  box-shadow: 0 0 8px rgba(0,255,170,0.4);
  text-shadow: 0 0 6px rgba(0,255,170,0.6);
}

.core-toggle.complete:hover {
  background: rgba(255,68,68,0.15);
  border-color: #ff4444;
  color: #ff4444;
  box-shadow: 0 0 10px rgba(255,68,68,0.4);
  text-shadow: 0 0 6px rgba(255,68,68,0.6);
}

.core-toggle.toggling {
  pointer-events: none;
  opacity: 0.5;
}

@keyframes corePulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.core-toggle.pulse {
  animation: corePulse 0.3s ease-out;
}
</style>

<div class="debug-container">
  <div class="debug-header">
    <h1>Admin Panel</h1>
    <p>User management and API monitoring</p>
  </div>

  <!-- Tab Navigation -->
  <div class="tab-bar">
    <button class="tab-btn active" data-tab="usersTab">User Management</button>
    <button class="tab-btn" data-tab="coreInjectionsTab">Core Injections</button>
    <button class="tab-btn" data-tab="debugTab">Debug Console</button>
  </div>

  <!-- User Management Tab -->
  <div class="tab-content active" id="usersTab">
    <div class="users-controls">
      <input type="text" id="userSearch" placeholder="Search by name, UID, or email...">
      <span class="user-count" id="userCount"></span>
    </div>

    <div class="users-table-wrapper">
      <table class="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="usersTableBody">
          <tr>
            <td colspan="4">
              <div class="users-loading">
                <div class="spinner"></div>
                <p>Loading users...</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Core Injections Tab -->
  <div class="tab-content" id="coreInjectionsTab">
    <div class="ci-controls">
      <select id="ciRoomSelect">
        <option value="">-- Select a Room --</option>
      </select>
      <span class="ci-room-info" id="ciRoomInfo"></span>
    </div>

    <div class="ci-table-wrapper">
      <table class="ci-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Core 1</th>
            <th>Core 2</th>
            <th>Core 3</th>
            <th>Core 4</th>
            <th>Core 5</th>
            <th>Core 6</th>
          </tr>
        </thead>
        <tbody id="ciTableBody">
          <tr>
            <td colspan="7">
              <div class="empty-state">
                <div class="empty-state-icon">&#9881;</div>
                <p>Select a room to view member progress.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Debug Console Tab -->
  <div class="tab-content" id="debugTab">
    <div class="controls-panel">
      <button id="pauseBtn">Pause Logging</button>
      <button id="exportBtn">Export Logs</button>
      <button id="clearBtn" class="danger-btn">Clear All</button>
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
</div>

<!-- Confirmation Modal (Clear Logs) -->
<div class="modal-overlay" id="confirmModal">
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-icon">&#9888;</div>
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

<!-- Delete User Confirmation Modal -->
<div class="modal-overlay" id="deleteUserModal">
  <div class="modal-content">
    <div class="modal-header">
      <div class="modal-icon">&#9888;</div>
      <h2 class="modal-title">Delete User</h2>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete user <strong id="deleteUserUid" style="color: var(--accent-2);"></strong>?</p>
      <p style="color: #8b95a5; font-size: 0.9rem; margin-top: 10px;">This action cannot be undone. The user and all associated data will be permanently removed.</p>
    </div>
    <div class="modal-actions">
      <button class="modal-btn modal-btn-cancel" id="deleteUserCancel">Cancel</button>
      <button class="modal-btn modal-btn-confirm" id="deleteUserConfirm">Delete</button>
    </div>
  </div>
</div>

<script type="module">
import { baseurl, pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

let currentUserUid = null;

// Authentication check - redirect if not admin/teacher
async function checkAuth() {
  const authToken = localStorage.getItem('access_token');

  if (!authToken) {
    window.location.href = baseurl + '/login';
    return null;
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
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = baseurl + '/login';
      return null;
    }

    const data = await response.json();
    const user = data.user;

    if (user.role !== 'admin' && user.role !== 'teacher') {
      alert('Access Denied: Admin or Teacher role required');
      window.location.href = baseurl + '/';
      return null;
    }

    return user;
  } catch (error) {
    console.error('Auth check failed:', error);
    window.location.href = baseurl + '/login';
    return null;
  }
}

// Tab switching
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// Fetch and render users
let allUsers = [];

async function loadUsers() {
  const authToken = localStorage.getItem('access_token');
  try {
    const response = await fetch(pythonURI + '/api/auth/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users: ' + response.status);
    }

    allUsers = await response.json();
    renderUsers(allUsers);
  } catch (error) {
    console.error('Error loading users:', error);
    document.getElementById('usersTableBody').innerHTML = `
      <tr><td colspan="4">
        <div class="empty-state">
          <div class="empty-state-icon" style="color: #ff4444;">!</div>
          <p>Failed to load users: ${error.message}</p>
        </div>
      </td></tr>`;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text || '';
  return div.innerHTML;
}

function renderUsers(users) {
  const tbody = document.getElementById('usersTableBody');
  const countEl = document.getElementById('userCount');
  countEl.textContent = users.length + ' user' + (users.length !== 1 ? 's' : '');

  if (users.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="4">
        <div class="empty-state">
          <div class="empty-state-icon">0</div>
          <p>No users found.</p>
        </div>
      </td></tr>`;
    return;
  }

  tbody.innerHTML = users.map(user => {
    const username = escapeHtml(user.username);
    const email = escapeHtml(user.email);
    const role = (user.role || 'student').toLowerCase();
    const roleClass = role === 'admin' ? 'role-admin' : role === 'teacher' ? 'role-teacher' : 'role-user';
    const isSelf = user.username === currentUserUid;

    return `<tr data-id="${user.id}" data-username="${username}">
      <td>${username}</td>
      <td>${email}</td>
      <td><span class="role-badge ${roleClass}">${escapeHtml(user.role || 'student')}</span></td>
      <td>${isSelf ? '<span style="color:#6b7684;font-size:0.8rem;">You</span>' : `<button class="delete-user-btn" data-id="${user.id}" data-username="${username}">Delete</button>`}</td>
    </tr>`;
  }).join('');

  // Attach delete handlers
  tbody.querySelectorAll('.delete-user-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmDeleteUser(btn.dataset.id, btn.dataset.username));
  });
}

// Search/filter
function initSearch() {
  const searchInput = document.getElementById('userSearch');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allUsers.filter(u =>
      (u.username || '').toLowerCase().includes(query) ||
      (u.email || '').toLowerCase().includes(query)
    );
    renderUsers(filtered);
  });
}

// Delete user flow
function confirmDeleteUser(userId, username) {
  const modal = document.getElementById('deleteUserModal');
  const cancelBtn = document.getElementById('deleteUserCancel');
  const confirmBtn = document.getElementById('deleteUserConfirm');
  const uidDisplay = document.getElementById('deleteUserUid');

  uidDisplay.textContent = username;
  modal.classList.add('active');

  const closeModal = () => {
    modal.classList.remove('active');
    cancelBtn.removeEventListener('click', handleCancel);
    confirmBtn.removeEventListener('click', handleConfirm);
    modal.removeEventListener('click', handleOutside);
    document.removeEventListener('keydown', handleEscape);
  };

  const handleCancel = () => closeModal();

  const handleConfirm = async () => {
    confirmBtn.textContent = 'Deleting...';
    confirmBtn.disabled = true;

    try {
      const authToken = localStorage.getItem('access_token');
      const response = await fetch(pythonURI + '/api/auth/users/' + userId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        credentials: 'include'
      });

      if (response.ok) {
        // Animate row removal
        const row = document.querySelector(`tr[data-id="${userId}"]`);
        if (row) {
          row.classList.add('user-row-removing');
          setTimeout(() => {
            allUsers = allUsers.filter(u => u.id !== parseInt(userId));
            renderUsers(allUsers);
            // Re-apply search filter if active
            const searchInput = document.getElementById('userSearch');
            if (searchInput.value) {
              searchInput.dispatchEvent(new Event('input'));
            }
          }, 300);
        }
        closeModal();
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert('Failed to delete user: ' + (errorData.error || errorData.message || response.status));
        closeModal();
      }
    } catch (error) {
      alert('Error deleting user: ' + error.message);
      closeModal();
    }

    confirmBtn.textContent = 'Delete';
    confirmBtn.disabled = false;
  };

  const handleOutside = (e) => {
    if (e.target === modal) handleCancel();
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') handleCancel();
  };

  cancelBtn.addEventListener('click', handleCancel);
  confirmBtn.addEventListener('click', handleConfirm);
  modal.addEventListener('click', handleOutside);
  document.addEventListener('keydown', handleEscape);
}

// ===== Core Injections Tab =====

async function loadRooms() {
  const authToken = localStorage.getItem('access_token');
  try {
    const response = await fetch(pythonURI + '/api/rooms/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Failed to fetch rooms: ' + response.status);

    const data = await response.json();
    const rooms = data.rooms || [];
    const select = document.getElementById('ciRoomSelect');

    select.innerHTML = '<option value="">-- Select a Room --</option>';

    rooms.forEach(room => {
      const opt = document.createElement('option');
      opt.value = room.id;
      opt.textContent = `${room.name} (${room.room_code}) - ${room.member_count || 0} members`;
      select.appendChild(opt);
    });
  } catch (error) {
    console.error('Error loading rooms:', error);
  }
}

async function loadMemberProgress(roomId) {
  const authToken = localStorage.getItem('access_token');
  const tbody = document.getElementById('ciTableBody');
  const info = document.getElementById('ciRoomInfo');

  if (!roomId) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <div class="empty-state-icon">&#9881;</div>
        <p>Select a room to view member progress.</p>
      </div>
    </td></tr>`;
    info.textContent = '';
    return;
  }

  tbody.innerHTML = `<tr><td colspan="7">
    <div class="users-loading">
      <div class="spinner"></div>
      <p>Loading member progress...</p>
    </div>
  </td></tr>`;

  try {
    const response = await fetch(pythonURI + '/api/rooms/' + roomId + '/member-progress', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) throw new Error('Failed to fetch progress: ' + response.status);

    const data = await response.json();
    const members = data.members || [];

    info.textContent = members.length + ' member' + (members.length !== 1 ? 's' : '');

    if (members.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7">
        <div class="empty-state">
          <div class="empty-state-icon">0</div>
          <p>No members in this room.</p>
        </div>
      </td></tr>`;
      return;
    }

    tbody.innerHTML = members.map(member => {
      const username = escapeHtml(member.username);
      const completed = member.completed_modules || [];

      let cells = `<td>${username}</td>`;
      for (let m = 1; m <= 6; m++) {
        const isComplete = completed.includes(m);
        cells += `<td><button class="core-toggle${isComplete ? ' complete' : ''}"
          data-user-id="${member.id}"
          data-module="${m}"
          title="${isComplete ? 'Remove' : 'Complete'} Core ${m} for ${username}">${m}</button></td>`;
      }

      return `<tr>${cells}</tr>`;
    }).join('');

    tbody.querySelectorAll('.core-toggle').forEach(btn => {
      btn.addEventListener('click', () => toggleCore(btn));
    });

  } catch (error) {
    console.error('Error loading member progress:', error);
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <div class="empty-state-icon" style="color: #ff4444;">!</div>
        <p>Failed to load progress: ${error.message}</p>
      </div>
    </td></tr>`;
  }
}

async function toggleCore(btn) {
  const userId = btn.dataset.userId;
  const moduleNumber = parseInt(btn.dataset.module);
  const authToken = localStorage.getItem('access_token');

  btn.classList.add('toggling');

  try {
    const response = await fetch(pythonURI + '/api/progress/admin/toggle/' + userId + '/' + moduleNumber, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      credentials: 'include'
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || 'Toggle failed: ' + response.status);
    }

    const data = await response.json();

    if (data.action === 'added') {
      btn.classList.add('complete');
      btn.title = btn.title.replace('Complete', 'Remove');
    } else {
      btn.classList.remove('complete');
      btn.title = btn.title.replace('Remove', 'Complete');
    }

    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 300);

  } catch (error) {
    console.error('Error toggling core:', error);
    alert('Failed to toggle core: ' + error.message);
  } finally {
    btn.classList.remove('toggling');
  }
}

function initCoreInjections() {
  loadRooms();
  document.getElementById('ciRoomSelect').addEventListener('change', (e) => {
    loadMemberProgress(e.target.value);
  });
}

// Initialize
checkAuth().then(user => {
  if (user) {
    currentUserUid = user.uid || user.username;
    initTabs();
    initSearch();
    loadUsers();
    initCoreInjections();

    // Load the debug script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '{{ site.baseurl }}/assets/js/api/debug.js';
    document.body.appendChild(script);
  }
});
</script>
