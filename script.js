let preguntas = [];
let ligas = {};
let ligaSeleccionada, team, opponent;
let scoreTeam = 0, scoreOpponent = 0;
let matchTime = 120;
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
