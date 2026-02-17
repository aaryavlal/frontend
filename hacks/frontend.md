---
layout: post
title: Hardware Havoc
description: Fix the cores, learn Computing, play the game!
permalink: /prototyperoomcode
breadcrumbs: true
---

<style>
  :root{
    --bg: #0a0e14;
    --paper: #12171e;
    --surface: #1a2028;
    --surface-2: #141a22;
    --ink: #e0e6ed;
    --muted: #8b95a5;
    --muted-2: #6b7684;
    --border: rgba(0,255,170,0.15);
    --border-strong: rgba(0,255,170,0.28);
    --accent: #00ffaa;     /* electric green */
    --accent-2: #00d4ff;   /* cyan blue */
    --accent-3: #ff00aa;   /* magenta */
    --success: #00ff88;
    --warning: #ffaa00;
    --danger: #ff3366;

    --radius: 2px;
    --radius-sm: 1px;
    --shadow: 0 4px 20px rgba(0,255,170,0.15), 0 0 40px rgba(0,255,170,0.08);
    --shadow-sm: 0 2px 10px rgba(0,255,170,0.12);
    --glow: 0 0 10px rgba(0,255,170,0.6), 0 0 20px rgba(0,255,170,0.4);

    --font: 'Courier New', 'Consolas', monospace;
    --serif: 'Courier New', 'Consolas', monospace;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body{
    font-family: var(--font);
    background:
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
      repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,255,170,0.03) 2px, rgba(0,255,170,0.03) 4px),
      radial-gradient(circle at 20% 20%, rgba(0,255,170,0.08), transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(0,212,255,0.06), transparent 50%),
      var(--bg);
    background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%;
    color: var(--ink);
    min-height: 100vh;
    padding: 22px;
    line-height: 1.5;
    letter-spacing: 0.3px;
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
    background: linear-gradient(135deg, rgba(26,32,40,0.95), rgba(18,23,30,0.95));
    border: 2px solid var(--border-strong);
    border-left: 4px solid var(--accent);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    position: relative;
  }

  .header::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2), transparent);
    opacity: 0.6;
  }

  .menu-container{
    position: relative;
  }

  .menu-btn{
    padding: 7px 12px;
    background: rgba(0,255,170,0.08);
    color: var(--accent);
    border: 1px solid var(--accent);
    border-radius: var(--radius);
    font-size: 0.9rem;
    cursor: pointer;
    font-weight: 700;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .menu-btn:hover{
    background: rgba(0,255,170,0.15);
    box-shadow: var(--glow);
    text-shadow: 0 0 8px var(--accent);
  }

  .dropdown-menu{
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: rgba(18,23,30,0.98);
    border: 2px solid var(--accent);
    border-radius: var(--radius);
    box-shadow: var(--shadow), var(--glow);
    min-width: 160px;
    z-index: 1000;
    overflow: hidden;
  }

  .dropdown-menu.show{
    display: block;
    animation: slideUp 0.2s ease-out;
  }

  .dropdown-menu.closing{
    animation: slideDown 0.15s ease-out;
  }

  .dropdown-item{
    padding: 12px 16px;
    color: var(--accent);
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 700;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .dropdown-item:hover{
    background: rgba(0,255,170,0.10);
    border-left-color: var(--accent);
    text-shadow: 0 0 8px var(--accent);
  }

  .dropdown-divider{
    height: 1px;
    background: var(--accent);
    margin: 4px 0;
    opacity: 0.3;
  }

  /* Tabs */
  .tabs-container{
    display: flex;
    gap: 4px;
    margin-bottom: 18px;
    border-bottom: 2px solid var(--accent);
    padding-bottom: 0;
    flex-wrap: wrap;
    box-shadow: 0 2px 8px rgba(0,255,170,0.2);
  }

  .tab-btn{
    padding: 12px 20px;
    background: rgba(0,255,170,0.03);
    color: var(--muted);
    border: 1px solid var(--border);
    border-bottom: 3px solid transparent;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    margin-bottom: -2px;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
  }

  .tab-btn:hover{
    color: var(--accent);
    background: rgba(0,255,170,0.08);
    border-color: var(--accent);
  }

  .tab-btn.active{
    color: var(--accent);
    border-bottom-color: var(--accent);
    background: rgba(0,255,170,0.12);
    text-shadow: 0 0 8px var(--accent);
    box-shadow: 0 0 15px rgba(0,255,170,0.3);
  }

  .tab-btn.active::after{
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--accent);
    box-shadow: 0 0 10px var(--accent);
  }

  .tab-content{
    display: none;
  }

  .tab-content.active{
    display: block;
  }

  .compact-section{
    background: linear-gradient(135deg, rgba(26,32,40,0.92), rgba(18,23,30,0.92));
    padding: 18px 20px;
    border-radius: var(--radius);
    margin-bottom: 14px;
    border: 2px solid var(--border-strong);
    border-left: 4px solid var(--accent);
    box-shadow: var(--shadow-sm);
    position: relative;
  }

  .compact-section::before{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.5;
  }

  .section-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }

  .section-title{
    font-family: var(--serif);
    font-size: 1rem;
    color: var(--accent);
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0,255,170,0.5);
  }

  /* Two-column layout for progress tab */
  .progress-layout{
    display: flex;
    gap: 0;
    position: relative;
  }

  .progress-main{
    flex: 1;
    min-width: 300px;
    padding-right: 9px;
  }

  .resize-handle{
    width: 8px;
    cursor: col-resize;
    background: linear-gradient(90deg,
      transparent 0%,
      var(--accent) 40%,
      var(--accent) 60%,
      transparent 100%);
    position: relative;
    flex-shrink: 0;
    transition: all 0.2s ease;
    opacity: 0.3;
  }

  .resize-handle:hover{
    opacity: 1;
    box-shadow: 0 0 20px var(--accent);
  }

  .resize-handle:active{
    background: var(--accent);
    opacity: 1;
    box-shadow: 0 0 30px var(--accent);
  }

  .progress-sidebar{
    width: 220px;
    min-width: 180px;
    max-width: 500px;
    padding-left: 9px;
  }

  @media (max-width: 1024px) {
    .progress-layout{
      flex-direction: column;
    }

    .progress-main{
      padding-right: 0;
    }

    .resize-handle{
      display: none;
    }

    .progress-sidebar{
      order: -1;
      width: 100%;
      max-width: none;
      padding-left: 0;
    }
  }

  .header h2{
    font-family: var(--serif);
    letter-spacing: 3px;
    color: var(--accent);
    font-size: 1.8rem;
    margin-bottom: 6px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: 0 0 15px rgba(0,255,170,0.6);
  }

  .header p{
    color: var(--muted);
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 1px;
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
    background: rgba(10,14,20,0.80);
    border: 2px solid var(--border-strong);
    border-left: 3px solid var(--accent);
    border-radius: var(--radius);
    color: var(--accent);
    font-size: 0.9rem;
    font-family: var(--font);
    transition: all 0.2s ease;
  }

  input:focus, textarea:focus{
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 15px rgba(0,255,170,0.3), inset 0 0 10px rgba(0,255,170,0.05);
    background: rgba(10,14,20,0.95);
  }

  input::placeholder, textarea::placeholder{
    color: var(--muted-2);
    opacity: 0.6;
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
    background: rgba(0,255,170,0.15);
    color: var(--accent);
    border: 2px solid var(--accent);
    border-radius: var(--radius);
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 0 10px rgba(0,255,170,0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn:hover{
    background: rgba(0,255,170,0.25);
    box-shadow: var(--glow);
    text-shadow: 0 0 8px var(--accent);
  }
  .btn:active{
    transform: scale(0.98);
    box-shadow: 0 0 5px rgba(0,255,170,0.5);
  }

  .btn-secondary{
    background: rgba(0,212,255,0.10);
    color: var(--accent-2);
    border: 2px solid var(--accent-2);
    box-shadow: 0 0 10px rgba(0,212,255,0.2);
  }

  .btn-secondary:hover{
    background: rgba(0,212,255,0.20);
    box-shadow: 0 0 10px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.4);
    text-shadow: 0 0 8px var(--accent-2);
  }

  .btn-warning{
    background: rgba(255,170,0,0.15);
    border-color: var(--warning);
    color: var(--warning);
    box-shadow: 0 0 10px rgba(255,170,0,0.3);
  }

  .btn-warning:hover{
    background: rgba(255,170,0,0.25);
    box-shadow: 0 0 10px var(--warning), 0 0 20px rgba(255,170,0,0.4);
    text-shadow: 0 0 8px var(--warning);
  }

  .btn-danger{
    background: rgba(255,51,102,0.15);
    border-color: var(--danger);
    color: var(--danger);
    box-shadow: 0 0 10px rgba(255,51,102,0.3);
  }

  .btn-danger:hover{
    background: rgba(255,51,102,0.25);
    box-shadow: 0 0 10px var(--danger), 0 0 20px rgba(255,51,102,0.4);
    text-shadow: 0 0 8px var(--danger);
  }

  .btn-small{ padding: 8px 12px; font-size: 0.8rem; }

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

  /* CPU */
  .cpu-container{
    position: relative;
    max-width: 640px;
    margin: 22px auto 0;
    padding: 28px;
    background: linear-gradient(135deg, rgba(18,23,30,0.95), rgba(10,14,20,0.95));
    border-radius: var(--radius);
    border: 3px solid var(--accent);
    box-shadow: var(--shadow), inset 0 0 30px rgba(0,255,170,0.1);
  }

  .cpu-label{
    position:absolute;
    top: 12px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 3px;
    color: var(--accent);
    text-shadow: 0 0 10px var(--accent);
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
    background: var(--accent);
    border-radius: 1px;
    box-shadow: 0 0 5px var(--accent);
    opacity: 0.4;
  }
  .cpu-pins.left .pin, .cpu-pins.right .pin{ width: 14px; height: 4px; }

  /* Node tiles */
  .node{
    background: rgba(18,23,30,0.85);
    padding: 16px 14px;
    border-radius: var(--radius);
    text-align:center;
    border: 2px solid var(--border);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .node::before{
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,255,170,0.1), transparent);
    transition: left 0.5s ease;
  }

  .node:hover::before{
    left: 100%;
  }

  .node-icon{
    font-size: 1.8rem;
    margin-bottom: 8px;
    color: var(--muted-2);
    transition: all 0.3s ease;
  }

  .node-label{
    font-weight: 800;
    letter-spacing: 2px;
    font-size: 0.7rem;
    color: var(--muted);
    transition: all 0.3s ease;
  }

  .node.active{
    border-color: var(--accent);
    background: rgba(0,255,170,0.12);
    box-shadow: 0 0 20px rgba(0,255,170,0.4), inset 0 0 20px rgba(0,255,170,0.1);
  }
  .node.active .node-icon{
    color: var(--accent);
    text-shadow: 0 0 15px var(--accent);
  }
  .node.active .node-label{
    color: var(--accent);
    text-shadow: 0 0 10px var(--accent);
  }

  /* Fully lit state */
  .cpu-container.all-active{
    border-color: var(--accent);
    box-shadow: 0 0 40px rgba(0,255,170,0.6), 0 0 80px rgba(0,255,170,0.3);
    animation: pulse-glow 2s infinite;
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 40px rgba(0,255,170,0.6), 0 0 80px rgba(0,255,170,0.3);
    }
    50% {
      box-shadow: 0 0 60px rgba(0,255,170,0.8), 0 0 100px rgba(0,255,170,0.4);
    }
  }

  /* New Game button - appears when all 6 cores are lit */
  .new-game-btn{
    display: block;
    width: 100%;
    margin-top: 16px;
    padding: 14px 24px;
    background: rgba(0,255,170,0.15);
    color: var(--accent);
    border: 2px solid var(--accent);
    border-radius: var(--radius);
    font-family: var(--font);
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 0 15px rgba(0,255,170,0.4), 0 0 30px rgba(0,255,170,0.2);
    animation: newGamePulse 2s infinite;
  }

  .new-game-btn:hover{
    background: rgba(0,255,170,0.25);
    box-shadow: 0 0 25px rgba(0,255,170,0.6), 0 0 50px rgba(0,255,170,0.3);
    text-shadow: 0 0 10px var(--accent);
    transform: scale(1.02);
  }

  .new-game-btn.hidden{
    display: none;
  }

  @keyframes newGamePulse {
    0%, 100% { box-shadow: 0 0 15px rgba(0,255,170,0.4), 0 0 30px rgba(0,255,170,0.2); }
    50% { box-shadow: 0 0 25px rgba(0,255,170,0.6), 0 0 50px rgba(0,255,170,0.3); }
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
    background: rgba(18,23,30,0.70);
    border: 2px solid var(--border-strong);
    border-left: 3px solid var(--accent-2);
    border-radius: var(--radius);
    color: var(--ink);
    cursor:pointer;
    transition: all 0.25s ease;
    text-align:left;
    position: relative;
    overflow: hidden;
  }

  .module-btn::after{
    content: '';
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--muted-2);
    box-shadow: 0 0 5px var(--muted-2);
    transition: all 0.3s ease;
  }

  .module-btn:hover{
    background: rgba(0,212,255,0.08);
    border-color: var(--accent-2);
    box-shadow: 0 0 15px rgba(0,212,255,0.3);
    transform: translateX(3px);
  }

  .module-btn .module-icon{
    font-size: 0.9rem;
    color: var(--accent-2);
    margin-bottom: 6px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .module-btn.completed{
    background: rgba(0,255,136,0.12);
    border-color: var(--success);
    border-left-color: var(--success);
    box-shadow: 0 0 10px rgba(0,255,136,0.3);
  }

  .module-btn.completed::after{
    background: var(--success);
    box-shadow: 0 0 10px var(--success);
  }

  .module-btn.completed:hover{
    box-shadow: 0 0 20px rgba(0,255,136,0.5);
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
    animation: fadeIn 0.2s ease-out;
  }

  .module-panel.closing{
    animation: fadeOut 0.2s ease-out;
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
    animation: slideUp 0.3s ease-out;
  }

  .module-panel.closing .module-dialog{
    animation: slideDown 0.2s ease-out;
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
  /* Zoom out iframes in module panel */
  #modulePanelContent iframe{
    transform: scale(0.8);
    transform-origin: top left;
  }
  /* Zoom out and push iframe to the right for core-6 */
  #modulePanel[data-active-module="6"] #modulePanelContent iframe{
    transform: scale(0.8) translateX(250px);
  }

  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(30px);
      opacity: 0;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes scaleOut {
    from {
      transform: scale(1);
      opacity: 1;
    }
    to {
      transform: scale(0.9);
      opacity: 0;
    }
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
    animation: fadeIn 0.2s ease-out;
  }

  .confirm-modal.closing{
    animation: fadeOut 0.2s ease-out;
  }

  .confirm-dialog{
    background: rgba(15,26,46,0.98);
    border: 1px solid rgba(196,74,74,0.55);
    border-radius: var(--radius);
    padding: 22px;
    max-width: 520px;
    width: 100%;
    box-shadow: var(--shadow);
    animation: scaleIn 0.3s ease-out;
  }

  .confirm-modal.closing .confirm-dialog{
    animation: scaleOut 0.2s ease-out;
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

  .admin-rooms-modal.show{
    display:block;
    animation: fadeIn 0.2s ease-out;
  }

  .admin-rooms-modal.closing{
    animation: fadeOut 0.2s ease-out;
  }

  .admin-rooms-dialog{
    max-width: 1100px;
    margin: 22px auto;
    background: rgba(15,26,46,0.98);
    border-radius: var(--radius);
    border: 1px solid var(--border-strong);
    padding: 22px;
    box-shadow: var(--shadow);
    animation: slideUp 0.3s ease-out;
  }

  .admin-rooms-modal.closing .admin-rooms-dialog{
    animation: slideDown 0.2s ease-out;
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
    background: rgba(18,23,30,0.98);
    color: var(--accent);
    padding: 14px 16px;
    border-radius: var(--radius);
    border: 2px solid var(--accent);
    border-left: 4px solid var(--accent);
    box-shadow: var(--shadow), var(--glow);
    z-index: 999999;
    pointer-events:none;
    animation: toastIn 0.18s ease-out, toastOut 0.22s ease-out 2.6s forwards;
    max-width: min(420px, calc(100vw - 40px));
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.85rem;
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
      <div class="menu-container" style="margin-top: 8px;">
        <button class="menu-btn" onclick="toggleMenu()">☰ Menu</button>
        <div id="dropdownMenu" class="dropdown-menu">
          <button class="dropdown-item" onclick="showConfigModal(); closeMenu();">
            <span>🔧</span>
            <span>Configuration</span>
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" onclick="showTutorial(); closeMenu();">
            <span>📖</span>
            <span>Tutorial</span>
          </button>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" onclick="logout(); closeMenu();">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content Area -->
  <div id="mainContent" style="display: none;">
    <!-- Tabs Navigation -->
    <div class="tabs-container">
      <button class="tab-btn active" onclick="switchTab('room')">Room</button>
      <button class="tab-btn" onclick="switchTab('progress')">Progress & Modules</button>
      <button class="tab-btn" onclick="switchTab('glossary')">Glossary</button>
    </div>

    <!-- Tab Content: Room -->
    <div id="tabRoom" class="tab-content active">
      <!-- Admin: Create Room -->
      <div id="createRoomSection" class="compact-section hidden">
        <div class="section-header">
          <h3 class="section-title">Create Room (Admin)</h3>
        </div>
        <div class="inline-inputs">
          <div class="form-group">
            <label for="roomName">Room Name</label>
            <input type="text" id="roomName" placeholder="e.g., Computer Science 101">
          </div>
          <button class="btn" onclick="createRoom()">Create Room</button>
        </div>
        <div style="margin-top: 14px;">
          <button class="btn btn-secondary" onclick="showActiveRoomsModal()">Manage All Rooms</button>
        </div>
      </div>

      <!-- Join Room -->
      <div id="joinRoomSection" class="compact-section">
        <div class="section-header">
          <h3 class="section-title">Join Room</h3>
        </div>
        <div class="inline-inputs">
          <div class="form-group">
            <label for="roomCode">Room Code</label>
            <input type="text" id="roomCode" placeholder="Enter 6-character code" maxlength="6" style="text-transform: uppercase;">
          </div>
          <button class="btn" onclick="joinRoom()">Join Room</button>
        </div>
      </div>

      <!-- Current Room Info -->
      <div id="currentRoomInfo" class="compact-section hidden">
        <div class="section-header">
          <h3 class="section-title">Current Room</h3>
          <button class="btn btn-danger btn-small" onclick="leaveRoom()">Leave Room</button>
        </div>
        <div class="room-code" id="displayRoomCode">------</div>
        <p style="margin: 8px 0; color: var(--muted);"><strong>Room Name:</strong> <span id="displayRoomName"></span></p>
        <p style="margin: 8px 0; color: var(--muted);"><strong>Members:</strong> <span id="displayMemberCount"></span></p>
      </div>
    </div>

    <!-- Tab Content: Progress & Modules -->
    <div id="tabProgress" class="tab-content">
      <div class="progress-layout">
        <!-- Left Side: Progress Content -->
        <div class="progress-main">
          <!-- CPU Visualization -->
          <div class="compact-section">
            <div class="section-header">
              <h3 class="section-title">CPU Core Status</h3>
              <button id="resetProgressBtn" class="btn btn-danger btn-small hidden" onclick="resetProgressMidGame()">Reset Progress</button>
            </div>
            <p style="color: var(--muted); margin-bottom: 12px; text-align: center; font-size: 0.9rem;">
              Each core activates when all members complete the corresponding module.
            </p>
            <div class="cpu-container" id="cpuContainer">
              <div class="cpu-label">PARALLEL PROCESSOR</div>
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
                <div class="node" id="node1"><div class="node-icon">I</div><div class="node-label">CORE 1</div></div>
                <div class="node" id="node2"><div class="node-icon">II</div><div class="node-label">CORE 2</div></div>
                <div class="node" id="node3"><div class="node-icon">III</div><div class="node-label">CORE 3</div></div>
                <div class="node" id="node4"><div class="node-icon">IV</div><div class="node-label">CORE 4</div></div>
                <div class="node" id="node5"><div class="node-icon">V</div><div class="node-label">CORE 5</div></div>
                <div class="node" id="node6"><div class="node-icon">VI</div><div class="node-label">CORE 6</div></div>
              </div>
            </div>
            <button id="newGameBtn" class="new-game-btn hidden" onclick="startNewGame()">New Game</button>
          </div>

          <div class="compact-section">
            <div class="section-header">
              <h3 class="section-title">Room Members Progress</h3>
              <div id="lastRefresh" style="color: var(--muted); font-size: 0.85rem;">Auto-refreshing...</div>
            </div>
            <ul class="members-list" id="membersList"></ul>
          </div>
        </div>

        <!-- Right Side: Modules Column -->
        <div class="progress-sidebar">
          <div class="compact-section">
            <div class="section-header">
              <h3 class="section-title">Modules</h3>
            </div>
            <p style="color: var(--muted); margin-bottom: 12px; font-size: 0.85rem;">
              Click to complete modules.
            </p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button class="module-btn" data-permalink="/cores/core-1" data-module="1" onclick="openModule(this)" style="margin: 0;">
                <div class="module-icon">Module</div>
                Module 1
              </button>
              <button class="module-btn" data-permalink="/cores/core-2" data-module="2" onclick="openModule(this)" style="margin: 0;">
                <div class="module-icon">Module</div>
                Module 2
              </button>
              <button class="module-btn" data-permalink="/cores/core-3" data-module="3" onclick="openModule(this)" style="margin: 0;">
                <div class="module-icon">Module</div>
                Module 3
              </button>
              <button class="module-btn" data-permalink="/cores/core-4" data-module="4" onclick="openModule(this)" style="margin: 0;">
                <div class="module-icon">Module</div>
                Module 4
              </button>
              <button class="module-btn" data-permalink="/cores/core-5" data-module="5" onclick="openModule(this)" style="margin: 0;">
                <div class="module-icon">Module</div>
                Module 5
              </button>
              <button class="module-btn" data-permalink="/cores/core-6" data-module="6" onclick="openModule(this)" style="margin: 0;">
                <div class="module-icon">Module</div>
                Module 6
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab Content: Glossary -->
    <div id="tabGlossary" class="tab-content">
      <div class="compact-section">
        <div class="section-header">
          <h3 class="section-title">Room Glossary</h3>
        </div>
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
        <div class="glossary-form" style="background: rgba(11,18,32,0.55); padding: 16px; border-radius: var(--radius-sm); margin-bottom: 14px; border: 1px solid var(--border);">
          <h4 style="margin-top: 0; font-size: 1rem; color: var(--ink);">Add New Entry</h4>
          <form id="addGlossaryForm" onsubmit="addGlossaryEntry(event)">
            <div class="form-group">
              <label for="glossaryTerm">Term</label>
              <input type="text" id="glossaryTerm" placeholder="e.g., Race Condition" required>
            </div>
            <div class="form-group">
              <label for="glossaryDefinition">Definition</label>
              <textarea id="glossaryDefinition" placeholder="Enter a clear definition..." required style="min-height: 80px; font-family: inherit;"></textarea>
            </div>
            <button type="submit" class="btn">Add to Glossary</button>
          </form>
        </div>
        <div class="form-group">
          <label for="glossarySearch">Search Glossary</label>
          <input type="text" id="glossarySearch" placeholder="Search terms and definitions..." oninput="searchGlossary()">
        </div>
        <div id="glossaryList" style="margin-top: 14px;"></div>
      </div>
    </div>

    <!-- Module Panel Overlay -->
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

<!-- Tutorial Modal -->
<div id="tutorialModal" class="confirm-modal" style="display: none;">
  <div class="confirm-dialog">
    <div style="padding: 20px; text-align: center;">
      <div class="confirm-title" id="tutorialTitle" style="margin-bottom: 12px;">Welcome to Hardware Havoc</div>
      <div id="tutorialContent" class="confirm-message" style="text-align: left; line-height: 1.6; margin-bottom: 16px;">
        <p><strong>Step 1: Room Management</strong> - Create or join a room to get started.</p>
        <p><strong>Step 2: Quiz Completion</strong> - Complete quizzes to unlock modules.</p>
        <p><strong>Step 3: Module Completion</strong> - Work through modules once all members finish their quizzes.</p>
        <p><strong>Step 4: Glossary</strong> - Build a shared knowledge base with your room members.</p>
      </div>
      <div class="confirm-buttons">
        <button class="confirm-btn confirm" onclick="closeTutorial()">Got it!</button>
      </div>
    </div>
  </div>
</div>

<!-- Configuration Modal -->
<div id="configModal" class="confirm-modal" style="display: none;">
  <div class="confirm-dialog">
    <div style="padding: 20px;">
      <div class="confirm-title" style="margin-bottom: 16px;">Configuration</div>
      <div class="form-group">
        <label for="apiUrl">Flask Server Port</label>
        <input type="text" id="apiUrl" value="http://localhost:8405" placeholder="http://localhost:8405">
      </div>
      <div class="confirm-buttons" style="margin-top: 16px;">
        <button class="confirm-btn confirm" onclick="saveConfig()">Save</button>
        <button class="confirm-btn cancel" onclick="closeConfigModal()">Cancel</button>
      </div>
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
      <button class="btn btn-danger" onclick="deleteAllDeletableRooms()">Delete All Deletable</button>
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

  const moduleQuizRequirements = {
    4: {
      minRatio: 1 / 3,
      lockedMessage: 'Score above one-third of the available points (at least 2 out of 3) on the Module 4 quiz before marking this module complete.'
    }
  };

  function getModuleQuizProgress(moduleNumber) {
    try {
      const stored = localStorage.getItem('moduleQuizProgress') || '{}';
      const parsed = JSON.parse(stored);
      return parsed[moduleNumber] || null;
    } catch (err) {
      console.warn('Failed to parse stored quiz progress', err);
      return null;
    }
  }

  function moduleQuizRequirementMet(moduleNumber) {
    const requirement = moduleQuizRequirements[moduleNumber];
    if (!requirement) return true;

    const progress = getModuleQuizProgress(moduleNumber);
    if (!progress || !progress.maxScore) return false;

    const ratio = progress.score / progress.maxScore;
    return ratio > requirement.minRatio;
  }

  function getModuleRequirementMessage(moduleNumber) {
    const requirement = moduleQuizRequirements[moduleNumber];
    if (!requirement) return '';
    return requirement.lockedMessage || `Complete the Module ${moduleNumber} quiz with more than one-third of the available points to unlock.`;
  }

  function updateModuleMarkBtnState(moduleNumber) {
    const markBtn = document.getElementById('moduleMarkBtn');
    if (!markBtn) return;

    if (!markBtn.dataset.defaultLabel) {
      markBtn.dataset.defaultLabel = markBtn.textContent.trim() || 'Mark Complete';
    }

    const requirement = moduleQuizRequirements[moduleNumber];
    const unlocked = moduleQuizRequirementMet(moduleNumber);

    markBtn.dataset.locked = !requirement || unlocked ? 'false' : 'true';

    if (requirement) {
      markBtn.disabled = !unlocked;
      markBtn.textContent = unlocked ? markBtn.dataset.defaultLabel : 'Pass Quiz to Unlock';
      markBtn.title = unlocked ? '' : getModuleRequirementMessage(moduleNumber);
    } else {
      markBtn.disabled = false;
      markBtn.textContent = markBtn.dataset.defaultLabel;
      markBtn.title = '';
    }
  }

  function canMarkModule(moduleNumber) {
    return moduleQuizRequirementMet(moduleNumber);
  }

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
    return localStorage.getItem('apiUrl') || document.getElementById('apiUrl').value.trim();
  }

  function loadApiUrl() {
    const savedUrl = localStorage.getItem('apiUrl');
    if (savedUrl) {
      document.getElementById('apiUrl').value = savedUrl;
    } else {
      // Set default based on hostname
      const defaultUrl = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
        ? "http://localhost:8405"
        : "https://hardwarehavoc.opencodingsociety.com";
      document.getElementById('apiUrl').value = defaultUrl;
    }
  }

  function showConfigModal() {
    const modal = document.getElementById('configModal');
    loadApiUrl();
    modal.style.display = 'flex';
    modal.classList.add('show');
  }

  function closeConfigModal() {
    const modal = document.getElementById('configModal');
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('show', 'closing');
      modal.style.display = 'none';
    }, 200);
  }

  function saveConfig() {
    const apiUrl = document.getElementById('apiUrl').value.trim();
    if (apiUrl) {
      localStorage.setItem('apiUrl', apiUrl);
      showToast('Configuration saved successfully.');
      closeConfigModal();
    } else {
      showToast('Please enter a valid Flask server URL.');
    }
  }

  function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show');
  }

  function closeMenu() {
    const menu = document.getElementById('dropdownMenu');
    if (menu && menu.classList.contains('show')) {
      menu.classList.add('closing');
      setTimeout(() => {
        menu.classList.remove('show', 'closing');
      }, 150);
    }
  }

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const menuContainer = document.querySelector('.menu-container');
    const menu = document.getElementById('dropdownMenu');
    if (menu && menuContainer && !menuContainer.contains(event.target)) {
      menu.classList.remove('show');
    }
  });

  function switchTab(tabName) {
    // Remove active class from all tabs and contents
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById('tab' + tabName.charAt(0).toUpperCase() + tabName.slice(1)).classList.add('active');
  }

  function initResizeHandle() {
    const handle = document.querySelector('.resize-handle');
    const sidebar = document.querySelector('.progress-sidebar');

    if (!handle || !sidebar) return;

    let isResizing = false;

    handle.addEventListener('mousedown', (e) => {
      isResizing = true;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isResizing) return;

      const containerRect = handle.parentElement.getBoundingClientRect();
      const newWidth = containerRect.right - e.clientX;

      // Apply constraints: min 180px, max 500px
      if (newWidth >= 180 && newWidth <= 500) {
        sidebar.style.width = newWidth + 'px';
      }
    });

    document.addEventListener('mouseup', () => {
      if (isResizing) {
        isResizing = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    });
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

  function executeEmbeddedScripts(container) {
    if (!container) return;
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      oldScript.replaceWith(newScript);
    });
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
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('show', 'closing');
    }, 200);
  }

  // Tutorial Modal Functions
  function showTutorial() {
    const modal = document.getElementById('tutorialModal');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('show');
      localStorage.removeItem('tutorialDismissed');
    }
  }

  function closeTutorial() {
    const modal = document.getElementById('tutorialModal');
    if (modal) {
      modal.classList.add('closing');
      setTimeout(() => {
        modal.classList.remove('show', 'closing');
        modal.style.display = 'none';
        localStorage.setItem('tutorialDismissed', 'true');
      }, 200);
    }
  }

  // Close modal on background click
  document.addEventListener('DOMContentLoaded', async () => {
    // Load saved API URL from localStorage
    loadApiUrl();

    // Initialize resize handle for Progress & Modules layout
    initResizeHandle();

    const modal = document.getElementById('confirmModal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeConfirm();
      });
    }

    // Tutorial modal background click handler
    const tutorialModal = document.getElementById('tutorialModal');
    if (tutorialModal) {
      tutorialModal.addEventListener('click', (e) => {
        if (e.target === tutorialModal) closeTutorial();
      });
    }

    // Config modal background click handler
    const configModal = document.getElementById('configModal');
    if (configModal) {
      configModal.addEventListener('click', (e) => {
        if (e.target === configModal) closeConfigModal();
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
    document.getElementById('mainContent').style.display = 'none';

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
    document.getElementById('mainContent').style.display = 'block';

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
      document.getElementById('resetProgressBtn').classList.remove('hidden');

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
        document.getElementById('resetProgressBtn').classList.add('hidden');
        document.getElementById('newGameBtn').classList.add('hidden');

        const cpuContainer = document.getElementById('cpuContainer');
        cpuContainer.classList.remove('all-active');
        for (let i = 1; i <= 6; i++) {
          document.getElementById(`node${i}`).classList.remove('active');
        }

        showToast('Left room successfully.');
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
          document.getElementById('newGameBtn').classList.add('hidden');

          for (let i = 1; i <= 6; i++) {
            document.getElementById(`node${i}`).classList.remove('active');
          }


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

  async function startNewGame() {
    showConfirm(
      'Start New Game',
      'All 6 cores are active! Reset all progress for this room and start a new game?',
      async () => {
        try {
          await apiCall(`/api/rooms/${currentRoomId}/reset-progress`, 'POST');
          cpuFullyLit = false;

          document.getElementById('cpuContainer').classList.remove('all-active');
          document.getElementById('newGameBtn').classList.add('hidden');

          for (let i = 1; i <= 6; i++) {
            document.getElementById(`node${i}`).classList.remove('active');
          }

          const buttons = document.querySelectorAll('.module-btn');
          buttons.forEach(btn => btn.classList.remove('completed'));

          showToast('New game started! All progress has been reset.');

          await new Promise(resolve => setTimeout(resolve, 500));
          await loadRoomProgress();
        } catch (error) {
          showToast(`Failed to start new game: ${error.message}`);
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
    if (!canMarkModule(moduleNumber)) {
      showToast(getModuleRequirementMessage(moduleNumber) || 'Complete the required quiz to unlock this module.');
      updateModuleMarkBtnState(moduleNumber);
      return;
    }

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
        document.getElementById('resetProgressBtn').classList.add('hidden');
        document.getElementById('newGameBtn').classList.add('hidden');

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
          document.getElementById('newGameBtn').classList.remove('hidden');
        } else {
          document.getElementById('newGameBtn').classList.add('hidden');
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
        document.getElementById('resetProgressBtn').classList.add('hidden');
        document.getElementById('newGameBtn').classList.add('hidden');
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
      panel.dataset.activeModule = moduleNumber.toString();

      document.body.classList.add('module-panel-open');
      content.innerHTML = '<p style="color: var(--muted);">Loading...</p>';
      panel.style.display = 'flex';
      panel.scrollTop = 0;
      if (dialog) dialog.scrollTop = 0;

      markBtn.onclick = async () => {
        if (!canMarkModule(moduleNumber)) {
          showToast(getModuleRequirementMessage(moduleNumber) || 'Complete the required quiz first.');
          updateModuleMarkBtnState(moduleNumber);
          return;
        }
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

      updateModuleMarkBtnState(moduleNumber);

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
              executeEmbeddedScripts(cleanDiv);

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
              executeEmbeddedScripts(content);
            }
          } catch (e) {
            content.innerHTML = html;
            executeEmbeddedScripts(content);
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
    panel.classList.add('closing');
    setTimeout(() => {
      panel.style.display = 'none';
      panel.classList.remove('closing');
      document.body.classList.remove('module-panel-open');
      panel.scrollTop = 0;
      panel.dataset.activeModule = '';
    }, 200);
  }

  window.addEventListener('moduleQuizScored', event => {
    if (!event || !event.detail) return;
    const moduleNumber = parseInt(event.detail.module, 10);
    if (!moduleNumber) return;

    const panel = document.getElementById('modulePanel');
    if (panel) {
      const activeModule = parseInt(panel.dataset.activeModule || '0', 10);
      if (activeModule === moduleNumber) {
        updateModuleMarkBtnState(moduleNumber);
      }
    }
  });

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
    modal.classList.add('closing');
    setTimeout(() => {
      modal.classList.remove('show', 'closing');
    }, 200);
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
      const checkboxHtml = room.can_delete
        ? `<input type="checkbox" class="room-checkbox" data-room-id="${room.id}">`
        : '';

      return `
        <div class="room-card">
          <div class="room-card-info" style="flex:1;">
            <div class="room-card-title">
              ${escapeHtml(room.name)}
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

  async function deleteAllDeletableRooms() {
    const deletableRooms = adminRoomsData.filter(r => r.can_delete);

    if (deletableRooms.length === 0) {
      showToast('No deletable rooms found.');
      return;
    }

    showConfirm(
      'Delete All Deletable Rooms',
      `This will delete all ${deletableRooms.length} deletable room(s). This cannot be undone.`,
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
