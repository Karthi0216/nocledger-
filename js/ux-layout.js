(function(){
  var b=document.getElementById('navSupportBtn');
  if(!b || b.dataset.supportBound) return;
  b.dataset.supportBound='1';
  b.addEventListener('click',function(){
    var f=document.getElementById('supportFabBtn');
    if(f) f.click();
  });
})();
