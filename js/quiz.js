 document.addEventListener('DOMContentLoaded', function() {
    const quizContainer = document.querySelector('.quiz-container');
    
    if (!quizContainer) return;
    
    let currentQuestion = 0;
    let score = 0;
    let answers = [];
    
    // Quiz questions
    const questions = [
        {
            question: "ما هو المقام الذي يتميز بوجود جنس حجاز في منطقة الجواب؟",
            options: ["مقام الرست", "مقام النهاوند", "مقام الصبا", "مقام البياتي"],
            correct: 1,
            explanation: "مقام النهاوند يتميز بوجود جنس حجاز في منطقة الجواب."
        },
        {
            question: "أي من المقامات التالية يعتبر من فصيلة مقام العجم؟",
            options: ["مقام الكرد", "مقام النهاوند", "مقام الحجاز", "مقام الرست"],
            correct: 0,
            explanation: "مقام الكرد يعتبر من فصيلة مقام العجم."
        },
        {
            question: "ما هو المقام الذي يشتهر بتلاوة القرآن الكريم عليه؟",
            options: ["مقام الصبا", "مقام البياتي", "مقام السيكاه", "مقام الحجاز"],
            correct: 1,
            explanation: "يعتبر مقام البياتي من أكثر المقامات استخداماً في تلاوة القرآن الكريم."
        },
        {
            question: "أي من الأغاني التالية تنتمي لمقام الرست؟",
            options: ["يا مال الشام", "طلعت يا محلى نورها", "لسه فاكر", "مضناك"],
            correct: 0,
            explanation: "أغنية 'يا مال الشام' تنتمي لمقام الرست."
        },
        {
            question: "للانتقال من مقام عجم إلى مقام سيكاه، نأخذ:",
            options: ["علامة سي بيمول", "علامة مي نصف بيمول", "علامة فا دييز", "علامة لا بيمول"],
            correct: 1,
            explanation: "للانتقال من مقام عجم إلى مقام سيكاه، نأخذ علامة مي نصف بيمول."
        },
        {
            question: "ما هو المقام الذي يتميز بوجود ثلاثة أرباع النغمة بين الدرجة الثانية والثالثة؟",
            options: ["مقام الرست", "مقام البياتي", "مقام العجم", "مقام الكرد"],
            correct: 1,
            explanation: "مقام البياتي يتميز بوجود ثلاثة أرباع النغمة بين الدرجة الثانية والثالثة."
        },
        {
            question: "أي من المقامات التالية يعتبر من المقامات الفرعية؟",
            options: ["مقام الرست", "مقام البياتي", "مقام العجم", "مقام الصبا"],
            correct: 3,
            explanation: "مقام الصبا يعتبر من المقامات الفرعية المشتقة من مقامات أساسية."
        },
        {
            question: "الشيخ محمود الحصري اشتهر بقراءة القرآن الكريم على مقام:",
            options: ["الرست", "النهاوند", "البياتي", "الصبا"],
            correct: 1,
            explanation: "اشتهر الشيخ محمود الحصري رحمه الله بقراءة القرآن الكريم على مقام النهاوند."
        },
        {
            question: "أنشودة 'طلع البدر علينا' تنتمي لمقام:",
            options: ["الصبا", "الحجاز", "السيكاه", "الرست"],
            correct: 2,
            explanation: "أنشودة 'طلع البدر علينا' تنتمي لمقام السيكاه."
        },
        {
            question: "للانتقال من مقام عجم إلى مقام رست، نأخذ:",
            options: ["علامة سي بيمول", "علامة دو", "علامة مي بيمول", "علامة فا دييز"],
            correct: 1,
            explanation: "للانتقال من مقام عجم إلى مقام رست، نأخذ نفس العلامة دو لأنهما من عائلة واحدة."
        }
    ];
    
    // Initialize quiz
    function initQuiz() {
        // Add Tone.js for audio examples in quiz
        loadToneJS();
        
        // Render first question
        renderQuestion();
        
        // Set up navigation buttons
        document.getElementById('next-btn').addEventListener('click', nextQuestion);
        document.getElementById('prev-btn').addEventListener('click', prevQuestion);
        document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
    }
    
    // Render current question
    function renderQuestion() {
        const question = questions[currentQuestion];
        const questionElement = document.getElementById('question-container');
        
        // Update question number
        document.getElementById('question-number').textContent = `السؤال ${currentQuestion + 1} من ${questions.length}`;
        
        // Clear previous question
        questionElement.innerHTML = '';
        
        // Create question element
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = question.question;
        questionElement.appendChild(questionTitle);
        
        // Create options
        const optionsContainer = document.createElement('div');
        optionsContainer.classList.add('options');
        
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.setAttribute('data-index', index);
            
            // Check if this option was previously selected
            if (answers[currentQuestion] === index) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', selectOption);
            optionsContainer.appendChild(optionElement);
        });
        
        questionElement.appendChild(optionsContainer);
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    // Select an option
    function selectOption(e) {
        // Remove selected class from all options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.classList.remove('selected');
        });
        
        // Add selected class to clicked option
        e.target.classList.add('selected');
        
        // Save answer
        answers[currentQuestion] = parseInt(e.target.getAttribute('data-index'));
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    // Update navigation buttons state
    function updateNavButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-quiz');
        
        // Disable previous button on first question
        prevBtn.disabled = currentQuestion === 0;
        
        // Show submit button on last question instead of next button
        if (currentQuestion === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
        
        // Enable next/submit button only if an option is selected
        const isAnswered = answers[currentQuestion] !== undefined;
        nextBtn.disabled = !isAnswered;
        submitBtn.disabled = !isAnswered;
    }
    
    // Go to next question
    function nextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion();
        }
    }
    
    // Go to previous question
    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion();
        }
    }
    
    // Submit quiz and show results
    function submitQuiz() {
        // Calculate score
        score = 0;
        for (let i = 0; i < questions.length; i++) {
            if (answers[i] === questions[i].correct) {
                score++;
            }
        }
        
        // Hide quiz container
        document.querySelector('.quiz-questions').style.display = 'none';
        
        // Show results
        const resultContainer = document.createElement('div');
        resultContainer.classList.add('quiz-result');
        
        const scoreElement = document.createElement('div');
        scoreElement.classList.add('score');
        scoreElement.textContent = `النتيجة: ${score} من ${questions.length}`;
        resultContainer.appendChild(scoreElement);
        
        // Add percentage
        const percentage = Math.round((score / questions.length) * 100);
        const percentageElement = document.createElement('div');
        percentageElement.textContent = `النسبة المئوية: ${percentage}%`;
        resultContainer.appendChild(percentageElement);
        
        // Add feedback based on score
        const feedbackElement = document.createElement('p');
        if (percentage >= 90) {
            feedbackElement.textContent = 'ممتاز! أنت خبير في المقامات الموسيقية العربية.';
        } else if (percentage >= 70) {
            feedbackElement.textContent = 'جيد جداً! لديك معرفة جيدة بالمقامات الموسيقية العربية.';
        } else if (percentage >= 50) {
            feedbackElement.textContent = 'جيد! لديك بعض المعرفة بالمقامات الموسيقية العربية.';
        } else {
            feedbackElement.textContent = 'تحتاج إلى مزيد من التعلم حول المقامات الموسيقية العربية.';
        }
        resultContainer.appendChild(feedbackElement);
        
        // Add review answers button
        const reviewBtn = document.createElement('button');
        reviewBtn.classList.add('quiz-btn');
        reviewBtn.textContent = 'مراجعة الإجابات';
        reviewBtn.addEventListener('click', reviewAnswers);
        resultContainer.appendChild(reviewBtn);
        
        // Add retry button
        const retryBtn = document.createElement('button');
        retryBtn.classList.add('quiz-btn');
        retryBtn.textContent = 'إعادة الاختبار';
        retryBtn.addEventListener('click', resetQuiz);
        resultContainer.appendChild(retryBtn);
        
        // Add home button
        const homeBtn = document.createElement('button');
        homeBtn.classList.add('quiz-btn');
        homeBtn.textContent = 'العودة للصفحة الرئيسية';
        homeBtn.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
        resultContainer.appendChild(homeBtn);
        
        // Append to quiz container
        quizContainer.appendChild(resultContainer);
    }
    
    // Review answers
    function reviewAnswers() {
        // Hide result container
        document.querySelector('.quiz-result').style.display = 'none';
        
        // Create review container
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('review-container');
        
        const reviewTitle = document.createElement('h2');
        reviewTitle.textContent = 'مراجعة الإجابات';
        reviewContainer.appendChild(reviewTitle);
        
        // Add each question with correct and user answers
        questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('question', 'review-question');
            
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `${index + 1}. ${question.question}`;
            questionElement.appendChild(questionTitle);
            
            // Add options with highlighting
            const optionsContainer = document.createElement('div');
            optionsContainer.classList.add('options');
            
            question.options.forEach((option, optIndex) => {
                const optionElement = document.createElement('div');
                optionElement.classList.add('option');
                
                // Mark correct answer
                if (optIndex === question.correct) {
                    optionElement.classList.add('correct');
                }
                // Mark incorrect answer if selected
                else if (answers[index] === optIndex) {
                    optionElement.classList.add('incorrect');
                }
                
                optionElement.textContent = option;
                optionsContainer.appendChild(optionElement);
            });
            
            questionElement.appendChild(optionsContainer);
            
            // Add explanation
            const explanationElement = document.createElement('div');
            explanationElement.classList.add('explanation');
            explanationElement.textContent = question.explanation;
            questionElement.appendChild(explanationElement);
            
            reviewContainer.appendChild(questionElement);
        });
        
        // Add back button
        const backBtn = document.createElement('button');
        backBtn.classList.add('quiz-btn');
        backBtn.textContent = 'العودة للنتائج';
        backBtn.addEventListener('click', () => {
            reviewContainer.remove();
            document.querySelector('.quiz-result').style.display = 'block';
        });
        reviewContainer.appendChild(backBtn);
        
        // Append to quiz container
        quizContainer.appendChild(reviewContainer);
    }
    
    // Reset quiz
    function resetQuiz() {
        // Reset variables
        currentQuestion = 0;
        score = 0;
        answers = [];
        
        // Remove result container
        const resultContainer = document.querySelector('.quiz-result');
        if (resultContainer) {
            resultContainer.remove();
        }
        
        // Remove review container
        const reviewContainer = document.querySelector('.review-container');
        if (reviewContainer) {
            reviewContainer.remove();
        }
        
        // Show quiz questions
        document.querySelector('.quiz-questions').style.display = 'block';
        
        // Render first question
        renderQuestion();
    }
    
    // Initialize quiz
    initQuiz();
});
