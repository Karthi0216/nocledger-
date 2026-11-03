(function(){
if(window.FmtImport)return;
/* Is the area behind a chart light? (black text on light, light text on dark) */
window.__fiIsLight=function(el){
  if(document.body.classList.contains('light-theme'))return true;
  try{var c=getComputedStyle((el&&el.closest&&el.closest('.card'))||document.body).backgroundColor,m=c.match(/[\d.]+/g);
    if(m&&m.length>=3&&(m.length<4||+m[3]>0.5))return (0.299*m[0]+0.587*m[1]+0.114*m[2])>170}catch(e){}
  return false};

var KINDS={
 app:{title:'Application Usage',unit:true,fields:[
   ['date','Date',1,['date','day','reportdate']],
   ['host','Host / IP',1,['host','ip','hostip','ipaddress','sourceip','hostname','device','username','user']],
   ['app','Application',1,['application','app','appname','protocol','service','applicationname']],
   ['usage','Usage',1,['appusagegb','applicationusagegb','usagegb','usage','gb','total','totalbytes','bytes','traffic','volume']],
   ['branch','Branch (optional)',0,['branch','location','site']]]},
 usage:{title:'Host Usage',unit:true,matrix:true,fields:[
   ['date','Date',1,['date','day','reportdate']],
   ['host','Host / IP',1,['host','ip','hostip','ipaddress','sourceip','hostname','device','name','user']],
   ['usage','Usage',1,['usagegb','usage','gb','total','totalbytes','bytes','traffic','volume','data']],
   ['percent','Percent (optional)',0,['percent','percentage','share']]]},
 devices:{title:'Devices',fields:[
   ['name','Device name',0,['devicename','name','hostname','host','device']],
   ['ip','IP address',1,['ipaddress','ip','address','hostip']],
   ['mac','MAC (optional)',0,['macaddress','mac']],
   ['user','Username (optional)',0,['username','user','assignedto','owner','location']]]}
};
var norm=function(s){return String(s==null?'':s).toLowerCase().replace(/[^a-z0-9]/g,'')};
var colName=function(i){var s='';i++;while(i>0){var m=(i-1)%26;s=String.fromCharCode(65+m)+s;i=Math.floor((i-1)/26)}return s};
var esc=function(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};

/* ---------- file readers ---------- */
function parseDelim(text){
  text=String(text||'').replace(/^\uFEFF/,'');
  var first=(text.split(/\r?\n/).find(function(l){return l.trim()})||'');
  var c=first.split(',').length,t=first.split('\t').length,s=first.split(';').length;
  var d=t>c&&t>=s?'\t':(s>c?';':',');
  var rows=[],row=[],cur='',q=false;
  for(var i=0;i<text.length;i++){var ch=text[i];
    if(q){if(ch==='"'){if(text[i+1]==='"'){cur+='"';i++}else q=false}else cur+=ch}
    else if(ch==='"')q=true;
    else if(ch===d){row.push(cur);cur=''}
    else if(ch==='\n'||ch==='\r'){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(cur);rows.push(row);row=[];cur=''}
    else cur+=ch}
  if(cur!==''||row.length){row.push(cur);rows.push(row)}
  return rows.filter(function(r){return r.some(function(x){return String(x).trim()!==''})});
}
async function readXlsx(buf){
  if(typeof DecompressionStream==='undefined')throw new Error('This browser cannot read .xlsx - save the sheet as CSV and upload that');
  var u8=new Uint8Array(buf),dv=new DataView(buf),td=new TextDecoder(),e=u8.length-22;
  while(e>=0&&dv.getUint32(e,true)!==0x06054b50)e--;
  if(e<0)throw new Error('Not a valid .xlsx file');
  var n=dv.getUint16(e+10,true),p=dv.getUint32(e+16,true),files={};
  for(var i=0;i<n;i++){if(dv.getUint32(p,true)!==0x02014b50)break;
    var nl=dv.getUint16(p+28,true),el=dv.getUint16(p+30,true),cl=dv.getUint16(p+32,true);
    files[td.decode(u8.subarray(p+46,p+46+nl))]={method:dv.getUint16(p+10,true),cs:dv.getUint32(p+20,true),lho:dv.getUint32(p+42,true)};
    p+=46+nl+el+cl}
  async function get(name){var f=files[name];if(!f)return null;var lp=f.lho,st=lp+30+dv.getUint16(lp+26,true)+dv.getUint16(lp+28,true),data=u8.subarray(st,st+f.cs);
    if(f.method===0)return td.decode(data);
    return await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text()}
  var P=new DOMParser(),xml=function(t){return P.parseFromString(t,'application/xml')};
  var shared=[],ss=await get('xl/sharedStrings.xml');
  if(ss)Array.prototype.forEach.call(xml(ss).getElementsByTagName('si'),function(si){
    var t='';Array.prototype.forEach.call(si.getElementsByTagName('t'),function(x){if(!x.parentNode||x.parentNode.nodeName!=='rPh')t+=x.textContent});shared.push(t)});
  var sheets=[],wb=await get('xl/workbook.xml'),rel=await get('xl/_rels/workbook.xml.rels');
  if(wb&&rel){var tg={};Array.prototype.forEach.call(xml(rel).getElementsByTagName('Relationship'),function(r){tg[r.getAttribute('Id')]=r.getAttribute('Target')});
    Array.prototype.forEach.call(xml(wb).getElementsByTagName('sheet'),function(sh){var t=tg[sh.getAttribute('r:id')];if(t)sheets.push({name:sh.getAttribute('name')||'Sheet',path:t[0]==='/'?t.slice(1):'xl/'+t})})}
  if(!sheets.length)Object.keys(files).filter(function(k){return /^xl\/worksheets\/sheet\d+\.xml$/.test(k)}).sort().forEach(function(k,i){sheets.push({name:'Sheet'+(i+1),path:k})});
  var out=[];
  for(var s=0;s<sheets.length;s++){var sx=await get(sheets[s].path);if(!sx)continue;var rows=[];
    Array.prototype.forEach.call(xml(sx).getElementsByTagName('row'),function(row){var arr=[];
      Array.prototype.forEach.call(row.getElementsByTagName('c'),function(c){
        var ref=c.getAttribute('r')||'',m=/^([A-Z]+)/.exec(ref),ci=arr.length;
        if(m){ci=0;for(var j=0;j<m[1].length;j++)ci=ci*26+(m[1].charCodeAt(j)-64);ci--}
        var t=c.getAttribute('t'),v=c.getElementsByTagName('v')[0],val='';
        if(t==='s')val=shared[parseInt(v?v.textContent:'-1',10)]||'';
        else if(t==='inlineStr'){var is=c.getElementsByTagName('is')[0];val=is?is.textContent:''}
        else val=v?v.textContent:'';
        arr[ci]=val});
      var full=[];for(var q=0;q<arr.length;q++)full.push(arr[q]==null?'':arr[q]);
      if(full.some(function(x){return String(x).trim()!==''}))rows.push(full)});
    out.push({name:sheets[s].name,rows:rows})}
  return out}
async function readFile(file){
  if(/\.(xlsx|xlsm)$/i.test(file.name))return await readXlsx(await file.arrayBuffer());
  if(/\.xls$/i.test(file.name))throw new Error('Old .xls files are not supported - open it in Excel and "Save As" .xlsx or .csv');
  return [{name:'Data',rows:parseDelim(await file.text())}]}

/* ---------- value parsers ---------- */
var pad=function(n){return String(n).padStart(2,'0')};
function normDate(v,fmt){
  v=String(v==null?'':v).trim();if(!v)return '';
  if(/^\d{5}(\.\d+)?$/.test(v)&&+v>20000&&+v<80000){var d=new Date(Date.UTC(1899,11,30)+Math.floor(+v)*864e5);return d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate())}
  var m=v.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/);if(m)return m[1]+'-'+pad(m[2])+'-'+pad(m[3]);
  m=v.match(/(\d{1,2})\s*[-\/.\\]\s*(\d{1,2})\s*[-\/.\\]\s*(\d{2,4})/);
  if(m){var a=+m[1],b=+m[2],y=m[3];if(y.length===2)y=(+y<50?'20':'19')+y;
    var dmy=fmt==='dmy'||(fmt!=='mdy'&&!(b>12&&a<=12));
    var dd=dmy?a:b,mm=dmy?b:a;if(mm<1||mm>12||dd<1||dd>31)return '';return y+'-'+pad(mm)+'-'+pad(dd)}
  var t=Date.parse(v+' 12:00');if(!isNaN(t)){var d2=new Date(t);return d2.getFullYear()+'-'+pad(d2.getMonth()+1)+'-'+pad(d2.getDate())}
  return ''}
