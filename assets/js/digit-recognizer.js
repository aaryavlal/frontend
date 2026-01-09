class DigitRecognizer {
    constructor() {
        this.canvas = document.getElementById('drawing-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isDrawing = false;
        this.lastX = 0;
        this.lastY = 0;
        this.brushSize = 15;

        // API endpoint - matches Flask Blueprint structure (backend runs on port 8405)
        this.API_URL = 'http://127.0.0.1:8405/api/digit';

        // CNN visualization state
        this.currentLayerIndex = 0;
        this.cnnData = null;
        this.isPlaying = false;
        this.playInterval = null;

        this.init();
    }
    
    init() {
        // Set up canvas
        this.clearCanvas();
        
        // Event listeners
        this.setupDrawingEvents();
        this.setupControls();
        
        // Check API health
        this.checkAPIHealth();
    }
    
    setupDrawingEvents() {
        // Mouse events
        this.canvas.addEventListener('mousedown', (e) => this.startDrawing(e));
        this.canvas.addEventListener('mousemove', (e) => this.draw(e));
        this.canvas.addEventListener('mouseup', () => this.stopDrawing());
        this.canvas.addEventListener('mouseout', () => this.stopDrawing());
        
        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.stopDrawing();
        });
    }
    
    setupControls() {
        // Brush size
        const brushSlider = document.getElementById('brush-size');
        const brushValue = document.getElementById('brush-value');

        brushSlider.addEventListener('input', (e) => {
            this.brushSize = parseInt(e.target.value);
            brushValue.textContent = this.brushSize;
        });

        // Buttons
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clearCanvas();
            this.clearResults();
        });

        document.getElementById('recognize-btn').addEventListener('click', () => {
            this.recognizeDigits();
        });

        // CNN Visualization controls
        const learnBtn = document.getElementById('learn-cnn-btn');
        if (learnBtn) {
            learnBtn.addEventListener('click', () => this.showCNNVisualization());
        }

        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', () => this.togglePlayAnimation());
        }

        const prevBtn = document.getElementById('prev-layer-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousLayer());
        }

        const nextBtn = document.getElementById('next-layer-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextLayer());
        }

        const closeBtn = document.getElementById('close-viz-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeCNNVisualization());
        }
    }
    
    getMousePos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    
    startDrawing(e) {
        this.isDrawing = true;
        const pos = this.getMousePos(e);
        this.lastX = pos.x;
        this.lastY = pos.y;
    }
    
    draw(e) {
        if (!this.isDrawing) return;
        
        const pos = this.getMousePos(e);
        
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = this.brushSize * 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.stroke();
        
        this.lastX = pos.x;
        this.lastY = pos.y;
    }
    
    stopDrawing() {
        this.isDrawing = false;
    }
    
    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    clearResults() {
        document.querySelector('.result-number').textContent = '?';
        document.querySelector('.result-confidence').textContent = '';
        document.getElementById('individual-digits').innerHTML = '';
    }
    
    async checkAPIHealth() {
        const statusIndicator = document.getElementById('status-indicator');

        try {
            const response = await fetch(`${this.API_URL}/health`);
            const data = await response.json();

            if (data.status === 'ok') {
                statusIndicator.classList.add('ready');
                console.log('✓ API is ready');
                if (data.ensemble_models > 0) {
                    console.log(`✓ Loaded ${data.ensemble_models} ensemble models`);
                }
            }
        } catch (error) {
            console.error('API health check failed:', error);
            statusIndicator.classList.remove('ready');
            alert('⚠️ Cannot connect to API. Make sure Flask server is running on port 8405 with digit_api blueprint registered.');
        }
    }
    
    async recognizeDigits() {
        const statusIndicator = document.getElementById('status-indicator');
        statusIndicator.classList.remove('ready');
        statusIndicator.classList.add('processing');
        
        try {
            // Get canvas as base64
            const imageData = this.canvas.toDataURL('image/png');
            
            // Call API
            const response = await fetch(`${this.API_URL}/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData })
            });
            
            const data = await response.json();
            
            if (data.success) {
                this.displayResults(data);
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
            
        } catch (error) {
            console.error('Recognition error:', error);
            alert('Failed to recognize digits. Is the Flask server running?');
        } finally {
            statusIndicator.classList.remove('processing');
            statusIndicator.classList.add('ready');
        }
    }
    
    displayResults(data) {
        // Main result
        const resultNumber = document.querySelector('.result-number');
        const resultConfidence = document.querySelector('.result-confidence');
        
        if (data.digits.length === 0) {
            resultNumber.textContent = '?';
            resultConfidence.textContent = 'No digits found';
            return;
        }
        
        resultNumber.textContent = data.number;
        
        const avgConfidence = data.digits.reduce((sum, d) => sum + d.confidence, 0) / data.digits.length;
        resultConfidence.textContent = `Confidence: ${(avgConfidence * 100).toFixed(1)}%`;
        
        // Individual digits
        const container = document.getElementById('individual-digits');
        container.innerHTML = '';
        
        data.digits.forEach((digit, idx) => {
            const card = document.createElement('div');
            card.className = 'digit-card';
            
            if (digit.confidence < 0.6) {
                card.classList.add('low-confidence');
            }
            
            const img = document.createElement('img');
            img.src = digit.processed_image;
            img.alt = `Digit ${digit.digit}`;
            
            const info = document.createElement('div');
            info.className = 'digit-info';
            
            const prediction = document.createElement('div');
            prediction.className = 'digit-prediction';
            prediction.textContent = `Digit #${idx + 1}: ${digit.digit}`;
            
            const confidence = document.createElement('div');
            confidence.className = 'digit-confidence';
            confidence.textContent = `Confidence: ${(digit.confidence * 100).toFixed(1)}%`;
            
            if (digit.confidence < 0.6) {
                confidence.textContent += ' ⚠️ Low';
            }
            
            const top3 = document.createElement('div');
            top3.className = 'digit-top3';
            top3.textContent = `Top 3: ${digit.top3.map(t => `${t.digit} (${(t.confidence * 100).toFixed(1)}%)`).join(', ')}`;
            
            info.appendChild(prediction);
            info.appendChild(confidence);
            info.appendChild(top3);
            
            card.appendChild(img);
            card.appendChild(info);
            
            container.appendChild(card);
        });
    }

    async showCNNVisualization() {
        const modal = document.getElementById('cnn-visualization-modal');
        if (!modal) return;

        const imageData = this.canvas.toDataURL('image/png');

        try {
            const response = await fetch(`${this.API_URL}/visualize`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageData })
            });

            const data = await response.json();

            if (data.success) {
                this.cnnData = data;
                this.currentLayerIndex = 0;

                // Store data globally for challenges
                window.cnnVisualizationData = data;

                // No need to render feature grid anymore - challenges handle their own rendering
                modal.classList.add('active');

                // Initialize first challenge with real data
                setTimeout(initPixelChallenge, 100);
            } else {
                alert('Error: ' + (data.error || 'Draw a digit first!'));
            }
        } catch (error) {
            console.error('Visualization error:', error);
            alert('Failed to generate visualization. Is the Flask server running?');
        }
    }

    closeCNNVisualization() {
        const modal = document.getElementById('cnn-visualization-modal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.stopPlayAnimation();
    }

    renderCNNVisualization() {
        // This function is no longer used - challenges handle their own rendering
        return;
    }

    updateButtonStates() {
        if (!this.cnnData) return;

        const prevBtn = document.getElementById('prev-layer-btn');
        const nextBtn = document.getElementById('next-layer-btn');
        const playBtn = document.getElementById('play-btn');

        const totalLayers = this.cnnData.layers.length + 1;

        if (prevBtn) {
            prevBtn.disabled = this.currentLayerIndex === 0;
            prevBtn.style.opacity = this.currentLayerIndex === 0 ? 0.5 : 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentLayerIndex === totalLayers - 1;
            nextBtn.style.opacity = this.currentLayerIndex === totalLayers - 1 ? 0.5 : 1;
        }

        if (playBtn) {
            playBtn.disabled = false;
            playBtn.style.opacity = 1;
        }
    }

    createVisualExplainer(type) {
        switch(type) {
            case 'input':
                return `
                    <div class="explainer-card">
                        <div class="explainer-icon">📥</div>
                        <div class="explainer-text">
                            <strong>START HERE</strong>
                            <span>Your drawing becomes a 28×28 grid of numbers (0-255)</span>
                        </div>
                    </div>
                `;
            case 'conv':
                return `
                    <div class="explainer-card">
                        <div class="explainer-icon">🔍</div>
                        <div class="explainer-text">
                            <strong>PATTERN DETECTION</strong>
                            <span>Each filter looks for specific patterns: edges ┃ curves ⌒ corners ⌐</span>
                        </div>
                    </div>
                    <div class="explainer-visual">
                        <div class="filter-demo">
                            <div class="filter-box">3×3 Filter</div>
                            <div class="arrow">→</div>
                            <div class="filter-box">Slides across image</div>
                            <div class="arrow">→</div>
                            <div class="filter-box">Finds matches</div>
                        </div>
                    </div>
                `;
            case 'pool':
                return `
                    <div class="explainer-card">
                        <div class="explainer-icon">⬇️</div>
                        <div class="explainer-text">
                            <strong>COMPRESSION</strong>
                            <span>Reduces size by keeping only the strongest signals</span>
                        </div>
                    </div>
                    <div class="explainer-visual">
                        <div class="pool-demo">
                            <div class="grid-before">4×4</div>
                            <div class="arrow">→</div>
                            <div class="grid-after">2×2</div>
                            <div class="pool-label">Takes max value from each 2×2 area</div>
                        </div>
                    </div>
                `;
            case 'dense':
                return `
                    <div class="explainer-card">
                        <div class="explainer-icon">🧠</div>
                        <div class="explainer-text">
                            <strong>COMBINING PATTERNS</strong>
                            <span>Neurons connect patterns together to recognize complex shapes</span>
                        </div>
                    </div>
                `;
            case 'output':
                return `
                    <div class="explainer-card">
                        <div class="explainer-icon">🎯</div>
                        <div class="explainer-text">
                            <strong>FINAL ANSWER</strong>
                            <span>10 neurons compete - highest score wins!</span>
                        </div>
                    </div>
                    <div class="explainer-visual">
                        <div class="output-demo">
                            <div class="neuron-race">
                                Each bar = How confident the network is for that digit
                            </div>
                        </div>
                    </div>
                `;
            default:
                return '<div class="explainer-card"><div class="explainer-icon">⚙️</div><div class="explainer-text"><strong>PROCESSING</strong><span>Data flowing through the network...</span></div></div>';
        }
    }

    getLayerDescription(layer) {
        if (!layer || this.currentLayerIndex === 0) {
            return {
                text: 'Your drawn digit (28×28 pixels)',
                visual: 'input'
            };
        } else if (layer.layer_name.includes('conv2d')) {
            return {
                text: `Scanning image with ${layer.shape[2]} filters to detect features`,
                visual: 'conv'
            };
        } else if (layer.layer_name.includes('pool')) {
            return {
                text: `Shrinking image while keeping important information`,
                visual: 'pool'
            };
        } else if (layer.layer_name.includes('dense') && layer.shape[0] === 10) {
            return {
                text: `Final decision: Which digit (0-9)?`,
                visual: 'output'
            };
        } else if (layer.layer_name.includes('dense')) {
            return {
                text: `${layer.shape[0]} neurons combining patterns`,
                visual: 'dense'
            };
        }
        return {
            text: `Processing... | Shape: ${layer.shape.join('×')}`,
            visual: 'default'
        };
    }

    createDenseLayerVisualization(values) {
        const container = document.createElement('div');
        container.className = 'dense-layer-viz';

        if (values.length === 10) {
            // Final layer - show digit probabilities
            const probabilities = this.cnnData.all_probabilities;
            for (let i = 0; i < 10; i++) {
                const barContainer = document.createElement('div');
                barContainer.className = 'probability-bar-container';

                const label = document.createElement('div');
                label.className = 'probability-label';
                label.textContent = i;

                const barWrapper = document.createElement('div');
                barWrapper.className = 'probability-bar-wrapper';

                const bar = document.createElement('div');
                bar.className = 'probability-bar';
                const percentage = probabilities[i] * 100;
                bar.style.width = `${percentage}%`;
                bar.style.animationDelay = `${i * 0.05}s`;

                if (i === this.cnnData.predicted_digit) {
                    bar.classList.add('predicted');
                }

                const value = document.createElement('div');
                value.className = 'probability-value';
                value.textContent = `${percentage.toFixed(1)}%`;

                barWrapper.appendChild(bar);
                barContainer.appendChild(label);
                barContainer.appendChild(barWrapper);
                barContainer.appendChild(value);
                container.appendChild(barContainer);
            }
        } else {
            // Intermediate dense layer - show neuron activations
            const maxActivations = Math.min(values.length, 20);
            const sortedIndices = values
                .map((val, idx) => ({ val, idx }))
                .sort((a, b) => b.val - a.val)
                .slice(0, maxActivations);

            sortedIndices.forEach(({ val, idx }, i) => {
                const neuronDiv = document.createElement('div');
                neuronDiv.className = 'neuron-activation';
                neuronDiv.style.animationDelay = `${i * 0.03}s`;

                const intensity = Math.min(Math.max(val, 0), 1);
                neuronDiv.style.background = `rgba(0, 217, 255, ${intensity})`;
                neuronDiv.style.width = `${intensity * 100}%`;

                neuronDiv.textContent = `N${idx}: ${val.toFixed(2)}`;
                container.appendChild(neuronDiv);
            });
        }

        return container;
    }

    nextLayer() {
        console.log('nextLayer called', this.currentLayerIndex);
        if (!this.cnnData) {
            console.log('No CNN data');
            return;
        }
        // Total layers includes input (0) + all model layers
        const totalLayers = this.cnnData.layers.length + 1;
        console.log('Total layers:', totalLayers, 'Current:', this.currentLayerIndex);
        if (this.currentLayerIndex < totalLayers - 1) {
            this.currentLayerIndex++;
            console.log('Moving to layer:', this.currentLayerIndex);
            this.renderCNNVisualization();
        } else {
            console.log('Already at last layer');
        }
    }

    previousLayer() {
        console.log('previousLayer called', this.currentLayerIndex);
        if (!this.cnnData) {
            console.log('No CNN data');
            return;
        }
        if (this.currentLayerIndex > 0) {
            this.currentLayerIndex--;
            console.log('Moving to layer:', this.currentLayerIndex);
            this.renderCNNVisualization();
        } else {
            console.log('Already at first layer');
        }
    }

    togglePlayAnimation() {
        const playBtn = document.getElementById('play-btn');
        if (!playBtn) return;

        if (this.isPlaying) {
            this.stopPlayAnimation();
        } else {
            this.startPlayAnimation();
        }
    }

    startPlayAnimation() {
        this.isPlaying = true;
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.innerHTML = 'Pause';
        }

        this.playInterval = setInterval(() => {
            const totalLayers = this.cnnData.layers.length + 1;
            if (this.currentLayerIndex < totalLayers - 1) {
                this.nextLayer();
            } else {
                this.stopPlayAnimation();
            }
        }, 2000);
    }

    stopPlayAnimation() {
        this.isPlaying = false;
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
            playBtn.innerHTML = 'Play';
        }

        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    // Interactive Challenge Functions
    initInteractiveChallenges() {
        // Simplified - no progress tracking needed
    }
}

