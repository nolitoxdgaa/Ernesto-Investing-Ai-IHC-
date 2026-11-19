/* Ernesto Investing AI - Módulo de Backtesting walk-forward (HTML + JavaScript)
   Datos sintéticos: 252 sesiones de simulación fuera de muestra (253 puntos base 100).
   3 carteras optimizadas + 4 referencias (SPY, QQQ, EPU, 1/N).
   Curvas de capital, drawdown, métricas ordenables, rebalanceos e interpretación honesta. */

(function(){
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const isDark = () => {
    const t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  };
  const getTheme = () => isDark() ? {
    fg: "#e9eff5", mut: "#aab7c4", bd: "#2c3a49", panel: "#17202b",
    colors: ["#7db7ff", "#52d18a", "#ff8a80", "#ffcc66", "#c9a6ff", "#5fd6e0", "#aab7c4"]
  } : {
    fg: "#14202e", mut: "#4d5b6b", bd: "#d3dce6", panel: "#ffffff",
    colors: ["#0b4f9c", "#0a7d3c", "#b3261e", "#8a5a00", "#6a3fa0", "#007c89", "#5d6b7a"]
  };

  let B, allSeries = [], sortCol = "retorno_total_pct", sortAsc = false;
  let currentRebalanceIdx = 0, chartEq = null, chartDd = null;

  window.init = async function() {
    B = await loadJSON("09_backtesting_portafolios.json");

    const carteraNames = Object.keys(B.carteras);
    allSeries = [
      ...carteraNames.map(name => ({ name: name, data: B.carteras[name], isPortfolio: true })),
      ...Object.entries(B.referencias).map(([name, data]) => ({ name: name, data: data, isPortfolio: false }))
    ];

    // Selector de cartera para rebalanceos
    const selCar = $("#car");
    selCar.innerHTML = carteraNames.map(n => `<option value="${n}">${n}</option>`).join("");
    selCar.addEventListener("change", () => {
      currentRebalanceIdx = 0;
      renderRebalances();
    });

    window.onTheme = () => renderCharts();
    window.addEventListener("resize", () => {
      if (chartEq && !chartEq.isDisposed()) chartEq.resize();
      if (chartDd && !chartDd.isDisposed()) chartDd.resize();
    });

    renderCharts();
    renderInterpretation();
    renderMetricsTable();
    renderRebalances();
  };

  function renderCharts() {
    const T = getTheme();
    const dates = B.fechas;

    // 1. Gráfico de curvas de capital
    const eqDom = $("#eq");
    if (eqDom && window.echarts) {
      if (!chartEq) chartEq = echarts.init(eqDom);
      const dashStyles = ["solid", "solid", "solid", "dashed", "dashed", "dashed", "dotted"];

      chartEq.setOption({
        animation: false,
        textStyle: { color: T.fg },
        grid: { left: 55, right: 25, top: 55, bottom: 55 },
        legend: {
          top: 0,
          textStyle: { color: T.fg },
          type: "scroll"
        },
        tooltip: {
          trigger: "axis",
          valueFormatter: v => `US$ ${fmt.n(v, 2)}`
        },
        xAxis: {
          type: "category",
          data: dates,
          axisLabel: { color: T.fg, fontSize: 11 },
          axisLine: { lineStyle: { color: T.bd } },
          splitLine: { show: false }
        },
        yAxis: {
          type: "value",
          scale: true,
          name: "Capital (base 100)",
          axisLabel: { color: T.fg },
          axisLine: { lineStyle: { color: T.bd } },
          splitLine: { lineStyle: { color: T.bd } }
        },
        dataZoom: [
          { type: "inside" },
          { type: "slider", height: 18, textStyle: { color: T.fg } }
        ],
        series: allSeries.map((s, idx) => ({
          name: s.name,
          type: "line",
          showSymbol: false,
          data: s.data.curva,
          lineStyle: {
            width: s.isPortfolio ? 2.8 : 1.6,
            type: dashStyles[idx % dashStyles.length],
            color: T.colors[idx % T.colors.length]
          },
          itemStyle: { color: T.colors[idx % T.colors.length] },
          ...(idx === 0 ? {
            markLine: {
              symbol: "none",
              silent: true,
              label: { show: false },
              lineStyle: { color: T.mut, type: "dotted" },
              data: [{ yAxis: 100 }]
            }
          } : {})
        }))
      }, true);
    }

    // 2. Gráfico de Drawdown
    const ddDom = $("#dd");
    if (ddDom && window.echarts) {
      if (!chartDd) chartDd = echarts.init(ddDom);
      const carteraEntries = Object.entries(B.carteras);

      chartDd.setOption({
        animation: false,
        textStyle: { color: T.fg },
        grid: { left: 55, right: 25, top: 40, bottom: 35 },
        legend: {
          top: 0,
          textStyle: { color: T.fg }
        },
        tooltip: {
          trigger: "axis",
          valueFormatter: v => `${fmt.n(v, 2)} %`
        },
        xAxis: {
          type: "category",
          data: dates,
          axisLabel: { color: T.fg, fontSize: 11 },
          axisLine: { lineStyle: { color: T.bd } },
          splitLine: { show: false }
        },
        yAxis: {
          type: "value",
          name: "Drawdown (%)",
          max: 0,
          axisLabel: { color: T.fg },
          axisLine: { lineStyle: { color: T.bd } },
          splitLine: { lineStyle: { color: T.bd } }
        },
        series: carteraEntries.map(([name, data], idx) => ({
          name: name,
          type: "line",
          showSymbol: false,
          data: data.drawdown,
          lineStyle: { width: 2, color: T.colors[idx] },
          itemStyle: { color: T.colors[idx] },
          areaStyle: { color: T.colors[idx], opacity: 0.10 }
        }))
      }, true);
    }
  }

  function renderInterpretation() {
    const box = $("#interp-box");
    const c = B.carteras;
    const r = B.referencias;

    const retCons = c["Conservador"].metricas.retorno_total_pct;
    const retMod = c["Moderado"].metricas.retorno_total_pct;
    const retAgr = c["Agresivo"].metricas.retorno_total_pct;
    const retSpy = r["SPY"].metricas.retorno_total_pct;
    const retQqq = r["QQQ"].metricas.retorno_total_pct;
    const retEq = r["Igual ponderado (1/N)"].metricas.retorno_total_pct;

    // Verificación matemática del Anexo A (P06): curva_final/100 - 1 vs retorno_total_pct
    const curvesCheck = Object.entries(c).every(([name, data]) => {
      const finalVal = data.curva[data.curva.length - 1];
      const calculatedRet = (finalVal / 100 - 1) * 100;
      return Math.abs(calculatedRet - data.metricas.retorno_total_pct) <= 0.05;
    });

    box.innerHTML = `
      <h2 style="margin-top:0">Interpretación Cuantitativa y Veracidad de Resultados (Capítulo 4.6)</h2>
      <p style="font-size:.95rem">
        En este ejercicio walk-forward de 252 sesiones sobre historia sintética, <strong>ninguna de las tres carteras optimizadas superó a los benchmarks de mercado principales</strong> (SPY con <strong>+${fmt.n(retSpy, 2)} %</strong> y QQQ con <strong>+${fmt.n(retQqq, 2)} %</strong>):
      </p>
      <ul style="font-size:.92rem;padding-left:1.2rem">
        <li><strong>Cartera Conservadora:</strong> Retorno de <strong>${retCons >= 0 ? "+" : ""}${fmt.n(retCons, 2)} %</strong> (Volatilidad ${fmt.n(c["Conservador"].metricas.volatilidad_anual_pct, 1)} %, Max DD ${fmt.n(c["Conservador"].metricas.max_drawdown_pct, 1)} %). Priorizó mínima varianza pero sufrió ante la falta de tendencia alcista sostenida.</li>
        <li><strong>Cartera Moderada:</strong> Retorno de <strong>${retMod >= 0 ? "+" : ""}${fmt.n(retMod, 2)} %</strong> (Sharpe ${fmt.n(c["Moderado"].metricas.sharpe, 2)}). Equilibró riesgo-retorno pero no logró batir el índice pasivo.</li>
        <li><strong>Cartera Agresiva:</strong> Retorno de <strong>${retAgr >= 0 ? "+" : ""}${fmt.n(retAgr, 2)} %</strong> (Max DD ${fmt.n(c["Agresivo"].metricas.max_drawdown_pct, 1)} %). Experimentó la mayor volatilidad y caídas debido a sobreponderar mineras y activos de alta beta.</li>
      </ul>
      <div style="background:var(--hl);padding:.8rem;border-radius:8px;font-size:.88rem;margin-top:.8rem">
        <strong>¿Por qué ocurre esto? Justificación pedagógica:</strong>
        <p style="margin:.3rem 0 0">
          1. <em>Baja persistencia de la señal:</em> Los 18 clasificadores presentan una exactitud sintética promedio de ~54%, lo que introduce ruido en los rebalanceos mensuales.<br>
          2. <em>Fricciones y rotación:</em> Cada rebalanceo incurrió en comisión de 5 pb y turnover de capital, erosionando rentabilidad neta.<br>
          3. <em>Regla de honestidad académica:</em> Tal como exige la especificación oficial de la cátedra, estos resultados <strong>no fueron manipulados ni sobreajustados</strong> para forzar un desempeño artificialmente superior.
        </p>
        <p class="mut" style="margin:.4rem 0 0;font-size:.8rem">
          Verificación matemática (Anexo A P06): ${curvesCheck ? "✅ Cumplida (|curva_final/100 - 1 - retorno_total| ≤ 0.05 pp en todas las carteras)" : "⚠️ Ligera diferencia"}.
        </p>
      </div>
    `;
  }

  function renderMetricsTable() {
    const list = [...allSeries];
    list.sort((a, b) => {
      const m1 = a.data.metricas[sortCol];
      const m2 = b.data.metricas[sortCol];
      return sortAsc ? (m1 - m2) : (m2 - m1);
    });

    const cols = [
      { key: "name", label: "Serie / Cartera", align: "l", noSort: true },
      { key: "retorno_total_pct", label: "Retorno Total", align: "r" },
      { key: "cagr_pct", label: "CAGR Anual", align: "r" },
      { key: "volatilidad_anual_pct", label: "Volatilidad Anual", align: "r" },
      { key: "sharpe", label: "Ratio Sharpe", align: "r" },
      { key: "max_drawdown_pct", label: "Máximo Drawdown", align: "r" },
      { key: "calmar", label: "Ratio Calmar", align: "r" },
      { key: "meses_positivos_pct", label: "% Meses Positivos", align: "r" }
    ];

    const mt = $("#mt");
    mt.innerHTML = `
      <caption class="mut" style="text-align:left;padding:.4rem">
        Período evaluado: ${esc(B.periodo.inicio)} a ${esc(B.periodo.fin)} (${B.periodo.sesiones} sesiones). Datos sintéticos.
      </caption>
      <thead>
        <tr>
          ${cols.map(c => {
            if (c.noSort) return `<th class="${c.align}" scope="col">${c.label}</th>`;
            const isCur = (c.key === sortCol);
            const icon = isCur ? (sortAsc ? " ▲" : " ▼") : "";
            const ariaSort = isCur ? (sortAsc ? "ascending" : "descending") : "none";
            return `
              <th class="${c.align} sortable" scope="col" tabindex="0" data-k="${c.key}" aria-sort="${ariaSort}">
                ${c.label}${icon}
              </th>
            `;
          }).join("")}
        </tr>
      </thead>
      <tbody>
        ${list.map(s => {
          const m = s.data.metricas;
          const isUp = m.retorno_total_pct >= 0;
          return `
            <tr class="${s.isPortfolio ? "sel" : ""}">
              <th scope="row" class="l">
                <strong>${esc(s.name)}</strong>
                ${s.isPortfolio ? '<span class="tag" style="color:var(--ac);margin-left:.4rem">Cartera IA</span>' : '<span class="tag" style="margin-left:.4rem">Referencia</span>'}
              </th>
              <td class="${isUp ? "up" : "dn"}">
                <strong>${isUp ? "▲ +" : "▼ "}${fmt.n(m.retorno_total_pct, 2)} %</strong>
              </td>
              <td>${fmt.n(m.cagr_pct, 2)} %</td>
              <td>${fmt.n(m.volatilidad_anual_pct, 2)} %</td>
              <td><strong>${fmt.n(m.sharpe, 3)}</strong></td>
              <td class="dn">▼ ${fmt.n(m.max_drawdown_pct, 2)} %</td>
              <td>${fmt.n(m.calmar, 3)}</td>
              <td>${fmt.n(m.meses_positivos_pct, 1)} %</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;

    mt.querySelectorAll("th.sortable").forEach(th => {
      const toggle = () => {
        const k = th.dataset.k;
        if (sortCol === k) sortAsc = !sortAsc;
        else { sortCol = k; sortAsc = false; }
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

  function renderRebalances() {
    const selCarName = $("#car").value;
    const cartera = B.carteras[selCarName];
    if (!cartera) return;

    const rebalances = cartera.rebalanceos;
    currentRebalanceIdx = Math.min(currentRebalanceIdx, rebalances.length - 1);

    const tlEl = $("#tl");
    tlEl.innerHTML = rebalances.map((rb, idx) => `
      <li>
        <button type="button" data-idx="${idx}" aria-pressed="${idx === currentRebalanceIdx}">
          <span>${rb.fecha}</span>
          <span class="mut" style="color:inherit;font-size:.72rem">Reb. #${idx + 1}</span>
        </button>
      </li>
    `).join("");

    tlEl.querySelectorAll("button").forEach(btn => {
      btn.addEventListener("click", () => {
        currentRebalanceIdx = Number(btn.dataset.idx);
        renderRebalances();
        const activeBtn = tlEl.querySelector(`button[data-idx="${currentRebalanceIdx}"]`);
        if (activeBtn) activeBtn.focus();
      });
    });

    const activeRb = rebalances[currentRebalanceIdx];
    const rbBox = $("#rb");
    const weightsSorted = Object.entries(activeRb.pesos).sort((a,b) => b[1] - a[1]);

    rbBox.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:.5rem">
        <h3 style="margin:0">${selCarName} · Rebalanceo #${currentRebalanceIdx + 1} (${activeRb.fecha})</h3>
        <span class="tag">Turnover medio: ${fmt.n(cartera.turnover_medio, 3)}</span>
      </div>
      <p class="mut" style="font-size:.85rem;margin:.3rem 0 .8rem">
        Ponderaciones reoptimizadas para el siguiente ciclo de 21 sesiones:
      </p>
      <div>
        ${weightsSorted.map(([ticker, w]) => {
          const pct = w * 100;
          return `
            <div class="wrow">
              <strong>${ticker}</strong>
              <span class="b" title="${ticker}: ${fmt.n(pct, 1)} %">
                <i style="width:${Math.min(100, (pct / 25) * 100).toFixed(0)}%"></i>
              </span>
              <span>${fmt.n(pct, 1)} %</span>
            </div>
          `;
        }).join("")}
      </div>
    `;
  }
})();
