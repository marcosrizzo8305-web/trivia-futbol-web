let preguntas = [];
let ligas = {};
let ligaSeleccionada, team, opponent;
let scoreTeam = 0, scoreOpponent = 0;
let matchTime = 120;
let timerInterval;
let tabla = [];
let fixture = {};
let fechaActual = 1;

// 1. Cargar JSON
Promise.all([
  fetch("ligas.json").then(res => res.json()),
  fetch("preguntas.json").then(res => res.json())
]).then(([ligaData, pregData]) => {
  ligas = ligaData;
  preguntas = pregData;
  inicializarMenu();
}).catch(err => console.error("Error cargando JSON:", err));

// 2. Menú de selección
function inicializarMenu() {
  const ligaSelect = document.getElementById("liga-select");
  ligaSelect.innerHTML = "";
  Object.keys(ligas).forEach(liga => {
    const opt = document.createElement("option");
    opt.value = liga;
    opt.text = liga;
    ligaSelect.add(opt);
  });
  ligaSelect.onchange = cargarEquipos;
  cargarEquipos();

  document.getElementById("btnEntrar").onclick = entrarLiga;
}

function cargarEquipos() {
  ligaSeleccionada = document.getElementById("liga-select").value;
  const equipos = ligas[ligaSeleccionada];
  const teamSelect = document.getElementById("team-select");
  teamSelect.innerHTML = "";
  equipos.forEach(eq => {
    const opt = document.createElement("option");
    opt.value = eq;
    opt.text = eq;
    teamSelect.add(opt);
  });
}

// 3. Pantalla de liga
function entrarLiga() {
  team = document.getElementById("team-select").value;
  document.getElementById("menu").style.display = "none";
  document.getElementById("liga").style.display = "block";
  document.getElementById("liga-nombre").innerText = "Liga " + ligaSeleccionada;

  tabla = ligas[ligaSeleccionada].map(eq => ({
    equipo: eq, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
  }));

  // Fixture simple
  fixture = {};
  let equipos = [...ligas[ligaSeleccionada]];
  let fecha = 1;
  for(let i=0;i<equipos.length;i++) {
    for(let j=i+1;j<equipos.length;j++) {
      if(!fixture["fecha"+fecha]) fixture["fecha"+fecha] = [];
      fixture["fecha"+fecha].push({local:equipos[i],visitante:equipos[j]});
      fecha++;
    }
  }
  mostrarTabla();
  mostrarFixture();
}

function mostrarTabla() {
  const tablaDiv = document.getElementById("tabla-posiciones");
  tablaDiv.innerHTML = "<tr><th>Equipo</th><th>PJ</th><th>PG</th><th>PE</th><th>PP</th><th>GF</th><th>GC</th><th>Pts</th></tr>";
  tabla.forEach(eq=>{
    tablaDiv.innerHTML += `<tr><td>${eq.equipo}</td><td>${eq.pj}</td><td>${eq.pg}</td><td>${eq.pe}</td><td>${eq.pp}</td><td>${eq.gf}</td><td>${eq.gc}</td><td>${eq.pts}</td></tr>`;
  });
}

function mostrarFixture() {
  const fixtureDiv = document.getElementById("fixture");
  fixtureDiv.innerHTML = "";
  Object.keys(fixture).forEach(f=>{
    fixtureDiv.innerHTML += `<h4>${f}</h4>`;
    fixture[f].forEach(p=>{
      fixtureDiv.innerHTML += `<p>${p.local} vs ${p.visitante}</p>`;
    });
  });
}

// 4. Partido
function startMatch() {
  const partidos = fixture["fecha"+fechaActual];
  const miPartido = partidos.find(p=>p.local===team || p.visitante===team);
  opponent = (miPartido.local===team)?miPartido.visitante:miPartido.local;

  document.getElementById("liga").style.display = "none";
  document.getElementById("match").style.display = "block";
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
    fechaActual++;
    document.getElementById("match").style.display = "none";
    document.getElementById("liga").style.display = "block";
    mostrarTabla();
  }
}

function nuevaOcasión() {
  if(matchTime <= 0) return;
  const esTuOcasión = Math.random() < 0.5;
  const q = preguntas[Math.floor(Math.random()*preguntas.length)];
  mostrarPregunta(q, esTuOcasión);
}

function mostrarPregunta(q, esTuOcasión) {
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach(opt=>{
    const btn = document.createElement("div");
    btn.className = "option-card";
    btn.innerHTML = `<p>${opt}</p>`;
    btn.onclick = ()=>checkAnswer(opt,q.answer,esTuOcasión);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected,correct,esTuOcasión) {
  if(matchTime <= 0) return;
  if(selected === correct) {
    if(esTuOcasión) {
      scoreTeam++;
      document.getElementById("result").innerText = "✅ Gol de " + team;
      document.getElementById("sound-correct").play();
    } else {
      scoreOpponent++;
      document.getElementById("result").innerText = "⚽ Gol del rival " + opponent;
      document.getElementById("sound-wrong").play();
    }
  } else {
    if(esTuOcasión) {
      document.getElementById("result").innerText = "❌ Ocasión fallida de " + team;
      document.getElementById("sound-wrong").play();
    } else {
      scoreOpponent++;
      document.getElementById("result").innerText = "⚽ Gol del rival " + opponent;
      document.getElementById("sound-correct").play();
    }
  }
  updateScore();
  setTimeout(nuevaOcasión,2000);
}

function updateScore() {
  document.getElementById("score").innerText = `${team} ${scoreTeam} - ${scoreOpponent} ${opponent}`;
}
