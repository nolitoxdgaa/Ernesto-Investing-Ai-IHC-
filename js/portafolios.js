/* Ernesto Investing AI - Módulo de Portafolios en 3 niveles de riesgo (HTML + JavaScript)
   Datos sintéticos: Conservador, Moderado (máximo Sharpe) y Agresivo.
   Donas ECharts, justificación por activo (campo razon) y transferencia al Trading simulado. */

(function(){
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const isDark = () => {
    const t = document.documentElement.getAttribute("data-theme");
    return t ? t === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  };
  const getTheme = () => isDark() ? {
    fg: "#e9eff5", mut: "#aab7c4", bd: "#2c3a49", panel: "#17202b",
    pal: ["#7db7ff", "#52d18a", "#ffcc66", "#c9a6ff", "#ff9fb8", "#5fd6e0", "#f2a65a", "#b8c4d0", "#9fd356"]
  } : {
    fg: "#14202e", mut: "#4d5b6b", bd: "#d3dce6", panel: "#ffffff",
    pal: ["#0b4f9c", "#0a7d3c", "#b3261e", "#8a5a00", "#6a3fa0", "#007c89", "#c2185b", "#5d6b7a", "#3b6fd0"]
  };

  let D, M, chartInstances = [];

  window.init = async function() {
    D = await loadJSON("08_portafolios_3_niveles_riesgo.json");
    try {
      M = await loadJSON("10_dashboard_mercado.json");
    } catch(e) {
      M = [];
    }

    window.onTheme = () => renderPortfolios();
    window.addEventListener("resize", () => {
      chartInstances.forEach(c => { if(c && !c.isDisposed()) c.resize(); });
    });

    renderPortfolios();
  };

  function renderPortfolios() {
    const T = getTheme();
    chartInstances.forEach(c => { if (c && !c.isDisposed()) c.dispose(); });
    chartInstances = [];

    const container = $("#cards");
    container.innerHTML = D.niveles.map((nivelData, idx) => {
      const isModerado = (nivelData.nivel === "Moderado");
      const isConservador = (nivelData.nivel === "Conservador");
      const borderColor = isModerado ? "var(--up)" : (isConservador ? "var(--ac)" : "var(--dn)");
      const weightsSorted = Object.entries(nivelData.pesos).sort((a,b) => b[1] - a[1]);

      return `
        <article class="card pcard" style="border-top:5px solid ${borderColor};display:flex;flex-direction:column;justify-content:space-between">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem">
              <h2 style="margin:0">${esc(nivelData.nivel)}</h2>
              ${isModerado ? '<span class="tag" style="background:var(--hl);color:var(--up);border-color:var(--up);font-weight:700">★ Máximo Sharpe</span>' : ''}
              ${isConservador ? '<span class="tag" style="color:var(--ac);border-color:var(--ac)">Mínimo Riesgo</span>' : ''}
              ${nivelData.nivel === "Agresivo" ? '<span class="tag" style="color:var(--dn);border-color:var(--dn)">Máximo Retorno</span>' : ''}
            </div>
            
            <p class="mut" style="font-size:.88rem;margin:0 0 .8rem">${esc(nivelData.descripcion)}</p>

            <!-- Gráfico circular de dona -->
            <div class="donut" id="donut-${idx}" role="img" aria-label="Dona de pesos del portafolio ${nivelData.nivel}"></div>

            <!-- Lista de activos y pesos -->
            <ul style="list-style:none;padding:0;margin:.6rem 0;display:grid;grid-template-columns:1fr 1fr;gap:.2rem .6rem;font-size:.86rem">
              ${weightsSorted.map(([ticker, w], j) => `
                <li style="display:flex;align-items:center">
                  <span class="sw" style="background:${T.pal[j % T.pal.length]}"></span>
                  <strong>${ticker}</strong>&nbsp;${fmt.n(w * 100, 1)} %
                </li>
              `).join("")}
            </ul>

            <!-- Métricas cuantitativas del portafolio -->
            <dl class="metrics" style="margin:.8rem 0;background:var(--hl);padding:.6rem;border-radius:8px">
              <dt>Retorno esperado anual</dt>
              <dd class="up">+${fmt.n(nivelData.retorno_esperado_anual_pct, 2)} %</dd>

              <dt>Volatilidad anual</dt>
              <dd>${fmt.n(nivelData.volatilidad_anual_pct, 2)} %</dd>

              <dt>Ratio de Sharpe</dt>
              <dd><strong>${fmt.n(nivelData.sharpe, 3)}</strong></dd>

              <dt>CVaR 95 % diario</dt>
              <dd class="dn">${fmt.n(nivelData.cvar95_diario_pct, 2)} %</dd>
            </dl>

            <!-- Justificación por activo (Pauta IHC G11) -->
            <details style="margin-top:.6rem;font-size:.86rem">
              <summary>¿Por qué entró cada activo? (Justificación IA)</summary>
              <ul class="why">
                ${nivelData.detalle_activos.map(d => `
                  <li style="margin-bottom:.3rem">
                    <strong>${d.ticker}</strong> (${fmt.n(d.peso_pct, 1)} %):
                    <span>${esc(d.razon)}</span>
                  </li>
                `).join("")}
              </ul>
            </details>
          </div>

          <div style="margin-top:1.2rem;border-top:1px solid var(--bd);padding-top:.8rem">
            <button type="button" class="btn primary" style="width:100%" data-nivel="${nivelData.nivel}">
              Llevar a Trading simulado 🚀
            </button>
          </div>
        </article>
      `;
    }).join("");

    // Renderizar las 3 donas con ECharts
    D.niveles.forEach((nivelData, idx) => {
      const el = $("#donut-" + idx);
      if (!el || !window.echarts) return;
      const ch = echarts.init(el);
      chartInstances.push(ch);

      const weightsSorted = Object.entries(nivelData.pesos).sort((a,b) => b[1] - a[1]);
      ch.setOption({
        animation: false,
        tooltip: {
          formatter: p => `<strong>${p.name}</strong>: ${fmt.n(p.value, 1)} % del capital`
        },
        series: [{
          type: "pie",
          radius: ["50%", "78%"],
          center: ["50%", "50%"],
          avoidLabelOverlap: false,
          label: { show: false },
          itemStyle: { borderColor: T.panel, borderWidth: 2 },
          data: weightsSorted.map(([ticker, w], j) => ({
            name: ticker,
            value: Number((w * 100).toFixed(1)),
            itemStyle: { color: T.pal[j % T.pal.length] }
          }))
        }],
        graphic: [{
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: `${weightsSorted.length}\nActivos`,
            textAlign: "center",
            fill: T.fg,
            font: "600 14px system-ui",
            lineHeight: 18
          }
        }]
      });
    });

    // Eventos de botones "Llevar a Trading"
    container.querySelectorAll("button[data-nivel]").forEach(btn => {
      btn.addEventListener("click", () => {
        const nivel = btn.dataset.nivel;
        transferToTrading(nivel);
      });
    });
  }

  function transferToTrading(nivel) {
    const nivelData = D.niveles.find(n => n.nivel === nivel);
    if (!nivelData) return;

    // Capital total base demo de US$ 100,000
    const totalCapital = 100000;
    const positions = [];
    let cash = totalCapital;

    // Convertir pesos a posiciones compatibles con trading.html y leaderboard.html
    Object.entries(nivelData.pesos).forEach(([ticker, weight]) => {
      const allocatedDollars = totalCapital * weight;
      const dItem = Array.isArray(M) ? M.find(x => x.ticker === ticker) : null;
      const price = dItem ? dItem.ultimo : 100;
      const qty = Math.floor(allocatedDollars / price);
      if (qty > 0) {
        positions.push({
          ticker: ticker,
          cantidad: qty,
          costo: price
        });
        cash -= (qty * price);
      }
    });

    const newPortfolio = {
      efectivo: Number(cash.toFixed(2)),
      posiciones: positions
    };

    // Guardar en localStorage para Trading simulado y Leaderboard
    store("eia_port", newPortfolio);
    store("eia_selected_portfolio", nivel);

    alert(`Portafolio ${nivel} configurado con éxito en el Simulador de Trading.\nSe distribuyeron US$ 100,000 en ${positions.length} posiciones según los pesos del modelo.\nRedirigiendo a Trading...`);
    window.location.href = "trading.html";
  }
})();