// Global slideshow state
let currentSlide = 1;
const totalSlides = 5;

// Slideshow navigation functions
function showSlide(slideNumber) {
    // Hide all slides
    for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById(`slide-${i}`);
        const dot = document.querySelector(`[data-slide="${i}"]`);
        if (slide) slide.classList.remove('active');
        if (dot) dot.classList.remove('active');
    }

    // Show current slide
    const currentSlideEl = document.getElementById(`slide-${slideNumber}`);
    const currentDot = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');

    // Update button states
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) prevBtn.disabled = slideNumber === 1;
    if (nextBtn) {
        if (slideNumber === totalSlides) {
            nextBtn.textContent = 'Restart';
        } else {
            nextBtn.textContent = 'Next →';
        }
    }

    currentSlide = slideNumber;
}

function nextSlide() {
    if (currentSlide === totalSlides) {
        // Restart from beginning
        showSlide(1);
    } else {
        showSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        showSlide(currentSlide - 1);
    }
}

// Interactive Challenge Functions
let pixelData = [];
let foundHighPixel = false;
let highPixelCount = 0;

function initPixelChallenge() {
    const grid = document.getElementById('mini-pixel-grid');
    const canvas28 = document.getElementById('digit-28x28');
    const status = document.getElementById('challenge-1-status');
    if (!grid) return;

    grid.innerHTML = '';
    pixelData = [];
    foundHighPixel = false;
    highPixelCount = 0;

    // Use real drawn digit if available
    if (window.cnnVisualizationData && window.cnnVisualizationData.input_image) {
        // Convert base64 image to pixel data
        const img = new Image();
        img.onload = () => {
            // Draw 28x28 preview
            if (canvas28) {
                const ctx28 = canvas28.getContext('2d');
                ctx28.fillStyle = 'white';
                ctx28.fillRect(0, 0, 200, 200);
                ctx28.drawImage(img, 0, 0, 200, 200);
            }

            // Sample for 5x5 grid
            const canvas = document.createElement('canvas');
            canvas.width = 28;
            canvas.height = 28;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, 28, 28);
            const imageData = ctx.getImageData(0, 0, 28, 28);

            // Sample 5x5 grid from the 28x28 image (every ~5.6 pixels)
            const sampledPixels = [];
            for (let y = 0; y < 5; y++) {
                for (let x = 0; x < 5; x++) {
                    const srcX = Math.floor(x * 5.6);
                    const srcY = Math.floor(y * 5.6);
                    const idx = (srcY * 28 + srcX) * 4;
                    // Get grayscale value (assuming it's already grayscale)
                    const value = 255 - imageData.data[idx]; // Invert because our canvas is black on white
                    sampledPixels.push(value);
                }
            }

            renderPixelGrid(sampledPixels);
            status.textContent = `Your digit's pixels! Find one > 150`;
        };
        img.src = window.cnnVisualizationData.input_image;
    } else {
        // Fallback: Generate random grid
        if (canvas28) {
            const ctx28 = canvas28.getContext('2d');
            ctx28.fillStyle = 'white';
            ctx28.fillRect(0, 0, 200, 200);
            ctx28.fillStyle = 'black';
            ctx28.font = 'bold 100px Arial';
            ctx28.textAlign = 'center';
            ctx28.textBaseline = 'middle';
            ctx28.fillText('?', 100, 100);
        }

        const sampledPixels = [];
        const hasHighPixel = Math.random() > 0.3;
        for (let i = 0; i < 25; i++) {
            let value;
            if (i === 12 && hasHighPixel) {
                value = Math.floor(Math.random() * 55) + 201;
            } else {
                value = Math.floor(Math.random() * 256);
            }
            sampledPixels.push(value);
        }
        renderPixelGrid(sampledPixels);
        status.textContent = 'Click pixels to explore!';
    }
}

