(()=>{'use strict';
// Set to a live PUBLIC external TestFlight URL to enable direct beta signup.
// Until then, links safely lead to the site's support contact page.
const PUBLIC_TESTFLIGHT_URL='https://testflight.apple.com/join/qzBd8jVd';
if(/^https:\/\/testflight\.apple\.com\/join\/[a-zA-Z0-9]+$/.test(PUBLIC_TESTFLIGHT_URL)){
 document.querySelectorAll('[data-beta-link]').forEach(a=>{a.href=PUBLIC_TESTFLIGHT_URL;a.target='_blank';a.rel='noopener noreferrer';});
}
const root=document.querySelector('[data-moment]'); if(!root)return;
const list=root.querySelector('[data-task-list]'),inputs=Array.from(root.querySelectorAll('[data-task]'));
const title=root.querySelector('[data-day-title]'),date=root.querySelector('[data-date-label]'),msg=root.querySelector('[data-message]'),count=root.querySelector('[data-count]');
const next=root.querySelector('[data-next]'),reset=root.querySelector('[data-reset]'),after=root.querySelector('[data-after]'),reflect=root.querySelector('[data-reflect]'),reflectBtn=root.querySelector('[data-reflect-toggle]');
const labels=['Call the bank about the fee','Plan the week','Pick up groceries'];let tomorrow=false;
function update(){const n=inputs.filter(i=>i.checked).length;count.textContent=n+' of 3 done';msg.textContent=n===3?'Everything is checked off.':n===0?'You can leave some things for another day.':n===1?'One thing done. That counts.':'Two things done. The rest can wait.';}
inputs.forEach(i=>i.addEventListener('change',update));
next.addEventListener('click',()=>{if(tomorrow)return;tomorrow=true;const notDone=inputs.map((i,j)=>!i.checked?j:-1).filter(i=>i>=0);list.replaceChildren();if(!notDone.length){const p=document.createElement('p');p.textContent='Nothing to carry forward today.';list.append(p);}else{notDone.forEach(j=>{const row=document.createElement('div');row.className='moment-task is-carried';const check=document.createElement('span');check.className='moment-check';check.setAttribute('aria-hidden','true');const content=document.createElement('span');content.textContent=labels[j];const hint=document.createElement('small');hint.className='carry-tag';hint.textContent='Carried forward';content.append(hint);row.append(check,content);list.append(row);});}
 title.textContent='Tomorrow';date.textContent='A NEW DAY';count.textContent=notDone.length+' carried forward';msg.textContent='You get another day, not an overdue warning.';next.hidden=true;reset.hidden=false;after.hidden=false;reset.focus();});
reset.addEventListener('click',()=>{tomorrow=false;list.replaceChildren();inputs.forEach((i,j)=>{i.checked=false;const row=document.createElement('label');row.className='moment-task';const ring=document.createElement('span');ring.className='moment-check';ring.setAttribute('aria-hidden','true');row.append(i,ring,document.createTextNode(labels[j]));list.append(row);});title.textContent='Today';date.textContent='AN ORDINARY DAY';next.hidden=false;reset.hidden=true;after.hidden=true;reflect.hidden=true;reflectBtn.setAttribute('aria-expanded','false');update();next.focus();});
reflectBtn.addEventListener('click',()=>{const show=reflect.hidden;reflect.hidden=!show;reflectBtn.setAttribute('aria-expanded',String(show));});
update();
})();