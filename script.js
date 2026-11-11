let cardsData = null;
let selectedTheme = null;

const themeButtonsContainer = document.getElementById('themeButtons');
const drawButton = document.getElementById('drawButton');
const resultSection = document.getElementById('resultSection');
const cardImage = document.getElementById('cardImage');
const positionBadge = document.getElementById('positionBadge');
const cardName = document.getElementById('cardName');
const cardNameEn = document.getElementById('cardNameEn');
const themeLabel = document.getElementById('themeLabel');
const interpretationText = document.getElementById('interpretationText');
const redrawButton = document.getElementById('redrawButton');

// データ読み込み
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
  resultSection.style.display = 'none';
}

function drawCard() {
  if (!selectedTheme || !cardsData) return;

  // ランダムにカード選択
  const randomIndex = Math.floor(Math.random() * cardsData.cards.length);
  const card = cardsData.cards[randomIndex];

  // 正位置 / 逆位置 (50/50)
  const isUpright = Math.random() > 0.5;
  const position = isUpright ? 'upright' : 'reversed';
  const positionLabel = isUpright ? '正位置' : '逆位置';

  // 表示
  cardImage.src = `images/${card.image}`;
  cardImage.alt = card.name;
  cardImage.classList.toggle('reversed', !isUpright);

  positionBadge.textContent = positionLabel;
  cardName.textContent = card.name;
  cardNameEn.textContent = card.name_en;

  const themeName = cardsData.themes[selectedTheme];
  themeLabel.textContent = `${themeName}のお題での解釈`;

  const interp = card.interpretations[selectedTheme][position];
  interpretationText.textContent = interp;

  resultSection.style.display = 'block';
  resultSection.scrollIntoView({ behavior: 'smooth' });
}

drawButton.addEventListener('click', drawCard);
redrawButton.addEventListener('click', drawCard);

// 初期化
loadData();
