let ligas = {};
let preguntas = [];

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
}

function cargarEquipos() {
  const ligaSelect = document.getElementById("liga-select");
  const teamSelect = document.getElementById("team-select");
  teamSelect.innerHTML = "";

  const equipos = ligas[ligaSelect.value] || [];
  equipos.forEach(eq => {
    const opt = document.createElement("option");
    opt.value = eq;
    opt.text = eq;
    teamSelect.add(opt);
  });
}