var UF={tb:1024,gb:1,mb:1/1024,kb:1/1048576,b:1/1073741824,bytes:1/1073741824,byte:1/1073741824};
function toGBVal(v,unit){
  var s=String(v==null?'':v).replace(/,/g,'').trim();var m=s.match(/^(-?[\d.]+(?:e[+-]?\d+)?)\s*([a-z]*)/i);if(!m)return NaN;
  var n=parseFloat(m[1]);if(!isFinite(n))return NaN;var u=(m[2]||'').toLowerCase().replace(/ib$/,'b');if(u==='bytes')u='b';
  var f=UF[u];if(f==null)f=UF[unit]||1;return n*f}
var isIP=function(s){return /^\d{1,3}(\.\d{1,3}){3}$/.test(String(s).trim())};

/* ---------- header detection / mapping ---------- */
function autoMap(K,rows,hdr){
  var head=hdr>0?(rows[hdr-1]||[]):[],map={},used={};
  K.fields.forEach(function(f){map[f[0]]=-1});
  [0,1].forEach(function(pass){K.fields.forEach(function(f){
    if(map[f[0]]>=0)return;
    for(var ai=0;ai<f[3].length&&map[f[0]]<0;ai++){
      for(var c=0;c<head.length;c++){if(used[c])continue;var h=norm(head[c]);if(!h)continue;
        if(pass===0?h===f[3][ai]:(h.indexOf(f[3][ai])>=0&&f[3][ai].length>2)){map[f[0]]=c;used[c]=1;break}}}})});
  return map}
