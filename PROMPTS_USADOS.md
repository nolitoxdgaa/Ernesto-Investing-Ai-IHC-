# Prompts Utilizados en el Proyecto — Ernesto Investing AI (Semana 13)

> Registro obligatorio de prompts literales asistidos por IA (Figma Make y Claude) según el formato **ESLBHP** (*Ernesto Style Label-Based Hyperdetailed Prompts*).

---

## 🎨 Fase 1 · Diseño en Figma Make

### Prompt P01 — Generación de Pantallas en Figma Make
```xml
<prompt id="P01" nombre="Figma Make: pantallas de los módulos nuevos">  
  <role>Eres un diseñador de interfaces financieras que trabaja en Figma Make con un estilo coherente.</role>  
  <context>  
Sistema: Ernesto Investing AI, sitio web bursátil educativo con datos sintéticos. Ya existen Dashboard, Watchlist, Trading y Leaderboard  
(tema claro y oscuro, tarjetas con borde redondeado, barra de navegación superior, paleta azul #0B4F9C, verde #0A7D3C, rojo #B3261E).  
Debes diseñar 5 pantallas nuevas: Clasificación, Regresión 30 días, Optimizador, Portafolios, Backtesting.  
Universo: 26 activos (7 Magníficas, 5 mineras con operaciones en Perú, 11 ETF sectoriales, SPY, QQQ, EPU).  
  </context>  
  <task>  
1. Clasificación: mapa de calor activo × 18 modelos con probabilidad de SUBE; cada celda con color Y la palabra SUBE/BAJA. Panel de consenso por activo.  
2. Regresión: gráfico de historia + 30 sesiones proyectadas, línea de mediana, banda p10–p90, selector ML/DL/todos, etiqueta de retorno proyectado.  
3. Optimizador: gráfico riesgo–retorno con curva de Markowitz, frente NSGA-II y frente NSGA-III (color por CVaR); panel de composición al seleccionar un punto.  
4. Portafolios: tres tarjetas lado a lado (Conservador, Moderado, Agresivo) con dona de pesos y métricas.  
5. Backtesting: curvas de capital base 100, curva de drawdown, tabla de métricas y línea de tiempo de rebalanceos.  
Cada pantalla en tema claro y una en tema oscuro, y una versión móvil de 390 px de la pantalla de Portafolios.  
  </task>  
  <constraints>  
- La clasificación es BINARIA: solo SUBE o BAJA, sin tercera salida.  
- El color nunca es el único canal: acompañar con texto y símbolo. Contraste mínimo 4,5:1.  
- Aviso visible «Datos sintéticos · resultados simulados» en cada pantalla.  
- No inventar logotipos de marcas reales ni mostrar precios como reales.  
  </constraints>  
  <output>Un archivo de Figma con las 5 pantallas, sus variantes de tema y móvil, y un prototipo navegable que conecte la barra superior.</output>  
  <verification>Revisar el contraste con el verificador de Figma y recorrer el prototipo con el teclado.</verification>  
</prompt>
```

---

## 📦 Fase 2 · Configuración del Repositorio y Código Fuente de Figma

### Prompt P02 — Organización del Repositorio y figma-src
```xml
<prompt id="P02" nombre="Descargar el src de Figma Make y ordenar el repositorio">  
  <role>Eres un ingeniero de software que organiza el código exportado de Figma Make sin modificarlo.</role>  
  <context>  
El equipo descargó el código fuente (src) de su proyecto de Figma Make como un .zip. El repositorio del equipo se creó a partir del sistema base:  
index.html, watchlist.html, trading.html, leaderboard.html, clasificacion.html, regresion.html, optimizador.html, portafolios.html, backtesting.html, css/, js/, data/.  
  </context>  
  <task>  
1. Indica la estructura final: carpeta figma-src/ con el contenido del .zip SIN editarlo, y el sitio en la raíz.  
2. Redacta el contenido del README.md: qué es el sistema, cómo ejecutarlo con python -m http.server, enlace de Figma, enlace de GitHub Pages, integrantes por alias.  
3. Redacta un .gitignore que excluya node_modules/, .DS_Store y archivos de credenciales.  
  </task>  
  <constraints>  
- No ejecutar código del .zip sin revisarlo. No subir claves, tokens ni archivos .env.  
- No modificar los JSON de data/.  
  </constraints>  
  <output>Árbol de carpetas en texto, README.md y .gitignore completos.</output>  
  <verification>Abrir el repositorio en GitHub y comprobar que figma-src/ está y que no hay secretos (buscar «token», «key», «password»).</verification>  
</prompt>
```

---

## 💻 Fase 3 · Implementación de Módulos (HTML + JavaScript)

