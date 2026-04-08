// =======================
// QUIZ GAME - Advanced Version
// =======================

// Global State
let gameState = {
    currentQuestion: 0,
    score: 0,
    skipped: 0,
    correct: 0,
    wrong: 0,
    currentCategory: null,
    currentDifficulty: 'easy',
    timeLimit: 30,
    timeElapsed: 0,
    answers: [],
    timerInterval: null,
    soundEnabled: true,
    darkMode: false,
    questionCount: 10
};

// Quiz Data with Categories
const quizCategories = {
    science: {
        name: 'سائنس',
        icon: '🔬',
        color: '#ff6b6b'
    },
    history: {
        name: 'تاریخ',
        icon: '📜',
        color: '#4ecdc4'
    },
    geography: {
        name: 'جغرافیہ',
        icon: '🌍',
        color: '#45b7d1'
    },
    general: {
        name: 'عام علم',
        icon: '🧠',
        color: '#96ceb4'
    },
    technology: {
        name: 'ٹیکنالوجی',
        icon: '💻',
        color: '#ffeaa7'
    },
    literature: {
        name: 'ادب',
        icon: '📚',
        color: '#dfe6e9'
    }
};

const quizQuestions = {
    science: {
        easy: [
            {
                question: "پانی کا کیمیائی فارمولا کیا ہے؟",
                options: ["H2O", "CO2", "O2", "N2"],
                correct: 0,
                explanation: "پانی H2O ہے - 2 ہائیڈروجن اور 1 آکسیجن"
            },
            {
                question: "انسان کے جسم میں کتنی ہڈیاں ہیں؟",
                options: ["150", "206", "250", "300"],
                correct: 1,
                explanation: "بالغ انسان کے جسم میں 206 ہڈیاں ہوتی ہیں"
            },
            {
                question: "سورج سے روشنی کتنی دیر میں زمین تک پہنچتی ہے؟",
                options: ["8 منٹ", "8 سیکنڈ", "8 گھنٹے", "8 دن"],
                correct: 0,
                explanation: "تقریباً 8 منٹ 20 سیکنڈ میں"
            },
            {
                question: "ہیلیم کا رنگ کیا ہے؟",
                options: ["سرخ", "بے رنگ", "نیلا", "سفید"],
                correct: 1,
                explanation: "ہیلیم ایک بے رنگ گیس ہے"
            },
            {
                question: "شہد میں کون سا اہم جزو پایا جاتا ہے؟",
                options: ["نمک", "شکر", "ڈیٹھ", "روغن"],
                correct: 1,
                explanation: "شہد میں فروکٹوز اور گلوکوز ہوتا ہے"
            }
        ],
        medium: [
            {
                question: "فوٹوسنتھیسز میں کون سی گیس خارج ہوتی ہے؟",
                options: ["کاربن ڈائی آکسائڈ", "آکسیجن", "نائٹروجن", "ہائیڈروجن"],
                correct: 1,
                explanation: "پودے CO2 لیتے ہیں اور O2 خارج کرتے ہیں"
            },
            {
                question: "DNA کے کتنے حلقے ہوتے ہیں؟",
                options: ["1", "2", "3", "4"],
                correct: 1,
                explanation: "DNA کے دوہری حلقے ہوتے ہیں"
            },
            {
                question: "بدھ سیارہ سورج کے کتنے قریب ہے؟",
                options: ["سب سے قریب", "دوسرا", "تیسرا", "چوتھا"],
                correct: 0,
                explanation: "بدھ سورج کے سب سے قریب سیارہ ہے"
            }
        ],
        hard: [
            {
                question: "ڈارک میٹر کیا ہے؟",
                options: ["معلوم مادہ", "نامعلوم مادہ", "روشنی", "توانائی"],
                correct: 1,
                explanation: "ڈارک میٹر ایک نامعلوم شے ہے جو کائنات میں 85% حصہ ہے"
            }
        ]
    },
    history: {
        easy: [
            {
                question: "پاکستان کی بنیاد کب ہوئی؟",
                options: ["1945", "1947", "1950", "1952"],
                correct: 1,
                explanation: "پاکستان 14 اگست 1947 کو بنا"
            },
            {
                question: "پاکستان کے پہلے صدر کون تھے؟",
                options: ["محمد علی جناح", "لیاقت علی خان", "غازی محمد", "محمد علی"],
                correct: 0,
                explanation: "محمد علی جناح پاکستان کے بانی اور پہلے گورنر جنرل تھے"
            }
        ],
        medium: [
            {
                question: "تاج محل کس نے بنوایا؟",
                options: ["اکبر", "شاہ جہاں", "اورنگزیب", "بابر"],
                correct: 1,
                explanation: "شاہ جہاں نے اپنی بیوی ممتاز محل کی یادگار میں تاج محل بنوایا"
            }
        ],
        hard: [
            {
                question: "سندھ کی تہذیب کب کا دور ہے؟",
                options: ["2500-1500 قبل مسیح", "3000-2000 قبل مسیح", "4000-3000 قبل مسیح", "1500-500 قبل مسیح"],
                correct: 0,
                explanation: "سندھ کی تہذیب تقریباً 2500-1500 قبل مسیح کی ہے"
            }
        ]
    },
    geography: {
        easy: [
            {
                question: "دنیا کا سب سے بڑا براعظم کون سا ہے؟",
                options: ["یورپ", "آسٹریلیا", "ایشیا", "افریقہ"],
                correct: 2,
                explanation: "ایشیا دنیا کا سب سے بڑا براعظم ہے"
            },
            {
                question: "پاکستان کا سب سے بڑا شہر کون سا ہے؟",
                options: ["لاہور", "اسلام آباد", "کراچی", "ملتان"],
                correct: 2,
                explanation: "کراچی پاکستان کا سب سے بڑا اور آبادی میں زیادہ شہر ہے"
            }
        ],
        medium: [
            {
                question: "کون سی دریا دنیا کی سب سے لمبی ہے؟",
                options: ["امیزون", "نیل", "یانگتزے", "مسیسپی"],
                correct: 1,
                explanation: "نیل دریا مصر میں 6,650 کلومیٹر لمبا ہے"
            }
        ],
        hard: [
            {
                question: "دنیا کے کتنے ممالک ہیں؟",
                options: ["185", "195", "205", "215"],
                correct: 1,
                explanation: "اقوام متحدہ میں 195 ممالک ہیں"
            }
        ]
    },
    general: {
        easy: [
            {
                question: "2 + 2 برابر ہے؟",
                options: ["3", "4", "5", "6"],
                correct: 1,
                explanation: "2 + 2 = 4"
            },
            {
                question: "سال میں کتنے مہینے ہوتے ہیں؟",
                options: ["10", "11", "12", "13"],
                correct: 2,
                explanation: "سال میں 12 مہینے ہوتے ہیں"
            }
        ],
        medium: [
            {
                question: "الفانیومیریک نمبر سسٹم میں 'F' کی قیمت کیا ہے؟",
                options: ["14", "15", "16", "17"],
                correct: 1,
                explanation: "ہیکسا ڈیسیمل میں F = 15"
            }
        ],
        hard: [
            {
                question: "فائبونیچی سیریز کا اگلا نمبر کیا ہے: 1, 1, 2, 3, 5, 8, 13, ?",
                options: ["20", "21", "22", "23"],
                correct: 1,
                explanation: "فائبونیچی میں ہر نمبر پچھلے دو نمبروں کا مجموعہ ہے"
            }
        ]
    },
    technology: {
        easy: [
            {
                question: "HTML کیا ہے؟",
                options: ["ایک پروگرام", "ایک مارکنگ زبان", "ایک ڈیٹابیس", "ایک سرور"],
                correct: 1,
                explanation: "HTML (HyperText Markup Language) ویب صفحات بنانے کے لیے ہے"
            }
        ],
        medium: [
            {
                question: "JavaScript کو کب بنایا گیا؟",
                options: ["1990", "1995", "2000", "2005"],
                correct: 1,
                explanation: "JavaScript 1995 میں Brendan Eich نے بنایا"
            }
        ],
        hard: [
            {
                question: "Blockchain کا بنیادی فائدہ کیا ہے؟",
                options: ["رفتار", "سلامتی اور شفافیت", "قیمت میں کمی", "سائز میں کمی"],
                correct: 1,
                explanation: "Blockchain تمام لین دین کا ریکارڈ محفوظ طریقے سے رکھتا ہے"
            }
        ]
    },
    literature: {
        easy: [
            {
                question: "اقبال نے کون سی شاعری کی؟",
                options: ["صوفیانہ", "ملی", "عشقیہ", "سب"],
                correct: 3,
                explanation: "اقبال نے ہر قسم کی شاعری کی"
            }
        ],
        medium: [
            {
                question: "علامہ اقبال کا نام کیا تھا؟",
                options: ["محمد اقبال", "علی اقبال", "احمد اقبال", "حسن اقبال"],
                correct: 0,
                explanation: "علامہ اقبال کا مکمل نام سر محمد اقبال تھا"
            }
        ],
        hard: [
            {
                question: "شاہ ہسام الدین حسرت انجمن کے کتنے کلام ہیں؟",
                options: ["500+", "1000+", "1500+", "2000+"],
                correct: 2,
                explanation: "حسرت انجمن کے 1500+ سے زیادہ کلام ہیں"
            }
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    renderCategories();
    setupEventListeners();
});

// Load Settings
function loadSettings() {
    const settings = localStorage.getItem('quizSettings');
    if (settings) {
        const parsed = JSON.parse(settings);
        gameState.soundEnabled = parsed.soundEnabled;
        gameState.darkMode = parsed.darkMode;
        gameState.questionCount = parsed.questionCount;
        
        if (gameState.darkMode) {
            document.body.classList.add('dark-mode');
        }
    }
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('soundToggle').addEventListener('change', (e) => {
        gameState.soundEnabled = e.target.checked;
        saveSettings();
    });

    document.getElementById('darkModeToggle').addEventListener('change', (e) => {
        gameState.darkMode = e.target.checked;
        document.body.classList.toggle('dark-mode');
        saveSettings();
    });

    document.getElementById('questionCount').addEventListener('change', (e) => {
        gameState.questionCount = parseInt(e.target.value);
        saveSettings();
    });
}

// Save Settings
function saveSettings() {
    localStorage.setItem('quizSettings', JSON.stringify({
        soundEnabled: gameState.soundEnabled,
        darkMode: gameState.darkMode,
        questionCount: gameState.questionCount
    }));
}

// Render Categories
function renderCategories() {
    const categoryGrid = document.getElementById('categoryGrid');
    categoryGrid.innerHTML = '';

    Object.entries(quizCategories).forEach(([key, category]) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${getQuestionCount(key)} سوالات</p>
        `;
        card.onclick = () => selectCategory(key);
        categoryGrid.appendChild(card);
    });
}

// Get Question Count
function getQuestionCount(category) {
    let total = 0;
    Object.values(quizQuestions[category]).forEach(difficulty => {
        total += difficulty.length;
    });
    return total;
}

// Select Category
function selectCategory(category) {
    gameState.currentCategory = category;
    showScreen('difficultyScreen');
}

// Start Quiz
function startQuiz(difficulty) {
    gameState.currentDifficulty = difficulty;
    gameState.currentQuestion = 0;
    gameState.score = 0;
    gameState.correct = 0;
    gameState.wrong = 0;
    gameState.skipped = 0;
    gameState.timeElapsed = 0;
    gameState.answers = [];

    showScreen('quizScreen');
    updateDifficultyBadges();
    loadQuestion();
    startTimer();
}

// Update Badges
function updateDifficultyBadges() {
    const categoryName = quizCategories[gameState.currentCategory].name;
    document.getElementById('categoryBadge').textContent = categoryName;
    
    const difficultyNames = { easy: 'آسان', medium: 'درمیانی', hard: 'مشکل' };
    document.getElementById('difficultyBadge').textContent = difficultyNames[gameState.currentDifficulty];
}

// Load Question
function loadQuestion() {
    const questions = quizQuestions[gameState.currentCategory][gameState.currentDifficulty];
    
    if (gameState.currentQuestion >= questions.length || gameState.currentQuestion >= gameState.questionCount) {
        endQuiz();
        return;
    }

    const question = questions[gameState.currentQuestion];
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionNumber').textContent = 
        `سوال ${gameState.currentQuestion + 1} / ${Math.min(questions.length, gameState.questionCount)}`;

    // Update Progress
    const progress = ((gameState.currentQuestion + 1) / Math.min(questions.length, gameState.questionCount)) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Render Options
    const optionsSection = document.getElementById('optionsSection');
    optionsSection.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsSection.appendChild(optionDiv);
    });

    document.getElementById('nextBtn').disabled = true;
}

// Select Option
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    document.getElementById('nextBtn').disabled = false;
}

// Next Question
function nextQuestion() {
    const selectedOption = document.querySelector('.option.selected');
    if (!selectedOption) return;

    const selectedIndex = Array.from(document.querySelectorAll('.option')).indexOf(selectedOption);
    const questions = quizQuestions[gameState.currentCategory][gameState.currentDifficulty];
    const question = questions[gameState.currentQuestion];

    gameState.answers.push({
        questionIndex: gameState.currentQuestion,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: selectedIndex === question.correct
    });

    if (selectedIndex === question.correct) {
        selectedOption.classList.remove('selected');
        selectedOption.classList.add('correct');
        gameState.correct++;
        gameState.score++;
        playSound('success');
    } else {
        selectedOption.classList.remove('selected');
        selectedOption.classList.add('incorrect');
        const correctOption = document.querySelectorAll('.option')[question.correct];
        correctOption.classList.add('correct');
        gameState.wrong++;
        playSound('error');
    }

    document.getElementById('nextBtn').disabled = true;

    setTimeout(() => {
        gameState.currentQuestion++;
        loadQuestion();
    }, 1500);
}

// Skip Question
function skipQuestion() {
    const questions = quizQuestions[gameState.currentCategory][gameState.currentDifficulty];
    const question = questions[gameState.currentQuestion];

    gameState.answers.push({
        questionIndex: gameState.currentQuestion,
        selected: -1,
        correct: question.correct,
        isCorrect: false
    });

    gameState.skipped++;
    gameState.currentQuestion++;
    loadQuestion();
}

// Start Timer
function startTimer() {
    gameState.timeElapsed = 0;
    clearInterval(gameState.timerInterval);

    gameState.timerInterval = setInterval(() => {
        gameState.timeElapsed++;
        const timeLeft = gameState.timeLimit - (gameState.timeElapsed % gameState.timeLimit);
        
        document.getElementById('timerDisplay').textContent = timeLeft;
        
        const timerElement = document.querySelector('.timer');
        if (timeLeft <= 5) {
            timerElement.classList.add('warning');
        } else {
            timerElement.classList.remove('warning');
        }

        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

// End Quiz
function endQuiz() {
    clearInterval(gameState.timerInterval);

    // Save to Leaderboard
    saveToLeaderboard();

    // Calculate Results
    const totalQuestions = Math.min(
        quizQuestions[gameState.currentCategory][gameState.currentDifficulty].length,
        gameState.questionCount
    );
    const percentage = Math.round((gameState.score / totalQuestions) * 100);

    // Show Results
    showScreen('resultsScreen');

    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = gameState.correct;
    document.getElementById('wrongAnswers').textContent = gameState.wrong;
    document.getElementById('skippedAnswers').textContent = gameState.skipped;
    document.getElementById('timeTaken').textContent = formatTime(gameState.timeElapsed);

    // Result Message
    let message = '';
    let icon = '';

    if (percentage === 100) {
        message = '⭐ بہترین! آپ ماہر ہو!';
        icon = '🏆';
    } else if (percentage >= 80) {
        message = '👏 شاندار کام!';
        icon = '🌟';
    } else if (percentage >= 60) {
        message = '✅ اچھا کام!';
        icon = '👍';
    } else if (percentage >= 40) {
        message = '📚 مزید محنت کریں';
        icon = '💪';
    } else {
        message = '🔄 دوبارہ کوشش کریں';
        icon = '🎯';
    }

    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultIcon').textContent = icon;

    // Achievements
    showAchievements(percentage);
}

// Show Achievements
function showAchievements(percentage) {
    const achievementsSection = document.getElementById('achievementsSection');
    achievementsSection.innerHTML = '<h3>🏅 حاصل کردہ اعزام</h3>';

    const achievements = [];

    if (percentage === 100) {
        achievements.push({ icon: '⭐', name: 'سب درست' });
    }
    if (gameState.skipped === 0) {
        achievements.push({ icon: '🎯', name: 'کوئی اسکپ نہ کیا' });
    }
    if (gameState.correct >= 8) {
        achievements.push({ icon: '🔥', name: 'شاندار' });
    }
    if (gameState.timeElapsed < 60) {
        achievements.push({ icon: '⚡', name: 'تیز رفتار' });
    }

    if (achievements.length > 0) {
        achievements.forEach(achievement => {
            const badge = document.createElement('div');
            badge.className = 'achievement';
            badge.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
            `;
            achievementsSection.appendChild(badge);
        });
    } else {
        achievementsSection.innerHTML += '<p>کوئی اعزام نہیں</p>';
    }
}

