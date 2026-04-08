const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    // Add more questions as needed
];

let quizContainer = document.getElementById('quiz-container');

function loadQuiz() {
    questions.forEach((q, index) => {
        quizContainer.innerHTML += `<div>${q.question}</div>`;
    });
}

loadQuiz();