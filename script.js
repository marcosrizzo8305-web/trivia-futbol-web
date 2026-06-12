function startMatch() {
  const partidos = fixture["fecha"+fechaActual];

  if (!partidos || partidos.length === 0) {
    alert("No hay partidos programados en la fecha " + fechaActual);
    return;
  }

  const miPartido = partidos.find(p => p.local === team || p.visitante === team);

  if (!miPartido) {
    alert("Tu equipo no tiene partido en esta fecha");
    return;
  }

  opponent = (miPartido.local === team) ? miPartido.visitante : miPartido.local;

  document.getElementById("liga").style.display = "none";
  document.getElementById("match").style.display = "block";
  document.getElementById("match-info").innerText = `${team} vs ${opponent}`;
  scoreTeam = 0; scoreOpponent = 0;
  matchTime = 120;
  updateScore();
  timerInterval = setInterval(updateTimer, 1000);
  nuevaOcasión();
}
