let preguntas = [];
let ligas = {};

// Cargar JSON y recién después inicializar menús
Promise.all([
  fetch("preguntas.json").then(res => res.json()),
  fetch("ligas.json").then(res => res.json())
]).then(([pregData, ligaData]) => {
  preguntas = pregData;
  ligas = ligaData;
  inicializarMenu();
}).catch(err => {
  console.error("Error cargando JSON:", err);
});

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
  const ligaSelect = document.getElementById("liga-select");
  const teamSelect = document.getElementById("team-select");
  teamSelect.innerHTML = "";

  ligaSeleccionada = ligaSelect.value;
  const equipos = ligas[ligaSeleccionada] || [];
  equipos.forEach(eq => {
    const opt = document.createElement("option");
    opt.value = eq;
    opt.text = eq;
    teamSelect.add(opt);
  });
}

function entrarLiga() {
  const teamSelect = document.getElementById("team-select");
  team = teamSelect.value;
  alert("Entraste a la liga " + ligaSeleccionada + " con el equipo " + team);
}
