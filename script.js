let preguntas = [];
let ligas = {}; // cargado desde tu ligas.json
let ligaSeleccionada = "Argentina";
let equipos = [];
let team, opponent;
let scoreTeam = 0, scoreOpponent = 0;
let matchTime = 120;
let timerInterval;

fetch("preguntas.json")
  .then(res => res.json())
  .then(data => preguntas = data);

function startMatch() {
  equipos = ligas[ligaSeleccionada];
  team = equipos[0]; // elegido por jugador
  opponent = equipos[Math.floor(Math.random()*equipos.length)];
  while(opponent === team) opponent = equipos[Math.floor(Math.random()*equipos.length)];

  document.getElementById("match-info").innerText = `${team} vs ${opponent}`;
  scoreTeam = 0; scoreOpponent = 0;
  matchTime = 120;
  updateScore();
  timerInterval = setInterval(updateTimer,1000);
  nuevaOcasión();
}

function updateTimer() {
  matchTime--;
  document.getElementById("timer").innerText = `⏱ Tiempo: ${matchTime}s`;
  if(matchTime === 60) document.getElementById("result").innerText = "⚽ Fin del primer tiempo";
  if(matchTime <= 0) {
    clearInterval(timerInterval);
    document.getElementById("result").innerText = `🏁 Fin del partido. Resultado: ${team} ${scoreTeam} - ${scoreOpponent} ${opponent}`;
    document.getElementById("options").innerHTML = "";
  }
}

function nuevaOcasión() {
  if(matchTime <= 0) return;
  const q = preguntas[Math.floor(Math.random()*preguntas.length)];
  mostrarPregunta(q);
}

function mostrarPregunta(q) {
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(opt=>{
    const btn = document.createElement("div");
    btn.className = "option-card";
    btn.innerHTML = `<p>${opt}</p>`;
    btn.onclick = ()=>checkAnswer(opt,q.answer);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected,correct) {
  if(selected === correct) {
    scoreTeam++;
    document.getElementById("result").innerText = "✅ Gol de " + team;
    document.getElementById("sound-correct").play();
  } else {
    scoreOpponent++;
    document.getElementById("result").innerText = "❌ Ocasión fallida, gol de " + opponent;
    document.getElementById("sound-wrong").play();
  }
  updateScore();
  setTimeout(nuevaOcasión,2000);
}

function updateScore() {
  document.getElementById("score").innerText = `${team} ${scoreTeam} - ${scoreOpponent} ${opponent}`;
}
