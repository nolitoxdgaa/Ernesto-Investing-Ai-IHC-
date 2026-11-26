/* Ernesto Investing AI - Módulo Optimizador (HTML + JavaScript)
   Markowitz (1952), NSGA-II (2 objetivos) y NSGA-III (3 objetivos con CVaR 95%).
   Datos sintéticos: 12 activos elegibles, restricción de tope de 25% por activo.
   Visualización con ECharts 5.5.1, selección interactiva por teclado/ratón y verificación matemática. */

(function(){
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const isDark = () => {
    const t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  };
  const getThemeColors = () => isDark() ? {
    fg: "#e9eff5", mut: "#aab7c4", bd: "#2c3a49", panel: "#17202b",
    ac: "#7db7ff", up: "#52d18a", dn: "#ff8a80", warn: "#ffcc66",
    cvarRange: ["#52d18a", "#ffcc66", "#ff8a80"]
  } : {
    fg: "#14202e", mut: "#4d5b6b", bd: "#d3dce6", panel: "#ffffff",
    ac: "#0b4f9c", up: "#0a7d3c", dn: "#b3261e", warn: "#8a5a00",
    cvarRange: ["#0a7d3c", "#b58100", "#b3261e"]
  };

  let O, allPoints = [], selId = null, chartInstance = null;

  window.init = async function() {
    O = await loadJSON("07_optimizador_markowitz_nsga.json");

    // Construir lista unificada de puntos de los frentes
    allPoints = [
      ...O.nsga2_elegibles.map(p => ({ ...p, alg: "NSGA-II" })),
      ...O.nsga3_elegibles.map(p => ({ ...p, alg: "NSGA-III" }))
    ];
    selId = allPoints[0].id;

    // Poblar selector
    const selEl = $("#pt");
    selEl.innerHTML = allPoints.map(p => `
      <option value="${p.id}" ${p.id === selId ? "selected" : ""}>
        ${p.id} · ${p.alg} · Ret: ${fmt.n(p.retorno_esperado_anual_pct, 1)} % · Vol: ${fmt.n(p.volatilidad_anual_pct, 1)} % · Sharpe: ${fmt.n(p.sharpe, 2)}
      </option>
    `).join("");

    selEl.addEventListener("change", e => {
      selId = e.target.value;
      renderComposition();
      renderChart();
    });

    // Checkboxes de visibilidad de series
    ["chk-mkw-eleg", "chk-mkw-all", "chk-nsga2", "chk-nsga3"].forEach(id => {
      const el = $("#" + id);
      if (el) el.addEventListener("change", () => renderChart());
    });

    window.onTheme = () => renderChart();
    window.addEventListener("resize", () => {
      if (chartInstance && !chartInstance.isDisposed()) chartInstance.resize();
    });

    renderComposition();
    renderChart();
    renderAccessibleTable();
    window.onLocaleChange = () => { renderComposition(); renderChart(); renderAccessibleTable(); };
  };

  function renderComposition() {
    const p = allPoints.find(x => x.id === selId) || allPoints[0];
    const topLimit = (O.tope_peso_por_activo || 0.25) * 100;

    // Verificar suma de pesos y tope individual
    const pesosEntries = Object.entries(p.pesos || {}).sort((a,b) => b[1] - a[1]);
    const sumPesos = pesosEntries.reduce((acc, curr) => acc + curr[1], 0);
    const sumCheckPassed = Math.abs(sumPesos - 1.0) <= 0.03;
    const maxWeight = Math.max(...pesosEntries.map(e => e[1])) * 100;
    const maxCheckPassed = maxWeight <= (topLimit + 0.5);

    const isGoodReturn = p.retorno_esperado_anual_pct > 0;

    $("#comp").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:start;gap:.5rem">
        <div>
          <h2 style="margin:0 0 .2rem">${p.id} · ${p.alg}</h2>
          <span class="tag" style="border-color:var(--ac);color:var(--ac);font-weight:600">
            Frente Óptimo Multiobjetivo
          </span>
        </div>
        <a href="portafolios.html" class="btn-nav" title="Ver portafolios recomendados en 3 niveles">
          Ver Niveles →
        </a>
      </div>

      <dl class="metrics" style="margin:.8rem 0">
        <dt>Retorno esperado anual</dt>
        <dd style="color:var(${isGoodReturn ? "--up" : "--dn"})">
          ${isGoodReturn ? "+" : ""}${fmt.n(p.retorno_esperado_anual_pct, 2)} %
        </dd>

        <dt>Volatilidad anual (riesgo)</dt>
        <dd>${fmt.n(p.volatilidad_anual_pct, 2)} %</dd>

        <dt>Ratio de Sharpe</dt>
        <dd><strong>${fmt.n(p.sharpe, 3)}</strong></dd>

        <dt>CVaR 95 % diario (pérdida de cola)</dt>
        <dd class="dn">${fmt.n(p.cvar95_diario_pct, 2)} %</dd>
      </dl>

      <h3 style="margin:.8rem 0 .4rem;font-size:.95rem">Composición de Activos (Pesos de Cartera)</h3>
      <div style="margin-bottom:.6rem">
        ${pesosEntries.map(([ticker, w]) => {
          const pctVal = w * 100;
          return `
            <div class="wrow">
              <strong>${ticker}</strong>
              <span class="b" title="${ticker}: ${fmt.n(pctVal, 1)} %">
                <i style="width:${Math.min(100, (pctVal / topLimit) * 100).toFixed(0)}%"></i>
              </span>
              <span>${fmt.n(pctVal, 1)} %</span>
            </div>
          `;
        }).join("")}
      </div>

      <div style="border-top:1px solid var(--bd);padding-top:.5rem;font-size:.8rem" class="mut">
        <p style="margin:0">
          <strong>Restricciones de cartera (Anexo A):</strong><br>
          • Suma de pesos: <strong>${fmt.n(sumPesos * 100, 1)} %</strong> ${sumCheckPassed ? "✅ (∑ ≈ 100%)" : "⚠️"}<br>
          • Tope por activo: <strong>${fmt.n(maxWeight, 1)} %</strong> / límite ${topLimit} % ${maxCheckPassed ? "✅" : "⚠️"}
        </p>
      </div>
    `;

    $("#pt").value = selId;
  }

  function renderChart() {
    const T = getThemeColors();
    const chartDom = $("#chart");
    if (!window.echarts) return;
    if (!chartInstance) chartInstance = echarts.init(chartDom);

    const showMkwEleg = $("#chk-mkw-eleg")?.checked ?? true;
    const showMkwAll  = $("#chk-mkw-all")?.checked ?? true;
    const showNsga2   = $("#chk-nsga2")?.checked ?? true;
    const showNsga3   = $("#chk-nsga3")?.checked ?? true;

    const currentSelected = allPoints.find(x => x.id === selId) || allPoints[0];

    const sortMk = list => [...list].sort((a,b) => a.volatilidad_anual_pct - b.volatilidad_anual_pct)
                                   .map(p => [p.volatilidad_anual_pct, p.retorno_esperado_anual_pct]);

    const cvars = allPoints.map(p => p.cvar95_diario_pct);
    const minCvar = Math.min(...cvars);
    const maxCvar = Math.max(...cvars);

    const series = [];

    // 1. Markowitz 12 elegibles
    if (showMkwEleg) {
      series.push({
        name: "Markowitz (12 elegibles)",
        type: "line",
        data: sortMk(O.markowitz_elegibles),
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 3, color: T.ac },
        itemStyle: { color: T.ac },
        z: 3
      });
    }

    // 2. Markowitz universo completo
    if (showMkwAll) {
      series.push({
        name: "Markowitz (26 activos)",
        type: "line",
        data: sortMk(O.markowitz_universo_completo),
        showSymbol: false,
        smooth: true,
        lineStyle: { width: 2, type: "dashed", color: T.mut },
        itemStyle: { color: T.mut },
        z: 2
      });
    }

    // 3. Frente NSGA-II
    if (showNsga2) {
      series.push({
        name: "NSGA-II (2 obj)",
        type: "scatter",
        symbol: "circle",
        symbolSize: 13,
        z: 5,
        data: O.nsga2_elegibles.map(p => ({
          value: [p.volatilidad_anual_pct, p.retorno_esperado_anual_pct, p.cvar95_diario_pct],
          id: p.id,
          alg: "NSGA-II",
          sharpe: p.sharpe
        })),
        itemStyle: { borderColor: T.panel, borderWidth: 1 }
      });
    }

    // 4. Frente NSGA-III
    if (showNsga3) {
      series.push({
        name: "NSGA-III (3 obj CVaR)",
        type: "scatter",
        symbol: "diamond",
        symbolSize: 13,
        z: 4,
        data: O.nsga3_elegibles.map(p => ({
          value: [p.volatilidad_anual_pct, p.retorno_esperado_anual_pct, p.cvar95_diario_pct],
          id: p.id,
          alg: "NSGA-III",
          sharpe: p.sharpe
        })),
        itemStyle: { borderColor: T.panel, borderWidth: 1 }
      });
    }

    // 5. Marcador del punto seleccionado actualmente
    series.push({
      name: "Punto Seleccionado",
      type: "scatter",
      symbol: "circle",
      symbolSize: 26,
      data: [[currentSelected.volatilidad_anual_pct, currentSelected.retorno_esperado_anual_pct]],
      itemStyle: { color: "transparent", borderColor: T.fg, borderWidth: 3 },
      silent: true,
      z: 10,
      tooltip: { show: false }
    });

    const option = {
      animation: false,
      textStyle: { color: T.fg },
      grid: { left: 60, right: 25, top: 70, bottom: 55 },
      legend: {
        top: 0,
        textStyle: { color: T.fg },
        data: ["Markowitz (12 elegibles)", "Markowitz (26 activos)", "NSGA-II (2 obj)", "NSGA-III (3 obj CVaR)"]
      },
      tooltip: {
        formatter: params => {
          if (params.data && params.data.id) {
            return `
              <strong>${params.data.id} (${params.data.alg})</strong><br>
              Retorno anual: <strong>${fmt.n(params.value[1], 2)} %</strong><br>
              Volatilidad: <strong>${fmt.n(params.value[0], 2)} %</strong><br>
              Sharpe: <strong>${fmt.n(params.data.sharpe, 2)}</strong><br>
              CVaR 95 % diario: <strong>${fmt.n(params.value[2], 2)} %</strong><br>
              <em>Haga clic para ver los pesos del portafolio</em>
            `;
          }
          return `${params.seriesName}<br>Retorno: ${fmt.n(params.value[1], 2)} % · Vol: ${fmt.n(params.value[0], 2)} %`;
        }
      },
      xAxis: {
        type: "value",
        scale: true,
        name: "Volatilidad anual (riesgo %)",
        nameLocation: "middle",
        nameGap: 30,
        axisLabel: { color: T.fg },
        axisLine: { lineStyle: { color: T.bd } },
        splitLine: { lineStyle: { color: T.bd } }
      },
      yAxis: {
        type: "value",
        scale: true,
        name: "Retorno esperado anual (%)",
        nameLocation: "middle",
        nameGap: 42,
        axisLabel: { color: T.fg },
        axisLine: { lineStyle: { color: T.bd } },
        splitLine: { lineStyle: { color: T.bd } }
      },
      visualMap: {
        type: "continuous",
        dimension: 2,
        min: minCvar,
        max: maxCvar,
        seriesIndex: [2, 3], // aplica a NSGA-II y NSGA-III
        orient: "horizontal",
        left: "center",
        top: 28,
        itemWidth: 12,
        itemHeight: 140,
        text: ["CVaR alto", "CVaR bajo"],
        textStyle: { color: T.fg, fontSize: 11 },
        calculable: false,
        inRange: { color: T.cvarRange }
      },
      series: series
    };

    chartInstance.setOption(option, true);

    // Evento click en los puntos
    chartInstance.off("click");
    chartInstance.on("click", params => {
      if (params.data && params.data.id) {
        selId = params.data.id;
        renderComposition();
        renderChart();
      }
    });
  }

  function renderAccessibleTable() {
    const tbl = $("#tbl-opt-points");
    tbl.innerHTML = `
      <caption class="mut" style="text-align:left;padding:.4rem">
        Puntos de las fronteras de Pareto de NSGA-II y NSGA-III. Seleccione cualquier fila para cargar su composición.
      </caption>
      <thead>
        <tr>
          <th scope="col" class="l">ID Portafolio</th>
          <th scope="col" class="l">Algoritmo</th>
          <th scope="col">Retorno anual</th>
          <th scope="col">Volatilidad anual</th>
          <th scope="col">Sharpe</th>
          <th scope="col">CVaR 95 % diario</th>
          <th scope="col" class="l">Top 3 Activos</th>
        </tr>
      </thead>
      <tbody>
        ${allPoints.map(p => {
          const topAssets = Object.entries(p.pesos || {})
            .sort((a,b) => b[1] - a[1])
            .slice(0, 3)
            .map(([t, w]) => `${t} (${fmt.n(w*100, 0)}%)`)
            .join(", ");
          const isSelected = (p.id === selId);
          return `
            <tr tabindex="0" data-id="${p.id}" class="${isSelected ? "sel" : ""}" style="cursor:pointer">
              <th scope="row" class="l"><strong>${p.id}</strong></th>
              <td class="l">${p.alg}</td>
              <td>${fmt.n(p.retorno_esperado_anual_pct, 2)} %</td>
              <td>${fmt.n(p.volatilidad_anual_pct, 2)} %</td>
              <td><strong>${fmt.n(p.sharpe, 3)}</strong></td>
              <td class="dn">${fmt.n(p.cvar95_diario_pct, 2)} %</td>
              <td class="l"><small>${topAssets}</small></td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;

    tbl.querySelectorAll("tbody tr").forEach(tr => {
      const select = () => {
        selId = tr.dataset.id;
        renderComposition();
        renderChart();
        renderAccessibleTable();
      };
      tr.addEventListener("click", select);
      tr.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          select();
        }
      });
    });
  }
})();
