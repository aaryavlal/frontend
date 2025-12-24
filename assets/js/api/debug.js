// API Debug Logger
// This module intercepts all fetch requests and logs errors to the debug console

const DEBUG_STORAGE_KEY = 'api_debug_logs';
const MAX_LOGS = 100; // Maximum number of logs to store

class APIDebugger {
  constructor() {
    this.logs = this.loadLogs();
    this.isPaused = false;
    this.autoScroll = true;
    this.originalFetch = window.fetch;
    this.initInterceptor();
    this.initUI();
  }

  // Load logs from localStorage
  loadLogs() {
    try {
      const stored = localStorage.getItem(DEBUG_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading debug logs:', e);
      return [];
    }
  }

  // Save logs to localStorage
  saveLogs() {
    try {
      // Keep only the last MAX_LOGS entries
      const logsToSave = this.logs.slice(-MAX_LOGS);
      localStorage.setItem(DEBUG_STORAGE_KEY, JSON.stringify(logsToSave));
    } catch (e) {
      console.error('Error saving debug logs:', e);
    }
  }

  // Intercept all fetch requests
  initInterceptor() {
    const self = this;

    window.fetch = async function(...args) {
      const [url, options = {}] = args;
      const method = options.method || 'GET';
      const startTime = Date.now();

      try {
        const response = await self.originalFetch.apply(this, args);
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Log if response is not ok (status >= 400)
        if (!response.ok) {
          const logEntry = {
            timestamp: new Date().toISOString(),
            url: url.toString(),
            method: method,
            status: response.status,
            statusText: response.statusText,
            duration: duration,
            type: 'HTTP Error'
          };

          // Try to get response body
          try {
            const clonedResponse = response.clone();
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
              const errorData = await clonedResponse.json();
              logEntry.responseBody = errorData;
            } else {
              const errorText = await clonedResponse.text();
              logEntry.responseBody = errorText;
            }
          } catch (e) {
            logEntry.responseBody = 'Could not read response body';
          }

          self.addLog(logEntry);
        }

        return response;
      } catch (error) {
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Log network errors
        const logEntry = {
          timestamp: new Date().toISOString(),
          url: url.toString(),
          method: method,
          status: 0,
          statusText: 'Network Error',
          duration: duration,
          type: 'Network Error',
          error: error.message
        };

        self.addLog(logEntry);

        // Re-throw the error to maintain normal behavior
        throw error;
      }
    };
  }

  // Add a log entry
  addLog(logEntry) {
    if (this.isPaused) return;

    this.logs.push(logEntry);
    this.saveLogs();
    this.renderLogs();
    this.updateStats();
  }

