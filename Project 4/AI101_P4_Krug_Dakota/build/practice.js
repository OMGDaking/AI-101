// Short phrases, demonstration, and event-driven note checking.
const coach={mode:'idle',groups:[],sections:[],section:0,event:0,collected:new Set(),held:new Set(),stream:null,micContext:null,micRAF:0,midi:null,run:0};
function coachGroups(part='both'){const map=new Map();for(const n of notes){if(part!=='both'&&n.hand!==part&&!isDemo)continue;const key=Math.round(n.start*10000)/10000;if(!map.has(key))map.set(key,[]);map.get(key).push(n)}return [...map].sort((a,b)=>a[0]-b[0]).map(([time,ns])=>({time:Math.min(...ns.map(n=>n.start)),notes:ns,pitches:[...new Set(ns.map(n=>n.midi))]}))}
function coachReset(){coachStop();coach.groups=coachGroups($('coachPart').value);coach.sections=[];let start=0;while(start<coach.groups.length){let end=start;while(end<coach.groups.length&&end-start<12&&coach.groups[end].time-coach.groups[start].time<4)end++;coach.sections.push({start,end});start=end}coach.section=0;coach.event=0;coachUI('Watch this short phrase, then try it yourself.')}
function coachStop(){coach.run++;coach.mode='idle';pause();coach.collected.clear();coach.held.clear();coachDisconnect();}
function coachDisconnect(){cancelAnimationFrame(coach.micRAF);coach.stream?.getTracks().forEach(t=>t.stop());coach.stream=null;coach.micContext?.close().catch(()=>{});coach.micContext=null;if(coach.midi){for(const input of coach.midi.inputs.values())input.onmidimessage=null;coach.midi.onstatechange=null;coach.midi=null}$('coachConnect').textContent='Connect input'}
function coachUI(message){if(document.body.classList.contains('lesson-focus')){if(coach.mode==='idle')message='Watch, then play the highlighted notes.';if(coach.mode==='watch')message='Watch once. Your turn comes next.';if(coach.mode==='complete')message='Nice work.'}$('simpleContinue').disabled=coach.mode!=='complete';$('simpleContinue').textContent=currentLesson>=0&&lessonChecks.size>=coach.sections.length?'Next lesson →':'Next phrase →';$('roll').querySelector('.roll-empty').style.display=['try','watch'].includes(coach.mode)?'none':'block';const s=coach.sections[coach.section];$('coachSection').textContent=`Phrase ${coach.section+1} / ${coach.sections.length||1}`;$('coachMessage').textContent=message;$('coachProgress').max=s?s.end-s.start:1;$('coachProgress').value=s?Math.max(0,coach.event-s.start):0;$('coachNext').disabled=coach.mode!=='complete';$('coachState').textContent=coach.mode==='watch'?'01 · WATCH':coach.mode==='try'?'02 · YOUR TURN':coach.mode==='complete'?'PHRASE COMPLETE':'GUIDED PRACTICE';document.querySelectorAll('.key').forEach(k=>k.classList.toggle('expected',coach.mode==='try'&&!!coach.groups[coach.event]?.pitches.includes(+k.dataset.midi)));}
async function coachWatch(){
 const run=++coach.run;
 pause();
 coach.collected.clear();
 coach.held.clear();
 const section=coach.sections[coach.section];
 if(!section)return;

 coach.mode='watch';
 coach.event=section.start;
 const base=coach.groups[section.start].time;
 const last=coach.groups[section.end-1];
 const end=coach.groups[section.end]?.time ?? Math.max(...last.notes.map(n=>n.start+n.duration));
 const speed=Number($('speed').value)||1;
 const count=section.end-section.start;
 position=base;
 coachUI('Getting the piano ready…');
 $('coachMessage').textContent='Getting the piano ready…';
 try { await audio(); } catch { /* The visual demonstration can still run. */ }
 if(run!==coach.run)return;

 let begin;
 let next=section.start;
 function frame(now){
  if(run!==coach.run||coach.mode!=='watch')return;
  begin??=now;
  position=Math.min(end,base+(now-begin)/1000*speed);
  const previous=next;
  while(next<section.end&&coach.groups[next].time<=position+0.000001){
   for(const note of coach.groups[next].notes){
    if(ctx?.state==='running')sound(note.midi,Math.min(note.duration,end-note.start)/speed,note.velocity);
   }
   next++;
  }
  if(next!==previous){
   const played=next-section.start;
   $('coachProgress').value=played;
   $('coachMessage').textContent=`Watch · Note ${played} of ${count}`;
  }
  render();
  if(position>=end){coachTry();return}
  requestAnimationFrame(frame);
 }
 requestAnimationFrame(frame);
}
function coachTry(){coach.run++;pause();coach.mode='try';const s=coach.sections[coach.section];if(!s){coach.mode='idle';return}coach.event=s.start;coach.collected.clear();coach.held.clear();coachTarget()}
function coachTarget(){const g=coach.groups[coach.event];position=Math.max(...g.notes.map(n=>n.start));render();coachUI('Play '+g.pitches.map(noteName).join(' + ')+'. The music waits for you.')}
function coachInput(midi,down=true,kind='tap'){if(coach.mode!=='try')return;if(!down){coach.held.delete(midi);return}const g=coach.groups[coach.event];if(kind==='midi')coach.held.add(midi);if(!g.pitches.includes(midi)){coach.collected.clear();coachUI(`${noteName(midi)} — try again. Waiting for ${g.pitches.map(noteName).join(' + ')}.`);return}coach.collected.add(midi);const correct=kind==='midi'?g.pitches.every(m=>coach.held.has(m))&&[...coach.held].every(m=>g.pitches.includes(m)):g.pitches.every(m=>coach.collected.has(m));if(!correct){coachUI('Good. Add '+g.pitches.filter(m=>!coach.collected.has(m)).map(noteName).join(' + '));return}coach.collected.clear();coach.event++;const s=coach.sections[coach.section];if(coach.event>=s.end){coach.mode='complete';if(typeof registerLessonPhrase==='function')registerLessonPhrase();coachDisconnect();coachUI('Well played. Replay this phrase or move to the next one.');return}coachTarget()}
$('coachTempo').addEventListener('change',()=>{
 $('speed').value=$('coachTempo').value;
 if(coach.mode==='watch')coachWatch();
});
$('speed').addEventListener('change',()=>{$('coachTempo').value=$('speed').value});

