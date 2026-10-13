"""Bundle the local game and artwork into one offline classroom file."""
from pathlib import Path
import base64
from zipfile import ZipFile, ZIP_DEFLATED

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
archive = root / "Workflow-Quest.zip"
with ZipFile(archive, "w", compression=ZIP_DEFLATED) as bundle:
    bundle.write(destination, destination.name)
    bundle.writestr(
        "READ-ME.txt",
        "WORKFLOW QUEST\n\n"
        "1. Unzip this download.\n"
        "2. Right-click Play-Workflow-Quest.html.\n"
        "3. Choose Open With, then Chrome, Safari, Edge, or Firefox.\n"
        "4. Click Enter the control room, then a red checkpoint.\n\n"
        "All artwork and game code are included. No installation or internet connection is needed.\n",
    )
print(f"Created {archive.name}: {archive.stat().st_size:,} bytes")
