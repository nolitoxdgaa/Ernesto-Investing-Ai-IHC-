# 📄 Plantilla Maestra para Informe Escrito y Guía del Video (Semana 13)
### Proyecto Final: Sistema Web Integrado Investing AI Internacionalizado
**Curso:** IHC — Interacción Hombre-Computador (202W0606) · **Semestre:** 2026-2  
**Docente:** Prof. Mg. Ing. Ernesto D. Cancho-Rodríguez, MBA (GWU)

---

> [!NOTE]
> Esta plantilla contiene la estructura completa, redacción técnica recomendada, ubicación exacta de capturas y gráficos, y el guion segundo a segundo para el video de 3 minutos. El equipo solo debe copiar el texto a su procesador de textos (Word/Docs), insertar las imágenes indicadas y exportar a PDF.

---

## 📑 PARTE 1: ESTRUCTURA DEL INFORME DEL PROYECTO (10 CAPÍTULOS)

### Portada Oficial Recomendada:
- **Universidad:** Universidad Nacional Mayor de San Marcos (o la institución correspondiente)
- **Facultad / Escuela:** Ingeniería de Sistemas / Software
- **Curso:** Interacción Hombre-Computador (202W0606)
- **Título del Trabajo:** *Prototipo IHC de Interfaz del Sistema Web Investing AI Internacionalizado y Completo*
- **Docente:** Prof. Mg. Ing. Ernesto D. Cancho-Rodríguez, MBA (GWU)
- **Integrantes del Grupo:** (Colocar nombres completos y códigos de los estudiantes)
- **Fecha:** Noviembre de 2026

---

### Capítulo 1: Introducción y Contexto del Sistema
* **1.1 Propósito del Sistema:**  
  Presentar el «Sistema Web Integrado Ernesto Investing AI», una plataforma educativa y analítica de pronósticos bursátiles simulados con cobertura para 26 activos financieros.
* **1.2 Alcance del Avance de la Semana 13:**  
  Extensión e internacionalización total del sistema base, integrando el soporte regional para 5 configuraciones regionales (`es-PE`, `en-US`, `ar-EG`, `ja-JP`, `qu-PE`), dirección bidireccional (RTL), zonas horarias mundiales, CSS lógico y las 4 pantallas de soporte de cuenta.
* **1.3 Declaración de Principios de IHC y Veracidad:**  
  Todo precio y rentabilidad es **sintético**; no se convierte el tipo de cambio al cambiar de idioma (se respeta la divisa y monto); las predicciones expresan rangos de incertidumbre o probabilidades calibradas.

---

### Capítulo 2: Arquitectura del Sistema de Internacionalización (3 Zonas)
* **2.1 Modelo Arquitectónico de 3 Zonas:**
  - **Zona 1 (Núcleo independiente):** Motores analíticos de cálculo financiero, matrices de covarianza y backtesting sin textos *hardcodeados*.
  - **Zona 2 (Recursos externalizados):** Diccionarios modulares `locales/*.json` clasificados por etiquetas BCP 47 y formateadores estandarizados con la API ECMAScript `Intl`.
  - **Zona 3 (Adaptación cultural):** Selector de idioma por endónimos, algoritmos de lectura LTR/RTL, selectores de husos horarios y motor de pseudolocalización.
* **2.2 Diagramas UML del Sistema:**  
  *(Insertar aquí los diagramas oficiales ubicados en `docs/s13_recursos/diagramas/`)*:
  - `[INSERTAR IMAGEN: docs/s13_recursos/diagramas/S13_UML_clases.png]`  
    *Figura 2.1: Diagrama de clases del kit i18n y formateadores.*
  - `[INSERTAR IMAGEN: docs/s13_recursos/diagramas/S13_UML_secuencia.png]`  
    *Figura 2.2: Diagrama de secuencia del cambio dinámico de locale y re-renderizado.*
  - `[INSERTAR IMAGEN: docs/s13_recursos/diagramas/S13_UML_componentes.png]`  
    *Figura 2.3: Diagrama de componentes y separación en capas.*

---