function renderPixelGrid(pixels) {
    const grid = document.getElementById('mini-pixel-grid');
    grid.innerHTML = '';

    pixels.forEach((value) => {
        const cell = document.createElement('div');
        cell.className = 'pixel-cell';
        const intensity = value / 255;
        cell.style.background = `rgb(${value}, ${value}, ${value})`;

        cell.addEventListener('click', () => {
            if (cell.classList.contains('revealed')) return;

            cell.classList.add('revealed');
            cell.textContent = value;
            cell.style.background = intensity > 0.5 ? '#e3f2fd' : '#f8f9fa';

            if (value > 150 && !foundHighPixel) {
                foundHighPixel = true;
                highPixelCount++;
                document.getElementById('challenge-1-status').textContent = `Found it! Value: ${value} ✓ (${highPixelCount} found)`;
                document.getElementById('challenge-1-status').className = 'challenge-status correct';
            } else if (value > 150) {
                highPixelCount++;
                document.getElementById('challenge-1-status').textContent = `Another one! Value: ${value} ✓ (${highPixelCount} found)`;
            } else if (!foundHighPixel) {
                document.getElementById('challenge-1-status').textContent = `${value} - Keep looking for > 150!`;
                document.getElementById('challenge-1-status').className = 'challenge-status';
            }
        });

        grid.appendChild(cell);
    });
}