  // Initialize UI event handlers
  initUI() {
    const pauseBtn = document.getElementById('pauseBtn');
    const exportBtn = document.getElementById('exportBtn');
    const clearBtn = document.getElementById('clearBtn');
    const autoScrollCheckbox = document.getElementById('autoScrollCheckbox');

    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.togglePause());
    }

    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportLogs());
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clearLogs());
    }

    if (autoScrollCheckbox) {
      autoScrollCheckbox.addEventListener('change', (e) => {
        this.autoScroll = e.target.checked;
      });
    }

    // Initial render
    this.renderLogs();
    this.updateStats();
  }

  // Toggle pause/resume logging
  togglePause() {
    this.isPaused = !this.isPaused;
    const pauseBtn = document.getElementById('pauseBtn');
    const statusEl = document.getElementById('loggingStatus');

    if (this.isPaused) {
      pauseBtn.textContent = '▶ Resume Logging';
      statusEl.textContent = 'Paused';
      statusEl.style.color = '#ff9800';
    } else {
      pauseBtn.textContent = '⏸ Pause Logging';
      statusEl.textContent = 'Active';
      statusEl.style.color = '#00ffaa';
    }
  }

  // Export logs as JSON
  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `api-debug-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Clear all logs with animation
  clearLogs() {
    const modal = document.getElementById('confirmModal');
    const cancelBtn = document.getElementById('modalCancel');
    const confirmBtn = document.getElementById('modalConfirm');

    // Show modal
    modal.classList.add('active');

    // Close modal function
    const closeModal = () => {
      modal.classList.remove('active');
    };

    // Cancel handler
    const handleCancel = () => {
      closeModal();
      cancelBtn.removeEventListener('click', handleCancel);
      confirmBtn.removeEventListener('click', handleConfirm);
      modal.removeEventListener('click', handleOutsideClick);
    };

    // Confirm handler
    const handleConfirm = () => {
      // Animate all error entries out
      const errorEntries = document.querySelectorAll('.error-entry');

      if (errorEntries.length > 0) {
        errorEntries.forEach((entry, index) => {
          setTimeout(() => {
            entry.classList.add('clearing');
          }, index * 30); // Stagger the animations
        });

        // Wait for animations to complete, then clear
        setTimeout(() => {
          this.logs = [];
          this.saveLogs();
          this.renderLogs();
          this.updateStats();
          closeModal();
        }, errorEntries.length * 30 + 300);
      } else {
        // No entries to animate, just close
        closeModal();
      }

      cancelBtn.removeEventListener('click', handleCancel);
      confirmBtn.removeEventListener('click', handleConfirm);
      modal.removeEventListener('click', handleOutsideClick);
    };

    // Outside click handler
    const handleOutsideClick = (e) => {
      if (e.target === modal) {
        handleCancel();
      }
    };

    // Add event listeners
    cancelBtn.addEventListener('click', handleCancel);
    confirmBtn.addEventListener('click', handleConfirm);
    modal.addEventListener('click', handleOutsideClick);

    // ESC key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCancel();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Update statistics
  updateStats() {
    const totalErrorsEl = document.getElementById('totalErrors');
    const lastErrorEl = document.getElementById('lastError');

    if (totalErrorsEl) {
      totalErrorsEl.textContent = this.logs.length;
    }

    if (lastErrorEl && this.logs.length > 0) {
      const lastLog = this.logs[this.logs.length - 1];
      const lastTime = new Date(lastLog.timestamp);
      const now = new Date();
      const diffMs = now - lastTime;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);

      if (diffMin > 0) {
        lastErrorEl.textContent = `${diffMin}m ago`;
      } else if (diffSec > 0) {
        lastErrorEl.textContent = `${diffSec}s ago`;
      } else {
        lastErrorEl.textContent = 'Just now';
      }
    }
  }

  // Render all logs
  renderLogs() {
    const logContainer = document.getElementById('errorLog');
    if (!logContainer) return;

    if (this.logs.length === 0) {
      logContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">✓</div>
          <p>No API errors detected yet. Monitoring all endpoints...</p>
        </div>
      `;
      return;
    }

    // Render in reverse order (newest first)
    const logsHTML = [...this.logs].reverse().map(log => this.renderLogEntry(log)).join('');
    logContainer.innerHTML = logsHTML;

    // Auto-scroll to top if enabled
    if (this.autoScroll) {
      logContainer.scrollTop = 0;
    }
  }

  // Render a single log entry
  renderLogEntry(log) {
    const timestamp = new Date(log.timestamp).toLocaleString();
    const statusClass = log.status >= 500 ? 'server-error' : 'client-error';

    let detailsHTML = '';
    if (log.responseBody) {
      const bodyStr = typeof log.responseBody === 'string'
        ? log.responseBody
        : JSON.stringify(log.responseBody, null, 2);

      detailsHTML = `
        <div class="error-details">
          <strong>Response Body:</strong>
          <pre>${this.escapeHtml(bodyStr)}</pre>
        </div>
      `;
    }

    if (log.error) {
      detailsHTML += `
        <div class="error-details">
          <strong>Error Message:</strong>
          <pre>${this.escapeHtml(log.error)}</pre>
        </div>
      `;
    }

    return `
      <div class="error-entry ${statusClass}">
        <div class="error-header">
          <div>
            <span class="error-method">${this.escapeHtml(log.method)}</span>
            <span class="error-status">${log.status} ${this.escapeHtml(log.statusText)}</span>
          </div>
          <div class="error-timestamp">${timestamp}</div>
        </div>
        <div class="error-url">${this.escapeHtml(log.url)}</div>
        <div style="margin-top: 8px; color: #8b95a5; font-size: 0.85rem;">
          Duration: ${log.duration}ms | Type: ${this.escapeHtml(log.type)}
        </div>
        ${detailsHTML}
      </div>
    `;
  }

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the debugger when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.apiDebugger = new APIDebugger();
  });
} else {
  window.apiDebugger = new APIDebugger();
}

// Update stats every 5 seconds
setInterval(() => {
  if (window.apiDebugger) {
    window.apiDebugger.updateStats();
  }
}, 5000);
