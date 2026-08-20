// ===== Datos de GO Fútbol (streaming) =====
const DATA = {
  canales: [
    { id: "canal-libertadores", nombre: "Libertadores HD",logo: "https://placehold.co/120x80/004d26/00ff90?text=Libertadores", cat: "futbol", vivo: true, desc: "Copa Libertadores en vivo", anno: 2026, rating: 4.8 },
    { id: "canal-premier", nombre: "Premier League", logo: "https://placehold.co/120x80/1e3a8a/ffffff?text=Premier", cat: "futbol", vivo: true, desc: "La mejor liga del mundo", anno: 2026, rating: 4.9 },
    { id: "canal-la-liga", nombre: "La Liga", logo: "https://placehold.co/120x80/7c3aed/ffffff?text=LaLiga", cat: "futbol", vivo: true, desc: "Real Madrid, Barcelona y más", anno: 2026, rating: 4.7 },
    { id: "canal-sudamerica", nombre: "Sudamericana", logo: "https://placehold.co/120x80/be123c/ffffff?text=Sudamerica", cat: "futbol", vivo: true, desc: "Conmebol Sudamericana", anno: 2026, rating: 4.6 },
    { id: "canal-messi", nombre: "Messi 360", logo: "https://placehold.co/120x80/000000/00ff90?text=Messi", cat: "futbol", vivo: false, desc: "Documental sobre Lionel Messi", anno: 2025, rating: 4.9 },
    { id: "canal-maradona", nombre: "Maradona: El Dios", logo: "https://placehold.co/120x80/000000/00ff90?text=Maradona", cat: "documentales", vivo: false, desc: "La historia del 10 argentino", anno: 2024, rating: 5.0 },
    { id: "canal-mundial", nombre: "Mundial 2026", logo: "https://placehold.co/120x80/dc2626/ffffff?text=Mundial", cat: "futbol", vivo: true, desc: "Cobertura completa del Mundial", anno: 2026, rating: 5.0 },
    { id: "canal-deportes", nombre: "Deportes HD", logo: "https://placehold.co/120x80/0f766e/ffffff?text=Deportes", cat: "deportes", vivo: true, desc: "Resúmenes y análisis", anno: 2026, rating: 4.5 },
    { id: "canal-accion", nombre: "Acción Deportes", logo: "https://placehold.co/120x80/2563eb/ffffff?text=Acción", cat: "deportes", vivo: true, desc: "Lo mejor del fútbol argentino", anno: 2026, rating: 4.4 },
    { id: "canal-series1", nombre: "La Liga: El Sueño", logo: "https://placehold.co/120x80/4c1d95/ffffff?text=Series", cat: "series", vivo: false, desc: "Serie documental de La Liga", anno: 2025, rating: 4.3 },
    { id: "canal-series2", nombre: "Los Campeones", logo: "https://placehold.co/120x80/9f1239/ffffff?text=Campeones", cat: "series", vivo: false, desc: "Crónicas de los grandes clubes", anno: 2024, rating: 4.6 },
    { id: "canal-peli1", nombre: "Messi: El Partido de la Vida", logo: "https://placehold.co/120x80/000000/00ff90?text=Pelicula", cat: "peliculas", vivo: false, desc: "Película biográfica", anno: 2023, rating: 4.2 },
    { id: "canal-doc1", nombre: "Los Clásicos del Fútbol", logo: "https://placehold.co/120x80/1e293b/00ff90?text=Doc", cat: "documentales", vivo: false, desc: "Los mejores partidos de la historia", anno: 2022, rating: 4.8 },
  ],
  destacados: [
    { id: "canal-libertadores", nombre: "River vs Boca — Semifinal", cat: "futbol", vivo: true, desc: "El clásico más importante de Sudamérica", anno: 2026, rating: 4.9 },
    { id: "canal-mundial", nombre: "Mundial 2026 — Apertura", cat: "futbol", vivo: true, desc: "Argentina campeona defiende el título", anno: 2026, rating: 5.0 },
    { id: "canal-maradona", nombre: "Maradona: El Dios", cat: "documentales", vivo: false, desc: "La historia del 10 argentino", anno: 2024, rating: 5.0 },
    { id: "canal-messi", nombre: "Messi 360", cat: "futbol", vivo: false, desc: "Documental sobre Lionel Messi", anno: 2025, rating: 4.9 },
  ],
};

// ===== Assets locales =====
const HERO_IMAGES = {
  futbol: "messi.jpg",
  documentales: "maradona.jpg",
  series: "messi.jpg",
  deportes: "grass-texture.jpg",
};