### Prompt P03 — Módulo de Clasificación binaria
```xml
<prompt id="P03" nombre="Claude: módulo de Clasificación binaria en HTML y JavaScript">  
  <role>Eres un desarrollador front-end senior que implementa interfaces accesibles en HTML, CSS y JavaScript sin frameworks.</role>  
  <context>  
Sistema Ernesto Investing AI. Archivo de salida: clasificacion.html. Usa css/styles.css y js/common.js existentes (funciones $, fmt, loadJSON, store).  
Datos: data/05_clasificadores_binarios.json con "modelos" (18 con exactitud, precision, recall, f1, auc, matriz_confusion) y  
"predicciones"[ticker] con "modelos"[{modelo, familia, prob_sube, senal}], votos_sube, votos_baja, prob_media, consenso, confianza.  
El diseño debe seguir la pantalla de Clasificación del archivo de Figma https://tame-wifi-31309741.figma.site.  
  </context>  
  <task>  
1. Mapa de calor activo × modelo (tabla con scope en los encabezados). Cada celda: color según prob_sube Y el texto SUBE/BAJA con un símbolo (▲/▼).  
2. Tarjeta de consenso del activo seleccionado: votos, probabilidad media, confianza.  
3. Tabla de métricas por modelo, ordenable por columna con teclado.  
4. Filtros por grupo y por familia (ML, DL).  
5. Aviso «Datos sintéticos · clasificación simulada».  
  </task>  
  <constraints>  
- Solo dos clases (SUBE/BAJA). Nunca mostrar una tercera salida.  
- Leer los datos del JSON; no copiar números dentro del código.  
- Contraste 4,5:1 en tema claro y oscuro. Funcionar a 390 px sin desborde horizontal.  
- Sin dependencias externas salvo ECharts 5.5.1 desde https://cdn.jsdelivr.net/npm/echarts@5.5.1/dist/echarts.min.js.  
  </constraints>  
  <output>El archivo clasificacion.html completo y, si hace falta, js/clasificacion.js, con comentarios en español.</output>  
  <verification>Abrir con python -m http.server; revisar consola sin errores; comprobar que 26 activos × 18 modelos = 468 celdas; navegar con Tab.</verification>  
</prompt>
```

### Prompt P04 — Módulo de Regresión a 30 sesiones
```xml
<prompt id="P04" nombre="Claude: módulo de Regresión de precios a 30 sesiones">  
  <role>Eres un desarrollador front-end senior especializado en visualización de series de tiempo con ECharts.</role>  
  <context>  
Archivo de salida: regresion.html. Datos: data/06_regresores_precio_30d.json con "fechas_pronostico" (30), "modelos" (métricas) y  
"predicciones"[ticker] = {precio_ultimo, modelos:[{modelo, familia, precios[30]}], ensamble_mediana[30], banda_p10[30], banda_p90[30],  
retorno_proyectado_30d_pct, cono_volatilidad_inf[30], cono_volatilidad_sup[30]}.  
Historia: data/02_precios_sinteticos_504d.json {fechas, cierres[ticker]}.  
  </context>  
  <task>  
1. Gráfico de líneas: últimas 120 sesiones de historia y 30 proyectadas; una línea tenue por modelo, la mediana destacada y el sombreado p10–p90.  
2. Selector de activo y de familia (todos, solo ML, solo DL); activar/desactivar modelos con casillas.  
3. Etiqueta de retorno proyectado con color y texto (por ejemplo «+2,93 % ▲»).  
4. Tabla de métricas por modelo (MAPE, MAE, RMSE, R², mejora vs persistencia).  
5. Alternativa en tabla de los 30 precios de la mediana para lectores de pantalla.  
  </task>  
  <constraints>  
- La banda de incertidumbre siempre visible por defecto.  
- Fechas y números con Intl según el locale activo.  
- Aviso «Datos sintéticos · pronóstico simulado, no es asesoría de inversión».  
  </constraints>  
  <output>regresion.html completo y js/regresion.js con comentarios en español.</output>  
  <verification>Comprobar que el último punto de la mediana coincide con precio_ultimo × (1 + retorno_proyectado_30d_pct/100) con tolerancia de 1 centavo.</verification>  
</prompt>
```

