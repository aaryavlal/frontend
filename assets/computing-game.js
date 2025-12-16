// Game State
let currentScenario = null;
let builtComponents = [];
let componentIdCounter = 0;
let autoFillEnabled = true;
let challengeMode = false;
let currentBudget = 1000;
let maxLatency = 100;

// Component Requirements with performance characteristics
const COMPONENT_SPECS = {
    core: {
        needs: 0,
        icon: '⚙️',
        label: 'Core',
        cost: 10,
        throughput: 1,
        latency: 1,
        parallelism: 1
    },
    processor: {
        needs: 6,
        needsType: 'core',
        icon: '🔲',
        label: 'Processor',
        cost: 100,
        throughput: 6,
        latency: 2,
        parallelism: 6
    },
    computer: {
        needs: 1,
        needsType: 'processor',
        icon: '💻',
        label: 'Computer',
        cost: 150,
        throughput: 10,
        latency: 5,
        parallelism: 1
    },
    server: {
        needs: 10,
        needsType: 'processor',
        icon: '🖥️',
        label: 'Server',
        cost: 1200,
        throughput: 100,
        latency: 10,
        parallelism: 10
    },
    cloud: {
        needs: 10,
        needsType: 'server',
        icon: '☁️',
        label: 'Cloud',
        cost: 15000,
        throughput: 1000,
        latency: 50,
        parallelism: 100
    }
};

// Scenarios
const SCENARIOS = [
    // Sequential scenarios
    {
        text: "Process a single large video file for rendering",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)",
        parallelFraction: 0.2,
        workload: 100,
        challengeBudget: 250,
        challengeLatency: 15
    },
    {
        text: "Execute a complex calculation that must be done step-by-step",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)",
        parallelFraction: 0.1,
        workload: 80,
        challengeBudget: 200,
        challengeLatency: 8
    },
    {
        text: "Write data to a single database in a specific order",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)",
        parallelFraction: 0.15,
        workload: 60,
        challengeBudget: 180,
        challengeLatency: 12
    },
    {
        text: "Run a script that processes files one at a time",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)",
        parallelFraction: 0.25,
        workload: 70,
        challengeBudget: 220,
        challengeLatency: 10
    },
    {
        text: "Edit a single document with complex formatting",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)",
        parallelFraction: 0.1,
        workload: 50,
        challengeBudget: 170,
        challengeLatency: 6
    },
    {
        text: "Debug a program by stepping through code line by line",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)",
        parallelFraction: 0.05,
        workload: 40,
        challengeBudget: 160,
        challengeLatency: 5
    },

    // Parallel scenarios
    {
        text: "Train a deep learning model with massive datasets",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.85,
        workload: 500,
        challengeBudget: 1800,
        challengeLatency: 25
    },
    {
        text: "Run multiple independent simulations simultaneously",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.95,
        workload: 400,
        challengeBudget: 1600,
        challengeLatency: 20
    },
    {
        text: "Compile a large codebase using all available CPU cores",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.75,
        workload: 300,
        challengeBudget: 1400,
        challengeLatency: 18
    },
    {
        text: "Process multiple images with the same filter simultaneously",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.9,
        workload: 350,
        challengeBudget: 1500,
        challengeLatency: 22
    },
    {
        text: "Analyze weather patterns across different regions at once",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.8,
        workload: 450,
        challengeBudget: 2000,
        challengeLatency: 30
    },
    {
        text: "Run scientific simulations with independent parameters",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.9,
        workload: 400,
        challengeBudget: 1700,
        challengeLatency: 24
    },
    {
        text: "Encode multiple video files to different formats simultaneously",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.85,
        workload: 500,
        challengeBudget: 1900,
        challengeLatency: 28
    },
    {
        text: "Process batch jobs that can run independently",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)",
        parallelFraction: 0.95,
        workload: 380,
        challengeBudget: 1550,
        challengeLatency: 19
    },

    // Distributed scenarios
    {
        text: "Handle millions of user requests from around the world",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.98,
        workload: 10000,
        challengeBudget: 18000,
        challengeLatency: 80
    },
    {
        text: "Render frames of an animated movie across multiple machines",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.95,
        workload: 8000,
        challengeBudget: 22000,
        challengeLatency: 100
    },
    {
        text: "Process real-time data streams from IoT devices worldwide",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.92,
        workload: 12000,
        challengeBudget: 20000,
        challengeLatency: 70
    },
    {
        text: "Serve content to users across multiple continents with low latency",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.98,
        workload: 15000,
        challengeBudget: 25000,
        challengeLatency: 50
    },
    {
        text: "Run a global multiplayer game with players in different regions",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.95,
        workload: 9000,
        challengeBudget: 19000,
        challengeLatency: 60
    },
    {
        text: "Index billions of web pages for a search engine",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.97,
        workload: 20000,
        challengeBudget: 35000,
        challengeLatency: 120
    },
    {
        text: "Stream video to millions of concurrent viewers worldwide",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.98,
        workload: 18000,
        challengeBudget: 28000,
        challengeLatency: 65
    },
    {
        text: "Analyze petabytes of data from sensors across the globe",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.93,
        workload: 25000,
        challengeBudget: 40000,
        challengeLatency: 150
    },
    {
        text: "Process financial transactions from banks around the world",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.9,
        workload: 11000,
        challengeBudget: 21000,
        challengeLatency: 45
    },
    {
        text: "Provide a CDN service for a global e-commerce platform",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.97,
        workload: 16000,
        challengeBudget: 26000,
        challengeLatency: 55
    },
    {
        text: "Run distributed machine learning training across data centers",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.88,
        workload: 14000,
        challengeBudget: 30000,
        challengeLatency: 110
    },
    {
        text: "Manage real-time chat messages for a social network",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)",
        parallelFraction: 0.96,
        workload: 13000,
        challengeBudget: 23000,
        challengeLatency: 75
    }
];

