// =======================
// ADVANCED QUIZ GAME - Full Version with 50 Questions
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

// Quiz Categories
const quizCategories = {
    science: { name: 'Science', icon: '🔬', color: '#ff6b6b' },
    history: { name: 'History', icon: '📜', color: '#4ecdc4' },
    geography: { name: 'Geography', icon: '🌍', color: '#45b7d1' },
    general: { name: 'General Knowledge', icon: '🧠', color: '#96ceb4' },
    technology: { name: 'Technology', icon: '💻', color: '#ffeaa7' },
    sports: { name: 'Sports', icon: '⚽', color: '#dfe6e9' }
};

// 50 Quiz Questions
const quizQuestions = {
    science: {
        easy: [
            { question: 'What is the chemical formula for water?', options: ['H2O', 'CO2', 'O2', 'N2'], correct: 0, explanation: 'Water is H2O - 2 Hydrogen and 1 Oxygen' },
            { question: 'How many bones are in the human body?', options: ['150', '206', '250', '300'], correct: 1, explanation: 'An adult human has 206 bones' },
            { question: 'What planet is closest to the Sun?', options: ['Venus', 'Mercury', 'Earth', 'Mars'], correct: 1, explanation: 'Mercury is the closest planet to the Sun' },
            { question: 'What is the most abundant gas in the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 1, explanation: 'Nitrogen makes up about 78% of the atmosphere' },
            { question: 'What color is an emerald?', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 2, explanation: 'Emeralds are green gemstones' }
        ],
        medium: [
            { question: 'What is the speed of light?', options: ['300,000 km/s', '150,000 km/s', '500,000 km/s', '100,000 km/s'], correct: 0, explanation: 'Light travels at approximately 300,000 kilometers per second' },
            { question: 'What is the process by which plants make their own food?', options: ['Respiration', 'Photosynthesis', 'Digestion', 'Fermentation'], correct: 1, explanation: 'Photosynthesis is the process where plants convert light into chemical energy' },
            { question: 'How many chromosomes do humans have?', options: ['23', '46', '48', '50'], correct: 1, explanation: 'Humans have 46 chromosomes (23 pairs)' },
            { question: 'What is the largest organ in the human body?', options: ['Heart', 'Brain', 'Skin', 'Liver'], correct: 2, explanation: 'The skin is the largest organ by area' },
            { question: 'What element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Lithium', 'Carbon'], correct: 1, explanation: 'Hydrogen has atomic number 1' }
        ],
        hard: [
            { question: 'What is dark matter?', options: ['Regular matter', 'Unknown matter', 'Light energy', 'Radiation'], correct: 1, explanation: 'Dark matter is unknown matter that comprises about 85% of matter in the universe' },
            { question: 'What is the Heisenberg Uncertainty Principle?', options: ['Gravity uncertainty', 'Position-momentum uncertainty', 'Time uncertainty', 'Energy uncertainty'], correct: 1, explanation: 'It states that certain pairs of properties cannot be simultaneously known with arbitrary precision' },
            { question: 'What is the half-life of Carbon-14?', options: ['5,730 years', '1,000 years', '10,000 years', '2,000 years'], correct: 0, explanation: 'Carbon-14 has a half-life of approximately 5,730 years' }
        ]
    },
    history: {
        easy: [
            { question: 'In what year did World War II end?', options: ['1943', '1944', '1945', '1946'], correct: 2, explanation: 'World War II ended in 1945' },
            { question: 'Who was the first President of the United States?', options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], correct: 1, explanation: 'George Washington was the first US President' },
            { question: 'In what year did Columbus discover America?', options: ['1492', '1500', '1498', '1510'], correct: 0, explanation: 'Columbus arrived in America in 1492' },
            { question: 'Who wrote the Declaration of Independence?', options: ['George Washington', 'Benjamin Franklin', 'Thomas Jefferson', 'John Adams'], correct: 2, explanation: 'Thomas Jefferson was the primary author' },
            { question: 'What year did the Titanic sink?', options: ['1910', '1911', '1912', '1913'], correct: 2, explanation: 'The Titanic sank in 1912' }
        ],
        medium: [
            { question: 'In what year did the Berlin Wall fall?', options: ['1987', '1988', '1989', '1990'], correct: 2, explanation: 'The Berlin Wall fell on November 9, 1989' },
            { question: 'Who was the first Emperor of Rome?', options: ['Julius Caesar', 'Augustus', 'Nero', 'Caligula'], correct: 1, explanation: 'Augustus was the first Roman Emperor' },
            { question: 'In what century did the Renaissance begin?', options: ['13th', '14th', '15th', '16th'], correct: 1, explanation: 'The Renaissance began in the 14th century' },
            { question: 'What year did India gain independence?', options: ['1945', '1946', '1947', '1948'], correct: 2, explanation: 'India gained independence on August 15, 1947' },
            { question: 'Who invented the printing press?', options: ['Gutenberg', 'Caxton', 'Aldus', 'Plantin'], correct: 0, explanation: 'Johannes Gutenberg invented the printing press around 1440' }
        ],
        hard: [
            { question: 'What was the Hundred Years War fought between?', options: ['Spain and Portugal', 'England and France', 'Germany and Poland', 'Italy and Austria'], correct: 1, explanation: 'The Hundred Years War was between England and France (1337-1453)' }
        ]
    },
    geography: {
        easy: [
            { question: 'What is the capital of France?', options: ['Lyon', 'Paris', 'Marseille', 'Nice'], correct: 1, explanation: 'Paris is the capital and largest city of France' },
            { question: 'How many continents are there?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'There are 7 continents' },
            { question: 'What is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, explanation: 'The Pacific Ocean is the largest' },
            { question: 'What is the capital of Japan?', options: ['Osaka', 'Tokyo', 'Kyoto', 'Hiroshima'], correct: 1, explanation: 'Tokyo is the capital of Japan' },
            { question: 'Which country is the largest by area?', options: ['Canada', 'Russia', 'USA', 'China'], correct: 1, explanation: 'Russia is the largest country by area' }
        ],
        medium: [
            { question: 'What is the longest river in the world?', options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'], correct: 1, explanation: 'The Nile River is the longest at approximately 6,650 km' },
            { question: 'Which mountain is the tallest?', options: ['K2', 'Kangchenjunga', 'Mount Everest', 'Lhotse'], correct: 2, explanation: 'Mount Everest is the tallest mountain at 8,849 meters' },
            { question: 'What is the capital of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], correct: 2, explanation: 'Canberra is the capital of Australia' },
            { question: 'Which desert is the largest?', options: ['Sahara', 'Arabian', 'Gobi', 'Kalahari'], correct: 0, explanation: 'The Sahara Desert is the largest hot desert' },
            { question: 'What is the deepest ocean trench?', options: ['Mariana', 'Tonga', 'Kuril-Kamchatka', 'Philippine'], correct: 0, explanation: 'The Mariana Trench is the deepest at about 11,000 meters' }
        ],
        hard: [
            { question: 'How many sovereign countries are there?', options: ['185', '193', '201', '210'], correct: 1, explanation: 'There are 193 UN member states' }
        ]
    },
    general: {
        easy: [
            { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: 1, explanation: '2 + 2 = 4' },
            { question: 'How many months are in a year?', options: ['10', '11', '12', '13'], correct: 2, explanation: 'There are 12 months in a year' },
            { question: 'What color is grass?', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 2, explanation: 'Grass is typically green' },
            { question: 'How many days are in a week?', options: ['5', '6', '7', '8'], correct: 2, explanation: 'There are 7 days in a week' },
            { question: 'What is the opposite of hot?', options: ['Warm', 'Cold', 'Cool', 'Tepid'], correct: 1, explanation: 'The opposite of hot is cold' }
        ],
        medium: [
            { question: 'What is the square root of 144?', options: ['10', '11', '12', '13'], correct: 2, explanation: 'The square root of 144 is 12' },
            { question: 'How many sides does a pentagon have?', options: ['4', '5', '6', '7'], correct: 1, explanation: 'A pentagon has 5 sides' },
            { question: 'What is 15% of 100?', options: ['10', '15', '20', '25'], correct: 1, explanation: '15% of 100 is 15' },
            { question: 'What is the chemical symbol for gold?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2, explanation: 'The symbol for gold is Au' },
            { question: 'How many legs does a spider have?', options: ['6', '8', '10', '12'], correct: 1, explanation: 'A spider has 8 legs' }
        ],
        hard: [
            { question: 'What is the next number in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, ?', options: ['19', '20', '21', '22'], correct: 2, explanation: 'In Fibonacci, each number is the sum of the previous two: 8 + 13 = 21' }
        ]
    },
    technology: {
        easy: [
            { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'], correct: 0, explanation: 'HTML = HyperText Markup Language' },
            { question: 'What is the purpose of CSS?', options: ['Server management', 'Styling web pages', 'Database management', 'Server programming'], correct: 1, explanation: 'CSS is used for styling and layout of web pages' },
            { question: 'What year was the first iPhone released?', options: ['2005', '2006', '2007', '2008'], correct: 2, explanation: 'The first iPhone was released in 2007' },
            { question: 'What does API stand for?', options: ['Application Program Interface', 'Advanced Programming Interface', 'Application Process Initialization', 'Applied Programming Integration'], correct: 0, explanation: 'API = Application Programming Interface' },
            { question: 'What company created JavaScript?', options: ['Microsoft', 'Netscape', 'Google', 'Apple'], correct: 1, explanation: 'JavaScript was created by Brendan Eich at Netscape' }
        ],
        medium: [
            { question: 'What does JSON stand for?', options: ['Java Standard Object Notation', 'JavaScript Object Notation', 'Java Serialized Object Notation', 'JavaScript Oriented Naming'], correct: 1, explanation: 'JSON = JavaScript Object Notation' },
            { question: 'What is the main purpose of Git?', options: ['Code execution', 'Version control', 'Database management', 'Web hosting'], correct: 1, explanation: 'Git is a version control system for tracking code changes' },
            { question: 'What does RAM stand for?', options: ['Read-Access Memory', 'Random-Access Memory', 'Rapid-Allocation Memory', 'Read-Array Management'], correct: 1, explanation: 'RAM = Random-Access Memory' },
            { question: 'What is the most popular programming language?', options: ['C++', 'Python', 'Java', 'JavaScript'], correct: 1, explanation: 'Python is currently the most popular programming language' },
            { question: 'What does URL stand for?', options: ['Universal Resource Locator', 'Uniform Resource Locator', 'Universal Referral List', 'Uniform Retrieval Link'], correct: 1, explanation: 'URL = Uniform Resource Locator' }
        ],
        hard: [
            { question: 'What is blockchain technology primarily used for?', options: ['Data compression', 'Secure distributed ledger', 'Image processing', 'Sound editing'], correct: 1, explanation: 'Blockchain is used for secure, distributed ledger technology' }
        ]
    },
    sports: {
        easy: [
            { question: 'How many players are on a soccer team?', options: ['9', '10', '11', '12'], correct: 2, explanation: 'A soccer team has 11 players on the field' },
            { question: 'What is the maximum score in a game of bowling?', options: ['200', '250', '300', '350'], correct: 2, explanation: 'The maximum score in bowling is 300' },
            { question: 'How many quarters are in an NBA game?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'An NBA game has 4 quarters' },
            { question: 'What is the height of a basketball hoop?', options: ['8 feet', '9 feet', '10 feet', '11 feet'], correct: 2, explanation: 'A basketball hoop is 10 feet high' },
            { question: 'How many innings are in a baseball game?', options: ['7', '8', '9', '10'], correct: 2, explanation: 'A baseball game has 9 innings' }
        ],
        medium: [
            { question: 'What is the standard length of a tennis court?', options: ['70 feet', '78 feet', '85 feet', '90 feet'], correct: 1, explanation: 'A tennis court is 78 feet long' },
            { question: 'In golf, what is a score of 2 under par called?', options: ['Eagle', 'Birdie', 'Albatross', 'Bogey'], correct: 2, explanation: 'An albatross (or double eagle) is 2 under par' },
            { question: 'How many players are on an American football team on the field?', options: ['10', '11', '12', '13'], correct: 1, explanation: 'An American football team has 11 players on the field' },
            { question: 'What is the circumference of a basketball?', options: ['28 inches', '29 inches', '30 inches', '31 inches'], correct: 1, explanation: 'A basketball circumference is about 29.5 inches' },
            { question: 'How many wheels does a skateboard have?', options: ['2', '3', '4', '6'], correct: 2, explanation: 'A skateboard has 4 wheels' }
        ],
        hard: [
            { question: 'What is the Olympic marathon distance?', options: ['38 km', '40 km', '42.2 km', '45 km'], correct: 2, explanation: 'A marathon is 42.195 kilometers (26.2 miles)' }
        ]
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    renderCategories();
    setupEventListeners();
    createParticles();
    updateHomeStats();
});

// Create Particle Animation
function createParticles() {
    const container = document.getElementById('particleContainer');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255,255,255,' + Math.random() * 0.5 + ')';
        particle.style.borderRadius = '50%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite`;
        container.appendChild(particle);
    }
}

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
            document.getElementById('darkModeToggle').checked = true;
        }
        document.getElementById('soundToggle').checked = gameState.soundEnabled;
        document.getElementById('questionCount').value = gameState.questionCount;
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

    Object.entries(quizCategories).forEach(([key, category], index) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.style.animationDelay = (index * 0.1) + 's';
        card.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${getQuestionCount(key)} Questions</p>
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
    playSound('click');
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
    playSound('start');
}

// Update Badges
function updateDifficultyBadges() {
    const categoryName = quizCategories[gameState.currentCategory].name;
    document.getElementById('categoryBadge').textContent = categoryName;
    
    const difficultyNames = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
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
        `Question ${gameState.currentQuestion + 1} / ${Math.min(questions.length, gameState.questionCount)}`;

    // Update Progress
    const progress = ((gameState.currentQuestion + 1) / Math.min(questions.length, gameState.questionCount)) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    // Render Options
    const optionsSection = document.getElementById('optionsSection');
    optionsSection.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.style.animationDelay = (index * 0.1) + 's';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionsSection.appendChild(optionDiv);
    });

    document.getElementById('nextBtn').disabled = true;
    resetTimer();
}

// Select Option
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    document.getElementById('nextBtn').disabled = false;
    playSound('select');
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
    playSound('skip');
}

