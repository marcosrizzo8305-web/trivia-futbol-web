const questions = [
  { question: "¿Quién ganó el Mundial de 1986?", options: ["Argentina","Brasil","Alemania"], answer: "Argentina" },
  { question: "¿Qué jugador tiene más goles en mundiales?", options: ["Miroslav Klose","Pelé","Messi"], answer: "Miroslav Klose" },
  { question: "¿Cuál es el estadio más grande de Inglaterra?", options: ["Wembley","Old Trafford","Anfield"], answer: "Wembley" },
  { question: "¿Qué selección ganó el Mundial 2010?", options: ["España","Holanda","Alemania"], answer: "España" },
  { question: "¿Quién es conocido como 'O Rei'?", options: ["Pelé","Maradona","Cristiano Ronaldo"], answer: "Pelé" }
];

let team, opponent;
let scoreTeam = 0, scoreOpponent = 0;
let matchTime = 120; // 2 minutos en segundos
let timerInterval;

function startMatch() {
  team = document.getElementById("team-select").value;
  const rivals = ["River Plate","Boca Juniors","Barcelona","Real Madrid","Manchester United","Liverpool"];
  opponent = rivals[Math.floor(Math.random()*rivals.length)];
  while(opponent === team) opponent = rivals[Math.floor(Math.random()*rivals.length)];

  document.getElementById("menu").style.display = "none";
  document.getElementById("match").style.display = "block";
  document.getElementById("match-info").innerText = `${team} vs ${opponent}`;
  scoreTeam = 0; scoreOpponent = 0;
  matchTime = 120;
  updateScore();
  showQuestion();
  timerInterval = setInterval(updateTimer,1000);
}

function updateTimer() {
  matchTime--;
  document.getElementById("timer").innerText = `⏱ Tiempo: ${matchTime}s`;
  if(matchTime === 60) {
    document.getElementById("result").innerText = "⚽ Fin del primer tiempo";
  }
  if(matchTime <= 0) {
    clearInterval(timerInterval);
    document.getElementById("result").innerText = `🏁 Fin del partido. Resultado: ${team} ${scoreTeam} - ${scoreOpponent} ${opponent}`;
    document.getElementById("options").innerHTML = "";
  }
}

function showQuestion() {
  if(matchTime <= 0) return;
  const q = questions[Math.floor(Math.random()*questions.length)];
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
  if(matchTime <= 0) return;
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
  setTimeout(showQuestion,2000);
}

function updateScore() {
  document.getElementById("score").innerText = `${team} ${scoreTeam} - ${scoreOpponent} ${opponent}`;
}
