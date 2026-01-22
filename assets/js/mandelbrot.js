/**
 * Mandelbrot REST API Client
 * Connects to Flask REST API endpoints instead of Socket.IO
 */

class MandelbrotAPI {
  constructor(config) {
    this.config = {
      canvasId: config.canvasId,
      apiBaseUrl: config.apiBaseUrl || 'http://localhost:8405/api/compute',
      width: config.width || 800,
      height: config.height || 600,
      tile_w: config.tile_w || 64,
      tile_h: config.tile_h || 64,
      max_iter: config.max_iter || 256,
      time_limit_ms: config.time_limit_ms || 2000,
      mode: config.mode || 'sequential', // 'sequential' or 'concurrent'
      num_threads: config.num_threads || 4,
    };

    this.canvas = document.getElementById(this.config.canvasId);
    if (!this.canvas) {
      throw new Error(`Canvas with id '${this.config.canvasId}' not found`);
    }

    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.config.width;
    this.canvas.height = this.config.height;

    // Event handlers
    this.handlers = {
      tile_update: [],
      complete: [],
      error: [],
      progress: [],
    };

    // Abort controller for cancellation
    this.abortController = null;
  }

  /**
   * Register event handler
   */
  on(event, callback) {
    if (this.handlers[event]) {
      this.handlers[event].push(callback);
    }
  }

  /**
   * Emit event to all registered handlers
   */
  emit(event, data) {
    if (this.handlers[event]) {
      this.handlers[event].forEach(cb => cb(data));
    }
  }

  /**
   * Draw a tile on the canvas
   */
  drawTile(tile) {
    const imageData = this.ctx.createImageData(tile.tile_w, tile.tile_h);

    for (let i = 0; i < tile.data.length; i++) {
      const value = tile.data[i];
      const normalized = (value / this.config.max_iter) * 255;

      const idx = i * 4;
      // Grayscale rendering
      imageData.data[idx] = normalized;     // R
      imageData.data[idx + 1] = normalized; // G
      imageData.data[idx + 2] = normalized; // B
      imageData.data[idx + 3] = 255;        // A
    }

    this.ctx.putImageData(imageData, tile.tile_x, tile.tile_y);
  }

  /**
   * Build query parameters for API call
   */
  buildQueryParams() {
    const params = new URLSearchParams({
      width: this.config.width,
      height: this.config.height,
      tile_w: this.config.tile_w,
      tile_h: this.config.tile_h,
      max_iter: this.config.max_iter,
      time_limit_ms: this.config.time_limit_ms,
    });

    if (this.config.mode === 'concurrent') {
      params.append('num_threads', this.config.num_threads);
    }

    return params.toString();
  }

  /**
   * Start the computation
   */
  async start() {
    // Create new abort controller
    this.abortController = new AbortController();

    // Build endpoint URL
    const endpoint = this.config.mode === 'sequential'
      ? `${this.config.apiBaseUrl}/sequential`
      : `${this.config.apiBaseUrl}/concurrent`;

    const url = `${endpoint}?${this.buildQueryParams()}`;

    try {
      // Make API request
      const response = await fetch(url, {
        method: 'GET',
        signal: this.abortController.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Computation failed');
      }

      // Process the task records
      await this.processTaskRecords(result.data);

      // Emit complete event
      this.emit('complete', {
        completed_tasks: result.data.length,
        total_tasks: result.data.length,
        num_threads: this.config.mode === 'concurrent' ? this.config.num_threads : 1,
        was_time_limited: false, // Could parse from duration
        mode: this.config.mode,
      });

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was cancelled');
      } else {
        console.error('Error:', error);
        this.emit('error', {
          message: error.message,
        });
      }
    }
  }

  /**
   * Process task records returned from API
   * Simulates progressive rendering by playing back in chronological order
   */
  async processTaskRecords(records) {
    if (records.length === 0) return;

    // Sort by start time to replay in chronological order
    const sortedRecords = [...records].sort((a, b) => a.start_time_ms - b.start_time_ms);

    const totalTasks = sortedRecords.length;
    const firstStartTime = sortedRecords[0].start_time_ms;

    for (let i = 0; i < sortedRecords.length; i++) {
      const record = sortedRecords[i];

      // Emit progress event
      this.emit('progress', {
        current: i + 1,
        total: totalTasks,
        task: record,
      });

      // Note: We don't have the actual tile pixel data in the API response
      // You would need to either:
      // 1. Compute it client-side (JavaScript Mandelbrot)
      // 2. Have the API return the pixel data
      // For now, we'll just draw a colored rectangle
      this.drawTaskRectangle(record);

      // Wait a bit to simulate progressive rendering
      if (i < sortedRecords.length - 1) {
        const nextRecord = sortedRecords[i + 1];
        const delay = Math.min((nextRecord.start_time_ms - record.start_time_ms) / 10, 50);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  /**
   * Draw a rectangle for a task (fallback when we don't have pixel data)
   */
  drawTaskRectangle(record) {
    // Clip tile dimensions to canvas bounds
    const maxX = Math.min(record.tile_x + record.tile_w, this.canvas.width);
    const maxY = Math.min(record.tile_y + record.tile_h, this.canvas.height);
    const clippedWidth = maxX - record.tile_x;
    const clippedHeight = maxY - record.tile_y;

    // Only draw if there's a valid area
    if (clippedWidth <= 0 || clippedHeight <= 0) return;

    const threadColors = [
      '#2a2a2a', '#3d3d3d', '#505050', '#636363',
      '#767676', '#898989', '#9c9c9c', '#afafaf',
      '#404040', '#555555', '#6a6a6a', '#7f7f7f',
      '#333333', '#4d4d4d', '#666666', '#808080'
    ];

    // Use thread_id to determine color from the greyscale palette
    const color = threadColors[record.thread_id % threadColors.length];
    this.ctx.fillStyle = color;
    this.ctx.fillRect(record.tile_x, record.tile_y, clippedWidth, clippedHeight);

    // Add border
    this.ctx.strokeStyle = '#00ffaa';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(record.tile_x, record.tile_y, clippedWidth, clippedHeight);
  }


  /**
   * Stop/cancel the computation
   */
  stop() {
    if (this.abortController) {
      this.abortController.abort();
    }
  }

  /**
   * Check if API is available
   */
  async checkHealth() {
    try {
      const response = await fetch(`${this.config.apiBaseUrl}/health`);
      return await response.json();
    } catch (error) {
      return { rustism_available: false, status: 'error', message: error.message };
    }
  }
}

// Export for use in other scripts
window.MandelbrotAPI = MandelbrotAPI;
