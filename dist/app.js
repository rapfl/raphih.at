'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motionToggle = $('#motion-toggle');
let motionPaused = reducedMotion.matches;
function syncMotion() {
  document.body.classList.toggle('motion-paused', motionPaused);
  motionToggle.setAttribute('aria-pressed', String(motionPaused));
  motionToggle.textContent = motionPaused ? 'Play motion' : 'Pause motion';
}
syncMotion();
motionToggle.addEventListener('click', () => { motionPaused = !motionPaused; syncMotion(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; syncMotion(); });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  $$('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-reveal');
}

let confettiReady = true;
$('#curiosity').addEventListener('input', event => {
  const value = Number(event.target.value);
  document.documentElement.style.setProperty('--play', value);
  $('.happy-block').style.transform = `rotate(${(value - 50) * 0.3}deg) translateY(${-(value - 50) * 0.13}px)`;
  if (value < 85) confettiReady = true;
  if (value > 94 && confettiReady && !motionPaused) {
    confettiReady = false;
    for (let index = 0; index < 32; index++) {
      const piece = document.createElement('i');
      piece.className = 'confetti-piece';
      piece.setAttribute('aria-hidden', 'true');
      piece.style.setProperty('--x', `${Math.random() * 100}vw`);
      piece.style.setProperty('--c', ['#294ce8', '#f28161', '#b2c77d', '#e9c083'][index % 4]);
      piece.style.setProperty('--delay', `${Math.random() * 0.4}s`);
      document.body.append(piece);
      piece.addEventListener('animationend', () => piece.remove(), { once: true });
      setTimeout(() => piece.remove(), 2500);
    }
  }
});

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  $$('[data-filter]').forEach(item => {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  $$('.project').forEach(project => {
    project.hidden = filter !== 'all' && project.dataset.category !== filter;
    if (!project.hidden) { count++; project.classList.add('visible'); }
  });
  $('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
}));

const audio = $('#bounce-audio');
const audioButton = $('#audio-preview');
function syncAudio() {
  const playing = !audio.paused;
  audioButton.setAttribute('aria-pressed', String(playing));
  $('.play-icon', audioButton).textContent = playing ? 'Ⅱ' : '▶';
  $('.audio-label', audioButton).textContent = playing ? 'Pause the bass' : 'A little bass?';
}
audio.volume = 0.65;
audioButton.addEventListener('click', async () => {
  if (!audio.paused) { audio.pause(); return; }
  try { await audio.play(); } catch {
    $('.audio-label', audioButton).textContent = 'Audio unavailable. Try again?';
  }
});
['play', 'pause', 'ended'].forEach(event => audio.addEventListener(event, syncAudio));
document.addEventListener('visibilitychange', () => { if (document.hidden) audio.pause(); });