function detectHeader(K,rows){
  var best=1,bs=-1;
  for(var r=1;r<=Math.min(8,rows.length);r++){var m=autoMap(K,rows,r),sc=0;
    K.fields.forEach(function(f){if(m[f[0]]>=0)sc+=f[2]?2:1});
    var cells=(rows[r-1]||[]).filter(function(x){return String(x).trim()!==''});
    if(cells.length>=2&&sc>bs){bs=sc;best=r}}
  if(bs<=0)return 1;return best}
function looksTabular(kind,text){
  var K=KINDS[kind],rows=parseDelim(text).slice(0,8);if(rows.length<2)return false;
  if(kind==='devices'){var h=rows[0];return !h.some(function(x){return isIP(x)})&&autoMap(K,rows,1).ip>=0}
  var need=K.fields.filter(function(f){return f[2]}).length;
  for(var r=1;r<=rows.length;r++){var m=autoMap(K,rows,r),got=K.fields.filter(function(f){return f[2]&&m[f[0]]>=0}).length;if(got>=need)return true}
  return false}

/* ---------- dialog ---------- */
function openDialog(kind,file,sheets){
  return new Promise(function(resolve){
    var K=KINDS[kind],S={sheet:0,hdr:1,layout:'list',unit:'gb',dfmt:'auto',map:{}};
    var ov=document.createElement('div');ov.className='fi-ov';
    var opts=function(a){return a.map(function(x){return '<option value="'+x[0]+'">'+x[1]+'</option>'}).join('')};
    ov.innerHTML='<div class="fi-box" role="dialog" aria-modal="true"><h3>Select upload format — '+esc(K.title)+'</h3>'
     +'<div class="fi-sub">File: '+esc(file.name)+' · '+sheets.reduce(function(a,s){return a+s.rows.length},0)+' row(s)</div>'
     +'<div class="fi-grid">'
     +'<div><label>File format / layout</label><select id="fi-layout">'+opts([['list','List — one row per record']].concat(K.matrix?[['matrix','Matrix — hosts down, dates across']]:[]))+'</select></div>'
     +(sheets.length>1?'<div><label>Sheet</label><select id="fi-sheet">'+sheets.map(function(s,i){return '<option value="'+i+'">'+esc(s.name)+' ('+s.rows.length+' rows)</option>'}).join('')+'</select></div>':'')
     +'<div><label>Header row <small>(0 = no header)</small></label><input type="number" id="fi-hdr" min="0" max="50" value="1"></div>'
     +(K.unit?'<div><label>Usage unit <small>(if not in cell)</small></label><select id="fi-unit">'+opts([['gb','GB'],['mb','MB'],['kb','KB'],['b','Bytes'],['tb','TB']])+'</select></div>':'')
     +(kind!=='devices'?'<div><label>Date format</label><select id="fi-dfmt">'+opts([['auto','Auto-detect'],['dmy','DD/MM/YYYY'],['mdy','MM/DD/YYYY']])+'</select></div>':'')
     +'</div><div class="fi-grid" id="fi-map"></div><div class="fi-fmt" id="fi-note"></div>'
     +'<div class="fi-prev"><table id="fi-prev"></table></div><div class="fi-msg" id="fi-msg"></div>'
     +'<div class="fi-btns"><button class="btn ghost" type="button" id="fi-cancel">Cancel</button><button class="btn" type="button" id="fi-ok">Use this format</button></div></div>';
    document.body.appendChild(ov);
    var $=function(id){return ov.querySelector('#'+id)};
    var rows=function(){return sheets[S.sheet].rows};
    function colOpts(){var head=S.hdr>0?(rows()[S.hdr-1]||[]):[],w=Math.max.apply(null,rows().slice(0,30).map(function(r){return r.length}).concat([head.length,1])),o='<option value="-1">— not in file —</option>';
      for(var c=0;c<w;c++){var h=String(head[c]==null?'':head[c]).trim(),smp=String((rows()[Math.max(S.hdr,0)]||[])[c]||'').trim();
        o+='<option value="'+c+'">Column '+colName(c)+(h?' — '+esc(h.slice(0,28)):(smp?' — e.g. '+esc(smp.slice(0,22)):''))+'</option>'}
      return o}
    function buildMapUI(){
      var fs=S.layout==='matrix'?K.fields.filter(function(f){return f[0]==='host'}):K.fields;
      $('fi-map').innerHTML=fs.map(function(f){return '<div><label>'+f[1]+(f[2]?' <span class="fi-req">*</span>':'')+'</label><select data-k="'+f[0]+'">'+colOpts()+'</select></div>'}).join('');
      Array.prototype.forEach.call($('fi-map').querySelectorAll('select'),function(sel){sel.value=String(S.map[sel.dataset.k]);sel.onchange=function(){S.map[sel.dataset.k]=+sel.value;preview()}})}
    function remap(){S.map=autoMap(K,rows(),S.hdr);buildMapUI();preview()}
    function build(limit){
      var R=rows(),start=Math.max(S.hdr,0),out=[],skipped=0;
      if(S.layout==='matrix'){
        var hc=S.map.host>=0?S.map.host:0,head=R[S.hdr-1]||[],dc=[];
        head.forEach(function(h,c){if(c!==hc){var d=normDate(h,S.dfmt);if(d)dc.push([c,d])}});
        for(var i=start;i<R.length;i++){var host=String(R[i][hc]||'').trim();if(!host||/^(total|grand total)$/i.test(host)){continue}
          dc.forEach(function(x){var g=toGBVal(R[i][x[0]],S.unit);if(isFinite(g)&&g>0)out.push({date:x[1],host:host,usage:g});else if(String(R[i][x[0]]||'').trim())skipped++});
          if(limit&&out.length>=limit)break}
        return {recs:out,skipped:skipped,note:'Date columns found: '+dc.length}}
      for(var j=start;j<R.length;j++){var r=R[j],rec={},ok=true,g=function(k){return S.map[k]>=0?r[S.map[k]]:''};
        K.fields.forEach(function(f){var raw=g(f[0]),k=f[0],v;
          if(k==='date'){v=normDate(raw,S.dfmt)}
          else if(k==='usage'){v=toGBVal(raw,S.unit);if(!(isFinite(v)&&v>0))v=NaN}
          else if(k==='percent'){v=parseFloat(String(raw).replace('%',''));if(!isFinite(v))v=null}
          else v=String(raw==null?'':raw).trim();
          if(f[2]&&(v===''||(typeof v==='number'&&isNaN(v))))ok=false;
          rec[k]=v});
        if(kind==='devices'&&!isIP(rec.ip))ok=false;
        if(ok)out.push(rec);else if(r.some(function(x){return String(x).trim()!==''}))skipped++;
        if(limit&&out.length>=limit)break}
      return {recs:out,skipped:skipped,note:''}}
    function preview(){
      var b=build(6),cols=S.layout==='matrix'?['date','host','usage']:K.fields.map(function(f){return f[0]}).filter(function(k){return S.map[k]>=0});
      var lab={};K.fields.forEach(function(f){lab[f[0]]=f[1].replace(' (optional)','')});lab.usage='Usage (GB)';
      $('fi-prev').innerHTML='<thead><tr>'+cols.map(function(k){return '<th>'+(lab[k]||k)+'</th>'}).join('')+'</tr></thead><tbody>'
        +b.recs.map(function(r){return '<tr>'+cols.map(function(k){var v=r[k];return '<td>'+esc(typeof v==='number'?(+v.toFixed(5)):v)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody>';
      var full=build(0);
      $('fi-note').textContent=(full.note?full.note+' · ':'')+full.recs.length+' valid row(s)'+(full.skipped?' · '+full.skipped+' skipped (missing/invalid values)':'');
      var missing=(S.layout==='matrix'?[]:K.fields.filter(function(f){return f[2]&&!(S.map[f[0]]>=0)})).map(function(f){return f[1]});
      $('fi-msg').style.color='#dc2626';
      $('fi-msg').textContent=missing.length?'Pick a column for: '+missing.join(', '):(full.recs.length?'':'No valid rows with this selection — change the header row / columns above.')}
    $('fi-layout').onchange=function(){S.layout=this.value;S.hdr=detectHeader(K,rows());$('fi-hdr').value=S.hdr;remap()};
    if($('fi-sheet'))$('fi-sheet').onchange=function(){S.sheet=+this.value;S.hdr=detectHeader(K,rows());$('fi-hdr').value=S.hdr;remap()};
    $('fi-hdr').oninput=function(){S.hdr=Math.max(0,parseInt(this.value||'0',10)||0);remap()};
    if($('fi-unit'))$('fi-unit').onchange=function(){S.unit=this.value;preview()};
    if($('fi-dfmt'))$('fi-dfmt').onchange=function(){S.dfmt=this.value;preview()};
    function close(v){ov.remove();resolve(v)}
    $('fi-cancel').onclick=function(){close(null)};
    ov.addEventListener('mousedown',function(e){if(e.target===ov)close(null)});
    $('fi-ok').onclick=function(){var b=build(0);
      if(!b.recs.length){preview();return}
      var miss=(S.layout==='matrix'?[]:K.fields.filter(function(f){return f[2]&&!(S.map[f[0]]>=0)}));if(miss.length){preview();return}
      close(b.recs)};
    // best sheet = first one with data
    var bi=sheets.findIndex(function(s){return s.rows.length>1});S.sheet=bi<0?0:bi;if($('fi-sheet'))$('fi-sheet').value=String(S.sheet);
    S.hdr=detectHeader(K,rows());$('fi-hdr').value=S.hdr;remap();
  })}

/* ---------- record -> text converters (feed the existing parsers) ---------- */
function lineCSV(a){return a.map(function(x){x=String(x==null?'':x);return /[",\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x}).join(',')}
function toAppCsv(recs){return ['Date,Branch,Host,Application,App_Usage_GB'].concat(recs.map(function(r){return lineCSV([r.date,r.branch||'',r.host,r.app,+r.usage.toFixed(6)])})).join('\n')}
function toUsageText(recs){
  var devs=(typeof devices!=='undefined'&&Array.isArray(devices))?devices:[],br=(typeof currentBranch!=='undefined'?String(currentBranch):'').toUpperCase(),csv=[],blocks={};
  recs.forEach(function(r){
    var ip=isIP(r.host)?r.host.trim():'';
    if(!ip){var m=devs.find(function(d){return String(d.name||'').toLowerCase()===r.host.toLowerCase()||d.ip===r.host});if(m&&isIP(m.ip))ip=m.ip}
    if(ip)csv.push([r.date,br,ip,r.host,+r.usage.toFixed(6),0,0,'Final'].join(','));
    else(blocks[r.date]=blocks[r.date]||[]).push(r)});
  var out=csv.slice();
  Object.keys(blocks).sort().forEach(function(d){var p=d.split('-');out.push('Day ('+p[2]+'/'+p[1]+'/'+p[0]+')');
    blocks[d].forEach(function(r){out.push(r.host+'\t'+(+r.usage.toFixed(6))+' GB'+(r.percent!=null?'\t'+r.percent:''))})});
  return out.join('\n')}
function toDeviceText(recs){return recs.map(function(r){var a=[r.name||'',r.ip,r.mac||'',r.user||''];while(a.length>2&&a[a.length-1]==='')a.pop();if(a.length===2&&a[0]==='')return r.ip;return a.join(', ')}).join('\n')}

/* run(kind,file,force): undefined = use the page's original path, null = cancelled, string = converted text */
async function run(kind,file,force){
  try{
    var isX=/\.(xlsx|xlsm|xls)$/i.test(file.name||'');
    if(!isX&&!force){
      var t=await file.text();
      if(kind==='app'){if(typeof dmParseAppCsv==='function'){var p=dmParseAppCsv(t,'x');if(!p.error)return undefined}}
      else if(!looksTabular(kind,t))return undefined}
    var sheets=(await readFile(file)).filter(function(s){return s.rows.length});
    if(!sheets.length){alert('No data found in this file.');return null}
    var recs=await openDialog(kind,file,sheets);
    if(!recs)return null;
    return kind==='app'?toAppCsv(recs):kind==='usage'?toUsageText(recs):toDeviceText(recs);
  }catch(e){console.error(e);alert(e.message||String(e));return null}}

window.FmtImport={run:run,readFile:readFile,parseDelim:parseDelim};
})();
