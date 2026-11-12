let cardsData = null;
let selectedTheme = null;
let isYesNoMode = false;

const themeButtonsContainer = document.getElementById('themeButtons');
const drawButton = document.getElementById('drawButton');
const resultSection = document.getElementById('resultSection');
const resetTitle = document.getElementById('resetTitle');
const themeSection = document.getElementById('themeSection');
const drawSection = document.querySelector('.draw-section');
const modeSection = document.querySelector('.mode-section');
const normalModeBtn = document.getElementById('normalModeBtn');
const yesnoModeBtn = document.getElementById('yesnoModeBtn');
const cardBackContainer = document.getElementById('cardBackContainer');

async function loadData() {
  try {
    const response = await fetch('cards.json');
    cardsData = await response.json();
    createThemeButtons();
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
  }
}

function createThemeButtons() {
  Object.entries(cardsData.themes).forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.textContent = label;
    btn.dataset.theme = key;
    btn.addEventListener('click', () => selectTheme(key, btn));
    themeButtonsContainer.appendChild(btn);
  });
}

function selectTheme(themeKey, button) {
  selectedTheme = themeKey;
  document.querySelectorAll('#themeButtons .theme-btn').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  drawButton.disabled = false;
}

function setMode(yesno) {
  isYesNoMode = yesno;
  normalModeBtn.classList.toggle('active', !yesno);
  yesnoModeBtn.classList.toggle('active', yesno);

  if (yesno) {
    themeSection.style.display = 'none';
    selectedTheme = 'yesno';
    drawButton.disabled = false;
  } else {
    themeSection.style.display = 'block';
    selectedTheme = null;
    document.querySelectorAll('#themeButtons .theme-btn').forEach(b => b.classList.remove('active'));
    drawButton.disabled = true;
  }
}

function resetToInitial() {
  selectedTheme = null;
  isYesNoMode = false;
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  drawButton.disabled = true;
  resultSection.style.display = 'none';
  resultSection.innerHTML = '';
  themeSection.style.display = 'none';
  drawSection.style.display = 'block';
  if (modeSection) modeSection.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function drawCard() {
  if (!selectedTheme && !isYesNoMode) return;

  if (modeSection) modeSection.style.display = 'none';
  if (themeSection) themeSection.style.display = 'none';
  if (drawSection) drawSection.style.display = 'none';
  resultSection.style.display = 'block';
  resultSection.innerHTML = '<div class="loading">カードを読んでいます...</div>';

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * cardsData.cards.length);
    const card = cardsData.cards[randomIndex];
    const isReversed = Math.random() < 0.5;
    const themeKey = isYesNoMode ? 'yesno' : selectedTheme;
    const themeLabel = isYesNoMode ? 'Yes / No' : cardsData.themes[selectedTheme];

    resultSection.innerHTML = `
      <div class="card-container">
        <img src="images/${card.image}" alt="${card.name}" class="card-image ${isReversed ? 'reversed' : ''}">
        <div class="position-badge">${isReversed ? '逆位置' : '正位置'}</div>
      </div>
      <div class="card-info">
        <h2>${card.name}</h2>
        <p class="card-en">${card.name_en}</p>
        <div class="interpretation">
          <h3>${themeLabel}</h3>
          <p>${card.interpretations[themeKey][isReversed ? 'reversed' : 'upright']}</p>
        </div>
      </div>
      <button id="redrawButton" class="draw-btn secondary">最初に戻る</button>
    `;

    document.getElementById('redrawButton').addEventListener('click', resetToInitial);
  }, 2000);
}

if (drawButton) drawButton.addEventListener('click', drawCard);
if (cardBackContainer) {
  cardBackContainer.addEventListener('click', () => {
    if (!drawButton.disabled) {
      drawCard();
    }
  });
}
if (resetTitle) resetTitle.addEventListener('click', resetToInitial);
if (normalModeBtn) normalModeBtn.addEventListener('click', () => setMode(false));
if (yesnoModeBtn) yesnoModeBtn.addEventListener('click', () => setMode(true));

loadData();
