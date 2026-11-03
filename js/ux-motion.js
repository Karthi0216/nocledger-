(function(){
  /* Cheap, event-driven motion: only transform/opacity via Web Animations (GPU), no observers on the page. */
  var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(RM)return;
  var SEL='.card,.module-tile';

  /* touch / click: little press + ripple */
  document.addEventListener('pointerdown',function(e){
    var t=e.target.closest&&e.target.closest('.btn,.nav-btn,.module-tile,.theme-toggle');
    if(!t||!t.animate)return;
    t.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:180,easing:'ease-out'});
    if(!t.matches('.btn,.nav-btn'))return;
    t.classList.add('ux-rp');
    var r=t.getBoundingClientRect(),d=Math.max(r.width,r.height)*2,s=document.createElement('span');
    s.className='ux-rip';
    s.style.cssText='width:'+d+'px;height:'+d+'px;left:'+(e.clientX-r.left-d/2)+'px;top:'+(e.clientY-r.top-d/2)+'px';
    t.appendChild(s);
    var a=s.animate([{transform:'scale(0)',opacity:.28},{transform:'scale(1)',opacity:0}],{duration:520,easing:'ease-out'});
    a.onfinish=function(){s.remove()};
  },{passive:true});

  function rise(el,delay){
    if(!el.animate)return;
    el.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'none'}],
      {duration:420,delay:delay||0,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'});
  }
  /* scroll reveal: cards below the fold animate in once when they scroll into view */
  var io='IntersectionObserver' in window?new IntersectionObserver(function(es){
    es.forEach(function(en){if(en.isIntersecting){io.unobserve(en.target);rise(en.target,0)}});
  },{threshold:.12}):null;
  function arm(){
    if(!io)return;
    var h=innerHeight,list=document.querySelectorAll(SEL),n=0;
    for(var i=0;i<list.length&&n<60;i++){
      var el=list[i];if(el.__ux)continue;
      var r=el.getBoundingClientRect();
      if(r.width===0)continue;                       // hidden view: armed on next menu click
      el.__ux=1;n++;
      if(r.top>h)io.observe(el);
    }
  }
  /* open a page from the menu: visible cards rise in one by one, the rest arm for scrolling */
  document.addEventListener('click',function(e){
    if(!e.target.closest||!e.target.closest('.nav-btn,.module-tile'))return;
    setTimeout(function(){
      var h=innerHeight,i=0,list=document.querySelectorAll(SEL);
      for(var k=0;k<list.length&&i<9;k++){
        var r=list[k].getBoundingClientRect();
        if(r.width>0&&r.top<h&&r.bottom>0)rise(list[k],i++*55);
      }
      arm();
    },120);
  });
  setTimeout(arm,900);
})();