// Save to Leaderboard
function saveToLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    
    const totalQuestions = Math.min(
        quizQuestions[gameState.currentCategory][gameState.currentDifficulty].length,
        gameState.questionCount
    );
    const percentage = Math.round((gameState.score / totalQuestions) * 100);

    leaderboard.push({
        name: 'صارف ' + leaderboard.length,
        score: percentage,
        category: quizCategories[gameState.currentCategory].name,
        difficulty: gameState.currentDifficulty,
        date: new Date().toLocaleDateString('ur-PK'),
        correct: gameState.correct,
        total: totalQuestions
    });

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(20); // Keep only top 20

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Show Leaderboard
function showLeaderboard() {
    showScreen('leaderboardScreen');
    
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const leaderboardContent = document.getElementById('leaderboardContent');

    if (leaderboard.length === 0) {
        leaderboardContent.innerHTML = '<p style="text-align: center; padding: 20px;">ابھی کوئی ریکارڈ نہیں</p>';
        return;
    }

    leaderboardContent.innerHTML = '';

    leaderboard.forEach((entry, index) => {
        const rankClass = index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : '';
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.innerHTML = `
            <div class="rank ${rankClass}">${index + 1}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.name}</div>
                <div class="leaderboard-details">${entry.category} - ${entry.date}</div>
            </div>
            <div class="leaderboard-score">${entry.score}%</div>
        `;
        leaderboardContent.appendChild(item);
    });
}

