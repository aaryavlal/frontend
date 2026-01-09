---
title: Programmer Jokes
layout: post
description: An interactive frontend fetching jokes from a Flask backend API.
permalink: /jokes
image: /images/jokes.png
breadcrumb: true
show_reading_time: false
---

<style>
  :root {
    --bg: #071226;
    --panel: #0b1220;
    --neon: #38bdf8;
    --accent: #22c55e;
    --muted: #94a3b8;
  }

  .jokes-container {
    max-width: 900px;
    margin: 0 auto;
  }

  .jokes-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .jokes-panel {
    background: linear-gradient(180deg, var(--panel), #0f1622);
    border-radius: 10px;
    padding: 18px;
    border: 1px solid rgba(56, 189, 248, 0.06);
    box-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
    margin-bottom: 16px;
  }

  .joke-card {
    background: #041b2d;
    padding: 16px;
    border-radius: 8px;
    border-left: 4px solid var(--neon);
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .joke-text {
    font-size: 15px;
    color: #e6eef8;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .joke-stats {
    display: flex;
    gap: 12px;
    font-size: 13px;
    color: var(--muted);
  }

  .controls {
    display: flex;
    gap: 12px;
    align-items: center;
    margin-top: 12px;
    flex-wrap: wrap;
  }

  .btn {
    background: linear-gradient(90deg, var(--neon), #3b82f6);
    color: #041827;
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  }

  .btn:hover {
    opacity: 0.9;
  }

  .btn.secondary {
    background: transparent;
    color: var(--neon);
    border: 1px solid rgba(56, 189, 248, 0.16);
  }

  .btn.secondary:hover {
    background: rgba(56, 189, 248, 0.1);
  }

  .loading {
    color: var(--muted);
    text-align: center;
    padding: 20px;
  }

  .error {
    color: #ff6b6b;
    padding: 12px;
    background: #1a0b0b;
    border-radius: 6px;
    border: 1px solid #8b3333;
  }

  .stats-panel {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .stat-item {
    background: #04202a;
    padding: 8px 12px;
    border-radius: 6px;
    text-align: center;
  }

  .stat-value {
    color: var(--accent);
    font-weight: bold;
    font-size: 18px;
  }

  .stat-label {
    color: var(--muted);
    font-size: 12px;
  }
</style>

<div class="jokes-container">
  <div class="jokes-header">
    <h1>😄 Programmer Jokes</h1>
    <div class="stats-panel">
      <div class="stat-item">
        <div class="stat-value" id="totalCount">—</div>
        <div class="stat-label">Total Jokes</div>
      </div>
      <div class="stat-item">
        <div class="stat-value" id="currentIndex">—</div>
        <div class="stat-label">Current</div>
      </div>
    </div>
  </div>

  <div class="jokes-panel">
    <div id="jokeContainer"></div>
    
    <div class="controls">
      <button id="prevBtn" class="btn">← Previous</button>
      <button id="nextBtn" class="btn">Next →</button>
      <button id="randomBtn" class="btn secondary">🎲 Random</button>
      <button id="refreshBtn" class="btn secondary">🔄 Refresh</button>
      <div style="margin-left: auto; display: flex; gap: 8px;">
        <button id="hahaBtn" class="btn" style="background: linear-gradient(90deg, #22c55e, #16a34a); min-width: 100px;">😄 Like</button>
        <button id="boohooBtn" class="btn" style="background: linear-gradient(90deg, #ff6b6b, #dc2626); min-width: 100px;">😒 Dislike</button>
      </div>
    </div>
  </div>
</div>

  <script type="module">
  import { pythonURI, fetchOptions } from '{{ site.baseurl }}/assets/js/api/config.js';

  let jokes = [];
  let currentIndex = 0;
  let currentJokeId = null;

  // Construct API URL using pythonURI from config (main.py serves jokes)
  const API_BASE = `${pythonURI}/api/jokes`;

  async function loadJokes() {
    try {
      console.log('Fetching jokes from:', API_BASE);
      const response = await fetch(API_BASE, fetchOptions);
      console.log('Response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      jokes = await response.json();
      console.log('Jokes loaded:', jokes.length);
      document.getElementById('totalCount').textContent = jokes.length;
      if (jokes.length > 0) {
        currentIndex = 0;
        displayJoke();
      }
    } catch (error) {
      console.error('Error loading jokes:', error);
      console.error('API URL:', API_BASE);
      console.error('pythonURI:', pythonURI);
      console.error('FetchOptions:', fetchOptions);
      document.getElementById('jokeContainer').innerHTML = `<div class="error">⚠️ Failed to load jokes from ${API_BASE}. Make sure the backend (main.py) is running on port 8405. Error: ${error.message}</div>`;
    }
  }

  function displayJoke() {
    if (jokes.length === 0) {
      document.getElementById('jokeContainer').innerHTML = '<div class="loading">Loading jokes...</div>';
      return;
    }

    const joke = jokes[currentIndex];
    currentJokeId = joke.id;
    const hahaCount = joke.haha || 0;
    const boohooCount = joke.boohoo || 0;
    const totalVotes = hahaCount + boohooCount || 1;
    const hahaPercent = Math.round((hahaCount / totalVotes) * 100);

    document.getElementById('jokeContainer').innerHTML = `
      <div class="joke-card">
        <div class="joke-text">${escapeHtml(joke.joke)}</div>
        <div class="joke-stats">
          <div class="stat">😄 ${hahaCount} (${hahaPercent}%)</div>
          <div class="stat">😒 ${boohooCount}</div>
        </div>
      </div>
    `;
    document.getElementById('currentIndex').textContent = currentIndex + 1;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  async function voteHaha() {
    if (currentJokeId === null) return;
    try {
      const voteOptions = {...fetchOptions, method: 'PUT'};
      const url = `${API_BASE}/${currentJokeId}/haha`;
      console.log('Voting haha on joke:', currentJokeId, 'URL:', url);
      const response = await fetch(url, voteOptions);
      console.log('Vote response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const updatedJoke = await response.json();
      console.log('Updated joke:', updatedJoke);
      jokes[currentIndex] = updatedJoke;
      displayJoke();
    } catch (error) {
      console.error('Error voting haha:', error);
      alert('Failed to vote. Check console for details.');
    }
  }

  async function voteBoohoo() {
    if (currentJokeId === null) return;
    try {
      const voteOptions = {...fetchOptions, method: 'PUT'};
      const url = `${API_BASE}/${currentJokeId}/boohoo`;
      console.log('Voting boohoo on joke:', currentJokeId, 'URL:', url);
      const response = await fetch(url, voteOptions);
      console.log('Vote response status:', response.status);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const updatedJoke = await response.json();
      console.log('Updated joke:', updatedJoke);
      jokes[currentIndex] = updatedJoke;
      displayJoke();
    } catch (error) {
      console.error('Error voting boohoo:', error);
      alert('Failed to vote. Check console for details.');
    }
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    if (jokes.length > 0) {
      currentIndex = (currentIndex + 1) % jokes.length;
      displayJoke();
    }
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (jokes.length > 0) {
      currentIndex = (currentIndex - 1 + jokes.length) % jokes.length;
      displayJoke();
    }
  });

  document.getElementById('randomBtn').addEventListener('click', () => {
    if (jokes.length > 0) {
      currentIndex = Math.floor(Math.random() * jokes.length);
      displayJoke();
    }
  });

  document.getElementById('refreshBtn').addEventListener('click', () => {
    loadJokes();
  });

  document.getElementById('hahaBtn').addEventListener('click', voteHaha);
  document.getElementById('boohooBtn').addEventListener('click', voteBoohoo);

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') document.getElementById('nextBtn').click();
    if (e.key === 'ArrowLeft') document.getElementById('prevBtn').click();
  });

  // Load jokes on page load
  loadJokes();
</script>