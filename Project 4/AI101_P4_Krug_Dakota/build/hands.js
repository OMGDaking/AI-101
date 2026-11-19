// A continuous hand outline, shaded as a top-down view over the keys.
const anatomicalTips=[{x:39,y:93},{x:79,y:42},{x:117,y:20},{x:154,y:38},{x:187,y:65}];
function neutralHandPath(){
 return 'M89 206C89 194 88 187 84 180C78 171 68 168 59 159L29 129C23 123 24 114 30 109C36 104 43 106 49 111L70 130C74 133 78 130 77 125L68 70C66 59 70 52 78 51C86 50 91 56 92 66L103 116C104 121 108 119 108 114L105 45C105 35 110 29 117 29C125 29 130 35 130 45L131 112C131 117 135 119 137 113L143 65C144 55 148 48 155 48C163 49 167 55 166 64L161 122C161 127 165 127 167 122L176 90C178 80 183 74 190 74C197 76 199 82 197 91L186 140C182 157 173 170 159 181C154 186 151 195 151 206Z';
}
function constrainHandPose(reach=[]){
 const centers=anatomicalTips.map((t,i)=>Math.max(14+i*32,Math.min(206-(4-i)*32,t.x+(reach[i]?.x||0))));
 for(let i=1;i<5;i++)centers[i]=Math.max(centers[i-1]+32,Math.min(centers[i],centers[i-1]+60));
 return centers.map((x,i)=>({x:x-anatomicalTips[i].x,y:Math.max(-5,Math.min(5,reach[i]?.y||0))}));
}
function handWarpX(x,pose){const from=[0,...anatomicalTips.map(t=>t.x),220],to=[0,...anatomicalTips.map((t,i)=>t.x+pose[i].x),220];let i=0;while(i<from.length-2&&x>from[i+1])i++;return to[i]+(x-from[i])*(to[i+1]-to[i])/(from[i+1]-from[i]);}
// Preserve the complete hand silhouette. Note-driven stretching produces unnatural palms.
function smoothHandPath(reach=[]){return neutralHandPath();}
function poseHandSVG(svg,reach=[],pressed=[]){
 if(!svg)return;
 // Deform one continuous outline, including its labels, so no finger can detach.
 const pose=svg.classList.contains('teaching-hand')?reach:constrainHandPose(reach);
 const fingerTravel=anatomicalTips.map((_,i)=>Math.round(reach[i]?.y||0));
 const token=pose.map((r,i)=>r.x.toFixed(3)+':'+fingerTravel[i]).join('|')+'/'+pressed.join(',');
 if(svg.dataset.pose===token)return;
 svg.dataset.pose=token;

 // Warp the palm and fingers as a single contour. Taper vertical motion into the palm.
 let isX=true,lastX=0;
 const path=neutralHandPath().replace(/-?\d+(?:\.\d+)?/g,value=>{
  const point=+value;
  if(isX){
   lastX=point;
   isX=false;
   return handWarpX(point,pose).toFixed(2);
  }
  isX=true;
  const weights=anatomicalTips.map(t=>Math.exp(-Math.pow((lastX-t.x)/14,2)));
  const sum=weights.reduce((a,b)=>a+b,0);
  const bend=weights.reduce((v,w,i)=>v+w*fingerTravel[i],0)/Math.max(.001,sum);
  const taper=Math.max(0,Math.min(1,(160-point)/40));
  return (point+bend*taper).toFixed(2);
 });
 svg.querySelector('.unified-hand').setAttribute('d',path);
 svg.querySelectorAll('.finger-detail').forEach(el=>{
  const i=+el.dataset.digit,tip=anatomicalTips[i];
  const x=handWarpX(tip.x,pose)-tip.x;
  const y=fingerTravel[i]*Math.min(1,(160-tip.y-24)/40);
  const down=pressed.includes(i+1);
  el.setAttribute('transform',`translate(${x} ${y})`);
  el.classList.toggle('pressing',down);
  el.querySelector('.finger-number')?.classList.toggle('selected',down);
 });
}

