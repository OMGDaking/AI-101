const gloveCatalog=[
 {id:'classic',name:'Classic',xp:0,detail:'Your everyday practice hand',palette:null},
 {id:'forest',name:'Forest Camo',xp:60,detail:'First steps, forest shades',palette:['#a9b085','#68784f','#3c5037','#c9c4a1']},
 {id:'urban',name:'Urban Camo',xp:150,detail:'Concrete, charcoal and slate',palette:['#9ba5aa','#52616e','#283940','#d0d5d4']},
 {id:'desert',name:'Desert Camo',xp:300,detail:'Sandstone and sunset trails',palette:['#c9aa77','#9b754f','#745446','#ead4ae']},
 {id:'arctic',name:'Arctic Camo',xp:450,detail:'Ice blue with winter white',palette:['#e0eaf0','#afc8d7','#7796a9','#f7fbfc']},
 {id:'spotlight',name:'Spotlight Glove',xp:600,detail:'Michael Jackson–inspired silver sparkle',sparkle:true},
 {id:'mystery',name:'Mystery Camo',xp:900,detail:'Your own randomly colored pattern',random:true}
];
const gloveStorageKey='keyline-practice-v1';
let storageAvailable=true;
function readGloveState(){try{const s=JSON.parse(localStorage.getItem(gloveStorageKey)||'null')||{};return {xp:Number.isFinite(s.xp)?Math.max(0,Math.min(1e8,Math.floor(s.xp))):0,activeMs:Number.isFinite(s.activeMs)?Math.max(0,Math.min(1e11,s.activeMs)):0,equipped:gloveCatalog.some(g=>g.id===s.equipped&&g.xp<=s.xp)?s.equipped:'classic',seed:Number.isInteger(s.seed)?s.seed>>>0:crypto.getRandomValues(new Uint32Array(1))[0]};}catch{storageAvailable=false;return {xp:0,activeMs:0,equipped:'classic',seed:123456789};}}
let gloveState=readGloveState(),practiceInputMode='keys',practiceRunning=false,lastPracticeActivity=0,lastPracticeTick=0,practiceTimer,sessionXp=0,practiceBonusWindow=0,practiceBonuses=0,rewardToastTimer;
function saveGloveState(){try{localStorage.setItem(gloveStorageKey,JSON.stringify(gloveState));}catch{storageAvailable=false;}}
function seededRandom(seed){return()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function glovePalette(skin){if(!skin.random)return skin.palette;const rand=seededRandom(gloveState.seed),h=Math.floor(rand()*360);return [18,32,45,68].map((l,i)=>`hsl(${(h+i*31)%360} ${25+Math.floor(rand()*36)}% ${l}%)`);}
function glovePattern(skin,id){if(skin.id==='classic')return '';if(skin.sparkle)return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="18" height="18"><rect width="18" height="18" fill="#e7eaf0"/><path d="M0 5L18 2M0 14L18 11" stroke="#fff" stroke-width="1"/><circle cx="4" cy="4" r="2" fill="#fff" stroke="#adb8c6" stroke-width=".6"/><circle cx="13" cy="13" r="2" fill="#c1c9d5" stroke="#fff" stroke-width="1"/><path d="M13 2v6M10 5h6M4 11v6M1 14h6" stroke="#fff" stroke-width="1.2"/></pattern>`;const colors=glovePalette(skin),rand=seededRandom(skin.random?gloveState.seed:skin.xp*91);let p=`<pattern id="${id}" patternUnits="userSpaceOnUse" width="65" height="65"><rect width="65" height="65" fill="${colors[0]}"/>`;for(let i=0;i<14;i++){const x=Math.round(rand()*65),y=Math.round(rand()*65),rx=7+Math.round(rand()*12),ry=4+Math.round(rand()*9);p+=`<path d="M${x-rx} ${y} q${rx*.3} ${-ry*2} ${rx} ${-ry} t${rx} ${ry} q${-rx*.3} ${ry*2} ${-rx} ${ry} t${-rx} ${-ry}Z" fill="${colors[1+i%3]}" transform="rotate(${Math.round(rand()*120)} ${x} ${y})"/>`;}return p+'</pattern>';}
function gloveHue(id) {
 return id === 'mystery' ? gloveState.seed % 360 : 0;
}
let swatchId = 0;
function skinSwatch(skin) {
 const id = 'locker-swatch-' + ++swatchId;
 const pattern = glovePattern(skin, id);
 const hand = anatomicalHandMarkup({prefix:id, numbered:false, fill:pattern ? `url(#${id})` : null});
 return `<span class="glove-swatch">
  <svg viewBox="0 0 220 210" aria-hidden="true"><defs>${pattern}</defs>${hand}</svg>
  <img class="glove-render" src="gloves/${skin.id}.png?v=locker-2" alt="" style="--glove-hue:${gloveHue(skin.id)}deg">
 </span>`;
}
document.addEventListener('load', event => {
 if (event.target instanceof HTMLImageElement && event.target.matches('.glove-render')) {
  event.target.parentElement.classList.add('image-ready');
 }
}, true);
function applyGloveSkin(container,skinId=gloveState.equipped){if(!container)return;const skin=gloveCatalog.find(g=>g.id===skinId)||gloveCatalog[0];container.dataset.skin=skin.id;container.querySelectorAll('svg').forEach((svg,i)=>{const id='equipped-'+container.id+'-'+i+'-pattern';svg.dataset.skin=skin.id;svg.querySelector('[data-glove-defs]')?.remove();const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');defs.setAttribute('data-glove-defs','');defs.innerHTML=glovePattern(skin,id);svg.prepend(defs);svg.querySelectorAll('.hand-palm,.hand-finger').forEach(el=>{if(skin.id==='classic'){el.style.removeProperty('fill');el.style.removeProperty('fill-opacity');}else{el.style.fill=`url(#${id})`;el.style.fillOpacity='1';}});});}
function refreshEquippedGlove(){applyGloveSkin($('handDiagram'));applyGloveSkin($('movingHand'));applyGloveSkin($('movingLeftHand'));$('equippedGlove').textContent=(gloveCatalog.find(g=>g.id===gloveState.equipped)||gloveCatalog[0]).name;}
function renderGloveLocker() {
 const next = gloveCatalog.find(skin => skin.xp > gloveState.xp);
 $('lockerXp').textContent = gloveState.xp + ' XP';
 $('lockerProgress').max = next?.xp || Math.max(1, gloveState.xp);
 $('lockerProgress').value = gloveState.xp;
 $('lockerNext').textContent = next ? `${next.xp - gloveState.xp} XP to ${next.name}` : 'Collection complete';
 $('gloveGrid').innerHTML = gloveCatalog.map(skin => {
  const equipped = skin.id === gloveState.equipped;
  const unlocked = gloveState.xp >= skin.xp;
  return `<button type="button" class="glove-card${equipped ? ' equipped' : ''}" data-preview="${skin.id}">
   <span class="glove-art">${skinSwatch(skin)}</span>
   <strong>${skin.name}</strong>
   <span class="glove-state">${equipped ? 'Equipped' : unlocked ? 'Ready to equip' : '🔒 ' + skin.xp + ' XP'}</span>
  </button>`;
 }).join('');
 $('gloveGrid').querySelectorAll('[data-preview]').forEach(button => {
  button.onclick = () => previewGlove(button.dataset.preview);
 });
 $('shuffleCamo').hidden = gloveState.equipped !== 'mystery';
 $('lockerStorage').textContent = storageAvailable ? '' : 'Progress lasts for this session.';
 const selection = $('lockerPreview').dataset.selection;
 if (selection) previewGlove(selection, false);
}

function equipGlove(id){const skin=gloveCatalog.find(g=>g.id===id);if(!skin||skin.xp>gloveState.xp)return;gloveState.equipped=id;saveGloveState();refreshEquippedGlove();renderGloveLocker();if(typeof render==='function')render();announceReward(skin.name+' equipped.');}
function announceReward(message){$('rewardToast').textContent=message;$('rewardToast').hidden=false;clearTimeout(rewardToastTimer);rewardToastTimer=setTimeout(()=>$('rewardToast').hidden=true,4500);}
function grantPracticeXP(amount){const old=gloveState.xp;gloveState.xp+=Math.max(0,Math.floor(amount));sessionXp+=Math.max(0,Math.floor(amount));const unlocked=gloveCatalog.filter(g=>g.xp>old&&g.xp<=gloveState.xp);if(unlocked.length)announceReward('Unlocked: '+unlocked.map(g=>g.name).join(', ')+'. Open Glove Locker to equip.');saveGloveState();updatePracticeBar();if($('gloveLocker').open)renderGloveLocker();}
function practiceActivity(){if(!practiceRunning||document.visibilityState!=='visible')return;const now=performance.now();lastPracticeActivity=now;if(practiceInputMode==='piano'){updatePracticeBar();return;}const windowId=Math.floor(now/1000);if(practiceBonusWindow!==windowId){practiceBonusWindow=windowId;practiceBonuses=0;}if(practiceBonuses<2){practiceBonuses++;grantPracticeXP(2);}updatePracticeBar();}
function updatePracticeBar(){const next=gloveCatalog.find(g=>g.xp>gloveState.xp);$('practiceXp').textContent=gloveState.xp+' XP';$('practiceNext').textContent=next?`${next.name} · ${next.xp-gloveState.xp} XP to unlock`:'All gloves unlocked';$('practiceSession').textContent=practiceRunning?(practiceInputMode==='piano'?`Piano timer · self-reported · +${sessionXp} XP this session`:lastPracticeActivity&&performance.now()-lastPracticeActivity<10000?`Practicing · +${sessionXp} XP this session`:'Play a key or step through notes to earn XP'):(practiceInputMode==='piano'?'Start a visible practice timer for your own piano':'Start a session, then use the keys or note steps');$('startPractice').textContent=practiceRunning?'End practice':'Start practice';$('startPractice').setAttribute('aria-pressed',practiceRunning);}
function togglePractice(){practiceRunning=!practiceRunning;lastPracticeActivity=0;lastPracticeTick=performance.now();sessionXp=0;updatePracticeBar();}
function tickPractice(){const now=performance.now(),elapsed=Math.max(0,Math.min(2000,now-(practiceInputMode==='piano'?lastPracticeTick:Math.max(lastPracticeTick,lastPracticeActivity))));lastPracticeTick=now;if(!practiceRunning||document.visibilityState!=='visible'||(practiceInputMode==='keys'&&(!lastPracticeActivity||now-lastPracticeActivity>=10000)))return;const before=Math.floor(gloveState.activeMs/1000);gloveState.activeMs+=elapsed;const points=Math.floor(gloveState.activeMs/1000)-before;if(points)grantPracticeXP(points);}
function initializeRewards(){saveGloveState();refreshEquippedGlove();updatePracticeBar();$('openLocker').onclick=()=>{renderGloveLocker();$('gloveLocker').showModal();};$('closeLocker').onclick=()=>$('gloveLocker').close();$('startPractice').onclick=togglePractice;$('practiceInput').onchange=()=>{practiceInputMode=$('practiceInput').value;lastPracticeActivity=0;lastPracticeTick=performance.now();updatePracticeBar();};$('shuffleCamo').onclick=()=>{if(gloveState.xp<900)return;gloveState.seed=crypto.getRandomValues(new Uint32Array(1))[0];saveGloveState();refreshEquippedGlove();renderGloveLocker();if(typeof render==='function')render();};$('tryGloveDemo').onclick=()=>{$('gloveLocker').close();demo();tab(false);};lastPracticeTick=performance.now();practiceTimer=setInterval(tickPractice,1000);document.addEventListener('visibilitychange',()=>{lastPracticeActivity=0;lastPracticeTick=performance.now();updatePracticeBar();});window.addEventListener('storage',e=>{if(e.key===gloveStorageKey){gloveState=readGloveState();refreshEquippedGlove();updatePracticeBar();}});document.addEventListener('keydown',async e=>{if(document.body.classList.contains('home-view')||$('settingsDialog')?.open||e.repeat||e.ctrlKey||e.metaKey||e.altKey||busy||$('lessonsDialog').open||$('guide').open||$('gloveLocker').open||(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)||document.activeElement?.isContentEditable))return;const map={a:60,w:61,s:62,e:63,d:64,f:65,t:66,g:67,y:68,h:69,u:70,j:71,k:72,o:73,l:74,p:75,';':76},midi=map[e.key.toLowerCase()];if(midi===undefined)return;e.preventDefault();practiceActivity();await audio();sound(midi);const k=$('keyboard').querySelector(`[data-midi="${midi}"]`);k?.classList.add('active');setTimeout(()=>k?.classList.remove('active'),400);});}

function previewGlove(id, reveal = true) {
 const skin = gloveCatalog.find(item => item.id === id);
 if (!skin) return;
 const preview = $('lockerPreview');
 preview.dataset.selection = id;
 preview.hidden = false;
 $('lockerHandPreview').innerHTML = skinSwatch(skin);
 $('lockerPreviewName').textContent = skin.name;
 $('lockerPreviewNote').textContent = skin.xp > gloveState.xp ? `Unlocks at ${skin.xp} XP` : '';
 const button = $('equipPreview');
 const equipped = gloveState.equipped === id;
 button.disabled = equipped || skin.xp > gloveState.xp;
 button.textContent = equipped ? 'Equipped' : skin.xp > gloveState.xp ? 'Locked' : 'Equip';
 button.onclick = () => equipGlove(id);
 if (reveal) preview.scrollIntoView({ block: 'nearest' });
}


window.addEventListener('pageshow',()=>{lastPracticeTick=performance.now();lastPracticeActivity=0;clearInterval(practiceTimer);practiceTimer=setInterval(tickPractice,1000);});
