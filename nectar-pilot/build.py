#!/usr/bin/env python3
"""Bundle the Nectar Pilot interface into single self-contained HTML files.

    python build.py

Writes:
    dist/nectar-pilot.html   full standalone document — open it directly
    dist/artifact.html       body content only, for hosts that supply the shell

Both files inline every stylesheet, font and script, so they work offline and
under a strict content-security policy. No dependencies, no toolchain.
"""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent
UI = ROOT / "ui"
DIST = ROOT / "dist"

TITLE = "Nectar Pilot"
DESCRIPTION = "Nectar Pilot — an automation cockpit for Bee Swarm Simulator. Designed by Horalix."


def read(name: str) -> str:
    path = UI / name
    if not path.exists():
        sys.exit(f"build: missing {path}")
    return path.read_text(encoding="utf-8")


def body_of(html: str) -> str:
    """Inner HTML of <body>, minus the <script src> tag we inline ourselves."""
    match = re.search(r"<body[^>]*>(.*)</body>", html, re.S | re.I)
    if not match:
        sys.exit("build: no <body> in ui/index.html")
    body = match.group(1)
    return re.sub(r'\s*<script src="[^"]*"></script>', "", body).strip()


def main() -> None:
    fonts = read("fonts.css")
    styles = read("styles.css")
    app = read("app.js")
    body = body_of(read("index.html"))

    css = f"/* fonts */\n{fonts}\n\n/* styles */\n{styles}"
    DIST.mkdir(exist_ok=True)

    standalone = (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        "<meta charset=\"utf-8\" />\n"
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n"
        f"<title>{TITLE}</title>\n"
        f"<meta name=\"description\" content=\"{DESCRIPTION}\" />\n"
        f"<style>\n{css}\n</style>\n</head>\n<body>\n{body}\n"
        f"<script>\n{app}\n</script>\n</body>\n</html>\n"
    )
    (DIST / "nectar-pilot.html").write_text(standalone, encoding="utf-8")

    artifact = (
        f"<title>{TITLE}</title>\n<style>\n{css}\n</style>\n{body}\n"
        f"<script>\n{app}\n</script>\n"
    )
    (DIST / "artifact.html").write_text(artifact, encoding="utf-8")

    for name in ("nectar-pilot.html", "artifact.html"):
        size = (DIST / name).stat().st_size
        print(f"  dist/{name:<20} {size / 1024:7.1f} KB")


if __name__ == "__main__":
    main()
