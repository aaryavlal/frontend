// Game State
let currentScenario = null;
let builtComponents = [];
let componentIdCounter = 0;
let autoFillEnabled = true;

// Component Requirements
const COMPONENT_SPECS = {
    core: { needs: 0, icon: '⚙️', label: 'Core' },
    processor: { needs: 6, needsType: 'core', icon: '🔲', label: 'Processor' },
    computer: { needs: 1, needsType: 'processor', icon: '💻', label: 'Computer' },
    server: { needs: 10, needsType: 'processor', icon: '🖥️', label: 'Server' },
    cloud: { needs: 10, needsType: 'server', icon: '☁️', label: 'Cloud' }
};

// Scenarios
const SCENARIOS = [
    // Sequential scenarios
    {
        text: "Process a single large video file for rendering",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)"
    },
    {
        text: "Execute a complex calculation that must be done step-by-step",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)"
    },
    {
        text: "Write data to a single database in a specific order",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)"
    },
    {
        text: "Run a script that processes files one at a time",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)"
    },
    {
        text: "Edit a single document with complex formatting",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)"
    },
    {
        text: "Debug a program by stepping through code line by line",
        type: "sequential",
        ideal: "computer",
        description: "Best solved with: Single computer (sequential processing)"
    },

    // Parallel scenarios
    {
        text: "Train a deep learning model with massive datasets",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Run multiple independent simulations simultaneously",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Compile a large codebase using all available CPU cores",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Process multiple images with the same filter simultaneously",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Analyze weather patterns across different regions at once",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Run scientific simulations with independent parameters",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Encode multiple video files to different formats simultaneously",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },
    {
        text: "Process batch jobs that can run independently",
        type: "parallel",
        ideal: "server",
        description: "Best solved with: Server with multiple processors (parallel processing)"
    },

    // Distributed scenarios
    {
        text: "Handle millions of user requests from around the world",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Render frames of an animated movie across multiple machines",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Process real-time data streams from IoT devices worldwide",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Serve content to users across multiple continents with low latency",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Run a global multiplayer game with players in different regions",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Index billions of web pages for a search engine",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Stream video to millions of concurrent viewers worldwide",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Analyze petabytes of data from sensors across the globe",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Process financial transactions from banks around the world",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Provide a CDN service for a global e-commerce platform",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Run distributed machine learning training across data centers",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    },
    {
        text: "Manage real-time chat messages for a social network",
        type: "distributed",
        ideal: "cloud",
        description: "Best solved with: Cloud infrastructure (distributed processing)"
    }
];

// Initialize game
function initGame() {
    loadNewScenario();
    setupEventListeners();
}

// Load a new scenario
function loadNewScenario() {
    currentScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    document.getElementById('scenario-text').textContent = currentScenario.text;
    document.getElementById('scenario-type').textContent = `Hint: Think about ${currentScenario.type} processing`;
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

    // Determine what was built
    const hasCloud = builtComponents.some(c => c.type === 'cloud');
    const hasServer = builtComponents.some(c => c.type === 'server');
    const hasComputer = builtComponents.some(c => c.type === 'computer');

    let efficiency = 0;
    let message = "";
    let details = "";
    let rating = "poor";

    // Evaluate based on scenario type
    if (currentScenario.type === "sequential") {
        if (hasComputer && !hasServer && !hasCloud) {
            efficiency = 95;
            message = "Perfect Solution!";
            details = "Sequential tasks run best on a single computer. Excellent choice!";
            rating = "excellent";
        } else if (hasServer && !hasCloud) {
            efficiency = 60;
            message = "Over-engineered";
            details = "A server works, but it's overkill for sequential processing. A single computer is more efficient.";
            rating = "good";
        } else if (hasCloud) {
            efficiency = 30;
            message = "Massive Overkill";
            details = "Cloud infrastructure is way too much for a sequential task. Use a simple computer instead.";
            rating = "poor";
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
        } else if (hasCloud) {
            efficiency = 70;
            message = "Works, but Expensive";
            details = "Cloud works for parallel tasks, but a server would be more cost-effective for this scale.";
            rating = "good";
        } else if (hasComputer) {
            efficiency = 40;
            message = "Underpowered";
            details = "A single computer can't fully leverage parallel processing. Consider a server with multiple processors.";
            rating = "poor";
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
        } else if (hasServer) {
            efficiency = 55;
            message = "Limited Scope";
            details = "A server can handle some distribution, but cloud infrastructure scales better globally.";
            rating = "good";
        } else {
            efficiency = 25;
            message = "Cannot Scale";
            details = "Distributed tasks need cloud infrastructure to handle global scale and redundancy.";
            rating = "poor";
        }
    }

    showResult(efficiency, message, details, rating);
}

function showResult(score, message, details, rating) {
    const resultDiv = document.getElementById('result-display');
    resultDiv.className = 'result-display show ' + rating;

    resultDiv.innerHTML = `
        <div class="efficiency-score">${score}%</div>
        <div class="result-message"><strong>${message}</strong></div>
        <div class="result-details">${details}</div>
        <div class="result-details" style="margin-top: 15px; padding-top: 15px; border-top: 1px solid currentColor;">
            <strong>Expected Solution:</strong><br>
            ${currentScenario.description}
        </div>
    `;
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', initGame);