function coachRewind(){coachStop();const s=coach.sections[coach.section];if(!s)return;coach.event=s.start;position=coach.groups[s.start].time;render();coachUI('Phrase rewound. Watch again or choose Your turn.')}
async function coachConnect(){if(coach.stream||coach.midi){coachDisconnect();coachUI('Input disconnected. You can still tap the keys.');return}const run=coach.run;try{if($('coachInput').value==='midi'){if(!navigator.requestMIDIAccess)throw Error('MIDI is unavailable in this browser. Try Chrome or microphone input.');const access=await navigator.requestMIDIAccess({sysex:false});if(run!==coach.run)return;coach.midi=access;const attach=()=>{for(const input of access.inputs.values())input.onmidimessage=e=>{const [status,key,velocity]=e.data;if((status&240)===144)coachInput(key,velocity>0,'midi');else if((status&240)===128)coachInput(key,false,'midi')};coachUI(access.inputs.size?'MIDI connected. Choose Your turn when ready.':'No MIDI keyboard found. Plug one in to continue.')};access.onstatechange=attach;attach();}else{if(!navigator.mediaDevices?.getUserMedia)throw Error('Microphone input is unavailable.');const media=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});if(run!==coach.run){media.getTracks().forEach(t=>t.stop());return}coach.stream=media;const ac=coach.micContext=new AudioContext();await ac.resume();const analyser=ac.createAnalyser();analyser.fftSize=2048;ac.createMediaStreamSource(media).connect(analyser);const buffer=new Float32Array(2048);let previous=-1,stable=0,latched=-1;function listen(){if(!coach.stream)return;analyser.getFloatTimeDomainData(buffer);const pitch=coachPitch(buffer,ac.sampleRate);if(pitch<0){latched=-1;stable=0}else{stable=pitch===previous?stable+1:1;if(stable===3&&pitch!==latched){latched=pitch;coachInput(pitch)}}previous=pitch;coach.micRAF=requestAnimationFrame(listen)}listen();coachUI('Microphone connected. Play single notes clearly; release between repeated notes.');}$('coachConnect').textContent='Disconnect input';}catch(e){coachDisconnect();coachUI(e.name==='NotAllowedError'?'Microphone or MIDI permission was declined. You can use the on-screen keys.':e.message)}}
// YIN difference function rejects low-level noise and octave-prone harmonic peaks.
function coachPitch(data,rate){let energy=0;for(const x of data)energy+=x*x;if(Math.sqrt(energy/data.length)<.012)return -1;const low=Math.floor(rate/2100),high=Math.min(Math.floor(rate/65),data.length/2-1),diff=new Float32Array(high+1);let sum=0;for(let lag=1;lag<=high;lag++){let value=0;for(let i=0;i<data.length-high;i++){const d=data[i]-data[i+lag];value+=d*d}sum+=value;diff[lag]=sum?value*lag/sum:1}for(let lag=low;lag<high-1;lag++){if(diff[lag]<.15){while(lag+1<high&&diff[lag+1]<diff[lag])lag++;return Math.round(69+12*Math.log2((rate/lag)/440))}}return -1}
$('simpleContinue').onclick=()=>{if(coach.mode!=='complete')return;if(currentLesson>=0&&lessonChecks.size>=coach.sections.length){completeLesson();if(currentLesson+1<lessonCatalog.length)startLesson(currentLesson+1);else $('goHome').click()}else{$('coachNext').click();coachWatch()}};
$('watchLesson').onclick=coachWatch;$('coachWatch').onclick=coachWatch;$('coachTry').onclick=coachTry;$('coachRewind').onclick=()=>{coachRewind();if(document.body.classList.contains('lesson-focus'))coachWatch()};$('coachBack').onclick=()=>{coachRewind();coach.section=Math.max(0,coach.section-1);coachRewind()};$('coachNext').onclick=()=>{coach.section=Math.min(coach.sections.length-1,coach.section+1);coachRewind()};$('coachConnect').onclick=coachConnect;$('coachPart').onchange=coachReset;$('coachInput').onchange=()=>{coachDisconnect();coachUI('Connect the selected input when ready.')};
$('keyboard').addEventListener('click',e=>{const k=e.target.closest('.key');if(k)coachInput(+k.dataset.midi)});
for(const id of ['play','restart','seek','previousNote','nextNote','learnTab','sheetTab','timeToPlay'])$(id).addEventListener(id==='seek'?'input':'click',()=>{if(coach.mode!=='idle')coachStop()},{capture:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)coachStop()});window.addEventListener('pagehide',coachStop);
$('appLibrary').onclick=()=>{document.body.classList.toggle('show-library');$('appLibrary').textContent=document.body.classList.contains('show-library')?'← Back to practice':'♫ Music library'};
coachReset();
