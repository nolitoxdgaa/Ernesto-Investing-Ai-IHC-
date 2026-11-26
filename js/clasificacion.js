/* Ernesto Investing AI - Módulo de Clasificación binaria (HTML + JavaScript)
   Datos sintéticos: 18 modelos (11 ML + 7 DL), 26 activos. Solo dos clases: SUBE / BAJA.
   Accesibilidad WCAG 2.2 AA: doble canal (color + texto + símbolo), teclado completo, contraste 4.5:1. */

(function(){
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
  let D, U, sortCol = "exactitud", sortAsc = false, selTicker = "AAPL";

  window.init = async function() {
    D = await loadJSON("05_clasificadores_binarios.json");
    U = await loadJSON("01_universo_tickers.json");

    const groups = [...new Set(U.map(u => u.grupo))];
    const grpSelect = $("#grp");
    grpSelect.innerHTML = `<option value="">Todos los grupos (26 activos)</option>` + 
      groups.map(g => `<option value="${esc(g)}">${esc(g)}</option>`).join("");

    grpSelect.addEventListener("change", () => renderHeatmap());
    document.querySelectorAll("input[name=fam]").forEach(r => {
      r.addEventListener("change", () => renderHeatmap());
    });

    renderHeatmap();
    renderMetricsTable();
    window.onLocaleChange = () => { renderHeatmap(); renderMetricsTable(); };
  };

  function renderHeatmap() {
    const grpVal = $("#grp").value;
    const famVal = document.querySelector("input[name=fam]:checked")?.value || "ALL";

    // Filtrar activos por grupo
    const activeTickers = U.filter(u => !grpVal || u.grupo === grpVal).map(u => u.ticker);
    if (!activeTickers.includes(selTicker) && activeTickers.length > 0) {
      selTicker = activeTickers[0];
    }

    // Filtrar modelos por familia
    const visibleModels = D.modelos.filter(m => famVal === "ALL" || m.familia === famVal);
    const mlCount = visibleModels.filter(m => m.familia === "ML").length;
    const dlCount = visibleModels.filter(m => m.familia === "DL").length;

    const heatTable = $("#heat");
    heatTable.innerHTML = `
      <caption class="mut" style="text-align:left;padding:.4rem">
        Mapa de calor activo × modelo (${visibleModels.length} modelos visibles: ML ${mlCount}, DL ${dlCount}).
        Use las flechas del teclado o haga clic en una fila para inspeccionar el consenso.
      </caption>
      <thead>
        <tr>
          <th scope="col" class="l">Activo</th>
          ${visibleModels.map(m => `
            <th scope="col">
              ${esc(m.modelo)}<br>
              <span class="mut" style="font-weight:normal;font-size:.7rem">${esc(m.familia)}</span>
            </th>
          `).join("")}
          <th scope="col">Consenso</th>
        </tr>
      </thead>
      <tbody>
        ${activeTickers.map(t => {
          const pred = D.predicciones[t];
          const isSelected = (t === selTicker);
          return `
            <tr tabindex="0" data-t="${t}" class="${isSelected ? "sel" : ""}" aria-selected="${isSelected ? "true" : "false"}">
              <th scope="row" class="l">
                <strong>${t}</strong>
              </th>
              ${visibleModels.map(m => {
                const item = pred.modelos.find(x => x.modelo === m.modelo);
                if (!item) return `<td>-</td>`;
                const isUp = item.senal === "SUBE";
                // Intensidad calculada para asegurar legibilidad y contraste
                const alpha = Math.min(38, 8 + Math.abs(item.prob_sube - 0.5) * 2 * 32);
                const bgVar = isUp ? "var(--up)" : "var(--dn)";
                return `
                  <td style="background:color-mix(in srgb, ${bgVar} ${alpha.toFixed(0)}%, var(--panel))"
                      title="${esc(m.modelo)} (${m.familia}): ${item.senal} con P(SUBE)=${fmt.n(item.prob_sube * 100, 1)} %">
                    <b style="color:${isUp ? "var(--up)" : "var(--dn)"}">
                      ${isUp ? "▲ SUBE" : "▼ BAJA"}
                    </b>
                    <span style="font-size:.72rem">${fmt.n(item.prob_sube * 100, 0)} %</span>
                  </td>
                `;
              }).join("")}
              <td style="font-weight:700;color:var(${pred.consenso === "SUBE" ? "--up" : "--dn"})">
                ${pred.consenso === "SUBE" ? "▲ SUBE" : "▼ BAJA"}<br>
                <span class="mut" style="font-weight:normal;font-size:.75rem">${pred.votos_sube}/18</span>
              </td>
            </tr>
          `;
        }).join("")}
      </tbody>
    `;

    // Eventos de selección con ratón y teclado
    heatTable.querySelectorAll("tbody tr").forEach(row => {
      const selectRow = () => {
        selTicker = row.dataset.t;
        renderHeatmap();
        renderConsensusCard();
        const activeRow = heatTable.querySelector(`tr[data-t="${selTicker}"]`);
        if (activeRow) activeRow.focus();
      };
      row.addEventListener("click", selectRow);
      row.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectRow();
        }
      });
    });

    renderConsensusCard();
  }

  function renderConsensusCard() {
    const p = D.predicciones[selTicker];
    if (!p) return;
    const isUp = p.consenso === "SUBE";
    const u = U.find(x => x.ticker === selTicker) || { nombre: selTicker, grupo: "-", sector: "-" };
    const mlUp = p.modelos.filter(m => m.familia === "ML" && m.senal === "SUBE").length;
    const dlUp = p.modelos.filter(m => m.familia === "DL" && m.senal === "SUBE").length;

    const confClass = p.confianza === "alta" ? "var(--up)" : (p.confianza === "media" ? "var(--ac)" : "var(--warn)");

    $("#cons").innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:start;gap:.5rem">
        <div>
          <h2 style="margin:0 0 .2rem">${selTicker} · Consenso</h2>
          <p class="mut" style="margin:0;font-size:.88rem">${esc(u.nombre)} · ${esc(u.grupo)} (${esc(u.sector)})</p>
        </div>
        <a href="regresion.html?ticker=${selTicker}" class="btn-nav" title="Ver proyección de precios de ${selTicker}">
          Ver Regresión →
        </a>
      </div>

      <div style="margin:.8rem 0;display:flex;align-items:center;gap:.8rem">
        <span class="badge" style="color:var(${isUp ? "--up" : "--dn"});font-size:1.15rem">
          ${isUp ? "▲ SUBE" : "▼ BAJA"}
        </span>
        <span class="tag" style="border-color:${confClass};color:${confClass};font-weight:600">
          Confianza ${esc(p.confianza).toUpperCase()}
        </span>
      </div>

      <!-- Barra gráfica de votos (accesible) -->
      <div class="vbar" role="img" aria-label="Distribución de votos: ${p.votos_sube} votos SUBE y ${p.votos_baja} votos BAJA">
        <i style="width:${(p.votos_sube / 18) * 100}%;background:var(--up)" title="SUBE: ${p.votos_sube}"></i>
        <i style="width:${(p.votos_baja / 18) * 100}%;background:var(--dn)" title="BAJA: ${p.votos_baja}"></i>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:.84rem;margin-bottom:.6rem">
        <span class="up"><strong>▲ ${p.votos_sube}</strong> votos SUBE</span>
        <span class="dn"><strong>▼ ${p.votos_baja}</strong> votos BAJA</span>
      </div>

      <dl class="metrics" style="margin:.8rem 0">
        <dt>Probabilidad media \(P(\text{SUBE})\)</dt>
        <dd style="color:var(${isUp ? "--up" : "--dn"})">${fmt.n(p.prob_media * 100, 1)} %</dd>
        
        <dt>Modelos ML a favor</dt>
        <dd>${mlUp} de 11 (${fmt.n(mlUp / 11 * 100, 0)} %)</dd>

        <dt>Modelos DL a favor</dt>
        <dd>${dlUp} de 7 (${fmt.n(dlUp / 7 * 100, 0)} %)</dd>

        <dt>Definición de objetivo</dt>
        <dd style="font-weight:normal;font-size:.8rem;grid-column:span 2;color:var(--mut)">
          \(P_{t+30} > P_t\) a 30 sesiones bursátiles
        </dd>
      </dl>

      <p class="mut" style="font-size:.8rem;margin-top:.8rem;border-top:1px solid var(--bd);padding-top:.5rem">
        <em>Pauta IHC G11:</em> Este activo es elegible para optimización solo si su consenso es SUBE y su proyección mediana de retorno en regresión es positiva.
      </p>
    `;
  }

  function renderMetricsTable() {
    const list = [...D.modelos];
    list.sort((a, b) => {
      let v1 = a[sortCol];
      let v2 = b[sortCol];
      if (typeof v1 === "string") return sortAsc ? v1.localeCompare(v2) : v2.localeCompare(v1);
      return sortAsc ? (v1 - v2) : (v2 - v1);
    });

    const cols = [
      { key: "modelo", label: "Modelo", align: "l" },
      { key: "familia", label: "Familia", align: "l" },
      { key: "exactitud", label: "Exactitud", align: "r" },
      { key: "precision", label: "Precisión", align: "r" },
      { key: "recall", label: "Recall", align: "r" },
      { key: "f1", label: "F1 Score", align: "r" },
      { key: "auc", label: "AUC-ROC", align: "r" },
      { key: "matriz", label: "Matriz Confusión (VP / FP / VN / FN)", align: "r", noSort: true }
    ];

    const mtTable = $("#mt");
    mtTable.innerHTML = `
      <thead>
        <tr>
          ${cols.map(c => {
            const isCurrent = (c.key === sortCol);
            const icon = isCurrent ? (sortAsc ? " ▲" : " ▼") : "";
            const ariaSort = isCurrent ? (sortAsc ? "ascending" : "descending") : "none";
            if (c.noSort) {
              return `<th class="${c.align || 'r'}" scope="col">${c.label}</th>`;
            }
            return `
              <th class="${c.align || 'r'} sortable" scope="col" tabindex="0" data-k="${c.key}" aria-sort="${ariaSort}">
                ${c.label}${icon}
              </th>
            `;
          }).join("")}
        </tr>
      </thead>
      <tbody>
        ${list.map(m => `
          <tr>
            <th scope="row" class="l"><strong>${esc(m.modelo)}</strong></th>
            <td class="l"><span class="chip">${esc(m.familia)}</span></td>
            <td><strong>${fmt.n(m.exactitud * 100, 2)} %</strong></td>
            <td>${fmt.n(m.precision * 100, 2)} %</td>
            <td>${fmt.n(m.recall * 100, 2)} %</td>
            <td>${fmt.n(m.f1, 3)}</td>
            <td>${fmt.n(m.auc, 3)}</td>
            <td>
              <span class="up" title="Verdaderos Positivos">VP:${m.matriz_confusion.VP}</span> · 
              <span class="dn" title="Falsos Positivos">FP:${m.matriz_confusion.FP}</span> · 
              <span title="Verdaderos Negativos">VN:${m.matriz_confusion.VN}</span> · 
              <span title="Falsos Negativos">FN:${m.matriz_confusion.FN}</span>
            </td>
          </tr>
        `).join("")}
      </tbody>
    `;

    mtTable.querySelectorAll("th.sortable").forEach(th => {
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
