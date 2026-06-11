// Preguntas de trivia
const questions = [
  {
    question: "¿Quién ganó el Mundial de 1986?",
    options: ["Brasil", "Argentina", "Alemania"],
    answer: "Argentina"
  },
  {
    question: "¿Qué jugador tiene más goles en mundiales?",
    options: ["Miroslav Klose", "Pelé", "Messi"],
    answer: "Miroslav Klose"
  },
  {
    question: "¿Cuál es el estadio más grande de Inglaterra?",
    options: ["Old Trafford", "Wembley", "Anfield"],
    answer: "Wembley"
  }
];

let currentQuestion = 0;

// Inicia el juego
function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  currentQuestion = 0;
  showQuestion();
}

// Muestra la pregunta actual
function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "premium-btn";
    btn.onclick = () => checkAnswer(opt);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("result").innerText = "";
}

// Verifica la respuesta
function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const result = document.getElementById("result");

  if (selected === q.answer) {
    result.innerText = "✅ Correcto!";
  } else {
    result.innerText = "❌ Incorrecto. La respuesta era: " + q.answer;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 1500);
  } else {
    setTimeout(() => {
      document.getElementById("game").innerHTML = "<h2>Juego terminado 🎉</h2>";
    }, 1500);
  }
}
