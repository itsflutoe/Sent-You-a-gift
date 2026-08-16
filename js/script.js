// ===== DOM Elements =====
const notification = document.getElementById('notification');
const declineMsg = document.getElementById('decline-msg');
const stage = document.getElementById('stage');
const giftBox = document.getElementById('gift-box');
const gifts = document.getElementById('gifts');
const bouquetContainer = document.getElementById('bouquet-container');
const envelopeContainer = document.getElementById('envelope-container');
const flowerOverlay = document.getElementById('flower-overlay');
const envelopeOverlay = document.getElementById('envelope-overlay');
const bigEnvelope = document.getElementById('big-envelope');
const letter = document.getElementById('letter');
const receiptOverlay = document.getElementById('receipt-overlay');
const bgMusic = document.getElementById('bg-music');

const btnAccept = document.getElementById('btn-accept');
const btnDecline = document.getElementById('btn-decline');
const btnAcceptAnyway = document.getElementById('btn-accept-anyway');

// ===== Soft SFX via Web Audio =====
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(freq, type, duration, volume = 0.08) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
}

function playUnwrap() {
  playTone(180, 'sine', 0.15, 0.06);
  setTimeout(() => playTone(320, 'triangle', 0.25, 0.05), 80);
  setTimeout(() => playTone(420, 'sine', 0.3, 0.04), 180);
}

function playSparkle() {
  playTone(880, 'sine', 0.12, 0.04);
  setTimeout(() => playTone(1200, 'sine', 0.1, 0.03), 60);
  setTimeout(() => playTone(1500, 'sine', 0.15, 0.025), 120);
}

function playPaper() {
  playTone(220, 'triangle', 0.2, 0.05);
  setTimeout(() => playTone(180, 'sine', 0.35, 0.04), 100);
}

// ===== Music =====
function startMusic() {
  bgMusic.volume = 0.18; // very soft
  bgMusic.play().catch(() => {});
}

// ===== Notification =====
function showNotification() {
  setTimeout(() => notification.classList.add('show'), 400);
}

btnAccept.addEventListener('click', acceptPackage);
btnDecline.addEventListener('click', () => {
  notification.classList.remove('show');
  setTimeout(() => {
    notification.style.display = 'none';
    declineMsg.classList.remove('hidden');
  }, 400);
});
btnAcceptAnyway.addEventListener('click', () => {
  declineMsg.classList.add('hidden');
  acceptPackage();
});

function acceptPackage() {
  notification.classList.remove('show');
  setTimeout(() => {
    notification.style.display = 'none';
    stage.classList.remove('hidden');
    startMusic();
    setTimeout(() => giftBox.classList.add('show'), 300);
  }, 450);
}

// ===== Gift Box open =====
giftBox.addEventListener('click', () => {
  if (giftBox.classList.contains('opening')) return;
  giftBox.classList.add('opening');
  playUnwrap();

  setTimeout(() => {
    giftBox.style.display = 'none';
    gifts.classList.remove('hidden');
    void gifts.offsetWidth;
    gifts.classList.add('show');
  }, 900);
});

// ===== Flower =====
bouquetContainer.addEventListener('click', () => {
  playSparkle();
  flowerOverlay.classList.remove('hidden');
  void flowerOverlay.offsetWidth;
  flowerOverlay.classList.add('show');
  createButterfliesAndSparkles();
});

function createButterfliesAndSparkles() {
  const butterflies = flowerOverlay.querySelector('.butterflies');
  const sparkles = flowerOverlay.querySelector('.sparkles');
  butterflies.innerHTML = '';
  sparkles.innerHTML = '';

  const emojis = ['🦋', '🦋', '🦋', '✨', '🌸'];
  for (let i = 0; i < 7; i++) {
    const b = document.createElement('div');
    b.className = 'butterfly';
    b.textContent = emojis[i % emojis.length];
    b.style.left = (10 + Math.random() * 80) + '%';
    b.style.top = (5 + Math.random() * 80) + '%';
    b.style.animationDelay = (Math.random() * 2.5) + 's';
    b.style.animationDuration = (3.2 + Math.random() * 2.2) + 's';
    butterflies.appendChild(b);
  }

  for (let i = 0; i < 20; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = (Math.random() * 100) + '%';
    s.style.top = (Math.random() * 100) + '%';
    s.style.animationDelay = (Math.random() * 2) + 's';
    sparkles.appendChild(s);
  }
}

// ===== Envelope + Letter =====
envelopeContainer.addEventListener('click', () => {
  playPaper();
  envelopeOverlay.classList.remove('hidden');
  void envelopeOverlay.offsetWidth;
  envelopeOverlay.classList.add('show');

  setTimeout(() => {
    bigEnvelope.classList.add('opened');
    setTimeout(() => {
      letter.classList.remove('hidden');
      void letter.offsetWidth;
      letter.classList.add('show');
    }, 500);
  }, 300);
});

// ===== Close handlers =====
document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const target = e.currentTarget.dataset.close;

    if (target === 'flower') {
      flowerOverlay.classList.remove('show');
      setTimeout(() => flowerOverlay.classList.add('hidden'), 400);
    }

    if (target === 'letter') {
      envelopeOverlay.classList.remove('show');
      setTimeout(() => {
        envelopeOverlay.classList.add('hidden');
        letter.classList.remove('show');
        letter.classList.add('hidden');
        bigEnvelope.classList.remove('opened');
        // show receipt
        receiptOverlay.classList.remove('hidden');
        void receiptOverlay.offsetWidth;
        receiptOverlay.classList.add('show');
        playSparkle();
      }, 450);
    }

    if (target === 'receipt') {
      receiptOverlay.classList.remove('show');
      setTimeout(() => receiptOverlay.classList.add('hidden'), 400);
    }
  });
});

// Prevent zoom on double-tap
document.addEventListener('gesturestart', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());

// Start
showNotification();