// Tutorial system
let currentTutorialStep = 0;
const tutorialSteps = [
    {
        title: "Welcome to Computing Infrastructure Builder!",
        content: `
            <p>This game teaches you about different types of computing architectures and when to use them.</p>
            <p>Learn the difference between <span class="tutorial-highlight">Sequential</span>, <span class="tutorial-highlight">Parallel</span>, and <span class="tutorial-highlight">Distributed</span> computing!</p>
        `
    },
    {
        title: "How to Play",
        content: `
            <div class="tutorial-step">
                <strong>Step 1:</strong> Read the scenario presented at the top
            </div>
            <div class="tutorial-step">
                <strong>Step 2:</strong> Drag components from the left panel to build your infrastructure
            </div>
            <div class="tutorial-step">
                <strong>Step 3:</strong> Build components hierarchically (cores → processors → computers/servers → cloud)
            </div>
            <div class="tutorial-step">
                <strong>Step 4:</strong> Click "Check Efficiency" to see how well you did!
            </div>
        `
    },
    {
        title: "Understanding Components",
        content: `
            <p><strong>⚙️ Core:</strong> Basic processing unit - the building block</p>
            <p><strong>🔲 Processor:</strong> Contains 6 cores working together</p>
            <p><strong>💻 Computer:</strong> One processor - good for sequential tasks</p>
            <p><strong>🖥️ Server:</strong> 10 processors - perfect for parallel tasks</p>
            <p><strong>☁️ Cloud:</strong> 10 servers distributed globally - ideal for distributed tasks</p>
        `
    },
    {
        title: "Types of Computing",
        content: `
            <p><span class="tutorial-highlight">Sequential:</span> Tasks that must be done step-by-step (e.g., video rendering, single calculations)</p>
            <p><span class="tutorial-highlight">Parallel:</span> Tasks that can be split across multiple processors (e.g., training ML models, batch processing)</p>
            <p><span class="tutorial-highlight">Distributed:</span> Tasks spread across the globe (e.g., serving millions of users, streaming video worldwide)</p>
        `
    },
    {
        title: "Performance Metrics",
        content: `
            <p><strong>Throughput:</strong> How much work can be processed per second</p>
            <p><strong>Latency:</strong> Time delay for requests (lower is better)</p>
            <p><strong>Cost Efficiency:</strong> Resource cost vs performance</p>
            <p><strong>Utilization:</strong> How efficiently you're using resources</p>
            <p>The right panel shows these metrics in real-time as you build!</p>
        `
    },
    {
        title: "Challenge Mode",
        content: `
            <p>Ready for a challenge? Toggle <span class="tutorial-highlight">Challenge Mode</span> at the top!</p>
            <p>You'll need to meet budget and latency constraints for each scenario.</p>
            <p>This tests your ability to build cost-effective, performant infrastructure!</p>
        `
    },
    {
        title: "Ready to Start!",
        content: `
            <p>You're all set! Here are some tips:</p>
            <ul>
                <li>Read each scenario carefully</li>
                <li>Think about whether the task is sequential, parallel, or distributed</li>
                <li>Watch the performance metrics as you build</li>
                <li>Learn from the feedback - it explains the concepts!</li>
            </ul>
            <p><strong>Good luck building efficient infrastructure!</strong></p>
        `
    }
];

// Cookie helpers
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length);
        }
    }
    return null;
}

// Tutorial functions
function showTutorial() {
    const overlay = document.getElementById('tutorial-overlay');
    overlay.classList.add('active');
    currentTutorialStep = 0;
    renderTutorialStep();
}

function hideTutorial() {
    const overlay = document.getElementById('tutorial-overlay');
    overlay.classList.remove('active');
    setCookie('computingGameTutorialSeen', 'true', 365);
}

function renderTutorialStep() {
    const step = tutorialSteps[currentTutorialStep];
    const content = document.getElementById('tutorial-content');

    const isFirst = currentTutorialStep === 0;
    const isLast = currentTutorialStep === tutorialSteps.length - 1;

    content.innerHTML = `
        <h2>${step.title}</h2>
        ${step.content}
        <div class="tutorial-nav">
            <div class="tutorial-progress">Step ${currentTutorialStep + 1} of ${tutorialSteps.length}</div>
            <div class="tutorial-buttons">
                ${!isFirst ? '<button class="btn btn-secondary" onclick="previousTutorialStep()">Previous</button>' : ''}
                ${!isLast ? '<button class="btn btn-primary" onclick="nextTutorialStep()">Next</button>' : ''}
                ${isLast ? '<button class="btn btn-primary" onclick="hideTutorial()">Start Playing!</button>' : ''}
                <button class="btn btn-secondary" onclick="hideTutorial()">Skip</button>
            </div>
        </div>
    `;
}

