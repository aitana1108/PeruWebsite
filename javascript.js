document.addEventListener("DOMContentLoaded", function() {
    const images = [
        'url("images/Peruhome1.jpeg")',  
        'url("images/Peruhome2.jpeg")',
        'url("images/Peruhome3.jpeg")',
        'url("images/peruhome4.avif")',
        'url("images/Peruhome5.jpeg")',
        'url("images/peruhome666.avif")',
        'url("images/peruhome7.avif")'
    ];

    let currentIndex = 0;

    function shuffleBackgroundImages() {
        currentIndex = Math.floor(Math.random() * images.length);
        const imageShuffleDiv = document.getElementById('imageShuffle');
        imageShuffleDiv.style.backgroundImage = images[currentIndex];
        imageShuffleDiv.style.backgroundSize = 'cover';
        imageShuffleDiv.style.backgroundPosition = 'center';
    }

    setInterval(shuffleBackgroundImages, 5000); // Change image every 5 seconds
    shuffleBackgroundImages(); // Initial shuffle when the page loads
});

document.addEventListener("DOMContentLoaded", function() {
    const asideImages = [
        {src: "images/blogper1.avif", url: "https://link1.com"},
        {src: "images/blogperu2.avif", url: "https://link2.com"},
        {src: "images/blogperu3.avif", url: "https://link3.com"},
        {src: "images/blogperu4.jpeg", url: "https://link4.com"},
        {src: "images/blogperu5.avif", url: "https://link5.com"},
        {src: "images/blogperu6.avif", url: "https://link6.com"}
    ];

    let asideIndex = 0; // Index to track the current image set

    // Function to shuffle images in the array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to display images in the carousel
    function displayImages() {
        const carousel = document.getElementById('imageCarousel');
        carousel.innerHTML = ''; // Clear existing images
        // Loop changed to display only 3 images at a time
        for (let i = 0; i < 3; i++) {
            const imgIndex = (asideIndex + i) % asideImages.length;
            const imgWrapper = document.createElement('a');
            imgWrapper.href = asideImages[imgIndex].url;
            imgWrapper.target = "_blank"; // Open in new tab
            const img = document.createElement('img');
            img.src = asideImages[imgIndex].src;
            img.alt = "Carousel Image " + (imgIndex + 1);
            imgWrapper.appendChild(img);
            carousel.appendChild(imgWrapper);
        }
    }

    // Function to move to the previous set of images
    function previousImage() {
        asideIndex = (asideIndex - 3 + asideImages.length) % asideImages.length;
        displayImages();
    }

    // Function to move to the next set of images
    function nextImage() {
        asideIndex = (asideIndex + 3) % asideImages.length;
        displayImages();
    }

    // Initialize the carousel
    shuffleArray(asideImages); // Shuffle images initially
    displayImages(); // Display the shuffled images

    // Optional: Setup button event listeners in JavaScript instead of using inline event attributes
    document.querySelector('.carousel-controls button:nth-child(1)').addEventListener('click', previousImage);
    document.querySelector('.carousel-controls button:nth-child(2)').addEventListener('click', nextImage);
});

