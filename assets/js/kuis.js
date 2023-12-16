const quizData = [
  {
    question: "Persamaan yang tepat untuk representasi dari gambar di samping adalah ?",
    options: ["A AND B", "A OR B"],
    correctAnswer: "A AND B",
    image: "assets/images/1.png"
  },
  {
    question: "Menurut anda, termasuk operator apa rangkaian di samping ?",
    options: ["Operasi AND", "Operasi OR", "NOT"],
    correctAnswer: "Operasi OR",
    image: "assets/images/2.png"
  },
  {
    question: "Persamaan yang tepat untuk gambar di samping adalah ?",
    options: ["A AND B OR C", "A OR C AND B", "B OR C AND A", "Semua benar"],
    correctAnswer: "A AND B OR C",
    image: "assets/images/3.png"
  },
  {
    question: "lengkapi apa operator yang untuk bagian kosong berikut A OR B ... C?",
    options: ["NOT", "OR", "AND"],
    correctAnswer: "AND",
    image: "assets/images/4.png"
  },
  {
    question: "Apakah rangkaian di samping merupakan operasi OR ?",
    options: ["Benar", "Salah"],
    correctAnswer: "Benar",
    image: "assets/images/5.png"
  }
];

let timerTimeout;
let currentQuestionIndex = 0;
let timerInterval;
let timerWidth = 100;
const timerDuration = 10000; // Durasi timer untuk setiap soal (misal 10 detik)

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

  resetAndStartTimer();
}

function resetAndStartTimer() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  timerElement.style.width = "100%";
  timerWidth = 100;
  const startTime = Date.now();
  timerInterval = setInterval(() => updateTimer(startTime), 100);

  timerTimeout = setTimeout(() => {
    clearInterval(timerInterval);
    showPopup(false); // Menunjukkan bahwa waktu telah habis
  }, timerDuration);
}

function updateTimer(startTime) {
  const elapsedTime = Date.now() - startTime;
  timerWidth = Math.max(0, 100 - (elapsedTime / timerDuration) * 100);
  timerElement.style.width = `${timerWidth}%`;

  if (timerWidth <= 0) {
    clearInterval(timerInterval);
    clearTimeout(timerTimeout);
    showPopup(false); // Menunjukkan bahwa waktu telah habis
  }
}

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
      currentQuestionIndex++;
      showQuestion();
    } else {
      goToIndex();
    }
  });
}

function checkAnswer(selectedOption) {
  const currentQuestion = quizData[currentQuestionIndex];
  const isCorrect = selectedOption === currentQuestion.correctAnswer;
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  showPopup(isCorrect);
}

function nextQuestion() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  showQuestion();
}

function goToIndex() {
  clearInterval(timerInterval);
  clearTimeout(timerTimeout);
  window.location.href = `results.html?correctCount=${correctCount}&incorrectCount=${incorrectCount}`;
}

document.addEventListener('DOMContentLoaded', function () {
  resetQuiz();
});