const stories = {
  bounce: {
    title: 'Rahu Bounce', type: 'MUSIC SOFTWARE · C++17 / JUCE 7', color: '#dce3ed',
    intro: 'A focused bass instrument. From the first oscillator to the last little knob.',
    image: '/assets/rahu-bounce.png', imageAlt: 'The actual Rahu Bounce v1.2 synthesizer interface',
    problem: 'A bassline needs character, but finding it shouldn’t mean getting lost in a wall of controls. Rahu Bounce puts the shape and movement of the note within reach.',
    approach: 'A monophonic MIDI synthesizer for trance, bounce, and hardgroove, built in C++ on JUCE and RAHU CORE. An editable envelope sits above seven main controls. A detail view opens up the oscillator, filter, FM, and playing behaviour when you need to go deeper.',
    detail: 'The signal path combines band-limited oscillators, a resonant low-pass filter, saturation, and a clean sine sub. Four-times oversampling, DSP tests, and a UI harness support the sound and the interface. Factory presets and MIDI examples make it easier to find a starting point.',
    status: 'Version 1.2 · macOS Universal · VST3, Audio Unit, and standalone. The sample on this page is rendered by the actual synth.',
  },
  rosa: {
    title: 'rosa', type: 'EDUCATION · AI / PRODUCT DEVELOPMENT', color: '#e5e7d5',
    intro: 'Start with a good lesson. Let the software work backwards from there.',
    problem: 'A useful teaching tool needs to understand more than a prompt. A lesson has a rhythm, a purpose, a class, and a place in a larger plan.',
    approach: 'rosa is a pedagogical planning companion for teaching in Austria. The central object is the lesson: connected to the week, the year, materials, and reflection. Austrian curriculum references, method selection, generation, and quality checks each have their own place in the system.',
    detail: 'The work combines product thinking, interface design, and full-stack development. Pure planning logic, a structured generation pipeline, database access rules, and PDF rendering support the experience. Small details count too: a secret stacking game gives a busy teacher an unexpected moment of play.',
    status: 'Active development · Next.js, TypeScript, PostgreSQL, and a structured AI pipeline.',
    url: 'https://rosa-ai.at', link: 'Visit rosa',
    note: 'The lesson sheet in the portfolio is an illustrative product study, not a screenshot of the live app.',
  },
  cordo: {
    title: 'Cordo', type: 'COORDINATION · NEXT.JS / POSTGRESQL', color: '#f1b09b',
    intro: 'Good workshops take people. Getting those people together takes a system.',
    problem: 'A school enquiry touches a lot of people: coordinators, trainers, and the school itself. Separate emails, spreadsheets, and calendar entries make the next step hard to see.',
    approach: 'Cordo brings the path from enquiry to team assignment, confirmation, workshop, and report into one product. Schools have a booking flow, trainers have a portal, and coordinators have a shared workspace.',
    detail: 'Its starting point is practical experience from the buntaž automation and the earlier Coordo project. The architecture makes each organisation’s data explicit, records actions before sending emails or calendar updates, and keeps business rules separate from external services. Real PostgreSQL tests exercise the coordination scenarios.',
    status: 'In development · Cordo is the successor product; the older Coordo repository is a separate predecessor.',
    note: 'The coordination view in the portfolio is an illustrative product study.',
  },
  buntaz: {
    title: 'buntaž automation', type: 'WORKFLOW AUTOMATION · GOOGLE APPS SCRIPT', color: '#f0deaa',
    intro: 'Keep the familiar spreadsheet. Give it a much more useful job.',
    problem: 'Workshop coordination means handling requests, finding the right team, sending confirmations, reminding people, and keeping a record. Doing every step by hand makes a shared spreadsheet a lot of work.',
    approach: 'Google Sheets holds the coordination data. Google Apps Script connects the booking web app, trainer assignments, email, and calendar actions. Schools book online; the coordinator assigns trainers and additional roles in the sheet.',
    detail: 'The project includes public booking and availability pages, automatic invitations, confirmations, reminders, and a log. The implementation is checked locally against the booking and coordination flows. It also became the practical foundation for Cordo’s domain model.',
    status: 'Operational workflow automation · Google Sheets, Apps Script, email, and calendar integrations.',
    url: 'https://buntaz.com', link: 'Visit buntaž',
    note: 'This is workshop coordination through a spreadsheet, rather than a teaching worksheet generator. The table shown here contains illustrative data.',
  },
  hochstapler: {
    title: 'Hochstapler', type: 'PLAY · CANVAS / INTERACTION DESIGN', color: '#d5e5a3',
    intro: 'A tiny game, hiding in a tool that takes teaching seriously.',
    problem: 'Not every interaction has to make you more productive. Sometimes a little discovery is enough.',
    approach: 'In rosa, type “stapel”, enter the Konami code, or tap the rosa mark five times on a phone. A lazily loaded stacking game appears. Place the moving layer on the one below it: the overhang falls away, the tower gets narrower, and the next layer moves faster.',
    detail: 'The game uses rosa’s sage, amber, blue, and graphite palette. Calendar weeks tick forward from the start of the school year. A precise placement earns a bonus; high scores unlock little notes from the staffroom. The best five scores stay in that browser.',
    status: 'Hidden in rosa · The version here is a smaller, standalone portfolio adaptation of the stacking mechanic.',
    game: true,
  },
  headturner: {
    title: 'Headturner Hat', type: 'MUSIC SOFTWARE · C++ / JUCE', color: '#dce3ed',
    intro: 'One instrument. A very particular kind of noise.',
    problem: 'A techno hi-hat has a small job with a big effect on the groove. A focused instrument can make that job more immediate.',
    approach: 'A noise-first hi-hat instrument built with JUCE for Ableton Live and other VST3/AU hosts. Closed and open modes, decay, tone, air, metal, and drive shape its analog-techno character.',
    detail: 'Named presets keep sound choices close to the instrument. The repository also includes packaging scripts and a build workflow for macOS and Windows installers.',
    status: 'Audio instrument · Public source repository.',
    url: 'https://github.com/rapfl/headturner-hat', link: 'Explore the source',
  },
  nomads: {
    title: 'Valley Nomads', type: 'PLAY · MULTIPLAYER / WEBSOCKETS', color: '#d5e5a3',
    intro: 'A board, a few friends, and a browser tab.',
    problem: 'A multiplayer board game has to keep everyone in the same world, even when a connection drops or a player steps away.',
    approach: 'A browser-based board game for three to four players, with a base game and seafaring scenarios. A deterministic core handles the rules, a WebSocket server manages sessions, and the web app draws the board with original pixel artwork.',
    detail: 'Server-side bots can join a game or temporarily take over a disconnected player’s place. Keyboard controls, a sprite pipeline, and a self-hosted deployment setup make this a project about the whole play experience.',
    status: 'Experimental game project · Original pixel artwork · Repository: hex8.',
  },
};

