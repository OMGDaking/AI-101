(() => {
 $('status').textContent = '';
 const panel = $('importPanel');
 for (const [buttonId, sectionId] of [
  ['importOptions', 'importChoices'], ['browseExamples', 'importExamples']
 ]) {
  $(buttonId).addEventListener('click', () => {
   const section = $(sectionId);
   section.hidden = !section.hidden;
   $(buttonId).setAttribute('aria-expanded', String(!section.hidden));
  });
 }

 panel.addEventListener('click', event => {
  const button = event.target.closest('[data-import-select]');
  if (!button || busy || stream?.active) return;
  const field = $(button.dataset.importSelect);
  field.value = button.value;
  for (const peer of button.parentElement.querySelectorAll('button')) {
   peer.setAttribute('aria-pressed', String(peer === button));
  }
  if (field.id === 'difficulty' && rawNotes) $('rearrange').hidden = false;
 });

 function openPractice() {
  if (!document.body.classList.contains('show-library')) return;
  $('homeContinue').click();
  $('learnTab').focus({ preventScroll: true });
 }
 document.addEventListener('keyline:import-ready', openPractice);
 // App buttons already own loading. This wrapper opens practice only after success.
 for (const id of ['demo', 'moonlight', 'moonlightThird']) {
  const button = $(id);
  const loadExample = button.onclick;
  button.onclick = async () => {
   if (busy || stream?.active) return;
   if (id === 'demo') {
    loadExample();
    openPractice();
    return;
   }
   await loadExample();
   const movement = id === 'moonlightThird' ? 3 : 1;
   if (sourcePiece && sourceMovement === movement) openPractice();
  };
 }
})();