//tourism in out 
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.news-item');
    let currentIndex = 0;

    function showItems(startIndex) {
        // Hide all items
        items.forEach(item => item.style.display = 'none');

        // Calculate the index for the next three items to show
        for (let i = startIndex; i < startIndex + 3; i++) {
            if (i < items.length) {
                items[i].style.display = 'block'; // Show the current item
            }
        }
    }

    document.querySelector('.previous').addEventListener('click', function() {
        currentIndex -= 3;
        if (currentIndex < 0) currentIndex = 0; // Reset index to 0 if it goes negative
        showItems(currentIndex);
    });

    document.querySelector('.next').addEventListener('click', function() {
        currentIndex += 3;
        if (currentIndex >= items.length) currentIndex = items.length - 3; // Adjust if index exceeds the number of items
        showItems(currentIndex);
    });

    // Initially show the first three items
    showItems(0);
});

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.tourism-main img');

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        images.forEach(image => {
            const rect = image.getBoundingClientRect();
            if (rect.top < windowHeight && rect.bottom > 0) {
                image.classList.add('visible');
            } else {
                image.classList.remove('visible');
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check visibility on scroll
    document.addEventListener('scroll', checkVisibility);

    // Check visibility on resize
    window.addEventListener('resize', checkVisibility);
});

//quiz
document.addEventListener('DOMContentLoaded', (event) => {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const quizReady = document.getElementById('quizReady');
    const yesButton = document.getElementById('yesBtn');
    const noButton = document.getElementById('noBtn');
    const quizQuestion = document.getElementById('quizQuestion');
    const nextQuestionButton = document.getElementById('nextQuestion');
    const prevQuestionButton = document.getElementById('prevQuestion');
    const myForm = document.getElementById('myForm');
    let userName = '';
    let score = 0;
    let currentQuestionIndex = 0;
    let questionsOrder = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]); // Array for holding the shuffled order of questions
    questionsOrder = questionsOrder.slice(0, 5); // Reduced the shuffled array to only 5 questions

    myForm.addEventListener("submit", (e) => e.preventDefault());

    document.querySelector("#myBtn").addEventListener("click", processForm);

    function processForm() {
        userName = document.querySelector("#myForm input[name='username']").value;
        if (userName.trim()) {
            welcomeMessage.textContent = `Hello ${userName}!`;
            myForm.style.display = 'none';
            quizReady.style.display = 'block';
        } else {
            alert("Please enter your name to start the quiz.");
        }
    }

    yesButton.addEventListener('click', function() {
        welcomeMessage.style.display = 'none';
        quizReady.style.display = 'none';
        quizQuestion.style.display = 'block';
        displayCurrentQuestion();
    });

    noButton.addEventListener('click', function() {
        welcomeMessage.textContent = "OK, goodbye!";
        quizReady.style.display = 'none';
    });

    nextQuestionButton.addEventListener('click', function() {
        evaluateCurrentQuestion();
        currentQuestionIndex++;
        if (currentQuestionIndex < questionsOrder.length) {
            displayCurrentQuestion();
        } else {
            displayResults();
        }
    });

    prevQuestionButton.addEventListener('click', function() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayCurrentQuestion();
        }
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swaps the elements
        }
        return array;
    }

    function displayCurrentQuestion() {
        // Hide's all questions at the first
        for (let i = 1; i <= 9; i++) {  // Maintains the scope to hide all potential questions
            document.getElementById(`quizQuestion${i}`).style.display = 'none';
        }

        // Determining the current question number and the corresponding div based on the shuffled order
        let questionId = questionsOrder[currentQuestionIndex];
        let questionDiv = document.getElementById(`quizQuestion${questionId}`);
        questionDiv.style.display = 'block';

        // Updating the question title's with the dynamic question number's from the array
        let questionNumber = currentQuestionIndex + 1; // 1-based index for display
        let currentTitle = questionTitles[questionId - 1]; // Changes index for title retrieval
        let questionTitleElement = questionDiv.querySelector('.question-title');
        questionTitleElement.textContent = `Question ${questionNumber}: ${currentTitle}`;

        // Shows or hide's the Previous button based on the current question index
        prevQuestionButton.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
    }

    function evaluateCurrentQuestion() {
        let questionId = questionsOrder[currentQuestionIndex];
        // Logic for evaluating the current question's answer
        if (questionId === 1) {
            let selectedAnswer = document.querySelector('input[name="htmlQuestion"]:checked').value;
            if (selectedAnswer === "HyperText Markup Language") {
                score++;
            }
        } else if (questionId === 2) {
            let selectedAnswer = document.getElementById('secondQuestion').value;
            if (selectedAnswer === "AJAX") {
                score++;
            }
        } else if (questionId === 3) {
            let selectedAnswers = document.querySelectorAll('input[name="htmlElements"]:checked');
            let correctAnswers = ['div', 'span', 'body', 'style']; 
            let correctCount = 0;
            selectedAnswers.forEach((answer) => {
                if (correctAnswers.includes(answer.value)) {
                    correctCount++;
                }
            });
            if (correctCount === correctAnswers.length) {
                score++;
            }
        } else if (questionId === 4) {
            let answer = document.getElementById('dom').value.trim().toLowerCase();
            if (answer === "dom") {
                score++;
            }
        } else if (questionId === 5) {
            let selectedAnswer = document.querySelector('input[name="cssSpecificity"]:checked');
            if (selectedAnswer !== null) {
                if (selectedAnswer.value === "The hierarchy of selectors") {
                    score++;
                }
            }
        
        } else if (questionId === 6) {
            let selectedAnswer = document.getElementById('fileType').value;
            if (selectedAnswer === ".html") {
                score++;
            }
        } else if (questionId === 7) {
            let selectedAnswer = document.querySelector('input[name="progLang"]:checked').value;
            if (selectedAnswer === "HTML") {
                score++;
            }
        } else if (questionId === 8) {
            let selectedAnswers = document.querySelectorAll('input[name="webTechs"]:checked');
            let correctAnswers = ['HTML', 'CSS', 'JavaScript'];  
            let correctCount = 0;
            selectedAnswers.forEach((answer) => {
                if (correctAnswers.includes(answer.value)) {
                    correctCount++;
                }
            });
            if (correctCount === correctAnswers.length) {
                score++;
            }
        } else if (questionId === 9) {
            let answer = document.getElementById('cssFullName').value.trim().toLowerCase();
            if (answer === "cascading style sheets") {
                score++;
            }
        }
    }

    function displayResults() {
        const totalQuestions = 5;  // Updated total number of questions to 5
        const scorePercentage = (score / totalQuestions) * 100;
        let feedbackMessage;

        if (scorePercentage >= 80) {
            feedbackMessage = "Excellent work!";
        } else if (scorePercentage >= 50) {
            feedbackMessage = "Not bad, but there's room for improvement.";
        } else {
            feedbackMessage = "Keep practicing, and you'll get better!";
        }

        welcomeMessage.style.display = 'block';
        welcomeMessage.textContent = `${userName}, your score is ${scorePercentage}%. ${feedbackMessage}`;
        quizQuestion.style.display = 'none';
    }

    // Array of titles for each question
    const questionTitles = [
        "Choose an option",                         // Question 1
        "Select the right answer",                  // Question 2
        "Tick the correct answer",                  // Question 3
        "Write the answer",                         // Question 4
        "Choose an option",                         // Question 5
        "Select the right answer",                  // Question 6
        "Choose an option",                         // Question 7
        "Tick the correct answer",                  // Question 8
        "Write the answer"                          // Question 9
    ];
});

