// ===== Estado de la aplicación =====
let state = { activeCat: "todo", logged: false };

// ===== Inicialización =====
document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderSlider("sliderDestacados", DATA.destacados);
  renderGrid("gridEnVivo", DATA.canales.filter((c) => c.vivo));
  renderGrid("gridFutbol", DATA.canales.filter((c) => c.cat === "futbol"));
  renderGrid("gridSeries", DATA.canales.filter((c) => c.cat === "series" || c.cat === "documentales"));
  setupNav();
  setupSearch();
  updateHero();
});

// ===== Render helpers =====
function cardHtml(c) {
  const img = HERO_IMAGES[c.cat] || "grass-texture.jpg";
  return `
    <div class="card" onclick="openPlayer('${c.id}')">
      <div class="card-thumb">
        <img src="${c.logo}" alt="${c.nombre}" onerror="this.style.display='none'">
        <span class="live-badge ${c.vivo ? "on" : "off"}">${c.vivo ? "EN VIVO" : "HD"}</span>
      </div>
      <div class="card-body">
        <h4>${c.nombre}</h4>
        <p>${c.desc}</p>
        <div class="card-meta"><span>⭐ ${c.rating}</span><span>${c.anno}</span></div>
      </div>
    </div>`;
}

function renderGrid(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(cardHtml).join("");
}

function renderSlider(id, items) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = items.map(cardHtml).join("");
}

// ===== Hero =====
function renderHero() {
  const hero = DATA.destacados[0];
  document.getElementById("heroTitle").textContent = hero.nombre;
  document.getElementById("heroDesc").textContent = hero.desc;
  document.getElementById("heroBg").style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('messi.jpg') center/cover no-repeat`;
}

function updateHero() {
  // Actualiza hero según categoría activa
  const map = {
    futbol: { t: "Copa Libertadores — Semifinal", d: "River Plate vs Boca Juniors en el Monumental. Transmisión en HD con commentary en español." },
    deportes: { t: "Deportes en vivo", d: "Lo mejor del fútbol argentino y mundial, en tiempo real." },
    series: { t: "Series y documentales", d: "Las mejores historias del fútbol: de Maradona a Messi." },
    documentales: { t: "Documentales", d: "Crónicas, clásicos y biografías de las leyendas del fútbol." },
    todo: { t: "Copa Libertadores — Semifinal", d: "River Plate vs Boca Juniors en el Monumental. Transmisión en HD con commentary en español." },
  };
  const m = map[state.activeCat] || map.todo;
  document.getElementById("heroTitle").textContent = m.t;
  document.getElementById("heroDesc").textContent = m.d;
}

// ===== Navegación =====
function setupNav() {
  document.querySelectorAll(".nav-item").forEach((n) => {
    n.addEventListener("click", () => {
      document.querySelectorAll(".nav-item").forEach((x) => x.classList.remove("active"));
      n.classList.add("active");
      state.activeCat = n.dataset.cat;
      updateHero();
      const section = document.getElementById("destacados");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setupSearch() {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  const doSearch = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    const matches = DATA.canales.filter(
      (c) => c.nombre.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
    if (matches.length) {
      openPlayer(matches[0].id);
    } else {
      alert("No encontramos '" + q + "'. Prueba con: River, Boca, Messi, Mundial, Premier…");
    }
  };
  btn.addEventListener("click", doSearch);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") doSearch(); });
}

// ===== Player =====
function openPlayer(id) {
  const c = DATA.canales.find((x) => x.id === id);
  if (!c) return;
  const overlay = document.getElementById("playerOverlay");
  const video = document.getElementById("playerVideo");
  const placeholder = document.getElementById("playerPlaceholder");
  document.getElementById("playerTitle").textContent = c.nombre;
  document.getElementById("playerDesc").textContent = c.desc + " · " + (c.vivo ? "EN VIVO" : "Bajo demanda");
  placeholder.innerHTML = `
    <div class="ph-content">
      <div class="ph-logo">◎</div>
      <h3>${c.nombre}</h3>
      <p>${c.vivo ? "Transmisión en vivo" : "Reproducción bajo demanda"}</p>
      <p style="font-size:12px;opacity:.6">Reproduce el video local o ingresa una URL de streaming</p>
    </div>`;
  video.src = "";
  overlay.classList.add("active");
}

function closePlayer() {
  document.getElementById("playerOverlay").classList.remove("active");
  const v = document.getElementById("playerVideo");
  v.pause();
}

// ===== Login =====
function openLogin() {
  document.getElementById("loginOverlay").classList.add("active");
}
function closeLogin() {
  document.getElementById("loginOverlay").classList.remove("active");
}
function doLogin() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  if (email && pass) {
    state.logged = true;
    closeLogin();
    alert("Bienvenido. Acceso completo a GO Fútbol activado.");
  } else {
    alert("Completa email y contraseña.");
  }
}
document.getElementById("profileBtn").addEventListener("click", () => {
  if (state.logged) { state.logged = false; alert("Has cerrado la sessión."); }
  else openLogin();
});

// ===== Sonidos =====
function playSound(correct) {
  const a = document.getElementById(correct ? "sound-correct" : "sound-wrong");
  a.currentTime = 0;
  a.play().catch(() => {});
}