function initFilterChallenge() {
    const preview = document.getElementById('filter-preview');
    if (!preview) return;

    preview.innerHTML = '';

    // Show actual feature maps from the first conv layer if available
    if (window.cnnVisualizationData && window.cnnVisualizationData.layers) {
        // Find first conv layer
        const convLayer = window.cnnVisualizationData.layers.find(l => l.type === 'conv');
        if (convLayer && convLayer.feature_maps) {
            // Show first 8 feature maps
            const maps = convLayer.feature_maps.slice(0, 8);
            maps.forEach(mapUrl => {
                const img = document.createElement('img');
                img.src = mapUrl;
                img.alt = 'Feature map';
                preview.appendChild(img);
            });
        }
    }
}

function checkFilter(type, element) {
    const status = document.getElementById('challenge-2-status');
    const buttons = document.querySelectorAll('.filter-option');

    // Clear previous attempts
    buttons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
    });

    if (type === 'vertical') {
        status.textContent = 'Correct! Vertical filters detect vertical edges like │';
        status.className = 'challenge-status correct';
        element.classList.add('correct');
    } else {
        status.textContent = 'Not quite! Think about which direction the lines go. Try again!';
        status.className = 'challenge-status incorrect';
        element.classList.add('incorrect');
    }
}

let poolingValues = [];
let poolingAnswer = 0;

