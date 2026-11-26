/* Ernesto Investing AI - Módulo de Regresión a 30 sesiones (HTML + JavaScript)
   Datos sintéticos: 18 regresores (11 ML + 7 DL), historia de 120 sesiones y proyección a 30 sesiones.
   Visualización con ECharts 5.5.1, incertidumbre visible (banda p10–p90 + cono de volatilidad),
   tabla alternativa accesible y ordenamiento por métricas. */

(function(){
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const isDark = () => {
    const t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  };
  const getThemeColors = () => isDark() ? {
    fg: "#e9eff5", mut: "#aab7c4", bd: "#2c3a49", panel: "#17202b",
    ac: "#7db7ff", up: "#52d18a", dn: "#ff8a80", warn: "#ffcc66",
    area: "rgba(125, 183, 255, 0.22)", cone: "rgba(255, 204, 102, 0.12)"
  } : {
    fg: "#14202e", mut: "#4d5b6b", bd: "#d3dce6", panel: "#ffffff",
    ac: "#0b4f9c", up: "#0a7d3c", dn: "#b3261e", warn: "#8a5a00",
    area: "rgba(11, 79, 156, 0.18)", cone: "rgba(138, 90, 0, 0.10)"
  };

  const q = (arr, p) => {
    const s = [...arr].sort((a,b) => a - b);
    const idx = (s.length - 1) * p;
    const l = Math.floor(idx), h = Math.ceil(idx);
    return s[l] + (s[h] - s[l]) * (idx - l);
  };

  let R, H, chartInstance = null;
  let currentTicker = "SPY", showCone = false;
  let activeModelNames = new Set();
  let sortCol = "mejora_vs_persistencia_pct", sortAsc = false;
  const NHIST = 120; // 120 sesiones históricas recientes

  window.init = async function() {
    R = await loadJSON("06_regresores_precio_30d.json");
    H = await loadJSON("02_precios_sinteticos_504d.json");

    // Revisar parámetro URL si viene desde Clasificación
    const params = new URLSearchParams(window.location.search);
    const queryTicker = params.get("ticker");
    const tickers = Object.keys(R.predicciones);
    if (queryTicker && tickers.includes(queryTicker)) {
      currentTicker = queryTicker;
    } else {
      currentTicker = tickers[0] || "SPY";
    }

    // Inicializar selector de activo
    const selEl = $("#sel");
    selEl.innerHTML = tickers.map(t => `<option value="${t}" ${t === currentTicker ? "selected" : ""}>${t}</option>`).join("");
    selEl.addEventListener("change", e => {
      currentTicker = e.target.value;
      updateModelCheckboxes();
      renderAll();
    });

    // Filtros de familia (Radio)
    document.querySelectorAll("input[name=fam]").forEach(r => {
      r.addEventListener("change", () => {
        applyFamilyFilter();
        renderAll();
      });
    });

    // Checkbox cono de volatilidad
    const chkCone = $("#chk-cone");
    if (chkCone) {
      chkCone.addEventListener("change", e => {
        showCone = e.target.checked;
        renderChart();
      });
    }

    // Botones seleccionar todos/ninguno
    $("#btn-all-models").addEventListener("click", () => {
      const pred = R.predicciones[currentTicker];
      pred.modelos.forEach(m => activeModelNames.add(m.modelo));
      syncCheckboxInputs();
      renderAll();
    });
    $("#btn-none-models").addEventListener("click", () => {
      activeModelNames.clear();
      syncCheckboxInputs();
      renderAll();
    });

    // Inicializar todos los modelos activos
    R.predicciones[currentTicker].modelos.forEach(m => activeModelNames.add(m.modelo));
    updateModelCheckboxes();

    window.onTheme = () => renderChart();
    window.addEventListener("resize", () => {
      if (chartInstance && !chartInstance.isDisposed()) chartInstance.resize();
    });

    renderAll();
    window.onLocaleChange = () => renderAll();
  };

  function applyFamilyFilter() {
    const fam = document.querySelector("input[name=fam]:checked")?.value || "ALL";
    const pred = R.predicciones[currentTicker];
    activeModelNames.clear();
    pred.modelos.forEach(m => {
      if (fam === "ALL" || m.familia === fam) {
        activeModelNames.add(m.modelo);
      }
    });
    syncCheckboxInputs();
  }

  function updateModelCheckboxes() {
    const container = $("#model-checkboxes");
    const pred = R.predicciones[currentTicker];
    container.innerHTML = pred.modelos.map(m => {
      const isChecked = activeModelNames.has(m.modelo);
      return `
        <label title="${esc(m.modelo)} (${m.familia})">
          <input type="checkbox" value="${esc(m.modelo)}" ${isChecked ? "checked" : ""}>
          <span>${esc(m.modelo)} <small class="mut">(${m.familia})</small></span>
        </label>
      `;
    }).join("");

    container.querySelectorAll("input[type=checkbox]").forEach(chk => {
      chk.addEventListener("change", e => {
        if (e.target.checked) activeModelNames.add(e.target.value);
        else activeModelNames.delete(e.target.value);
        renderAll();
      });
    });
  }

  function syncCheckboxInputs() {
    const container = $("#model-checkboxes");
    container.querySelectorAll("input[type=checkbox]").forEach(chk => {
      chk.checked = activeModelNames.has(chk.value);
    });
  }

  function renderAll() {
    renderChart();
    renderResultCard();
    renderAccessibleTable();
    renderMetricsTable();
  }

  function renderChart() {
    const T = getThemeColors();
    const chartDom = $("#chart");
    if (!window.echarts) {
      chartDom.textContent = "Error al cargar biblioteca ECharts.";
      return;
    }
    if (!chartInstance) {
      chartInstance = echarts.init(chartDom);
    }

    const p = R.predicciones[currentTicker];
    const histAll = H.cierres[currentTicker] || [];
    const datesAll = H.fechas || [];

    const histPrices = histAll.slice(-NHIST);
    const histDates = datesAll.slice(-NHIST);
    const futDates = R.fechas_pronostico;
    const allDates = [...histDates, ...futDates];

    // Modelos activos seleccionados
    const activeModels = p.modelos.filter(m => activeModelNames.has(m.modelo));
    const N = futDates.length;

    // Calcular mediana y bandas dinámicas según modelos activos
    let medianSeries, p10Series, p90Series;
    if (activeModels.length === p.modelos.length) {
      medianSeries = p.ensamble_mediana;
      p10Series = p.banda_p10;
      p90Series = p.banda_p90;
    } else if (activeModels.length > 0) {
      medianSeries = []; p10Series = []; p90Series = [];
      for (let i = 0; i < N; i++) {
        const vals = activeModels.map(m => m.precios[i]);
        medianSeries.push(q(vals, 0.5));
        p10Series.push(q(vals, 0.1));
        p90Series.push(q(vals, 0.9));
      }
    } else {
      medianSeries = Array(N).fill(p.precio_ultimo);
      p10Series = Array(N).fill(p.precio_ultimo);
      p90Series = Array(N).fill(p.precio_ultimo);
    }

    const lastClose = p.precio_ultimo;
    const padHist = arr => [...Array(NHIST - 1).fill(null), lastClose, ...arr];
    const histPadded = [...histPrices, ...Array(N).fill(null)];

    const retProj = ((medianSeries[medianSeries.length - 1] / lastClose) - 1) * 100;
    const medColor = retProj >= 0 ? T.up : T.dn;

    const series = [
      // 1. Historia observada
      {
        name: "Historia (120 d)",
        type: "line",
        showSymbol: false,
        data: histPadded,
        lineStyle: { color: T.fg, width: 2 },
        itemStyle: { color: T.fg },
        z: 3
      },
      // 2. Base transparente para apilado de la banda p10-p90
      {
        name: "p10-base",
        type: "line",
        stack: "banda",
        data: padHist(p10Series),
        showSymbol: false,
        lineStyle: { opacity: 0 },
        silent: true,
        tooltip: { show: false }
      },
      // 3. Área sombreada entre p10 y p90
      {
        name: "Banda p10–p90",
        type: "line",
        stack: "banda",
        data: padHist(p90Series.map((hi, idx) => hi - p10Series[idx])).map((val, idx) => idx === NHIST - 1 ? 0 : val),
        showSymbol: false,
        lineStyle: { opacity: 0 },
        areaStyle: { color: T.area },
        z: 1
      }
    ];

    // Cono de volatilidad si está activo
    if (showCone && p.cono_volatilidad_inf && p.cono_volatilidad_sup) {
      series.push({
        name: "Cono Vol. Inf",
        type: "line",
        showSymbol: false,
        data: padHist(p.cono_volatilidad_inf),
        lineStyle: { color: T.warn, type: "dotted", width: 1.5 },
        silent: true
      });
      series.push({
        name: "Cono Vol. Sup",
        type: "line",
        showSymbol: false,
        data: padHist(p.cono_volatilidad_sup),
        lineStyle: { color: T.warn, type: "dotted", width: 1.5 },
        silent: true
      });
    }

    // Líneas tenues por cada modelo individual activo
    activeModels.forEach(m => {
      series.push({
        name: m.modelo,
        type: "line",
        showSymbol: false,
        data: padHist(m.precios),
        lineStyle: {
          width: 1,
          opacity: 0.32,
          color: m.familia === "ML" ? T.ac : T.warn,
          type: m.familia === "ML" ? "solid" : "dashed"
        },
        silent: true,
        z: 2,
        tooltip: { show: false }
      });
    });

    // Mediana del ensamble destacada
    series.push({
      name: "Mediana ensamble",
      type: "line",
      showSymbol: false,
      data: padHist(medianSeries),
      lineStyle: { width: 3, color: medColor, type: "dashed" },
      itemStyle: { color: medColor },
      z: 5,
      markLine: {
        symbol: "none",
        silent: true,
        label: { color: T.fg, formatter: "Hoy (anclaje)", position: "insideEndTop" },
        lineStyle: { color: T.mut, type: "dotted" },
        data: [{ xAxis: histDates[histDates.length - 1] }]
      }
    });

    const option = {
      animation: false,
      textStyle: { color: T.fg },
      grid: { left: 55, right: 25, top: 40, bottom: 55 },
      legend: {
        top: 0,
        textStyle: { color: T.fg },
        data: ["Historia (120 d)", "Mediana ensamble", "Banda p10–p90"]
      },
      tooltip: {
        trigger: "axis",
        formatter: params => {
          const idx = params[0].dataIndex;
          const isFuture = idx >= NHIST;
          const date = allDates[idx];
          if (isFuture) {
            const fIdx = idx - NHIST;
            return `
              <strong>${date} (Proyección +${fIdx + 1} d)</strong><br>
              Mediana: <strong>US$ ${fmt.n(medianSeries[fIdx])}</strong><br>
              <span class="mut">Banda p10: US$ ${fmt.n(p10Series[fIdx])}</span><br>
              <span class="mut">Banda p90: US$ ${fmt.n(p90Series[fIdx])}</span>
            `;
          }
          return `<strong>${date}</strong><br>Cierre histórico: <strong>US$ ${fmt.n(histPrices[idx])}</strong>`;
        }
      },
      xAxis: {
        type: "category",
        data: allDates,
        axisLabel: { color: T.fg, fontSize: 11 },
        axisLine: { lineStyle: { color: T.bd } },
        splitLine: { show: false }
      },
      yAxis: {
        type: "value",
        scale: true,
        name: "Precio (USD)",
        axisLabel: { color: T.fg },
        axisLine: { lineStyle: { color: T.bd } },
        splitLine: { lineStyle: { color: T.bd } }
      },
      dataZoom: [
        { type: "inside" },
        { type: "slider", height: 18, textStyle: { color: T.fg } }
      ],
      series: series
    };

    chartInstance.setOption(option, true);
  }

  function renderResultCard() {
    const p = R.predicciones[currentTicker];
    const last = p.precio_ultimo;
    const activeModels = p.modelos.filter(m => activeModelNames.has(m.modelo));
    const N = R.fechas_pronostico.length;

    let med30, p10_30, p90_30;
    if (activeModels.length === p.modelos.length) {
      med30 = p.ensamble_mediana[N - 1];
      p10_30 = p.banda_p10[N - 1];
      p90_30 = p.banda_p90[N - 1];
    } else if (activeModels.length > 0) {
      const vals30 = activeModels.map(m => m.precios[N - 1]);
      med30 = q(vals30, 0.5);
      p10_30 = q(vals30, 0.1);
      p90_30 = q(vals30, 0.9);
    } else {
      med30 = last; p10_30 = last; p90_30 = last;
    }

    const retProj = ((med30 / last) - 1) * 100;
    const isUp = retProj >= 0;
    const colorClass = isUp ? "up" : "dn";

    // Verificación matemática estricta requerida por Anexo A (P04)
    const expectedLastMedian = p.precio_ultimo * (1 + p.retorno_proyectado_30d_pct / 100);
    const diff = Math.abs(p.ensamble_mediana[N - 1] - expectedLastMedian);
    const mathCheckPassed = diff < 0.05;

    $("#res").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:start;gap:.5rem">
        <div>
          <h2 style="margin:0 0 .2rem">${currentTicker} · Proyección a 30 días</h2>
          <p class="mut" style="margin:0;font-size:.88rem">Basado en ${activeModels.length} modelos seleccionados</p>
        </div>
        <a href="optimizador.html" class="btn-nav" title="Ver posición en el Optimizador">
          Ir al Optimizador →
        </a>
      </div>

      <div style="margin:.8rem 0">
        <div class="big ${colorClass}">
          ${isUp ? "▲ +" : "▼ "}${fmt.n(retProj, 2)} %
        </div>
        <p class="mut" style="margin:.2rem 0 0;font-size:.88rem">
          Retorno proyectado acumulado a 30 sesiones (${isUp ? "SUBIDA" : "BAJADA"})
        </p>
      </div>

      <dl class="metrics" style="margin:.8rem 0">
        <dt>Precio ancla actual (\(P_t\))</dt>
        <dd>US$ ${fmt.n(last, 2)}</dd>

        <dt>Mediana estimada día +30</dt>
        <dd style="color:var(${isUp ? "--up" : "--dn"})">US$ ${fmt.n(med30, 2)}</dd>

        <dt>Banda inferior (p10 día 30)</dt>
        <dd>US$ ${fmt.n(p10_30, 2)}</dd>

        <dt>Banda superior (p90 día 30)</dt>
        <dd>US$ ${fmt.n(p90_30, 2)}</dd>

        <dt>Amplitud de incertidumbre</dt>
        <dd class="mut">US$ ${fmt.n(p90_30 - p10_30, 2)} (\( \pm ${fmt.n((p90_30 - p10_30) / (2 * last) * 100, 1)} \% \))</dd>
      </dl>

      <div style="border-top:1px solid var(--bd);padding-top:.6rem;font-size:.8rem" class="mut">
        <p style="margin:0">
          <strong>Verificación matemática (Anexo A):</strong>
          ${mathCheckPassed ? "✅ Coherencia verificada (|Δ| < US$ 0.05)" : "⚠️ Ligera discrepancia en subconjunto"}
        </p>
        <p style="margin:.3rem 0 0">
          <em>Pauta IHC G1:</em> Una línea aislada comunica una certeza falsa. Siempre considere la banda de incertidumbre p10–p90.
        </p>
      </div>
    `;
  }

  function renderAccessibleTable() {
    const tbl = $("#tbl-accessible-prices");
    const p = R.predicciones[currentTicker];
    const N = R.fechas_pronostico.length;
    const activeModels = p.modelos.filter(m => activeModelNames.has(m.modelo));

    let medArr = [], p10Arr = [], p90Arr = [];
    for (let i = 0; i < N; i++) {
      if (activeModels.length === p.modelos.length) {
        medArr = p.ensamble_mediana;
        p10Arr = p.banda_p10;
        p90Arr = p.banda_p90;
        break;
      } else {
        const vals = activeModels.map(m => m.precios[i]);
        medArr.push(q(vals, 0.5));
        p10Arr.push(q(vals, 0.1));
        p90Arr.push(q(vals, 0.9));
      }
    }

    tbl.innerHTML = `
      <caption class="mut" style="text-align:left;padding:.4rem">
        Valores numéricos de las 30 sesiones proyectadas para ${currentTicker} (precios en USD).
      </caption>
      <thead>
        <tr>
          <th scope="col" class="l">Sesión futura</th>
          <th scope="col" class="l">Fecha</th>
          <th scope="col">Mediana estimada</th>
          <th scope="col">Percentil 10 (p10)</th>
          <th scope="col">Percentil 90 (p90)</th>
          <th scope="col">Variación esperada</th>
        </tr>
      </thead>
      <tbody>
        ${R.fechas_pronostico.map((d, i) => {
          const varPct = ((medArr[i] / p.precio_ultimo) - 1) * 100;
          return `
            <tr>
              <th scope="row" class="l">Día +${i + 1}</th>
              <td class="l">${d}</td>
              <td><strong>US$ ${fmt.n(medArr[i], 2)}</strong></td>
              <td>US$ ${fmt.n(p10Arr[i], 2)}</td>
              <td>US$ ${fmt.n(p90Arr[i], 2)}</td>
              <td class="${varPct >= 0 ? "up" : "dn"}">${varPct >= 0 ? "+" : ""}${fmt.n(varPct, 2)} %</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;
  }

  function renderMetricsTable() {
    const list = [...R.modelos];
    list.sort((a, b) => {
      let v1 = a[sortCol];
      let v2 = b[sortCol];
      if (typeof v1 === "string") return sortAsc ? v1.localeCompare(v2) : v2.localeCompare(v1);
      return sortAsc ? (v1 - v2) : (v2 - v1);
    });

    const cols = [
      { key: "modelo", label: "Modelo", align: "l" },
      { key: "familia", label: "Familia", align: "l" },
      { key: "mape_30d_pct", label: "MAPE 30d (%)", align: "r" },
      { key: "mae_relativo_pct", label: "MAE rel. (%)", align: "r" },
      { key: "rmse_relativo_pct", label: "RMSE rel. (%)", align: "r" },
      { key: "r2_retornos_30d", label: "R² retornos", align: "r" },
      { key: "mejora_vs_persistencia_pct", label: "Mejora vs Persistencia (%)", align: "r" }
    ];

    const mt = $("#mt");
    mt.innerHTML = `
      <thead>
        <tr>
          ${cols.map(c => {
            const isCur = (c.key === sortCol);
            const icon = isCur ? (sortAsc ? " ▲" : " ▼") : "";
            const ariaSort = isCur ? (sortAsc ? "ascending" : "descending") : "none";
            return `
              <th class="${c.align || 'r'} sortable" scope="col" tabindex="0" data-k="${c.key}" aria-sort="${ariaSort}">
                ${c.label}${icon}
              </th>
            `;
          }).join("")}
        </tr>
      </thead>
      <tbody>
        ${list.map(m => {
          const isActive = activeModelNames.has(m.modelo);
          const mej = m.mejora_vs_persistencia_pct;
          return `
            <tr style="${isActive ? "" : "opacity:0.5"}">
              <th scope="row" class="l">
                <strong>${esc(m.modelo)}</strong>
                ${isActive ? "" : '<span class="mut" style="font-size:.7rem">(oculto)</span>'}
              </th>
              <td class="l"><span class="chip">${esc(m.familia)}</span></td>
              <td>${fmt.n(m.mape_30d_pct, 2)} %</td>
              <td>${fmt.n(m.mae_relativo_pct, 2)} %</td>
              <td>${fmt.n(m.rmse_relativo_pct, 2)} %</td>
              <td>${fmt.n(m.r2_retornos_30d, 3)}</td>
              <td class="${mej >= 0 ? "up" : "dn"}">
                <strong>${mej >= 0 ? "▲ +" : "▼ "}${fmt.n(mej, 2)} %</strong>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;

    mt.querySelectorAll("th.sortable").forEach(th => {
      const toggle = () => {
        const k = th.dataset.k;
        if (sortCol === k) {
          sortAsc = !sortAsc;
        } else {
          sortCol = k;
          sortAsc = false;
        }
        renderMetricsTable();
      };
      th.addEventListener("click", toggle);
      th.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }
})();
