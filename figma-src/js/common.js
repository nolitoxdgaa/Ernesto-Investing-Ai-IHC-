/* Ernesto Investing AI - base S13 (adaptada del sistema del Equipo A, Semana 4). Material educativo; datos SINTETICOS. */
const PAGES=[
 ["index.html","Dashboard","dashboard"],["watchlist.html","Watchlist y alertas","watchlist"],["trading.html","Trading simulado","trading"],["leaderboard.html","Leaderboard","leaderboard"],
 ["clasificacion.html","Clasificación","clasificacion",1],["regresion.html","Regresión 30 días","regresion",1],["optimizador.html","Optimizador","optimizador",1],["portafolios.html","Portafolios","portafolios",1],["backtesting.html","Backtesting","backtesting",1]];
const $=(s,r=document)=>r.querySelector(s);
const fmt={n:(x,d=2)=>Number(x).toLocaleString("es-PE",{minimumFractionDigits:d,maximumFractionDigits:d}),
  pct:(x,d=2)=>(x>=0?"+":"")+Number(x).toLocaleString("es-PE",{minimumFractionDigits:d,maximumFractionDigits:d})+" %",
  usd:x=>"US$ "+Number(x).toLocaleString("es-PE",{minimumFractionDigits:2,maximumFractionDigits:2}),
  cls:x=>x>0?"up":(x<0?"dn":"mut")};
const cache={};
async function loadJSON(name){ if(cache[name]) return cache[name];
  const r=await fetch("data/"+name); if(!r.ok) throw new Error("No se pudo leer data/"+name+" ("+r.status+")"); return cache[name]=await r.json(); }
function store(k,v){ try{ if(v===undefined){const s=localStorage.getItem(k);return s?JSON.parse(s):null} localStorage.setItem(k,JSON.stringify(v)) }catch(e){ return null } }
function applyTheme(t){ if(t) document.documentElement.setAttribute("data-theme",t); }
function buildShell(){
  applyTheme(store("eia_theme"));
  const page=document.body.dataset.page;
  const nav=PAGES.map(p=>`<li><a href="${p[0]}" ${p[2]===page?'aria-current="page"':''} class="${p[3]?'nuevo':''}">${p[1]}</a></li>`).join("");
  document.body.insertAdjacentHTML("afterbegin",`<a class="skip" href="#contenido">Saltar al contenido</a>
  <header class="top"><div class="bar"><a class="brand" href="index.html">Ernesto <span>Investing AI</span></a>
  <nav aria-label="Módulos del sistema"><ul>${nav}</ul></nav><span class="sp"></span>
  <button id="tema" type="button" aria-pressed="false" title="Cambiar tema claro/oscuro">Tema</button></div></header>`);
  $("#tema").addEventListener("click",()=>{const cur=document.documentElement.getAttribute("data-theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");const n=cur==="dark"?"light":"dark";applyTheme(n);store("eia_theme",n);$("#tema").setAttribute("aria-pressed",n==="dark");if(window.onTheme)window.onTheme(n)});
  const m=$("main"); if(m){m.id="contenido";m.insertAdjacentHTML("beforeend",`<p class="aviso" style="margin-top:2rem">Material educativo con datos <strong>sintéticos</strong> (patrones realistas, precios anclados al cierre del 11-nov-2026). No son precios reales ni asesoría de inversión. Los pronósticos, clasificaciones, NSGA-II/III y backtesting de este prototipo están <strong>simulados</strong>.</p>`)}
}
function showError(e){ const m=$("main"); m.insertAdjacentHTML("afterbegin",`<p class="err" role="alert">${e.message}. Abra el sitio desde un servidor (GitHub Pages o <code>python -m http.server</code>), no con doble clic.</p>`)}
document.addEventListener("DOMContentLoaded",()=>{buildShell(); if(window.init) Promise.resolve(window.init()).catch(showError)});