function anatomicalHandMarkup({left=false,prefix='hand',selected=[],numbered=true,fill=null}={}){
 const light=prefix+'-skin-light';
 let out=`<defs><radialGradient id="${light}" gradientUnits="userSpaceOnUse" cx="101" cy="89" r="150" gradientTransform="translate(6 0) scale(.95 1)"><stop stop-color="#ffdfbd"/><stop offset=".42" stop-color="#e8b595"/><stop offset=".73" stop-color="#c78973"/><stop offset="1" stop-color="#a96158"/></radialGradient></defs>
 <g class="smooth-hand-art" ${left?'transform="translate(220 0) scale(-1 1)"':''}>
 <path class="hand-palm anatomical-skin unified-hand" d="${neutralHandPath()}" fill="${fill||'url(#'+light+')'}" stroke="#885c54" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
 for(let i=0;i<5;i++){
  const tip=anatomicalTips[i],f=i+1;
  out+=`<g class="finger-detail" data-digit="${i}">`;
  out+=`<path class="hand-joint-detail" d="M${tip.x-5} ${tip.y+38}q5 -2.5 10 0" fill="none" stroke="#78473d" stroke-opacity=".35" stroke-width="1.3" stroke-linecap="round"/>`;
  if(numbered)out+=`<g class="finger-number${selected.includes(f)?' selected':''}" ${left?`transform="translate(${tip.x*2} 0) scale(-1 1)"`:''}><circle cx="${tip.x}" cy="${tip.y+24}" r="10" fill="#fff7f0" stroke="none"/><text x="${tip.x}" y="${tip.y+27.5}" text-anchor="middle" font-size="11" font-weight="700" font-family="sans-serif" fill="#745450" stroke="none">${f}</text></g>`;
  out+='</g>';
 }
 return out+'</g>';
}
// A transparent five-key practice heuristic, not an optimized fingering model.
const handFingerNames=['','Thumb','Index finger','Middle finger','Ring finger','Pinky'];
let handView='both',practiceHand='right',handPlan=[],handCache='';
const naturalKeys=Array.from({length:128},(_,m)=>m).filter(m=>![1,3,6,8,10].includes(m%12));
function makeHandPlan(melody,demo=false){let base=demo?naturalKeys.indexOf(60):null;return melody.map(n=>{let natural=n.midi;while(!naturalKeys.includes(natural))natural--;const wi=naturalKeys.indexOf(natural);let shifted=false;if(base===null||wi<base||wi>base+4){base=Math.max(naturalKeys.indexOf(48),Math.min(naturalKeys.indexOf(84)-4,wi-2));shifted=true;}const slot=wi-base;return{base,slot,midi:n.midi,shifted,black:n.midi!==natural};});}
function handFinger(p){return practiceHand==='right'?p.slot+1:5-p.slot;}
function handAt(index){const p=handPlan[index];if(!p)return;const cache=practiceHand+':'+index;if(cache===handCache)return;handCache=cache;const finger=handFinger(p),partners=notes.map((n,i)=>({n,p:handPlan[i]})).filter(v=>v.p&&(isDemo||v.n.hand===practiceHand)&&v.n.start===notes[index].start&&v.p.base===p.base),selectedSlots=new Set(partners.map(v=>v.p.slot)),selectedFingers=partners.map(v=>handFinger(v.p)),fingerName=partners.map(v=>handFingerNames[handFinger(v.p)]).join(' + ')||handFingerNames[finger],baseNotes=naturalKeys.slice(p.base,p.base+5),label=partners.map(v=>noteName(v.n.midi)).join(' + ')||noteName(p.midi);$('rightHand').setAttribute('aria-pressed',practiceHand==='right');$('leftHand').setAttribute('aria-pressed',practiceHand==='left');$('handCue').textContent=`${fingerName} on ${label}`;$('fingerBadge').textContent=selectedFingers.join('+')||finger;$('fingerName').textContent=fingerName;$('handPosition').textContent=`${noteName(baseNotes[0])} – ${noteName(baseNotes[4])} position`;$('handExplain').textContent=partners.length>1?'Play the highlighted fingers together. Lift them together at the end of the chord.':p.shifted&&index>0?`Move your hand to this position before playing ${label}. Keep your wrist relaxed.`:p.black?`Reach to the highlighted black key with finger ${finger}. Keep the other fingers relaxed.`:'Rest one finger over each key. Match the numbered finger to the highlighted key.';$('handFootnote').textContent=(isDemo?'Demo practice position':'Suggested practice position · adjust for comfort')+' · View from above';const ids=focusIndices(),step=ids.indexOf(index);$('handStep').textContent=`${practiceHand==='right'?'Right':'Left'} hand · Note ${step+1} of ${ids.length}`;$('previousNote').disabled=step<=0;$('nextNote').disabled=step>=ids.length-1;
let svg=`<svg viewBox="0 0 360 300" role="img" aria-label="${practiceHand} hand viewed from above: ${fingerName}, finger ${finger}, plays ${label}. Position ${noteName(baseNotes[0])} to ${noteName(baseNotes[4])}."><text x="180" y="14" text-anchor="middle" fill="#8f8278" font-size="9" font-family="sans-serif">${practiceHand.toUpperCase()} HAND · YOUR VIEW</text>`;
for(let i=0;i<5;i++){const x=80+i*40;svg+=`<rect x="${x}" y="25" width="39" height="68" rx="3" fill="${partners.some(v=>v.p.slot===i&&!v.p.black)?'#e7c4c1':'#fffdf9'}" stroke="#d7cdc2"/><text x="${x+20}" y="85" text-anchor="middle" font-size="10" fill="#8b6f64" font-family="sans-serif">${noteName(baseNotes[i])}</text>`;}
for(let i=0;i<5;i++){const m=baseNotes[i];if(![0,2,5,7,9].includes(m%12)||i===4)continue;svg+=`<rect x="${80+(i+1)*40-11}" y="25" width="22" height="41" rx="3" fill="${partners.some(v=>v.p.slot===i&&v.p.black)?'#9b5b5c':'#2c2a29'}"/>`;}
if(p.black&&p.slot===4)svg+=`<rect x="269" y="25" width="22" height="41" rx="3" fill="#8ebd74"/>`;
const left=practiceHand==='left',tip=anatomicalTips[finger-1],targetX=80+(left?220-tip.x:tip.x)*.909,targetY=95+tip.y*.9,keyTarget=p.black?120+p.slot*40:100+p.slot*40;svg+=`<path d="M${keyTarget} ${p.black?58:70} Q${keyTarget} 103 ${targetX} ${targetY}" fill="none" stroke="#ad6c6b" stroke-width="1.3" stroke-dasharray="2 4"/><g transform="translate(80 95) scale(.909 .9)">${anatomicalHandMarkup({left,prefix:'position-hand',selected:selectedFingers})}</g></svg>`;$('handDiagram').innerHTML=svg;applyGloveSkin($('handDiagram'));}
function handIndex(){const active=notes.findIndex(n=>position>=n.start&&position<n.start+n.duration);if(active>=0)return active;const next=notes.findIndex(n=>n.start>=position);return next>=0?next:notes.length-1;}
function setPracticeHand(hand){practiceHand=hand;handCache='';render();}
function stepHand(dir){pause();const index=Math.max(0,Math.min(notes.length-1,handIndex()+dir));position=notes[index].start;render();}

let motionVisible=true,motionHand='',motionBeat=-1,motionReaches=anatomicalTips.map(()=>({x:0,y:0}));
function buildMovingHand(){motionHand=practiceHand;motionReaches=anatomicalTips.map(()=>({x:0,y:0}));$('movingHand').innerHTML=`<svg viewBox="0 0 220 210" preserveAspectRatio="xMidYMid meet">${anatomicalHandMarkup({left:practiceHand==='left',prefix:'moving-hand'})}</svg>`;applyGloveSkin($('movingHand'));motionBeat=-1;}
function renderMovingHand(active){const p=handPlan[active>=0?active:handIndex()];if(!p)return;if(motionHand!==practiceHand||!$('movingHand').firstChild)buildMovingHand();const baseMidi=naturalKeys[p.base],x=keyX(baseMidi);$('movingHand').style.left=x.left+'%';$('movingHand').style.width=(5*100/whiteKeyCount)+'%';const finger=handFinger(p),isDown=active>=0;const chordPlans=notes.map((n,i)=>({n,p:handPlan[i]})).filter(v=>v.p&&(isDemo||v.n.hand===practiceHand)&&position>=v.n.start&&position<v.n.start+v.n.duration&&v.p.base===p.base);const token=active>=0?active+':'+practiceHand:'rest';
const reaches=anatomicalTips.map((_,i)=>{const cp=chordPlans.find(v=>handFinger(v.p)===i+1);return cp?{x:cp.p.black?22:0,y:cp.p.black?-22:7}:{x:0,y:0};});
const amount=playing&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches? .25 : 1;motionReaches=motionReaches.map((r,i)=>({x:r.x+(reaches[i].x-r.x)*amount,y:r.y+(reaches[i].y-r.y)*amount}));const outline=$('movingHand').querySelector('.unified-hand');outline.setAttribute('d',smoothHandPath(motionReaches));$('movingHand').querySelectorAll('.finger-detail').forEach(el=>{const i=+el.dataset.digit,r=motionReaches[i];el.setAttribute('transform',`translate(${r.x*.8} ${r.y*.8})`);el.querySelector('.finger-number')?.classList.toggle('selected',isDown&&chordPlans.some(v=>handFinger(v.p)===i+1));});motionBeat=token;$('motionCaption').textContent=`${practiceHand==='right'?'Right':'Left'} hand · ${isDown?'finger'+(chordPlans.length>1?'s ':' ')+(chordPlans.length?chordPlans.map(v=>handFinger(v.p)).join(' + '):finger)+' → '+(chordPlans.length?chordPlans.map(v=>noteName(v.n.midi)).join(' + '):noteName(p.midi)):'get ready for '+noteName(p.midi)}${p.shifted?' · shift position':''}`;}
function toggleMovingHand(){motionVisible=!motionVisible;$('keyboardStage').classList.toggle('no-hand',!motionVisible);$('motionToggle').setAttribute('aria-pressed',motionVisible);$('motionToggle').textContent='Moving hands · '+(motionVisible?'on':'off');}