function initPoolingChallenge() {
    const grid = document.getElementById('pool-grid');
    const input = document.getElementById('pool-answer');
    const status = document.getElementById('challenge-3-status');

    if (!grid) return;

    // Generate 4 random values (0-9)
    poolingValues = [];
    for (let i = 0; i < 4; i++) {
        poolingValues.push(Math.floor(Math.random() * 10));
    }
    poolingAnswer = Math.max(...poolingValues);

    // Render grid
    grid.innerHTML = '';
    poolingValues.forEach(value => {
        const cell = document.createElement('div');
        cell.className = 'pool-cell';
        cell.textContent = value;
        grid.appendChild(cell);
    });

    // Reset input
    input.value = '';
    input.style.borderColor = '#ddd';
    status.textContent = 'Enter the max value';
    status.className = 'challenge-status';
}

function checkPooling() {
    const input = document.getElementById('pool-answer');
    const status = document.getElementById('challenge-3-status');
    const answer = parseInt(input.value);

    if (!answer || isNaN(answer)) {
        status.textContent = 'Enter a number!';
        status.className = 'challenge-status';
        input.style.borderColor = '#ddd';
        return;
    }

    if (answer === poolingAnswer) {
        status.textContent = `Perfect! Max of {${poolingValues.join(',')}} = ${poolingAnswer} ✓`;
        status.className = 'challenge-status correct';
        input.style.borderColor = '#27ae60';

        // Generate new challenge after 2 seconds
        setTimeout(() => {
            initPoolingChallenge();
            status.textContent = 'Try another one!';
        }, 2000);
    } else {
        status.textContent = `Try again! Hint: Look for the biggest number.`;
        status.className = 'challenge-status incorrect';
        input.style.borderColor = '#e74c3c';
    }
}