const projectDialog = $('#project-dialog');
const gameDialog = $('#game-dialog');
function openStory(id) {
  const story = stories[id];
  if (!story) return;
  const body = $('#project-dialog-content');
  body.innerHTML = `<div class="story-header" style="--story-color:${story.color}"><p class="eyebrow">${story.type}</p><h2 id="dialog-title">${story.title}</h2><p>${story.intro}</p></div><div class="story-body">${story.image ? `<img class="story-image" src="${story.image}" alt="${story.imageAlt}">` : ''}<h3>The starting question</h3><p>${story.problem}</p><h3>What I built</h3><p>${story.approach}</p><h3>Under the surface</h3><p>${story.detail}</p>${story.url ? `<a class="story-link" href="${story.url}" target="_blank" rel="noopener noreferrer">${story.link}<span aria-hidden="true">↗</span></a>` : ''}${story.game ? '<button type="button" class="story-link" id="story-play">Play the portfolio edition <span aria-hidden="true">↗</span></button>' : ''}${story.note ? `<p class="story-note">${story.note}</p>` : ''}<p class="story-status">${story.status}</p></div>`;
  projectDialog.showModal();
  projectDialog.scrollTop = 0;
  document.body.classList.add('modal-open');
  $('#story-play')?.addEventListener('click', () => { projectDialog.close(); launchGame(); });
}
$$('[data-project]').forEach(button => button.addEventListener('click', () => openStory(button.dataset.project)));
for (const dialog of [projectDialog, gameDialog]) {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!projectDialog.open && !gameDialog.open) document.body.classList.remove('modal-open');
  });
}

// A compact adaptation of rosa's stacking mechanic. All state stays in this browser.
const canvas = $('#stack-canvas');
const ctx = canvas.getContext('2d');
const gameButton = $('#stack-button');
const palette = ['#9cafa1', '#b3c3a5', '#c2c9a4', '#e9c083', '#d5a66c', '#8da6ba', '#a6bac9'];
let game = null;
let frameId = null;
let previousTime = 0;
let best = 0;
try { best = Math.max(0, Number(localStorage.getItem('raphih-stack-best')) || 0); } catch { /* Storage is optional. */ }

