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

  // 🔑 Enlazamos el botón correctamente
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

// 3. Pantalla de liga
function entrarLiga() {
  team = document.getElementById("team-select").value;
  if (!team) {
    alert("Primero selecciona un equipo");
    return;
  }

  // Cambiar pantallas
  document.getElementById("menu").style.display = "none";
  document.getElementById("liga").style.display = "block";
  document.getElementById("liga-nombre").innerText = "Liga " + ligaSeleccionada;

  // Inicializar tabla
  tabla = ligas[ligaSeleccionada].map(eq => ({
    equipo: eq, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, pts: 0
  }));

  // Generar fixture
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
