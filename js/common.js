/* Ernesto Investing AI - Base & Integración S13 (IHC 2026-II)
   Unificación de navegación, tema claro/oscuro, estado compartido y bonificación de Internacionalización (i18n). */

const I18N = {
  "es-PE": {
    skip: "Saltar al contenido",
    pages: {
      dashboard: "Dashboard",
      watchlist: "Watchlist y alertas",
      trading: "Trading simulado",
      leaderboard: "Leaderboard",
      clasificacion: "Clasificación",
      regresion: "Regresión 30 días",
      optimizador: "Optimizador",
      portafolios: "Portafolios",
      backtesting: "Backtesting"
    },
    theme: "Tema",
    disclaimer: "Material educativo con datos <strong>sintéticos</strong> (patrones realistas, precios anclados al cierre del 11-nov-2026). No son precios reales ni asesoría de inversión. Los pronósticos, clasificaciones, NSGA-II/III y backtesting están <strong>simulados</strong>."
  },
  "en-US": {
    skip: "Skip to main content",
    pages: {
      dashboard: "Dashboard",
      watchlist: "Watchlist & Alerts",
      trading: "Paper Trading",
      leaderboard: "Leaderboard",
      clasificacion: "Classification",
      regresion: "30-Day Regression",
      optimizador: "Optimizer",
      portafolios: "Portfolios",
      backtesting: "Backtesting"
    },
    theme: "Theme",
    disclaimer: "Educational material with <strong>synthetic data</strong> (realistic patterns, prices anchored to Nov 11, 2026 close). Not real prices nor investment advice. Forecasts, classifications, NSGA-II/III and backtesting are <strong>simulated</strong>."
  }
};

const PAGES = [
  ["index.html", "dashboard"],
  ["watchlist.html", "watchlist"],
  ["trading.html", "trading"],
  ["leaderboard.html", "leaderboard"],
  ["clasificacion.html", "clasificacion", 1],
  ["regresion.html", "regresion", 1],
  ["optimizador.html", "optimizador", 1],
  ["portafolios.html", "portafolios", 1],
  ["backtesting.html", "backtesting", 1]
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function getLocale() {
  return store("eia_locale") || "es-PE";
}

function setLocale(loc) {
  store("eia_locale", loc);
  document.documentElement.lang = loc.startsWith("en") ? "en" : "es";
  // Reconstruir cabecera para actualizar idioma de menú
  const header = $("header.top");
  if (header) header.remove();
  const skip = $(".skip");
  if (skip) skip.remove();
  const notice = $("p.aviso-footer");
  if (notice) notice.remove();
  buildShell();
  if (window.onLocaleChange) window.onLocaleChange(loc);
}

const fmt = {
  n: (x, d = 2) => {
    const loc = getLocale();
    return Number(x).toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d });
  },
  pct: (x, d = 2) => {
    const loc = getLocale();
    const sign = x >= 0 ? "+" : "";
    return sign + Number(x).toLocaleString(loc, { minimumFractionDigits: d, maximumFractionDigits: d }) + " %";
  },
  usd: x => {
    const loc = getLocale();
    return new Intl.NumberFormat(loc, { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(x);
  },
  date: str => {
    const loc = getLocale();
    try {
      const dt = new Date(str);
      return new Intl.DateTimeFormat(loc, { dateStyle: "medium" }).format(dt);
    } catch(e) {
      return str;
    }
  },
  cls: x => x > 0 ? "up" : (x < 0 ? "dn" : "mut")
};

const cache = {};
async function loadJSON(name) {
  if (cache[name]) return cache[name];
  const r = await fetch("data/" + name);
  if (!r.ok) throw new Error("No se pudo leer data/" + name + " (" + r.status + ")");
  return cache[name] = await r.json();
}

function store(k, v) {
  try {
    if (v === undefined) {
      const s = localStorage.getItem(k);
      return s ? JSON.parse(s) : null;
    }
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {
    return null;
  }
}

function applyTheme(t) {
  if (t) document.documentElement.setAttribute("data-theme", t);
}

function buildShell() {
  applyTheme(store("eia_theme"));
  const loc = getLocale();
  document.documentElement.lang = loc.startsWith("en") ? "en" : "es";
  const dict = I18N[loc] || I18N["es-PE"];
  const page = document.body.dataset.page;

  const nav = PAGES.map(p => {
    const label = dict.pages[p[1]] || p[1];
    const isCurrent = (p[1] === page);
    const isNew = p[2];
    return `<li><a href="${p[0]}" ${isCurrent ? 'aria-current="page"' : ''} class="${isNew ? 'nuevo' : ''}">${label}</a></li>`;
  }).join("");

  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#contenido">${dict.skip}</a>
    <header class="top">
      <div class="bar">
        <a class="brand" href="index.html">Ernesto <span>Investing AI</span></a>
        <nav aria-label="Módulos del sistema">
          <ul>${nav}</ul>
        </nav>
        <span class="sp"></span>
        <div style="display:inline-flex;align-items:center;gap:.4rem">
          <label for="lang-sel" style="display:none">Idioma</label>
          <select id="lang-sel" aria-label="Seleccionar idioma / Select language" style="width:auto;padding:.3rem .5rem;font-size:.85rem;cursor:pointer">
            <option value="es-PE" ${loc === "es-PE" ? "selected" : ""}>🇵🇪 ES-PE</option>
            <option value="en-US" ${loc === "en-US" ? "selected" : ""}>🇺🇸 EN-US</option>
          </select>
          <button id="tema" type="button" aria-pressed="false" title="Cambiar tema claro/oscuro">
            ${dict.theme}
          </button>
        </div>
      </div>
    </header>
  `);

  $("#tema").addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    applyTheme(next);
    store("eia_theme", next);
    $("#tema").setAttribute("aria-pressed", next === "dark");
    if (window.onTheme) window.onTheme(next);
  });

  $("#lang-sel").addEventListener("change", e => {
    setLocale(e.target.value);
  });

  const m = $("main");
  if (m) {
    m.id = "contenido";
    m.insertAdjacentHTML("beforeend", `
      <p class="aviso aviso-footer" style="margin-top:2.5rem">${dict.disclaimer}</p>
    `);
  }
}

function showError(e) {
  const m = $("main");
  if (m) {
    m.insertAdjacentHTML("afterbegin", `
      <p class="err" role="alert">
        ${e.message}. Abra el sitio desde un servidor HTTP local (ej. <code>python -m http.server 8000</code> o GitHub Pages), no mediante doble clic directo.
      </p>
    `);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  buildShell();
  if (window.init) Promise.resolve(window.init()).catch(showError);
});