// Timer Functions
function resetTimer() {
    gameState.timeElapsed = 0;
    updateTimer();
}

function startTimer() {
    clearInterval(gameState.timerInterval);
    gameState.timeElapsed = 0;

    gameState.timerInterval = setInterval(() => {
        gameState.timeElapsed++;
        updateTimer();

        if (gameState.timeElapsed >= gameState.timeLimit) {
            nextQuestion();
        }
    }, 1000);
}

function updateTimer() {
    const timeLeft = Math.max(0, gameState.timeLimit - gameState.timeElapsed);
    document.getElementById('timerValue').textContent = timeLeft;
    
    const timerElement = document.getElementById('timerDisplay');
    if (timeLeft <= 5) {
        timerElement.classList.add('warning');
        if (timeLeft === 5) playSound('warning');
    } else {
        timerElement.classList.remove('warning');
    }
}

// End Quiz
function endQuiz() {
    clearInterval(gameState.timerInterval);
    saveToLeaderboard();

    const totalQuestions = Math.min(
        quizQuestions[gameState.currentCategory][gameState.currentDifficulty].length,
        gameState.questionCount
    );
    const percentage = Math.round((gameState.score / totalQuestions) * 100);

    showScreen('resultsScreen');

    document.getElementById('scorePercentage').textContent = percentage + '%';
    document.getElementById('correctAnswers').textContent = gameState.correct;
    document.getElementById('wrongAnswers').textContent = gameState.wrong;
    document.getElementById('skippedAnswers').textContent = gameState.skipped;
    document.getElementById('timeTaken').textContent = formatTime(gameState.timeElapsed);

    let message = '';
    let icon = '';

    if (percentage === 100) {
        message = '⭐ Perfect Score! You\'re Genius!';
        icon = '🏆';
        playSound('win');
    } else if (percentage >= 80) {
        message = '👏 Excellent Performance!';
        icon = '🌟';
        playSound('win');
    } else if (percentage >= 60) {
        message = '✅ Good Job!';
        icon = '👍';
        playSound('good');
    } else if (percentage >= 40) {
        message = '📚 Keep Learning!';
        icon = '💪';
    } else {
        message = '🔄 Try Again!';
        icon = '🎯';
    }

    document.getElementById('resultMessage').textContent = message;
    document.getElementById('resultIcon').textContent = icon;

    showAchievements(percentage);
}

