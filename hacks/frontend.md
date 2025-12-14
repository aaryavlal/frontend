---
layout: post
title: Hardware Havoc
description: Fix the cores, learn Computing, play the game!
permalink: /prototyperoomcode
breadcrumbs: true
---

<style>
  :root{
    --bg: #0b1220;
    --paper: #0f1a2e;
    --surface: #111c33;
    --surface-2: #0f1a2e;
    --ink: #e6e9ef;
    --muted: #b7c0d1;
    --muted-2: #93a0b8;
    --border: rgba(230,233,239,0.14);
    --border-strong: rgba(230,233,239,0.22);
    --accent: #c9a34a;     /* classic gold */
    --accent-2: #6ea6d9;   /* subdued blue */
    --success: #2f8f5b;
    --warning: #b9832a;
    --danger: #c44a4a;

    --radius: 12px;
    --radius-sm: 10px;
    --shadow: 0 10px 30px rgba(0,0,0,0.35);
    --shadow-sm: 0 6px 18px rgba(0,0,0,0.25);

    --font: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji";
    --serif: ui-serif, Georgia, "Times New Roman", Times, serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body{
    font-family: var(--font);
    background: radial-gradient(1200px 700px at 20% 0%, rgba(110,166,217,0.16), transparent 55%),
                radial-gradient(900px 600px at 100% 20%, rgba(201,163,74,0.12), transparent 55%),
                var(--bg);
    color: var(--ink);
    min-height: 100vh;
    padding: 22px;
    line-height: 1.45;
  }

  .container{
    max-width: 1100px;
    margin: 0 auto;
  }

  /* Header */
  .header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap: 18px;
    margin-bottom: 26px;
    padding: 22px 24px;
    background: linear-gradient(180deg, rgba(17,28,51,0.92), rgba(15,26,46,0.92));
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
  }

  .header h2{
    font-family: var(--serif);
    letter-spacing: 0.2px;
    color: var(--ink);
    font-size: 2.0rem;
    margin-bottom: 6px;
    font-weight: 650;
  }

  .header p{
    color: var(--muted);
    font-size: 0.98rem;
  }

  /* Sections */
  .section{
    background: linear-gradient(180deg, rgba(17,28,51,0.92), rgba(15,26,46,0.92));
    padding: 22px 24px;
    border-radius: var(--radius);
    margin-bottom: 18px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);
  }

  .section h2{
    font-family: var(--serif);
    font-size: 1.45rem;
    color: var(--ink);
    margin-bottom: 14px;
    font-weight: 650;
  }

  .section h3{
    font-family: var(--serif);
    font-size: 1.15rem;
    color: var(--ink);
    margin: 16px 0 10px;
    font-weight: 650;
  }

  .section h4{
    font-size: 1.0rem;
    color: var(--muted);
    margin-bottom: 10px;
    font-weight: 600;
  }

  .config-section{
    border-left: 4px solid var(--accent);
  }

  /* Forms */
  .form-group{ margin-bottom: 14px; }

  label{
    display:block;
    margin-bottom: 6px;
    color: var(--muted);
    font-weight: 600;
    font-size: 0.92rem;
  }

  input, textarea{
    width:100%;
    padding: 11px 12px;
    background: rgba(11,18,32,0.65);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    color: var(--ink);
    font-size: 0.98rem;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  input:focus, textarea:focus{
    outline: none;
    border-color: rgba(201,163,74,0.55);
    box-shadow: 0 0 0 3px rgba(201,163,74,0.14);
  }

  textarea{ resize: vertical; }

  .inline-inputs{
    display:flex;
    gap: 12px;
    align-items:flex-end;
    flex-wrap: wrap;
  }

  .inline-inputs .form-group{ flex: 1; min-width: 220px; }

  /* Buttons */
  .btn{
    padding: 10px 16px;
    background: rgba(201,163,74,0.95);
    color: #121826;
    border: 1px solid rgba(201,163,74,0.8);
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.06s ease, box-shadow 0.15s ease, background 0.15s ease;
    box-shadow: 0 8px 18px rgba(0,0,0,0.25);
  }

  .btn:hover{ box-shadow: 0 10px 22px rgba(0,0,0,0.32); }
  .btn:active{ transform: translateY(1px); }

  .btn-secondary{
    background: rgba(230,233,239,0.10);
    color: var(--ink);
    border: 1px solid var(--border-strong);
    box-shadow: none;
  }

  .btn-secondary:hover{
    background: rgba(230,233,239,0.14);
  }

  .btn-warning{
    background: rgba(185,131,42,0.95);
    border-color: rgba(185,131,42,0.75);
    color: #121826;
  }

  .btn-danger{
    background: rgba(196,74,74,0.95);
    border-color: rgba(196,74,74,0.75);
    color: #121826;
  }

  .btn-small{ padding: 8px 12px; font-size: 0.9rem; }

  /* Utility */
  .hidden{ display:none; }

  /* Room info */
  .room-info{
    background: rgba(11,18,32,0.55);
    padding: 16px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    margin-top: 10px;
  }

  .room-info p{ margin: 8px 0; color: var(--muted); }

  .room-code{
    font-family: var(--serif);
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--ink);
    text-align:center;
    padding: 14px 10px;
    background: rgba(11,18,32,0.65);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-strong);
    letter-spacing: 6px;
    margin: 14px 0;
  }

  /* Demo card */
  .demo-card{
    background: rgba(47,143,91,0.10);
    padding: 16px;
    border-radius: var(--radius-sm);
    border: 1px solid rgba(47,143,91,0.35);
    margin-bottom: 16px;
  }

  .demo-card .demo-title{
    color: rgba(47,143,91,1);
    font-weight: 800;
    margin: 0 0 8px 0;
  }

  .demo-pill{
    background: rgba(11,18,32,0.65);
    padding: 12px 18px;
    border-radius: var(--radius-sm);
    font-size: 1.2rem;
    font-weight: 800;
    color: rgba(47,143,91,1);
    letter-spacing: 3px;
    border: 1px solid rgba(47,143,91,0.35);
  }

  /* CPU */
  .cpu-container{
    position: relative;
    max-width: 640px;
    margin: 22px auto 0;
    padding: 28px;
    background: rgba(11,18,32,0.60);
    border-radius: 16px;
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow);
  }

  .cpu-label{
    position:absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 2px;
    color: var(--muted-2);
  }

  .cpu-visualization{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 18px;
  }

  /* Pins */
  .cpu-pins{ position:absolute; display:flex; gap: 8px; }
  .cpu-pins.left{ left: -22px; top: 50%; transform: translateY(-50%); flex-direction: column; }
  .cpu-pins.right{ right: -22px; top: 50%; transform: translateY(-50%); flex-direction: column; }
  .cpu-pins.top{ top: -18px; left: 50%; transform: translateX(-50%); flex-direction: row; }
  .cpu-pins.bottom{ bottom: -18px; left: 50%; transform: translateX(-50%); flex-direction: row; }

  .pin{
    width: 4px; height: 14px;
    background: rgba(230,233,239,0.18);
    border-radius: 2px;
  }
  .cpu-pins.left .pin, .cpu-pins.right .pin{ width: 14px; height: 4px; }

  /* Node tiles */
  .node{
    background: rgba(17,28,51,0.78);
    padding: 16px 14px;
    border-radius: var(--radius-sm);
    text-align:center;
    border: 1px solid var(--border);
    transition: border-color 0.15s ease, background 0.15s ease;
  }

  .node-icon{
    font-size: 1.8rem;
    margin-bottom: 8px;
    color: var(--muted-2);
  }

  .node-label{
    font-weight: 800;
    letter-spacing: 1px;
    font-size: 0.82rem;
    color: var(--muted);
  }

  .node.active{
    border-color: rgba(201,163,74,0.55);
    background: rgba(201,163,74,0.08);
  }
  .node.active .node-icon{ color: rgba(201,163,74,0.95); }
  .node.active .node-label{ color: var(--ink); }

  /* Fully lit state (subtle) */
  .cpu-container.all-active{
    border-color: rgba(201,163,74,0.55);
    box-shadow: 0 18px 50px rgba(0,0,0,0.45);
  }

  /* Module buttons */
  .module-controls{
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 14px;
  }

  .module-btn{
    padding: 14px 14px;
    background: rgba(11,18,32,0.55);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-sm);
    color: var(--ink);
    cursor:pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
    text-align:left;
  }

  .module-btn:hover{
    background: rgba(230,233,239,0.06);
    border-color: rgba(201,163,74,0.45);
  }

  .module-btn .module-icon{
    font-size: 1.1rem;
    color: var(--muted-2);
    margin-bottom: 6px;
    font-weight: 800;
  }

  .module-btn.completed{
    background: rgba(47,143,91,0.10);
    border-color: rgba(47,143,91,0.38);
  }

  /* Members list */
  .members-list{ list-style:none; margin-top: 10px; }

  .member-item{
    background: rgba(11,18,32,0.55);
    padding: 14px;
    border-radius: var(--radius-sm);
    margin-bottom: 10px;
    display:flex;
    justify-content: space-between;
    align-items:center;
    border: 1px solid var(--border);
    gap: 12px;
  }

  .member-name{ font-weight: 800; color: var(--ink); }
  .member-progress{ color: var(--muted); font-size: 0.9rem; }

  .progress-modules{ display:flex; gap: 8px; flex-wrap: wrap; justify-content:flex-end; }

  .module-badge{
    width: 36px; height: 36px;
    border-radius: 10px;
    display:flex; align-items:center; justify-content:center;
    font-weight: 800;
    border: 1px solid var(--border);
    background: rgba(17,28,51,0.78);
    color: var(--muted-2);
  }

  .module-badge.completed{
    background: rgba(47,143,91,0.16);
    border-color: rgba(47,143,91,0.55);
    color: var(--ink);
  }

  /* Module panel overlay */
  body.module-panel-open{ overflow:hidden; }

  .module-panel{
    position:fixed;
    inset:0;
    width:100vw;
    height:100vh;
    display:flex;
    align-items:stretch;
    justify-content:center;
    padding: clamp(18px, 4vh, 44px) clamp(14px, 5vw, 44px);
    background: rgba(0,0,0,0.72);
    z-index: 45000;
    overflow-y:auto;
  }

  .module-dialog{
    width: min(1100px, 100%);
    margin: 0 auto;
    background: rgba(15,26,46,0.98);
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow);
    position:relative;
    /* keep dialog constrained to viewport and allow internal scrolling */
    max-height: calc(100vh - 80px);
  }

  /* force internal content width */
  #modulePanelContent{
    width:100% !important;
    max-width:none !important;
    /* allow the content area to scroll when module content is tall */
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    max-height: calc(100vh - 160px);
    padding-right: 12px; /* room for scrollbar */
  }
  #modulePanelContent *{
    max-width:none !important;
  }

  /* Confirmation modal */
  .confirm-modal{
    display:none;
    position:fixed;
    inset:0;
    background: rgba(0,0,0,0.72);
    z-index: 40000;
  }
  .confirm-modal.show{
    display:flex;
    justify-content:center;
    align-items:center;
    padding: 18px;
  }

  .confirm-dialog{
    background: rgba(15,26,46,0.98);
    border: 1px solid rgba(196,74,74,0.55);
    border-radius: var(--radius);
    padding: 22px;
    max-width: 520px;
    width: 100%;
    box-shadow: var(--shadow);
  }

  .confirm-icon{
    font-size: 2.4rem;
    text-align:center;
    margin-bottom: 10px;
    color: rgba(196,74,74,0.95);
  }

  .confirm-title{
    font-family: var(--serif);
    font-size: 1.35rem;
    font-weight: 750;
    color: var(--ink);
    text-align:center;
    margin-bottom: 8px;
  }

  .confirm-message{
    color: var(--muted);
    font-size: 1.0rem;
    line-height: 1.55;
    text-align:center;
    margin-bottom: 16px;
  }

  .confirm-buttons{
    display:flex;
    gap: 10px;
    justify-content:center;
  }

  .confirm-btn{
    padding: 10px 14px;
    border-radius: 10px;
    font-weight: 800;
    border: 1px solid var(--border-strong);
    background: rgba(230,233,239,0.10);
    color: var(--ink);
    cursor:pointer;
  }

  .confirm-btn.confirm{
    background: rgba(196,74,74,0.95);
    border-color: rgba(196,74,74,0.75);
    color: #121826;
  }

  /* Glossary */
  .glossary-entry{
    background: rgba(11,18,32,0.55);
    padding: 16px;
    border-radius: var(--radius-sm);
    margin-bottom: 12px;
    border: 1px solid var(--border);
  }

  .glossary-term{
    font-family: var(--serif);
    font-size: 1.15rem;
    font-weight: 750;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .glossary-definition{
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 12px;
  }

  .glossary-meta{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap: 10px;
    color: var(--muted-2);
    font-size: 0.88rem;
    padding-top: 10px;
    border-top: 1px solid var(--border);
  }

  .glossary-actions{ display:flex; gap: 8px; }

  .glossary-action-btn{
    padding: 6px 10px;
    font-size: 0.9rem;
    background: rgba(230,233,239,0.10);
    border: 1px solid var(--border-strong);
    border-radius: 10px;
    color: var(--ink);
    cursor:pointer;
  }

  .glossary-action-btn.delete{
    border-color: rgba(196,74,74,0.65);
  }
  .glossary-action-btn.delete:hover{
    background: rgba(196,74,74,0.15);
  }

  .glossary-empty{
    text-align:center;
    padding: 26px;
    color: var(--muted);
    border: 1px dashed var(--border-strong);
    border-radius: var(--radius-sm);
    background: rgba(11,18,32,0.35);
  }

  /* Admin rooms */
  .admin-rooms-modal{
    display:none;
    position:fixed;
    inset:0;
    background: rgba(0,0,0,0.78);
    z-index: 30000;
    overflow-y:auto;
    padding: 22px;
  }

  .admin-rooms-modal.show{ display:block; }

  .admin-rooms-dialog{
    max-width: 1100px;
    margin: 22px auto;
    background: rgba(15,26,46,0.98);
    border-radius: var(--radius);
    border: 1px solid var(--border-strong);
    padding: 22px;
    box-shadow: var(--shadow);
  }

  .admin-rooms-header{
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }

  .admin-rooms-header h2{
    margin: 0;
    font-family: var(--serif);
    font-size: 1.35rem;
  }

  .admin-rooms-actions{
    display:flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 14px;
  }

  .room-stats-summary{
    background: rgba(11,18,32,0.55);
    padding: 14px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    margin-bottom: 14px;
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .stat-item{ text-align:center; }
  .stat-value{
    font-family: var(--serif);
    font-size: 2.0rem;
    font-weight: 800;
    color: var(--ink);
  }
  .stat-label{ color: var(--muted); margin-top: 4px; }

  .room-card{
    background: rgba(11,18,32,0.55);
    border-radius: var(--radius-sm);
    padding: 16px;
    margin-bottom: 12px;
    border: 1px solid var(--border);
    display:flex;
    justify-content:space-between;
    align-items:center;
    gap: 12px;
  }

  .room-card.demo{
    border-color: rgba(47,143,91,0.38);
  }

  .room-card-title{
    font-family: var(--serif);
    font-size: 1.1rem;
    font-weight: 750;
    color: var(--ink);
    margin-bottom: 10px;
  }

  .room-card-details{
    display:grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
    color: var(--muted);
    font-size: 0.95rem;
  }

  .room-card-detail strong{ color: var(--ink); }

  .room-card-actions{
    display:flex;
    gap: 10px;
    align-items:center;
    flex-wrap: wrap;
    justify-content:flex-end;
  }

  .room-checkbox{ width: 18px; height: 18px; cursor:pointer; }

  /* Toast */
  .toast{
    position:fixed;
    top: 18px;
    right: 18px;
    background: rgba(15,26,46,0.98);
    color: var(--ink);
    padding: 14px 16px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow-sm);
    z-index: 999999;
    pointer-events:none;
    animation: toastIn 0.18s ease-out, toastOut 0.22s ease-out 2.6s forwards;
    max-width: min(420px, calc(100vw - 40px));
  }

  @keyframes toastIn{
    from{ transform: translateY(-6px); opacity: 0; }
    to{ transform: translateY(0); opacity: 1; }
  }
  @keyframes toastOut{
    from{ transform: translateY(0); opacity: 1; }
    to{ transform: translateY(-6px); opacity: 0; }
  }

  /* Small screens */
  @media (max-width: 860px){
    .module-controls{ grid-template-columns: repeat(2, 1fr); }
    .header{ flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 520px){
    .module-controls{ grid-template-columns: 1fr; }
    .room-code{ letter-spacing: 4px; }
  }
</style>

<div class="container">
  <div class="header">
    <div>
      <h2>Hardware Havoc</h2>
      <p>Computing Systems Education Quest</p>
    </div>
    <div id="userInfo" style="text-align: right; display: none;">
      <p style="margin: 0; color: var(--muted); font-weight: 700;">
        User: <span id="displayUsername"></span>
      </p>
      <button class="btn btn-secondary" onclick="logout()" style="margin-top: 8px; padding: 7px 12px; font-size: 0.9rem;">Logout</button>
    </div>
  </div>

  <!-- Configuration Section -->
  <div class="section config-section">
    <h2>Configuration</h2>
    <div class="form-group">
      <label for="apiUrl">Backend API URL</label>
      <input type="text" id="apiUrl" value="http://localhost:8587" placeholder="http://localhost:8587">
    </div>
  </div>

  <!-- Room Management Section -->
  <div class="section" id="roomSection" style="display: none;">
    <h2>Step 1: Room Management</h2>

    <!-- Admin: Create Room -->
    <div id="createRoomSection" class="hidden">
      <h3>Create New Room (Admin Only)</h3>
      <div class="inline-inputs">
        <div class="form-group">
          <label for="roomName">Room Name</label>
          <input type="text" id="roomName" placeholder="e.g., Computer Science 101">
        </div>
        <button class="btn" onclick="createRoom()">Create Room</button>
      </div>

      <!-- Admin: Manage Active Rooms -->
      <div style="margin-top: 18px;">
        <h3>Manage Active Rooms</h3>
        <button class="btn" onclick="showActiveRoomsModal()">View and Delete Rooms</button>
      </div>
    </div>

    <!-- Join Room -->
    <div id="joinRoomSection">
      <h3>Join Room</h3>

      <!-- Quick Join Demo Room -->
      <div class="demo-card">
        <h4 class="demo-title">Try the Demo Room</h4>
        <p style="color: var(--muted); margin-bottom: 12px;">
          Join the permanent demo room. It is always available and can be reset when complete.
        </p>
        <div style="display:flex; align-items:center; gap: 12px; flex-wrap: wrap;">
          <div class="demo-pill">DEMO01</div>
          <button class="btn" onclick="joinDemoRoom()" style="background: rgba(47,143,91,0.95); border-color: rgba(47,143,91,0.75);">
            Quick Join Demo Room
          </button>
        </div>
      </div>

      <!-- Regular Room Join -->
      <h4 style="margin-top: 6px;">Or join another room</h4>
      <div class="inline-inputs">
        <div class="form-group">
          <label for="roomCode">Room Code</label>
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
    <h2>Step 2: CPU Core Status</h2>
    <p style="color: var(--muted); margin-bottom: 12px; text-align: center;">
      Each core activates when all members complete the corresponding module.
    </p>

    <div class="cpu-container" id="cpuContainer">
      <div class="cpu-label">PARALLEL PROCESSOR</div>

      <!-- CPU Pins -->
      <div class="cpu-pins left">
        <div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div>
      </div>
      <div class="cpu-pins right">
        <div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div>
      </div>
      <div class="cpu-pins top">
        <div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div>
      </div>
      <div class="cpu-pins bottom">
        <div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div><div class="pin"></div>
      </div>

      <div class="cpu-visualization">
        <div class="node" id="node1">
          <div class="node-icon">I</div>
          <div class="node-label">CORE 1</div>
        </div>
        <div class="node" id="node2">
          <div class="node-icon">II</div>
          <div class="node-label">CORE 2</div>
        </div>
        <div class="node" id="node3">
          <div class="node-icon">III</div>
          <div class="node-label">CORE 3</div>
        </div>
        <div class="node" id="node4">
          <div class="node-icon">IV</div>
          <div class="node-label">CORE 4</div>
        </div>
        <div class="node" id="node5">
          <div class="node-icon">V</div>
          <div class="node-label">CORE 5</div>
        </div>
        <div class="node" id="node6">
          <div class="node-icon">VI</div>
          <div class="node-label">CORE 6</div>
        </div>
      </div>
    </div>

    <!-- Reset Button (only shows when CPU is fully lit) -->
    <div id="resetSection" class="hidden" style="text-align: center; margin-top: 18px;">
      <button class="btn btn-danger" onclick="resetProgress()">Reset All Progress</button>
      <p style="color: var(--muted); margin-top: 8px; font-size: 0.92rem;">
        This clears completed modules for everyone in the room.
      </p>
    </div>
  </div>

  <!-- Module Completion Section -->
  <div class="section" id="moduleSection" style="display: none;">
    <h2>Step 3: Complete Modules</h2>
    <p style="color: var(--muted); margin-bottom: 12px;">
      Complete modules to light cores once all room members finish.
    </p>

    <div class="module-controls">
      <button class="module-btn" data-permalink="/cores/core-1" data-module="1" onclick="openModule(this)">
        <div class="module-icon">Module</div>
        Module 1
      </button>
      <button class="module-btn" data-permalink="/cores/core-2" data-module="2" onclick="openModule(this)">
        <div class="module-icon">Module</div>
        Module 2
      </button>
      <button class="module-btn" data-permalink="/cores/core-3" data-module="3" onclick="openModule(this)">
        <div class="module-icon">Module</div>
        Module 3
      </button>
      <button class="module-btn" data-permalink="/cores/core-4" data-module="4" onclick="openModule(this)">
        <div class="module-icon">Module</div>
        Module 4
      </button>
      <button class="module-btn" data-permalink="/cores/core-5" data-module="5" onclick="openModule(this)">
        <div class="module-icon">Module</div>
        Module 5
      </button>
      <button class="module-btn" data-permalink="/cores/core-6" data-module="6" onclick="openModule(this)">
        <div class="module-icon">Module</div>
        Module 6
      </button>
    </div>

    <!-- Full-page Module Overlay -->
    <div id="modulePanel" class="module-panel" style="display:none;">
      <div class="module-dialog">
        <div style="padding:14px 16px; display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border); background: rgba(11,18,32,0.55);">
          <div style="font-weight:800; color: var(--ink); font-family: var(--serif);">Module</div>
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn btn-secondary" id="moduleMarkBtn">Mark Complete</button>
            <button class="btn" id="moduleCloseBtn">Close</button>
          </div>
        </div>
        <div id="modulePanelContent" style="padding:18px; min-height:320px;">
          <p style="color: var(--muted);">Loading...</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Members Progress Section -->
  <div class="section" id="membersSection" style="display: none;">
    <h2>Room Members Progress</h2>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 12px; gap: 10px; flex-wrap: wrap;">
      <button id="refreshProgressBtn" class="btn btn-danger" onclick="resetProgressMidGame()">Reset Room Progress</button>
      <div id="lastRefresh" style="color: var(--muted); font-size: 0.92rem;">Click to reset all progress</div>
    </div>
    <ul class="members-list" id="membersList"></ul>
  </div>

  <!-- Glossary Section -->
  <div class="section" id="glossarySection" style="display: none;">
    <h2>Step 4: Room Glossary</h2>
    <p style="color: var(--muted); margin-bottom: 12px;">
      Build a shared knowledge base. Add terms and definitions as you learn.
    </p>

    <!-- Glossary Stats -->
    <div class="glossary-stats" style="background: rgba(11,18,32,0.55); padding: 14px; border-radius: var(--radius-sm); margin-bottom: 14px; display:flex; justify-content:space-around; gap: 10px; border: 1px solid var(--border);">
      <div style="text-align:center;">
        <div style="font-size: 1.8rem; color: var(--ink); font-weight: 800; font-family: var(--serif);" id="glossaryTotalEntries">0</div>
        <div style="color: var(--muted); font-size: 0.92rem;">Total Entries</div>
      </div>
      <div style="text-align:center;">
        <div style="font-size: 1.8rem; color: var(--ink); font-weight: 800; font-family: var(--serif);" id="glossaryContributors">0</div>
        <div style="color: var(--muted); font-size: 0.92rem;">Contributors</div>
      </div>
    </div>

    <!-- Add Entry Form -->
    <div class="glossary-form" style="background: rgba(11,18,32,0.55); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 14px; border: 1px solid var(--border);">
      <h3 style="margin-top: 0;">Add New Entry</h3>
      <form id="addGlossaryForm" onsubmit="addGlossaryEntry(event)">
        <div class="form-group">
          <label for="glossaryTerm">Term</label>
          <input type="text" id="glossaryTerm" placeholder="e.g., Race Condition" required>
        </div>
        <div class="form-group">
          <label for="glossaryDefinition">Definition</label>
          <textarea id="glossaryDefinition" placeholder="Enter a clear definition..." required style="min-height: 100px; font-family: inherit;"></textarea>
        </div>
        <button type="submit" class="btn">Add to Glossary</button>
      </form>
    </div>

    <!-- Search Box -->
    <div class="form-group">
      <label for="glossarySearch">Search Glossary</label>
      <input type="text" id="glossarySearch" placeholder="Search terms and definitions..." oninput="searchGlossary()">
    </div>

    <!-- Glossary Entries List -->
    <div id="glossaryList" style="margin-top: 14px;"></div>
  </div>
</div>

<!-- Confirmation Modal -->
<div id="confirmModal" class="confirm-modal">
  <div class="confirm-dialog">
    <div class="confirm-icon">!</div>
    <div class="confirm-title" id="confirmTitle">Confirm Action</div>
    <div class="confirm-message" id="confirmMessage">Are you sure?</div>
    <div class="confirm-buttons">
      <button class="confirm-btn cancel" onclick="closeConfirm()">Cancel</button>
      <button class="confirm-btn confirm" id="confirmButton">Confirm</button>
    </div>
  </div>
</div>

<!-- Admin Rooms Management Modal -->
<div id="adminRoomsModal" class="admin-rooms-modal">
  <div class="admin-rooms-dialog">
    <div class="admin-rooms-header">
      <h2>Manage Active Rooms</h2>
      <button class="btn btn-secondary" onclick="closeAdminRoomsModal()">Close</button>
    </div>

    <!-- Stats Summary -->
    <div class="room-stats-summary" id="roomStatsSummary">
      <div class="stat-item">
        <div class="stat-value" id="totalRooms">0</div>
        <div class="stat-label">Total Rooms</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="deletableRooms">0</div>
        <div class="stat-label">Deletable Rooms</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="totalMembers">0</div>
        <div class="stat-label">Total Members</div>
      </div>
    </div>

    <!-- Actions -->
    <div class="admin-rooms-actions">
      <button class="btn" onclick="refreshActiveRooms()">Refresh</button>
      <button class="btn btn-danger" onclick="deleteSelectedRooms()">Delete Selected</button>
      <button class="btn btn-danger" onclick="deleteAllNonDemoRooms()">Delete All Non-Demo</button>
    </div>

    <!-- Rooms List -->
    <div id="adminRoomsList">
      <p style="color: var(--muted); text-align: center;">Loading rooms...</p>
    </div>
  </div>
</div>

<script>
  // Initialize authToken from localStorage if it exists
  let authToken = localStorage.getItem('access_token') || null;
  let currentUser = null;
  let currentRoomId = null;
  let currentRoomData = null;
  let cpuFullyLit = false; // Track if all cores are active

  // Load user from localStorage if it exists
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (e) {
      console.error('Failed to parse stored user:', e);
    }
  }

  function getApiUrl() {
    return document.getElementById('apiUrl').value.trim();
  }

  function showStatus(elementId, message, type) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.className = `status ${type}`;
  }

  // Toast
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  // Confirmation Modal Functions
  function showConfirm(title, message, onConfirm) {
    const modal = document.getElementById('confirmModal');
    const titleEl = document.getElementById('confirmTitle');
    const messageEl = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmButton');

    if (!modal) {
      if (confirm(`${title}\n\n${message}`)) onConfirm();
      return;
    }

    titleEl.textContent = title;
    messageEl.textContent = message;
    modal.classList.add('show');

    // Remove old listeners and add new one
    const newConfirmBtn = confirmBtn.cloneNode(true);
    newConfirmBtn.id = 'confirmButton';
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

    newConfirmBtn.addEventListener('click', () => {
      closeConfirm();
      onConfirm();
    });
  }

  function closeConfirm() {
    const modal = document.getElementById('confirmModal');
    modal.classList.remove('show');
  }

  // Close modal on background click
  document.addEventListener('DOMContentLoaded', async () => {
    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeConfirm();
      });
    }

    // Auto-load user if token exists
    if (authToken) {
      try {
        // Fetch current user info from backend
        const userData = await apiCall('/api/auth/me', 'GET');
        currentUser = userData.user;

        // Update localStorage with fresh user data
        localStorage.setItem('user', JSON.stringify(currentUser));

        updateUIAfterLogin();

        // If user is in a room, load it
        if (currentUser.current_room_id) {
          await loadCurrentRoom();
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        const baseurl = '{{site.baseurl}}';
        window.location.href = baseurl + '/login';
      }
    } else {
      const baseurl = '{{site.baseurl}}';
      window.location.href = baseurl + '/login';
    }
  });

  async function apiCall(endpoint, method = 'GET', body = null) {
    const url = `${getApiUrl()}${endpoint}`;
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' }
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

    if (endpoint.includes('/progress')) {
      console.log('Progress data received:', data);
    }

    return data;
  }

  function logout() {
    if (currentRoomId) {
      leaveRoomSilently();
    }

    authToken = null;
    currentUser = null;
    currentRoomId = null;
    currentRoomData = null;
    cpuFullyLit = false;

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('roomSection').style.display = 'none';
    document.getElementById('cpuSection').style.display = 'none';
    document.getElementById('moduleSection').style.display = 'none';
    document.getElementById('membersSection').style.display = 'none';
    document.getElementById('glossarySection').style.display = 'none';

    const baseurl = '{{site.baseurl}}';
    window.location.href = baseurl + '/login';
  }

  async function leaveRoomSilently() {
    if (!currentRoomId) return;
    try {
      await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
      console.log('Left room automatically');
    } catch (error) {
      console.error('Failed to auto-leave room:', error);
    }
  }

  // Auto-leave room when closing tab/window
  function cleanupOnExit() {
    if (currentRoomId && authToken) {
      const url = `${getApiUrl()}/api/rooms/${currentRoomId}/leave`;
      try {
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({}),
          keepalive: true
        }).catch(() => {});
      } catch (e) {}
    }
  }

  window.addEventListener('beforeunload', cleanupOnExit);
  window.addEventListener('pagehide', cleanupOnExit);

  function updateUIAfterLogin() {
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('displayUsername').textContent = currentUser.username;
    document.getElementById('roomSection').style.display = 'block';

    if (currentUser && currentUser.role === 'admin') {
      document.getElementById('createRoomSection').classList.remove('hidden');
    }
  }

  async function createRoom() {
    const roomName = document.getElementById('roomName').value.trim();
    if (!roomName) {
      showToast('Please enter a room name.');
      return;
    }

    try {
      const data = await apiCall('/api/rooms', 'POST', { name: roomName });
      showToast(`Room created. Code: ${data.room.room_code}`);
      document.getElementById('roomName').value = '';
    } catch (error) {
      showToast(`Failed to create room: ${error.message}`);
    }
  }

  async function joinRoom() {
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();
    if (!roomCode || roomCode.length !== 6) {
      showToast('Please enter a valid 6-character room code.');
      return;
    }

    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: roomCode });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      showToast(`Joined room: ${data.room.name}`);
      await loadCurrentRoom();
    } catch (error) {
      showToast(`Failed to join room: ${error.message}`);
    }
  }

  async function joinDemoRoom() {
    try {
      const data = await apiCall('/api/rooms/join', 'POST', { room_code: 'DEMO01' });
      currentRoomId = data.room.id;
      currentRoomData = data.room;
      showToast('Joined demo room.');
      await loadCurrentRoom();
    } catch (error) {
      showToast(`Failed to join demo room: ${error.message}`);
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
      document.getElementById('glossarySection').style.display = 'block';

      await loadRoomProgress();
      await loadGlossary();
    } catch (error) {
      console.log('Failed to load room, clearing state:', error.message);
      currentRoomId = null;
      currentRoomData = null;
      showToast('Room no longer available.');
    }
  }

  async function leaveRoom() {
    if (!currentRoomId) return;

    showConfirm(
      'Leave Room',
      'Are you sure you want to leave this room? You will lose your current session.',
      async () => {
        try {
          await apiCall(`/api/rooms/${currentRoomId}/leave`, 'POST');
        } catch (error) {
          console.log('Leave room API call failed:', error.message);
        }

        currentRoomId = null;
        currentRoomData = null;
        cpuFullyLit = false;

        document.getElementById('joinRoomSection').classList.remove('hidden');
        document.getElementById('currentRoomInfo').classList.add('hidden');
        document.getElementById('cpuSection').style.display = 'none';
        document.getElementById('moduleSection').style.display = 'none';
        document.getElementById('membersSection').style.display = 'none';
        document.getElementById('glossarySection').style.display = 'none';
        document.getElementById('resetSection').classList.add('hidden');

        const cpuContainer = document.getElementById('cpuContainer');
        cpuContainer.classList.remove('all-active');
        for (let i = 1; i <= 6; i++) {
          document.getElementById(`node${i}`).classList.remove('active');
        }

        showToast('Left room successfully.');
      }
    );
  }

  async function resetProgress() {
    showConfirm(
      'Reset All Progress',
      'This will delete all completed modules for everyone in the room. This cannot be undone.',
      async () => {
        try {
          await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');

          cpuFullyLit = false;

          const cpuContainer = document.getElementById('cpuContainer');
          cpuContainer.classList.remove('all-active');

          for (let i = 1; i <= 6; i++) {
            document.getElementById(`node${i}`).classList.remove('active');
          }

          document.getElementById('resetSection').classList.add('hidden');

          const buttons = document.querySelectorAll('.module-btn');
          buttons.forEach(btn => btn.classList.remove('completed'));

          const membersList = document.getElementById('membersList');
          membersList.innerHTML = '';

          showToast('Progress reset for all members.');

          await new Promise(resolve => setTimeout(resolve, 500));
          await loadRoomProgress();
        } catch (error) {
          showToast(`Failed to reset progress: ${error.message}`);
          console.error('Reset error:', error);
        }
      }
    );
  }

  async function resetProgressMidGame() {
    showConfirm(
      'Reset Room Progress',
      'This will delete all completed modules for everyone in the room. Are you sure?',
      async () => {
        const refreshBtn = document.getElementById('refreshProgressBtn');
        const originalText = refreshBtn ? refreshBtn.innerHTML : '';

        if (refreshBtn) {
          refreshBtn.innerHTML = 'Resetting...';
          refreshBtn.disabled = true;
        }

        try {
          await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');
          cpuFullyLit = false;

          const cpuContainer = document.getElementById('cpuContainer');
          cpuContainer.classList.remove('all-active');

          for (let i = 1; i <= 6; i++) {
            document.getElementById(`node${i}`).classList.remove('active');
          }

          const resetSection = document.getElementById('resetSection');
          if (resetSection) resetSection.classList.add('hidden');

          const buttons = document.querySelectorAll('.module-btn');
          buttons.forEach(btn => btn.classList.remove('completed'));

          showToast('All progress reset.');

          await new Promise(resolve => setTimeout(resolve, 500));
          await loadRoomProgress();
        } catch (error) {
          showToast(`Failed to reset: ${error.message}`);
        } finally {
          if (refreshBtn) {
            refreshBtn.innerHTML = originalText;
            refreshBtn.disabled = false;
          }
        }
      }
    );
  }

  function animateModuleButton(moduleNumber) {
    const buttons = document.querySelectorAll('.module-btn');
    const button = buttons[moduleNumber - 1];
    button.classList.add('completed');
  }

  function animateNode(nodeNumber) {
    const node = document.getElementById(`node${nodeNumber}`);
    node.classList.add('active');
  }

  async function completeModule(moduleNumber) {
    try {
      const data = await apiCall('/api/progress/complete', 'POST', { module_number: moduleNumber });

      animateModuleButton(moduleNumber);

      if (data.room_progress) {
        if (data.room_progress.room_complete) {
          showToast('All modules completed by everyone. The CPU is fully active.');
          await loadRoomProgress();
        } else if (data.room_progress.module_complete) {
          showToast(`Everyone in the room has completed Module ${moduleNumber}.`);
          setTimeout(() => animateNode(moduleNumber), 250);
          await loadRoomProgress();
        } else {
          showToast(`Module ${moduleNumber} completed. Waiting for other members.`);
          await loadRoomProgress();
        }
      } else {
        showToast(`Module ${moduleNumber} completed.`);
        await loadRoomProgress();
      }
    } catch (error) {
      showToast(`Failed to complete module: ${error.message}`);
    }
  }

  async function loadRoomProgress() {
    if (!currentRoomId) return;

    const refreshBtn = document.getElementById('refreshProgressBtn');
    const originalText = refreshBtn ? refreshBtn.innerHTML : '';
    if (refreshBtn) {
      refreshBtn.innerHTML = 'Refreshing...';
      refreshBtn.disabled = true;
    }

    try {
      const data = await apiCall(`/api/rooms/${currentRoomId}/progress?t=${Date.now()}`);

      const currentUserId = currentUser.id;
      const isStillMember = data.member_progress.some(m => m.id === currentUserId);

      if (!isStillMember) {
        showToast('You have been removed from this room.');

        currentRoomId = null;
        currentRoomData = null;
        cpuFullyLit = false;

        document.getElementById('joinRoomSection').classList.remove('hidden');
        document.getElementById('currentRoomInfo').classList.add('hidden');
        document.getElementById('cpuSection').style.display = 'none';
        document.getElementById('moduleSection').style.display = 'none';
        document.getElementById('membersSection').style.display = 'none';
        document.getElementById('glossarySection').style.display = 'none';
        document.getElementById('resetSection').classList.add('hidden');

        return;
      }

      document.getElementById('displayMemberCount').textContent = data.total_members;

      if (!cpuFullyLit) {
        for (let i = 1; i <= 6; i++) {
          document.getElementById(`node${i}`).classList.remove('active');
        }

        data.completed_modules.forEach(moduleNum => {
          document.getElementById(`node${moduleNum}`).classList.add('active');
        });

        if (data.completed_modules.length === 6) {
          cpuFullyLit = true;
          document.getElementById('cpuContainer').classList.add('all-active');
          document.getElementById('resetSection').classList.remove('hidden');
        }
      }

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
          if (member.completed_modules.includes(i)) badge.classList.add('completed');
          modules.appendChild(badge);
        }

        li.appendChild(info);
        li.appendChild(modules);
        membersList.appendChild(li);
      });

      const myProgress = await apiCall('/api/progress/my-progress');
      const buttons = document.querySelectorAll('.module-btn');
      buttons.forEach(btn => btn.classList.remove('completed'));
      myProgress.completed_modules.forEach(moduleNum => {
        buttons[moduleNum - 1].classList.add('completed');
      });

      const now = new Date().toLocaleTimeString();
      const lastRefreshEl = document.getElementById('lastRefresh');
      if (lastRefreshEl) lastRefreshEl.textContent = `Last updated: ${now}`;

    } catch (error) {
      console.error('Failed to load room progress:', error);

      if (error.message.includes('Room not found') || error.message.includes('not found')) {
        showToast('This room has been deleted.');

        currentRoomId = null;
        currentRoomData = null;
        cpuFullyLit = false;

        document.getElementById('joinRoomSection').classList.remove('hidden');
        document.getElementById('currentRoomInfo').classList.add('hidden');
        document.getElementById('cpuSection').style.display = 'none';
        document.getElementById('moduleSection').style.display = 'none';
        document.getElementById('membersSection').style.display = 'none';
        document.getElementById('glossarySection').style.display = 'none';
        document.getElementById('resetSection').classList.add('hidden');
        return;
      }

      showToast(`Failed to refresh: ${error.message}`);
    } finally {
      if (refreshBtn) {
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
      }
    }
  }

  // Auto-refresh progress and glossary every 5 seconds if in a room
  setInterval(() => {
    if (currentRoomId && authToken) {
      loadRoomProgress();
      loadGlossary();
    }
  }, 5000);

  // Module overlay
  function openModule(btn) {
    try {
      const permalink = btn.getAttribute('data-permalink') || '/cores/core-1';
      const moduleNumber = parseInt(btn.getAttribute('data-module')) || 0;

      const firstSeg = window.location.pathname.split('/')[1];
      const base = firstSeg === 'frontend' ? '/frontend' : '';
      const url = base + permalink;

      const panel = document.getElementById('modulePanel');
      const content = document.getElementById('modulePanelContent');
      const markBtn = document.getElementById('moduleMarkBtn');
      const closeBtn = document.getElementById('moduleCloseBtn');
      const dialog = panel.querySelector('.module-dialog');

      if (panel.parentElement !== document.body) document.body.appendChild(panel);

      document.body.classList.add('module-panel-open');
      content.innerHTML = '<p style="color: var(--muted);">Loading...</p>';
      panel.style.display = 'flex';
      panel.scrollTop = 0;
      if (dialog) dialog.scrollTop = 0;

      markBtn.onclick = async () => {
        try {
          await completeModule(moduleNumber);
          closeModule();
          showToast('Marked complete.');
        } catch (e) {
          console.error('Mark complete failed', e);
          closeModule();
          showToast('Login required to mark complete.');
        }
      };

      if (closeBtn) closeBtn.onclick = closeModule;

      fetch(url, { credentials: 'same-origin' })
        .then(r => r.text())
        .then(html => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const postContent = doc.querySelector('.post-content');

            if (postContent) {
              const clonedContent = postContent.cloneNode(true);
              content.innerHTML = '';
              const cleanDiv = document.createElement('div');
              cleanDiv.style.width = '100%';
              cleanDiv.style.maxWidth = 'none';
              cleanDiv.innerHTML = clonedContent.innerHTML;
              content.appendChild(cleanDiv);

              setTimeout(() => {
                const allElements = content.querySelectorAll('*');
                allElements.forEach(el => {
                  const computed = window.getComputedStyle(el);
                  if (computed.maxWidth && computed.maxWidth !== 'none') el.style.maxWidth = 'none';
                  if (el.classList.contains('wrapper') || el.classList.contains('container')) {
                    el.style.maxWidth = 'none';
                    el.style.width = '100%';
                    el.style.marginLeft = '0';
                    el.style.marginRight = '0';
                  }
                });
              }, 10);
            } else {
              const article = doc.querySelector('article') || doc.querySelector('.container') || doc.querySelector('#content') || doc.body;
              content.innerHTML = article ? article.innerHTML : html;
            }
          } catch (e) {
            content.innerHTML = html;
          }

          if (dialog) dialog.scrollTop = 0;
        })
        .catch(err => {
          content.innerHTML = `<p style="color: rgba(196,74,74,0.95);">Failed to load module: ${err.message}</p>`;
        });

    } catch (err) {
      console.error('openModule error', err);
    }
  }

  function closeModule() {
    const panel = document.getElementById('modulePanel');
    if (!panel) return;
    panel.style.display = 'none';
    document.body.classList.remove('module-panel-open');
    panel.scrollTop = 0;
  }

  // ===== GLOSSARY FUNCTIONS =====
  let currentEditingEntryId = null;

  async function loadGlossary(searchTerm = '') {
    if (!currentRoomId) return;

    try {
      const url = searchTerm
        ? `/api/glossary/room/${currentRoomId}?search=${encodeURIComponent(searchTerm)}`
        : `/api/glossary/room/${currentRoomId}`;

      const data = await apiCall(url);

      document.getElementById('glossaryTotalEntries').textContent = data.stats.total_entries;
      document.getElementById('glossaryContributors').textContent = data.stats.contributors;

      const glossaryList = document.getElementById('glossaryList');

      if (data.entries.length === 0) {
        glossaryList.innerHTML = `
          <div class="glossary-empty">
            <p>${searchTerm ? 'No entries found matching your search.' : 'No glossary entries yet. Add the first one.'}</p>
          </div>
        `;
        return;
      }

      glossaryList.innerHTML = data.entries.map(entry => createGlossaryEntryHTML(entry)).join('');
    } catch (error) {
      showToast(`Failed to load glossary: ${error.message}`);
    }
  }

  function createGlossaryEntryHTML(entry) {
    const isAuthor = currentUser && entry.author_id === currentUser.id;
    const isAdmin = currentUser && currentUser.role === 'admin';
    const canEdit = isAuthor || isAdmin;

    return `
      <div class="glossary-entry" id="entry-${entry.id}">
        <div class="glossary-term">${escapeHtml(entry.term)}</div>
        <div class="glossary-definition">${escapeHtml(entry.definition)}</div>
        <div class="glossary-meta">
          <span>Added by ${escapeHtml(entry.author_name)} on ${formatDate(entry.created_at)}</span>
          ${canEdit ? `
            <div class="glossary-actions">
              <button class="glossary-action-btn" onclick="startEditEntry(${entry.id})">Edit</button>
              <button class="glossary-action-btn delete" onclick="deleteGlossaryEntry(${entry.id})">Delete</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  async function addGlossaryEntry(event) {
    event.preventDefault();

    const term = document.getElementById('glossaryTerm').value.trim();
    const definition = document.getElementById('glossaryDefinition').value.trim();

    if (!term || !definition) {
      showToast('Please fill in both term and definition.');
      return;
    }

    try {
      await apiCall(`/api/glossary/room/${currentRoomId}`, 'POST', { term, definition });
      showToast('Entry added to glossary.');
      document.getElementById('glossaryTerm').value = '';
      document.getElementById('glossaryDefinition').value = '';
      await loadGlossary();
    } catch (error) {
      showToast(`Failed to add entry: ${error.message}`);
    }
  }

  async function startEditEntry(entryId) {
    if (currentEditingEntryId) cancelEdit();
    currentEditingEntryId = entryId;

    try {
      await apiCall(`/api/glossary/${entryId}`);
      const entryElement = document.getElementById(`entry-${entryId}`);
      const term = entryElement.querySelector('.glossary-term').textContent;
      const definition = entryElement.querySelector('.glossary-definition').textContent;

      entryElement.innerHTML = `
        <div class="edit-form" style="background: rgba(11,18,32,0.35); padding: 12px; border-radius: var(--radius-sm); border: 1px solid var(--border);">
          <div class="form-group">
            <label>Term</label>
            <input type="text" id="editTerm-${entryId}" value="${escapeHtml(term)}">
          </div>
          <div class="form-group">
            <label>Definition</label>
            <textarea id="editDefinition-${entryId}" rows="4">${escapeHtml(definition)}</textarea>
          </div>
          <div class="edit-form-actions" style="display:flex; gap: 8px;">
            <button class="btn" onclick="saveEdit(${entryId})">Save</button>
            <button class="btn btn-secondary" onclick="cancelEdit()">Cancel</button>
          </div>
        </div>
      `;
    } catch (error) {
      showToast(`Failed to load entry: ${error.message}`);
    }
  }

  async function saveEdit(entryId) {
    const term = document.getElementById(`editTerm-${entryId}`).value.trim();
    const definition = document.getElementById(`editDefinition-${entryId}`).value.trim();

    if (!term || !definition) {
      showToast('Term and definition cannot be empty.');
      return;
    }

    try {
      await apiCall(`/api/glossary/${entryId}`, 'PUT', { term, definition });
      showToast('Entry updated successfully.');
      currentEditingEntryId = null;
      await loadGlossary();
    } catch (error) {
      showToast(`Failed to update entry: ${error.message}`);
    }
  }

  function cancelEdit() {
    currentEditingEntryId = null;
    loadGlossary();
  }

  async function deleteGlossaryEntry(entryId) {
    showConfirm(
      'Delete Entry',
      'Are you sure you want to delete this glossary entry? This cannot be undone.',
      async () => {
        try {
          await apiCall(`/api/glossary/${entryId}`, 'DELETE');
          showToast('Entry deleted successfully.');
          await loadGlossary();
        } catch (error) {
          showToast(`Failed to delete entry: ${error.message}`);
        }
      }
    );
  }

  function searchGlossary() {
    const searchTerm = document.getElementById('glossarySearch').value.trim();
    loadGlossary(searchTerm);
  }

  // ===== ADMIN ROOMS MANAGEMENT =====
  let adminRoomsData = [];

  async function showActiveRoomsModal() {
    const modal = document.getElementById('adminRoomsModal');
    modal.classList.add('show');
    await loadActiveRooms();
  }

  function closeAdminRoomsModal() {
    const modal = document.getElementById('adminRoomsModal');
    modal.classList.remove('show');
  }

  async function loadActiveRooms() {
    try {
      const data = await apiCall('/api/rooms/active');
      adminRoomsData = data.rooms;
      displayAdminRooms(adminRoomsData);
    } catch (error) {
      const roomsList = document.getElementById('adminRoomsList');
      roomsList.innerHTML = `<p style="color: rgba(196,74,74,0.95); text-align: center;">Failed to load rooms: ${error.message}</p>`;
    }
  }

  function displayAdminRooms(rooms) {
    const totalRooms = rooms.length;
    const deletableRooms = rooms.filter(r => r.can_delete).length;
    const totalMembers = rooms.reduce((sum, r) => sum + r.member_count, 0);

    document.getElementById('totalRooms').textContent = totalRooms;
    document.getElementById('deletableRooms').textContent = deletableRooms;
    document.getElementById('totalMembers').textContent = totalMembers;

    const roomsList = document.getElementById('adminRoomsList');

    if (rooms.length === 0) {
      roomsList.innerHTML = '<p style="color: var(--muted); text-align: center;">No rooms found.</p>';
      return;
    }

    roomsList.innerHTML = rooms.map(room => {
      const isDemo = room.is_demo;
      const checkboxHtml = room.can_delete
        ? `<input type="checkbox" class="room-checkbox" data-room-id="${room.id}">`
        : '';

      return `
        <div class="room-card ${isDemo ? 'demo' : ''}">
          <div class="room-card-info" style="flex:1;">
            <div class="room-card-title">
              ${escapeHtml(room.name)}
              ${isDemo ? '<span style="color: rgba(47,143,91,1); margin-left: 10px; font-weight: 800;">DEMO</span>' : ''}
            </div>
            <div class="room-card-details">
              <div class="room-card-detail"><strong>Code:</strong> ${room.room_code}</div>
              <div class="room-card-detail"><strong>Members:</strong> ${room.member_count}</div>
              <div class="room-card-detail"><strong>Progress:</strong> ${room.progress_percentage.toFixed(0)}% (${room.completed_modules.length}/6)</div>
              <div class="room-card-detail"><strong>Creator:</strong> ${escapeHtml(room.creator_name)}</div>
              <div class="room-card-detail"><strong>Created:</strong> ${new Date(room.created_at).toLocaleDateString()}</div>
            </div>
          </div>
          <div class="room-card-actions">
            ${checkboxHtml}
            <button class="btn btn-warning btn-small" onclick="shutdownRoom(${room.id})">Shutdown</button>
            ${room.can_delete ? `
              <button class="btn btn-danger btn-small" onclick="deleteSingleRoom(${room.id})">Delete</button>
            ` : `
              <span style="color: rgba(47,143,91,1); font-weight: 800;">Protected</span>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  async function refreshActiveRooms() {
    showToast('Refreshing rooms...');
    await loadActiveRooms();
    showToast('Rooms refreshed.');
  }

  async function deleteSingleRoom(roomId) {
    const room = adminRoomsData.find(r => r.id === roomId);
    if (!room) return;

    showConfirm(
      'Delete Room',
      `Are you sure you want to delete "${room.name}" (${room.room_code})? This will remove all members and progress.`,
      async () => {
        try {
          await apiCall(`/api/rooms/${roomId}`, 'DELETE');
          showToast(`Room "${room.name}" deleted successfully.`);
          await loadActiveRooms();
        } catch (error) {
          showToast(`Failed to delete room: ${error.message}`);
        }
      }
    );
  }

  async function shutdownRoom(roomId) {
    const room = adminRoomsData.find(r => r.id === roomId);
    if (!room) return;

    showConfirm(
      'Shutdown Room',
      `Are you sure you want to shutdown "${room.name}" (${room.room_code})? This will remove all ${room.member_count} member(s) from the room.`,
      async () => {
        try {
          const result = await apiCall(`/api/rooms/${roomId}/shutdown`, 'POST');
          showToast(`${result.message}`);
          await loadActiveRooms();
        } catch (error) {
          showToast(`Failed to shutdown room: ${error.message}`);
        }
      }
    );
  }

  async function deleteSelectedRooms() {
    const checkboxes = document.querySelectorAll('.room-checkbox:checked');
    const roomIds = Array.from(checkboxes).map(cb => parseInt(cb.dataset.roomId));

    if (roomIds.length === 0) {
      showToast('No rooms selected.');
      return;
    }

    showConfirm(
      'Delete Selected Rooms',
      `Are you sure you want to delete ${roomIds.length} selected room(s)? This cannot be undone.`,
      async () => {
        try {
          const result = await apiCall('/api/rooms/bulk-delete', 'POST', { room_ids: roomIds });
          let message = `${result.message} Deleted: ${result.summary.deleted_count}. Protected: ${result.summary.protected_count}. Failed: ${result.summary.failed_count}.`;
          showToast(message);
          await loadActiveRooms();
        } catch (error) {
          showToast(`Bulk delete failed: ${error.message}`);
        }
      }
    );
  }

  async function deleteAllNonDemoRooms() {
    const deletableRooms = adminRoomsData.filter(r => r.can_delete);

    if (deletableRooms.length === 0) {
      showToast('No deletable rooms found.');
      return;
    }

    showConfirm(
      'Delete All Non-Demo Rooms',
      `This will delete all ${deletableRooms.length} non-demo room(s). This cannot be undone.`,
      async () => {
        try {
          const roomIds = deletableRooms.map(r => r.id);
          const result = await apiCall('/api/rooms/bulk-delete', 'POST', { room_ids: roomIds });
          showToast(`${result.message} Deleted: ${result.summary.deleted_count} room(s).`);
          await loadActiveRooms();
        } catch (error) {
          showToast(`Failed to delete rooms: ${error.message}`);
        }
      }
    );
  }
</script>
