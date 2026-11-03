(function(){  /* keep Chart.js text/grid readable in both modes */
  var last=null;
  function sync(){
    if(!window.Chart)return;
    var dark=!document.body.classList.contains('light-theme');
    if(dark===last)return;last=dark;
    var tx=dark?'#ffffff':'#000000',gr=dark?'rgba(255,255,255,.10)':'rgba(15,23,42,.08)';
    try{Chart.defaults.color=tx;Chart.defaults.borderColor=gr}catch(e){}
    try{Object.keys(Chart.instances).forEach(function(k){
      var c=Chart.instances[k],o=c.options||{};var tx=(window.__fiIsLight?window.__fiIsLight(c.canvas):!dark)?'#000000':'#ffffff';
      Object.keys(o.scales||{}).forEach(function(a){var s=o.scales[a];
        s.ticks=s.ticks||{};s.ticks.color=tx;if(s.grid)s.grid.color=gr;if(s.title)s.title.color=tx});
      if(o.plugins&&o.plugins.legend&&o.plugins.legend.labels)o.plugins.legend.labels.color=tx;
      c.update('none');
    })}catch(e){}
  }
  new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
  setTimeout(sync,1200);
})();
