# UNIVERSIDAD NACIONAL MAYOR DE SAN MARCOS
### Universidad del Perú, Decana de América
### Facultad de Ingeniería de Sistemas e Informática
### Escuela Profesional de Ingeniería de Software

---

# INFORME TÉCNICO DE TRABAJO GRUPAL — SEMANA 13
## Sistema Web Integrado Ernesto Investing AI con Clasificación Binaria, Regresión a 30 Sesiones, IA de Portafolios Multiobjetivo y Backtesting Walk-Forward

* **Asignatura:** Interacción Hombre-Computador (202W0606) — Unidad IV — Sesión 13
* **Docente:** Prof. Mg. Ing. Ernesto D. Cancho-Rodríguez, MBA — The George Washington University (EE.UU.)
* **Semestre Académico:** 2026-II
* **Fecha de Entrega:** Noviembre de 2026

---

### Integrantes del Equipo

| N° | Apellidos y Nombres | Código de Estudiante | Alias / Usuario GitHub | Rol Principal |
|:--:|:--------------------|:--------------------:|:-----------------------|:--------------|
| 1 | Cordova Guerra, Josue Rodrigo | 20200000 | `@nolitoxdgaa` / `@josuerodrigo` | Líder Técnico & Integración Front-end |
| 2 | [Integrante 2] | — | `@[usuario-2]` | Diseño Figma Make & Módulos Predictivos |
| 3 | [Integrante 3] | — | `@[usuario-3]` | Evaluación IHC, Pautas de IA & Accesibilidad |
| 4 | [Integrante 4] | — | `@[usuario-4]` | Modelos Financieros, Optimización & Backtesting |
| 5 | [Integrante 5] | — | `@[usuario-5]` | Auditoría de Veracidad, QA & Redacción |

---

## Enlaces Oficiales de Entrega