// Show Settings
function showSettings() {
    showScreen('settingsScreen');
    document.getElementById('soundToggle').checked = gameState.soundEnabled;
    document.getElementById('darkModeToggle').checked = gameState.darkMode;
    document.getElementById('questionCount').value = gameState.questionCount;
}

// Clear Data
function clearData() {
    if (confirm('کیا آپ تمام ڈیٹا صاف کرنا چاہتے ہیں؟')) {
        localStorage.removeItem('leaderboard');
        localStorage.removeItem('quizSettings');
        loadSettings();
        showLeaderboard();
    }
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function goToCategories() {
    showScreen('categoryScreen');
}

function backToCategory() {
    showScreen('categoryScreen');
}

function backToHome() {
    showScreen('homeScreen');
    clearInterval(gameState.timerInterval);
    updateHomeStats();
}

// Update Home Stats
function updateHomeStats() {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    document.getElementById('totalGames').textContent = leaderboard.length;
    
    if (leaderboard.length > 0) {
        document.getElementById('bestScore').textContent = leaderboard[0].score + '%';
    }
}

// Utility Functions
function playSound(type) {
    if (!gameState.soundEnabled) return;
    // Using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    if (type === 'success') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gain.gain.setValueAtTime(0.3, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } else if (type === 'error') {
        oscillator.frequency.value = 400;
        oscillator.type = 'square';
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Initialize on load
updateHomeStats();
