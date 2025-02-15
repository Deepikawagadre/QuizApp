


// Quiz.js - Improved Version

// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('btn');
    const quizContainer = document.querySelector('.quiz-container');
    const loginContainer = document.querySelector('.container');
    const quizElement = document.getElementById('quiz');
    const submitButton = document.getElementById('submit');

    let score = 0;
    let currentQuestionIndex = 0;
    let timer;
    let timeLeft = 30; // 30 seconds per question

    // Sample Questions Array
    const questions = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            correct: "Paris"
        },
        {
            question: "What is 5 + 3?",
            options: ["5", "8", "12", "7"],
            correct: "8"
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Earth", "Mars", "Jupiter", "Venus"],
            correct: "Mars"
        }
    ];

    // Function to handle login and show quiz
    function handleLogin() {
        loginContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        loadQuestion();
        startTimer();
    }

    // Function to load a question
    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            return showResults();
        }

        const questionData = questions[currentQuestionIndex];
        quizElement.innerHTML = `
            <h3>${questionData.question}</h3>
            ${questionData.options.map(option => `
                <input type="radio" name="answer" value="${option}" id="${option}">
                <label for="${option}">${option}</label><br>
            `).join('')}
        `;
    }

    // Function to start timer
    function startTimer() {
        timeLeft = 30;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
        
        timer = setInterval(() => {
            timeLeft--;
            document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    // Function to handle question submission
    function nextQuestion() {
        clearInterval(timer);
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        loadQuestion();
        startTimer();
    }

    // Function to show final results
    function showResults() {
        quizElement.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;
        submitButton.style.display = 'none';
    }

    // Event Listeners
    btn.addEventListener('click', handleLogin);
    submitButton.addEventListener('click', nextQuestion);
});
