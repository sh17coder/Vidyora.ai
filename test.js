document.addEventListener('DOMContentLoaded', () => {
    // Physics questions with difficulty levels (1-5)
    const questions = [
        {
            id: 1,
            question: "Which of the following is a vector quantity?",
            options: ["Mass", "Time", "Force", "Temperature"],
            answer: 2,
            difficulty: 1
        },
        {
            id: 2,
            question: "The SI unit of gravitational constant is:",
            options: ["N m²/kg²", "N m/kg", "N m²/kg", "N/kg²"],
            answer: 0,
            difficulty: 2
        },
        {
            id: 3,
            question: "A body is moving with uniform velocity. Which of the following statements is true?",
            options: [
                "Its acceleration is zero",
                "No force is acting on it",
                "The net force is in the direction of motion",
                "Its speed changes with time"
            ],
            answer: 0,
            difficulty: 2
        },
        {
            id: 4,
            question: "The work done in moving a charge of 5 C across two points having a potential difference of 12 V is:",
            options: ["60 J", "0.416 J", "2.4 J", "5 J"],
            answer: 0,
            difficulty: 3
        },
        {
            id: 5,
            question: "Which of the following is not a conservative force?",
            options: ["Gravitational force", "Electrostatic force", "Frictional force", "Elastic spring force"],
            answer: 2,
            difficulty: 3
        },
        {
            id: 6,
            question: "The dimensional formula for Planck's constant is:",
            options: ["[ML²T⁻¹]", "[MLT⁻¹]", "[ML²T⁻²]", "[MLT⁻²]"],
            answer: 0,
            difficulty: 4
        },
        {
            id: 7,
            question: "A particle moves along a circle of radius R with a constant angular velocity ω. The magnitude of its acceleration is:",
            options: ["ωR", "ω²R", "ω/R", "ω²/R"],
            answer: 1,
            difficulty: 4
        },
        {
            id: 8,
            question: "The de Broglie wavelength of a particle of mass m moving with velocity v is given by:",
            options: ["h/mv", "mv/h", "h²/mv", "mv²/h"],
            answer: 0,
            difficulty: 5
        },
        {
            id: 9,
            question: "A Carnot engine operates between temperatures of 500 K and 300 K. Its efficiency is:",
            options: ["20%", "30%", "40%", "50%"],
            answer: 2,
            difficulty: 5
        },
        {
            id: 10,
            question: "The principle of superposition is applicable to:",
            options: [
                "Only gravitational force",
                "Only electric force",
                "Only magnetic force",
                "All of the above"
            ],
            answer: 3,
            difficulty: 5
        }
    ];

    // Test variables
    let currentQuestion = 0;
    let userAnswers = Array(questions.length).fill(null);
    let timeLeft = 30 * 60; // 30 minutes in seconds
    let timerInterval;
    let testSubmitted = false;

    // DOM elements
    const questionContainer = document.getElementById('questionContainer');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');

    // Initialize the test
    function initTest() {
        displayQuestion();
        updateProgressBar();
        updateNavigationButtons();
        startTimer();
    }

    // Display current question
    function displayQuestion() {
        const q = questions[currentQuestion];
        
        let optionsHTML = q.options.map((option, index) => `
            <div class="option ${userAnswers[currentQuestion] === index ? 'selected' : ''}">
                <input type="radio" name="answer" id="option${index}" value="${index}" 
                    ${userAnswers[currentQuestion] === index ? 'checked' : ''}>
                <label for="option${index}">${option}</label>
            </div>
        `).join('');
        
        questionContainer.innerHTML = `
            <div class="question">${currentQuestion + 1}. ${q.question}</div>
            <div class="options">${optionsHTML}</div>
        `;
        
        // Add event listeners to options
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const radio = this.querySelector('input');
                radio.checked = true;
                userAnswers[currentQuestion] = parseInt(radio.value);
                document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    }

    // Update progress bar
    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Update navigation buttons
    function updateNavigationButtons() {
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.disabled = currentQuestion === questions.length - 1;
        
        if (currentQuestion === questions.length - 1) {
            submitBtn.style.display = 'block';
        } else {
            submitBtn.style.display = 'none';
        }
    }

    // Start timer
    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                submitTest();
            }
        }, 1000);
    }

    // Update timer display
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        if (timeLeft <= 300) { // 5 minutes left
            document.querySelector('.timer').style.backgroundColor = 'var(--danger)';
        }
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            displayQuestion();
            updateProgressBar();
            updateNavigationButtons();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion();
            updateProgressBar();
            updateNavigationButtons();
        }
    });

    // Submit test
    submitBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to submit the test?')) {
            submitTest();
        }
    });

    function submitTest() {
        if (testSubmitted) return;
        testSubmitted = true;
        
        clearInterval(timerInterval);
        
        // Calculate score and difficulty analysis
        let score = 0;
        let difficultyAnalysis = {
            1: { correct: 0, total: 0 },
            2: { correct: 0, total: 0 },
            3: { correct: 0, total: 0 },
            4: { correct: 0, total: 0 },
            5: { correct: 0, total: 0 }
        };
        
        questions.forEach((q, index) => {
            difficultyAnalysis[q.difficulty].total++;
            
            if (userAnswers[index] === q.answer) {
                score++;
                difficultyAnalysis[q.difficulty].correct++;
            }
        });
        
        // Determine student level based on difficulty performance
        let studentLevel = 'below_avg';
        
        // If they got at least 60% of difficulty 3-4 questions correct, they're average
        const avg3 = difficultyAnalysis[3].total > 0 ? difficultyAnalysis[3].correct / difficultyAnalysis[3].total : 0;
        const avg4 = difficultyAnalysis[4].total > 0 ? difficultyAnalysis[4].correct / difficultyAnalysis[4].total : 0;
        
        if (avg3 >= 0.6 || avg4 >= 0.6) {
            studentLevel = 'avg';
        }
        
        // If they got any difficulty 5 questions correct, they're above average
        if (difficultyAnalysis[5].correct > 0) {
            studentLevel = 'above_avg';
        }
        
        // Save results to Firebase
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('testResults').add({
                    userId: user.uid,
                    email: user.email,
                    score: score,
                    totalQuestions: questions.length,
                    difficultyAnalysis: difficultyAnalysis,
                    studentLevel: studentLevel,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    // Redirect to appropriate page based on student level
                    switch(studentLevel) {
                        case 'avg':
                            window.location.href = 'avg.html';
                            break;
                        case 'above_avg':
                            window.location.href = 'above-avg.html';
                            break;
                        default:
                            window.location.href = 'below-avg.html';
                    }
                }).catch(error => {
                    console.error('Error saving results: ', error);
                    window.location.href = 'results.html';
                });
            } else {
                window.location.href = 'results.html';
            }
        });
    }

    // Initialize the test
    initTest();
});
