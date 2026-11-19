/* Módulos S13 (clasificación, regresión, optimizador, portafolios, backtesting). Datos SINTÉTICOS; resultados simulados. */
const isDark=()=>{const t=document.documentElement.getAttribute("data-theme");return t?t==="dark":matchMedia("(prefers-color-scheme:dark)").matches};
const TH=()=>isDark()?{fg:"#e9eff5",mut:"#aab7c4",bd:"#2c3a49",panel:"#17202b",ac:"#7db7ff",up:"#52d18a",dn:"#ff8a80",warn:"#ffcc66",
  pal:["#7db7ff","#52d18a","#ffcc66","#c9a6ff","#ff9fb8","#5fd6e0","#f2a65a","#b8c4d0","#9fd356","#ff8a80","#8fa8ff","#e0d36a"]}
 :{fg:"#14202e",mut:"#4d5b6b",bd:"#d3dce6",panel:"#fff",ac:"#0b4f9c",up:"#0a7d3c",dn:"#b3261e",warn:"#8a5a00",
  pal:["#0b4f9c","#0a7d3c","#b3261e","#8a5a00","#6a3fa0","#007c89","#c2185b","#5d6b7a","#3b6fd0","#5f7a00","#c25e00","#3d4650"]};
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;");
const sg=x=>x>0?"▲":(x<0?"▼":"■");
const pctS=(x,d=2)=>`${sg(x)} ${fmt.pct(x,d)}`;
const charts=[];
function mkChart(id){const el=typeof id==="string"?$("#"+id):id;if(!window.echarts){el.textContent="No se pudo cargar ECharts (se requiere conexión).";return null}
  let c=echarts.getInstanceByDom(el);if(c)c.dispose();c=echarts.init(el);if(!charts.includes(c))charts.push(c);return c}
