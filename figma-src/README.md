# Ernesto Investing AI — sistema base (Semana 13, IHC 2026-II)

**ES** · Versión base y adaptada del sistema web que el Equipo A construyó en la Semana 4 (Dashboard, Watchlist y alertas, Trading simulado y Leaderboard, con tema claro/oscuro y vista móvil). Está reescrita en HTML + CSS + JavaScript puro, sin compilación, y lee **datos sintéticos** de la carpeta `data/`. Es el punto de partida del Trabajo Grupal de la Semana 13: *Sistema web integrado Ernesto Investing AI con clasificación, regresión, IA de portafolios en 3 niveles de riesgo y backtesting*.

**EN** · Baseline, adapted version of the web system built by Team A in Week 4 (Dashboard, Watchlist and alerts, simulated Trading, Leaderboard, light/dark theme and mobile view), rewritten as plain HTML + CSS + JavaScript with no build step. It reads **synthetic data** from `data/`. It is the starting point for the Week 13 group assignment.

Material educativo de Ernesto D. Cancho-Rodríguez (FISI-UNMSM). Los precios son sintéticos, anclados al cierre del 11-nov-2026; no son asesoría de inversión.

## Qué incluye

| Página | Estado |
|---|---|
| `index.html` Dashboard (velas, universo de 26 activos) | funcionando |
| `watchlist.html` Watchlist y alertas | funcionando |
| `trading.html` Trading simulado (guarda en el navegador) | funcionando |
| `leaderboard.html` Leaderboard | funcionando |
| `clasificacion.html`, `regresion.html`, `optimizador.html`, `portafolios.html`, `backtesting.html` ★ | **por construir por cada equipo**; muestran una vista previa de sus JSON de entrada |

## Datos (`data/`)

26 activos: las 7 Magníficas (AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA), 5 mineras con operaciones en Perú (BVN, FSM, SCCO, BHP, B), 11 ETF sectoriales (XLK, XLF, XLE, XLV, XLY, XLP, XLI, XLU, XLB, XLRE, XLC) y los ETF SPY, QQQ y EPU (Perú).

| Archivo | Contenido |
|---|---|
| `01_universo_tickers.json` | Universo, grupos, precio ancla, volatilidad y beta |
| `02_precios_sinteticos_504d.json` / `03_ohlcv_sintetico_120d.json` | Historia sintética de 504 sesiones y velas de 120 |
| `04_matriz_correlacion_covarianza.json` | Correlaciones, covarianzas y retornos esperados simulados |
| `05_clasificadores_binarios.json` | 18 clasificadores (11 ML + 7 DL), SUBE/BAJA a 30 sesiones, solo dos clases |
| `06_regresores_precio_30d.json` | 18 regresores (11 ML + 7 DL), 30 precios futuros por activo |
| `07_optimizador_markowitz_nsga.json` | Frontera de Markowitz y frentes NSGA-II y NSGA-III (simulados) |
| `08_portafolios_3_niveles_riesgo.json` | Portafolios Conservador, Moderado y Agresivo |
| `09_backtesting_portafolios.json` | Backtesting walk-forward de 252 sesiones frente a SPY, QQQ, EPU y 1/N |
| `10`–`12` | Dashboard, watchlist/alertas/portafolio demo y leaderboard |
| `13_patrones_y_parametros.json` | Patrones realistas aplicados, parámetros y qué es real y qué es sintético |

Los modelos **no se entrenaron**: sus salidas y los frentes NSGA-II/III están simulados con patrones razonables.

## Cómo ejecutarlo

Los navegadores bloquean `fetch()` en archivos abiertos con doble clic. Use un servidor local:

```bash
git clone https://github.com/mbaernestocr-tech/ernesto-investing-ai-base-s13.git
cd ernesto-investing-ai-base-s13
python -m http.server 8000      # abrir http://127.0.0.1:8000
```

## Publicar su versión en GitHub Pages

1. Cree un repositorio **propio de su equipo** (no haga fork de este) y suba su código.
2. En *Settings → Pages* elija *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. Espere unos minutos y abra `https://<usuario>.github.io/<repositorio>/`.

## Licencia

© 2026 Ernesto D. Cancho-Rodríguez. Código, datos sintéticos y textos bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/); texto legal en [`LICENSE`](LICENSE). Parte del código se elaboró con asistencia de IA generativa (Claude, de Anthropic); el autor revisó el contenido y responde por él.
