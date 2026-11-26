# 📦 Índice de Entregables y Enlaces Oficiales — Semana 13 (i18n / l10n)
### Curso: Interacción Hombre-Computador (IHC 202W0606) · Semestre 2026-2
**Docente:** Prof. Mg. Ing. Ernesto D. Cancho-Rodríguez, MBA (GWU)

---

## 🌐 1. Enlaces del Proyecto Publicado

| Entregable | Enlace / URL | Estado |
|---|---|---|
| **Repositorio GitHub** | [https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-](https://github.com/nolitoxdgaa/Ernesto-Investing-Ai-IHC-) | Activo y sincronizado (Branch `main`) |
| **Sitio Web Publicado (GitHub Pages)** | [https://nolitoxdgaa.github.io/Ernesto-Investing-Ai-IHC-/](https://nolitoxdgaa.github.io/Ernesto-Investing-Ai-IHC-/) | Activo (HTTPS) |
| **Prototipo Figma** | [https://tame-wifi-31309741.figma.site](https://tame-wifi-31309741.figma.site) | Activo |

---

## 📊 2. Archivos de Datos Generados (.CSV)

Todos ubicados en la carpeta `entregables_generados/` y en `docs/s13_entregables/`:

1. **`ejercicio_13_1_codificaciones_grupo.csv`**
   - Mediciones de puntos de código Unicode, unidades UTF-16, grafemas y bytes UTF-8/UTF-16 en cadenas de español, japonés, árabe, portugués y emojis con modificadores.
2. **`ejercicio_13_2_auditoria_i18n_grupo.csv`**
   - 14 mediciones completas de auditoría del DOM comparando la Versión A (con errores) y la Versión B (internacionalizada) en `es-PE`, `en-US`, `qu-PE`, `ar-EG` y `ja-JP`, más pruebas de pseudolocalización.
3. **`medicion_truncados_desbordes_antes_despues.csv`**
   - Tabla comparativa de truncados (de 58 a 0) y desbordes (de 2 a 0) antes y después de aplicar CSS lógico y contenedores elásticos.
4. **`ejercicio_13_3_experimento_formatos_G3-01.csv`**
5. **`ejercicio_13_3_experimento_formatos_G3-02.csv`**
6. **`ejercicio_13_3_experimento_formatos_G3-03.csv`**
7. **`ejercicio_13_3_experimento_formatos_G3-04.csv`**
   - Respuestas individuales de los 4 participantes humanos del grupo (16 ítems en orden contrabalanceado con tiempos y nivel de confianza).
8. **`ejercicio_13_3_experimento_CONSOLIDADO_GRUPO.csv`**
   - Dataset consolidado (64 respuestas) utilizado para el análisis inferencial en el notebook.
9. **`auditoria_i18n_sitios_reales.csv`**
   - Auditoría de los 14 sitios financieros reales (7 de Perú y 7 internacionales).

---

## 📓 3. Cuaderno de Análisis Ejecutado (.IPYNB)

* **`ejercicio_13_3_analisis_internacionalizacion_EJECUTADO.ipynb`**
  - Cuaderno Jupyter completamente ejecutado con todos sus outputs, conteos de ejecución, tablas consolidadas, figuras en alta resolución y conclusiones analíticas redactadas en la celda 10.
  - Se puede abrir en Google Colab o Jupyter local.

---

## 🖼️ 4. Gráficos y Evidencias Visuales

### Figuras de Análisis Estadístico (`figuras/`):
- **`S13_fig_puntaje_i18n.png`**: Gráfico de barras horizontales comparando el puntaje heurístico de los 14 sitios (Perú 5.0 vs Internacional 6.0).
- **`S13_fig_truncados_AB.png`**: Comparación de elementos truncados en el DOM por idioma (Versión A vs Versión B).
- **`S13_fig_aciertos_AB.png`**: Proporción de aciertos con intervalos de confianza del 95% (Wald ajustado / Agresti–Coull).

### Capturas del Sistema y Pruebas (`capturas/`):
- `S13_captura_13_1.png`: Inspector de codificaciones y mojibake.
- `S13_captura_13_2_A_es-PE.png` / `S13_captura_13_2_B_es-PE.png`: Portal en español (con errores vs corregido).
- `S13_captura_13_2_A_ar-EG.png` / `S13_captura_13_2_B_ar-EG.png`: Portal en árabe (sin RTL vs con RTL correcto).
- `S13_captura_13_2_A_en-US.png` / `S13_captura_13_2_A_ja-JP.png` / `S13_captura_13_2_A_qu-PE.png`: Mediciones en inglés, japonés y quechua.
- `S13_captura_13_2_B_en-US_pseudo.png`: Prueba de pseudolocalización (+40% expansión sin desbordes).
- `S13_captura_13_2_B_movil.png`: Comprobación responsive en viewport móvil de 375 px (sin scroll horizontal).
- `S13_captura_13_3_inicio.png` / `S13_captura_13_3_resultado.png`: Pantallas de consentimiento y resultados del experimento.
