let preguntas = [];
let ligas = {};
let ligaSeleccionada, team, opponent;
let scoreTeam = 0, scoreOpponent = 0;
let matchTime = 60;
let timerInterval;
let tabla = [];
let fixture = {};
let fechaActual = 1;

Promise.all([
  fetch("ligas.json").then(res => res.json()),
  fetch("preguntas.json").then(res => res.json())
]).then(([ligaData, pregData]) => {
  ligas = ligaData;
  preguntas = pregData;
  inicializarMenu();
}).catch(err => console.error("Error cargando JSON:", err));

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
  document.getElementById("btnEntrar").addEventListener("click", entrarLiga);
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

function entrarLiga() {
  team = document.getElementById("team-select").value;
  if (!team) { alert("Selecciona un equipo"); return; }

  document.getElementById("menu").style.display = "none";
  document.getElementById("liga").style.display = "block";
  document.getElementById("liga-nombre").innerText = "Liga " + ligaSeleccionada;

  tabla = ligas[ligaSeleccionada].map(eq => ({
    equipo: eq, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
  }));

  // Fixture round robin
  fixture = {};
  let equipos = [...ligas[ligaSeleccionada]];
  if (equipos.length % 2 !== 0) equipos.push("DESCANSO");
  let numFechas = equipos.length - 1;
  let mitad = equipos.length / 2;

  for (let f = 1; f <= numFechas; f++) {
    fixture["fecha" + f] = [];
    for (let i = 0; i < mitad; i++) {
      let local = equipos[i];
      let visitante = equipos[equipos.length - 1 - i];
      if (local !== "DESCANSO" && visitante !== "DESCANSO") {
        fixture["fecha" + f].push({ local, visitante });
      }
    }
    equipos.splice(1, 0, equipos.pop());
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
    fixtureDiv.innerHTML += `<h4>${f.toUpperCase()}</h4>`;
    fixture[f].forEach(p=>{
      fixtureDiv.innerHTML += `<p>${p.local} vs ${p.visitante}</p>`;
    });
  });
}

function startMatch() {
  const partidos = fixture["fecha"+fechaActual];
  if (!partidos) { alert("No hay más fechas"); return; }
  const miPartido = partidos.find(p=>p.local===team || p.visitante===team);
  if (!miPartido) { alert("Tu equipo descansa en esta fecha"); return; }

  opponent = (miPartido.local===team)?miPartido.visitante:miPartido.local;
  document.getElementById("liga").style.display = "none";
  document.getElementById("match").style.display = "block";
  document.getElementById("match-info").innerText = `${team} vs ${opponent}`;
  scoreTeam = 0; scoreOpponent = 0;
  matchTime = 30;
  updateScore();
  timerInterval = setInterval(updateTimer,1000);
  nuevaOcasión();
}

function updateTimer() {
  matchTime--;
  document.getElementById("timer").innerText = `⏱ Tiempo: ${matchTime}s`;
  if(matchTime <= 0) {
    clearInterval(timerInterval);
    document.getElementById("result").innerText = `🏁 Fin del partido. Resultado: ${team} ${scoreTeam} - ${scoreOpponent} ${opponent}`;
    document.getElementById("options").innerHTML = "";
    actualizarTabla(scoreTeam, scoreOpponent);
    simularOtrosPartidos();
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
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = ()=>checkAnswer(opt,q.answer,esTuOcasión);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected,correct,esTuOcasión) {
  if(matchTime <= 0) return;
  if(selected === correct) {
    if(esTuOcasión) scoreTeam++; else scoreOpponent++;
  } else {
    if(!esTu
