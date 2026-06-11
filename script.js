const questions = [
  {
    question: "¿Quién ganó el Mundial de 1986?",
    options: ["Argentina", "Brasil", "Alemania"],
    answer: "Argentina"
  },
  {
    question: "¿Qué jugador tiene más goles en mundiales?",
    options: ["Miroslav Klose", "Pelé", "Messi"],
    answer: "Miroslav Klose"
  },
  {
    question: "¿Cuál es el estadio más grande de Inglaterra?",
    options: ["Wembley", "Old Trafford", "Anfield"],
    answer: "Wembley"
  },
  {
    question: "¿Qué selección ganó el Mundial 2010?",
    options: ["España", "Holanda", "Alemania"],
    answer: "España"
  },
  {
    question: "¿Quién es conocido como 'O Rei'?",
    options: ["Pelé", "Maradona", "Cristiano Ronaldo"],
    answer: "Pelé"
  }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let timerInterval;
let timeLeft = 10;

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";

  // Copia y mezcla preguntas
  currentQuestions = [...questions].sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= currentQuestions.length) {
    // Reinicia con nuevas preguntas mezcladas (infinito)
    currentQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
  }

  const q = currentQuestions[currentQuestionIndex];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "option-card";
    card.innerHTML = `<p>${opt}</p>`;
    card.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(card);
  });

  document.getElementById("result").innerText = "";

  // Inicia cronómetro
  timeLeft = 10;
  document.getElementById("timer").innerText = `⏱ Tiempo: ${timeLeft}s`;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  document.getElementById("timer").innerText = `⏱ Tiempo: ${timeLeft}s`;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    document.getElementById("result").innerText = "⏰ Tiempo agotado!";
    document.getElementById("sound-wrong").play();
    nextQuestion();
  }
}

function checkAnswer(selected) {
  clearInterval(timerInterval);
  const q = currentQuestions[currentQuestionIndex];
  const result = document.getElementById("result");

  if (selected === q.answer) {
    result.innerText = "✅ Correcto!";
    document.getElementById("sound-correct").play();
  } else {
    result.innerText = "❌ Incorrecto. La respuesta era: " + q.answer;
    document.getElementById("sound-wrong").play();
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  setTimeout(showQuestion, 2000);
}
