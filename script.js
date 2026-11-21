const countries = [
  { name: "O'zbekiston", capital: "Toshkent", flag: "🇺🇿", fact: "Markaziy Osiyodagi ikki karra dengizga chiqish imkoni yo'q davlat." },
  { name: "Qozog'iston", capital: "Ostona", flag: "🇰🇿", fact: "Dunyodagi eng katta dengizga chiqmaydigan davlat." },
  { name: "Qirg'iziston", capital: "Bishkek", flag: "🇰🇬", fact: "Hududining 90% dan ortig'i tog'lardan iborat." },
  { name: "Tojikiston", capital: "Dushanbe", flag: "🇹🇯", fact: "Pomir tog'lari joylashgan mamlakat." },
  { name: "Turkmaniston", capital: "Ashxobod", flag: "🇹🇲", fact: "Qoraqum cho'li va Darvoza gaz krateri bilan mashhur." },
  { name: "Turkiya", capital: "Anqara", flag: "🇹🇷", fact: "Ham Yevropa, ham Osiyo qit'asida joylashgan." },
  { name: "Yaponiya", capital: "Tokio", flag: "🇯🇵", fact: "Kunchiqar mamlakat deb ataladi va 6800 dan ortiq oroldan iborat." },
  { name: "Janubiy Koreya", capital: "Seul", flag: "🇰🇷", fact: "Texnologiya va K-pop madaniyati markazi." },
  { name: "Xitoy", capital: "Pekin", flag: "🇨🇳", fact: "Buyuk Xitoy devori joylashgan mamlakat." },
  { name: "Hindiston", capital: "Nyu-Dehli", flag: "🇮🇳", fact: "Toj Mahal joylashgan va aholisi eng ko'p davlat." },
  { name: "Rossiya", capital: "Moskva", flag: "🇷🇺", fact: "Hududi jihatidan dunyodagi eng katta mamlakat." },
  { name: "Germaniya", capital: "Berlin", flag: "🇩🇪", fact: "Yevropaning eng yirik iqtisodiyoti va avtomobilsozlik markazi." },
  { name: "Fransiya", capital: "Parij", flag: "🇫🇷", fact: "Eyfel minorasi va Luvr muzeyi vatani." },
  { name: "Italiya", capital: "Rim", flag: "🇮🇹", fact: "Xaritada etik shakliga o'xshaydi." },
  { name: "Ispaniya", capital: "Madrid", flag: "🇪🇸", fact: "Flamenko raqsi va korrida bilan mashhur." },
  { name: "Buyuk Britaniya", capital: "London", flag: "🇬🇧", fact: "Big Ben soati va qirollik oilasi bilan tanilgan." },
  { name: "AQSH", capital: "Vashington", flag: "🇺🇸", fact: "50 ta shtatdan iborat federativ respublika." },
  { name: "Kanada", capital: "Ottava", flag: "🇨🇦", fact: "Bayrog'ida zarang bargi tasvirlangan." },
  { name: "Braziliya", capital: "Braziliya", flag: "🇧🇷", fact: "Amazonka o'rmonlari va futbol vatani." },
  { name: "Argentina", capital: "Buenos-Ayres", flag: "🇦🇷", fact: "Tango raqsi va Lionel Messi vatani." },
  { name: "Misr", capital: "Qohira", flag: "🇪🇬", fact: "Ehromlar va Nil daryosi mamlakati." },
  { name: "Saudiya Arabistoni", capital: "Ar-Riyod", flag: "🇸🇦", fact: "Makka va Madina shaharlari joylashgan." },
  { name: "BAA", capital: "Abu-Dabi", flag: "🇦🇪", fact: "Dunyodagi eng baland bino — Burj Xalifa shu yerda." },
  { name: "Avstraliya", capital: "Kanberra", flag: "🇦🇺", fact: "Ham materik, ham davlat hisoblanadi." },
  { name: "Shveytsariya", capital: "Bern", flag: "🇨🇭", fact: "Soatlari, shokoladi va Alp tog'lari bilan mashhur." }
];

// O'yin holati
let currentMode = 'flags';
let questions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let correctAnswers = 0;
let fiftyUsed = false;
const TOTAL_QUESTIONS = 10;

// DOM elementlar
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const bestScoreEl = document.getElementById('best-score');
const modeBtns = document.querySelectorAll('.mode-btn');

// Eng yaxshi natijani yuklash
bestScoreEl.textContent = localStorage.getItem('geo_best_score') || 0;

// Rejim tanlash
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
  });
});

// O'yinni boshlash
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);

