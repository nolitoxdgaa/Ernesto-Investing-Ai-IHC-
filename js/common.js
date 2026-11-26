/* Ernesto Investing AI - Sistema Web Integrado (Sesión 13, IHC 2026-II)
   Núcleo común: internacionalización (i18n), localización (l10n), CSS lógico, RTL y persistencia. */

const LOCALES_INFO = {
  "es-PE": { name: "Español", dir: "ltr", lang: "es-PE" },
  "en-US": { name: "English", dir: "ltr", lang: "en-US" },
  "ar-EG": { name: "العربية", dir: "rtl", lang: "ar-EG" },
  "ja-JP": { name: "日本語 (borrador)", dir: "ltr", lang: "ja-JP" },
  "qu-PE": { name: "Runasimi (borrador)", dir: "ltr", lang: "qu-PE" }
};

const TIMEZONES = [
  { id: "America/Lima", label: "Lima (UTC-5)" },
  { id: "America/New_York", label: "Nueva York (ET)" },
  { id: "Asia/Riyadh", label: "Riad (UTC+3)" },
  { id: "Asia/Tokyo", label: "Tokio (JST)" },
  { id: "Europe/Madrid", label: "Madrid (CET)" }
];

const I18N_DICTS = {
  "es-PE": {
    "brand": "Ernesto Investing AI",
    "nav_dash": "Panel",
    "nav_watch": "Vigilancia",
    "nav_trade": "Operar",
    "nav_opt": "Optimizador",
    "portfolio": "Valor del portafolio",
    "change_today": "Variación de hoy",
    "updated": "Actualizado {time}",
    "market_open": "Mercado abierto",
    "market_closed": "Mercado cerrado",
    "buy": "Comprar",
    "sell": "Vender",
    "hold": "Mantener",
    "ticker": "Símbolo",
    "name": "Empresa",
    "price": "Precio",
    "change": "Variación",
    "signal": "Señal",
    "alerts": {
      "one": "{n} alerta activa",
      "other": "{n} alertas activas"
    },
    "shares": {
      "one": "{n} acción",
      "other": "{n} acciones"
    },
    "order_title": "Orden simulada",
    "qty": "Cantidad",
    "place_order": "Enviar orden",
    "order_ok": "Orden simulada: {qty} de {ticker} a {price}.",
    "risk": "Perfil de riesgo",
    "conservative": "Conservador",
    "moderate": "Moderado",
    "aggressive": "Agresivo",
    "disclaimer": "Datos sintéticos con fines educativos. No es asesoría de inversión.",
    "search_ph": "Buscar empresa o símbolo",
    "sort_by": "Ordenado por nombre",
    "lang_label": "Idioma",
    "tz_label": "Zona horaria",
    "close_time": "Cierre NYSE: {time}",
    "tip": "Las predicciones son inciertas: revise el intervalo de confianza.",
    "nav_leaderboard": "Ranking",
    "nav_clasificacion": "Clasificación",
    "nav_regresion": "Regresión",
    "nav_portafolios": "Portafolios",
    "nav_backtesting": "Backtesting",
    "nav_perfil": "Perfil",
    "nav_config": "Configuración",
    "nav_ayuda": "Ayuda",
    "nav_acercade": "Acerca de",
    "theme_toggle": "Tema",
    "skip_to_content": "Saltar al contenido",
    "dash_title": "Dashboard de mercado",
    "candles_title": "Velas del activo (últimas 120 sesiones sintéticas)",
    "asset_label": "Activo",
    "filter_group": "Filtrar tabla por grupo",
    "all_groups": "Todos",
    "universe_title": "Universo de 26 activos",
    "table_caption": "Variaciones y riesgo (datos sintéticos)",
    "col_ticker": "Símbolo",
    "col_group": "Grupo",
    "col_last": "Último",
    "col_vol": "Vol. anual",
    "col_beta": "Beta",
    "today": "hoy",
    "watchlist_title": "Watchlist y alertas",
    "add_asset": "Agregar activo",
    "btn_add": "Agregar",
    "configured_alerts": "Alertas configuradas",
    "remove": "Quitar",
    "trading_title": "Trading simulado",
    "new_order": "Nueva orden",
    "order_type": "Tipo",
    "btn_buy": "Comprar",
    "btn_sell": "Vender",
    "portfolio_status": "Estado del portafolio",
    "available_cash": "Efectivo disponible",
    "total_nav": "Valor total (NAV)",
    "open_positions": "Posiciones abiertas",
    "cost": "Costo",
    "leaderboard_title": "Leaderboard de la liga",
    "league_desc": "Ranking de traders ficticios y el suyo (según su portafolio simulado).",
    "col_rank": "#",
    "col_alias": "Alias",
    "col_team": "Equipo",
    "col_return": "Retorno",
    "col_trades": "Operaciones",
    "col_sharpe": "Sharpe",
    "you": "Usted",
    "perfil_title": "Perfil de inversionista",
    "perfil_desc": "Gestión de cuenta simulada, tolerancia al riesgo y estadísticas de desempeño.",
    "config_title": "Configuración del sistema",
    "config_desc": "Preferencias regionales, zona horaria, accesibilidad y parámetros de interfaz.",
    "ayuda_title": "Centro de ayuda y tutoriales",
    "ayuda_desc": "Guía de uso de módulos, preguntas frecuentes y glosario de términos financieros.",
    "acercade_title": "Acerca de Ernesto Investing AI",
    "acercade_desc": "Información del proyecto, arquitectura técnica, equipo y declaración ética.",
    "user_name": "Usuario Demo IHC",
    "user_id": "Código: G3-EST-2026",
    "risk_tolerance": "Tolerancia al riesgo",
    "virtual_capital": "Capital virtual disponible",
    "total_trades": "Operaciones totales",
    "win_rate": "Tasa de aciertos simulada",
    "best_asset": "Mejor activo en cartera",
    "save_prefs": "Guardar preferencias",
    "reset_demo": "Reiniciar datos de simulación",
    "faq_title": "Preguntas frecuentes",
    "glossary_title": "Glosario IHC y Financiero",
    "ethics_title": "Declaración de Veracidad y Ética",
    "ethics_decl": "Todos los precios, pronósticos y rentabilidades son estrictamente sintéticos con fines pedagógicos. No constituye asesoría financiera.",
    "team_title": "Equipo de desarrollo",
    "version_info": "Versión 2.0 Internacionalizada (Semana 13 · IHC 2026-II)"
  },
  "en-US": {
    "brand": "Ernesto Investing AI",
    "nav_dash": "Dashboard",
    "nav_watch": "Watchlist",
    "nav_trade": "Trade",
    "nav_opt": "Optimizer",
    "portfolio": "Portfolio value",
    "change_today": "Today's change",
    "updated": "Updated {time}",
    "market_open": "Market open",
    "market_closed": "Market closed",
    "buy": "Buy",
    "sell": "Sell",
    "hold": "Hold",
    "ticker": "Symbol",
    "name": "Company",
    "price": "Price",
    "change": "Change",
    "signal": "Signal",
    "alerts": {
      "one": "{n} active alert",
      "other": "{n} active alerts"
    },
    "shares": {
      "one": "{n} share",
      "other": "{n} shares"
    },
    "order_title": "Simulated order",
    "qty": "Quantity",
    "place_order": "Place order",
    "order_ok": "Simulated order: {qty} of {ticker} at {price}.",
    "risk": "Risk profile",
    "conservative": "Conservative",
    "moderate": "Moderate",
    "aggressive": "Aggressive",
    "disclaimer": "Synthetic data for educational purposes. Not investment advice.",
    "search_ph": "Search company or symbol",
    "sort_by": "Sorted by name",
    "lang_label": "Language",
    "tz_label": "Time zone",
    "close_time": "NYSE close: {time}",
    "tip": "Predictions are uncertain: check the confidence interval.",
    "nav_leaderboard": "Leaderboard",
    "nav_clasificacion": "Classification",
    "nav_regresion": "Regression",
    "nav_portafolios": "Portfolios",
    "nav_backtesting": "Backtesting",
    "nav_perfil": "Profile",
    "nav_config": "Settings",
    "nav_ayuda": "Help",
    "nav_acercade": "About",
    "theme_toggle": "Theme",
    "skip_to_content": "Skip to main content",
    "dash_title": "Market Dashboard",
    "candles_title": "Asset Candlesticks (last 120 synthetic sessions)",
    "asset_label": "Asset",
    "filter_group": "Filter table by group",
    "all_groups": "All",
    "universe_title": "Universe of 26 Assets",
    "table_caption": "Variations and risk (synthetic data)",
    "col_ticker": "Ticker",
    "col_group": "Group",
    "col_last": "Last",
    "col_vol": "Annual Vol.",
    "col_beta": "Beta",
    "today": "today",
    "watchlist_title": "Watchlist & Alerts",
    "add_asset": "Add asset",
    "btn_add": "Add",
    "configured_alerts": "Configured Alerts",
    "remove": "Remove",
    "trading_title": "Paper Trading",
    "new_order": "New Order",
    "order_type": "Type",
    "btn_buy": "Buy",
    "btn_sell": "Sell",
    "portfolio_status": "Portfolio Status",
    "available_cash": "Available Cash",
    "total_nav": "Total Value (NAV)",
    "open_positions": "Open Positions",
    "cost": "Cost",
    "leaderboard_title": "League Leaderboard",
    "league_desc": "Ranking of simulated traders and your current standing.",
    "col_rank": "#",
    "col_alias": "Trader",
    "col_team": "Team",
    "col_return": "Return",
    "col_trades": "Trades",
    "col_sharpe": "Sharpe",
    "you": "You",
    "perfil_title": "Investor Profile",
    "perfil_desc": "Simulated account management, risk tolerance, and trading performance metrics.",
    "config_title": "System Settings",
    "config_desc": "Regional preferences, timezone selection, accessibility, and UI parameters.",
    "ayuda_title": "Help Center & Tutorials",
    "ayuda_desc": "User guide for modules, frequently asked questions, and financial glossary.",
    "acercade_title": "About Ernesto Investing AI",
    "acercade_desc": "Project overview, technical architecture, team members, and ethical disclosure.",
    "user_name": "IHC Demo User",
    "user_id": "ID: G3-EST-2026",
    "risk_tolerance": "Risk Tolerance",
    "virtual_capital": "Available Virtual Capital",
    "total_trades": "Total Simulated Trades",
    "win_rate": "Simulated Win Rate",
    "best_asset": "Top Performing Asset",
    "save_prefs": "Save Preferences",
    "reset_demo": "Reset Simulation State",
    "faq_title": "Frequently Asked Questions",
    "glossary_title": "HCI & Financial Glossary",
    "ethics_title": "Veracity & Ethics Declaration",
    "ethics_decl": "All prices, forecasts, and returns are strictly synthetic for educational purposes. Not financial advice.",
    "team_title": "Development Team",
    "version_info": "Version 2.0 Internationalized (Week 13 · HCI 2026-II)"
  },
  "ar-EG": {
    "brand": "إيرنستو إنفستنغ إيه آي",
    "nav_dash": "لوحة المعلومات",
    "nav_watch": "قائمة المراقبة",
    "nav_trade": "تداول",
    "nav_opt": "المُحسِّن",
    "portfolio": "قيمة المحفظة",
    "change_today": "تغيّر اليوم",
    "updated": "آخر تحديث {time}",
    "market_open": "السوق مفتوح",
    "market_closed": "السوق مغلق",
    "buy": "شراء",
    "sell": "بيع",
    "hold": "احتفاظ",
    "ticker": "الرمز",
    "name": "الشركة",
    "price": "السعر",
    "change": "التغيّر",
    "signal": "الإشارة",
    "alerts": {
      "zero": "لا توجد تنبيهات نشطة",
      "one": "تنبيه نشط واحد",
      "two": "تنبيهان نشطان",
      "few": "{n} تنبيهات نشطة",
      "many": "{n} تنبيهًا نشطًا",
      "other": "{n} تنبيه نشط"
    },
    "shares": {
      "zero": "لا أسهم",
      "one": "سهم واحد",
      "two": "سهمان",
      "few": "{n} أسهم",
      "many": "{n} سهمًا",
      "other": "{n} سهم"
    },
    "order_title": "أمر تجريبي",
    "qty": "الكمية",
    "place_order": "إرسال الأمر",
    "order_ok": "أمر تجريبي: {qty} من {ticker} بسعر {price}.",
    "risk": "مستوى المخاطرة",
    "conservative": "متحفظ",
    "moderate": "معتدل",
    "aggressive": "جريء",
    "disclaimer": "بيانات اصطناعية لأغراض تعليمية. ليست نصيحة استثمارية.",
    "search_ph": "ابحث عن شركة أو رمز",
    "sort_by": "مرتّب حسب الاسم",
    "lang_label": "اللغة",
    "tz_label": "المنطقة الزمنية",
    "close_time": "إغلاق بورصة نيويورك: {time}",
    "tip": "التوقعات غير مؤكدة: راجع فترة الثقة.",
    "nav_leaderboard": "لوحة المتصدرين",
    "nav_clasificacion": "التصنيف",
    "nav_regresion": "الانحدار",
    "nav_portafolios": "المحافظ الاستثمارية",
    "nav_backtesting": "الاختبار الرجعي",
    "nav_perfil": "الملف الشخصي",
    "nav_config": "الإعدادات",
    "nav_ayuda": "مساعدة",
    "nav_acercade": "حول النظام",
    "theme_toggle": "المظهر",
    "skip_to_content": "الانتقال إلى المحتوى الرئيسي",
    "dash_title": "لوحة تحكم السوق",
    "candles_title": "الشموع اليابانية للأصل (آخر 120 جلسة محاكاة)",
    "asset_label": "الأصل المالي",
    "filter_group": "تصفية الجدول حسب المجموعة",
    "all_groups": "الكل",
    "universe_title": "مجموعة الـ 26 أصلاً مالياً",
    "table_caption": "التباين والمخاطر (بيانات محاكاة)",
    "col_ticker": "الرمز",
    "col_group": "المجموعة",
    "col_last": "السعر الأخير",
    "col_vol": "التقلب السنوي",
    "col_beta": "بيتا",
    "today": "اليوم",
    "watchlist_title": "قائمة المراقبة والتنبيهات",
    "add_asset": "إضافة أصل للمراقبة",
    "btn_add": "إضافة",
    "configured_alerts": "التنبيهات المحددة",
    "remove": "حذف",
    "trading_title": "التداول المحاكي",
    "new_order": "أمر تداول جديد",
    "order_type": "النوع",
    "btn_buy": "شراء",
    "btn_sell": "بيع",
    "portfolio_status": "حالة المحفظة الاستثمارية",
    "available_cash": "السيولة المتاحة",
    "total_nav": "القيمة الإجمالية (NAV)",
    "open_positions": "المراكز المفتوحة",
    "cost": "التكلفة",
    "leaderboard_title": "لوحة صدارة الدوري",
    "league_desc": "ترتيب المتداولين المحاكين وترتيبك الحالي في المنافسة.",
    "col_rank": "#",
    "col_alias": "المتداول",
    "col_team": "الفريق",
    "col_return": "العائد",
    "col_trades": "العمليات",
    "col_sharpe": "نسبة شارب",
    "you": "أنت",
    "perfil_title": "الملف الشخصي للمستثمر",
    "perfil_desc": "إدارة الحساب المحاكي، ومستوى تحمل المخاطر، وإحصائيات الأداء المالي.",
    "config_title": "إعدادات النظام",
    "config_desc": "التفضيلات الإقليمية، والمنطقة الزمنية، وإمكانية الوصول، وواجهة المستخدم.",
    "ayuda_title": "مركز المساعدة والتعليمات",
    "ayuda_desc": "دليل استخدام الوحدات، والأسئلة الشائعة، وقاموس المصطلحات المالية.",
    "acercade_title": "حول نظام إيرنستو إنفستنغ إيه آي",
    "acercade_desc": "معلومات المشروع، والمعمارية التقنية، وفريق العمل، والإقرار الأخلاقي.",
    "user_name": "مستخدم تجريبي IHC",
    "user_id": "المعرف: G3-EST-2026",
    "risk_tolerance": "درجة تحمل المخاطر",
    "virtual_capital": "رأس المال الافتراضي المتاح",
    "total_trades": "إجمالي الصفقات المحاكاة",
    "win_rate": "نسبة الصفقات الرابحة",
    "best_asset": "أفضل أصل في المحفظة",
    "save_prefs": "حفظ التفضيلات",
    "reset_demo": "إعادة ضبط المحاكاة",
    "faq_title": "الأسئلة الشائعة",
    "glossary_title": "قاموس المصطلحات التقنية والمالية",
    "ethics_title": "إعلان المصداقية والنزاهة الأكاديمية",
    "ethics_decl": "جميع الأسعار والتوقعات والعوائد هي بيانات محاكاة تعليمية بحتة وليست استشارة استثمارية.",
    "team_title": "فريق التطوير",
    "version_info": "الإصدار 2.0 المدعوم دولياً (الأسبوع 13 · IHC 2026-II)"
  },
  "ja-JP": {
    "brand": "アーネスト・インベスティング AI",
    "nav_dash": "ダッシュボード",
    "nav_watch": "ウォッチリスト",
    "nav_trade": "取引",
    "nav_opt": "最適化",
    "portfolio": "ポートフォリオ評価額",
    "change_today": "本日の変動",
    "updated": "{time} 更新",
    "market_open": "市場は開いています",
    "market_closed": "市場は閉じています",
    "buy": "買い",
    "sell": "売り",
    "hold": "保有",
    "ticker": "銘柄コード",
    "name": "企業名",
    "price": "価格",
    "change": "変動",
    "signal": "シグナル",
    "alerts": {
      "other": "有効なアラート {n} 件"
    },
    "shares": {
      "other": "{n} 株"
    },
    "order_title": "模擬注文",
    "qty": "数量",
    "place_order": "注文を送信",
    "order_ok": "模擬注文：{ticker} を {price} で {qty}。",
    "risk": "リスク許容度",
    "conservative": "安定型",
    "moderate": "中立型",
    "aggressive": "積極型",
    "disclaimer": "教育目的の合成データです。投資助言ではありません。",
    "search_ph": "企業名または銘柄コードで検索",
    "sort_by": "名前順",
    "lang_label": "言語",
    "tz_label": "タイムゾーン",
    "close_time": "NYSE 終値時刻：{time}",
    "tip": "予測には不確実性があります。信頼区間を確認してください。",
    "nav_leaderboard": "ランキング",
    "nav_clasificacion": "分類モデル",
    "nav_regresion": "回帰分析",
    "nav_portafolios": "ポートフォリオ",
    "nav_backtesting": "バックテスト",
    "nav_perfil": "プロフィール",
    "nav_config": "設定",
    "nav_ayuda": "ヘルプ",
    "nav_acercade": "情報",
    "theme_toggle": "テーマ",
    "skip_to_content": "本文へスキップ",
    "dash_title": "市場ダッシュボード",
    "candles_title": "資産ローソク足チャート (直近120合成セッション)",
    "asset_label": "銘柄・資産",
    "filter_group": "グループで絞り込み",
    "all_groups": "すべて",
    "universe_title": "26資産ユニバース",
    "table_caption": "変動率とリスク指標（合成データ）",
    "col_ticker": "銘柄コード",
    "col_group": "グループ",
    "col_last": "現在値",
    "col_vol": "年間ボラティリティ",
    "col_beta": "ベータ値",
    "today": "本日",
    "watchlist_title": "ウォッチリストとアラート",
    "add_asset": "資産を追加",
    "btn_add": "追加",
    "configured_alerts": "設定済みアラート一覧",
    "remove": "削除",
    "trading_title": "シミュレーション取引",
    "new_order": "新規発注",
    "order_type": "注文種類",
    "btn_buy": "買い",
    "btn_sell": "売り",
    "portfolio_status": "ポートフォリオ資産状況",
    "available_cash": "利用可能現金",
    "total_nav": "純資産総額 (NAV)",
    "open_positions": "保有ポジション一覧",
    "cost": "取得単価",
    "leaderboard_title": "リーグリーダーボード",
    "league_desc": "シミュレーショントレーダーと現在のあなたの順位一覧。",
    "col_rank": "順位",
    "col_alias": "トレーダー名",
    "col_team": "チーム",
    "col_return": "収益率",
    "col_trades": "取引回数",
    "col_sharpe": "シャープレシオ",
    "you": "あなた",
    "perfil_title": "投資家プロフィール",
    "perfil_desc": "シミュレーション口座管理、リスク許容度、およびパフォーマンス統計。",
    "config_title": "システム設定",
    "config_desc": "地域設定、タイムゾーン、アクセシビリティ、UI表示設定。",
    "ayuda_title": "ヘルプセンター＆チュートリアル",
    "ayuda_desc": "機能別操作ガイド、よくある質問（FAQ）、金融用語集。",
    "acercade_title": "Ernesto Investing AI について",
    "acercade_desc": "プロジェクト概要、システムアーキテクチャ、開発チーム、倫理的宣言。",
    "user_name": "IHC デモユーザー",
    "user_id": "ID: G3-EST-2026",
    "risk_tolerance": "リスク許容度",
    "virtual_capital": "利用可能な仮想資金",
    "total_trades": "総取引回数",
    "win_rate": "シミュレーション勝率",
    "best_asset": "最高リターン資産",
    "save_prefs": "設定を保存",
    "reset_demo": "シミュレーションを初期化",
    "faq_title": "よくある質問 (FAQ)",
    "glossary_title": "IHC・金融用語集",
    "ethics_title": "誠実性と倫理に関する宣言",
    "ethics_decl": "本システムの株価・予測・リターンはすべて教育目的の合成データであり、投資助言ではありません。",
    "team_title": "開発チーム",
    "version_info": "バージョン 2.0 国際化対応 (第13週 · IHC 2026-II)"
  },
  "qu-PE": {
    "_estado": "BORRADOR: requiere revisión de hablante nativo; las claves ausentes usan es-PE",
    "brand": "Ernesto Investing AI",
    "portfolio": "Qullqi tantasqa chanin",
    "buy": "Rantiy",
    "sell": "Qatuy",
    "price": "Chanin",
    "name": "Suti",
    "qty": "Hayk'a",
    "alerts": {
      "other": "{n} willay"
    },
    "disclaimer": "Yachaywasipaq rikuchiy. Manam qullqi churanapaq kamachiychu.",
    "nav_dash": "Qhawana",
    "nav_watch": "Watiqana",
    "nav_trade": "Rantinakuy",
    "nav_opt": "Allinchana",
    "nav_leaderboard": "Ñawpaqkuna",
    "nav_clasificacion": "Taqikuna",
    "nav_regresion": "Qallariyman",
    "nav_portafolios": "Qullqi churaqkuna",
    "nav_backtesting": "Ñawpaq qhawariy",
    "nav_perfil": "Runa kikin",
    "nav_config": "Tukuchina",
    "nav_ayuda": "Yanapana",
    "nav_acercade": "Kikinkamayuq",
    "theme_toggle": "Llimphi",
    "skip_to_content": "Ukhuman phaway",
    "dash_title": "Qhatup Qhawana",
    "candles_title": "Pisi/Hatun chanin willaku (120 ruwasqa punchaw)",
    "asset_label": "Kaqnin",
    "filter_group": "Taqikama aqllay",
    "all_groups": "Lliw",
    "universe_title": "26 kaqninkuna",
    "table_caption": "Kaqninkunap t'ikrakusqan (ruwasqa willakuykuna)",
    "col_ticker": "Sutiyuq unancha",
    "col_group": "Taqi",
    "col_last": "Qhipa chanin",
    "col_vol": "Watantin kuyusqan",
    "col_beta": "Beta",
    "today": "kunan punchaw",
    "watchlist_title": "Watiqana chanta willaykuna",
    "add_asset": "Kaqnin yapay",
    "btn_add": "Yapay",
    "configured_alerts": "Kamachisqa willaykuna",
    "remove": "Qichuy",
    "trading_title": "Ruwasqa rantinakuy",
    "new_order": "Musuq kamachi",
    "order_type": "Laya",
    "btn_buy": "Rantiy",
    "btn_sell": "Qhatuy",
    "portfolio_status": "Qullqip kaynin",
    "available_cash": "Kaq qullqi",
    "total_nav": "Tukuy chanin (NAV)",
    "open_positions": "Kichasqa churaykuna",
    "cost": "Chani",
    "leaderboard_title": "Ñawpaqkunap tawlan",
    "league_desc": "Tukuy pukllaqkunap taripaynin.",
    "col_rank": "#",
    "col_alias": "Suti",
    "col_team": "Kuskayuq",
    "col_return": "Kutimuq",
    "col_trades": "Ruwaykuna",
    "col_sharpe": "Sharpe",
    "you": "Qam",
    "perfil_title": "Qullqi churapuqpa kikin",
    "perfil_desc": "Ruwasqa qullqip kamachiynin, llakiy chaskiy chanta allin taripaykuna.",
    "config_title": "Tukuy llikap allichanan",
    "config_desc": "Suyu allichana, pacha suyukuna, chanta qhawana llimphikuna.",
    "ayuda_title": "Yanapanapaq wasi",
    "ayuda_desc": "Llikap llamk'aynin yachay, sapa kuti tapukuykuna chanta rimaykuna.",
    "acercade_title": "Ernesto Investing AI-manta",
    "acercade_desc": "Llamk'aypa yachaynin, ruwaqkuna chanta allin kawsaypa willakuynin.",
    "user_name": "IHC Runa Yanapaq",
    "user_id": "Unancha: G3-EST-2026",
    "risk_tolerance": "Llakiy chaskiy",
    "virtual_capital": "Ruwasqa qullqi",
    "total_trades": "Tukuy rantisqakuna",
    "win_rate": "Ganasqa chani",
    "best_asset": "Aswan allin kaqnin",
    "save_prefs": "Allichasqata waqaychay",
    "reset_demo": "Llikata musuqmanta qallariy",
    "faq_title": "Sapa kuti tapukuykuna",
    "glossary_title": "Rimaykunap qullqan",
    "ethics_title": "Chiqaq kawsaypa willakuynin",
    "ethics_decl": "Tukuy chaninkunaqa yachanallapaqmi ruwasqa kachkan. Manam chiqap qullqi churaypaqchu.",
    "team_title": "Llamk'aq qutu",
    "version_info": "Musuq niraq 2.0 (Semana 13 · IHC 2026-II)"
  }
};