// Show Achievements
function showAchievements(percentage) {
    const achievementsSection = document.getElementById('achievementsSection');
    achievementsSection.innerHTML = '<h3>🏅 Achievements Unlocked</h3>';

    const achievements = [];

    if (percentage === 100) achievements.push({ icon: '⭐', name: 'Perfect' });
    if (gameState.skipped === 0) achievements.push({ icon: '🎯', name: 'No Skip' });
    if (gameState.correct >= 8) achievements.push({ icon: '🔥', name: 'Hot Streak' });
    if (gameState.timeElapsed < 60) achievements.push({ icon: '⚡', name: 'Speed Demon' });
    if (gameState.wrong === 0) achievements.push({ icon: '✨', name: 'Flawless' });

    if (achievements.length > 0) {
        achievements.forEach((achievement, index) => {
            const badge = document.createElement('div');
            badge.className = 'achievement';
            badge.style.animationDelay = (index * 0.1) + 's';
            badge.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
            `;
            achievementsSection.appendChild(badge);
        });
    } else {
        achievementsSection.innerHTML += '<p>Keep improving to unlock achievements!</p>';
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
        name: 'Player ' + (leaderboard.length + 1),
        score: percentage,
        category: quizCategories[gameState.currentCategory].name,
        difficulty: gameState.currentDifficulty,
        date: new Date().toLocaleDateString('en-US'),
        correct: gameState.correct,
        total: totalQuestions
    });

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard.splice(50);

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Show Leaderboard
function showLeaderboard() {
    showScreen('leaderboardScreen');
    
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
    const leaderboardContent = document.getElementById('leaderboardContent');

    if (leaderboard.length === 0) {
        leaderboardContent.innerHTML = '<p style="text-align: center; padding: 20px;">No records yet. Be the first to play!</p>';
        return;
    }

    leaderboardContent.innerHTML = '';

    leaderboard.slice(0, 20).forEach((entry, index) => {
        const rankClass = index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : '';
        const item = document.createElement('div');
        item.className = 'leaderboard-item';
        item.style.animationDelay = (index * 0.05) + 's';
        item.innerHTML = `
            <div class="rank ${rankClass}">#${index + 1}</div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${entry.name}</div>
                <div class="leaderboard-details">${entry.category} (${entry.difficulty}) - ${entry.date}</div>
            </div>
            <div class="leaderboard-score">${entry.score}%</div>
        `;
        leaderboardContent.appendChild(item);
    });
}

// Show Settings
function showSettings() {
    showScreen('settingsScreen');
}

// Clear Data
function clearData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        localStorage.removeItem('leaderboard');
        localStorage.removeItem('quizSettings');
        location.reload();
    }
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

function goToCategories() {
    showScreen('categoryScreen');
    clearInterval(gameState.timerInterval);
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

// Sound Effects
function playSound(type) {
    if (!gameState.soundEnabled) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    
    const sounds = {
        success: { freq: 800, duration: 0.1, volume: 0.3 },
        error: { freq: 400, duration: 0.2, volume: 0.1 },
        select: { freq: 600, duration: 0.05, volume: 0.1 },
        skip: { freq: 500, duration: 0.1, volume: 0.15 },
        warning: { freq: 700, duration: 0.08, volume: 0.2 },
        click: { freq: 900, duration: 0.05, volume: 0.2 },
        start: { freq: 1000, duration: 0.2, volume: 0.25 },
        good: { freq: 850, duration: 0.15, volume: 0.25 },
        win: { freq: 1200, duration: 0.3, volume: 0.3 }
    };
    
    const sound = sounds[type] || sounds.click;
    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';
    gain.gain.setValueAtTime(sound.volume, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
}

// Utility
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
}

// Initialize
updateHomeStats();