### Prompt P05 — Módulo Optimizador (Markowitz, NSGA-II, NSGA-III)
```xml
<prompt id="P05" nombre="Claude: módulo Optimizador con Markowitz, NSGA-II y NSGA-III">  
  <role>Eres un desarrollador front-end con conocimientos de optimización de portafolios.</role>  
  <context>  
Archivo de salida: optimizador.html. Datos: data/07_optimizador_markowitz_nsga.json con "elegibles", "tope_peso_por_activo", "tasa_libre_riesgo",  
"markowitz_universo_completo" y "markowitz_elegibles" (listas de {retorno_esperado_anual_pct, volatilidad_anual_pct, sharpe, cvar95_diario_pct, pesos}),  
"nsga2_elegibles" (con id) y "nsga3_elegibles" (con id y cvar95_diario_pct).  
  </context>  
  <task>  
1. Gráfico de dispersión riesgo (X) – retorno (Y): curva de Markowitz como línea, frente NSGA-II como puntos, frente NSGA-III como puntos con color por CVaR 95 %.  
2. Interruptores para mostrar u ocultar cada serie; opción de curva del universo completo frente a solo elegibles.  
3. Al hacer clic (o con Enter) en un punto: panel con los pesos del portafolio (barras) y sus métricas.  
4. Explicación breve de qué optimiza cada método y por qué NSGA queda algo por debajo de Markowitz.  
5. Lista de activos elegibles y el criterio de elegibilidad.  
  </task>  
  <constraints>  
- Mostrar el aviso «NSGA-II y NSGA-III simulados: no se ejecutó ningún algoritmo evolutivo».  
- Los puntos deben poder seleccionarse con teclado; ofrecer una tabla alternativa de los puntos.  
- No recalcular las fronteras: solo leerlas del JSON.  
  </constraints>  
  <output>optimizador.html completo y js/optimizador.js con comentarios en español.</output>  
  <verification>Comprobar que la suma de pesos de cada punto seleccionado es 1 ± 0,02 y que ningún peso supera el tope.</verification>  
</prompt>
```

### Prompt P06 — Módulos de Portafolios y Backtesting
```xml
<prompt id="P06" nombre="Claude: módulos de Portafolios en 3 niveles y Backtesting">  
  <role>Eres un desarrollador front-end senior especializado en tableros financieros.</role>  
  <context>  
Archivos de salida: portafolios.html y backtesting.html.  
Datos: data/08_portafolios_3_niveles_riesgo.json {niveles:[{nivel, origen, descripcion, restricciones, retorno_esperado_anual_pct, volatilidad_anual_pct, sharpe, cvar95_diario_pct, pesos, detalle_activos[{ticker, peso_pct, grupo, razon}]}]}.  
data/09_backtesting_portafolios.json {fechas (253), carteras{Conservador|Moderado|Agresivo:{curva, metricas, rebalanceos[{fecha, pesos}], turnover_medio, drawdown}}, referencias{SPY|QQQ|EPU|Igual ponderado (1/N):{curva, metricas}}}.  
  </context>  
  <task>  
1. portafolios.html: tres tarjetas comparables, dona de pesos por nivel, tabla de razones por activo y botón «Llevar a Trading».  
2. backtesting.html: curvas de capital base 100 de las 3 carteras y 4 referencias, curva de drawdown, tabla de métricas ordenable, línea de tiempo de rebalanceos.  
3. Un bloque «Interpretación» que redacte, a partir de las métricas leídas, si cada cartera superó o no a SPY y por qué podría ser.  
  </task>  
  <constraints>  
- La interpretación se genera desde los números del JSON; no escribir conclusiones fijas en el código.  
- Declarar que el backtesting es sobre historia sintética y que desempeño pasado no garantiza desempeño futuro.  
- Mantener el mismo tema claro/oscuro y vista móvil.  
  </constraints>  
  <output>Los dos HTML completos y sus archivos js, con comentarios en español.</output>  
  <verification>Comprobar que la última cifra de cada curva coincide con retorno_total_pct (curva_final/100 − 1) dentro de 0,05 puntos porcentuales.</verification>  
</prompt>
```

---

## 🔗 Fase 4 · Integración Final del Sitio

### Prompt P07 — Integración Final de los 9 Módulos
```xml
<prompt id="P07" nombre="Claude: integración final de los 9 módulos en un solo sitio">  
  <role>Eres un arquitecto front-end que integra módulos independientes en un sitio coherente.</role>  
  <context>  
Repositorio del equipo con 9 páginas HTML (4 heredadas y 5 nuevas), js/common.js, css/styles.css, data/ y figma-src/.  
Hoy cada página funciona sola; deben comportarse como un solo sistema.  
  </context>  
  <task>  
1. Unificar la barra de navegación (misma en las 9 páginas), el tema claro/oscuro y el selector de idioma ES-PE / EN-US (bonificación) con Intl.  
2. Estado compartido en localStorage: watchlist, portafolio de trading, portafolio elegido y activo seleccionado, entre módulos.  
3. Enlaces cruzados: del activo en Clasificación a su Regresión, y de allí al Optimizador.  
4. Eliminar duplicación de CSS y JavaScript; un solo css/styles.css y js/common.js.  
5. Escribir un script de prueba con Playwright que abra las 9 páginas a 1280 y a 390 px y reporte errores de consola, desborde horizontal y elementos clave.  
6. Indicar los pasos de despliegue en GitHub Pages y la URL final.  
  </task>  
  <constraints>  
- No modificar los JSON de data/. No agregar frameworks.  
- Todo cambio debe conservar la accesibilidad: foco visible, enlace «Saltar al contenido», etiquetas.  
  </constraints>  
  <output>Archivos modificados completos, script de pruebas y lista de verificación.</output>  
  <verification>Ejecutar el script de Playwright: 9 páginas sin errores de consola, sin desborde a 390 px; recorrer el sitio publicado desde el celular.</verification>  
</prompt>
```