function startGame() {
  score = 0;
  streak = 0;
  correctAnswers = 0;
  currentIndex = 0;
  fiftyUsed = false;

  const fiftyBtn = document.getElementById('fifty-btn');
  fiftyBtn.disabled = false;
  fiftyBtn.textContent = "💡 50/50 Yordam (1)";

  // Tasodifiy 10 ta savol tanlash
  questions = [...countries].sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);

  startScreen.classList.add('hidden');
  resultScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentIndex];
  const visualEl = document.getElementById('question-visual');
  const textEl = document.getElementById('question-text');
  const hintEl = document.getElementById('hint-text');
  const optionsGrid = document.getElementById('options-grid');
  const nextBtn = document.getElementById('next-btn');

  nextBtn.classList.add('hidden');
  hintEl.textContent = "";
  optionsGrid.innerHTML = "";

  // Yuqori panelni yangilash
  document.getElementById('question-counter').textContent = `Savol: ${currentIndex + 1} / ${TOTAL_QUESTIONS}`;
  document.getElementById('score-display').textContent = `Ball: ${score}`;
  document.getElementById('progress-fill').style.width = `${((currentIndex + 1) / TOTAL_QUESTIONS) * 100}%`;

  const streakBadge = document.getElementById('streak-badge');
  if (streak >= 2) {
    streakBadge.textContent = `🔥 ${streak}x`;
    streakBadge.classList.remove('hidden');
  } else {
    streakBadge.classList.add('hidden');
  }

  // Savol turini aniqlash
  let qType = currentMode;
  if (currentMode === 'mixed') {
    const types = ['flags', 'capitals', 'fact'];
    qType = types[Math.floor(Math.random() * types.length)];
  }

  visualEl.classList.remove('capital-mode');

  if (qType === 'flags') {
    visualEl.textContent = q.flag;
    textEl.textContent = "Ushbu bayroq qaysi davlatga tegishli?";
  } else if (qType === 'capitals') {
    visualEl.textContent = `🏛️ ${q.capital}`;
    visualEl.classList.add('capital-mode');
    textEl.textContent = "Bu shahar qaysi davlatning poytaxti?";
  } else {
    visualEl.textContent = "🌍";
    textEl.textContent = q.fact;
    hintEl.textContent = "Fakt asosida davlatni toping";
  }

  // 4 ta variant yaratish (1 to'g'ri + 3 xato)
  const wrongOptions = countries
    .filter(c => c.name !== q.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const allOptions = [q, ...wrongOptions].sort(() => Math.random() - 0.5);

  allOptions.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.name;
    btn.dataset.correct = (opt.name === q.name);
    btn.addEventListener('click', () => handleAnswer(btn, q));
    optionsGrid.appendChild(btn);
  });
}

function handleAnswer(selectedBtn, question) {
  const buttons = document.querySelectorAll('.option-btn');
  const isCorrect = selectedBtn.dataset.correct === 'true';

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    streak++;
    correctAnswers++;
    const bonus = streak >= 2 ? streak * 2 : 0;
    score += 10 + bonus;
    document.getElementById('hint-text').textContent = `✅ To'g'ri! Poytaxti: ${question.capital}`;
  } else {
    streak = 0;
    selectedBtn.classList.add('wrong');
    document.getElementById('hint-text').textContent = `❌ Xato! To'g'ri javob: ${question.name} (${question.capital})`;
  }

  document.getElementById('score-display').textContent = `Ball: ${score}`;
  document.getElementById('next-btn').classList.remove('hidden');
}

// 50/50 Yordam tugmasi
document.getElementById('fifty-btn').addEventListener('click', () => {
  if (fiftyUsed) return;
  const wrongBtns = Array.from(document.querySelectorAll('.option-btn'))
    .filter(btn => btn.dataset.correct === 'false' && !btn.disabled);

  if (wrongBtns.length >= 2) {
    wrongBtns.sort(() => Math.random() - 0.5).slice(0, 2).forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = '0.25';
    });
    fiftyUsed = true;
    const fiftyBtn = document.getElementById('fifty-btn');
    fiftyBtn.disabled = true;
    fiftyBtn.textContent = "💡 50/50 Ishlatildi";
  }
});

// Keyingi savol
document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < TOTAL_QUESTIONS) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  gameScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  document.getElementById('final-score').textContent = score;
  document.getElementById('correct-count').textContent = `${correctAnswers} / ${TOTAL_QUESTIONS}`;

  const best = Number(localStorage.getItem('geo_best_score') || 0);
  if (score > best) {
    localStorage.setItem('geo_best_score', score);
    bestScoreEl.textContent = score;
    document.getElementById('result-message').textContent = "🎉 Yangi rekord o'rnatdingiz!";
  } else {
    document.getElementById('result-message').textContent =
      correctAnswers >= 8 ? "Geografiya bo'yicha bilimingiz zo'r!" : "Yaxshi urinish, yana sinab ko'ring!";
  }
}