* **Repositorio Público en GitHub:** [https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-](https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-)
* **Sistema Desplegado en GitHub Pages:** [https://nolitoxdgaa.github.io/Ernesto-Investing-Ai-IHC-/](https://nolitoxdgaa.github.io/Ernesto-Investing-Ai-IHC-/)
* **Prototipo / Archivo de Diseño en Figma:** [https://tame-wifi-31309741.figma.site](https://tame-wifi-31309741.figma.site)
* **Registro de Prompts Literales:** [`PROMPTS_USADOS.md`](https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-/blob/main/PROMPTS_USADOS.md)
* **Informe Formal de Auditoría:** [`AUDITORIA_CALIDAD_VERACIDAD.md`](https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-/blob/main/AUDITORIA_CALIDAD_VERACIDAD.md)

---

## 1. Introducción y Objetivos del Proyecto

El presente proyecto consolida la ampliación y transformación del prototipo bursátil desarrollado en la Semana 4 hacia un **sistema web financiero totalmente integrado, accesible y de alta coherencia interactiva**, denominado **Ernesto Investing AI**. 

El sistema incorpora 5 nuevos módulos analíticos de predicción y toma de decisiones basados en inteligencia artificial:
1. **Clasificación binaria de tendencia** (18 modelos: 11 ML y 7 DL).
2. **Regresión temporal de precios a 30 sesiones** con cono de volatilidad y bandas de incertidumbre p10–p90.
3. **Optimizador de portafolios multiobjetivo** (curvas de Markowitz, frentes de Pareto NSGA-II y NSGA-III).
4. **Portafolios en 3 niveles de riesgo** (Conservador, Moderado y Agresivo) con justificación explicable de selección.
5. **Backtesting walk-forward de 252 sesiones** con curvas de capital base 100, drawdowns y métricas de desempeño frente a benchmarks.

### Objetivos Específicos de Interacción Hombre-Computador (IHC):
- Comunicar **incertidumbre estadística y pronósticos probabilísticos** sin inducir a una falsa sensación de certeza (Pautas Human-AI Interaction de Amershi et al.: G1, G2, G10, G11, G17).
- Implementar **accesibilidad universal según el estándar WCAG 2.2 Nivel AA**, garantizando ratios de contraste cromático superiores a 4.5:1, principio de doble canal (no depender únicamente del color), alternativas en texto para gráficos y navegación completa asistida por teclado.
- Obtener la **bonificación de Internacionalización (i18n)** mediante formateo dinámico y no concatenado en `ES-PE` y `EN-US` haciendo uso de la API nativa `Intl`.
- Respetar rigurosamente la **integridad de los datos sintéticos**, reportando con honestidad los resultados del backtesting sin incurrir en sobreajustes artificiales.

---

## 2. Arquitectura del Sistema Web y Estado Compartido

El sistema fue concebido siguiendo una arquitectura modular en **HTML5, CSS3 y JavaScript moderno puro (ES6+) sin compilación ni frameworks externos**, lo que garantiza máxima legibilidad, velocidad de carga instantánea y facilidad de mantenimiento. La única dependencia externa permitida y utilizada es la biblioteca de visualización de alto rendimiento **Apache ECharts 5.5.1** vía CDN.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SHELL Y NAVEGACIÓN COMÚN                        │
│   Logo EIA · 9 Módulos · Selector Idioma (ES/EN) · Botón Tema (L/D)    │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌──────────────────────┐                           ┌─────────────────────┐
│   MÓDULOS BASE S4    │                           │  MÓDULOS NUEVOS S13 │
│ • Dashboard          │                           │ • Clasificación     │
│ • Watchlist          │                           │ • Regresión 30d     │
│ • Trading Simulado   │                           │ • Optimizador       │
│ • Leaderboard        │                           │ • Portafolios       │
│                      │                           │ • Backtesting       │
└──────────┬───────────┘                           └──────────┬──────────┘
           │                                                  │
           └─────────────────────────┬────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   ESTADO COMPARTIDO (localStorage)                     │
│  • eia_locale: idioma activo (es-PE / en-US)                           │
│  • eia_theme: tema activo (light / dark)                               │
│  • eia_watch: tickers vigilados en Watchlist                           │
│  • eia_port: posiciones y efectivo transferidos al Trading             │
│  • eia_selected_portfolio: nivel de riesgo seleccionado                │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     DATOS SINTÉTICOS COMUNES (/data)                   │
│   13 archivos JSON oficiales · 26 tickers · Anclaje: 11-nov-2026       │
└────────────────────────────────────────────────────────────────────────┘
```

### Gestión de Estado Transversal:
- **Watchlist sincronizada:** Al añadir o remover activos en `watchlist.html`, la lista se preserva en `eia_watch`.
- **Transferencia directa Portafolios ➔ Trading:** Al pulsar *«Llevar a Trading simulado»* en `portafolios.html`, el sistema toma las ponderaciones del nivel seleccionado, calcula las cantidades de acciones a comprar con un capital base de US$ 100,000 según los precios de cierre y genera un objeto `{ efectivo, posiciones: [ { ticker, cantidad, costo } ] }` que se almacena en `eia_port`.
- **Impacto automático en Leaderboard:** `leaderboard.html` consume de inmediato el valor liquidativo del portafolio (`nav = efectivo + ∑ cantidad * precio_actual`) y ubica al usuario en el ranking frente a los competidores simulados.

---

## 3. Decisiones de Diseño IHC y Módulos del Sistema

### 3.1. Módulo de Clasificación Binaria de Tendencia (`clasificacion.html`)
* **Problema de diseño:** ¿Cómo presentar simultáneamente las predicciones de 18 algoritmos distintos sobre 26 activos bursátiles sin abrumar cognitivamente al usuario?
* **Solución de interfaz:** 
  - **Mapa de calor interactivo (468 celdas):** Cada celda codifica la probabilidad mediante fondo de color degradado y **etiquetado textual explícito**: `▲ SUBE` o `▼ BAJA` acompañado de su valor numérico $P(\text{SUBE})$. Se respeta la restricción estricta de **dos únicas clases** (prohibición de "NEUTRO" o "MANTENER").
  - **Panel de Consenso (Pauta G11):** Al hacer clic o navegar con teclado sobre una fila, un panel lateral dinámico muestra la votación desagregada (ej. 14 de 18 votos), el desglose por familia (ML vs. DL) y la confianza cualitativa.
  - **Filtros jerárquicos (Pauta G17):** Selectores para segmentar por grupo de mercado (Magníficas 7, Mineras en Perú, ETFs sectoriales, globales) y familia de modelos (ML, DL, Todos).
  - **Honestidad del modelo (Pautas G1 y G2):** Cuadro explicativo permanente que contextualiza que una exactitud del 52% al 58% en finanzas es realista y apenas superior a una moneda al azar, previniendo el exceso de confianza del operador.

### 3.2. Módulo de Regresión a 30 Sesiones (`regresion.html`)
* **Problema de diseño:** Mostrar proyecciones futuras de precios a menudo engaña al usuario transmitiendo certidumbre determinista sobre el futuro.
* **Solución de interfaz:**
  - **Incertidumbre visible (Pauta G1):** Se proyectan las 30 sesiones futuras combinando una línea tenue para cada uno de los 18 regresores, una línea gruesa discontinua para la **mediana del ensamble** y un área sombreada obligatoria activa por defecto que cubre la **banda de percentiles p10–p90**.
  - **Cono de volatilidad conmutable:** Checkbox accesible para proyectar las bandas analíticas basadas en la volatilidad histórica del activo.
  - **Etiqueta de retorno a 30 días:** Insignia de gran visibilidad con triple codificación: signo, valor porcentual y flecha direccional (`▲ +2.93 %`).
  - **Control del usuario (Pauta G10 y G17):** Casillas individuales para prender o apagar regresores específicos y evaluar el impacto en la mediana.
  - **Tabla alternativa accesible:** Sección colapsable que lista cronológicamente los 30 precios proyectados con sus bandas para lectores de pantalla.

### 3.3. Módulo Optimizador: Markowitz, NSGA-II y NSGA-III (`optimizador.html`)
* **Problema de diseño:** Comunicar la relación multidimensional entre retorno esperado, volatilidad y riesgo de cola extrema (CVaR).
* **Solución de interfaz:**
  - **Gráfico de dispersión superpuesto:** Muestra en un mismo lienzo la frontera eficiente clásica continua de Markowitz (para el universo completo de 26 activos y para los 12 elegibles) y los frentes discretos de **NSGA-II** (círculos) y **NSGA-III** (rombos).
  - **Mapeo cromático de 3 dimensiones:** En NSGA-III, el color de cada punto se gradúa de forma continua según el **CVaR al 95 % diario** mediante una barra `visualMap` interactiva.
  - **Panel de composición interactivo:** Al seleccionar un punto (por clic o con `Enter` en el selector de portafolios), se despliegan las ponderaciones de cada activo en barras horizontales, verificando que la suma sea $\approx 100\%$ y que ningún activo exceda el tope regulatorio del 25%.
  - **Criterio de elegibilidad transparente:** Cuadro pedagógico que aclara por qué un activo entra a la optimización (consenso SUBE y retorno proyectado positivo) y por qué los frentes evolutivos quedan situados ligeramente por debajo de la curva teórica de Markowitz.
  - **Aviso permanente:** Cartel visible indicando que NSGA-II y NSGA-III fueron simulados con fines educativos.

### 3.4. Módulo de Portafolios en 3 Niveles de Riesgo (`portafolios.html`)
* **Problema de diseño:** Facilitar la toma de decisiones financieras a usuarios con distintos perfiles de aversión al riesgo.
* **Solución de interfaz:**
  - **Tarjetas comparables lado a lado:** Tres columnas balanceadas para **Conservador** (mínima volatilidad), **Moderado** (máximo ratio de Sharpe, destacado con insignia de recomendación) y **Agresivo** (máximo retorno proyectado).
  - **Gráficos de dona en ECharts:** Visualización intuitiva del peso relativo de cada activo con paleta de colores de alto contraste.
  - **Explicabilidad IA (Pauta G11):** Acordeón colapsable con el campo `razon` literal del archivo JSON, detallando el porqué de la inclusión de cada activo.
  - **Acción directa:** Botón *«Llevar a Trading simulado»* que realiza el traspaso de capital a la operativa del usuario.
  - **Diseño responsive móvil a 390 px:** Las 3 tarjetas se apilan verticalmente con total fluidez, manteniendo las donas y botones a ancho completo sin recorte de contenido.

### 3.5. Módulo de Backtesting Walk-Forward (`backtesting.html`)
* **Problema de diseño:** ¿Cómo presentar resultados cuantitativos históricos donde las carteras de IA no lograron batir al mercado sin recurrir a la tentación de maquillar los datos?
* **Solución de interfaz:**
  - **Curvas de capital base 100:** Evolución de las 3 carteras a lo largo de 252 sesiones frente a 4 referencias estándar: SPY (S&P 500), QQQ (Nasdaq-100), EPU (MSCI Perú) y la cartera equiponderada (1/N).
  - **Curvas de Drawdown:** Panel inferior dedicado a graficar las caídas porcentuales desde máximos para dimensionar el riesgo de pérdida temporal.
  - **Interpretación honesta y verídica (Capítulo 4.6):** Bloque editorial generado dinámicamente desde las métricas que expone con total transparencia por qué las carteras no batieron al mercado: la baja persistencia de señales predictivas (exactitud cercana al 54%) sumada a las fricciones de costos de transacción y rebalanceo periódico mermaron el rendimiento neto frente a la concentración de los índices pasivos.
  - **Línea de tiempo de rebalanceos:** Selector temporal con botones que permiten auditar los pesos y el turnover de capital en cada una de las fechas de ajuste mensual.

---

## 4. Accesibilidad Universal (WCAG 2.2 AA) y Criterios IHC

### Ratios de Contraste Cromático Calculados (Criterio WCAG 1.4.3)
Todas las combinaciones cromáticas del sistema superan con holgura el umbral mínimo reglamentario de 4.5:1:

```
Texto principal (#14202E) sobre Fondo claro (#F6F8FB)  ──► 15.47 : 1  [SUPERADO]
Texto principal (#14202E) sobre Panel blanco (#FFFFFF) ──► 16.46 : 1  [SUPERADO]
Texto secundario (#4D5B6B) sobre Panel blanco         ──►  6.94 : 1  [SUPERADO]
Blanco (#FFFFFF) sobre Botón primario azul (#0B4F9C)   ──►  8.04 : 1  [SUPERADO]
Blanco (#FFFFFF) sobre Verde SUBE (#0A7D3C)            ──►  5.23 : 1  [SUPERADO]
Blanco (#FFFFFF) sobre Rojo BAJA (#B3261E)             ──►  6.54 : 1  [SUPERADO]
Texto claro (#E9EFF5) sobre Fondo oscuro (#0E141B)     ──► 15.98 : 1  [SUPERADO]
Texto claro (#E9EFF5) sobre Panel oscuro (#17202B)     ──► 14.19 : 1  [SUPERADO]
```

### Principio de Doble Canal de Información (Criterio WCAG 1.4.1)
Para usuarios con daltonismo (protanopía, deuteranopía):
- En Clasificación, ninguna celda depende solo del verde o rojo; se acompaña de `▲ SUBE` o `▼ BAJA` y el valor numérico.
- En la Watchlist, las alertas activadas exhiben el texto en mayúsculas `· DISPARADA`.
- En los gráficos de líneas, las series de carteras emplean trazos continuos, mientras que los índices de referencia utilizan líneas discontinuas o punteadas de distinto grosor.

### Operabilidad por Teclado y Estructura Semántica (WCAG 2.1 y 2.4)
- **Foco visible:** Declaración CSS global `:focus-visible { outline: 3px solid var(--ac); outline-offset: 2px; }`.
- **Salto accesible:** Enlace invisible `.skip` que se posiciona en pantalla al presionar `Tab` al cargar la página.
- **Tablas accesibles:** Todas las cabeceras cuentan con atributos `scope="col"` y los identificadores de activos con `scope="row"`.
- **Alternativas a gráficos:** Tanto Regresión como Optimizador cuentan con tablas semánticas colapsables que exponen los datos para sintetizadores de voz.

---

## 5. Bonificación: Internacionalización (i18n con API Intl)

Cumpliendo con los requisitos de bonificación (+1 punto sobre 20) detallados en el Capítulo 5.3:
1. **Selector de Locale:** En la barra de navegación se ubica el selector interactivo `🇵🇪 ES-PE` / `🇺🇸 EN-US`.
2. **Formateo numérico y monetario estricto:**
   - En español (`es-PE`): Decimales con coma y separadores de miles con espacio o punto (`US$ 1 234,50` o `+2,93 %`).
   - En inglés (`en-US`): Decimales con punto y miles con coma (`$1,234.50` o `+2.93%`).
   - Implementado mediante `new Intl.NumberFormat(getLocale(), { style: "currency", currency: "USD" })` y `toLocaleString(getLocale())`.
3. **Fechas formateadas:** Uso de `new Intl.DateTimeFormat(getLocale(), { dateStyle: "medium" })` eliminando cualquier concatenación manual de cadenas.
4. **Traducción dinámica:** La barra de navegación conmuta instantáneamente los 9 módulos entre español e inglés actualizando el atributo `document.documentElement.lang`.

---

## 6. Interpretación Técnica del Backtesting (Walk-Forward)

El módulo de backtesting simula la evolución de una inversión inicial de base 100 entre diciembre de 2024 y noviembre de 2025. 

### Tabla Comparativa Consolidada:

| Cartera / Benchmark | Retorno Total | CAGR | Volatilidad Anual | Ratio de Sharpe | Máximo Drawdown | Ratio Calmar |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| **SPY (S&P 500 Benchmark)** | **+17.84 %** | **+17.84 %** | 16.92 % | 0.82 | ▼ -8.45 % | 2.11 |
| **QQQ (Nasdaq-100)** | **+23.15 %** | **+23.15 %** | 22.80 % | 0.84 | ▼ -11.20 % | 2.07 |
| **Igual Ponderado (1/N)** | **+11.20 %** | **+11.20 %** | 18.45 % | 0.40 | ▼ -12.60 % | 0.89 |
| **Cartera Moderada (IA)** | **+8.95 %** | **+8.95 %** | 12.30 % | 0.41 | ▼ -7.80 % | 1.15 |
| **Cartera Conservadora (IA)** | **+5.42 %** | **+5.42 %** | 9.15 % | 0.16 | ▼ -5.90 % | 0.92 |
| **Cartera Agresiva (IA)** | **+3.18 %** | **+3.18 %** | 19.85 % | -0.04 | ▼ -16.40 % | 0.19 |
| **EPU (MSCI Perú)** | **+2.10 %** | **+2.10 %** | 27.60 % | -0.06 | ▼ -18.90 % | 0.11 |

### Conclusiones del Backtesting:
1. **Control de Drawdown:** La cartera Conservadora cumplió su cometido de preservación de capital, exhibiendo una caída máxima de solo -5.90%, significativamente menor a la de SPY (-8.45%) y QQQ (-11.20%).
2. **Causa del desfasaje de retorno:** Los modelos de clasificación individuales promedian exactitudes entre 52% y 57% en datos sintéticos. En un entorno con señales con bajo ratio señal-ruido, los rebalanceos mensuales forzados generaron costos de fricción y penalización por turnover que restaron rentabilidad acumulada.
3. **Lección IHC y financiera:** El sistema educa al estudiante en que una cartera diversificada con modelos matemáticos no garantiza batir a un mercado alcista concentrado en mega-capitalizaciones tecnológicas (como las 7 Magníficas en SPY/QQQ), demostrando la importancia de la gestión de expectativas.

---

## 7. Matriz de Auditoría y Verificación de Integridad

| Requisito de la Cátedra | Estado | Evidencia / Mecanismo de Verificación |
|:---|:---:|:---|
| Un solo sitio integrado | ✅ Cumplido | 9 páginas comparten la misma barra de navegación inyectada por `buildShell()` en `js/common.js`. |
| Estado compartido en `localStorage` | ✅ Cumplido | `eia_port`, `eia_watch`, `eia_theme` y `eia_locale` sincronizan datos entre páginas. |
| Coherencia del universo de activos | ✅ Cumplido | Los 26 activos oficiales del Anexo B están presentes en todos los módulos con fecha ancla al 11-nov-2026. |
| Solo 2 clases en Clasificación | ✅ Cumplido | Solo se renderizan `SUBE` y `BAJA`. Prohibición de "NEUTRO" verificada por script de auditoría. |
| Verificación matemática de Regresión | ✅ Cumplido | El último punto de la mediana proyectada coincide con $P_t \times (1 + \text{retorno}/100)$ con diferencia $< 0.05$ en los 26 activos. |
| Verificación matemática de Optimización | ✅ Cumplido | Suma de pesos $\sum w_i = 1 \pm 0.02$ y ningún peso supera el tope de 25% en el 100% de puntos NSGA. |
| Verificación matemática de Backtesting | ✅ Cumplido | El último punto de la curva base 100 coincide exactamente con el retorno total de la cartera ($\Delta \le 0.05$ pp). |
| Avisos de datos sintéticos | ✅ Cumplido | Aviso presente en el encabezado de cada módulo predictivo y al pie de página general. |
| Sin dependencias externas prohibidas | ✅ Cumplido | Solo se carga ECharts 5.5.1 vía CDN; no se usan frameworks pesados (React, Angular, Vue) ni compiladores. |
| Despliegue operativo en GitHub Pages | ✅ Cumplido | Sitio público accesible en `https://nolitoxdgaa.github.io/Ernesto-Investing-Ai-IHC-/`. |

---

## 8. Limitaciones del Sistema

1. **Naturaleza Sintética de los Datos:** Todos los precios históricos de 504 sesiones, velas y métricas predictivas provienen de generadores estocásticos con patrones realistas (colas pesadas, saltos por resultados trimestrales). No representan cotizaciones bursátiles reales ni deben usarse para toma de decisiones patrimoniales.
2. **Algoritmos Simulados:** Ni los modelos de Machine/Deep Learning ni los algoritmos genéticos NSGA-II/III se computan en tiempo de ejecución en el navegador; las salidas corresponden a precomputaciones empaquetadas en los JSON de entrada.
3. **Comisiones Fijas:** El backtesting modela una comisión fija de 5 puntos básicos sin considerar deslizamiento de precios (*slippage*) dependiente del volumen de mercado de cada activo.

---

## 9. Declaración de Uso de Inteligencia Artificial (AIAP)

En estricto cumplimiento con las normas de integridad académica de la FISI-UNMSM y las pautas del docente:

1. **Herramientas de IA utilizadas:**
   - **Figma Make:** Utilizado para la generación preliminar del diseño visual de las 5 pantallas nuevas y la exportación del código fuente base `figma-src/` mediante el prompt **P01**.
   - **Claude (Anthropic) / Asistente Antigravity:** Utilizado para la reestructuración modular en HTML/JS, implementación de accesibilidad WCAG 2.2 AA, cálculo analítico de contraste de color, desarrollo del sistema i18n con `Intl`, verificación matemática y suite de pruebas automatizadas mediante los prompts **P02 a P08**.
2. **Supervisión y Verificación Humana:**
   - Todos los códigos generados fueron ejecutados, probados localmente mediante servidor HTTP en Python, validados matemáticamente con scripts automatizados y auditados línea por línea por los integrantes del equipo.
3. **Registro Literal:**
   - Los prompts utilizados se encuentran documentados de forma íntegra y sin omisiones en el archivo [`PROMPTS_USADOS.md`](https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-/blob/main/PROMPTS_USADOS.md) del repositorio público.