function nextTutorialStep() {
    if (currentTutorialStep < tutorialSteps.length - 1) {
        currentTutorialStep++;
        renderTutorialStep();
    }
}

function previousTutorialStep() {
    if (currentTutorialStep > 0) {
        currentTutorialStep--;
        renderTutorialStep();
    }
}

// Initialize game
function initGame() {
    loadNewScenario();
    setupEventListeners();

    // Check if this is the first visit
    if (!getCookie('computingGameTutorialSeen')) {
        // Show tutorial after a brief delay
        setTimeout(showTutorial, 500);
    }
}

// Load a new scenario
function loadNewScenario() {
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    document.getElementById('scenario-text').textContent = currentScenario.text;
    document.getElementById('scenario-type').textContent = `Hint: Think about ${currentScenario.type} processing`;

    // Update challenge constraints for the new scenario
    if (challengeMode && currentScenario) {
        const budgetVariation = Math.floor(Math.random() * 41) - 20; // -20 to +20
        const latencyVariation = Math.floor(Math.random() * 7) - 3; // -3 to +3

        currentBudget = currentScenario.challengeBudget + budgetVariation;
        maxLatency = currentScenario.challengeLatency + latencyVariation;

        document.getElementById('budget-value').textContent = `$${currentBudget}`;
        document.getElementById('latency-limit').textContent = `${maxLatency}ms`;
    }

    clearWorkspace();
}

// Setup event listeners
function setupEventListeners() {
    const workspace = document.getElementById('workspace');

    // Drag and drop for component palette
    document.querySelectorAll('.component-item').forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
    });

    workspace.addEventListener('dragover', handleDragOver);
    workspace.addEventListener('drop', handleDrop);
    workspace.addEventListener('dragleave', handleDragLeave);

    // Buttons
    document.getElementById('autofill-btn').addEventListener('click', toggleAutoFill);
    document.getElementById('check-btn').addEventListener('click', checkEfficiency);
    document.getElementById('clear-btn').addEventListener('click', clearWorkspace);
    document.getElementById('new-scenario-btn').addEventListener('click', loadNewScenario);
    document.getElementById('challenge-toggle').addEventListener('change', toggleChallengeMode);
}

// Toggle challenge mode
function toggleChallengeMode() {
    challengeMode = document.getElementById('challenge-toggle').checked;
    const challengeDisplay = document.getElementById('challenge-display');
    challengeDisplay.style.display = challengeMode ? 'block' : 'none';

    if (challengeMode && currentScenario) {
        // Use scenario-specific constraints with small random variation
        const budgetVariation = Math.floor(Math.random() * 41) - 20; // -20 to +20
        const latencyVariation = Math.floor(Math.random() * 7) - 3; // -3 to +3

        currentBudget = currentScenario.challengeBudget + budgetVariation;
        maxLatency = currentScenario.challengeLatency + latencyVariation;

        document.getElementById('budget-value').textContent = `$${currentBudget}`;
        document.getElementById('latency-limit').textContent = `${maxLatency}ms`;
    }

    updateMetrics();
}

// Calculate infrastructure metrics
function calculateMetrics() {
    let totalCost = 0;
    let totalThroughput = 0;
    let avgLatency = 0;
    let totalParallelism = 0;

    builtComponents.forEach(component => {
        const spec = COMPONENT_SPECS[component.type];
        totalCost += spec.cost;
        totalThroughput += spec.throughput;
        avgLatency += spec.latency;
        totalParallelism += spec.parallelism;
    });

    if (builtComponents.length > 0) {
        avgLatency = avgLatency / builtComponents.length;
    }

    // Calculate resource utilization (based on workload vs capacity)
    const workloadDemand = currentScenario ? currentScenario.workload : 100;
    const utilization = Math.min(100, (workloadDemand / Math.max(1, totalThroughput)) * 100);

    return {
        cost: totalCost,
        throughput: totalThroughput,
        latency: avgLatency,
        utilization: utilization,
        parallelism: totalParallelism
    };
}

// Calculate Amdahl's Law speedup
function calculateAmdahlSpeedup(parallelFraction, processors) {
    // Speedup = 1 / ((1 - P) + (P / N))
    // P = parallel fraction, N = number of processors
    const sequentialFraction = 1 - parallelFraction;
    const speedup = 1 / (sequentialFraction + (parallelFraction / processors));
    return speedup;
}