let neuronsCorrect = false;
let leftNeurons = 0;
let rightNeurons = 0;
let correctConnections = 0;

function initNeuronChallenge() {
    // Random number of neurons (2-5 on left, 2-5 on right)
    leftNeurons = Math.floor(Math.random() * 4) + 2;  // 2-5
    rightNeurons = Math.floor(Math.random() * 4) + 2; // 2-5
    correctConnections = leftNeurons * rightNeurons;

    neuronsCorrect = false;

    // Update question
    const question = document.getElementById('neuron-question');
    if (question) {
        question.textContent = `Dense layers connect EVERY neuron. How many connections from ${leftNeurons} to ${rightNeurons}?`;
    }

    // Render neurons
    const visual = document.getElementById('neuron-visual');
    if (!visual) return;

    visual.innerHTML = '';

    // Left layer
    const leftLayer = document.createElement('div');
    leftLayer.className = 'neuron-layer';
    for (let i = 0; i < leftNeurons; i++) {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';
        neuron.textContent = '●';
        leftLayer.appendChild(neuron);
    }
    visual.appendChild(leftLayer);

    // Connection space
    const connectionSpace = document.createElement('div');
    connectionSpace.className = 'connection-space';
    connectionSpace.id = 'connection-canvas';
    visual.appendChild(connectionSpace);

    // Right layer
    const rightLayer = document.createElement('div');
    rightLayer.className = 'neuron-layer';
    for (let i = 0; i < rightNeurons; i++) {
        const neuron = document.createElement('div');
        neuron.className = 'neuron';
        neuron.textContent = '●';
        rightLayer.appendChild(neuron);
    }
    visual.appendChild(rightLayer);

    // Generate answer options (correct answer + 2 wrong ones)
    const answers = new Set([correctConnections]);
    while (answers.size < 3) {
        const wrong = correctConnections + Math.floor(Math.random() * 10) - 5;
        if (wrong > 0) answers.add(wrong);
    }
    const shuffled = Array.from(answers).sort(() => Math.random() - 0.5);

    // Render buttons
    const answersDiv = document.getElementById('neuron-answers');
    if (answersDiv) {
        answersDiv.innerHTML = '';
        shuffled.forEach(num => {
            const btn = document.createElement('button');
            btn.className = 'answer-btn';
            btn.textContent = num;
            btn.onclick = () => checkNeurons(num, btn);
            answersDiv.appendChild(btn);
        });
    }

    // Reset status
    const status = document.getElementById('challenge-4-status');
    if (status) {
        status.textContent = 'Count carefully!';
        status.className = 'challenge-status';
    }
}

