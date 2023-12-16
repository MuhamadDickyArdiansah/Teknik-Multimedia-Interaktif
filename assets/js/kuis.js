const quizData = [
  {
    question: "Jika input A adalah 0, apa hasil operasi NOT A?",
    options: ["1", "0"],
    correctAnswer: "1",
    image: "assets/images/1.png"
  },
  {
    question: "Diberikan fungsi logika F = A AND B OR C, apa hasilnya jika A = 1, B = 0, dan C = 0?",
    options: ["1", "0"],
    correctAnswer: "0",
    image: "assets/images/2.png"
  },
  {
    question: "Berapakah 2 pangkat 3?",
    options: ["6", "8", "10", "16"],
    correctAnswer: "8",
    image: "assets/images/3.png"
  }
];

let timerTimeout;
let currentQuestionIndex = 0;
let timerInterval;
let timerWidth = 100;
const timerDuration = 15000; // 5000 milliseconds for 100% width

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const titleElement = document.querySelector(".title span");
const timerElement = document.getElementById("timer");

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.innerHTML = `<img src="${currentQuestion.image}" alt="Gambar Pertanyaan" class="question-image"><p>${currentQuestion.question}</p>`;

  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(optionElement);
  });

  titleElement.textContent = `Kuis No ${currentQuestionIndex + 1}`;

  // Set the timer for each question (5 seconds)
  timerElement.style.width = "100%";
  timerWidth = 100;
  const startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    timerWidth = Math.max(0, 100 - (elapsedTime / timerDuration) * 100);
    timerElement.style.width = timerWidth + "%";

    if (timerWidth <= 0) {
      // Time is up, move to the next question
      clearInterval(timerInterval);
      showPopup(false);
    }
  }, 100);

  timerTimeout = setTimeout(() => {
    clearInterval(timerInterval);
    showPopup(false);
  }, timerDuration);
}

let correctCount = 0;
let incorrectCount = 0;

function showPopup(isCorrect) {
  if (isCorrect) {
    correctCount++;
  } else {
    incorrectCount++;
  }

  Swal.fire({
    title: isCorrect ? 'Jawaban Anda Benar!' : 'Jawaban Anda Salah',
    text: isCorrect ? '' : `Jawaban yang benar adalah: ${quizData[currentQuestionIndex].correctAnswer}`,
    icon: isCorrect ? 'success' : 'error',
    confirmButtonText: 'Ok'
  }).then(() => {
    if (currentQuestionIndex < quizData.length - 1) {
      nextQuestion();
    } else {
      goToIndex();
    }
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  showPopup(isCorrect);
}

function nextQuestion() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showPopup(true);
    resetQuiz();
  }
}

// function previousQuestion() {
//   clearInterval(timerInterval);
//   clearTimeout(timerTimeout);
//   if (currentQuestionIndex > 0) {
//     currentQuestionIndex--;
//     showQuestion();
//   }
// }

function resetQuiz() {
  currentQuestionIndex = 0;
  timerWidth = 100;
  showQuestion();
}

function updateResults() {
  document.getElementById('correctCount').textContent = correctCount;
  document.getElementById('incorrectCount').textContent = incorrectCount;
}

function goToIndex() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  window.location.href = `results.html?correctCount=${correctCount}&incorrectCount=${incorrectCount}`;

}

function goToHome() {
  window.location.href = 'index.html';
}


document.addEventListener('DOMContentLoaded', function () {
  resetQuiz();
});