### Capítulo 3: Módulos del Sistema y Navegación Común
* **3.1 Módulos Operativos y Analíticos (9 pantallas):**
  1. *Dashboard de mercado:* Velas de activos (ECharts), KPIs principales y tabla de universo con 26 activos.
  2. *Watchlist y alertas:* Monitoreo en tiempo real con micro-gráficos sparkline SVG y alertas por umbral.
  3. *Trading simulado:* Ejecución de órdenes de compra/venta a precios de mercado y balance de NAV.
  4. *Leaderboard:* Ranking de rentabilidad competitiva de la liga frente a benchmarks.
  5. *Clasificación:* Matriz direccional SUBE/BAJA con 18 modelos ML/DL y consenso ponderado.
  6. *Regresión 30d:* Proyecciones puntuales con abanico de incertidumbre y métricas RMSE/MAE.
  7. *Optimizador:* Frontera eficiente de Markowitz y optimización multiobjetivo con NSGA-II/III.
  8. *Portafolios:* Asignación de activos en perfiles Conservador, Moderado y Agresivo.
  9. *Backtesting:* Curva de patrimonio histórico, drawdowns y ratios Sharpe/Sortino.
* **3.2 Pantallas de Soporte y Cuenta (4 pantallas nuevas):**
  - *Perfil (`perfil.html`):* Ficha del inversionista, nivel de riesgo y estadísticas de trading.
  - *Configuración (`configuracion.html`):* Parámetros de idioma, zona horaria y reinicio de datos.
  - *Ayuda (`ayuda.html`):* Preguntas frecuentes (FAQ) y glosario interactivo.
  - *Acerca de (`acercade.html`):* Créditos, arquitectura y declaración ética formal.

---

### Capítulo 4: Internacionalización Técnica (i18n) y Localización (l10n)
* **4.1 Catálogo de Recursos JSON y Claves Funcionales:**  
  Explicar cómo se estructuraron las más de 100 claves en `locales/es-PE.json`, `en-US.json`, `ar-EG.json`, `ja-JP.json` y `qu-PE.json`, evitando la concatenación y usando variables tipo `{time}`, `{qty}`.
* **4.2 Formatos Regionales con API `Intl`:**
  - `Intl.NumberFormat`: Formateo de precios y porcentajes según las convenciones del locale.
  - `Intl.DateTimeFormat`: Fechas convertidas dinámicamente al huso horario elegido por el usuario (ej. Lima UTC-5 vs Nueva York ET vs Riad UTC+3).
  - `Intl.PluralRules`: Selección de plurales según reglas CLDR (ej. 6 categorías en árabe frente a 2 en español/inglés).
  - `Intl.Collator`: Ordenación alfabética regional respetando diacríticos (Á, Ñ).
* **4.3 Codificación UTF-8 y Prevención del Mojibake:**  
  Explicar la demostración del Ejercicio 13.1 donde decodificar bytes UTF-8 como Windows-1252 genera el texto erróneo `SeÃ±al`.
  - `[INSERTAR IMAGEN: capturas/S13_captura_13_1.png]`  
    *Figura 4.1: Inspector de codificaciones y demostración de mojibake.*

---

### Capítulo 5: Adaptación Cultural y Dirección Bidireccional (RTL)
* **5.1 Soporte para Idiomas RTL (Árabe - `ar-EG`):**
  - Explicar la inyección dinámica de `dir="rtl"` y `lang="ar-EG"` en `<html>`.
  - Espejado fluido de la barra superior, tarjetas de navegación y tablas.
  - Respeto del algoritmo bidireccional de Unicode (UBA) para cifras numéricas (de izquierda a derecha dentro de texto RTL).
  - `[INSERTAR IMAGEN: capturas/S13_captura_13_2_B_ar-EG.png]`  
    *Figura 5.1: Interfaz completamente espejada en árabe egipcio (RTL).*
* **5.2 CSS Lógico en lugar de Físico:**  
  Detallar el reemplazo de `margin-left` por `margin-inline-start`, `border-left` por `border-inline-start`, garantizando un código único compatible con LTR y RTL sin hojas de estilo duplicadas.
* **5.3 Selector de Idioma por Endónimos:**  
  Justificar por qué se emplean nombres nativos (*Español*, *English*, *العربية*, *日本語*, *Runasimi*) y por qué se prohíben las banderas nacionales (las banderas representan estados soberanos, no idiomas).

---

### Capítulo 6: Medición de Calidad con el DOM: Truncados y Desbordes
* **6.1 Auditoría Automatizada del DOM:**  
  Medición con `scrollWidth > clientWidth` para detectar texto cortado y desbordes fuera de la pantalla visible.
* **6.2 Tabla Comparativa Antes (Versión A) vs Después (Versión B):**
  *(Citar los datos del archivo `medicion_truncados_desbordes_antes_despues.csv`)*:

