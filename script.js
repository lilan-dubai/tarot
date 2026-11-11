let cardsData = null;
let selectedTheme = null;

const themeButtonsContainer = document.getElementById('themeButtons');
const drawButton = document.getElementById('drawButton');
const resultSection = document.getElementById('resultSection');
const redrawButton = document.getElementById('redrawButton');

async function loadData() {
  try {
    const response = await fetch('cards.json');
    cardsData = await response.json();
    createThemeButtons();
  } catch (error) {
    console.error('データの読み込みに失敗しました:', error);
    alert('カードデータの読み込みに失敗しました。cards.json が同じフォルダにあるか確認してください。');
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
  document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  drawButton.disabled = false;
}

function drawCard() {
  if (!selectedTheme) return;

  resultSection.style.display = 'block';
  resultSection.innerHTML = '<div class="loading">カードを読んでいます...</div>';

  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * cardsData.cards.length);
    const card = cardsData.cards[randomIndex];
    const isReversed = Math.random() < 0.5;

    resultSection.innerHTML = `
      <div class="card-container">
        <img id="cardImage" src="images/${card.image}" alt="${card.name}" class="card-image ${isReversed ? 'reversed' : ''}">
        <div id="positionBadge" class="position-badge">${isReversed ? '逆位置' : '正位置'}</div>
      </div>
      <div class="card-info">
        <h2 id="cardName">${card.name}</h2>
        <p id="cardNameEn" class="card-en">${card.name_en}</p>
        <div class="interpretation">
          <h3 id="themeLabel">${cardsData.themes[selectedTheme]}</h3>
          <p id="interpretationText">${card.interpretations[selectedTheme][isReversed ? 'reversed' : 'upright']}</p>
        </div>
      </div>
      <button id="redrawButton" class="draw-btn secondary">もう一度引く</button>
    `;

    document.getElementById('redrawButton').addEventListener('click', drawCard);
  }, 2000);
}

drawButton.addEventListener('click', drawCard);

if (redrawButton) {
  redrawButton.addEventListener('click', drawCard);
}

loadData();
