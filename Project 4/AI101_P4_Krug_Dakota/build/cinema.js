// Theme and opening preferences are independent of lesson playback.
(() => {
 const root = document.documentElement;
 const scene = document.getElementById('openingScene');
 const skip = document.getElementById('skipIntro');
 const theme = document.getElementById('themeToggle');
 const animation = document.getElementById('animationToggle');
 const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
 const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };

 root.dataset.theme = read('keyline-theme') === 'light' ? 'light' : 'dark';
 function labelTheme() {
  const dark = root.dataset.theme === 'dark';
  theme.textContent = 'Dark mode · ' + (dark ? 'on' : 'off');
  theme.setAttribute('aria-checked', String(dark));
 }
 theme.onclick = () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  save('keyline-theme', root.dataset.theme);
  labelTheme();
 };
 labelTheme();

 let enabled = read('keyline-intro-enabled') !== 'off';
 function labelAnimation() {
  animation.textContent = 'Animation · ' + (enabled ? 'on' : 'off');
  animation.setAttribute('aria-checked', String(enabled));
 }
 animation.onclick = () => {
  enabled = !enabled;
  save('keyline-intro-enabled', enabled ? 'on' : 'off');
  labelAnimation();
 };
 labelAnimation();
 if (!enabled || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

 const film = document.createElement('video');
 const previousFocus = document.activeElement;
 let startupTimer;
 function close() {
  if (!scene.open) return;
  clearTimeout(startupTimer);
  film.pause();
  scene.close();
  film.remove();
  previousFocus?.focus();
  document.dispatchEvent(new Event('keyline:intro-closed'));
 }

 film.className = 'upright-film';
 const orientation = matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
 film.src = `intro/intro-${orientation}.mp4`;
 film.poster = `intro/intro-${orientation}.jpg`;
 film.playsInline = true;
 film.defaultPlaybackRate = 1.2;
 film.playbackRate = 1.2;
 film.setAttribute('aria-label', 'Three loose shelves break above an upright piano, dropping pencils, pens, and rubber balls onto the keys.');
 film.addEventListener('ended', close, { once: true });
 film.addEventListener('error', close, { once: true });

 async function start() {
  startupTimer = setTimeout(close, 12000);
  try {
   try {
    await film.play();
   } catch (error) {
    if (!scene.open) return;
    if (error.name !== 'NotAllowedError') throw error;
    // Keep the intro moving when the browser requires a gesture for sound.
    film.muted = true;
    await film.play();
   }
  } catch {
   close();
  } finally {
   clearTimeout(startupTimer);
  }
 }
 // An optional tap on the video can enable sound without a play control.
 film.addEventListener('click', () => {
  if (!film.muted) return;
  film.muted = false;
  film.play().catch(() => {
   if (!scene.open) return;
   film.muted = true;
   film.play().catch(close);
  });
 });

 skip.onclick = close;
 scene.addEventListener('cancel', event => { event.preventDefault(); close(); });
 document.addEventListener('visibilitychange', () => { if (document.hidden) close(); });
 scene.append(film);
 scene.showModal();
 skip.focus();
 start();
})();
