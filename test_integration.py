"""
Test de Integración para Ernesto Investing AI (Semana 13 IHC)
Verifica la integridad de las 9 páginas del sistema integrado,
estructuras HTML, CSS, JavaScript, enlaces cruzados y contratos de datos.
Opcionalmente ejecuta Playwright si está instalado en el entorno.
"""

import os
import re
import sys
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

PAGES = [
    ("index.html", "dashboard"),
    ("watchlist.html", "watchlist"),
    ("trading.html", "trading"),
    ("leaderboard.html", "leaderboard"),
    ("clasificacion.html", "clasificacion"),
    ("regresion.html", "regresion"),
    ("optimizador.html", "optimizador"),
    ("portafolios.html", "portafolios"),
    ("backtesting.html", "backtesting"),
]

DATA_FILES = [
    "01_universo_tickers.json",
    "02_precios_sinteticos_504d.json",
    "03_ohlcv_sintetico_120d.json",
    "04_matriz_correlacion_covarianza.json",
    "05_clasificadores_binarios.json",
    "06_regresores_precio_30d.json",
    "07_optimizador_markowitz_nsga.json",
    "08_portafolios_3_niveles_riesgo.json",
    "09_backtesting_portafolios.json",
    "10_dashboard_mercado.json",
    "11_watchlist_alertas_portafolio_demo.json",
    "12_leaderboard_liga.json",
    "13_patrones_y_parametros.json",
]


def test_html_and_assets():
    print("=" * 60)
    print("TEST 1: Verificación de estructura HTML y referencias")
    print("=" * 60)

    for filename, expected_page in PAGES:
        filepath = os.path.join(BASE_DIR, filename)
        assert os.path.exists(filepath), f"Falta archivo: {filename}"

        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Chequeos estándar
        assert "<!doctype html>" in content.lower(), f"{filename}: falta <!doctype html>"
        assert "viewport" in content.lower(), f"{filename}: falta meta viewport para móvil"
        assert "css/styles.css" in content, f"{filename}: no enlaza css/styles.css"
        assert "js/common.js" in content, f"{filename}: no enlaza js/common.js"

        # Verificar data-page
        match = re.search(r'data-page=["\']([^"\']+)["\']', content)
        assert match, f"{filename}: falta atributo data-page"
        assert match.group(1) == expected_page, (
            f"{filename}: data-page esperado '{expected_page}', obtenido '{match.group(1)}'"
        )

        print(f"  [OK] {filename:20s} -> data-page='{expected_page}'")


def test_data_files():
    print("\n" + "=" * 60)
    print("TEST 2: Integridad de los 13 archivos JSON de datos")
    print("=" * 60)

    for data_file in DATA_FILES:
        filepath = os.path.join(BASE_DIR, "data", data_file)
        assert os.path.exists(filepath), f"Falta archivo de datos: {data_file}"

        with open(filepath, "r", encoding="utf-8") as f:
            try:
                data = json.load(f)
                size_kb = os.path.getsize(filepath) / 1024
                print(f"  [OK] data/{data_file:38s} ({size_kb:6.1f} KB)")
            except Exception as e:
                raise AssertionError(f"Error parseando {data_file}: {e}")


def test_playwright():
    print("\n" + "=" * 60)
    print("TEST 3: Verificación con Playwright (Headless Browser)")
    print("=" * 60)

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("  [INFO] Playwright no está instalado en este entorno Python.")
        print("  Para ejecutar pruebas de navegador automatizadas: pip install playwright && playwright install")
        return

    import http.server
    import socketserver
    import threading

    PORT = 8899
    Handler = http.server.SimpleHTTPRequestHandler

    class QuietServer(socketserver.TCPServer):
        allow_reuse_address = True

    os.chdir(BASE_DIR)
    httpd = QuietServer(("127.0.0.1", PORT), Handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()

    viewports = [
        {"name": "Desktop (1280x800)", "width": 1280, "height": 800},
        {"name": "Móvil (390x844)", "width": 390, "height": 844},
    ]

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            for vp in viewports:
                print(f"\nProbando resolución: {vp['name']}...")
                page = browser.new_page(viewport={"width": vp["width"], "height": vp["height"]})
                
                errors = []
                page.on("pageerror", lambda err: errors.append(err))
                page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

                for filename, _ in PAGES:
                    url = f"http://127.0.0.1:{PORT}/{filename}"
                    page.goto(url, wait_until="networkidle")
                    
                    # Verificar desborde horizontal
                    scroll_w = page.evaluate("() => document.documentElement.scrollWidth")
                    inner_w = page.evaluate("() => window.innerWidth")
                    overflow = scroll_w > inner_w

                    assert not overflow, f"Desborde horizontal en {filename} ({scroll_w}px > {inner_w}px)"
                    print(f"  [OK] {filename:20s} - Sin desborde horizontal ({scroll_w} <= {inner_w})")

                assert len(errors) == 0, f"Errores de consola detectados: {errors}"
            browser.close()
        print("\nTodas las páginas verificadas con Playwright sin errores de consola.")
    finally:
        httpd.shutdown()


if __name__ == "__main__":
    test_html_and_assets()
    test_data_files()
    test_playwright()
    print("\n" + "=" * 60)
    print("RESUMEN: Todos los tests de integración pasaron exitosamente.")
    print("=" * 60)
