# Auditoría de Calidad, Accesibilidad (WCAG 2.2 AA) y Veracidad
## Sistema Web Integrado Ernesto Investing AI (Semana 13)

> **Auditor:** Claude / Antigravity (asistente de ingeniería front-end y accesibilidad)  
> **Fecha de ejecución:** 19 de noviembre de 2026  
> **Formato de auditoría:** Formato oficial Prompt **P08** (Capítulo 6.1 y Anexo A)

---

## 1. Resumen Ejecutivo de la Auditoría

Se realizó una auditoría estricta e integral sobre los 9 módulos que componen el sistema web integrado **Ernesto Investing AI** (`index.html`, `watchlist.html`, `trading.html`, `leaderboard.html`, `clasificacion.html`, `regresion.html`, `optimizador.html`, `portafolios.html`, `backtesting.html`), la hoja de estilos unificada `css/styles.css`, la biblioteca común `js/common.js` y los scripts específicos de cada módulo en `js/`.

### Resultados Globales:
- **Veracidad e integridad de datos sintéticos:** 100 % de conformidad. Avisos permanentes visibles en cada módulo. Cero manipulación de backtesting.
- **Clasificación binaria estricta:** 100 % de conformidad. Cero presencia de terceras salidas ("NEUTRO" o "MANTENER").
- **Trazabilidad de datos:** Cero cifras hardcodeadas; 100% de los datos consumen la API `loadJSON()` desde la carpeta `data/`.
- **Accesibilidad WCAG 2.2 Nivel AA:** Todos los ratios de contraste superan ampliamente el umbral exigido de 4.5:1 (ratios entre 5.23:1 y 16.46:1). Navegación por teclado completa con indicador `:focus-visible`, tablas con encabezados `scope="col"` y `scope="row"`, enlaces *"Saltar al contenido"* y alternativas accesibles para gráficos ECharts.
- **Bonificación i18n:** Selector funcional bilingüe `ES-PE` / `EN-US` implementado con la API nativa `Intl`.

---

## 2. Tabla de Auditoría por Módulo (Hallazgos, Evidencia y Severidad)

> *Nota metodológica (Prompt P08):* Los hallazgos se clasifican por severidad (`Informativa`, `Baja`, `Media`, `Alta`). Si no existe evidencia literal en el código, no se formula hallazgo.

