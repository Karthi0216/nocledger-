(function(){
  var KEY='ux-settings', mq=window.matchMedia('(prefers-color-scheme: dark)');
  var BG=[{id:'default'},
   {id:'navy',d:'#0B1220',l:'#F4F6FB'},
   {id:'graphite',d:'#101113',l:'#ECEDEF'},
   {id:'forest',d:'linear-gradient(160deg,#04130d,#0b2c1f)',l:'linear-gradient(160deg,#e6f6ed,#d3eee0)'},
   {id:'aurora',d:'linear-gradient(135deg,#0f0c29,#302b63 55%,#24243e)',l:'linear-gradient(135deg,#efe9ff,#dde7ff 55%,#e6f7ff)'},
   {id:'sunset',d:'linear-gradient(160deg,#1a0b1f,#3a1030 55%,#14213d)',l:'linear-gradient(160deg,#fff1e6,#ffe0ec)'}];
  var SIZES=[['S',.9],['M',1],['L',1.12],['XL',1.25]];
  var S={mode:'dark',size:1,bg:'default',custom:'#0B1220',anim:true};
  try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){}
  try{LOCAL_ONLY_KEYS.add(KEY)}catch(e){}   // keep these prefs when cache is cleared
  function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
  function resolved(){return S.mode==='auto'?(mq.matches?'dark':'light'):S.mode}
  function isLight(){return document.body.classList.contains('light-theme')}

  var dyn=document.createElement('style');dyn.id='ux-dyn';document.head.appendChild(dyn);
  function paint(){
    var css='',p=BG.filter(function(b){return b.id===S.bg})[0];
    var val=S.bg==='custom'?S.custom:(S.bg==='default'?(isLight()?'radial-gradient(1000px 680px at 6% -8%,rgba(37,99,235,.14),transparent 60%),radial-gradient(900px 600px at 100% 4%,rgba(14,165,233,.12),transparent 55%),radial-gradient(900px 720px at 80% 108%,rgba(16,185,129,.10),transparent 60%),linear-gradient(165deg,#f6faff 0%,#e8f0ff 55%,#f0faff 100%)':'radial-gradient(1100px 720px at 8% -10%,rgba(37,99,235,.25),transparent 60%),radial-gradient(900px 620px at 100% 0%,rgba(14,165,233,.16),transparent 55%),radial-gradient(1000px 800px at 85% 110%,rgba(16,185,129,.14),transparent 60%),linear-gradient(165deg,#050d1e 0%,#071a33 48%,#04102a 100%)'):(p&&(isLight()?p.l:p.d)));
    if(val) css+='html:root{background:'+val+'!important}';
    if(!S.anim) css+='#internetBgCanvas{display:none!important}body::before,body::after{display:none!important}';
    if(S.size!==1) css+='.app{zoom:'+S.size+'}';
    dyn.textContent=css;
    setTimeout(function(){window.dispatchEvent(new Event('resize'))},60); // re-fit charts
  }
  function setTheme(){
    var r=resolved();
    try{localStorage.setItem('theme-pref',r)}catch(e){}
    if(typeof applyTheme==='function')applyTheme(r);else document.body.classList.toggle('light-theme',r==='light');
    paint();render();
  }
  mq.addEventListener&&mq.addEventListener('change',function(){if(S.mode==='auto')setTheme()});
  ['themeToggleDesktop','themeToggleMobile'].forEach(function(id){   // keep old toggle buttons in sync
    var b=document.getElementById(id);
    if(b)b.addEventListener('click',function(){S.mode=isLight()?'light':'dark';save();paint();render()});
  });

  function mk(id){var b=document.createElement('button');b.id=id;b.type='button';b.className='ux-nav';
    b.title='Display settings';b.setAttribute('aria-label','Display settings');b.innerHTML='\u2699<i class="uxDot"></i>';return b}
  var fabs=[];
  [['themeToggleDesktop','uxFab'],['themeToggleMobile','uxFabM']].forEach(function(x){
    var t=document.getElementById(x[0]);
    if(t&&t.parentNode){var b=mk(x[1]);t.parentNode.insertBefore(b,t);fabs.push(b)}
  });
  var panel=document.createElement('div');panel.id='uxPanel';document.body.appendChild(panel);
  function closeP(){panel.classList.remove('open')}
  fabs.forEach(function(b){b.onclick=function(e){
    e.stopPropagation();
    if(panel.classList.contains('open')){closeP();return}
    var r=b.getBoundingClientRect(),w=Math.min(320,window.innerWidth-28);
    panel.style.top=Math.round(r.bottom+8)+'px';
    panel.style.left=Math.max(14,Math.min(r.left,window.innerWidth-w-14))+'px';
    panel.classList.add('open');ping();
  }});
  document.addEventListener('click',function(e){
    if(!panel.contains(e.target)&&!fabs.some(function(f){return f.contains(e.target)}))closeP()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeP()});
  var lo=document.getElementById('logoutBtn');if(lo)lo.addEventListener('click',closeP);

  function chip(txt,on,fn,ttl){return '<button type="button" class="ux-chip'+(on?' on':'')+'" data-a="'+fn+'" title="'+(ttl||'')+'">'+txt+'</button>'}
  function render(){
    var h='<h3>Display settings</h3>';
    h+='<h4>Firebase</h4><div id="uxFb"><span id="uxFbTxt">Checking…</span><button type="button" class="ux-chip" data-a="ping" style="flex:none">Recheck</button></div>';
    h+='<h4>Theme</h4>'
      +'<label class="ux-switch'+(S.mode==='auto'?' dis':'')+'"><span><b>\ud83c\udf19 Dark mode</b><small>ON = dark &nbsp;\u00b7&nbsp; OFF = white</small></span><input type="checkbox" id="uxDark"'+(resolved()==='dark'?' checked':'')+'><span class="tg"></span></label>'
      +'<label class="ux-switch"><span><b>\ud83d\udda5 Auto</b><small>Follow device / system setting</small></span><input type="checkbox" id="uxAuto"'+(S.mode==='auto'?' checked':'')+'><span class="tg"></span></label>';
    h+='<h4>Text / UI size</h4><div class="ux-row">'+SIZES.map(function(z){return chip(z[0],S.size===z[1],'z:'+z[1],Math.round(z[1]*100)+'%')}).join('')+'</div>';
    h+='<h4>Background</h4><div class="ux-row">';
    BG.forEach(function(b){
      var v=b.id==='default'?'linear-gradient(135deg,#3b82f6,#a855f7 55%,#14b8a6)':(isLight()?b.l:b.d);
      h+='<button type="button" class="ux-sw'+(S.bg===b.id?' on':'')+'" data-a="b:'+b.id+'" title="'+b.id+'" style="background:'+v+'"></button>';
    });
    h+='<input type="color" id="uxCustom" value="'+S.custom+'" title="Custom colour"></div>';
    h+='<label class="ux-chk"><input type="checkbox" id="uxAnim"'+(S.anim?' checked':'')+'> Animated network background</label>';
    h+='<div class="ux-row" style="margin-top:12px">'+chip('↺ Reset to default',false,'reset')+'</div>';
    panel.innerHTML=h;
    var c=document.getElementById('uxCustom');
    if(c)c.oninput=function(){S.bg='custom';S.custom=c.value;save();paint()};
    var dk=document.getElementById('uxDark'),au=document.getElementById('uxAuto');
    if(dk)dk.onchange=function(){S.mode=dk.checked?'dark':'light';save();setTheme()};
    if(au)au.onchange=function(){var r=resolved();S.mode=au.checked?'auto':r;save();setTheme()};
    var a=document.getElementById('uxAnim');
    if(a)a.onchange=function(){S.anim=a.checked;save();paint()};
    showFb();
  }
  panel.addEventListener('click',function(e){
    var t=e.target.closest('[data-a]');if(!t)return;
    var a=t.getAttribute('data-a').split(':');
    if(a[0]==='m'){S.mode=a[1];save();setTheme();return}
    if(a[0]==='z'){S.size=parseFloat(a[1]);save();paint();render();return}
    if(a[0]==='b'){S.bg=a[1];save();paint();render();return}
    if(a[0]==='ping'){ping();return}
    if(a[0]==='reset'){S={mode:'dark',size:1,bg:'default',custom:'#0B1220',anim:true};save();setTheme()}
  });

  /* ---------- Firebase live status ---------- */
  var fb={state:'wait',ms:0,msg:'Checking…'};
  function showFb(){
    var t=document.getElementById('uxFbTxt'),d=document.querySelectorAll('.uxDot');
    if(t)t.textContent=({ok:'🟢 Connected · '+fb.ms+' ms',bad:'🔴 '+fb.msg,wait:'🟡 Checking…'})[fb.state];
    d.forEach(function(x){x.className='uxDot '+(fb.state==='wait'?'':fb.state)});
  }
  async function ping(){
    var prev=fb.state;fb.state='wait';showFb();
    var t0=performance.now(),c=new AbortController(),tm=setTimeout(function(){c.abort()},7000);
    try{
      var r=await fetch(fbPath('system/health'),{cache:'no-store',signal:c.signal});
      fb.ms=Math.round(performance.now()-t0);
      if(r.ok){fb.state='ok';
        if(prev==='bad'){try{markSyncOk()}catch(e){} try{scheduleDataRefresh()}catch(e){}}}   // auto-recover after outage
      else{fb.state='bad';fb.msg=(r.status===401||r.status===403)?'Database rules deny access ('+r.status+')':'Firebase error HTTP '+r.status}
    }catch(e){fb.state='bad';fb.msg=navigator.onLine?'Cannot reach Firebase':'You are offline'}
    clearTimeout(tm);showFb();
  }
  window.addEventListener('online',ping);window.addEventListener('offline',ping);
  setInterval(function(){if(!document.hidden)ping()},60000);

  setTheme();ping();
})();