function checkNeurons(answer, element) {
    const status = document.getElementById('challenge-4-status');
    const buttons = document.querySelectorAll('.answer-btn');

    // Clear previous attempts
    buttons.forEach(btn => btn.classList.remove('correct', 'incorrect'));

    if (answer === correctConnections) {
        status.textContent = `Correct! ${leftNeurons} × ${rightNeurons} = ${correctConnections} connections ✓`;
        status.className = 'challenge-status correct';
        element.classList.add('correct');
        if (!neuronsCorrect) {
            drawConnections();
            neuronsCorrect = true;
        }

        // Generate new challenge after 2 seconds
        setTimeout(() => {
            initNeuronChallenge();
            status.textContent = 'Try another one!';
        }, 2500);
    } else {
        status.textContent = `Not quite! Hint: Multiply ${leftNeurons} × ${rightNeurons}. Try again!`;
        status.className = 'challenge-status incorrect';
        element.classList.add('incorrect');
    }
}

function drawConnections() {
    const canvas = document.getElementById('connection-canvas');
    if (!canvas) return;

    // Clear any existing SVG
    canvas.innerHTML = '';

    // Create SVG for connections
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '80');
    svg.setAttribute('height', '150');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    // Calculate positions based on number of neurons
    const leftPositions = [];
    const rightPositions = [];
    const leftSpacing = 150 / (leftNeurons + 1);
    const rightSpacing = 150 / (rightNeurons + 1);

    for (let i = 0; i < leftNeurons; i++) {
        leftPositions.push((i + 1) * leftSpacing);
    }
    for (let i = 0; i < rightNeurons; i++) {
        rightPositions.push((i + 1) * rightSpacing);
    }

    // Draw all connections
    leftPositions.forEach(y1 => {
        rightPositions.forEach(y2 => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', '0');
            line.setAttribute('y1', y1);
            line.setAttribute('x2', '80');
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', '#3498db');
            line.setAttribute('stroke-width', '1.5');
            line.setAttribute('opacity', '0.6');
            svg.appendChild(line);
        });
    });

    canvas.appendChild(svg);
}

let speedDigit = null;

