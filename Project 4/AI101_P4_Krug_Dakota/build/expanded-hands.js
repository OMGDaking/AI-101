// Adaptive hand illustration for full scores and imported arrangements.
// The score remains the authority for fingering; sustained voices can exceed one hand's reach.
let expandedFrames={right:[],left:[]},expandedCurrent=null;
function usesExpandedHand(){return true;}
function pianoCoordinate(m){const below=naturalKeys.filter(n=>n<m).length;return naturalKeys.includes(m)?below+.5:below;}
function buildExpandedPlan(events){
 const result={right:[],left:[]};
 for(const hand of ['right','left']){
  const part=events.filter(n=>n.hand===hand).sort((a,b)=>a.start-b.start),times=[...new Set(part.map(n=>Math.round(n.start*100000)/100000))];
  let previous='';
  for(const time of times){
   const attack=part.filter(n=>Math.abs(n.start-time)<.00002),sorted=[...new Set(attack.map(n=>n.midi))].sort((a,b)=>a-b);
   // Limit one displayed grip to an octave. Other simultaneous voices stay lit on the piano.
   let anchors=hand==='left'?sorted.filter(m=>m<=sorted[0]+12).slice(0,5):sorted.filter(m=>m>=sorted.at(-1)-12).slice(-5);
   const candidates=[...new Set(part.filter(n=>n.start>=time-.7&&n.start<=time+1).map(n=>n.midi))].sort((a,b)=>a-b);
   for(const m of candidates){if(anchors.includes(m)||anchors.length===5)continue;const pool=[...anchors,m].sort((a,b)=>a-b);if(pool.at(-1)-pool[0]<=12)anchors=pool;}
   const fixed=isDemo||(typeof currentLesson==='number'&&currentLesson>=0&&currentLesson<6);if(fixed)anchors=hand==='left'?[48,50,52,53,55]:[60,62,64,65,67];
   const fingers=anchors.length===1?[3]:anchors.length===2?[1,5]:anchors.length===3?[1,3,5]:anchors.length===4?[1,2,4,5]:[1,2,3,4,5];
   const slots=anchors.map((m,i)=>({midi:m,finger:hand==='right'?fingers[i]:6-fingers[i],coordinate:pianoCoordinate(m)}));
   let low=Math.floor(slots[0].coordinate-.5),high=Math.floor(slots.at(-1).coordinate),span=Math.max(5,high-low+1);
   if(high-low+1<5)low-=Math.floor((5-(high-low+1))/2);
   const minimum=naturalKeys.indexOf(keyboardMin),maximum=naturalKeys.indexOf(keyboardMax);low=Math.max(minimum,Math.min(low,maximum-span+1));
   const token=low+':'+span+':'+anchors.join(',');result[hand].push({time,hand,attack,slots,base:low,span,shifted:previous!==''&&previous!==token});previous=token;
  }
 }
 return result;
}
function expandedFrameAt(time,hand=practiceHand){const frames=expandedFrames[hand];if(!frames.length)return null;let chosen=frames[0];for(const f of frames){if(f.time>time+.00001)break;chosen=f;}return chosen;}
function expandedPose(frame,time){
 const demonstrating=playing||(typeof coachGroups==='function'&&coach.mode==='watch');
 const down=notes.filter(n=>n.hand===frame.hand&&time>=n.start&&time<n.start+n.duration),pressed=frame.slots.filter(s=>down.some(n=>n.midi===s.midi)),inOrder=[...frame.slots].sort((a,b)=>a.finger-b.finger),targets=[];
 for(let f=1;f<=5;f++){
  const own=inOrder.find(s=>s.finger===f);let coord;
  if(own)coord=own.coordinate;else{const before=inOrder.filter(s=>s.finger<f).at(-1),after=inOrder.find(s=>s.finger>f);coord=before&&after?before.coordinate+(after.coordinate-before.coordinate)*(f-before.finger)/(after.finger-before.finger):(before||after).coordinate+(f-(before||after).finger)*(frame.hand==='right'?1:-1);}
  const x=(coord-frame.base)*220/frame.span;
  const local=frame.hand==='left'?220-x:x;
  const sounding=own&&down.find(n=>n.midi===own.midi);
  let travel=0;
  if(sounding){
   const depth=naturalKeys.includes(sounding.midi)?17:-18;
   const age=time-sounding.start;
   const remaining=sounding.duration-age;
   const attack=Math.min(.055,sounding.duration*.22);
   const release=Math.min(.12,sounding.duration*.32);
   const pressure=demonstrating?Math.max(0,Math.min(1,age/attack,remaining/release)):1;
   travel=depth*pressure;
  }
  targets.push({x:local-anatomicalTips[f-1].x,y:travel});
 }
 return {targets,pressed,down,extra:down.filter(n=>!pressed.some(s=>s.midi===n.midi)).length};
}
const handAnimation={left:null,right:null};
function restingHandFrame(hand){const base=naturalKeys.indexOf(hand==='left'?48:60);return {time:-1,hand,base,span:5,slots:[0,1,2,3,4].map((n,i)=>({midi:naturalKeys[base+i],finger:hand==='right'?i+1:5-i,coordinate:base+i+.5})),shifted:false};}
function paintMovingHand(container,frame,pose){
 const hand=frame.hand;
 if(container.dataset.hand!==hand||!container.firstChild){
  container.dataset.hand=hand;
  container.innerHTML=`<svg class="teaching-hand" viewBox="0 0 220 210" preserveAspectRatio="none" role="img" aria-label="${hand==='left'?'Left':'Right'} hand playing the keyboard">${anatomicalHandMarkup({left:hand==='left',prefix:container.id})}</svg><span class="keyboard-hand-label">${hand==='left'?'Left hand':'Right hand'}</span>`;
  container.removeAttribute('aria-hidden');applyGloveSkin(container);handAnimation[hand]=null;
 }
 container.hidden=false;
 const keyboardBase=naturalKeys.indexOf(keyboardMin);
 container.style.left=(frame.base-keyboardBase)*100/whiteKeyCount+'%';
 container.style.width=frame.span*100/whiteKeyCount+'%';
 container.style.transition=(playing||(typeof coachGroups==='function'&&coach.mode==='watch'))?'left .14s ease-out,width .14s ease-out':'none';
 poseHandSVG(container.querySelector('svg'),pose.targets,pose.pressed.map(s=>s.finger));
 window.paintRiggedHand?.(container,pose);
 container.querySelector('svg').setAttribute('aria-label',`${hand==='left'?'Left':'Right'} hand: ${pose.pressed.map(s=>handFingerNames[s.finger]+' on '+noteName(s.midi)).join(', ')||'ready'}`);
}