function updateGameStats() {
  $('#game-height').textContent = `${game?.height || 0} m`;
  $('#game-score').textContent = String(game?.score || 0);
  $('#game-best').textContent = String(best);
}
function resetGame() {
  game = { mode: 'ready', height: 0, score: 0, direction: 1, speed: 128, moving: { x: 30, w: 220 }, layers: [{ x: 170, w: 220 }], pieces: [] };
  previousTime = 0;
  gameButton.innerHTML = 'Start stacking <span aria-hidden="true">↗</span>';
  $('#game-status').textContent = 'Line it up. Find your rhythm.';
  updateGameStats();
  drawGame();
}
function launchGame() {
  audio.pause();
  gameDialog.showModal();
  document.body.classList.add('modal-open');
  resetGame();
  gameButton.focus();
}
function startGame() {
  resetGame();
  game.mode = 'playing';
  gameButton.innerHTML = 'Stack block <span aria-hidden="true">↓</span>';
  $('#game-status').textContent = 'Click, tap, or press Space when the blocks line up.';
  if (frameId === null) frameId = requestAnimationFrame(tick);
}
function endGame() {
  game.mode = 'over';
  if (game.score > best) {
    best = game.score;
    try { localStorage.setItem('raphih-stack-best', String(best)); } catch { /* No persistence required. */ }
    $('#game-status').textContent = `New best: ${best}! There’s always room for one more try.`;
  } else $('#game-status').textContent = `${game.height} metres of ambition. One more go?`;
  gameButton.innerHTML = 'Try again <span aria-hidden="true">↗</span>';
  updateGameStats();
}
function stackBlock() {
  if (!game || game.mode !== 'playing') { startGame(); return; }
  const previous = game.layers[game.layers.length - 1];
  const current = game.moving;
  const perfect = Math.abs(current.x - previous.x) < 7;
  const left = perfect ? previous.x : Math.max(previous.x, current.x);
  const right = perfect ? previous.x + previous.w : Math.min(previous.x + previous.w, current.x + current.w);
  if (right - left < 4) { endGame(); return; }
  const color = palette[(game.height + 1) % palette.length];
  if (!perfect) {
    if (current.x < left) game.pieces.push({ x: current.x, w: left - current.x, level: game.layers.length, y: 0, v: 20, color });
    if (current.x + current.w > right) game.pieces.push({ x: right, w: current.x + current.w - right, level: game.layers.length, y: 0, v: 20, color });
  }
  game.layers.push({ x: left, w: right - left });
  game.height++;
  game.score += perfect ? 35 : 10;
  game.speed = Math.min(330, 128 + game.height * 9);
  game.direction *= -1;
  game.moving = { x: game.direction > 0 ? 25 : 535 - (right - left), w: right - left };
  $('#game-status').textContent = perfect ? 'Perfect placement. +35. Nicely done.' : '+10. A little narrower. A little braver.';
  updateGameStats();
}
function drawGame() {
  if (!ctx || !game) return;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#20221c'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#353a2e';
  for (let x = 14; x < W; x += 20) for (let y = 14; y < H; y += 20) ctx.fillRect(x, y, 1, 1);
  const step = 25, ground = H - 42;
  const offset = Math.max(0, game.layers.length - 11) * step;
  ctx.strokeStyle = '#70765b';ctx.beginPath();ctx.moveTo(25, ground + 1);ctx.lineTo(W - 25, ground + 1);ctx.stroke();
  game.layers.forEach((layer, index) => {
    const y = ground - (index + 1) * step + offset;
    if (y > H) return;
    ctx.fillStyle = palette[index % palette.length];ctx.fillRect(layer.x, y, layer.w, step - 2);
    ctx.fillStyle = '#ffffff16';ctx.fillRect(layer.x, y, layer.w, 3);
  });
  const movingY = ground - (game.layers.length + 1) * step + offset;
  if (game.mode !== 'over') {
    ctx.fillStyle = palette[game.layers.length % palette.length];ctx.fillRect(game.moving.x, movingY, game.moving.w, step - 2);
    const last = game.layers[game.layers.length - 1];
    ctx.strokeStyle = '#d5e5a366';ctx.setLineDash([3, 6]);
    for (const x of [last.x, last.x + last.w]) {ctx.beginPath();ctx.moveTo(x, movingY - 30);ctx.lineTo(x, movingY - 5);ctx.stroke();}
    ctx.setLineDash([]);
  }
  for (const piece of game.pieces) {
    ctx.globalAlpha = Math.max(0, 1 - piece.y / 230);
    ctx.fillStyle = piece.color;
    ctx.fillRect(piece.x, ground - (piece.level + 1) * step + offset + piece.y, piece.w, step - 2);
  }
  ctx.globalAlpha = 1;
  if (game.mode === 'ready' || game.mode === 'over') {
    ctx.fillStyle = '#20221cb0';ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center';ctx.fillStyle = '#d5e5a3';ctx.font = 'bold 31px Space, sans-serif';
    ctx.fillText(game.mode === 'ready' ? 'A little higher?' : 'A beautiful attempt.', W / 2, 133);
    ctx.fillStyle = '#c2cab1';ctx.font = '14px DM, sans-serif';
    ctx.fillText(game.mode === 'ready' ? 'Keep the overlap. Let the rest go.' : `${game.height} m · ${game.score} points`, W / 2, 166);
  }
}
function tick(time) {
  frameId = null;
  if (!gameDialog.open) return;
  const dt = Math.min((time - (previousTime || time)) / 1000, 0.04);
  previousTime = time;
  if (game.mode === 'playing' && !document.hidden) {
    game.moving.x += game.direction * game.speed * dt;
    if (game.moving.x + game.moving.w >= canvas.width - 25) { game.moving.x = canvas.width - 25 - game.moving.w; game.direction = -1; }
    if (game.moving.x <= 25) { game.moving.x = 25; game.direction = 1; }
  }
  for (const piece of game.pieces) { piece.v += 800 * dt;piece.y += piece.v * dt; }
  game.pieces = game.pieces.filter(piece => piece.y < 260);
  drawGame();
  if (game.mode === 'playing' || game.pieces.length) frameId = requestAnimationFrame(tick);
}
$('#game-launch').addEventListener('click', launchGame);
gameButton.addEventListener('click', stackBlock);
canvas.addEventListener('click', stackBlock);
gameDialog.addEventListener('keydown', event => {
  if (event.code === 'Space' && event.target.tagName !== 'BUTTON') {
    event.preventDefault();
    if (!event.repeat) stackBlock();
  }
});
gameDialog.addEventListener('close', () => {
  if (frameId !== null) cancelAnimationFrame(frameId);
  frameId = null;
  previousTime = 0;
});
