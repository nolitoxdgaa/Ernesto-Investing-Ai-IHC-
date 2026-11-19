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
