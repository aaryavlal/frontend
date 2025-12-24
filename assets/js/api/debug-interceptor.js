// Global API Debug Interceptor
// This script intercepts all fetch requests globally and logs errors to localStorage
// It works on all pages, not just the debug console

const DEBUG_STORAGE_KEY = 'api_debug_logs';
const MAX_LOGS = 100;

// Only initialize if not already initialized
if (!window.__API_DEBUG_INTERCEPTOR_INITIALIZED__) {
  window.__API_DEBUG_INTERCEPTOR_INITIALIZED__ = true;

  // Store original fetch
  const originalFetch = window.fetch;

  // Override global fetch
  window.fetch = async function(...args) {
    const [url, options = {}] = args;
    const method = options.method || 'GET';
    const startTime = Date.now();

    try {
      const response = await originalFetch.apply(this, args);
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
          type: 'HTTP Error',
          page: window.location.pathname
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
            if (errorText && errorText.length > 0) {
              logEntry.responseBody = errorText.substring(0, 500); // Limit size
            }
          }
        } catch (e) {
          logEntry.responseBody = 'Could not read response body';
        }

        saveLog(logEntry);
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
        error: error.message,
        page: window.location.pathname
      };

      saveLog(logEntry);

      // Re-throw the error to maintain normal behavior
      throw error;
    }
  };

  // Helper function to save logs to localStorage
  function saveLog(logEntry) {
    try {
      let logs = [];
      const stored = localStorage.getItem(DEBUG_STORAGE_KEY);
      if (stored) {
        logs = JSON.parse(stored);
      }

      logs.push(logEntry);

      // Keep only the last MAX_LOGS entries
      if (logs.length > MAX_LOGS) {
        logs = logs.slice(-MAX_LOGS);
      }

      localStorage.setItem(DEBUG_STORAGE_KEY, JSON.stringify(logs));

      // Log to console for debugging
      console.warn('[API Debug] Error logged:', {
        method: logEntry.method,
        url: logEntry.url,
        status: logEntry.status
      });
    } catch (e) {
      console.error('[API Debug] Error saving log:', e);
    }
  }

  console.log('[API Debug] Interceptor initialized');
}
