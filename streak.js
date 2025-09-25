// --- Elements ---
const streakCountEl = document.getElementById('streakCount');
const bestStreakEl = document.getElementById('bestStreak');
const motivationText = document.getElementById('motivationText');
const markCompleteBtn = document.getElementById('markCompleteBtn');
const streakBox = document.getElementById('streakBox');

// Debug buttons
const addStreakBtn = document.getElementById('addStreakBtn');
const subStreakBtn = document.getElementById('subStreakBtn');

// --- Load saved state ---
let streak = parseInt(localStorage.getItem('streak')) || 0;
let bestStreak = parseInt(localStorage.getItem('bestStreak')) || 0;
let lastDate = localStorage.getItem('lastDate') || '';

const today = new Date().toDateString();

// reset streak if gap > 1 day
if (lastDate && lastDate !== today) {
  const last = new Date(lastDate);
  const diff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
  if (diff > 1) {
    streak = 0;
  }
}

// --- Helper: unlock badge ---
function unlockBadge(id) {
  const saved = JSON.parse(localStorage.getItem('badges')) || {};
  saved[id] = true;
  localStorage.setItem('badges', JSON.stringify(saved));
}

// --- Update UI ---
function updateDisplay() {
  streakCountEl.textContent = `🔥 ${streak}`;
  bestStreakEl.textContent = bestStreak;

  if (streak === 0) motivationText.textContent = 'Start your streak today!';
  else if (streak < 3) motivationText.textContent = 'Nice! Keep going 🔥';
  else if (streak < 7) motivationText.textContent = 'You’re building momentum 🚀';
  else if (streak < 14) motivationText.textContent = 'On fire! 🔥🔥🔥';
  else motivationText.textContent = 'Legend status! 🌟';
}

function checkBadges() {
  if (streak >= 1) unlockBadge(1);  // Getting Started
  if (streak >= 7) unlockBadge(2);  // On Fire
  if (streak >= 14) unlockBadge(3); // Strong Spirit
  if (streak >= 30) unlockBadge(4); // Legend
  if (streak >= bestStreak) unlockBadge(5); // Champion
}

updateDisplay();

// --- Mark Complete ---
markCompleteBtn.addEventListener('click', () => {
  if (lastDate === today) {
    alert('You’ve already marked today complete!');
    return;
  }
  streak++;
  if (streak > bestStreak) bestStreak = streak;
  localStorage.setItem('streak', streak);
  localStorage.setItem('bestStreak', bestStreak);
  localStorage.setItem('lastDate', today);
  checkBadges();
  updateDisplay();
  streakBox.classList.add('bounce');
  setTimeout(() => streakBox.classList.remove('bounce'), 200);
});

// --- Debug Buttons ---
addStreakBtn.addEventListener('click', () => {
  streak++;
  if (streak > bestStreak) bestStreak = streak;
  localStorage.setItem('streak', streak);
  localStorage.setItem('bestStreak', bestStreak);
  localStorage.setItem('lastDate', today);
  checkBadges();
  updateDisplay();
  streakBox.classList.add('bounce');
  setTimeout(() => streakBox.classList.remove('bounce'), 200);
});

subStreakBtn.addEventListener('click', () => {
  streak = Math.max(0, streak - 1);
  localStorage.setItem('streak', streak);
  updateDisplay();
  streakBox.classList.add('bounce');
  setTimeout(() => streakBox.classList.remove('bounce'), 200);
});