// Update metrics display
function updateMetrics() {
    const metrics = calculateMetrics();

    // Update throughput
    document.getElementById('throughput-value').textContent = `${metrics.throughput.toFixed(0)}/s`;
    const throughputPercent = Math.min(100, (metrics.throughput / 1000) * 100);
    document.getElementById('throughput-bar').style.width = `${throughputPercent}%`;

    // Update latency
    document.getElementById('latency-value').textContent = `${metrics.latency.toFixed(0)}ms`;
    const latencyPercent = Math.min(100, (metrics.latency / 100) * 100);
    document.getElementById('latency-bar').style.width = `${latencyPercent}%`;

    // Update cost
    document.getElementById('cost-value').textContent = `$${metrics.cost}`;
    const costPercent = challengeMode ?
        Math.min(100, (metrics.cost / currentBudget) * 100) :
        Math.min(100, (metrics.cost / 20000) * 100);
    document.getElementById('cost-bar').style.width = `${costPercent}%`;

    // Update utilization
    document.getElementById('utilization-value').textContent = `${metrics.utilization.toFixed(0)}%`;
    document.getElementById('utilization-bar').style.width = `${metrics.utilization}%`;

    // Update Amdahl's Law section if applicable
    if (currentScenario && metrics.parallelism > 1) {
        const speedup = calculateAmdahlSpeedup(currentScenario.parallelFraction, metrics.parallelism);
        const theoreticalMax = 1 / (1 - currentScenario.parallelFraction);
        const efficiency = (speedup / metrics.parallelism) * 100;

        document.getElementById('amdahl-section').style.display = 'block';
        document.getElementById('amdahl-content').innerHTML = `
            <p style="margin: 3px 0;"><strong>Parallel Portion:</strong> ${(currentScenario.parallelFraction * 100).toFixed(0)}%</p>
            <p style="margin: 3px 0;"><strong>Processors:</strong> ${metrics.parallelism}</p>
            <p style="margin: 3px 0;"><strong>Actual Speedup:</strong> ${speedup.toFixed(2)}x</p>
            <p style="margin: 3px 0;"><strong>Theoretical Max:</strong> ${theoreticalMax.toFixed(2)}x</p>
            <p style="margin: 3px 0;"><strong>Efficiency:</strong> ${efficiency.toFixed(1)}%</p>
        `;
    } else {
        document.getElementById('amdahl-section').style.display = 'none';
    }
}

// Toggle auto-fill feature
function toggleAutoFill() {
    autoFillEnabled = !autoFillEnabled;
    const btn = document.getElementById('autofill-btn');
    btn.textContent = `Auto-fill: ${autoFillEnabled ? 'ON' : 'OFF'}`;
    btn.className = autoFillEnabled ? 'btn btn-tertiary' : 'btn btn-secondary';
}

// Drag handlers
let draggedType = null;

function handleDragStart(e) {
    draggedType = e.currentTarget.dataset.type;
    e.dataTransfer.effectAllowed = 'copy';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (e.currentTarget === e.target) {
        e.currentTarget.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (draggedType) {
        addComponent(draggedType);
        draggedType = null;
    }
}

// Component management
function addComponent(type) {
    const id = componentIdCounter++;
    const spec = COMPONENT_SPECS[type];
    const component = {
        id: id,
        type: type,
        children: []
    };

    // Auto-fill with required components if enabled
    if (autoFillEnabled && spec.needs > 0 && spec.needsType) {
        for (let i = 0; i < spec.needs; i++) {
            component.children.push(spec.needsType);
        }
    }

    builtComponents.push(component);
    renderWorkspace();
}

function deleteComponent(id) {
    builtComponents = builtComponents.filter(c => c.id !== id);
    renderWorkspace();
}

function addChildToComponent(parentId, childType) {
    const parent = builtComponents.find(c => c.id === parentId);
    if (parent) {
        parent.children.push(childType);
        renderWorkspace();
    }
}

function isComponentComplete(component) {
    const spec = COMPONENT_SPECS[component.type];
    if (spec.needs === 0) return true;

    const childCount = component.children.filter(c => c === spec.needsType).length;
    return childCount >= spec.needs;
}

function renderWorkspace() {
    const workspace = document.getElementById('workspace');
    workspace.innerHTML = '';

    builtComponents.forEach(component => {
        const elem = createComponentElement(component);
        workspace.appendChild(elem);
    });

    updateMetrics();
}

function createComponentElement(component) {
    const div = document.createElement('div');
    div.className = 'built-component';
    div.classList.add(isComponentComplete(component) ? 'complete' : 'incomplete');

    const spec = COMPONENT_SPECS[component.type];

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×';
    deleteBtn.onclick = () => deleteComponent(component.id);
    div.appendChild(deleteBtn);

    // Create header
    const header = document.createElement('div');
    header.className = 'component-header';
    header.innerHTML = `<span style="font-size: 24px;">${spec.icon}</span><br>${spec.label}`;
    div.appendChild(header);

    // Create children slots if needed
    if (spec.needs > 0) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'component-children';

        const childrenCount = component.children.filter(c => c === spec.needsType).length;

        for (let i = 0; i < spec.needs; i++) {
            const filled = i < childrenCount;
            const childSpec = COMPONENT_SPECS[spec.needsType];
            const slot = document.createElement('div');
            slot.className = `child-slot ${filled ? 'filled' : ''}`;
            slot.textContent = filled ? `${childSpec.icon} ${childSpec.label}` : '⊘ Empty slot';
            childrenDiv.appendChild(slot);
        }

        div.appendChild(childrenDiv);
    }

    // Click to inspect
    div.addEventListener('click', (e) => {
        if (!e.target.classList.contains('delete-btn')) {
            inspectComponent(component);
        }
    });

    // Allow dropping children
    if (spec.needs > 0) {
        div.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        div.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (draggedType === spec.needsType) {
                const childrenCount = component.children.filter(c => c === spec.needsType).length;
                if (childrenCount < spec.needs) {
                    addChildToComponent(component.id, draggedType);
                }
            }
        });
    }

    return div;
}

