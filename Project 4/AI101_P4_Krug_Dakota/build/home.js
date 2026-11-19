(()=>{
 function enterMenu(){
  document.body.classList.remove('menu-entering');$('homeScreen').inert=false;
 }
 document.addEventListener('keyline:intro-closed',enterMenu);
 function stopMenuMusic(){document.dispatchEvent(new Event('keyline:stop-menu-music'))}
 function showHome(){coachStop();document.body.classList.add('home-view');document.body.classList.remove('show-library');window.scrollTo(0,0);$('goHome').hidden=true;$('appLibrary').hidden=true;$('homeContinue').textContent='Continue · '+$('title').textContent+' →';if(!$('openingScene').open&&!document.body.classList.contains('intro-pending'))enterMenu()}
 function showStudio(importing=false){stopMenuMusic();document.body.classList.remove('menu-entering');$('homeScreen').inert=false;document.body.classList.remove('home-view');document.body.classList.toggle('show-library',importing);$('goHome').hidden=false;$('appLibrary').hidden=false;$('appLibrary').textContent=importing?'← Back to practice':'♫ Music library';window.scrollTo(0,0)}
 function settings(){coachStop();$('settingsDialog').showModal()}
 $('goHome').onclick=showHome;document.querySelector('.brand').onclick=e=>{e.preventDefault();showHome()};
 $('homeContinue').onclick=()=>showStudio();$('homeLessons').onclick=()=>{stopMenuMusic();$('timeToPlay').click()};
 $('homeLocker').onclick=()=>{$('openLocker').click()};$('homeImport').onclick=()=>{showStudio(true);if(!busy && !stream?.active) $('status').textContent='';$('drop').focus({preventScroll:true})};
 $('homeSettings').onclick=settings;$('openSettings').onclick=settings;$('closeSettings').onclick=()=>$('settingsDialog').close();
 $('settingsHelp').onclick=()=>{$('settingsDialog').close();$('help').click()};
 $('lessonCards').addEventListener('click',e=>{const lesson=e.target.closest('[data-lesson]');if(lesson){$('coachPart').value=lessonCatalog[+lesson.dataset.lesson].hand;showStudio()}},{capture:true});
 $('tryGloveDemo').addEventListener('click',()=>showStudio(),{capture:true});
 new MutationObserver(()=>{$('homeContinue').textContent='Continue · '+$('title').textContent+' →'}).observe($('title'),{childList:true,characterData:true,subtree:true});
 const sparks=[[12,22,12],[32,8,7],[72,12,16],[93,35,8],[84,77,13],[57,94,7],[15,81,17],[45,44,8],[69,61,6]];
 document.querySelectorAll('.home-bubble').forEach((button,index)=>{
  const orbit=document.createElement('div');orbit.className='bubble-orbit';orbit.style.setProperty('--orbit-delay',(-index*1.4)+'s');orbit.style.setProperty('--float-duration',(6.4+index*.65)+'s');
  button.before(orbit);const particles=document.createElement('span');particles.className='bubble-sparkles';particles.setAttribute('aria-hidden','true');
  sparks.forEach(([x,y,size],i)=>{const particle=document.createElement('i');particle.className=i%3===1?'bubble-star':'bubble-pearl';particle.style.cssText=`--sx:${x}%;--sy:${y}%;--size:${size}px;--delay:${-i*.7-index*.5}s;--drift:${3.5+(i%4)*.6}s`;particles.append(particle)});
  orbit.append(particles,button);
  button.addEventListener('pointermove',e=>{const bounds=button.getBoundingClientRect();button.style.setProperty('--glint-x',((e.clientX-bounds.left)/bounds.width*100)+'%');button.style.setProperty('--glint-y',((e.clientY-bounds.top)/bounds.height*100)+'%')});
  button.addEventListener('pointerleave',()=>{button.style.removeProperty('--glint-x');button.style.removeProperty('--glint-y')});
 });
 showHome();
})();
