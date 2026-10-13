"""Bundle the local game and artwork into one offline classroom file."""
from pathlib import Path
import base64

root = Path(__file__).resolve().parent
html = (root / "dist/index.html").read_text()
css = "\n".join(
    line for line in (root / "dist/style.css").read_text().splitlines()
    if not line.lstrip().startswith("@import")
)
js = (root / "dist/game.js").read_text()
art = base64.b64encode((root / "dist/assets/cy7-recovery-room.png").read_bytes()).decode()
html = html.replace('<link rel="stylesheet" href="style.css">', f"<style>{css}</style>")
html = html.replace('<script src="game.js"></script>', f"<script>{js}</script>")
html = html.replace('src="assets/cy7-recovery-room.png"', f'src="data:image/png;base64,{art}"')
destination = root / "Play-Workflow-Quest.html"
destination.write_text(html)
print(f"Created {destination.name}: {destination.stat().st_size:,} bytes")
