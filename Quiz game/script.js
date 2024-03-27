// Quiz data containing questions, options, and correct answers
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Leo Tolstoy"],
        answer: "William Shakespeare"
    }
    // Add more quiz questions here
];

// References to HTML elements
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const submitButton = document.getElementById('submit-button');
const retryButton = document.getElementById('retry-button');
const showAnswerButton = document.getElementById('show-answer-button');

// Variables to track current question index, score, and incorrect answers
let currentQuestion = 0;
let score = 0;
const incorrectAnswers = [];

// Function to shuffle array elements randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Function to display the current question and options
function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    const optionsHTML = shuffledOptions.map(option => `
        <label>
            <input type="radio" name="answer" value="${option}">
            ${option}
        </label>
    `).join('<br>');

    quizContainer.innerHTML = `
        <h3>${questionData.question}</h3>
        <form id="options-form">${optionsHTML}</form>
    `;
}

// Function to check the selected answer and update score
function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;

    const selectedAnswer = selectedOption.value;
    const correctAnswer = quizData[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;
    } else {
        incorrectAnswers.push({ question: quizData[currentQuestion].question, correctAnswer });
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        displayResult();
    }
}

// Function to display quiz result
function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    resultContainer.innerHTML = `
        <h3>Quiz Result</h3>
        <p>Score: ${score}/${quizData.length}</p>
    `;

    retryButton.style.display = 'block';
    showAnswerButton.style.display = 'block';
}

// Event listener for submit button
submitButton.addEventListener('click', checkAnswer);

// Function to retry the quiz
function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers.length = 0;
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';
    resultContainer.innerHTML = '';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    displayQuestion();
}

// Event listener for retry button
retryButton.addEventListener('click', retryQuiz);

// Function to show correct answers
function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'block';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML += `
        <h3>Incorrect Answers</h3>
        <ul>${incorrectAnswers.map(item => `<li>${item.question} - Correct Answer: ${item.correctAnswer}</li>`).join('')}</ul>
    `;
}

// Event listener for show answer button
showAnswerButton.addEventListener('click', showAnswer);

// Display the first question to start the quiz
displayQuestion();