| Módulo / Escenario | Locale | Truncados Versión A | Truncados Versión B | Desbordes A | Desbordes B |
|---|---|:---:|:---:|:---:|:---:|
| Dashboard de mercado | `es-PE` | 5 | **0** | 0 | **0** |
| Dashboard de mercado | `en-US` | 4 | **0** | 0 | **0** |
| Dashboard de mercado | `ar-EG` (RTL) | 4 | **0** | 0 | **0** |
| Dashboard de mercado | `ja-JP` | 5 | **0** | 0 | **0** |
| Dashboard con Pseudolocalización | `Pseudo (+40%)` | 6 | **0** | 1 | **0** |
| Modo Móvil 375 px (iPhone SE) | Todos | 2 | **0** | 1 | **0** |
| **Total en el Sistema** | — | **58** | **0 (Reducción 100%)** | **2** | **0 (Reducción 100%)** |

* **6.3 Pruebas de Pseudolocalización:**  
  Demostrar que la versión B tolera un 40% de expansión de texto sin romper los contenedores gracias a anchos mínimos elásticos (`min-width`).
  - `[INSERTAR IMAGEN: capturas/S13_captura_13_2_B_en-US_pseudo.png]`  
    *Figura 6.1: Prueba de pseudolocalización con acentos y expansión del 40%.*
  - `[INSERTAR IMAGEN: capturas/S13_captura_13_2_B_movil.png]`  
    *Figura 6.2: Verificación de diseño responsivo a 375 px sin desborde horizontal.*
  - `[INSERTAR IMAGEN: figuras/S13_fig_truncados_AB.png]`  
    *Figura 6.3: Gráfico de barras de truncados en el DOM por idioma (Versión A vs B).*

---

### Capítulo 7: Experimento Cognitivo: Formato Ambiguo (A) frente a Localizado (B)
* **7.1 Diseño del Experimento (Ejercicio 13.3):**  
  Diseño intra-sujetos con 16 ítems financieros (8 en formato A ambiguo y 8 en formato B explícito) contrabalanceados aleatoriamente entre los 4 participantes del grupo (`G3-01` al `G3-04`).
* **7.2 Resultados Cuantitativos:**  
  *(Citar datos del dataset consolidado y notebook)*:
  - **Formato B (Explícito y localizado):** Tasa de acierto del **93.8 %**, tiempo mediano de respuesta de **2,450 ms** y confianza promedio de **4.4 / 5**.
  - **Formato A (Ambiguo y estático):** Tasa de acierto del **53.1 %**, tiempo mediano de respuesta de **4,380 ms** y confianza promedio de **2.8 / 5**.
  - **Diferencia media (B − A):** **+40.7 puntos porcentuales** a favor del formato localizado.
  - Intervalos de confianza al 95% calculados mediante el método de **Wald ajustado (Agresti–Coull)**: Formato B [0.812, 0.985] vs Formato A [0.362, 0.693].
* **7.3 Gráfico de Resultados:**  
  - `[INSERTAR IMAGEN: figuras/S13_fig_aciertos_AB.png]`  
    *Figura 7.1: Proporción de aciertos por formato con intervalos de confianza al 95%.*

---

### Capítulo 8: Auditoría de Sitios Financieros del Mundo Real
* **8.1 Análisis Heurístico de 14 Sitios Financieros:**  
  Comparación de 7 portales peruanos (BVL, SMV, BCRP, SBS, BCP, Interbank, BBVA) frente a 7 internacionales (Yahoo Finance, Investing.com, NYSE, JPX, Tadawul, B3, Interactive Brokers).
* **8.2 Hallazgos Críticos:**  
  - Promedio de puntaje (0–10): Perú **5.0** frente a Internacional **6.0**.
  - 2 sitios con bloqueo 403 (Investing.com y Tadawul).
  - **0 de 12 sitios válidos** respondieron al encabezado `Accept-Language: ja-JP` en su página de inicio.
  - Solo 4 sitios implementan etiquetas `hreflang` para indexación regional.
* **8.3 Gráfico de Auditoría:**  
  - `[INSERTAR IMAGEN: figuras/S13_fig_puntaje_i18n.png]`  
    *Figura 8.1: Puntaje heurístico de internacionalización de los 14 sitios financieros.*

---

### Capítulo 9: Límites, Veracidad y Declaración de Uso de IA
* **9.1 Naturaleza de los Datos Financieros:**  
  Los precios y carteras son sintéticos; únicamente las volatilidades, betas y correlaciones se basan en parámetros empíricos reales anclados al cierre de noviembre de 2026.