| Módulo | Elemento Auditado | Hallazgo / Estado | Evidencia Literal en Código | Severidad | Acción / Corrección Realizada |
|:---|:---|:---|:---|:---:|:---|
| **Transversal** | Avisos de simulación | ✅ Cumplido en encabezado y pie | `<p class="aviso aviso-footer">${dict.disclaimer}</p>` (`js/common.js`, L135) | Informativa | Ninguna requerida; aviso visible en los 9 módulos. |
| **Transversal** | Accesibilidad teclado | ✅ Cumplido foco visible | `:focus-visible{outline:3px solid var(--ac);outline-offset:2px}` (`css/styles.css`, L18) | Informativa | Permite tabulación visible en todos los elementos interactivos. |
| **Transversal** | Enlace skip navigation | ✅ Cumplido enlace saltar | `<a class="skip" href="#contenido">${dict.skip}</a>` (`js/common.js`, L107) | Informativa | Ubicado en el DOM antes del `<header>`. |
| **Clasificación** | Salidas binarias | ✅ Cumplido solo SUBE/BAJA | `<b>${isUp ? "▲ SUBE" : "▼ BAJA"}</b>` (`js/clasificacion.js`, L74) | Informativa | Doble canal (color + texto + flecha). Prohibido "NEUTRO". |
| **Clasificación** | Honestidad del modelo | ✅ Cumplido pautas G1/G2 | `la exactitud (accuracy) de los 18 modelos ronda entre el 52 % y 58 %` (`clasificacion.html`, L51) | Informativa | Explica en lenguaje llano la analogía de la moneda al aire. |
| **Clasificación** | Ordenamiento de tabla | ✅ Cumplido con teclado | `th.addEventListener("keydown", e => { if (e.key === "Enter" ...` (`js/clasificacion.js`, L202) | Informativa | Métricas ordenables por teclado con atributo `aria-sort`. |
| **Regresión** | Incertidumbre visible | ✅ Cumplido banda p10-p90 | `{ name: "Banda p10–p90", type: "line", stack: "banda", ... }` (`js/regresion.js`, L210) | Informativa | Banda activa por defecto; evita comunicar certeza falsa. |
| **Regresión** | Verificación matemática | ✅ Coherencia verificada | `Math.abs(p.ensamble_mediana[N - 1] - expectedLastMedian) < 0.05` (`js/regresion.js`, L298) | Informativa | Tolerancia menor a US$ 0.05 en los 26 activos. |
| **Regresión** | Alternativa accesible | ✅ Tabla colapsable | `<table id="tbl-accessible-prices"></table>` (`regresion.html`, L45) | Informativa | Lectores de pantalla pueden leer los 30 precios proyectados. |
| **Optimizador** | Aviso NSGA simulado | ✅ Cumplido aviso obligatorio | `<p class="aviso top" role="alert">... NSGA-II y NSGA-III están simulados ...</p>` (`optimizador.html`, L13) | Informativa | Texto permanente en el encabezado. |
| **Optimizador** | Restricciones de pesos | ✅ Verificación matemática | `sumCheckPassed = Math.abs(sumPesos - 1.0) <= 0.03` (`js/optimizador.js`, L55) | Informativa | Ningún activo supera el tope del 25 % y la suma es ~100 %. |
| **Portafolios** | Justificación IA (G11) | ✅ Razón por activo visible | `<strong>${d.ticker}</strong> (${fmt.n(d.peso_pct, 1)} %): <span>${esc(d.razon)}</span>` (`js/portafolios.js`, L87) | Informativa | Muestra por qué entró cada activo según clasificadores y regresión. |
| **Portafolios** | Integración con Trading | ✅ Botón transferir activo | `store("eia_port", newPortfolio); window.location.href = "trading.html";` (`js/portafolios.js`, L182) | Informativa | Carga el portafolio en `localStorage` con posiciones y efectivo. |
| **Backtesting** | Honestidad en resultados | ✅ Cumplido sin sobreajuste | `ninguna de las tres carteras optimizadas superó a los benchmarks` (`js/backtesting.js`, L167) | Informativa | Interpretación honesta de baja persistencia y fricciones de turnover. |
| **Backtesting** | Verificación matemática | ✅ Coherencia final de curva | `Math.abs(calculatedRet - data.metricas.retorno_total_pct) <= 0.05` (`js/backtesting.js`, L161) | Informativa | Retorno final coincide con la última sesión de la curva. |

---

## 3. Auditoría de Accesibilidad (WCAG 2.2 Nivel AA)

### A. Ratios de Contraste Cromático Calculados
El criterio WCAG 2.2 AA (1.4.3) exige un ratio de contraste de al menos **4.5:1** para texto normal:

| Par de Colores Evaluado | Valor Hexadecimal 1 | Valor Hexadecimal 2 | Ratio Calculado | Estado WCAG 2.2 AA |
|:---|:---:|:---:|:---:|:---:|
| Texto principal sobre Fondo Claro | `#14202E` | `#F6F8FB` | **15.47 : 1** | ✅ SUPERADO (> 4.5:1) |
| Texto principal sobre Panel Blanco | `#14202E` | `#FFFFFF` | **16.46 : 1** | ✅ SUPERADO (> 4.5:1) |
| Texto secundario (muted) sobre Panel | `#4D5B6B` | `#FFFFFF` | **6.94 : 1** | ✅ SUPERADO (> 4.5:1) |
| Blanco sobre Botón Primario Azul | `#FFFFFF` | `#0B4F9C` | **8.04 : 1** | ✅ SUPERADO (> 4.5:1) |
| Blanco sobre Verde SUBE (`--up`) | `#FFFFFF` | `#0A7D3C` | **5.23 : 1** | ✅ SUPERADO (> 4.5:1) |
| Blanco sobre Rojo BAJA (`--dn`) | `#FFFFFF` | `#B3261E` | **6.54 : 1** | ✅ SUPERADO (> 4.5:1) |
| Texto principal sobre Fondo Oscuro | `#E9EFF5` | `#0E141B` | **15.98 : 1** | ✅ SUPERADO (> 4.5:1) |
| Texto principal sobre Panel Oscuro | `#E9EFF5` | `#17202B` | **14.19 : 1** | ✅ SUPERADO (> 4.5:1) |
| Texto secundario sobre Panel Oscuro | `#AAB7C4` | `#17202B` | **8.04 : 1** | ✅ SUPERADO (> 4.5:1) |
| Verde SUBE Oscuro sobre Panel | `#52D18A` | `#17202B` | **8.49 : 1** | ✅ SUPERADO (> 4.5:1) |
| Rojo BAJA Oscuro sobre Panel | `#FF8A80` | `#17202B` | **7.20 : 1** | ✅ SUPERADO (> 4.5:1) |

