const badgeGrid = document.getElementById('badgeGrid');
const unlockAllBtn = document.getElementById('unlockAllBtn');
const resetAllBtn = document.getElementById('resetAllBtn');

// Example badge list
const badges = [
  { id: 1, icon: "🌱", title: "Getting Started", desc: "Mark your first day complete", unlocked: false },
  { id: 2, icon: "🔥", title: "On Fire", desc: "Reach a 7-day streak", unlocked: false },
  { id: 3, icon: "💪", title: "Strong Spirit", desc: "Reach a 14-day streak", unlocked: false },
  { id: 4, icon: "🌟", title: "Legend", desc: "Reach a 30-day streak", unlocked: false },
  { id: 5, icon: "🏆", title: "Champion", desc: "Break your best streak", unlocked: false },
];

// Load saved progress
const saved = JSON.parse(localStorage.getItem('badges')) || {};
badges.forEach(b => {
  if (saved[b.id]) b.unlocked = true;
});

function renderBadges() {
  badgeGrid.innerHTML = "";
  badges.forEach(badge => {
    const div = document.createElement("div");
    div.className = `badge-card ${badge.unlocked ? "" : "locked"}`;
    div.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <div class="badge-title">${badge.title}</div>
      <div class="badge-desc">${badge.desc}</div>
    `;
    badgeGrid.appendChild(div);
  });
}

function saveBadges() {
  const saveObj = {};
  badges.forEach(b => saveObj[b.id] = b.unlocked);
  localStorage.setItem('badges', JSON.stringify(saveObj));
}

// Debug unlock all
unlockAllBtn.addEventListener('click', () => {
  badges.forEach(b => b.unlocked = true);
  saveBadges();
  renderBadges();
});

// Debug reset all
resetAllBtn.addEventListener('click', () => {
  badges.forEach(b => b.unlocked = false);
  localStorage.removeItem('badges'); // clear saved
  renderBadges();
});

renderBadges();