addEventListener("resize",()=>charts.forEach(c=>!c.isDisposed()&&c.resize()));
const axisBase=t=>({axisLabel:{color:t.fg},axisLine:{lineStyle:{color:t.bd}},nameTextStyle:{color:t.fg},splitLine:{lineStyle:{color:t.bd}}});
const q=(a,p)=>{const s=[...a].sort((x,y)=>x-y),i=(s.length-1)*p,l=Math.floor(i),h=Math.ceil(i);return s[l]+(s[h]-s[l])*(i-l)};
const opts=(arr,f)=>arr.map(f).join("");
function wbars(pesos){return Object.entries(pesos).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="wrow"><strong>${k}</strong><span class="b"><i style="width:${Math.min(100,v*100/0.35).toFixed(0)}%"></i></span><span>${fmt.n(v*100,1)} %</span></div>`).join("")}

const P={
async clasificacion(){
  const D=await loadJSON("05_clasificadores_binarios.json"),U=await loadJSON("01_universo_tickers.json");
  const grupo=Object.fromEntries(U.map(u=>[u.ticker,u.grupo])),groups=[...new Set(U.map(u=>u.grupo))];
  let sel=U[0].ticker;
  $("#grp").innerHTML=`<option value="">Todos los grupos (26 activos)</option>`+opts(groups,g=>`<option>${g}</option>`);
  const models=D.modelos;
  const heat=()=>{const g=$("#grp").value,tk=U.filter(u=>!g||u.grupo===g).map(u=>u.ticker);
    if(!tk.includes(sel))sel=tk[0];
    const ml=models.filter(m=>m.familia==="ML").length;
    $("#heat").innerHTML=`<caption class="mut" style="text-align:left;padding:.4rem">Probabilidad de SUBE por activo y modelo (ML: ${ml}, DL: ${models.length-ml}). Pulse una fila para ver su consenso.</caption>
    <thead><tr><th scope="col">Activo</th>${models.map(m=>`<th scope="col">${esc(m.modelo)}<br><span class="mut">${m.familia}</span></th>`).join("")}<th scope="col">Consenso</th></tr></thead>
    <tbody>${tk.map(t=>{const p=D.predicciones[t];return `<tr tabindex="0" data-t="${t}" class="${t===sel?"sel":""}" aria-selected="${t===sel}"><th scope="row">${t}</th>${p.modelos.map(m=>{const up=m.senal==="SUBE",a=Math.min(35,6+Math.abs(m.prob_sube-.5)*2*34);
      return `<td style="background:color-mix(in srgb,var(${up?"--up":"--dn"}) ${a.toFixed(0)}%,var(--panel))" title="${esc(m.modelo)}: ${m.senal} (${fmt.n(m.prob_sube*100,1)} %)"><b>${up?"▲ SUBE":"▼ BAJA"}</b>${fmt.n(m.prob_sube*100,0)} %</td>`}).join("")}
      <td style="font-weight:700;color:var(${p.consenso==="SUBE"?"--up":"--dn"})">${p.consenso==="SUBE"?"▲ SUBE":"▼ BAJA"}<br>${p.votos_sube}/18</td></tr>`}).join("")}</tbody>`;
    $("#heat").querySelectorAll("tbody tr").forEach(r=>{const go=()=>{sel=r.dataset.t;heat();cons();$(`#heat tr[data-t="${sel}"]`).focus()};r.onclick=go;r.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go()}}});cons()};
  const cons=()=>{const p=D.predicciones[sel],up=p.consenso==="SUBE",ml=p.modelos.filter(m=>m.familia==="ML"&&m.senal==="SUBE").length,dl=p.modelos.filter(m=>m.familia==="DL"&&m.senal==="SUBE").length,u=U.find(x=>x.ticker===sel);
    $("#cons").innerHTML=`<h2 style="margin-top:0">Consenso · ${sel}</h2><p class="mut" style="margin:0">${esc(u.nombre)} · ${esc(u.grupo)}</p>
    <p style="margin:.6rem 0"><span class="badge" style="color:var(${up?"--up":"--dn"})">${up?"▲ SUBE":"▼ BAJA"}</span></p>
    <div class="vbar" role="img" aria-label="${p.votos_sube} votos SUBE y ${p.votos_baja} votos BAJA"><i style="width:${p.votos_sube/18*100}%;background:var(--up)"></i><i style="width:${p.votos_baja/18*100}%;background:var(--dn)"></i></div>
    <p style="margin:.2rem 0"><span class="up">▲ ${p.votos_sube} votos SUBE</span> · <span class="dn">▼ ${p.votos_baja} votos BAJA</span></p>
    <dl class="metrics"><dt>Probabilidad media de SUBE</dt><dd>${fmt.n(p.prob_media*100,1)} %</dd><dt>Confianza</dt><dd>${esc(p.confianza)}</dd><dt>SUBE en ML</dt><dd>${ml} de 11</dd><dt>SUBE en DL</dt><dd>${dl} de 7</dd></dl>
    <p class="mut" style="font-size:.85rem">${esc(D.definicion)}</p>`};
  $("#mt").innerHTML=`<caption class="mut" style="text-align:left;padding:.4rem">Métricas de prueba (simuladas)</caption><thead><tr><th class="l" scope="col">Modelo</th><th scope="col">Fam.</th><th scope="col">Exactitud</th><th scope="col">Precisión</th><th scope="col">Recall</th><th scope="col">F1</th><th scope="col">AUC</th><th scope="col">VP</th><th scope="col">FP</th><th scope="col">VN</th><th scope="col">FN</th></tr></thead><tbody>${opts(models,m=>`<tr><th scope="row">${esc(m.modelo)}</th><td>${m.familia}</td>${["exactitud","precision","recall","f1","auc"].map(k=>`<td>${fmt.n(m[k],3)}</td>`).join("")}${["VP","FP","VN","FN"].map(k=>`<td>${m.matriz_confusion[k]}</td>`).join("")}</tr>`)}</tbody>`;
  $("#grp").onchange=heat;heat();
},
async regresion(){
  const R=await loadJSON("06_regresores_precio_30d.json"),H=await loadJSON("02_precios_sinteticos_504d.json"),NH=90;
  const tk=Object.keys(R.predicciones);$("#sel").innerHTML=opts(tk,t=>`<option>${t}</option>`);
  const draw=()=>{const t=$("#sel").value,fam=document.querySelector("input[name=fam]:checked").value,p=R.predicciones[t],T=TH();
    const ms=p.modelos.filter(m=>fam==="ALL"||m.familia===fam);
    let med,lo,hi;
    if(fam==="ALL"){med=p.ensamble_mediana;lo=p.banda_p10;hi=p.banda_p90}
    else{const n=R.fechas_pronostico.length;med=[];lo=[];hi=[];for(let i=0;i<n;i++){const v=ms.map(m=>m.precios[i]);med.push(q(v,.5));lo.push(q(v,.1));hi.push(q(v,.9))}}
    const last=p.precio_ultimo,hist=H.cierres[t].slice(-NH),hd=H.fechas.slice(-NH),fd=R.fechas_pronostico,x=[...hd,...fd],pad=a=>[...Array(NH-1).fill(null),last,...a];
    const ret=(med[med.length-1]/last-1)*100,col=ret>=0?T.up:T.dn;
    const ch=mkChart("chart");if(ch)ch.setOption({animation:false,textStyle:{color:T.fg},grid:{left:60,right:20,top:40,bottom:60},
      legend:{top:0,textStyle:{color:T.fg},data:["Historia","Mediana","Banda p10–p90"]},
      tooltip:{trigger:"axis",formatter:ps=>{const i=ps[0].dataIndex,f=i>=NH,j=i-NH;return f?`${x[i]}<br>Mediana: <b>${fmt.n(med[j])}</b><br>p10: ${fmt.n(lo[j])} · p90: ${fmt.n(hi[j])}`:`${x[i]}<br>Cierre: <b>${fmt.n(hist[i])}</b>`}},
      xAxis:{type:"category",data:x,...axisBase(T),splitLine:{show:false}},yAxis:{type:"value",scale:true,...axisBase(T)},
      dataZoom:[{type:"inside"},{type:"slider",height:18,textStyle:{color:T.fg}}],
      series:[{name:"Historia",type:"line",showSymbol:false,data:[...hist,...Array(fd.length).fill(null)],lineStyle:{color:T.fg,width:2},itemStyle:{color:T.fg}},
       {name:"base",type:"line",stack:"b",data:pad(lo),showSymbol:false,lineStyle:{opacity:0},silent:true,tooltip:{show:false}},
       {name:"Banda p10–p90",type:"line",stack:"b",data:pad(hi.map((v,i)=>v-lo[i])).map((v,i)=>i===NH-1?0:v),showSymbol:false,lineStyle:{opacity:0},areaStyle:{color:T.ac,opacity:.22}},
       ...ms.map(m=>({name:m.modelo,type:"line",showSymbol:false,data:pad(m.precios),lineStyle:{width:1,opacity:.35,color:m.familia==="ML"?T.ac:T.warn,type:m.familia==="ML"?"solid":"dotted"},silent:true,z:1,tooltip:{show:false}})),
       {name:"Mediana",type:"line",showSymbol:false,data:pad(med),lineStyle:{width:3,color:col,type:"dashed"},itemStyle:{color:col},z:5,
        markLine:{symbol:"none",silent:true,label:{color:T.fg,formatter:"Hoy"},lineStyle:{color:T.mut,type:"dotted"},data:[{xAxis:hd[NH-1]}]}}]});
    $("#res").innerHTML=`<h2 style="margin-top:0">${t} · proyección 30 sesiones</h2>
    <p class="big" style="color:${col}">${pctS(ret)}</p><p class="mut" style="margin:0">Retorno proyectado (mediana, ${fam==="ALL"?"18 modelos":fam==="ML"?"11 modelos ML":"7 modelos DL"})</p>
    <dl class="metrics"><dt>Último cierre</dt><dd>${fmt.n(last)}</dd><dt>Mediana día 30</dt><dd>${fmt.n(med[med.length-1])}</dd><dt>p10 día 30</dt><dd>${fmt.n(lo[lo.length-1])}</dd><dt>p90 día 30</dt><dd>${fmt.n(hi[hi.length-1])}</dd></dl>
    <p class="mut" style="font-size:.85rem">Líneas finas: modelos individuales (<span style="color:var(--ac)">sólida = ML</span>, <span style="color:var(--warn)">punteada = DL</span>). Precios sintéticos.</p>`;
    const ids=new Set(ms.map(m=>m.modelo));
    $("#mt").innerHTML=`<thead><tr><th class="l" scope="col">Modelo</th><th scope="col">Fam.</th><th scope="col">MAPE 30 d %</th><th scope="col">MAE rel. %</th><th scope="col">RMSE rel. %</th><th scope="col">R² retornos</th><th scope="col">Mejora vs persistencia %</th></tr></thead><tbody>${opts(R.modelos.filter(m=>ids.has(m.modelo)),m=>`<tr><th scope="row">${esc(m.modelo)}</th><td>${m.familia}</td><td>${fmt.n(m.mape_30d_pct)}</td><td>${fmt.n(m.mae_relativo_pct)}</td><td>${fmt.n(m.rmse_relativo_pct)}</td><td>${fmt.n(m.r2_retornos_30d,3)}</td><td>${sg(m.mejora_vs_persistencia_pct)} ${fmt.n(m.mejora_vs_persistencia_pct,1)}</td></tr>`)}</tbody>`;};
  $("#sel").onchange=draw;document.querySelectorAll("input[name=fam]").forEach(r=>r.onchange=draw);window.onTheme=draw;draw();
},
async optimizador(){
  const O=await loadJSON("07_optimizador_markowitz_nsga.json");
  const pts=[...O.nsga2_elegibles.map(p=>({...p,alg:"NSGA-II"})),...O.nsga3_elegibles.map(p=>({...p,alg:"NSGA-III"}))];
  let sel=pts[0].id;
  $("#pt").innerHTML=opts(pts,p=>`<option value="${p.id}">${p.id} · ${p.alg} · ret ${fmt.n(p.retorno_esperado_anual_pct,1)} % · vol ${fmt.n(p.volatilidad_anual_pct,1)} %</option>`);
  const cv=pts.map(p=>p.cvar95_diario_pct),cmin=Math.min(...cv),cmax=Math.max(...cv);
  const comp=()=>{const p=pts.find(x=>x.id===sel);$("#comp").innerHTML=`<h2 style="margin-top:0">${p.id} · ${p.alg}</h2>
    <dl class="metrics"><dt>Retorno esperado</dt><dd>${pctS(p.retorno_esperado_anual_pct)}</dd><dt>Volatilidad anual</dt><dd>${fmt.n(p.volatilidad_anual_pct)} %</dd><dt>Sharpe</dt><dd>${fmt.n(p.sharpe,3)}</dd><dt>CVaR 95 % diario</dt><dd>${fmt.n(p.cvar95_diario_pct)} %</dd></dl>
    <h3 style="margin:.6rem 0 .2rem;font-size:1rem">Composición</h3>${wbars(p.pesos)}<p class="mut" style="font-size:.82rem">Tope por activo: ${O.tope_peso_por_activo*100} %. Barra llena = 35 %.</p>`;$("#pt").value=sel};
  const draw=()=>{const T=TH(),ch=mkChart("chart");if(!ch)return;const s=pts.find(x=>x.id===sel);
    const mk=a=>[...a].sort((u,v)=>u.volatilidad_anual_pct-v.volatilidad_anual_pct).map(p=>[p.volatilidad_anual_pct,p.retorno_esperado_anual_pct]);
    const dat=(a,alg)=>a.map(p=>({value:[p.volatilidad_anual_pct,p.retorno_esperado_anual_pct,p.cvar95_diario_pct],id:p.id,alg}));
    ch.setOption({animation:false,textStyle:{color:T.fg},grid:{left:60,right:20,top:70,bottom:50},legend:{top:0,textStyle:{color:T.fg},data:["Markowitz (12 elegibles)","Markowitz (26 activos)","NSGA-II","NSGA-III"]},
     tooltip:{formatter:p=>p.data&&p.data.id?`<b>${p.data.id}</b> (${p.data.alg})<br>Retorno ${fmt.n(p.value[1])} %<br>Volatilidad ${fmt.n(p.value[0])} %<br>CVaR 95 % ${fmt.n(p.value[2])} %`:`${p.seriesName}<br>Ret. ${fmt.n(p.value[1])} % · Vol. ${fmt.n(p.value[0])} %`},
     xAxis:{type:"value",name:"Volatilidad anual (%)",nameLocation:"middle",nameGap:30,scale:true,...axisBase(T)},yAxis:{type:"value",name:"Retorno esperado anual (%)",nameLocation:"middle",nameGap:42,scale:true,...axisBase(T)},
     visualMap:{type:"continuous",dimension:2,min:cmin,max:cmax,seriesIndex:[2,3],orient:"horizontal",left:"center",top:24,itemWidth:12,itemHeight:140,text:["CVaR alto","CVaR bajo"],textStyle:{color:T.fg},calculable:false,inRange:{color:isDark()?["#52d18a","#ffcc66","#ff8a80"]:["#0a7d3c","#b58100","#b3261e"]}},
     series:[{name:"Markowitz (12 elegibles)",type:"line",data:mk(O.markowitz_elegibles),showSymbol:false,smooth:true,lineStyle:{width:3,color:T.ac},itemStyle:{color:T.ac}},
      {name:"Markowitz (26 activos)",type:"line",data:mk(O.markowitz_universo_completo),showSymbol:false,smooth:true,lineStyle:{width:2,type:"dashed",color:T.mut},itemStyle:{color:T.mut}},
      {name:"NSGA-II",type:"scatter",symbol:"circle",symbolSize:14,z:4,data:dat(O.nsga2_elegibles,"NSGA-II"),itemStyle:{borderColor:T.panel,borderWidth:1}},
      {name:"NSGA-III",type:"scatter",symbol:"diamond",symbolSize:11,z:3,data:dat(O.nsga3_elegibles,"NSGA-III"),itemStyle:{borderColor:T.panel,borderWidth:1}},
      {name:"Seleccionado",type:"scatter",symbol:"circle",symbolSize:26,data:[[s.volatilidad_anual_pct,s.retorno_esperado_anual_pct]],itemStyle:{color:"transparent",borderColor:T.fg,borderWidth:3},silent:true,z:10,tooltip:{show:false}}]});
    ch.off("click");ch.on("click",e=>{if(e.data&&e.data.id){sel=e.data.id;comp();draw()}})};
  $("#pt").onchange=e=>{sel=e.target.value;comp();draw()};window.onTheme=draw;comp();draw();
},
async portafolios(){
  const D=await loadJSON("08_portafolios_3_niveles_riesgo.json");
  const draw=()=>{const T=TH();$("#cards").innerHTML=D.niveles.map((n,i)=>{const w=Object.entries(n.pesos).sort((a,b)=>b[1]-a[1]);
    return `<article class="card pcard" aria-labelledby="h${i}"><h2 id="h${i}">${n.nivel}</h2><p class="mut" style="margin:0 0 .4rem">${esc(n.descripcion)}</p>
    <div class="donut" id="d${i}" role="img" aria-label="Dona de pesos del portafolio ${n.nivel}"></div>
    <ul style="list-style:none;padding:0;margin:.3rem 0;display:grid;grid-template-columns:1fr 1fr;gap:.1rem .8rem;font-size:.88rem">${w.map(([k,v],j)=>`<li><span class="sw" style="background:${T.pal[j%T.pal.length]}"></span><strong>${k}</strong> ${fmt.n(v*100,1)} %</li>`).join("")}</ul>
    <dl class="metrics"><dt>Retorno esperado</dt><dd>${pctS(n.retorno_esperado_anual_pct)}</dd><dt>Volatilidad</dt><dd>${fmt.n(n.volatilidad_anual_pct)} %</dd><dt>Sharpe</dt><dd>${fmt.n(n.sharpe,3)}</dd><dt>CVaR 95 % diario</dt><dd>${fmt.n(n.cvar95_diario_pct)} %</dd></dl>
    <p class="mut" style="font-size:.82rem;margin:.2rem 0">${esc(n.origen)} · ${esc(n.restricciones)}</p>
    <details><summary>Por qué entró cada activo</summary><ul class="why">${n.detalle_activos.map(d=>`<li><strong>${d.ticker}</strong> (${fmt.n(d.peso_pct,1)} %): ${esc(d.razon)}</li>`).join("")}</ul></details></article>`}).join("");
    D.niveles.forEach((n,i)=>{const ch=mkChart("d"+i);if(!ch)return;const w=Object.entries(n.pesos).sort((a,b)=>b[1]-a[1]);
      ch.setOption({animation:false,tooltip:{formatter:p=>`${p.name}: ${fmt.n(p.value,1)} %`},series:[{type:"pie",radius:["52%","82%"],label:{show:false},itemStyle:{borderColor:T.panel,borderWidth:2},
       data:w.map(([k,v],j)=>({name:k,value:v*100,itemStyle:{color:T.pal[j%T.pal.length]}}))}],
       graphic:[{type:"text",left:"center",top:"center",style:{text:`${w.length}\nactivos`,textAlign:"center",fill:T.fg,font:"600 15px system-ui",lineHeight:20}}]})})};
  window.onTheme=draw;draw();
},
async backtesting(){
  const B=await loadJSON("09_backtesting_portafolios.json"),C=B.carteras,names=Object.keys(C);
  const all=[...names.map(n=>[n,C[n],true]),...Object.entries(B.referencias).map(([n,v])=>[n,v,false])];
  const dash=["solid","dashed","dotted"];
  const colors=T=>[T.ac,T.up,T.dn,T.mut,T.warn,T.pal[4],T.pal[5]];
  const draw=()=>{const T=TH(),cl=colors(T),x=B.fechas;
    const eq=mkChart("eq");if(eq)eq.setOption({animation:false,textStyle:{color:T.fg},grid:{left:55,right:20,top:60,bottom:55},legend:{top:0,textStyle:{color:T.fg},type:"scroll"},tooltip:{trigger:"axis",valueFormatter:v=>fmt.n(v)},
      xAxis:{type:"category",data:x,...axisBase(T),splitLine:{show:false}},yAxis:{type:"value",scale:true,name:"Capital (base 100)",...axisBase(T)},dataZoom:[{type:"inside"},{type:"slider",height:18,textStyle:{color:T.fg}}],
      series:all.map(([n,v,p],i)=>({name:n,type:"line",showSymbol:false,data:v.curva,lineStyle:{width:p?3:1.5,type:p?dash[i%3]:"dashed",color:cl[i]},itemStyle:{color:cl[i]},
       ...(i===0?{markLine:{symbol:"none",silent:true,label:{show:false},lineStyle:{color:T.mut,type:"dotted"},data:[{yAxis:100}]}}:{})}))});
    const dd=mkChart("dd");if(dd)dd.setOption({animation:false,textStyle:{color:T.fg},grid:{left:55,right:20,top:40,bottom:30},legend:{top:0,textStyle:{color:T.fg}},tooltip:{trigger:"axis",valueFormatter:v=>fmt.n(v)+" %"},
      xAxis:{type:"category",data:x,...axisBase(T),splitLine:{show:false}},yAxis:{type:"value",name:"Drawdown (%)",max:0,...axisBase(T)},
      series:names.map((n,i)=>({name:n,type:"line",showSymbol:false,data:C[n].drawdown,lineStyle:{width:2,type:dash[i],color:cl[i]},itemStyle:{color:cl[i]},areaStyle:{color:cl[i],opacity:.08}}))})};
  $("#mt").innerHTML=`<caption class="mut" style="text-align:left;padding:.4rem">${esc(B.periodo.inicio)} a ${esc(B.periodo.fin)} · ${B.periodo.sesiones} sesiones · simulado</caption><thead><tr><th class="l" scope="col">Serie</th><th scope="col">Retorno total</th><th scope="col">CAGR</th><th scope="col">Vol. anual</th><th scope="col">Sharpe</th><th scope="col">Máx. drawdown</th><th scope="col">Calmar</th><th scope="col">Meses positivos</th></tr></thead><tbody>${opts(all,([n,v,p])=>{const m=v.metricas;return `<tr><th scope="row">${esc(n)}${p?"":' <span class="tag">referencia</span>'}</th><td>${pctS(m.retorno_total_pct)}</td><td>${pctS(m.cagr_pct)}</td><td>${fmt.n(m.volatilidad_anual_pct)} %</td><td>${fmt.n(m.sharpe,3)}</td><td>▼ ${fmt.n(m.max_drawdown_pct)} %</td><td>${fmt.n(m.calmar,3)}</td><td>${fmt.n(m.meses_positivos_pct,1)} %</td></tr>`})}</tbody>`;
  $("#car").innerHTML=opts(names,n=>`<option>${n}</option>`);
  let ri=0;
  const tl=()=>{const n=$("#car").value,rs=C[n].rebalanceos;ri=Math.min(ri,rs.length-1);
    $("#tl").innerHTML=rs.map((r,i)=>`<li><button type="button" data-i="${i}" aria-pressed="${i===ri}">${r.fecha}<span class="mut" style="color:inherit">Reb. ${i+1}</span></button></li>`).join("");
    $("#tl").querySelectorAll("button").forEach(b=>b.onclick=()=>{ri=+b.dataset.i;tl();$(`#tl button[data-i="${ri}"]`).focus()});
    const r=rs[ri];$("#rb").innerHTML=`<h3 style="margin-top:0">${n} · rebalanceo del ${r.fecha}</h3>${wbars(r.pesos)}<p class="mut" style="margin-bottom:0">Turnover medio de la cartera: ${fmt.n(C[n].turnover_medio,3)} · ${rs.length} rebalanceos.</p>`};
  $("#car").onchange=()=>{ri=0;tl()};tl();window.onTheme=draw;draw();
}};
window.init=()=>P[document.body.dataset.page]();