function guideHandCard(hand,frame,pose){
 const down=pose.pressed,description=down.map(s=>`${handFingerNames[s.finger]} (${s.finger}) → ${noteName(s.midi)}`).join(' + ')||'Relax your hand';
 const base=frame.base,span=frame.span,w=220/span;
 let keys='';
 for(let i=0;i<span;i++){const midi=naturalKeys[base+i],active=down.some(s=>s.midi===midi);keys+=`<rect x="${40+i*w}" y="8" width="${w-1}" height="167" rx="3" fill="${active?'#bd7782':'#f7f2ec'}" stroke="#9d9390" stroke-width=".6"/><text x="${40+(i+.5)*w}" y="166" text-anchor="middle" font-size="9" fill="${active?'#fff':'#655c59'}">${noteName(midi)}</text>`;}
 for(let i=0;i<span-1;i++){const midi=naturalKeys[base+i];if(![0,2,5,7,9].includes(midi%12))continue;const active=down.some(s=>s.midi===midi+1);keys+=`<rect x="${40+(i+1)*w-w*.29}" y="8" width="${w*.58}" height="83" rx="2" fill="${active?'#ad5d70':'#24242a'}"/><text x="${40+(i+1)*w}" y="25" text-anchor="middle" font-size="7" fill="white">${noteName(midi+1)}</text>`;}
 return `<div class="guide-hand-card" id="guide-${hand}"><small>${hand==='left'?'LEFT':'RIGHT'} · ${description}</small><svg class="teaching-hand" viewBox="0 0 300 265" role="img" aria-label="${hand} hand: ${description}. Curved fingers, relaxed wrist, viewed from above.">${keys}<g transform="translate(40 35)">${anatomicalHandMarkup({left:hand==='left',prefix:'guide-'+hand,selected:down.map(s=>s.finger)})}</g></svg></div>`;
}
function renderExpandedHand(){
 const hands=handView==='both'?['left','right']:[handView],states={};
 for(const hand of ['left','right']){const container=$(hand==='left'?'movingLeftHand':'movingHand');container.hidden=!hands.includes(hand);if(!hands.includes(hand))continue;const frame=expandedFrameAt(position,hand)||restingHandFrame(hand),pose=expandedPose(frame,position);states[hand]={frame,pose};paintMovingHand(container,frame,pose);}
 expandedCurrent=states;const both=handView==='both',summary=hands.map(h=>(h==='left'?'L: ':'R: ')+(states[h].pose.pressed.map(s=>noteName(s.midi)).join(' + ')||'rest')).join('  ·  ');$('motionCaption').textContent=summary;
 $('bothHands').setAttribute('aria-pressed',both);$('rightHand').setAttribute('aria-pressed',handView==='right');$('leftHand').setAttribute('aria-pressed',handView==='left');document.querySelector('.hand-guide').classList.toggle('both-view',both);
 const token=handView+':'+hands.map(h=>states[h].frame.time+':'+states[h].pose.pressed.map(s=>s.midi).join(',')).join('|');if(token===handCache)return;handCache=token;
 $('handCue').textContent=both?'Both hands, together':(handView==='left'?'Left':'Right')+' hand · '+(states[handView].pose.pressed.map(s=>noteName(s.midi)).join(' + ')||'rest');$('fingerBadge').textContent=both?'L + R':states[handView].pose.pressed.map(s=>s.finger).join('+')||'–';$('fingerName').textContent=summary;
 $('handPosition').textContent=hands.map(h=>{const f=states[h].frame;return (h==='left'?'Left: ':'Right: ')+noteName(naturalKeys[f.base])+'–'+noteName(naturalKeys[f.base+f.span-1]);}).join(' · ');
 $('handExplain').textContent=hands.some(h=>states[h].pose.extra)?'Additional sounding notes stay lit. Follow the score for releases and hand changes.':both?'Watch both parts at the same tempo. Keep your wrists relaxed and follow the lit keys.':'Follow this hand’s movement and the lit keys. Keep your wrist relaxed.';$('handFootnote').textContent='Suggested hand positions · consult the score for fingering';
 const ids=focusIndices(),index=ids.indexOf(handIndex());$('handStep').textContent=(both?'Both hands':'Selected hand')+' · Event '+(index+1)+' of '+ids.length;$('previousNote').disabled=index<=0;$('nextNote').disabled=index>=ids.length-1;
 $('handDiagram').innerHTML='<div class="both-hand-diagrams">'+hands.map(h=>guideHandCard(h,states[h].frame,states[h].pose)).join('')+'</div>';
 for(const h of hands){const wrapper=$('guide-'+h);poseHandSVG(wrapper.querySelector('svg'),states[h].pose.targets,states[h].pose.pressed.map(s=>s.finger));}applyGloveSkin($('handDiagram'));
}
function expandedFingerAt(midi){return Object.values(expandedCurrent||{}).flatMap(s=>s.pose.pressed).find(s=>s.midi===midi)?.finger||'';}
function setHandView(view){handView=view;if(view!=='both')practiceHand=view;else practiceHand=notes.some(n=>n.hand==='right')?'right':'left';handCache='';render();}
