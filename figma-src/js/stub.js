/* Muestra un fragmento de los JSON de entrada del modulo para que el equipo vea la estructura que debe consumir. */
window.init=async()=>{ const box=$("#prev"); for(const f of window.STUB.files){ const d=await loadJSON(f); let s=JSON.stringify(d,(k,v)=>Array.isArray(v)&&v.length>4?[...v.slice(0,4),"… ("+v.length+" elementos)"]:v,1); if(s.length>2600) s=s.slice(0,2600)+"\n… (recortado)";
  box.insertAdjacentHTML("beforeend",`<h3>data/${f}</h3><pre tabindex="0">${s.replace(/</g,"&lt;")}</pre>`);} };