function initSpeedChallenge() {
    const canvas = document.getElementById('speed-canvas');
    const optionsDiv = document.getElementById('speed-options');
    const status = document.getElementById('challenge-5-status');

    if (!canvas || !optionsDiv) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 140, 140);

    // Use the actual drawn digit if available
    if (window.cnnVisualizationData) {
        speedDigit = window.cnnVisualizationData.predicted_digit;

        // Draw the user's actual digit
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, 140, 140);
        };
        img.src = window.cnnVisualizationData.input_image;

        status.textContent = "What digit did YOU draw?";
    } else {
        // Fallback: Generate random digit
        speedDigit = Math.floor(Math.random() * 10);
        ctx.fillStyle = 'black';
        ctx.font = 'bold 80px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(speedDigit, 70, 70);

        status.textContent = "What digit is this?";
    }

    // Create answer buttons (0-9) but only show 5 random including correct
    const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const wrongDigits = allDigits.filter(d => d !== speedDigit);
    const shuffled = wrongDigits.sort(() => Math.random() - 0.5).slice(0, 4);
    const options = [...shuffled, speedDigit].sort(() => Math.random() - 0.5);

    optionsDiv.innerHTML = '';
    options.forEach(digit => {
        const btn = document.createElement('button');
        btn.className = 'speed-digit';
        btn.textContent = digit;
        btn.onclick = () => checkSpeed(digit);
        optionsDiv.appendChild(btn);
    });
}

function checkSpeed(guess) {
    const status = document.getElementById('challenge-5-status');
    const buttons = document.querySelectorAll('.speed-digit');

    // Clear previous attempts
    buttons.forEach(btn => btn.classList.remove('correct', 'incorrect'));

    if (guess === speedDigit) {
        const confidence = window.cnnVisualizationData ?
            (window.cnnVisualizationData.confidence * 100).toFixed(1) :
            '95';

        status.textContent = `Perfect! The network was ${confidence}% confident it's a ${speedDigit} ✓`;
        status.className = 'challenge-status correct';
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === speedDigit) {
                btn.classList.add('correct');
            }
        });

        // Show probabilities if available
        if (window.cnnVisualizationData && window.cnnVisualizationData.all_probabilities) {
            const probs = window.cnnVisualizationData.all_probabilities;
            const top3 = probs
                .map((p, i) => ({ digit: i, prob: p }))
                .sort((a, b) => b.prob - a.prob)
                .slice(0, 3);

            setTimeout(() => {
                status.textContent = `Top 3: ${top3.map(t => `${t.digit}(${(t.prob*100).toFixed(0)}%)`).join(', ')}`;
            }, 2000);
        }
    } else {
        status.textContent = `Not quite! Try again!`;
        status.className = 'challenge-status incorrect';
        buttons.forEach(btn => {
            if (parseInt(btn.textContent) === guess) {
                btn.classList.add('incorrect');
            }
        });
    }
}

// Modified showSlide to initialize challenges
const originalShowSlide = showSlide;
function showSlide(slideNumber) {
    // Call original
    for (let i = 1; i <= totalSlides; i++) {
        const slide = document.getElementById(`slide-${i}`);
        const dot = document.querySelector(`[data-slide="${i}"]`);
        if (slide) slide.classList.remove('active');
        if (dot) dot.classList.remove('active');
    }

    const currentSlideEl = document.getElementById(`slide-${slideNumber}`);
    const currentDot = document.querySelector(`[data-slide="${slideNumber}"]`);
    if (currentSlideEl) currentSlideEl.classList.add('active');
    if (currentDot) currentDot.classList.add('active');

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn) prevBtn.disabled = slideNumber === 1;
    if (nextBtn) {
        if (slideNumber === totalSlides) {
            nextBtn.textContent = 'Restart';
        } else {
            nextBtn.textContent = 'Next →';
        }
    }

    currentSlide = slideNumber;

    // Initialize challenges when entering their slide
    if (slideNumber === 1) {
        setTimeout(initPixelChallenge, 100);
    } else if (slideNumber === 2) {
        setTimeout(initFilterChallenge, 100);
    } else if (slideNumber === 3) {
        setTimeout(initPoolingChallenge, 100);
    } else if (slideNumber === 4) {
        setTimeout(initNeuronChallenge, 100);
    } else if (slideNumber === 5) {
        setTimeout(initSpeedChallenge, 100);
    }
}

// Add click handlers to progress dots and keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.progress-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const slideNum = parseInt(dot.getAttribute('data-slide'));
            showSlide(slideNum);
        });
    });

    // Keyboard navigation (left/right arrows) when modal is open
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('cnn-visualization-modal');
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        }
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const recognizer = new DigitRecognizer();
    window.recognizer = recognizer; // Make it globally accessible
    recognizer.initInteractiveChallenges();
});