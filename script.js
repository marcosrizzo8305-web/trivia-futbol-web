const questions = [
  {
    question: "¿Quién ganó el Mundial de 1986?",
    options: [
      { name: "Argentina", image: "maradona.jpg" },
      { name: "Brasil", image: "pele.jpg" },
      { name: "Alemania", image: "klose.jpg" }
    ],
    answer: "Argentina"
  },
  {
    question: "¿Qué jugador tiene más goles en mundiales?",
    options: [
      { name: "Miroslav Klose", image: "klose.jpg" },
      { name: "Pelé", image: "pele.jpg" },
      { name: "Messi", image: "messi.jpg" }
    ],
    answer: "Miroslav Klose"
  },
  {
    question: "¿Cuál es el estadio más grande de Inglaterra?",
    options: [
      { name: "Wembley", image: "wembley.jpg" },
      { name: "Old Trafford", image: "oldtrafford.jpg" },
      { name: "Anfield", image: "anfield.jpg" }
    ],
    answer: "Wembley"
  }
];

let currentQuestion = 0;

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game").style.display = "block";
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "option-card";
    card.innerHTML = `<img src="${opt.image}" alt="${opt.name}"><p>${opt.name}</p>`;
    card.onclick = () => checkAnswer(opt.name);
    optionsDiv.appendChild(card);
  });

  document.getElementById("result").innerText = "";
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  const result = document.getElementById("result");

  if (selected === q.answer) {
    result.innerText = "✅ Correcto!";
    document.getElementById("sound-correct").play();
  } else {
    result.innerText = "❌ Incorrecto. La respuesta era: " + q.answer;
    document.getElementById("sound-wrong").play();
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 2000);
  } else {
    setTimeout(() => {
      document.getElementById("game").innerHTML = "<h2>Juego terminado 🎉</h2>";
    }, 2000);
  }
}