* **9.2 Traducciones Preliminares (Borradores):**  
  Las cadenas en árabe, japonés y quechua están marcadas explícitamente como borradores que requieren validación por personas hablantes nativas competentes antes de un despliegue productivo.
* **9.3 Declaración de Inteligencia Artificial:**  
  Se declara el uso de modelos LLM como herramientas de asistencia técnica para la generación de código base y análisis de datos, habiendo sido ejecutados, auditados y validados manualmente por los integrantes del equipo.

---

### Capítulo 10: Conclusiones y Trabajo Futuro
* **10.1 Conclusiones del Trabajo:**  
  1. La internacionalización no es solo traducir palabras; exige separar los recursos de la lógica del núcleo, adoptar CSS lógico y respetar convenciones culturales y numéricas.
  2. El formateo localizado reduce a la mitad los errores de comprensión del usuario y duplica su nivel de confianza en operaciones financieras.
  3. La arquitectura modular de 13 pantallas cumple rigurosamente con los lineamientos de accesibilidad, adaptabilidad responsive a 375 px y principios de IHC.
* **10.2 Trabajo Futuro:**  
  Integración de pruebas de usabilidad con usuarios nativos de quechua y árabe, e implementación de un pipeline CI/CD con pruebas automatizadas de truncados DOM en cada commit.

---

## 🎬 PARTE 2: GUION DETALLADO PARA EL VIDEO DE 3 MINUTOS

| Tiempo | Pantalla a mostrar | Narración y Acción en Vivo |
|---|---|---|
| **00:00 – 00:30** | `index.html` en **`es-PE`** | *«Buenas tardes. Presentamos el prototipo internacionalizado de Ernesto Investing AI. Iniciamos en español de Perú (es-PE), observando el formato de precios con moneda USD, variaciones porcentuales de hoy y el gráfico de velas en tiempo real. Navegamos al módulo de Clasificación y luego al de Portafolios.»* |
| **00:30 – 01:00** | Cambio en vivo a **`en-US`** | *(Cambiar el selector de idioma a English)*. *«Cambiamos en vivo a English (en-US). Toda la interfaz se actualiza al instante: los títulos, las tablas y los formatos numéricos adoptan la convención estadounidense ($125,430.50), y la fecha de cierre de mercado se adapta a la zona horaria seleccionada (Nueva York ET).»* |
| **01:00 – 02:00** | Cambio en vivo a **`ar-EG`** (RTL) | *(Cambiar el selector a العربية)*. *«Ahora cambiamos a árabe egipcio (ar-EG). Como observan, el sistema detecta la dirección RTL e invierte fluidamente toda la interfaz de derecha a izquierda: el menú, las tarjetas y las tablas. Los números y precios conservan su sentido LTR mediante el algoritmo bidireccional de Unicode. Noten que el monto de dinero no se convierte a otra divisa, manteniendo la integridad del dato financiero.»* |
| **02:00 – 02:30** | Activación de **`Pseudo`** | *(Marcar el checkbox "Pseudo")*. *«Activamos la pseudolocalización. Las cadenas se expanden un 40% con caracteres diacríticos para simular traducciones largas como el alemán. Gracias al uso de CSS lógico y anchos mínimos elásticos, ningún texto se corta ni genera desbordes horizontales.»* |
| **02:30 – 03:00** | Pantallas de soporte y Cierre | *(Mostrar brevemente perfil.html y acercade.html)*. *«Finalmente, mostramos las nuevas pantallas de perfil, configuración y la declaración de veracidad ética. El código completo y los entregables se encuentran desplegados en GitHub Pages. Muchas gracias.»* |

---

## 📋 PARTE 3: CHECKLIST FINAL DE ENTREGA

- [x] Repositorio GitHub con todo el código fuente sincronizado en `main`.
- [x] Sitio publicado y navegable en **GitHub Pages**.
- [x] Los 8 archivos `.csv` de mediciones del DOM y experimento guardados en la carpeta de entregables.
- [x] El notebook `ejercicio_13_3_analisis_internacionalizacion_EJECUTADO.ipynb` con todas sus salidas visibles.
- [x] Todas las figuras de gráficos (`figuras/`) y capturas de pantalla (`capturas/`) organizadas.
- [ ] Documento del proyecto (10 capítulos) exportado a `.docx` y `.pdf`.
- [ ] Informe breve del laboratorio (máximo 4 páginas) exportado a `.pdf`.
- [ ] Video de 3 minutos grabado y subido (formato `.mp4` o enlace de Drive/YouTube).