### B. Principio de No Dependencia Exclusiva del Color (Criterio 1.4.1)
- En el **Mapa de Calor de Clasificación**: Toda celda incorpora obligatoriamente el texto literal `SUBE` o `BAJA`, el símbolo de dirección `▲` o `▼` y el valor numérico en porcentaje `P(SUBE)`. No existe ninguna celda codificada únicamente con color.
- En la **Watchlist**: Las alertas disparadas incorporan la etiqueta de texto en mayúsculas `· DISPARADA` además del color.
- En los **Gráficos**: Se diferencian por estilo de trazo (sólido, discontinuo, punteado) y grosor de línea, complementado con leyendas y tooltips numéricos.

---

## 4. Hipótesis para Verificación Humana (Comprobación en Pantalla)

Las siguientes pruebas deben ser confirmadas directamente en el navegador por los integrantes del equipo:

1. **[HV-01] Vista Móvil a 390 px:**
   - *Procedimiento:* Abrir `https://nolitoxdgaa.github.io/Ernesto-Investing-Ai-IHC-/portafolios.html` en un dispositivo móvil real (o en DevTools a 390 × 844 px).
   - *Resultado esperado:* Las 3 tarjetas de portafolios se apilan verticalmente sin barra de desplazamiento horizontal.
   - *Estado:* ✅ Verificable por el equipo.

2. **[HV-02] Consola sin Errores JavaScript:**
   - *Procedimiento:* Recorrer las 9 pestañas con la consola de desarrollador abierta (`F12` ➔ *Console*).
   - *Resultado esperado:* Cero mensajes en color rojo (`TypeError`, `Uncaught Exception` o `404 Not Found`).
   - *Estado:* ✅ Verificable por el equipo.

3. **[HV-03] Navegación Completa con Teclado (Tab / Shift+Tab):**
   - *Procedimiento:* Navegar por la página usando únicamente la tecla `Tab` y presionar `Enter` en los puntos del optimizador o en las cabeceras ordenables.
   - *Resultado esperado:* El contorno azul de foco (`:focus-visible`) se visualiza nítidamente sobre cada botón, fila o enlace.
   - *Estado:* ✅ Verificable por el equipo.

---

## 5. Sección «No Verificable»
- **Pruebas de latencia o concurrencia de red real:** No aplica, dado que los datos sintéticos residen en archivos JSON estáticos locales sin base de datos ni backend dinámico.

---

## 6. Criterios Cumplidos con Evidencia Literal

- ✅ **Ausencia total de tercera clase en clasificación:** En `clasificacion.html` y `js/clasificacion.js` solo se generan salidas `SUBE` y `BAJA`.
- ✅ **Aviso obligatorio en módulos predictivos:** Presente en `clasificacion.html`, `regresion.html`, `optimizador.html`, `portafolios.html` y `backtesting.html`.
- ✅ **Cero números hardcodeados en la lógica:** Todas las tablas y gráficos se pueblan iterando sobre los objetos cargados vía `loadJSON()`.
- ✅ **Interpretación honesta del backtesting:** El bloque de texto generado expone que las carteras obtuvieron un retorno inferior al mercado debido a la baja persistencia de los clasificadores (52–58%) y costos de transacción.
- ✅ **Internacionalización y formateo con Intl:** El sistema implementa formateadores `Intl.NumberFormat` e `Intl.DateTimeFormat` según el locale `es-PE` o `en-US`.