function inspectComponent(component) {
    const spec = COMPONENT_SPECS[component.type];
    const complete = isComponentComplete(component);

    let html = `
        <h4>${spec.icon} ${spec.label}</h4>
        <div class="inspector-status ${complete ? 'status-complete' : 'status-incomplete'}">
            <strong>Status:</strong> ${complete ? '✓ Complete' : '⚠ Incomplete'}
        </div>
    `;

    if (spec.needs > 0) {
        const childrenCount = component.children.filter(c => c === spec.needsType).length;
        const childSpec = COMPONENT_SPECS[spec.needsType];
        html += `
            <p><strong>Requirements:</strong><br>
            ${childrenCount} / ${spec.needs} ${childSpec.label}s installed</p>
        `;
    }

    document.getElementById('inspector-content').innerHTML = html;
}

function clearWorkspace() {
    builtComponents = [];
    renderWorkspace();
    document.getElementById('result-display').classList.remove('show');
    document.getElementById('inspector-content').innerHTML = '<p class="inspector-hint">Click on a component to inspect it</p>';
    updateMetrics();
}

function checkEfficiency() {
    // Check if all components are complete
    const allComplete = builtComponents.every(c => isComponentComplete(c));

    if (!allComplete) {
        showResult(0, "Incomplete Infrastructure", "Some components are missing required parts. Complete all components before checking efficiency.", "poor");
        return;
    }

    if (builtComponents.length === 0) {
        showResult(0, "No Infrastructure", "You haven't built anything yet! Drag components to the workspace.", "poor");
        return;
    }

    const metrics = calculateMetrics();

    // Check challenge mode constraints
    if (challengeMode) {
        if (metrics.cost > currentBudget) {
            showResult(0, "Budget Exceeded!", `Your infrastructure costs $${metrics.cost}, but your budget is only $${currentBudget}. Reduce costs to meet the challenge!`, "poor");
            return;
        }
        if (metrics.latency > maxLatency) {
            showResult(0, "Latency Too High!", `Your infrastructure has ${metrics.latency.toFixed(0)}ms latency, but the maximum allowed is ${maxLatency}ms. Optimize for lower latency!`, "poor");
            return;
        }
    }

    // Count components by type
    const componentCounts = {
        cloud: builtComponents.filter(c => c.type === 'cloud').length,
        server: builtComponents.filter(c => c.type === 'server').length,
        computer: builtComponents.filter(c => c.type === 'computer').length,
        processor: builtComponents.filter(c => c.type === 'processor').length,
        core: builtComponents.filter(c => c.type === 'core').length
    };

    // Determine what was built
    const hasCloud = componentCounts.cloud > 0;
    const hasServer = componentCounts.server > 0;
    const hasComputer = componentCounts.computer > 0;

    let efficiency = 0;
    let message = "";
    let details = "";
    let rating = "poor";
    let magnitudeAnalysis = "";

    // Evaluate based on scenario type
    if (currentScenario.type === "sequential") {
        if (hasComputer && !hasServer && !hasCloud) {
            efficiency = 95;
            message = "Perfect Solution!";
            details = "Sequential tasks run best on a single computer. Excellent choice!";
            rating = "excellent";

            // Magnitude analysis for sequential
            if (componentCounts.computer > 1) {
                efficiency = Math.max(70, efficiency - (componentCounts.computer - 1) * 10);
                if (componentCounts.computer <= 2) {
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> You used ${componentCounts.computer} computers. Multiple computers CAN work in parallel, but with significant overhead for coordination. Cost-effectiveness drops as sequential tasks don't benefit from horizontal scaling. Consider: 1 computer costs $${COMPONENT_SPECS.computer.cost}, but ${componentCounts.computer} cost $${metrics.cost} with minimal speedup.`;
                    rating = "good";
                } else if (componentCounts.computer <= 5) {
                    magnitudeAnalysis = `<br><br><strong>⚠️ OVERKILL:</strong> ${componentCounts.computer} computers for a sequential task is excessive! Sequential workloads can only use ONE processor at a time, so ${componentCounts.computer - 1} computers sit mostly idle. You're spending $${metrics.cost} when $${COMPONENT_SPECS.computer.cost} would work just as well. Network coordination overhead makes this ${componentCounts.computer}x more expensive with <1.2x speedup.`;
                    efficiency = Math.max(50, efficiency - (componentCounts.computer - 2) * 15);
                    rating = "poor";
                } else {
                    magnitudeAnalysis = `<br><br><strong>🚨 MASSIVE OVERKILL:</strong> ${componentCounts.computer} computers?! This is absurdly wasteful for sequential processing! Sequential tasks are fundamentally single-threaded - only ONE computer can do the work at any moment. You've spent $${metrics.cost} (${componentCounts.computer}x the cost) for essentially zero speedup gain. This demonstrates a fundamental misunderstanding of sequential vs parallel workloads.`;
                    efficiency = 30;
                    rating = "poor";
                }
            }
        } else if (hasServer && !hasCloud) {
            efficiency = 60;
            message = "Over-engineered";
            details = "A server works, but it's overkill for sequential processing. A single computer is more efficient.";
            rating = "good";

            if (componentCounts.server > 1) {
                efficiency = Math.max(40, efficiency - (componentCounts.server - 1) * 8);
                const serverCost = componentCounts.server * COMPONENT_SPECS.server.cost;
                if (componentCounts.server <= 2) {
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> Using ${componentCounts.server} servers is extremely wasteful for sequential tasks. Each server costs $${COMPONENT_SPECS.server.cost}, totaling $${serverCost} just for servers. Sequential workloads can only use one processor at a time, so extra servers sit completely idle.`;
                } else if (componentCounts.server <= 5) {
                    magnitudeAnalysis = `<br><br><strong>⚠️ SEVERE OVERKILL:</strong> ${componentCounts.server} servers ($${serverCost}) for sequential processing is ludicrous! A server already has ${COMPONENT_SPECS.server.parallelism} processors - but sequential tasks can only use ONE at a time. You're wasting ${componentCounts.server - 1} entire servers. A single $${COMPONENT_SPECS.computer.cost} computer would be ${Math.round(serverCost / COMPONENT_SPECS.computer.cost)}x more cost-effective!`;
                    efficiency = Math.max(25, efficiency - 20);
                } else {
                    magnitudeAnalysis = `<br><br><strong>🚨 CATASTROPHIC WASTE:</strong> ${componentCounts.server} servers?! $${serverCost} for a sequential task that needs $${COMPONENT_SPECS.computer.cost}?! This is a ${Math.round(serverCost / COMPONENT_SPECS.computer.cost)}x cost overrun! Each server has ${COMPONENT_SPECS.server.parallelism} processors, but sequential processing uses ONE processor TOTAL across your entire infrastructure. ${componentCounts.server * COMPONENT_SPECS.server.parallelism - 1} processors sit permanently idle. This would get you fired in industry!`;
                    efficiency = 15;
                }
            }
        } else if (hasCloud) {
            efficiency = 30;
            message = "Massive Overkill";
            details = "Cloud infrastructure is way too much for a sequential task. Use a simple computer instead.";
            rating = "poor";

            if (componentCounts.cloud > 1) {
                const cloudCost = componentCounts.cloud * COMPONENT_SPECS.cloud.cost;
                const wasteMultiplier = Math.round(cloudCost / COMPONENT_SPECS.computer.cost);
                efficiency = 10;
                magnitudeAnalysis = `<br><br><strong>🚨 NUCLEAR-LEVEL OVERKILL:</strong> ${componentCounts.cloud} cloud instances ($${cloudCost.toLocaleString()}) for a sequential task?! This is financial insanity! Cloud infrastructure is designed for millions of global users - you're using it to run a single sequential program. You've wasted ${wasteMultiplier}x the necessary budget. Each cloud has ${COMPONENT_SPECS.cloud.parallelism} processors across ${componentCounts.cloud} instances = ${componentCounts.cloud * COMPONENT_SPECS.cloud.parallelism} total processors, but sequential tasks use ONLY ONE. This is a career-ending mistake in real-world engineering!`;
            } else {
                magnitudeAnalysis = `<br><br><strong>⚠️ EXTREME OVERKILL:</strong> A cloud instance ($${COMPONENT_SPECS.cloud.cost}) for sequential processing? That's ${Math.round(COMPONENT_SPECS.cloud.cost / COMPONENT_SPECS.computer.cost)}x more expensive than needed! Cloud infrastructure is built for massive global distribution, not single sequential tasks. You're using enterprise-scale resources for a simple job.`;
            }
        } else {
            efficiency = 50;
            message = "Suboptimal";
            details = "Consider what infrastructure best suits sequential processing.";
            rating = "poor";
        }
    } else if (currentScenario.type === "parallel") {
        if (hasServer && !hasCloud) {
            efficiency = 95;
            message = "Excellent Choice!";
            details = "Servers with multiple processors are perfect for parallel processing tasks!";
            rating = "excellent";

            // Magnitude analysis for parallel
            if (componentCounts.server > 1) {
                const costPerServer = COMPONENT_SPECS.server.cost;
                const totalServerCost = componentCounts.server * costPerServer;
                const parallelSpeedup = calculateAmdahlSpeedup(currentScenario.parallelFraction, metrics.parallelism);

                if (componentCounts.server <= 3) {
                    efficiency = Math.min(98, efficiency + 3);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.server} servers provide good horizontal scaling for parallel tasks. Total cost: $${totalServerCost}. With ${(currentScenario.parallelFraction * 100).toFixed(0)}% parallelizable work, you achieve ${parallelSpeedup.toFixed(2)}x speedup. This is cost-effective!`;
                    rating = "excellent";
                } else if (componentCounts.server <= 7) {
                    efficiency = Math.max(70, efficiency - (componentCounts.server - 3) * 5);
                    const maxSpeedup = (1 / (1 - currentScenario.parallelFraction)).toFixed(2);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.server} servers may be excessive. Due to Amdahl's Law, the ${(currentScenario.parallelFraction * 100).toFixed(0)}% parallel portion limits speedup to ${maxSpeedup}x maximum. Beyond 3 servers, you hit diminishing returns. Total cost: $${totalServerCost}. You're approaching the point where additional servers provide minimal benefit.`;
                    rating = "good";
                } else {
                    efficiency = Math.max(55, efficiency - (componentCounts.server - 3) * 8);
                    const maxSpeedup = (1 / (1 - currentScenario.parallelFraction)).toFixed(2);
                    const actualSpeedup = parallelSpeedup.toFixed(2);
                    magnitudeAnalysis = `<br><br><strong>⚠️ OVERKILL:</strong> ${componentCounts.server} servers ($${totalServerCost}) is over-provisioned! Amdahl's Law dictates maximum ${maxSpeedup}x speedup with ${(currentScenario.parallelFraction * 100).toFixed(0)}% parallel work. You're achieving ${actualSpeedup}x speedup - already near the theoretical limit! Additional servers cost $${COMPONENT_SPECS.server.cost} each but add <0.1x speedup. This is inefficient spending - you've hit the parallelization wall!`;
                    rating = "good";
                }
            }
        } else if (hasCloud) {
            efficiency = 70;
            message = "Works, but Expensive";
            details = "Cloud works for parallel tasks, but a server would be more cost-effective for this scale.";
            rating = "good";

            if (componentCounts.cloud > 1) {
                const cloudCost = componentCounts.cloud * COMPONENT_SPECS.cloud.cost;
                const serverAlt = COMPONENT_SPECS.server.cost * 3;
                if (componentCounts.cloud <= 3) {
                    efficiency = Math.max(55, efficiency - (componentCounts.cloud - 1) * 8);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.cloud} cloud instances cost $${cloudCost.toLocaleString()}. While clouds scale infinitely, this parallel task doesn't need global distribution. A single server ($${COMPONENT_SPECS.server.cost}) or 2-3 servers ($${serverAlt}) would be ${Math.round(cloudCost / serverAlt)}x more cost-effective for this workload.`;
                } else {
                    efficiency = Math.max(40, efficiency - (componentCounts.cloud - 1) * 10);
                    magnitudeAnalysis = `<br><br><strong>⚠️ MAJOR OVERKILL:</strong> ${componentCounts.cloud} clouds ($${cloudCost.toLocaleString()}) for parallel processing is wasteful! Cloud infrastructure excels at DISTRIBUTED tasks (global users), not parallel computing in one location. You're paying for geographic distribution, auto-scaling, and CDN features you don't need. This costs ${Math.round(cloudCost / serverAlt)}x more than 2-3 servers that would perform identically for this workload!`;
                    rating = "poor";
                }
            } else {
                magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> 1 cloud instance ($${COMPONENT_SPECS.cloud.cost}) works but is expensive for parallel tasks. Clouds excel at distributed workloads (global scale), not localized parallel processing. Consider: 3 servers ($${COMPONENT_SPECS.server.cost * 3}) would provide similar parallel performance at ${Math.round(COMPONENT_SPECS.cloud.cost / (COMPONENT_SPECS.server.cost * 3))}x lower cost.`;
            }
        } else if (hasComputer) {
            efficiency = 40;
            message = "Underpowered";
            details = "A single computer can't fully leverage parallel processing. Consider a server with multiple processors.";
            rating = "poor";

            if (componentCounts.computer > 1) {
                const speedup = calculateAmdahlSpeedup(currentScenario.parallelFraction, componentCounts.computer);
                efficiency = Math.min(65, 40 + componentCounts.computer * 5);
                magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> Using ${componentCounts.computer} computers provides some parallelism (${speedup.toFixed(2)}x speedup). This CAN work, but coordination overhead is high. Total cost: $${componentCounts.computer * COMPONENT_SPECS.computer.cost}. A single server ($${COMPONENT_SPECS.server.cost}) with ${COMPONENT_SPECS.server.parallelism} processors would give ${calculateAmdahlSpeedup(currentScenario.parallelFraction, COMPONENT_SPECS.server.parallelism).toFixed(2)}x speedup more efficiently.`;
                rating = componentCounts.computer >= 4 ? "good" : "poor";
            }
        } else {
            efficiency = 30;
            message = "Insufficient";
            details = "Parallel processing needs multiple processors working together.";
            rating = "poor";
        }
    } else if (currentScenario.type === "distributed") {
        if (hasCloud) {
            efficiency = 100;
            message = "Perfect Infrastructure!";
            details = "Cloud infrastructure is ideal for distributed processing across multiple locations!";
            rating = "excellent";

            // Magnitude analysis for distributed
            if (componentCounts.cloud > 1) {
                const cloudCost = componentCounts.cloud * COMPONENT_SPECS.cloud.cost;
                if (componentCounts.cloud <= 5) {
                    efficiency = Math.min(100, efficiency + 2);
                    magnitudeAnalysis = `<br><br><strong>✅ Excellent Scaling:</strong> ${componentCounts.cloud} cloud instances provide excellent redundancy and geographic distribution! Total cost: $${cloudCost.toLocaleString()}. For distributed tasks serving global users, multiple clouds in different regions reduce latency and improve fault tolerance. Great architecture for global scale!`;
                    rating = "excellent";
                } else if (componentCounts.cloud <= 10) {
                    efficiency = Math.min(98, efficiency);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.cloud} cloud instances ($${cloudCost.toLocaleString()}) provide robust global distribution. This is appropriate for extremely high-traffic distributed systems (Netflix/YouTube scale). However, verify you actually need this many regions - you're paying for ${componentCounts.cloud} geographic locations. Most apps serve well with 3-5 regions.`;
                    rating = "excellent";
                } else {
                    efficiency = Math.min(90, efficiency - 5);
                    magnitudeAnalysis = `<br><br><strong>⚠️ POSSIBLE OVERKILL:</strong> ${componentCounts.cloud} cloud instances ($${cloudCost.toLocaleString()}) is extremely high! Unless you're running planet-scale infrastructure (Google/Facebook level), this may be excessive. Each cloud costs $${COMPONENT_SPECS.cloud.cost} - you're operating ${componentCounts.cloud} data centers. Most global distributed systems work well with 5-7 strategic regions. Verify this cost is justified by your actual user distribution!`;
                    rating = "excellent";
                }
            }
        } else if (hasServer) {
            efficiency = 55;
            message = "Limited Scope";
            details = "A server can handle some distribution, but cloud infrastructure scales better globally.";
            rating = "good";

            if (componentCounts.server > 1) {
                const serverCost = componentCounts.server * COMPONENT_SPECS.server.cost;
                if (componentCounts.server <= 5) {
                    efficiency = Math.min(70, 55 + componentCounts.server * 3);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.server} servers provide some distributed capability, but they're likely in one location. Total cost: $${serverCost.toLocaleString()}. For truly distributed tasks (global users, multiple regions), cloud infrastructure ($${COMPONENT_SPECS.cloud.cost}/cloud) offers geographic distribution, auto-scaling, and better fault tolerance.`;
                    rating = "good";
                } else if (componentCounts.server <= 10) {
                    efficiency = Math.min(68, 55 + componentCounts.server * 2);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.server} servers ($${serverCost.toLocaleString()}) can handle distributed load, but lacks geographic diversity. You're building a single-datacenter distributed system - this works for regional apps but fails for global distribution. For $${COMPONENT_SPECS.cloud.cost}/cloud, you'd get worldwide presence, auto-scaling, and edge caching that ${componentCounts.server} co-located servers can't provide.`;
                    rating = "good";
                } else {
                    efficiency = Math.min(65, 55 + componentCounts.server * 1.5);
                    magnitudeAnalysis = `<br><br><strong>⚠️ INFRASTRUCTURE MISMATCH:</strong> ${componentCounts.server} servers ($${serverCost.toLocaleString()}) is a lot of hardware for one location! At this scale, cloud is more appropriate. You're building enterprise infrastructure without cloud benefits: no geographic distribution, manual scaling, single point of failure. This is the wrong tool for distributed systems - you're paying server costs (now $${serverCost.toLocaleString()}) approaching cloud pricing but missing global reach!`;
                    rating = "good";
                }
            }
        } else {
            efficiency = 25;
            message = "Cannot Scale";
            details = "Distributed tasks need cloud infrastructure to handle global scale and redundancy.";
            rating = "poor";

            if (componentCounts.computer > 3) {
                const computerCost = componentCounts.computer * COMPONENT_SPECS.computer.cost;
                if (componentCounts.computer <= 10) {
                    efficiency = Math.min(45, 25 + componentCounts.computer * 3);
                    magnitudeAnalysis = `<br><br><strong>Magnitude Note:</strong> ${componentCounts.computer} computers show you understand the need for scale ($${computerCost} total). However, computers lack the geographic distribution and management tools for true distributed systems. Consider: 1 cloud ($${COMPONENT_SPECS.cloud.cost}) can auto-scale and serve global users from multiple regions.`;
                    rating = "poor";
                } else if (componentCounts.computer <= 50) {
                    efficiency = Math.min(40, 25 + componentCounts.computer * 2);
                    magnitudeAnalysis = `<br><br><strong>⚠️ WRONG ARCHITECTURE:</strong> ${componentCounts.computer} computers ($${computerCost}) demonstrates scale awareness, but this is the wrong approach for distributed systems! You're building what would require: network infrastructure, load balancers, data replication, manual failover - all things cloud provides automatically. At ${componentCounts.computer} computers, operational complexity becomes unmanageable. Use cloud instead!`;
                    rating = "poor";
                } else {
                    efficiency = Math.min(35, 25 + componentCounts.computer * 1);
                    magnitudeAnalysis = `<br><br><strong>🚨 ARCHITECTURAL DISASTER:</strong> ${componentCounts.computer} computers ($${computerCost.toLocaleString()}) for distributed systems?! This is completely impractical! You'd need: ${componentCounts.computer} network connections, ${componentCounts.computer} power supplies, ${componentCounts.computer} operating systems to patch, complex load balancing, manual geographic distribution. At this scale, you're essentially reinventing cloud infrastructure badly. Google/Amazon use clouds for a reason - this approach is obsolete!`;
                    rating = "poor";
                }
            }
        }
    }

    showResult(efficiency, message, details, rating, magnitudeAnalysis);
}

function showResult(score, message, details, rating, magnitudeAnalysis = "") {
    const resultDiv = document.getElementById('result-display');
    resultDiv.className = 'result-display show ' + rating;

    const metrics = calculateMetrics();
    const challengeBonus = challengeMode && rating === 'excellent' ? '<div style="margin-top: 10px; padding: 8px; background: rgba(34, 197, 94, 0.3); border-radius: 4px;"><strong>Challenge Complete!</strong> Met all constraints!</div>' : '';

    resultDiv.innerHTML = `
        <div class="efficiency-score">${score}%</div>
        <div class="result-message"><strong>${message}</strong></div>
        <div class="result-details">${details}${magnitudeAnalysis}</div>
        ${challengeBonus}
        <div class="result-details" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid currentColor;">
            <strong>Expected Solution:</strong><br>
            ${currentScenario.description}
        </div>
        <div class="result-details" style="margin-top: 10px; font-size: 11px;">
            <strong>Your Infrastructure Stats:</strong><br>
            Cost: $${metrics.cost} | Throughput: ${metrics.throughput.toFixed(0)}/s | Latency: ${metrics.latency.toFixed(0)}ms | Utilization: ${metrics.utilization.toFixed(0)}%
        </div>
    `;
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
