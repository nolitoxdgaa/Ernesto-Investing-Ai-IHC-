/* investing_i18n_kit/i18n.js — Ernesto Investing AI · kit de internacionalización (Sesión 13, IHC 2026-II). Licencia CC BY 4.0. Material educativo. */
const I18N = (() => {
  const RTL = ['ar', 'he', 'fa', 'ur'];
  const FIXTURE_UTC = '2026-11-20T21:00:00Z';              // cierre NYSE de ejemplo (16:00 ET): dato técnico, no una medición
  const MONEY = { amount: 125430.5, currency: 'USD' };      // cantidad y divisa fijas: cambiar el idioma NO convierte divisas
  let dicts = {}, loc = 'es-PE', tz = 'America/Lima', pseudo = false;
  const base = l => l.split('-')[0];
  function load(d) { dicts = d; }
  function set(o) { if (o.locale) loc = o.locale; if (o.tz) tz = o.tz; if ('pseudo' in o) pseudo = !!o.pseudo; return state(); }
  function state() { return { locale: loc, tz, pseudo, dir: dir() }; }
  function dir() { return RTL.includes(base(loc)) ? 'rtl' : 'ltr'; }
  function pseudoloc(s) {  // pseudolocalización: acentos + ~40 % de longitud; conserva {variables}
    const m = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', n: 'ñ', c: 'ç' };
    const out = s.split(/(\{[^}]+\})/).map(p => /^\{/.test(p) ? p : p.replace(/[aeiouAEIOUnc]/g, c => m[c])).join('');
    return '[' + out + ' ' + '·'.repeat(Math.ceil(s.length * 0.4)) + ']';
  }
  function raw(key) { const d = dicts[loc] || {}; return d[key] !== undefined ? d[key] : (dicts['es-PE'] || {})[key]; }
  function t(key, vars) {
    let v = raw(key); vars = vars || {};
    if (v === undefined) return '⟦' + key + '⟧';                 // clave ausente visible, nunca silenciosa
    if (typeof v === 'object') { const cat = new Intl.PluralRules(loc).select(vars.n); v = v[cat] !== undefined ? v[cat] : v.other; }
    v = v.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : '{' + k + '}'));
    return pseudo ? pseudoloc(v) : v;
  }
  const num = (x, o) => new Intl.NumberFormat(loc, o).format(x);
  const money = (x, cur, o) => new Intl.NumberFormat(loc, Object.assign({ style: 'currency', currency: cur || MONEY.currency }, o)).format(x);
  const pct = x => new Intl.NumberFormat(loc, { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2, signDisplay: 'exceptZero' }).format(x);
  const dt = (iso, o) => new Intl.DateTimeFormat(loc, Object.assign({ dateStyle: 'medium', timeStyle: 'short', timeZone: tz }, o)).format(new Date(iso || FIXTURE_UTC));
  const rel = (v, unit) => new Intl.RelativeTimeFormat(loc, { numeric: 'auto' }).format(v, unit);
  const names = c => { try { return new Intl.DisplayNames([c], { type: 'language' }).of(c); } catch (e) { return c; } };
  const sort = (arr, f) => arr.slice().sort((a, b) => new Intl.Collator(loc).compare(f(a), f(b)));
  function apply(root) {  // para páginas estáticas: <span data-i18n="clave"></span>
    (root || document).querySelectorAll('[data-i18n]').forEach(e => { e.textContent = t(e.dataset.i18n, { n: e.dataset.n }); });
    document.documentElement.lang = loc; document.documentElement.dir = dir();
  }
  return { load, set, state, dir, t, num, money, pct, dt, rel, names, sort, apply, pseudoloc, MONEY, FIXTURE_UTC, get locales() { return Object.keys(dicts); } };
})();
if (typeof module !== 'undefined') module.exports = I18N;