const PAGES = [
  ["index.html", "nav_dash", "dashboard"],
  ["watchlist.html", "nav_watch", "watchlist"],
  ["trading.html", "nav_trade", "trading"],
  ["leaderboard.html", "nav_leaderboard", "leaderboard"],
  ["clasificacion.html", "nav_clasificacion", "clasificacion", 1],
  ["regresion.html", "nav_regresion", "regresion", 1],
  ["optimizador.html", "nav_opt", "optimizador", 1],
  ["portafolios.html", "nav_portafolios", "portafolios", 1],
  ["backtesting.html", "nav_backtesting", "backtesting", 1],
  ["perfil.html", "nav_perfil", "perfil"],
  ["configuracion.html", "nav_config", "configuracion"],
  ["ayuda.html", "nav_ayuda", "ayuda"],
  ["acercade.html", "nav_acercade", "acercade"]
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function getLocale() { return store("eia_locale") || "es-PE"; }
function getTZ() { return store("eia_tz") || "America/Lima"; }
function isPseudo() { return !!store("eia_pseudo"); }

function pseudoloc(s) {
  if (!s || typeof s !== 'string') return s;
  const m = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú', n: 'ñ', c: 'ç' };
  const out = s.split(/(\{[^}]+\})/).map(p => /^\{/.test(p) ? p : p.replace(/[aeiouAEIOUnc]/g, c => m[c] || c)).join('');
  return '[' + out + ' ' + '·'.repeat(Math.ceil(s.length * 0.4)) + ']';
}

function t(key, vars = {}) {
  const loc = getLocale();
  const d = I18N_DICTS[loc] || I18N_DICTS["es-PE"] || {};
  let val = d[key] !== undefined ? d[key] : (I18N_DICTS["es-PE"] || {})[key];
  if (val === undefined) return '⟦' + key + '⟧';
  if (typeof val === 'object') {
    const cat = new Intl.PluralRules(loc).select(vars.n !== undefined ? vars.n : 1);
    val = val[cat] !== undefined ? val[cat] : (val.other !== undefined ? val.other : JSON.stringify(val));
  }
  let res = String(val).replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : '{' + k + '}'));
  return isPseudo() ? pseudoloc(res) : res;
}

