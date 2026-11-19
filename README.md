# Ernesto Investing AI — Sistema Web Integrado (Semana 13)

> **Interacción Hombre-Computador (202W0606) · Escuela de Ingeniería de Software · FISI · UNMSM · 2026-II**  
> Docente: Prof. Mg. Ing. Ernesto D. Cancho-Rodríguez, MBA

---

## 📌 1. Descripción del Sistema

**Ernesto Investing AI** es una plataforma web integrada para análisis bursátil educativo basada en datos sintéticos con patrones realistas (anclados al cierre del 11 de noviembre de 2026). Amplía el prototipo de la Semana 4 con capacidades avanzadas de predicción, optimización multiobjetivo y simulación histórica de carteras.

### Módulos del Sistema (9 en total)
1. **Dashboard:** Visión general del mercado, tarjetas de índices/ETFs (SPY, QQQ, EPU), gráficos de velas interactivas de 120 sesiones (ECharts) y tabla de activos con filtros por grupo.
2. **Watchlist y Alertas:** Seguimiento personalizado de activos con minigráficos de 60 sesiones y alertas configurables de precio y variación.
3. **Trading Simulado:** Ejecución simulada de órdenes a mercado con validación de efectivo y persistencia en navegador (`localStorage`).
4. **Leaderboard:** Clasificación en tiempo real de participantes de la liga calculada desde el rendimiento del portafolio.
5. **Clasificación Binaria:** Mapa de calor de 26 activos × 18 modelos (11 Machine Learning + 7 Deep Learning) con señales binarias estrictas (`SUBE` / `BAJA`), panel de consenso y métricas de rendimiento.
6. **Regresión a 30 Sesiones:** Proyección de series temporales de precios diarios a 30 sesiones futuras con banda de incertidumbre p10–p90, cono de volatilidad y métricas vs. persistencia.
7. **Optimizador de Portafolios:** Visualización de la frontera eficiente de Markowitz (universo total vs. elegibles) y frentes de Pareto multiobjetivo NSGA-II (2 objetivos) y NSGA-III (3 objetivos con CVaR 95%).
8. **Portafolios en 3 Niveles de Riesgo:** Selección de carteras Conservadora, Moderada y Agresiva con distribución de pesos, métricas de riesgo/retorno y justificación de selección por activo.
9. **Backtesting de Portafolios:** Simulación histórica walk-forward de 252 sesiones con curvas de capital (base 100), drawdown, análisis comparativo frente a benchmarks (SPY, QQQ, EPU, 1/N) y bitácora de rebalanceos.

> ⚠️ **Aviso de Integridad y Datos Sintéticos:** Este sistema tiene fines estrictamente académicos. Los precios, probabilidades, frentes evolutivos y predicciones son sintéticos/simulados y no constituyen asesoría financiera ni de inversión real.

---

## 🔗 2. Enlaces del Proyecto

- **Prototipo / Archivo en Figma:** [Enlace Figma en modo lectura / vista](https://tame-wifi-31309741.figma.site)
- **Sistema Desplegado (GitHub Pages):** `https://<usuario>.github.io/<repositorio>/` *(en proceso de despliegue en Fase 5)*
- **Repositorio de Código:** `https://github.com/<usuario>/<repositorio>`

---

## 👥 3. Integrantes del Equipo

| N° | Apellidos y Nombres | Alias / Usuario GitHub | Rol Principal |
|:--:|:--------------------|:-----------------------|:--------------|
| 1  | Cordova Guerra, Josue Rodrigo | @josuerodrigo | Líder Técnico & Integración |
| 2  | [Integrante 2] | @[usuario-github] | Diseño Figma & Módulos |
| 3  | [Integrante 3] | @[usuario-github] | Módulos IA & Accesibilidad IHC |
| 4  | [Integrante 4] | @[usuario-github] | Módulos Financieros & Backtesting |
| 5  | [Integrante 5] | @[usuario-github] | Documentación, Auditoría e Informe |

---

## 💻 4. Cómo Ejecutar el Proyecto Localmente

El sistema está construido en **HTML5 + CSS3 + JavaScript estándar (ES6+) sin compilación ni dependencias pesadas**. Dado que utiliza la API `fetch()` para leer los archivos JSON de datos locales, los navegadores bloquean la carga si se abre con doble clic directo debido a restricciones CORS.

### Requisitos Previos
- Python 3.x instalado en el sistema (o cualquier servidor HTTP local).

### Pasos de Ejecución
```bash
# 1. Clonar el repositorio del equipo
git clone https://github.com/<usuario>/<repositorio>.git
cd <repositorio>

# 2. Iniciar el servidor HTTP local
python -m http.server 8000

# 3. Abrir en el navegador
# http://127.0.0.1:8000
```

---

## 📁 5. Estructura del Repositorio

```text
ernesto-investing-ai-base-s13/
├── index.html            # Dashboard general
├── watchlist.html        # Seguimiento y alertas
├── trading.html          # Simulador de órdenes y compras
├── leaderboard.html      # Clasificación de liga
├── clasificacion.html    # Módulo de clasificación binaria (SUBE / BAJA)
├── regresion.html        # Módulo de regresión a 30 sesiones
├── optimizador.html      # Módulo de optimización Markowitz y NSGA-II/III
├── portafolios.html      # Módulo de carteras en 3 niveles de riesgo
├── backtesting.html      # Módulo de evaluación histórica walk-forward
├── css/
│   └── styles.css        # Hoja de estilos unificada con tokens claro/oscuro
├── js/
│   ├── common.js         # Utilidades comunes, navegación, storage y shell
│   └── stub.js           # Funciones auxiliares de carga inicial
├── data/                 # 13 archivos JSON con los datos sintéticos oficiales
│   ├── 01_universo_tickers.json
│   ├── 02_precios_sinteticos_504d.json
│   ├── 03_ohlcv_sintetico_120d.json
│   ├── 04_matriz_correlacion_covarianza.json
│   ├── 05_clasificadores_binarios.json
│   ├── 06_regresores_precio_30d.json
│   ├── 07_optimizador_markowitz_nsga.json
│   ├── 08_portafolios_3_niveles_riesgo.json
│   ├── 09_backtesting_portafolios.json
│   ├── 10_dashboard_mercado.json
│   ├── 11_watchlist_alertas_portafolio_demo.json
│   ├── 12_leaderboard_liga.json
│   └── 13_patrones_y_parametros.json
├── figma-src/            # Código exportado de Figma Make (sin editar)
├── docs/                 # Documentación y especificaciones de la sesión
├── .gitignore            # Exclusión de temporales, dependencias y credenciales
└── README.md             # Esta documentación
```