// Initializes the quiz functionality
function initializeQuiz() {
    const startButton = document.getElementById('startButton');
    const quizContainer = document.getElementById('quizContainer');
    const introduction = document.getElementById('introduction');
    const result = document.getElementById('result');
    let userName = '';
    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        // questions array
    ];

    // Function to shuffle questions
    function shuffleQuestions(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Additional logic for handling quiz start, quiz questions, and scoring can be added here
}

// Calling initializeQuiz to set up the quiz
initializeQuiz();

// Form submission feedback message
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const feedbackMessage = document.getElementById('feedbackMessage');
        feedbackMessage.textContent = "Feedback has been sent. Thank you!";
        feedbackMessage.style.display = 'block';
        form.reset();
    });
});


//quiz


document.getElementById('myBtn').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('quizReady').style.display = 'block';
});

document.getElementById('yesBtn').addEventListener('click', function() {
    document.getElementById('quizReady').style.display = 'none';
    document.getElementById('quizQuestion').style.display = 'block';
    document.getElementById('quizQuestion1').style.display = 'block';
});

document.getElementById('noBtn').addEventListener('click', function() {
    document.getElementById('quizReady').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
});

let currentQuestion = 1;
const totalQuestions = 5;

document.getElementById('nextQuestion').addEventListener('click', function() {
    if (currentQuestion < totalQuestions) {
        document.getElementById(`quizQuestion${currentQuestion}`).style.display = 'none';
        currentQuestion++;
        document.getElementById(`quizQuestion${currentQuestion}`).style.display = 'block';
        document.getElementById('prevQuestion').style.display = 'inline-block';
    }
    if (currentQuestion === totalQuestions) {
        document.getElementById('nextQuestion').style.display = 'none';
        calculateResults();
    }
});

document.getElementById('prevQuestion').addEventListener('click', function() {
    if (currentQuestion > 1) {
        document.getElementById(`quizQuestion${currentQuestion}`).style.display = 'none';
        currentQuestion--;
        document.getElementById(`quizQuestion${currentQuestion}`).style.display = 'block';
        document.getElementById('nextQuestion').style.display = 'inline-block';
    }
    if (currentQuestion === 1) {
        document.getElementById('prevQuestion').style.display = 'none';
    }
});

function calculateResults() {
    let score = 0;
    const userName = document.getElementById('username').value;
    const correctAnswers = {
        q1: 'july 28 1821',
        q2: 'ceviche',
        q3: ['Ecuador', 'Colombia', 'Chile'],
        q4: '2018',
        q5: 'Soles'
    };

    if (document.querySelector('input[name="q1"]:checked')?.value === correctAnswers.q1) score++;
    if (document.getElementById('secondQuestion').value === correctAnswers.q2) score++;
    const q3Answers = Array.from(document.querySelectorAll('input[name="q3"]:checked')).map(el => el.value);
    if (arraysEqual(q3Answers, correctAnswers.q3)) score++;
    if (document.getElementById('dom').value.trim() === correctAnswers.q4) score++;
    if (document.querySelector('input[name="q5"]:checked')?.value === correctAnswers.q5) score++;

    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResult').style.display = 'block';

    let resultMessage = `Hello ${userName}, you scored ${score} out of ${totalQuestions}. `;
    resultMessage += score > 3 ? "Congratulations, you did great!" : "Better luck next time!";
    document.getElementById('resultMessage').innerText = resultMessage;
}

function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
}
function visitSelectedTouristSite() {
    var url = document.getElementById('touristSitesDropdown').value;
    window.open(url, '_blank'); // This will open the selected site in a new tab
}

//history js

document.addEventListener('DOMContentLoaded', function() {
    let slideIndex = 0;
    showSlides();

    function showSlides() {
        let i;
        let slides = document.getElementsByClassName("slide");
        if (slides.length === 0) {
            console.error("No slides found!");
            return;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex - 1].style.display = "block";  
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }
});

    document.addEventListener('DOMContentLoaded', function() {
        const images = document.querySelectorAll('.image-container img'); // Select all images within the container
        let currentIndex = 0; // Start with the first image displayed

        function showImage(index) {
            images.forEach((img, i) => {
                img.style.display = i === index ? 'block' : 'none'; // Display only the current image
            });
        }

        document.querySelector('.prev').addEventListener('click', () => {
            currentIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1; // Go to the previous image or loop back to the last
            showImage(currentIndex);
        });

        document.querySelector('.next').addEventListener('click', () => {
            currentIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1; // Go to the next image or loop back to the first
            showImage(currentIndex);
        });
    });