function applyI18n(root) {
  (root || document).querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const translated = t(key);
    if (translated && !translated.startsWith('⟦')) {
      el.textContent = translated;
    }
  });
}

function setLocale(loc) {
  if (!LOCALES_INFO[loc]) loc = "es-PE";
  store("eia_locale", loc);
  const info = LOCALES_INFO[loc];
  document.documentElement.lang = info.lang;
  document.documentElement.dir = info.dir;
  rebuildShell();
  applyI18n();
  if (window.onLocaleChange) window.onLocaleChange(loc);
}

function setTZ(tz) {
  store("eia_tz", tz);
  rebuildShell();
  if (window.onTZChange) window.onTZChange(tz);
}

function setPseudo(ps) {
  store("eia_pseudo", !!ps);
  rebuildShell();
  applyI18n();
  if (window.onLocaleChange) window.onLocaleChange(getLocale());
}

function rebuildShell() {
  const header = $("header.top");
  if (header) header.remove();
  const skip = $(".skip");
  if (skip) skip.remove();
  const notice = $("p.aviso-footer");
  if (notice) notice.remove();
  buildShell();
}

const fmt = {
  n: (x, d = 2) => {
    const loc = getLocale();
    return new Intl.NumberFormat(loc, { minimumFractionDigits: d, maximumFractionDigits: d }).format(x);
  },
  pct: (x, d = 2) => {
    const loc = getLocale();
    const val = (Math.abs(x) > 1 ? x / 100 : x);
    return new Intl.NumberFormat(loc, { style: "percent", minimumFractionDigits: d, maximumFractionDigits: d, signDisplay: "exceptZero" }).format(val);
  },
  usd: x => {
    const loc = getLocale();
    return new Intl.NumberFormat(loc, { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(x);
  },
  date: (str, opts = {}) => {
    const loc = getLocale();
    const tz = getTZ();
    try {
      const dt = new Date(str);
      const conf = Object.assign({ dateStyle: "medium", timeStyle: "short", timeZone: tz }, opts);
      return new Intl.DateTimeFormat(loc, conf).format(dt);
    } catch(e) {
      return str;
    }
  },
  cls: x => x > 0 ? "up" : (x < 0 ? "dn" : "mut"),
  sort: (arr, fn) => {
    const loc = getLocale();
    return arr.slice().sort((a, b) => new Intl.Collator(loc).compare(fn(a), fn(b)));
  }
};

const cache = {};
async function loadJSON(name) {
  if (cache[name]) return cache[name];
  const r = await fetch("data/" + name);
  if (!r.ok) throw new Error("No se pudo leer data/" + name + " (" + r.status + ")");
  return cache[name] = await r.json();
}

function store(k, v) {
  try {
    if (v === undefined) {
      const s = localStorage.getItem(k);
      return s ? JSON.parse(s) : null;
    }
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {
    return null;
  }
}

function applyTheme(t) {
  if (t) document.documentElement.setAttribute("data-theme", t);
}

function buildShell() {
  applyTheme(store("eia_theme"));
  const loc = getLocale();
  const tz = getTZ();
  const info = LOCALES_INFO[loc] || LOCALES_INFO["es-PE"];
  document.documentElement.lang = info.lang;
  document.documentElement.dir = info.dir;

  const page = document.body.dataset.page;
  const nav = PAGES.map(p => {
    const label = t(p[1]) !== ('⟦' + p[1] + '⟧') ? t(p[1]) : p[2];
    const isCurrent = (p[2] === page);
    const isNew = p[3];
    return `<li><a href="${p[0]}" ${isCurrent ? 'aria-current="page"' : ''} class="${isNew ? 'nuevo' : ''}">${label}</a></li>`;
  }).join("");

  const langOpts = Object.keys(LOCALES_INFO).map(l =>
    `<option value="${l}" ${loc === l ? 'selected' : ''}>${LOCALES_INFO[l].name}</option>`
  ).join("");

  const tzOpts = TIMEZONES.map(z =>
    `<option value="${z.id}" ${tz === z.id ? 'selected' : ''}>${z.label}</option>`
  ).join("");

  const themeLabel = t('theme_toggle');
  const skipLabel = t('skip_to_content');
  const disclaimer = t('disclaimer');

  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#contenido">${skipLabel}</a>
    <header class="top">
      <div class="bar">
        <a class="brand" href="index.html">${t('brand')}</a>
        <nav aria-label="Módulos del sistema">
          <ul>${nav}</ul>
        </nav>
        <span class="sp"></span>
        <div style="display:inline-flex;align-items:center;gap:.4rem;flex-wrap:wrap">
          <label for="lang-sel" style="display:none">${t('lang_label')}</label>
          <select id="lang-sel" aria-label="${t('lang_label')}" style="width:auto;padding:.3rem .5rem;font-size:.85rem;cursor:pointer">
            ${langOpts}
          </select>
          <label for="tz-sel" style="display:none">${t('tz_label')}</label>
          <select id="tz-sel" aria-label="${t('tz_label')}" style="width:auto;padding:.3rem .5rem;font-size:.85rem;cursor:pointer">
            ${tzOpts}
          </select>
          <label style="display:inline-flex;align-items:center;gap:.25rem;font-size:.82rem;margin:0;cursor:pointer">
            <input type="checkbox" id="pseudo-chk" ${isPseudo() ? 'checked' : ''} style="width:auto">
            <span>Pseudo</span>
          </label>
          <button id="tema" type="button" aria-pressed="false" title="Cambiar tema claro/oscuro">
            ${themeLabel}
          </button>
        </div>
      </div>
    </header>
  `);

  const temaBtn = $("#tema");
  if (temaBtn) {
    temaBtn.addEventListener("click", () => {
      const cur = document.documentElement.getAttribute("data-theme") ||
        (matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light");
      const next = cur === "dark" ? "light" : "dark";
      applyTheme(next);
      store("eia_theme", next);
      temaBtn.setAttribute("aria-pressed", next === "dark");
      if (window.onTheme) window.onTheme(next);
    });
  }

  const langSel = $("#lang-sel");
  if (langSel) langSel.addEventListener("change", e => { setLocale(e.target.value); });
  const tzSel = $("#tz-sel");
  if (tzSel) tzSel.addEventListener("change", e => { setTZ(e.target.value); });
  const pseudoChk = $("#pseudo-chk");
  if (pseudoChk) pseudoChk.addEventListener("change", e => { setPseudo(e.target.checked); });

  const m = $("main");
  if (m) {
    m.id = "contenido";
    m.insertAdjacentHTML("beforeend", `
      <p class="aviso aviso-footer" style="margin-top:2.5rem">${disclaimer}</p>
    `);
  }

  applyI18n();
}

function showError(e) {
  const m = $("main");
  if (m) {
    m.insertAdjacentHTML("afterbegin", `
      <p class="err" role="alert">
        ${e.message}. Abra el sitio desde un servidor HTTP local (ej. <code>python -m http.server 8000</code> o GitHub Pages), no mediante doble clic directo.
      </p>
    `);
  }
}

// Exportar globalmente al objeto window
if (typeof window !== "undefined") {
  window.fmt = fmt;
  window.t = t;
  window.applyI18n = applyI18n;
  window.setLocale = setLocale;
  window.setTZ = setTZ;
  window.setPseudo = setPseudo;
  window.getLocale = getLocale;
  window.getTZ = getTZ;
  window.isPseudo = isPseudo;
  window.LOCALES_INFO = LOCALES_INFO;
  window.loadJSON = loadJSON;
  window.$ = $;
  window.$$ = $$;
  window.buildShell = buildShell;
}

if (typeof document !== "undefined" && document.addEventListener) {
  document.addEventListener("DOMContentLoaded", () => {
    buildShell();
    if (window.init) Promise.resolve(window.init()).catch(showError);
  });
}
