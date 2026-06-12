let preguntas = [];
let ligas = {};
let ligaSeleccionada, team, opponent;
let scoreTeam = 0, scoreOpponent = 0;
let matchTime = 120;
let timerInterval;
let tabla = [];
let fixture = {};
let fechaActual = 1;

// Cargar preguntas y ligas
Promise.all([
  fetch("preguntas.json").then(res => res.json()),
  fetch("ligas.json").then(res => res.json())
]).then(([pregData, ligaData]) => {
  preguntas = pregData;
  ligas = ligaData;
  cargarLigas();
});

function cargarLigas() {
  const ligaSelect = document.getElementById("liga-select");
  ligaSelect.innerHTML = "";
  Object.keys(ligas).forEach(liga => {
    const opt = document.createElement("option");
    opt.text = liga;
    ligaSelect.add(opt);
  });
  ligaSelect.onchange = cargarEquipos;
  cargarEquipos();
}

function cargarEquipos() {
  ligaSeleccionada = document.getElementById("liga-select").value;
  const equipos = ligas[ligaSeleccionada];
  const teamSelect = document.getElementById("team-select");
  teamSelect.innerHTML = "";
  equipos.forEach(eq => {
    const opt = document.createElement("option");
    opt.text = eq;
    teamSelect.add(opt);
  });
}

function entrarLiga() {
  team = document.getElementById("team-select").value;
  document.getElementById("menu").style.display = "none";
  document.getElementById("liga").style.display = "block";
  document.getElementById("liga-nombre").innerText = "Liga " + ligaSeleccionada;

  tabla = ligas[ligaSeleccionada].map(eq => ({
    equipo: eq, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
  }));

  // Fixture simple: cada equipo juega contra todos una vez
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
    actualizarTabla();
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
