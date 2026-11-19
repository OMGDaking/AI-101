// Classroom package has no bundled commercial background track.
(() => {
 const panel = document.getElementById('homeMusic');
 if (panel) panel.hidden = true;
 const settings = document.getElementById('backgroundToggle');
 if (settings) { settings.textContent = 'Background track omitted'; settings.disabled = true; }
 for (const id of ['backgroundVolume', 'backgroundPauseSettings']) {
  const control = document.getElementById(id);
  if (control) control.disabled = true;
 }
})();
