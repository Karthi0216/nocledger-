/* ================= constants & seed data ================= */
const BRANCHES = [
  { id:'all',       label:'All Branches' },
  { id:'bangalore', label:'Bangalore' },
  { id:'chennai',   label:'Chennai' },
  { id:'hosur',     label:'Hosur' }
];
const REPORT_BRANCHES = BRANCHES.filter(b=>b.id!=='all');
const DEFAULT_BRANCH = 'chennai'; // this branch keeps the original/existing data
const BRANCH_PREF_KEY = 'active-branch';
let currentBranch = DEFAULT_BRANCH;

function branchLabel(id){
  const b = BRANCHES.find(b=>b.id===id);
  return b ? b.label : id;
}
// Every branch gets its own devices / usage / history under a suffixed key,
// so switching branches never mixes data between Bangalore, Chennai and Hosur.
function branchKey(base){
  return `${base}::${currentBranch}`;
}

const DEVICE_KEY = 'devices-directory';
const USAGE_KEY = 'usage-records';
const APPUSAGE_KEY = 'app-usage-records';
const FIXEDHOSTS_KEY = 'fixed-hosts-count';
const HISTORY_KEY = 'change-history';
const SESSION_KEY = 'current-session';

const APPS = ['YouTube','MS Teams','Windows Update','Instagram','Whatsapp','Facebook','Amazon','Flipkart','Other'];

// Broader app list used only for the branch-wide "Top Application" tag on each
// daily usage row — kept separate from APPS (used by the per-host granular
// "Add application usage" form) per your request.
const FIREWALL_APPS = ['YouTube','MS Teams','Windows Update','Instagram','Whatsapp','Facebook','Amazon','Flipkart',
  'Streaming','Mobile Speed Test','VPN','WireGuard','Canva','SMB','Multi-thread File Transfer','OpenVPN','UDP','Windows Store','TCP','Other'];

const SEED_DEVICES = [
["MADHURAJ","1C:C1:0C:3E:09:45","192.168.21.10"],["SOCIALMEDIA3","42:06:78:15:9B:20","192.168.21.11"],
["DELLLAPSP","40:A3:CC:6A:51:99","192.168.21.12"],["ANURADHACOD","40:A3:CC:68:26:6C","192.168.21.13"],
["DIVYAADMISSION","1C:4D:70:04:80:30","192.168.21.14"],["HEMAADMISSION","DC:71:96:1E:2B:E8","192.168.21.15"],
["PREETHILAP","84:FD:D1:56:28:4F","192.168.21.16"],["LAVANYALAP","CC:2F:71:DB:ED:CC","192.168.21.17"],
["MANONMANILAP","A4:C3:F0:6F:1F:D5","192.168.21.18"],["SOCIALMEDIALAP","40:A3:CC:68:31:BB","192.168.21.19"],
["ACCOUNTSMOUNIKA","70:4D:E7:46:B1:5D","192.168.21.20"],["HEMAMOB","1C:11:2F:49:9D:13","192.168.21.21"],
["DIVYAMOB","1C:11:2F:51:E3:97","192.168.21.22"],["VISHNU-SIR","9E:D7:DE:B2:85:4B","192.168.21.23"],
["VINEETH-SIR","88:1F:A1:01:18:B2","192.168.21.24"],["NIKITHA-MAM","E4:A7:A0:4F:D5:B2","192.168.21.25"],
["I-PHONE-1","14:2D:4D:34:A7:3E","192.168.21.26"],["I-PHONE-2","1C:71:25:62:04:64","192.168.21.27"],
["DEEPITHA-MAM","A4:D1:8C:CF:6B:C2","192.168.21.28"],["VC-MOBILE","66:50:87:A8:64:A7","192.168.21.29"],
["LAKSHMI-MAM-BLR","78:2B:46:75:6F:89","192.168.21.30"],["VISHNU-SIR-1","28:D0:43:8B:55:08","192.168.21.31"],
["CHAIRMAN-SIR","82:18:7D:E7:2B:83","192.168.21.32"],["NIKITHA-MOB","46:AE:B7:17:B1:48","192.168.21.33"],
["NIKITHA-LAP","E4:A7:A0:4F:D5:B6","192.168.21.34"],["NIKITHA-MAM-MOB","E6:4F:C7:86:7D:9D","192.168.21.35"],
["VINEETHSIR","2C:33:58:FD:90:E4","192.168.21.36"],["ASWINIMAM","5C:87:9C:82:46:BE","192.168.21.37"],
["SARITHALAP","DE:FA:0B:4F:B6:5C","192.168.21.38"],["SNEHASPORTS","78:BE:81:E4:83:F4","192.168.21.39"],
["PREETHIMAMMOB","3C:A8:0A:00:A8:43","192.168.21.40"],["BHARATHI","D0:39:57:38:09:EB","192.168.21.42"],
["DINESHLAP","28:2E:89:2D:01:AC","192.168.21.43"],["LAVANYAMB","2C:FE:4F:99:02:29","192.168.21.44"],
["SHINYJOSELINLAP","92:31:E2:9B:16:32","192.168.21.45"],["SOCIALMEDIA","16:3A:7E:16:5B:30","192.168.21.46"],
["ASWINIMAMMOB","3C:B0:ED:1D:36:18","192.168.21.47"],["ACHANA","98:59:7A:9D:6E:35","192.168.21.48"],
["SPORTSMANAGER","AC:C0:48:31:CE:0B","192.168.21.50"],["SHINYMB","48:74:12:B1:3A:15","192.168.21.52"],
["RECEPTIONTAB1","1E:28:32:11:2A:A4","192.168.21.53"],["RECEPTIONTAB2","DE:8A:75:51:D8:15","192.168.21.54"],
["MANOMB","86:2F:DA:C5:8A:B9","192.168.21.55"],["SURIYALAB","20:0B:74:95:7E:28","192.168.21.56"],
["SPARE","10:F0:05:76:BE:5C","192.168.21.57"],["FELSITAMAMHSR","DC:1B:A1:E5:99:8F","192.168.21.58"],
["LAHARI","0C:96:E6:A3:48:51","192.168.21.59"],["VINETHSIRLAP","80:B6:55:45:0D:A8","192.168.21.60"],
["KALAIMAMHSR","14:AB:C5:DF:C5:7D","192.168.21.62"],["SUMATHIHSR","C0:B8:83:BC:88:D8","192.168.21.63"],
["PRAVEENSIR","E4:1F:D5:B1:9F:13","192.168.21.64"],["NITHYA","B8:1E:A4:81:D5:DB","192.168.21.66"],
["ANUMAM","3C:AF:B7:01:B2:94","192.168.21.69"],["STEMLAPTOP","CC:2F:71:DB:ED:F4","192.168.21.72"],
["VISWASIR","C0:7A:D6:E8:74:6B","192.168.21.74"],["VISWASIRLAP","24:EE:9A:68:E0:66","192.168.21.75"],
["RANJINIMAM","28:CD:C4:98:B9:0F","192.168.21.76"],["VINEETHSIRMOB","86:9E:42:53:83:6E","192.168.21.77"],
["SAKTHIGREEKQUEST","B0:47:E9:78:88:54","192.168.21.78"],["STEMLAPTOPS","40:A3:CC:68:32:F1","192.168.21.80"],
["JESWINSPORTS","1C:C1:0C:49:04:C6","192.168.21.81"],["DHARASHINI","28:39:26:A2:09:99","192.168.21.82"],
["SOCIALMEDIAMOBILE-2","BA:5B:C1:14:0B:FC","192.168.21.84"],["VARASHINI","E4:A4:71:F3:E1:2F","192.168.21.85"],
["COD2VIJ","44:FB:76:92:EB:79","192.168.21.86"],["LAKSHMIMAMMBIIP","32:97:B5:AD:EC:E6","192.168.21.87"],
["LAKSHMIMOB2","AC:C0:48:79:DE:29","192.168.21.88"],["GAYTHRIMAM","A4:34:D9:8F:D7:A7","192.168.21.89"],
["PERIYASAMIHSR","D4:D2:52:B5:DF:8D","192.168.21.90"],["SOCIALMEDIAMB","32:1E:0D:CC:67:CD","192.168.21.91"],
["BHARATHIHSR","00:28:F8:D1:60:D7","192.168.21.92"],["ARATHIMAM","54:8C:A0:D0:E8:8B","192.168.21.93"],
["VINEETHSECMB","74:30:9D:0E:93:23","192.168.21.94"],["VISHNUSIR","62:34:21:61:A7:BB","192.168.21.95"],
["BAREGAVIDANCEHSR","94:E2:3C:C1:50:75","192.168.21.96"],["AFTERSCHOOLMB","DE:BA:CD:1C:86:E1","192.168.21.97"],
["CODMAMIJ","CC:D9:AC:DE:AC:06","192.168.21.98"],["BHARATHICHE","04:6C:59:1D:E0:93","192.168.21.99"],
["ASHWARY","E4:A7:A0:A7:7E:70","192.168.21.101"],["PRIYADHARASHINIMAMKG","8C:E0:42:94:B7:D7","192.168.21.102"],
["BHUVANESWARI","40:DE:24:08:3F:39","192.168.21.103"],["BHUVANA-LAP","48:A4:72:CF:55:C1","192.168.21.104"],
["VINEETHSIR3VC","4E:F3:66:38:02:13","192.168.21.105"],["DURAGALAKSHMIMB","AC:39:71:AF:85:09","192.168.21.107"],
["SURYA","24:EE:9A:9D:1D:FE","192.168.21.108"],["CODSTEMLAP","CC:2F:71:DB:F0:06","192.168.21.109"],
["ARTHIMAM","40:A3:CC:07:65:34","192.168.21.112"],["KRISHANAVANI","74:12:B3:EE:C8:AD","192.168.21.113"],
["SARANYAHSR","1C:CE:51:F1:D0:73","192.168.21.114"],["VIJAYATHICOD","78:0C:B8:8A:97:06","192.168.21.115"],
["SOCAILMEDIAIP","2E:B8:A2:9F:3D:B3","192.168.21.116"],["SENSESBOARD","30:E3:A4:8E:BD:3B","192.168.21.117"],
["MANITRANSPORT","18:5E:0F:9F:53:A8","192.168.21.118"],["SUVARNA1","B2:CF:A1:3A:B9:20","192.168.21.120"],
["SHALINI","C4:23:60:6C:36:BC","192.168.21.121"],["VINEETHMG","8E:50:F1:CE:35:4D","192.168.21.122"],
["VARASHNI","8A:C7:AA:EA:76:89","192.168.21.123"],["PRIYADHARASHINIST","5C:BA:EF:07:DC:49","192.168.21.124"],
["SUVARANALAP","AE:58:D5:11:FE:06","192.168.21.125"],["DEEPTHITHAMAM","8A:14:AB:BE:D7:2C","192.168.21.127"],
["SURYA-MAM","A8:E2:91:0C:AA:68","192.168.21.128"],["MADHURAJ-MOB","22:17:6E:B4:D8:55","192.168.21.129"],
["SOCAILMEDIAIPHONE","CA:1E:D4:97:5A:1A","192.168.21.130"],["SOCAILMEDIAVARASHINI","A6:E4:4B:1C:4C:A7","192.168.21.131"],
["SUVARANAMB","42:44:37:82:DD:E0","192.168.21.132"],
["Nursery A No. 2","—","192.168.100.66"],["LKG B","—","192.168.100.67"],["LKG A","—","192.168.100.68"],
["LKG C","—","192.168.100.69"],["UKG A","—","192.168.100.71"],["UKG B","—","192.168.100.73"],
["1A","—","192.168.100.77"],["1B","—","192.168.100.72"],["1C","—","192.168.100.74"],
["2","—","192.168.100.95"],["3A","—","192.168.100.81"],["3B","—","192.168.100.84"],
["3C","—","192.168.100.86"],["4A","—","192.168.100.82"],["4B","—","192.168.100.85"],
["5A","—","192.168.100.87"],["5B","—","192.168.100.94"],["6A","—","192.168.100.90"],
["6B","—","192.168.100.91"],["7A","—","192.168.100.88"],["CHENNAI PRIMARY","—","192.168.100.1"],
["User 1","—","192.168.100.32"],["User 3","—","192.168.100.34"],["User 4","—","192.168.100.35"],
["User 5","—","192.168.100.36"],["User 6","—","192.168.100.37"],["User 7","—","192.168.100.38"],
["User 9","—","192.168.100.39"],["User 10","—","192.168.100.40"],["User 11","—","192.168.100.41"],
["User 12","—","192.168.100.42"],["User 13","—","192.168.100.43"],["User 14","—","192.168.100.44"],
["User 15","—","192.168.100.45"],["User 16","—","192.168.100.46"],["User 17","—","192.168.100.47"],
["User 8","—","192.168.100.49"],["User 18","—","192.168.100.48"],["User 19","—","192.168.100.50"],
["User 20","—","192.168.100.51"],["User 21","—","192.168.100.52"],["User 22","—","192.168.100.53"],
["User 23","—","192.168.100.54"],["User 24","—","192.168.100.55"],["User 25","—","192.168.100.56"],
["User 26","—","192.168.100.57"],["User 27","—","192.168.100.58"],["User 28","—","192.168.100.59"],
["User 29","—","192.168.100.60"],["User 30","—","192.168.100.61"],["User 31","—","192.168.100.62"],
["User 32","—","192.168.100.63"]
];

const SEED_USAGE_TODAY = {
  date: "",
  rows: []
};

/* ================= storage adapter =================
   Uses Claude's built-in storage when this page is running inside a
   Claude artifact preview. If it's opened as a standalone file (downloaded,
   or hosted on your own server), that API won't exist — so this falls back
   to the browser's own storage automatically, keeping data saved on that
   device/browser either way. */
const IS_MANAGER_SNAPSHOT = window.__NOC_MANAGER_SNAPSHOT__ === true;
const EMBEDDED_DATA = window.__NOC_EMBEDDED_DATA__ || {};
const CLOUD_STORAGE = (typeof window.storage !== 'undefined' && typeof window.storage.get === 'function');

/* ================= Firebase (real shared database) =================
   Used when this file is opened OUTSIDE a Claude artifact (downloaded,
   or hosted on your own server) — so that data added by any user on any
   device/branch is truly shared with everyone, instead of staying stuck
   in that one browser's localStorage. */
const FIREBASE_DB_URL = "https://noc-usage-tracker-default-rtdb.firebaseio.com";
// Shared Firebase Realtime Database connection.
// Keep your database rules configured to allow only authenticated/authorized users in production.
const FIREBASE_ENABLED = !!FIREBASE_DB_URL;
function fbPath(key){ return `${FIREBASE_DB_URL}/data/${encodeURIComponent(key)}.json`; }
async function firebaseFetch(url, options={}){
  const controller = new AbortController();
  const {timeoutMs, ...fetchOpts} = options;
  const timer = setTimeout(()=>controller.abort(), timeoutMs || 4500);
  try{
    return await fetch(url, {...fetchOpts, signal:controller.signal, cache:'no-store'});
  }finally{
    clearTimeout(timer);
  }
}
async function fbGet(key){
  // Branch usage / application data can be several MB. The old 4.5s cut-off made
  // big reads fail silently (=> "0 GB / No data found"). Use 30s and retry 3 times.
  let lastErr;
  for(let attempt=0; attempt<3; attempt++){
    try{
      const res = await firebaseFetch(fbPath(key), {timeoutMs:30000});
      if(!res.ok){
        if(res.status===401 || res.status===403) throw new Error('firebase get failed: ' + res.status + ' (database rules deny read)');
        throw new Error('firebase get failed: ' + res.status);
      }
      return await res.json();
    }catch(e){
      lastErr = e;
      if(/rules deny/.test(String(e.message))) break;
      await new Promise(r=>setTimeout(r, 700*(attempt+1)));
    }
  }
  throw lastErr;
}
async function fbSet(key, value){
  const res = await firebaseFetch(fbPath(key), { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(value) });
  if(!res.ok) throw new Error('firebase set failed: ' + res.status);
  return await res.json();
}
async function fbDelete(key){
  const res = await firebaseFetch(fbPath(key), { method:'DELETE' });
  if(!res.ok) throw new Error('firebase delete failed: ' + res.status);
  return true;
}

async function checkFirewallDataLink(){
  const pill=document.getElementById('fwConnectionPill');
  if(!pill) return;
  pill.classList.remove('ok','bad');
  pill.textContent='● Data link: checking…';
  try{
    if(!FIREBASE_ENABLED) throw new Error('Firebase disabled');
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),5000);
    const res=await fetch(fbPath('system/health'),{method:'GET',cache:'no-store',signal:controller.signal});
    clearTimeout(timer);
    if(!res.ok) throw new Error('HTTP '+res.status);
    pill.classList.add('ok');
    pill.textContent='● Data link: Connected';
    pill.title='Dashboard data source is reachable. This does not prove the physical firewall device/API is reachable.';
  }catch(e){
    pill.classList.add('bad');
    pill.textContent='● Data link: Offline';
    pill.title='Dashboard data source could not be reached. Actual firewall-device health still requires a configured firewall API/health endpoint.';
  }
}

/* ================= theme toggle (dark / light) ================= */
const THEME_KEY = 'theme-pref';
const SUN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/></svg>';
const MOON_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a7 7 0 0 0 10.7 10.7Z"/></svg>';

function applyTheme(theme){
  document.body.classList.toggle('light-theme', theme === 'light');
  const icon = theme === 'light' ? SUN_ICON : MOON_ICON;
  const label = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  ['themeToggleDesktop','themeToggleMobile'].forEach(id=>{
    const btn = document.getElementById(id);
    if(btn){ btn.innerHTML = icon; btn.setAttribute('aria-label', label); btn.title = label; }
  });
}

async function initTheme(){
  let theme = 'dark';
  try{
    const saved = await store.get(THEME_KEY, false);
    if(saved && (saved.value === 'light' || saved.value === 'dark')) theme = saved.value;
  }catch(e){}
  applyTheme(theme);
}
async function toggleTheme(){
  const next = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  applyTheme(next);
  try{ await store.set(THEME_KEY, next, false); }catch(e){}
}

/* ================= sync status banner =================
   Shown whenever this browser silently drops back to its own local
   storage for SHARED data (branch usage, devices, IP status, etc)
   because Firebase could not be reached. Without this, two computers
   can drift apart (different totals for the same branch) with no
   visible warning — which is exactly the bug this banner is meant to
   catch immediately instead of after the fact. */
let __syncBannerDismissed = false;
let __syncIsFallback = false;
function markSyncFallback(reason){
  __syncIsFallback = true;
  if(__syncBannerDismissed) return;
  const banner = document.getElementById('syncBanner');
  const text = document.getElementById('syncBannerText');
  if(!banner || !text) return;
  text.textContent = '⚠️ Not connected to the shared database (Firebase) — showing this browser\'s local copy only. Anything you add now will NOT appear on other computers until this reconnects.';
  banner.style.display = 'flex';
}
function markSyncOk(){
  const wasFallback = __syncIsFallback;
  __syncIsFallback = false;
  if(wasFallback){
    const banner = document.getElementById('syncBanner');
    if(banner) banner.style.display = 'none';
  }
}
async function retrySyncCheck(){
  const btn = document.getElementById('syncBannerRetry');
  if(btn){ btn.disabled = true; btn.textContent = 'Checking…'; }
  try{
    if(FIREBASE_ENABLED){
      await fbGet('system/health');
      __syncBannerDismissed = false;
      markSyncOk();
      if(typeof showToast === 'function') showToast('Reconnected to shared database ✓');
      if(typeof scheduleDataRefresh === 'function') scheduleDataRefresh();
    }
  }catch(e){
    if(typeof showToast === 'function') showToast('Still can\'t reach the shared database');
  }finally{
    if(btn){ btn.disabled = false; btn.textContent = 'Retry connection'; }
  }
}
function dismissSyncBanner(){
  __syncBannerDismissed = true;
  const banner = document.getElementById('syncBanner');
  if(banner) banner.style.display = 'none';
}

const __fbCache = new Map();
const __fbInflight = new Map();
const __FB_CACHE_TTL = 8000;
function __fbCacheKey(key, shared){ return (shared ? 'S:' : 'L:') + key; }
function __fbCacheRead(key, shared){
  if(!shared) return undefined;
  const k=__fbCacheKey(key,shared), hit=__fbCache.get(k);
  if(!hit) return undefined;
  if(Date.now()-hit.at > __FB_CACHE_TTL){ __fbCache.delete(k); return undefined; }
  return hit.value;
}
function __fbCacheWrite(key, shared, value){ if(shared) __fbCache.set(__fbCacheKey(key,shared),{at:Date.now(),value}); }
function __fbCacheInvalidate(key){ __fbCache.delete(__fbCacheKey(key,true)); }

const store = {
  async get(key, shared){
    const cached=__fbCacheRead(key,shared);
    if(cached!==undefined) return cached;
    const inflightKey=__fbCacheKey(key,shared);
    if(shared && __fbInflight.has(inflightKey)) return await __fbInflight.get(inflightKey);
    const work=(async()=>{
      if(Object.prototype.hasOwnProperty.call(EMBEDDED_DATA, key)){
        return { key, value: EMBEDDED_DATA[key], shared };
      }
      if(CLOUD_STORAGE){
        try{ return await window.storage.get(key, shared); }
        catch(e){ return null; }
      }
      if(shared && FIREBASE_ENABLED){
        try{
          const val = await fbGet(key);
          markSyncOk();
          const out=(val !== null && val !== undefined) ? { key, value: val, shared } : null;
          __fbCacheWrite(key,shared,out);
          return out;
        }catch(e){
          console.error('firebase get failed', e);
          markSyncFallback('get:'+key);
          return null;
        }
      }
      try{
        const raw = localStorage.getItem(key);
        return raw !== null ? { key, value: raw, shared } : null;
      }catch(e){ return null; }
    })();
    if(shared){
      __fbInflight.set(inflightKey,work);
      try{return await work;} finally{__fbInflight.delete(inflightKey);}
    }
    return await work;
  },
  async set(key, value, shared){
    if(CLOUD_STORAGE){
      try{ return await window.storage.set(key, value, shared); }
      catch(e){ console.error('storage set failed', e); return null; }
    }
    if(shared && FIREBASE_ENABLED){
      try{ await fbSet(key, value); __fbCacheInvalidate(key); markSyncOk(); return { key, value, shared }; }
      catch(e){ console.error('firebase set failed', e); markSyncFallback('set:'+key); return null; }
    }
    try{ localStorage.setItem(key, value); return { key, value, shared }; }
    catch(e){ console.error('local storage set failed', e); return null; }
  },
  async delete(key, shared){
    if(CLOUD_STORAGE){
      try{ return await window.storage.delete(key, shared); }
      catch(e){ return null; }
    }
    if(shared && FIREBASE_ENABLED){
      try{ await fbDelete(key); __fbCacheInvalidate(key); markSyncOk(); return { key, deleted:true, shared }; }
      catch(e){ console.error('firebase delete failed', e); markSyncFallback('delete:'+key); return null; }
    }
    try{ localStorage.removeItem(key); return { key, deleted:true, shared }; }
    catch(e){ return null; }
  }
};

/* ================= auto-purge stale local cache on DB change =================
   Whenever the shared Firebase database is reachable but empty for a key
   (e.g. right after switching to a brand-new Firebase project), store.get()
   above deliberately falls back to whatever this browser saved locally the
   last time it worked — that's normally helpful (keeps you working if
   Firebase briefly drops), but it means an OLD local number can keep
   showing up forever after a real database switch, even though the new
   database is now the actual source of truth.
   This runs once on page load: it remembers which FIREBASE_DB_URL this
   browser last used, and if that URL has changed, it wipes every locally
   cached shared-data key (branch usage, devices, app usage, etc). Per-
   browser-only preferences (theme, last-viewed branch, login session) are
   left untouched. After this runs, this computer will show exactly what's
   really in the new database instead of a stale cached number. */
const DB_URL_MARKER_KEY = 'firebase-db-url-marker';
const LOCAL_ONLY_KEYS = new Set([DB_URL_MARKER_KEY, THEME_KEY, BRANCH_PREF_KEY, SESSION_KEY]);
function purgeStaleLocalCacheIfDbChanged(){
  if(CLOUD_STORAGE || !FIREBASE_ENABLED) return;
  try{
    const lastUrl = localStorage.getItem(DB_URL_MARKER_KEY);
    if(lastUrl === FIREBASE_DB_URL) return; // same database as last time — nothing stale to clear
    const keysToRemove = [];
    for(let i = 0; i < localStorage.length; i++){
      const k = localStorage.key(i);
      if(k && !LOCAL_ONLY_KEYS.has(k)) keysToRemove.push(k);
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    localStorage.setItem(DB_URL_MARKER_KEY, FIREBASE_DB_URL);
    if(keysToRemove.length){
      console.info(`Firebase database changed — cleared ${keysToRemove.length} stale local cache entr${keysToRemove.length===1?'y':'ies'} on this browser so it now reflects the new database.`);
    }
  }catch(e){ console.error('Could not purge stale local cache after database change', e); }
}
purgeStaleLocalCacheIfDbChanged();

/* ================= cache cleaner =================
   Automatic (safe, every load): removes browser Cache Storage + old service workers,
   which are the usual cause of stale/slow pages. Manual button also clears the local
   copies of shared data (login, theme and branch choice are kept). */
(async function autoClearBrowserCaches(){
  try{ if('serviceWorker' in navigator){ (await navigator.serviceWorker.getRegistrations()).forEach(r=>r.unregister()); } }catch(e){}
  try{ if(window.caches){ (await caches.keys()).forEach(k=>caches.delete(k)); } }catch(e){}
  try{ sessionStorage.clear(); }catch(e){}
})();
async function clearCacheNow(){
  if(!confirm('Clear cached data on this computer and reload?\n\nShared data stays safe in Firebase. You stay signed in.')) return;
  try{ __fbCache.clear(); }catch(e){}
  try{ if(window.caches){ (await caches.keys()).forEach(k=>caches.delete(k)); } }catch(e){}
  try{ if('serviceWorker' in navigator){ (await navigator.serviceWorker.getRegistrations()).forEach(r=>r.unregister()); } }catch(e){}
  try{
    const rm=[]; for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k && !LOCAL_ONLY_KEYS.has(k)) rm.push(k); }
    rm.forEach(k=>localStorage.removeItem(k));
  }catch(e){}
  location.reload();
}
document.addEventListener('DOMContentLoaded',()=>{ const b=document.getElementById('clearCacheBtn'); if(b) b.addEventListener('click',clearCacheNow); });

/* ================= IP status (single shared source of truth) =================
   There is no separate "Set Status" screen. Status is a field right on the
   IP record itself (editable inline in the IP Directory row). Whichever
   module changes it calls setIPStatus(), which saves it to shared storage
   and then refreshes every module that displays it — IP Directory, Search,
   Host Usage Dashboard and Firewall Dashboard — so it reflects everywhere,
   automatically, with nothing extra to click. */
const IP_STATUS_KEY = 'ip-status-map-v1';
const IP_STATUS_OPTIONS = ['Active','Inactive','Blocked','Free'];
const IP_STATUS_DEFAULT = 'Active';
let ipStatusMap = {}; // { "192.168.1.5": "Active", "192.168.21.10": "Blocked", ... }

async function loadIPStatusMap(){
  try{
    const r = await store.get(IP_STATUS_KEY, true);
    ipStatusMap = (r && r.value) ? JSON.parse(r.value) : {};
  }catch(e){ ipStatusMap = {}; }
}

function getIPStatus(ip){
  return ipStatusMap[String(ip||'').trim()] || IP_STATUS_DEFAULT;
}

function ipStatusColor(status){
  switch(status){
    case 'Active': return '#52E3B0';
    case 'Inactive': return '#8892A6';
    case 'Blocked': return '#FF5D5D';
    case 'Free': return '#4C8DFF';
    default: return '#8892A6';
  }
}

function ipStatusBadgeHtml(ip){
  const status = getIPStatus(ip);
  const color = ipStatusColor(status);
  return `<span class="ip-status-badge" style="display:inline-block;padding:2px 9px;border-radius:99px;font-size:10.5px;font-weight:600;white-space:nowrap;background:${color}22;color:${color};border:1px solid ${color}55;">${status}</span>`;
}

function ipStatusSelectHtml(ip){
  const status = getIPStatus(ip);
  const safeIp = String(ip||'').replace(/"/g,'&quot;');
  return `<select class="ip-status-select" data-status-ip="${safeIp}" title="Set status for ${safeIp}" style="background:var(--panel-alt);color:var(--text);border:1px solid var(--border);border-radius:7px;padding:4px 6px;font-size:11.5px;">${IP_STATUS_OPTIONS.map(s=>`<option value="${s}" ${s===status?'selected':''}>${s}</option>`).join('')}</select>`;
}

async function setIPStatus(ip, status){
  const key = String(ip||'').trim();
  if(!key || !IP_STATUS_OPTIONS.includes(status)) return;
  ipStatusMap[key] = status;
  try{ await store.set(IP_STATUS_KEY, JSON.stringify(ipStatusMap), true); }
  catch(e){ console.error('Could not save IP status', e); }
  // Reflect everywhere at once: IP Directory + Search + Host Usage Dashboard + Firewall Dashboard.
  try{ scheduleDataRefresh(); }catch(e){}
  try{ refreshAllDataViews(); }catch(e){}
  if(typeof showToast === 'function') showToast(`${key} marked ${status}`);
  if(typeof logChange === 'function') logChange('Updated IP status', `${key} -> ${status}`);
}

document.addEventListener('change', (e)=>{
  const sel = e.target && e.target.closest && e.target.closest('.ip-status-select');
  if(sel) setIPStatus(sel.dataset.statusIp, sel.value);
});

/* ================= fresh-start usage reset =================
   Start with NO usage/application usage records for all three branches.
   This runs once, then leaves all newly-added data untouched on refresh. */
const FRESH_START_RESET_KEY = 'noc-fresh-start-usage-reset-v1';
async function ensureFreshStartUsageData(){
  try{
    const marker = await store.get(FRESH_START_RESET_KEY, false);
    if(marker && marker.value === 'done') return;

    const branchIds = ['chennai','bangalore','hosur'];
    await Promise.all(branchIds.flatMap(id => [
      store.delete(`${USAGE_KEY}::${id}`, true),
      store.delete(`${APPUSAGE_KEY}::${id}`, true)
    ]));

    // Remove legacy unsuffixed records so old data cannot be migrated back.
    await Promise.all([
      store.delete(USAGE_KEY, true),
      store.delete(APPUSAGE_KEY, true)
    ]);

    await store.set(FRESH_START_RESET_KEY, 'done', false);
  }catch(e){
    console.warn('Fresh-start usage reset could not complete:', e);
  }
}

// Firebase is REST-based in this standalone HTML file, so check periodically
// for changes made from another device and refresh every module automatically.
let remoteSyncBusy = false;
setInterval(async ()=>{
  if(!FIREBASE_ENABLED || remoteSyncBusy || document.hidden || isLoadingState) return;
  remoteSyncBusy = true;
  try{
    const before = JSON.stringify({d:devices,u:usage,a:appUsage,f:fixedHosts});
    isLoadingState = true;
    await loadState();
    const after = JSON.stringify({d:devices,u:usage,a:appUsage,f:fixedHosts});
    if(before !== after) refreshAllDataViews();
  }catch(e){} finally { isLoadingState=false; remoteSyncBusy=false; }
}, 120000);

/* ================= users & auth ================= */
// Accounts are managed entirely by an Administrator from the Admin page —
// there is no self-registration. On a brand-new install, a single
// Administrator account is seeded below; change its password after signing in.
const NEW_ADMIN_USERNAME = 'administrator';
const NEW_ADMIN_PASSWORD = 'Admin@123';
const NEW_ADMIN_LABEL = 'Administrator';
const ACCOUNTS_KEY = 'accounts-v2';
const ACCOUNTS_MIGRATION_KEY = 'accounts-migrated-single-admin-v1';
let accounts = {}; // { username: { password, role, label, lastLogin } }
let currentUser = null; // {username, role, label, branch}; branch users are strictly scoped

async function loadAccounts(){
  try{
    const r = await store.get(ACCOUNTS_KEY, true);
    accounts = r ? JSON.parse(r.value) : null;
  }catch(e){ accounts = null; }
  if(!accounts || !Object.keys(accounts).length){
    accounts = {
      [NEW_ADMIN_USERNAME]: { password: NEW_ADMIN_PASSWORD, role: 'administrator', label: NEW_ADMIN_LABEL, lastLogin: null }
    };
    await saveAccounts();
  }
  await migrateToSingleAdmin();
}

// One-time cleanup for accounts created under the old 4-administrator setup:
// Karthik is removed, Maduraj/Muniiyappan/Sakthi become regular Users, and
// the new "administrator" account is guaranteed to exist with full access.
async function migrateToSingleAdmin(){
  try{
    const marker = await store.get(ACCOUNTS_MIGRATION_KEY, true);
    if(marker && marker.value === 'true') return;
  }catch(e){}
  let changed = false;
  if(accounts['karthik']){ delete accounts['karthik']; changed = true; }
  ['muniiyappan', 'sakthi', 'maduraj'].forEach(key=>{
    if(accounts[key] && accounts[key].role !== 'user'){ accounts[key].role = 'user'; changed = true; }
  });
  if(!accounts[NEW_ADMIN_USERNAME]){
    accounts[NEW_ADMIN_USERNAME] = { password: NEW_ADMIN_PASSWORD, role: 'administrator', label: NEW_ADMIN_LABEL, lastLogin: null };
    changed = true;
  } else if(accounts[NEW_ADMIN_USERNAME].role !== 'administrator'){
    accounts[NEW_ADMIN_USERNAME].role = 'administrator';
    changed = true;
  }
  if(changed) await saveAccounts();
  try{ await store.set(ACCOUNTS_MIGRATION_KEY, 'true', true); }catch(e){}
}
async function saveAccounts(){
  try{ await store.set(ACCOUNTS_KEY, JSON.stringify(accounts), true); }
  catch(e){ console.error('Could not save accounts', e); showToast('Could not save — try again'); }
}
function adminCount(){
  return Object.values(accounts).filter(a => a.role === 'administrator').length;
}

/* ================= state ================= */
let devices = [];       // {name, mac, ip, username}
let usage = [];         // {date, ip, bytesDisplay, bytesGB, percent}
let appUsage = [];      // {date, ip, app, gb}
let fixedHosts = 1500;  // admin-editable, per branch — used for Host Coverage %
let history = [];       // {time, user, role, action, detail}
let sideChart = null, searchChart = null;
let perUserUsageChart = null;
let editingRowKey = null; // which day-by-day row is currently in inline edit mode
let selectedRowKeys = new Set(); // checked rows in the day-by-day table, keyed "date|ip"
let selectedDates = new Set();   // checked days in the daily totals table
let dashboardLastDate = null;    // tracks which date the day-by-day table is showing, to reset selection on change

// ================= GLOBAL DATA SYNC =================
// Every module reads the same devices / usage / appUsage state. Whenever one
// module saves a change, the visible dashboards are refreshed from this state.
let isLoadingState = false;
let syncRefreshTimer = null;
const DATA_SYNC_CHANNEL = 'noc-usage-data-sync-v1';
let dataSyncChannel = null;
try { dataSyncChannel = new BroadcastChannel(DATA_SYNC_CHANNEL); } catch(e) {}

function currentViewId(){
  return document.querySelector('.view.active')?.id?.replace('view-','') || '';
}

function refreshAllDataViews(){
  // Refresh only the currently visible module plus lightweight global counters.
  // Repainting every table/chart on each Firebase sync was a major source of lag.
  try{ renderSidebar(); }catch(e){}
  const v=currentViewId();
  try{
    if(v==='dashboard') renderDashboard();
    else if(v==='devices') renderDevices();
    else if(v==='hostdash') renderHostDashboard();
    else if(v==='ipdirectory') renderIPDirectory();
    else if(v==='firewall') renderFirewallDashboard();
    else if(v==='dailymanager') dmReload();
  }catch(e){}
  try{ populateIpDatalist(); }catch(e){}
  try{ populateHostDashSelects(); }catch(e){}
}

function scheduleDataRefresh(){
  if(isLoadingState) return;
  clearTimeout(syncRefreshTimer);
  syncRefreshTimer = setTimeout(refreshAllDataViews, 40);
  try { dataSyncChannel?.postMessage({type:'data-changed', branch:currentBranch, at:Date.now()}); } catch(e) {}
  try { localStorage.setItem('__noc_data_sync_ping__', JSON.stringify({branch:currentBranch,at:Date.now()})); } catch(e) {}
}

// Same-browser-tab and multi-tab live refresh.
if(dataSyncChannel){
  dataSyncChannel.onmessage = async (event)=>{
    if(event.data?.type !== 'data-changed' || isLoadingState) return;
    if(event.data.branch !== currentBranch && currentBranch !== 'all') return;
    try{ isLoadingState=true; await loadState(); refreshAllDataViews(); }finally{ isLoadingState=false; }
  };
}
window.addEventListener('storage', async (event)=>{
  if(event.key !== '__noc_data_sync_ping__' || isLoadingState) return;
  try{
    const msg=JSON.parse(event.newValue||'{}');
    if(msg.branch !== currentBranch && currentBranch !== 'all') return;
    isLoadingState=true; await loadState(); refreshAllDataViews();
  }catch(e){} finally{ isLoadingState=false; }
});

/* ================= storage helpers ================= */

/* ================= Chennai imported usage data =================
   Imported from the supplied day-wise Host / Bytes / Percent report.
   It is stored only under Chennai. "All Branches" automatically merges
   Chennai + Bangalore + Hosur, so this data appears there too.
*/
const CHENNAI_IMPORTED_USAGE_KEY = 'noc-chennai-import-pasted-text-9-v1';
/* CHENNAI_IMPORTED_USAGE lives in js/data/chennai-imported-usage.js */

/* ================= Hosur imported usage data =================
   Imported from the supplied day-wise Host / Bytes / Percent report.
   Corrected import: 2,840 source rows after removing one exact duplicate 20-Feb-2026 block.\n   Calculated Hosur source total: 49.98 TB (51,180.06 GB using 1024 GB = 1 TB).\n   It is stored only under Hosur. "All Branches" automatically merges
   Chennai + Bangalore + Hosur, so this data appears there too.
*/
const HOSUR_IMPORTED_USAGE_KEY = 'noc-hosur-import-pasted-text-20260907-v2';
/* HOSUR_IMPORTED_USAGE lives in js/data/hosur-imported-usage.js */
const HOSUR_IMPORTED_USAGE_TOTAL_GB = HOSUR_IMPORTED_USAGE.reduce((sum,r)=>sum + Number(r.bytesGB||0),0);
const HOSUR_IMPORTED_USAGE_TOTAL_TB = HOSUR_IMPORTED_USAGE_TOTAL_GB / 1024;

async function ensureHosurImportedUsageData(){
  try{
    const done = await store.get(HOSUR_IMPORTED_USAGE_KEY, false);
    if(done && done.value === 'done') return;

    const key = `${USAGE_KEY}::hosur`;
    const existingRaw = await store.get(key, true).catch(()=>null);
    let existing = [];
    try{ existing = existingRaw && existingRaw.value ? JSON.parse(existingRaw.value) : []; }catch(e){ existing=[]; }
    if(!Array.isArray(existing)) existing=[];

    // Corrected v2 Hosur import:
    // - fixes malformed source dates so day-wise reports remain chronological
    // - restores every supplied source block
    // - removes the one exact duplicate 20-Feb-2026 block
    // - replaces previous v1/v2 imported rows without touching manual rows
    const keptExisting = existing.filter(r=>{
      if(!r) return false;
      const source = String(r.source||'').trim().toLowerCase();
      const id = String(r.importId||'');
      return source !== 'hosur import' && !id.startsWith('hosur-20260907-');
    });

    const imported = HOSUR_IMPORTED_USAGE.map((r,i)=>({
      ...r,
      branch:'hosur',
      importId:`hosur-20260907-v2-${i}`
    }));

    const result = keptExisting.concat(imported).sort((a,b)=>
      String(a.date||'').localeCompare(String(b.date||'')) ||
      String(a.ip||'').localeCompare(String(b.ip||'')) ||
      String(a.importId||'').localeCompare(String(b.importId||''))
    );

    await store.set(key, JSON.stringify(result), true);
    await store.set(HOSUR_IMPORTED_USAGE_KEY, 'done', false);
  }catch(e){
    console.warn('Corrected Hosur imported usage data could not be loaded:', e);
  }
}

/* ================= Bangalore imported usage data =================
   Imported from the supplied day-wise Host / Bytes / Percent report.
   It is stored only under Bangalore. "All Branches" automatically merges
   Chennai + Bangalore + Hosur, so this data appears there too.
*/
const BANGALORE_IMPORTED_USAGE_KEY = 'noc-bangalore-import-pasted-text-20260916-v1';
/* BANGALORE_IMPORTED_USAGE lives in js/data/bangalore-imported-usage.js */

async function ensureBangaloreImportedUsageData(){
  try{
    const done = await store.get(BANGALORE_IMPORTED_USAGE_KEY, false);
    if(done && done.value === 'done') return;

    const key = `${USAGE_KEY}::bangalore`;
    const existingRaw = await store.get(key, true).catch(()=>null);
    let existing = [];
    try{ existing = existingRaw && existingRaw.value ? JSON.parse(existingRaw.value) : []; }catch(e){ existing=[]; }
    if(!Array.isArray(existing)) existing=[];

    // Merge by date + IP. Imported values are authoritative for matching
    // date/IP rows, while unrelated existing Bangalore records stay.
    const merged = new Map();
    existing.forEach(r=>{
      if(!r || !r.ip) return;
      const k = `${String(r.date||'')}::${String(r.ip||'').trim()}`;
      merged.set(k, r);
    });
    BANGALORE_IMPORTED_USAGE.forEach(r=>{
      const k = `${r.date}::${r.ip}`;
      merged.set(k, {...r, branch:'bangalore'});
    });

    const result = Array.from(merged.values()).sort((a,b)=>
      String(a.date||'').localeCompare(String(b.date||'')) ||
      String(a.ip||'').localeCompare(String(b.ip||''))
    );

    await store.set(key, JSON.stringify(result), true);
    await store.set(BANGALORE_IMPORTED_USAGE_KEY, 'done', false);
  }catch(e){
    console.warn('Bangalore imported usage data could not be loaded:', e);
  }
}

async function ensureChennaiImportedUsageData(){
  try{
    const done = await store.get(CHENNAI_IMPORTED_USAGE_KEY, false);
    if(done && done.value === 'done') return;

    const key = `${USAGE_KEY}::chennai`;
    const existingRaw = await store.get(key, true).catch(()=>null);
    let existing = [];
    try{ existing = existingRaw && existingRaw.value ? JSON.parse(existingRaw.value) : []; }catch(e){ existing=[]; }
    if(!Array.isArray(existing)) existing=[];

    // Merge by date + IP. Imported values become the authoritative value
    // for matching date/IP rows, while unrelated existing Chennai records stay.
    const merged = new Map();
    existing.forEach(r=>{
      if(!r || !r.ip) return;
      const k = `${String(r.date||'')}::${String(r.ip||'').trim()}`;
      merged.set(k, r);
    });
    CHENNAI_IMPORTED_USAGE.forEach(r=>{
      const k = `${r.date}::${r.ip}`;
      merged.set(k, {...r, branch:'chennai'});
    });

    const result = Array.from(merged.values()).sort((a,b)=>
      String(a.date||'').localeCompare(String(b.date||'')) ||
      String(a.ip||'').localeCompare(String(b.ip||''))
    );

    await store.set(key, JSON.stringify(result), true);
    await store.set(CHENNAI_IMPORTED_USAGE_KEY, 'done', false);
  }catch(e){
    console.warn('Chennai imported usage data could not be loaded:', e);
  }
}

async function loadState(){
  await loadIPStatusMap();
  // Read the branch data directly from Firebase. No seeded/imported usage is merged here.

  // "All Branches" is a read-only merged view. It reads the existing
  // Chennai, Bangalore and Hosur records and combines them for display.
  if(currentBranch === 'all'){
    const branchIds = ['chennai','bangalore','hosur'];

    const branchStates = await Promise.all(branchIds.map(async (branchId)=>{
      const [d,u,au,fh,h] = await Promise.all([
        store.get(`${DEVICE_KEY}::${branchId}`, true).catch(()=>null),
        store.get(`${USAGE_KEY}::${branchId}`, true).catch(()=>null),
        appUsageFirebaseRead(branchId).catch(e=>{ console.warn('Application Usage Firebase read failed:',branchId,e); markSyncFallback('app:'+branchId); return []; }),
        store.get(`${FIXEDHOSTS_KEY}::${branchId}`, true).catch(()=>null),
        store.get(`${HISTORY_KEY}::${branchId}`, true).catch(()=>null)
      ]);

      let branchDevices = [];
      let branchUsage = [];
      let branchAppUsage = [];
      let branchHistory = [];
      let branchFixedHosts = 0;

      try{ branchDevices = d?.value ? JSON.parse(d.value) : []; }catch(e){}
      try{ branchUsage = u?.value ? JSON.parse(u.value) : []; }catch(e){}
      branchAppUsage = Array.isArray(au) ? au : [];
      try{ branchHistory = h?.value ? JSON.parse(h.value) : []; }catch(e){}
      branchFixedHosts = fh?.value ? (parseInt(fh.value,10) || 0) : 0;

      return {
        branchId,
        devices: Array.isArray(branchDevices) ? branchDevices : [],
        usage: Array.isArray(branchUsage) ? branchUsage : [],
        appUsage: Array.isArray(branchAppUsage) ? branchAppUsage : [],
        fixedHosts: branchFixedHosts,
        history: Array.isArray(branchHistory) ? branchHistory : []
      };
    }));

    // Merge devices by IP so the same device is not displayed three times.
    const deviceMap = new Map();
    branchStates.forEach(s=>{
      s.devices.forEach(d=>{
        const ip = d?.ip || `${s.branchId}-${d?.name || Math.random()}`;
        // Keep the branch as part of the identity. The same IP can exist
        // independently in Chennai, Hosur and Bangalore.
        const key = `${s.branchId}::${ip}`;
        deviceMap.set(key, {...d, branch:s.branchId});
      });
    });

    devices = Array.from(deviceMap.values());
    usage = branchStates.flatMap(s=>s.usage.map(r=>({...r, branch:s.branchId})));
    appUsage = branchStates.flatMap(s=>s.appUsage.map(r=>({...r, branch:s.branchId})));
    fixedHosts = branchStates.reduce((sum,s)=>sum + s.fixedHosts, 0);
    history = branchStates
      .flatMap(s=>s.history.map(r=>({...r, branch:s.branchId})));

    // Merge the global Activity Log so admin can see actions from every user,
    // regardless of Chennai/Hosur/Bangalore branch.
    try{
      const gh = await store.get(HISTORY_KEY, true);
      const globalHistory = gh && gh.value ? JSON.parse(gh.value) : [];
      history = [...globalHistory, ...history]
        .filter((()=>{const seen=new Set();return v=>{const k=JSON.stringify([v.time,v.user,v.action,v.detail]);if(seen.has(k))return false;seen.add(k);return true;};})())
        .sort((a,b)=>new Date(b.time||0)-new Date(a.time||0));
    }catch(e){ history = history.sort((a,b)=>new Date(b.time||0)-new Date(a.time||0)); }

    if(window.refreshAppDrilldown) window.refreshAppDrilldown();
    return;
  }

  // Normal single-branch loading remains unchanged.
  const [d, u, au, fh, h] = await Promise.all([
    store.get(branchKey(DEVICE_KEY), true).catch(()=>null),
    store.get(branchKey(USAGE_KEY), true).catch(()=>null),
    appUsageFirebaseRead(currentBranch).catch(e=>{ console.warn('Application Usage Firebase read failed:',currentBranch,e); markSyncFallback('app:'+currentBranch); return []; }),
    store.get(branchKey(FIXEDHOSTS_KEY), true).catch(()=>null),
    store.get(branchKey(HISTORY_KEY), true).catch(()=>null)
  ]);

  // Exact Firebase reflection: use only the values stored for this branch.
  // Do not seed, import, scale, or write fallback data during a read.
  try{ devices = d && d.value ? JSON.parse(d.value) : []; }catch(e){ devices=[]; }
  try{ usage = u && u.value ? JSON.parse(u.value) : []; }catch(e){ usage=[]; }
  appUsage = Array.isArray(au) ? au : [];
  fixedHosts = fh && fh.value ? (parseInt(fh.value,10) || 0) : 0;
  try{ history = h && h.value ? JSON.parse(h.value) : []; }catch(e){ history=[]; }
  if(!Array.isArray(devices)) devices=[];
  if(!Array.isArray(usage)) usage=[];
  if(!Array.isArray(appUsage)) appUsage=[];
  if(!Array.isArray(history)) history=[];

  // Merge global activity entries so all user logins/actions remain visible.
  try{
    const gh = await store.get(HISTORY_KEY, true);
    const globalHistory = gh && gh.value ? JSON.parse(gh.value) : [];
    history = [...globalHistory, ...history]
      .filter((()=>{const seen=new Set();return v=>{const k=JSON.stringify([v.time,v.user,v.action,v.detail]);if(seen.has(k))return false;seen.add(k);return true;};})())
      .sort((a,b)=>new Date(b.time||0)-new Date(a.time||0));
  }catch(e){}
  // Populate the application drill-down once after data loading completes.
  // Do not poll continuously; continuous redraws cause visible flicker.
  if(window.refreshAppDrilldown) window.refreshAppDrilldown();
}

async function saveDevices(){
  if(currentBranch === 'all') return;
  try{ await store.set(branchKey(DEVICE_KEY), JSON.stringify(devices), true); await syncIPDirectoryFromDevices(false); scheduleDataRefresh(); }
  catch(e){ console.error('Could not save devices', e); showToast('Could not save — try again'); }
}
async function saveUsage(){
  if(currentBranch === 'all') return;
  try{ await store.set(branchKey(USAGE_KEY), JSON.stringify(usage), true); scheduleDataRefresh(); }
  catch(e){ console.error('Could not save usage', e); showToast('Could not save — try again'); }
}
async function saveAppUsage(){
  if(currentBranch === 'all') return;
  try{
    const verified = await appUsageFirebaseWrite(currentBranch, appUsage);
    appUsage = Array.isArray(verified) ? verified : appUsage;
    scheduleDataRefresh();
  }catch(e){
    console.error('Could not save app usage to Firebase', e);
    showToast(`Firebase save failed: ${e.message||'unknown error'}`);
    throw e;
  }
}
async function saveFixedHosts(){
  if(currentBranch === 'all') return;
  try{ await store.set(branchKey(FIXEDHOSTS_KEY), String(fixedHosts), true); scheduleDataRefresh(); }
  catch(e){ console.error('Could not save fixed host count', e); showToast('Could not save — try again'); }
}
async function saveHistory(){
  // Activity Log is global: every user's login/action is visible to the admin,
  // while normal users can continue using their own branch data as before.
  const logBranch = currentBranch === 'all' ? (currentUser?.branch || 'all') : currentBranch;
  const entry = history[0] || null;
  if(!entry) return;
  try{
    const r = await store.get(HISTORY_KEY, true).catch(()=>null);
    const globalHistory = r && r.value ? JSON.parse(r.value) : [];
    const item = {...entry, branch: entry.branch || logBranch};
    const merged = [item, ...globalHistory.filter(x=>!(
      x.time===item.time && x.user===item.user && x.action===item.action && x.detail===item.detail
    ))].slice(0,1000);
    await store.set(HISTORY_KEY, JSON.stringify(merged), true);
  }catch(e){ console.error('Could not save global activity history', e); }
}
async function logChange(action, detail){
  history.unshift({
    time: new Date().toLocaleString(),
    user: currentUser ? currentUser.label : 'Unknown',
    role: currentUser ? currentUser.role : '—',
    branch: currentBranch === 'all' ? (currentUser?.branch || 'all') : currentBranch,
    action, detail
  });
  if(history.length > 1000) history = history.slice(0, 1000);
  await saveHistory();
}
async function logChangeAs(user, role, action, detail){
  history.unshift({
    time: new Date().toLocaleString(),
    user, role,
    branch: currentBranch === 'all' ? (currentUser?.branch || 'all') : currentBranch,
    action, detail
  });
  if(history.length > 1000) history = history.slice(0, 1000);
  await saveHistory();
}

/* ================= utils ================= */
function toGB(str){
  if(!str) return 0;
  const m = String(str).trim().match(/([\d.]+)\s*(GB|MB|KB|TB)?/i);
  if(!m) return 0;
  let val = parseFloat(m[1]);
  const unit = (m[2]||'GB').toUpperCase();
  if(unit==='TB') val *= 1024;
  if(unit==='MB') val /= 1024;
  if(unit==='KB') val /= (1024*1024);
  return Math.round(val*100)/100;
}
// Usage formatter used across every module (Dashboard, Reports, Search, Devices,
// Host Usage Dashboard, Branch Overview, IP Directory, Firewall, exports…).
// Anything 1000 GB and above is shown in TB automatically.
function fmtGB(n){
  n = Number(n) || 0;
  // 1000 GB and above is displayed in TB (1024 GB = 1 TB).
  if(n >= 1000) return (n/1024).toFixed(2)+' TB';
  if(n >= 1) return n.toFixed(2)+' GB';
  return (n*1024).toFixed(0)+' MB';
}
// Kept as an alias — same GB/TB auto-switching behaviour, used by the
// Network Overview card.
function fmtGBorTB(n){
  return fmtGB(n);
}
function normalizeBranchId(v){
  const x=String(v||'').trim().toLowerCase();
  if(x==='bengaluru') return 'bangalore';
  return x;
}

// Single source of truth for IP -> person/device mapping.
// Always match branch + IP first so the same IP cannot accidentally show
// another branch's user. If no directory mapping exists, return null and
// let the UI explicitly show "Not mapped" instead of guessing.
var __devIdx=null;
function __devIndex(){
  const now=Date.now();
  if(__devIdx && __devIdx.ref===devices && __devIdx.len===devices.length && __devIdx.branch===currentBranch && now-__devIdx.t<1500) return __devIdx;
  const exact=new Map(), any=new Map();
  for(const d of devices){
    const ip=String(d?.ip||'').trim().toLowerCase();
    const br=normalizeBranchId(d?.branch||currentBranch);
    const k=br+'|'+ip;
    if(!exact.has(k)) exact.set(k,d);
    if(!any.has(ip)) any.set(ip,d);
  }
  __devIdx={ref:devices,len:devices.length,branch:currentBranch,t:now,exact,any};
  return __devIdx;
}
function deviceFor(ip, branch){
  const targetIp=String(ip||'').trim().toLowerCase();
  const targetBranch=normalizeBranchId(branch);
  if(!targetIp || targetIp==='others') return null;
  const idx=__devIndex();
  if(targetBranch){ const e=idx.exact.get(targetBranch+'|'+targetIp); if(e) return e; }
  if(targetBranch==='all' || !targetBranch) return idx.any.get(targetIp) || null;
  return null;
}


/* ---------- Application → IP → Host drill-down ---------- */
function appDrillBranchMatch(branch){
  if(!branch || currentBranch==='all') return true;
  return normalizeBranchId(branch)===normalizeBranchId(currentBranch);
}
function appDrillHostLabel(ip, branch, row){
  const direct = row?.username || row?.user || row?.userName;
  if(direct) return direct;
  const d = deviceFor(ip, branch);
  if(!d) return 'Not mapped';
  return d.username || d.user || d.name || d.hostname || d.device || 'Unknown Host';
}
function refreshAppDrilldown(){
  const sel=document.getElementById('appDrillSelect');
  const body=document.getElementById('appDrillBody');
  const totalEl=document.getElementById('appDrillTotal');
  if(!sel || !body || !totalEl) return;

  const rows=(Array.isArray(appUsage)?appUsage:[]).filter(r=>appDrillBranchMatch(r.branch || currentBranch));
  const dFrom=(document.getElementById('appDrillFrom')||{}).value||'';
  const dTo=(document.getElementById('appDrillTo')||{}).value||'';
  const viewMode=(document.getElementById('appDrillView')||{}).value||'date';
  const inRange=r=>{ const d=String(r.date||''); return (!dFrom||d>=dFrom)&&(!dTo||d<=dTo); };
  const totals={};
  rows.filter(inRange).forEach(r=>{
    const app=String(r.app||'').trim();
    if(app) totals[app]=(totals[app]||0)+Number(r.gb||0);
  });

  const apps=Object.keys(totals).sort((a,b)=>totals[b]-totals[a]);
  const previous=sel.value;
  sel.innerHTML='<option value="">Select application…</option>'+
    apps.map(a=>'<option value="'+a.replace(/"/g,'&quot;')+'">'+a+'</option>').join('');
  if(apps.includes(previous)) sel.value=previous;

  const selected=sel.value;
  if(!selected){
    totalEl.textContent='0 GB';
    body.innerHTML='<tr><td colspan="7" class="hint">Select an application to view IP/host usage.</td></tr>';
    return;
  }

  const esc=v=>String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const byDay=viewMode==='date';
  const selRows=rows.filter(r=>String(r.app||'').trim()===selected && inRange(r));
  const detail={}, dayTotals={};
  selRows.forEach(r=>{
    const branch=r.branch || currentBranch || '—';
    const ip=String(r.ip||'—');
    const date=byDay ? String(r.date||'—') : '';
    const key=date+'::'+branch+'::'+ip+'::'+String(r.username||r.user||r.userName||'');
    detail[key]=detail[key] || { date,branch,ip, user:r.username||r.user||r.userName||'', gb:0 };
    detail[key].gb += Number(r.gb||0);
    const dk=String(r.date||'—');
    dayTotals[dk]=(dayTotals[dk]||0)+Number(r.gb||0);
  });

  const entries=Object.values(detail).sort((a,b)=> byDay ? (b.date.localeCompare(a.date) || b.gb-a.gb) : (b.gb-a.gb));
  const grand=entries.reduce((sum,e)=>sum+e.gb,0);
  totalEl.textContent=fmtGB(grand);

  const rangeLabel=(dFrom||dTo) ? ((dFrom||'start')+' → '+(dTo||'latest')) : 'All dates';
  const CAP=800;
  body.innerHTML=entries.length ? entries.slice(0,CAP).map(e=>{
    const base=byDay ? (dayTotals[e.date]||0) : grand;
    const share=base ? ((e.gb/base)*100).toFixed(1)+'%' : '0%';
    const host=appDrillHostLabel(e.ip,e.branch,e);
    return '<tr>'+
      '<td class="mono" style="white-space:nowrap;">'+esc(byDay?e.date:rangeLabel)+'</td>'+
      '<td>'+esc(e.branch)+'</td>'+
      '<td>'+esc(e.ip)+'</td>'+
      '<td>'+esc(host)+'</td>'+
      '<td>'+esc(selected)+'</td>'+
      '<td>'+fmtGB(e.gb)+'</td>'+
      '<td>'+share+(byDay?' <span class="muted" style="font-size:11px;">of that day</span>':'')+'</td>'+
      '</tr>';
  }).join('') + (entries.length>CAP ? '<tr><td colspan="7" class="hint">Showing first '+CAP+' of '+entries.length+' rows — narrow the date range to see the rest.</td></tr>' : '')
  : '<tr><td colspan="7" class="hint">No usage records found for this application in the selected dates.</td></tr>';
}
function initAppDrilldown(){
  const sel=document.getElementById('appDrillSelect');
  if(!sel || sel.dataset.bound) return;
  sel.dataset.bound='1';
  sel.addEventListener('change', refreshAppDrilldown);
  ['appDrillView','appDrillFrom','appDrillTo'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.addEventListener('change', refreshAppDrilldown);
  });
  const clr=document.getElementById('appDrillClearDates');
  if(clr) clr.addEventListener('click', ()=>{
    document.getElementById('appDrillFrom').value='';
    document.getElementById('appDrillTo').value='';
    refreshAppDrilldown();
  });
  refreshAppDrilldown();
}
setTimeout(initAppDrilldown, 0);
window.refreshAppDrilldown=refreshAppDrilldown;

/* ---------- Application Usage Breakdown — circle (doughnut) chart ---------- */
let hdAppPieChartInstance = null;
const APP_PIE_COLORS = ['#4C8DFF','#F5A623','#52E3B0','#E85D75','#9B6DFF','#2FCFE0','#FFB020','#6FCF97','#BB6BD9','#56CCF2','#F2994A','#EB5757'];
function renderHdAppPieChart(appEntries, appGrandTotal){
  const cv = document.getElementById('hdAppPieChart');
  if(!cv || typeof Chart === 'undefined') return;
  const top = appEntries.slice(0, 9);
  const restTotal = appEntries.slice(9).reduce((s,[,v])=>s+v, 0);
  const labels = top.map(([key])=>{
    const parts = currentBranch === 'all' ? key.split('::') : [currentBranch, key];
    return parts.slice(1).join('::');
  });
  const values = top.map(([,v])=>v);
  if(restTotal > 0){ labels.push('Other apps'); values.push(restTotal); }

  if(hdAppPieChartInstance){ hdAppPieChartInstance.destroy(); hdAppPieChartInstance = null; }
  if(!values.length) return;

  const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
  const text = getComputedStyle(document.documentElement).getPropertyValue('--text') || (isDark ? '#e6ecf5' : '#1a2233');

  hdAppPieChartInstance = new Chart(cv, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: labels.map((_,i)=>APP_PIE_COLORS[i % APP_PIE_COLORS.length]),
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 800, easing: 'easeOutQuart' },
      cutout: '62%',
      plugins: {
        legend: {
          position: 'right',
          labels: { color: text, boxWidth: 12, padding: 10, font: { size: 11 } }
        },
        tooltip: {
          callbacks: {
            label: (ctx)=>{
              const v = Number(ctx.raw) || 0;
              const pct = appGrandTotal ? (v/appGrandTotal*100) : 0;
              return ` ${ctx.label}: ${fmtGB(v)} (${pct.toFixed(1)}%)`;
            }
          }
        }
      }
    }
  });
}

function dailyEscapeHtml(s){
  return String(s ?? '').replace(/[&<>"']/g, m => ({
    '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'
  }[m]));
}

function setStatValue(el, text){
  if(!el) return;
  const changed = el.textContent !== String(text);
  el.textContent = text;
  if(changed){
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }
}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(()=>t.classList.remove('show'), 2600);
}
function todayISO(){
  const d = new Date();
  return d.toISOString().slice(0,10);
}
function uniqueDates(){
  return [...new Set(usage.map(u=>u.date))].sort().reverse();
}
function todayOrLatestDate(){
  const t = todayISO();
  if(usage.some(u=>u.date===t)) return t;
  return uniqueDates()[0];
}

/* ================= excel export ================= */
function buildWorkbookFromRows(rows){
  const sheetData = rows.map(r => {
    const dev = deviceFor(r.ip);
    return {
      Date: r.date,
      Branch: r.Branch || branchLabel(currentBranch),
      Host: r.ip === 'others' ? 'Others / unlisted' : (dev?.name || '— unknown —'),
      'IP Address': r.ip === 'others' ? '—' : r.ip,
      'MAC Address': r.ip === 'others' ? '—' : (dev?.mac || '—'),
      Username: r.ip === 'others' ? '—' : (dev?.username || '—'),
      Usage: r.bytesDisplay || fmtGB(r.bytesGB),
      'Usage (GB)': Number(r.bytesGB || 0),
      'Percent Share': r.percent != null ? r.percent : ''
    };
  });

  const byDate = {};
  rows.forEach(r => { byDate[r.date] = (byDate[r.date] || 0) + Number(r.bytesGB || 0); });
  const summaryData = Object.keys(byDate).sort().map(d => ({
    Date: d,
    'Total Usage (GB)': Math.round(byDate[d]*100)/100,
    'Hosts Logged': rows.filter(r => r.date === d).length
  }));

  const byIp = {};
  rows.forEach(r => {
    if(!byIp[r.ip]) byIp[r.ip] = { total: 0, days: new Set() };
    byIp[r.ip].total += Number(r.bytesGB || 0);
    byIp[r.ip].days.add(r.date);
  });
  const userSummaryData = Object.entries(byIp)
    .sort((a,b) => b[1].total - a[1].total)
    .map(([ip, v]) => {
      const dev = deviceFor(ip);
      return {
        Host: ip === 'others' ? 'Others / unlisted' : (dev?.name || '— unknown —'),
        'IP Address': ip === 'others' ? '—' : ip,
        'MAC Address': ip === 'others' ? '—' : (dev?.mac || '—'),
        Username: ip === 'others' ? '—' : (dev?.username || '—'),
        'Total Usage': fmtGB(v.total),
        'Total Usage (GB)': Math.round(v.total*100)/100,
        'Days Used': v.days.size
      };
    });

  const chartData = userSummaryData.slice(0,10).map((r, i) => ({
    Rank: i+1,
    Host: r.Host,
    Username: r.Username,
    'Usage (GB)': r['Total Usage (GB)'],
    Bar: '█'.repeat(Math.max(1, Math.min(40, Math.round(r['Total Usage (GB)'] / Math.max(userSummaryData[0]?.['Total Usage (GB)'] || 1, 1) * 40))))
  }));

  const wb = XLSX.utils.book_new();
  const wsUsers = XLSX.utils.json_to_sheet(userSummaryData);
  const wsDetail = XLSX.utils.json_to_sheet(sheetData);
  const wsSummary = XLSX.utils.json_to_sheet(summaryData);
  const wsChart = XLSX.utils.json_to_sheet(chartData);
  wsUsers['!cols'] = [{wch:24},{wch:17},{wch:22},{wch:22},{wch:16},{wch:16},{wch:11}];
  wsDetail['!cols'] = [{wch:12},{wch:14},{wch:25},{wch:17},{wch:22},{wch:22},{wch:15},{wch:14},{wch:16}];
  wsSummary['!cols'] = [{wch:12},{wch:18},{wch:13}];
  wsChart['!cols'] = [{wch:8},{wch:28},{wch:22},{wch:16},{wch:45}];
  XLSX.utils.book_append_sheet(wb, wsUsers, 'Host-Usage-Summary');
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Daily Totals');
  XLSX.utils.book_append_sheet(wb, wsDetail, 'Daily Detail');
  XLSX.utils.book_append_sheet(wb, wsChart, 'Usage Chart');
  return wb;
}
async function downloadMonthlyExcel(){
  const btn = document.getElementById('downloadMonthlyExcelBtn');
  const sub = document.getElementById('reportSub');
  if(!btn || !sub) return;
  const monthInput = document.getElementById('reportMonth')?.value || '';
  if(!monthInput){
    sub.textContent = 'Pick a month first.';
    sub.style.color = 'var(--danger)';
    return;
  }
  btn.disabled = true;
  const oldText = btn.innerHTML;
  btn.innerHTML = '<span class="excel-btn-icon" aria-hidden="true">⇩</span> Preparing…';
  sub.textContent = 'Preparing monthly Excel with host, MAC, username and chart…';
  sub.style.color = 'var(--muted)';
  try{
    const allRows = [];
    const branchRows = {};
    const branchDevices = {};
    for(const branch of BRANCHES){
      let rows = [], devs = [];
      try{
        const r = await store.get(branchKeyFor(branch.id, USAGE_KEY), true);
        rows = r && r.value ? JSON.parse(r.value) : [];
      }catch(e){ rows = []; }
      try{
        const d = await store.get(branchKeyFor(branch.id, DEVICE_KEY), true);
        devs = d && d.value ? JSON.parse(d.value) : [];
      }catch(e){ devs = []; }
      if(!rows.length && currentBranch === branch.id && Array.isArray(usage)) rows = usage.slice();
      if(!devs.length && currentBranch === branch.id && Array.isArray(devices)) devs = devices.slice();
      branchDevices[branch.id] = Array.isArray(devs) ? devs : [];
      rows = (Array.isArray(rows) ? rows : []).filter(u=>u.date && u.date.startsWith(monthInput)).map(u=>({...u, Branch:branchLabel(branch.id)}));
      branchRows[branch.id] = rows;
      allRows.push(...rows);
    }
    if(!allRows.length){
      sub.textContent = 'No data logged for that month in any branch yet.';
      sub.style.color = 'var(--danger)';
      showToast('No monthly data available');
      return;
    }

    const detailRows = allRows.map(r=>{
      const dev = (branchDevices[BRANCHES.find(b=>branchLabel(b.id)===r.Branch)?.id] || []).find(d=>d.ip===r.ip);
      return {
        ...r,
        Host: r.ip === 'others' ? 'Others / unlisted' : (dev?.name || '— unknown —'),
        MAC: r.ip === 'others' ? '—' : (dev?.mac || '—'),
        Username: r.ip === 'others' ? '—' : (dev?.username || '—')
      };
    });

    const byHost = {};
    detailRows.forEach(r=>{
      const key = `${r.Branch}||${r.ip}`;
      if(!byHost[key]) byHost[key] = {Branch:r.Branch, Host:r.Host, IP:r.ip==='others'?'—':r.ip, MAC:r.MAC, Username:r.Username, total:0, days:new Set()};
      byHost[key].total += Number(r.bytesGB || 0);
      byHost[key].days.add(r.date);
    });
    const summary = Object.values(byHost).sort((a,b)=>b.total-a.total).map(x=>({
      Branch:x.Branch, Host:x.Host, 'IP Address':x.IP, 'MAC Address':x.MAC, Username:x.Username,
      'Total Usage':fmtGB(x.total), 'Total Usage (GB)':Math.round(x.total*100)/100, 'Days Used':x.days.size
    }));
    const total = summary.reduce((s,r)=>s+Number(r['Total Usage (GB)']||0),0);
    const chart = summary.slice(0,10).map((r,i)=>({
      Rank:i+1, Branch:r.Branch, Host:r.Host, Username:r.Username, 'Usage (GB)':r['Total Usage (GB)'],
      Bar:'█'.repeat(Math.max(1,Math.min(40,Math.round((r['Total Usage (GB)']/Math.max(summary[0]?.['Total Usage (GB)']||1,1))*40))))
    }));
    const dailyMap={};
    detailRows.forEach(r=>dailyMap[r.date]=(dailyMap[r.date]||0)+Number(r.bytesGB||0));
    const daily=Object.keys(dailyMap).sort().map(d=>({Date:d,'Total Usage (GB)':Math.round(dailyMap[d]*100)/100,'Records':detailRows.filter(r=>r.date===d).length}));

    const wb = XLSX.utils.book_new();
    const wsSummary = XLSX.utils.json_to_sheet(summary);
    const wsDetail = XLSX.utils.json_to_sheet(detailRows.map(r=>({Date:r.date,Branch:r.Branch,Host:r.Host,'IP Address':r.ip==='others'?'—':r.ip,'MAC Address':r.MAC,Username:r.Username,Usage:r.bytesDisplay||fmtGB(r.bytesGB),'Usage (GB)':Number(r.bytesGB||0),'Percent Share':r.percent ?? ''})));
    const wsDaily = XLSX.utils.json_to_sheet(daily);
    const wsChart = XLSX.utils.json_to_sheet(chart);
    wsSummary['!cols']=[{wch:14},{wch:28},{wch:17},{wch:22},{wch:22},{wch:16},{wch:16},{wch:11}];
    wsDetail['!cols']=[{wch:12},{wch:14},{wch:28},{wch:17},{wch:22},{wch:22},{wch:15},{wch:14},{wch:16}];
    wsDaily['!cols']=[{wch:12},{wch:18},{wch:12}];
    wsChart['!cols']=[{wch:8},{wch:14},{wch:28},{wch:22},{wch:16},{wch:45}];
    XLSX.utils.book_append_sheet(wb,wsSummary,'Host-Usage-Summary');
    XLSX.utils.book_append_sheet(wb,wsDaily,'Daily Totals');
    XLSX.utils.book_append_sheet(wb,wsDetail,'Monthly Detail');
    XLSX.utils.book_append_sheet(wb,wsChart,'Usage Chart');
    const fname=`bandwidth-usage-all-branches-${monthInput}.xlsx`;
    XLSX.writeFile(wb,fname);
    sub.textContent=`Downloaded ${fname} — ${allRows.length} records, ${fmtGB(total)} total usage.`;
    sub.style.color='var(--accent)';
    showToast('Monthly Excel downloaded ✓');
    await logChange('Downloaded Excel',`Monthly all branches — ${fname}`);
  }catch(err){
    console.error('Monthly Excel export failed:',err);
    sub.textContent=`Excel download failed: ${err?.message || 'Unknown error'}`;
    sub.style.color='var(--danger)';
    showToast('Excel download failed');
  }finally{
    btn.disabled=false;
    btn.innerHTML=oldText;
  }
}
// Monthly sidebar export was removed. The Activity Log now has its own Excel export button.

/* ================= PDF export =================
   Uses the browser's native print-to-PDF flow so the report stays clean,
   searchable and works without an extra PDF library. */
function downloadPdfReport(){
  if(!currentUser){ return; }
  renderReportPage();
  goToView('report');
  logChange('Downloaded PDF', 'Opened the full usage report for PDF export');
  showToast('PDF report ready — choose Save as PDF in the print window');
  setTimeout(()=>window.print(), 250);
}

const downloadPdfBtn = document.getElementById('downloadPdfBtn');
if(downloadPdfBtn) downloadPdfBtn.addEventListener('click', downloadPdfReport);

function downloadExcelForDates(dates){
  const rows = usage.filter(u => dates.includes(u.date))
    .slice()
    .sort((a,b) => a.date.localeCompare(b.date) || (b.bytesGB - a.bytesGB));
  if(!rows.length){ showToast('No data for the selected day(s)'); return; }
  const wb = buildWorkbookFromRows(rows);
  const fname = dates.length === 1
    ? `bandwidth-usage-${dates[0]}.xlsx`
    : `bandwidth-usage-selected-${dates.length}-days.xlsx`;
  XLSX.writeFile(wb, fname);
  showToast(`Downloaded ${fname}`);
  logChange('Downloaded Excel', fname);
}

document.getElementById('deleteTodayBtn').addEventListener('click', async ()=>{
  const feedback = document.getElementById('deleteTodayFeedback');
  const today = todayISO();
  const todaysRecords = usage.filter(u => u.date === today);
  if(!todaysRecords.length){
    feedback.textContent = `No data logged for today (${today}) yet.`;
    feedback.style.color = 'var(--muted)';
    return;
  }
  const ok = confirm(`Delete all ${todaysRecords.length} host(s) logged for today (${today})? This can't be undone.`);
  if(!ok) return;
  usage = usage.filter(u => u.date !== today);
  await saveUsage();
  selectedRowKeys.clear();
  selectedDates.delete(today);
  feedback.textContent = `Today's data (${today}) cleared.`;
  feedback.style.color = 'var(--accent)';
  showToast("Today's data deleted");
  await logChange('Deleted day', `${today} — ${todaysRecords.length} host(s) removed`);
  renderSidebar();
  renderDashboard();
});

document.getElementById('clearAllBtn').addEventListener('click', async ()=>{
  const feedback = document.getElementById('clearFeedback');
  if(!currentUser || currentUser.role !== 'administrator'){ showToast('Only Administrator can clear all data'); return; }
  if(!usage.length){ feedback.textContent = 'There is nothing saved yet.'; feedback.style.color = 'var(--muted)'; return; }
  const ok = confirm('This permanently deletes every day of usage data you have saved. The device directory (names, IPs, MACs) is kept. This cannot be undone — continue?');
  if(!ok) return;
  const count = usage.length;
  usage = [];
  await saveUsage();
  selectedRowKeys.clear();
  selectedDates.clear();
  feedback.textContent = 'All saved usage data cleared.';
  feedback.style.color = 'var(--accent)';
  renderSidebar();
  renderDashboard();
  showToast('Usage data cleared');
  await logChange('Cleared all data', `${count} usage record(s) deleted`);
});

/* ================= login / session ================= */
function normalizeName(s){
  return String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
}
function matchAccountKey(raw){
  const norm = normalizeName(raw);
  if(!norm) return null;
  return Object.keys(accounts).find(k =>
    normalizeName(k) === norm || normalizeName(accounts[k].label) === norm
  ) || null;
}

function updateAuthHints(){
  const signinHint = document.getElementById('signinHint');
  signinHint.textContent = '';
}

async function attemptLogin(){
  const uEl = document.getElementById('loginUser');
  const pEl = document.getElementById('loginPass');
  const errEl = document.getElementById('loginError');
  const cardEl = document.querySelector('.login-card');
  const btnEl = document.getElementById('loginBtn');
  const typed = uEl.value.trim();
  const key = matchAccountKey(typed);
  const pass = pEl.value;

  const record = key ? accounts[key] : null;
  if(!record || record.password !== pass){
    errEl.textContent = 'Incorrect login ID or password.';
    cardEl.classList.remove('shake');
    void cardEl.offsetWidth; // restart animation
    cardEl.classList.add('shake');
    await logChangeAs(typed || '(blank)', '—', 'Login failed', `Attempted login ID: ${typed || '(blank)'}`);
    return;
  }
  btnEl.classList.add('loading');
  currentUser = { username: key, role: record.role, label: record.label, branch: record.branch || 'chennai' };
  errEl.textContent = '';
  record.lastLogin = new Date().toLocaleString();
  await saveAccounts();
  try{ await store.set(SESSION_KEY, JSON.stringify(currentUser), false); }
  catch(e){ console.error('Could not save session', e); }
  await enterApp();
  await logChange('Login', `${currentUser.label} signed in`);
  btnEl.classList.remove('loading');
}

function enforceBranchAccess(){
  if(!currentUser) return;
  const sel = document.getElementById('branchSelect');
  if(currentUser.role === 'administrator'){
    if(sel){
      Array.from(sel.options).forEach(o=>o.hidden=false);
      sel.disabled = false;
      // Keep the dropdown synchronized with the actual selected branch.
      sel.value = currentBranch;
    }
    return;
  }
  const allowed = currentUser.branch || 'chennai';
  currentBranch = allowed;
  if(sel){
    Array.from(sel.options).forEach(o=>{ o.hidden = o.value !== allowed; });
    sel.value = allowed;
    sel.disabled = true;
  }
  // Remove admin-only navigation and controls from normal branch users.
  document.querySelectorAll('[data-view="admin"], #view-admin, .admin-only').forEach(el=>el.style.display='none');
}
async function enterApp(){
  const overlay = document.getElementById('loginOverlay');
  overlay.classList.add('fading');
  document.getElementById('mobileTopbar').style.display = '';
  document.getElementById('appShell').style.display = 'grid';
  document.getElementById('badgeName').textContent = currentUser.label;
  document.getElementById('badgeRole').textContent = currentUser.role;
  const homeNameEl = document.getElementById('homeUserName');
  if(homeNameEl) homeNameEl.textContent = currentUser.label;
  applyRolePermissions();
  enforceBranchAccess();
  const dmBranchSelect = document.getElementById('dmBranch');
  if(dmBranchSelect){
    dmBranchSelect.value = currentBranch;
    dmBranchSelect.disabled = !(currentUser && currentUser.role === 'administrator');
  }

  // IMPORTANT: Load the current branch data before rendering the sidebar ticker.
  // Previously startApp() rendered the ticker immediately, while usage was still
  // the empty in-memory array after a fresh login/branch session.
  await loadState();
  try{ await syncIPDirectoryFromDevices(false); }catch(e){}

  await startApp();
  resetIdleTimer();
  setTimeout(()=>{ overlay.style.display = 'none'; }, 360);
}

let firewallMode = 'branch'; // 'branch' or 'all' — used only inside Firewall Dashboard
let firewallSelectedBranch = (typeof currentBranch !== 'undefined' && currentBranch !== 'all') ? currentBranch : 'chennai'; // Firewall-only branch; never changes the main dashboard branch

async function loadBranchPreference(){
  const params = new URLSearchParams(window.location.search);
  const isFirewallPage = params.get('view') === 'firewall';
  firewallMode = isFirewallPage && params.get('scope') === 'all' ? 'all' : 'branch';
  const fwUrlBranch = params.get('fwbranch');
  if(isFirewallPage && fwUrlBranch && BRANCHES.some(b=>b.id===fwUrlBranch)){
    firewallSelectedBranch = fwUrlBranch;
  }
  // The normal dashboard branch preference is intentionally separate from
  // Firewall branch selection. Firewall navigation must never change the
  // sidebar/main-dashboard branch.
  const urlBranch = isFirewallPage ? null : params.get('branch');
  if(currentUser && currentUser.role !== 'administrator'){
    currentBranch = currentUser.branch || 'chennai';
    return;
  }
  if(urlBranch && BRANCHES.some(b=>b.id===urlBranch)){
    currentBranch = urlBranch;
    try{ await store.set(BRANCH_PREF_KEY, currentBranch, false); }catch(e){}
    return;
  }
  try{
    const r = await store.get(BRANCH_PREF_KEY, false); // per-browser, not shared
    if(r && r.value && BRANCHES.some(b=>b.id===r.value)) currentBranch = r.value;
  }catch(e){ /* keep default */ }
}

async function restoreSession(){
  if(IS_MANAGER_SNAPSHOT){
    await loadBranchPreference();
    currentUser = {username:'manager-snapshot', role:'user', label:'Manager View', branch: currentBranch};
    await loadState();
    try{ await syncIPDirectoryFromDevices(false); }catch(e){}
    await enterApp();
    return true;
  }

  // Figure out the branch, load the accounts, and check the saved session all
  // AT THE SAME TIME (instead of one after another) — this is what makes a
  // branch switch (which does a full page reload) come back fast and land
  // straight back on the dashboard instead of sitting on a login check.
  const params = new URLSearchParams(window.location.search);
  firewallMode = params.get('view') === 'firewall' && params.get('scope') === 'all' ? 'all' : 'branch';
  const urlBranch = params.get('branch');

  const [branchPrefResult, accountsResult, sessionResult] = await Promise.all([
    urlBranch ? Promise.resolve(null) : store.get(BRANCH_PREF_KEY, false).catch(()=>null),
    store.get(ACCOUNTS_KEY, true).catch(()=>null),
    store.get(SESSION_KEY, false).catch(()=>null)
  ]);

  if(urlBranch && BRANCHES.some(b=>b.id===urlBranch)){
    currentBranch = urlBranch;
  } else if(branchPrefResult && branchPrefResult.value && BRANCHES.some(b=>b.id===branchPrefResult.value)){
    currentBranch = branchPrefResult.value;
  }
  // Save the resolved branch preference in the background — no need to wait on it.
  store.set(BRANCH_PREF_KEY, currentBranch, false).catch(()=>{});

  accounts = accountsResult ? JSON.parse(accountsResult.value) : null;
  if(!accounts || !Object.keys(accounts).length){
    accounts = { [NEW_ADMIN_USERNAME]: { password: NEW_ADMIN_PASSWORD, role: 'administrator', label: NEW_ADMIN_LABEL, lastLogin: null } };
    await saveAccounts();
  }
  await migrateToSingleAdmin();
  updateAuthHints();

  let sessionOk = false;
  try{
    if(sessionResult && sessionResult.value){
      const parsed = JSON.parse(sessionResult.value);
      if(accounts[parsed.username] && accounts[parsed.username].role === parsed.role){
        currentUser = parsed;
        sessionOk = true;
      }
    }
  }catch(e){ /* no saved session — show login */ }

  if(sessionOk){
    await loadState();
    try{ await syncIPDirectoryFromDevices(false); }catch(e){}
    await enterApp();
    return true;
  }

  // Genuinely no valid session — only now do we reveal the login form.
  const overlay = document.getElementById('loginOverlay');
  if(overlay) overlay.style.display = 'flex';
  return false;
}

function applyRolePermissions(){
  const isAdmin = currentUser && currentUser.role === 'administrator';
  const clearBtn = document.getElementById('clearAllBtn');
  const addDevBtn = document.getElementById('addDeviceBtn');
  [clearBtn, addDevBtn].forEach(btn=>{
    if(!btn) return;
    btn.disabled = !isAdmin;
    btn.style.opacity = isAdmin ? '1' : '0.45';
    btn.style.cursor = isAdmin ? 'pointer' : 'not-allowed';
  });
  const clearNote = document.getElementById('clearFeedback');
  if(!isAdmin && clearNote) clearNote.textContent = 'Only Administrator can clear all data.';

  // Non-admin users can browse everything but can't edit, delete, or manage devices/users.
  document.querySelectorAll('[data-admin-only]').forEach(btn=>{
    btn.style.display = isAdmin ? '' : 'none';
  });
  document.body.classList.toggle('non-admin', !isAdmin);
}

document.getElementById('loginBtn').addEventListener('click', attemptLogin);
document.getElementById('loginUser').addEventListener('keydown', e=>{ if(e.key==='Enter') document.getElementById('loginPass').focus(); });
document.getElementById('loginPass').addEventListener('keydown', e=>{ if(e.key==='Enter') attemptLogin(); });

/* ================= auto sign-out after inactivity ================= */
const IDLE_LIMIT_MS = 30 * 60 * 1000; // 30 minutes
let idleTimer = null;

function resetIdleTimer(){
  if(!currentUser) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(()=>{ performLogout('inactivity'); }, IDLE_LIMIT_MS);
}
function stopIdleTimer(){
  clearTimeout(idleTimer);
  idleTimer = null;
}
['mousemove','mousedown','keydown','scroll','touchstart','click'].forEach(evt=>{
  document.addEventListener(evt, resetIdleTimer, { passive:true });
});

async function performLogout(reason){
  if(currentUser) await logChange('Logout', reason==='inactivity' ? `${currentUser.label} auto-signed out after 30 minutes of inactivity` : `${currentUser.label} signed out`);
  currentUser = null;
  try{ await store.delete(SESSION_KEY, false); }
  catch(e){ /* nothing to delete */ }
  const overlay = document.getElementById('loginOverlay');
  overlay.style.display = 'flex';
  overlay.classList.remove('fading');
  document.querySelector('.login-card').classList.remove('shake');
  document.getElementById('mobileTopbar').style.display = 'none';
  document.getElementById('appShell').style.display = 'none';
  document.getElementById('changePassPanel').style.display = 'none';
  updateAuthHints();
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  stopIdleTimer();
  if(reason === 'inactivity'){
    const hint = document.getElementById('signinHint');
    if(hint){ hint.textContent = "You've been signed out after 30 minutes of inactivity."; hint.classList.add('notice'); }
  }
}

document.getElementById('logoutBtn').addEventListener('click', ()=> performLogout());

/* ================= change my password ================= */
document.getElementById('changePassBtn').addEventListener('click', ()=>{
  const panel = document.getElementById('changePassPanel');
  const opening = panel.style.display === 'none';
  panel.style.display = opening ? 'block' : 'none';
  if(opening){
    document.getElementById('cpCurrent').value = '';
    document.getElementById('cpNew').value = '';
    document.getElementById('cpConfirm').value = '';
    document.getElementById('cpError').textContent = '';
    document.getElementById('cpCurrent').focus();
  }
});
document.getElementById('cpCurrent').addEventListener('keydown', e=>{ if(e.key==='Enter') document.getElementById('cpNew').focus(); });
document.getElementById('cpNew').addEventListener('keydown', e=>{ if(e.key==='Enter') document.getElementById('cpConfirm').focus(); });
document.getElementById('cpConfirm').addEventListener('keydown', e=>{ if(e.key==='Enter') document.getElementById('cpSaveBtn').click(); });

document.getElementById('cpSaveBtn').addEventListener('click', async ()=>{
  const errEl = document.getElementById('cpError');
  if(!currentUser){ return; }
  const cur = document.getElementById('cpCurrent').value;
  const next = document.getElementById('cpNew').value;
  const confirmVal = document.getElementById('cpConfirm').value;

  const record = accounts[currentUser.username];
  if(!record || record.password !== cur){
    errEl.textContent = 'Current password is incorrect.';
    return;
  }
  if(next.length < 6){
    errEl.textContent = 'New password must be at least 6 characters.';
    return;
  }
  if(next !== confirmVal){
    errEl.textContent = 'New passwords don\'t match.';
    return;
  }
  if(next === cur){
    errEl.textContent = 'New password must be different from the current one.';
    return;
  }

  record.password = next;
  await saveAccounts();
  errEl.textContent = '';
  document.getElementById('changePassPanel').style.display = 'none';
  showToast('Password updated ✓');
  await logChange('Changed password', `${currentUser.label} updated their own password`);
});

/* ================= history view ================= */
function renderHistory(){
  const body = document.getElementById('historyTableBody');
  if(!history.length){
    body.innerHTML = `<tr><td colspan="4"><div class="empty">No changes logged yet.</div></td></tr>`;
    return;
  }
  body.innerHTML = history.map(h=>`
    <tr>
      <td class="mono muted">${h.time}</td>
      <td>${h.user}</td>
      <td>${h.action}</td>
      <td class="muted">${h.detail}</td>
    </tr>
  `).join('');
}

async function downloadActivityLogExcel(){
  if(!currentUser){ return; }

  if(!history.length){
    showToast('No activity log data available to download');
    return;
  }

  const rows = history.map(h=>({
    'When': h.time || '',
    'User': h.user || '',
    'Action': h.action || '',
    'Details': h.detail || ''
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  ws['!cols'] = [{wch:24},{wch:22},{wch:24},{wch:60}];
  XLSX.utils.book_append_sheet(wb, ws, 'Activity Log');

  const fname = `activity-log-${todayISO()}.xlsx`;
  XLSX.writeFile(wb, fname);

  showToast('Activity log Excel downloaded ✓');
  await logChange('Downloaded Activity Log Excel', fname);
}

const downloadActivityExcelBtn = document.getElementById('downloadActivityExcelBtn');
if(downloadActivityExcelBtn){
  downloadActivityExcelBtn.addEventListener('click', downloadActivityLogExcel);
}

/* ================= admin: manage users ================= */
document.querySelectorAll('#adminSubTabs .auth-tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('#adminSubTabs .auth-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('adminpanel-users').classList.toggle('active', btn.dataset.admintab==='users');
    document.getElementById('adminpanel-activity').classList.toggle('active', btn.dataset.admintab==='activity');
    if(btn.dataset.admintab==='activity') renderHistory();
  });
});

function renderUsersTable(){
  const body = document.getElementById('usersTableBody');
  if(!body) return;
  const keys = Object.keys(accounts).sort((a,b)=> String(accounts[a].label||a).localeCompare(String(accounts[b].label||b)));
  if(!keys.length){
    body.innerHTML = `<tr><td colspan="5"><div class="empty">No accounts yet.</div></td></tr>`;
    return;
  }
  body.innerHTML = keys.map(key=>{
    const a = accounts[key] || {};
    const label = a.label || key;
    const role = a.role === 'administrator' ? 'administrator' : 'user';
    const isSelf = currentUser && currentUser.username === key;
    return `<tr>
      <td class="mono muted">${key}</td>
      <td>${label}${isSelf ? ' <span class="hint" style="margin:0;">(you)</span>' : ''}</td>
      <td>
        <select data-role-for="${key}" style="padding:6px 8px; font-size:12px;">
          <option value="user" ${role==='user'?'selected':''}>User</option>
          <option value="administrator" ${role==='administrator'?'selected':''}>Administrator</option>
        </select>
      </td>
      <td class="mono muted">${a.lastLogin || 'Never'}</td>
      <td style="display:flex; gap:6px; flex-wrap:wrap;">
        <button class="btn ghost small" type="button" data-reset-for="${key}">Reset password</button>
        <button class="btn danger small" type="button" data-delete-for="${key}" ${isSelf ? 'disabled style="opacity:.4;cursor:not-allowed;"' : ''}>Delete</button>
      </td>
    </tr>`;
  }).join('');

  body.querySelectorAll('[data-role-for]').forEach(sel=>{
    sel.addEventListener('change', async ()=>{
      const key = sel.dataset.roleFor;
      const newRole = sel.value;
      if(accounts[key].role === 'administrator' && newRole !== 'administrator' && adminCount() <= 1){
        showToast("Can't remove the last Administrator");
        sel.value = 'administrator';
        return;
      }
      const oldRole = accounts[key].role;
      accounts[key].role = newRole;
      await saveAccounts();
      showToast(`${accounts[key].label} is now ${newRole === 'administrator' ? 'an Administrator' : 'a User'}`);
      await logChange('Changed role', `${accounts[key].label} (${key}): ${oldRole} → ${newRole}`);
      if(currentUser && currentUser.username === key){
        currentUser.role = newRole;
        try{ await store.set(SESSION_KEY, JSON.stringify(currentUser), false); }catch(e){}
        document.getElementById('badgeRole').textContent = currentUser.role;
        applyRolePermissions();
      }
      renderUsersTable();
    });
  });
  body.querySelectorAll('[data-reset-for]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.resetFor;
      document.getElementById('resetPassCard').style.display = 'block';
      document.getElementById('resetPassTarget').textContent = `${accounts[key].label} (${key})`;
      document.getElementById('resetPassCard').dataset.targetKey = key;
      document.getElementById('resetPassNew').value = '';
      document.getElementById('resetPassConfirm').value = '';
      document.getElementById('resetPassFeedback').textContent = '';
      document.getElementById('resetPassNew').focus();
      document.getElementById('resetPassCard').scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
  body.querySelectorAll('[data-delete-for]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const key = btn.dataset.deleteFor;
      if(!key || (currentUser && currentUser.username === key)) return;
      if(accounts[key].role === 'administrator' && adminCount() <= 1){
        showToast("Can't delete the last Administrator");
        return;
      }
      const ok = confirm(`Delete the account "${accounts[key].label}" (${key})? This can't be undone.`);
      if(!ok) return;
      const label = accounts[key].label;
      delete accounts[key];
      await saveAccounts();
      showToast(`${label} deleted`);
      await logChange('Deleted user', `${label} (${key})`);
      renderUsersTable();
    });
  });
}

document.getElementById('addUserBtn').addEventListener('click', async ()=>{
  const idEl = document.getElementById('newUserId');
  const labelEl = document.getElementById('newUserLabel');
  const roleEl = document.getElementById('newUserRole');
  const branchEl = document.getElementById('newUserBranch');
  const p1El = document.getElementById('newUserPass');
  const p2El = document.getElementById('newUserPass2');
  const feedback = document.getElementById('addUserFeedback');

  const rawId = idEl.value.trim();
  const key = normalizeName(rawId);
  const label = labelEl.value.trim() || rawId;
  const role = roleEl.value;
  const branch = role === 'administrator' ? 'all' : branchEl.value;
  const pass1 = p1El.value;
  const pass2 = p2El.value;

  if(!key){ feedback.textContent = 'Login ID is required.'; feedback.style.color = 'var(--danger)'; return; }
  if(accounts[key]){ feedback.textContent = 'That login ID is already taken.'; feedback.style.color = 'var(--danger)'; return; }
  if(pass1.length < 6){ feedback.textContent = 'Password must be at least 6 characters.'; feedback.style.color = 'var(--danger)'; return; }
  if(pass1 !== pass2){ feedback.textContent = "Passwords don't match."; feedback.style.color = 'var(--danger)'; return; }

  accounts[key] = { password: pass1, role, branch, label, lastLogin: null };
  await saveAccounts();
  feedback.textContent = `${label} added ✓`;
  feedback.style.color = 'var(--accent)';
  showToast(`User ${label} added`);
  await logChange('Added user', `${label} (${key}) as ${role}`);
  idEl.value = ''; labelEl.value = ''; p1El.value = ''; p2El.value = ''; roleEl.value = 'user'; branchEl.value = 'chennai';
  renderUsersTable();
});

document.getElementById('resetPassCancelBtn').addEventListener('click', ()=>{
  document.getElementById('resetPassCard').style.display = 'none';
});
document.getElementById('resetPassSaveBtn').addEventListener('click', async ()=>{
  const card = document.getElementById('resetPassCard');
  const key = card.dataset.targetKey;
  const feedback = document.getElementById('resetPassFeedback');
  const next = document.getElementById('resetPassNew').value;
  const confirmVal = document.getElementById('resetPassConfirm').value;
  if(!key || !accounts[key]) return;
  if(next.length < 6){ feedback.textContent = 'Password must be at least 6 characters.'; feedback.style.color = 'var(--danger)'; return; }
  if(next !== confirmVal){ feedback.textContent = "Passwords don't match."; feedback.style.color = 'var(--danger)'; return; }
  accounts[key].password = next;
  await saveAccounts();
  showToast(`Password reset for ${accounts[key].label}`);
  await logChange('Reset password', `Administrator reset the password for ${accounts[key].label} (${key})`);
  card.style.display = 'none';
});

/* ================= overall report (full page) ================= */
function renderReportPageWith(rawUsage, devs){
  // local HTML-escape helper (the report code used esc() but no global esc() exists)
  const esc = v => String(v==null?'':v).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  /* Robust full report renderer: table/data must render even if a chart fails. */
  const reportUsage = Array.isArray(rawUsage) ? rawUsage.map(u=>({
    ...u,
    ip: String(u?.ip || '').trim(),
    date: String(u?.date || '').trim(),
    bytesGB: Number(u?.bytesGB ?? u?.gb ?? toGB(u?.bytesDisplay)) || 0
  })).filter(u=>u.bytesGB >= 0) : [];

  const real = reportUsage.filter(u => u.ip && u.ip.toLowerCase() !== 'others');
  const totalAll = reportUsage.reduce((s,r)=>s + Number(r.bytesGB || 0), 0);
  const days = [...new Set(reportUsage.map(u=>u.date).filter(Boolean))].sort().reverse();

  setStatValue(document.getElementById('repTotal'), fmtGB(totalAll));
  setStatValue(document.getElementById('repDays'), days.length);

  /* Match device by branch + IP first, then IP. This prevents branch IP collisions. */
  const deviceForReport = (ip, branch)=>{
    let d = devs.find(x=>String(x?.ip||'')===String(ip) && branch && String(x?.branch||'')===String(branch));
    if(d) return d;
    return devs.find(x=>String(x?.ip||'')===String(ip)) || null;
  };

  const byHost = {};
  real.forEach(r=>{
    const branch = r.branch || currentBranch || 'chennai';
    const key = `${branch}||${r.ip}`;
    if(!byHost[key]) byHost[key] = {branch, ip:r.ip, total:0, days:new Set()};
    byHost[key].total += Number(r.bytesGB || 0);
    if(r.date) byHost[key].days.add(r.date);
  });

  const ranked = Object.values(byHost).sort((a,b)=>b.total-a.total);
  setStatValue(document.getElementById('repHosts'), ranked.length);

  const top = ranked[0];
  if(top){
    const d = deviceForReport(top.ip, top.branch);
    setStatValue(document.getElementById('repTop'), d?.name || d?.username || top.ip);
  }else{
    setStatValue(document.getElementById('repTop'), '—');
  }

  const generated = document.getElementById('reportGeneratedAt');
  if(generated){
    generated.textContent = `Generated ${new Date().toLocaleString()} — ${ranked.length} hosts, ${days.length} logged days.`;
  }

  /* Render the complete table FIRST. A chart error can never blank the report. */
  const body = document.getElementById('reportTableBody');
  if(body){
    if(!ranked.length){
      body.innerHTML = `<tr><td colspan="9"><div class="empty">No usage records logged yet for this report scope.</div></td></tr>`;
    }else{
      body.innerHTML = ranked.map((v,i)=>{
        const dev = deviceForReport(v.ip, v.branch);
        const avg = v.days.size ? v.total / v.days.size : v.total;
        return `<tr>
          <td class="mono muted">${i+1}</td>
          <td>${esc(branchLabel(v.branch))}</td>
          <td>${esc(dev?.name || '— unknown —')}</td>
          <td class="mono muted">${esc(v.ip)}</td>
          <td class="mono muted">${esc(dev?.mac || '—')}</td>
          <td class="mono muted">${esc(dev?.username || '—')}</td>
          <td class="mono">${fmtGB(v.total)}</td>
          <td class="mono muted">${v.days.size}</td>
          <td class="mono muted">${fmtGB(avg)}</td>
        </tr>`;
      }).join('');
    }
  }

  /* Circular report chart — pure HTML/CSS so it remains visible after the report view is shown. */
  const circle=document.getElementById('reportCircleChart');
  if(circle){
    const branchTotals={Chennai:0,Bangalore:0,Hosur:0};
    reportUsage.forEach(r=>{
      const b=String(r.branch||'').toLowerCase();
      if(b==='chennai') branchTotals.Chennai += Number(r.bytesGB||0);
      else if(b==='bangalore' || b==='bengaluru') branchTotals.Bangalore += Number(r.bytesGB||0);
      else if(b==='hosur') branchTotals.Hosur += Number(r.bytesGB||0);
    });
    const entries=Object.entries(branchTotals).filter(([,v])=>v>0);
    const total=entries.reduce((sum,[,v])=>sum+v,0);
    if(!total){
      circle.innerHTML='<div style="color:#8ea0ba;font-size:15px;">No usage data available for the report.</div>';
    }else{
      let angle=0;
      const colors={Chennai:'#3B82F6',Bangalore:'#22C55E',Hosur:'#F59E0B'};
      const stops=entries.map(([label,value])=>{
        const from=angle; angle += value/total*360;
        return `${colors[label]} ${from}deg ${angle}deg`;
      }).join(',');
      const legend=entries.map(([label,value])=>{
        const pct=(value/total*100).toFixed(1);
        return `<div style="display:flex;align-items:center;gap:10px;margin:10px 0;min-width:190px;">
          <span style="width:11px;height:11px;border-radius:50%;background:${colors[label]};display:inline-block;flex:0 0 auto;"></span>
          <div><div style="font-weight:700;color:#e5edf8;">${label}</div><div style="font-size:12px;color:#8ea0ba;margin-top:2px;">${fmtGB(value)} • ${pct}%</div></div>
        </div>`;
      }).join('');
      circle.innerHTML=`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;gap:70px;flex-wrap:wrap;">
        <div style="position:relative;width:250px;height:250px;flex:0 0 250px;">
          <div style="position:absolute;inset:0;border-radius:50%;background:conic-gradient(${stops});box-shadow:0 0 35px rgba(59,130,246,.10);"></div>
          <div style="position:absolute;inset:58px;border-radius:50%;background:#111b2e;border:1px solid #263653;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;">
            <strong style="font-size:23px;color:#e5edf8;line-height:1.1;">${fmtGB(total)}</strong>
            <span style="font-size:11px;color:#8ea0ba;margin-top:7px;letter-spacing:.8px;">TOTAL USAGE</span>
          </div>
        </div>
        <div style="min-width:210px;">${legend}</div>
      </div>`;
    }
  }

  /* ---------- Analysis: what the numbers mean ---------- */
  const an=document.getElementById('reportAnalysis');
  if(an){
    if(!reportUsage.length){
      an.innerHTML='';
    }else{
      const brs={};
      reportUsage.forEach(r=>{
        const bid=(String(r.branch||'').toLowerCase()==='bengaluru')?'bangalore':String(r.branch||'').toLowerCase();
        if(!bid) return;
        const o=brs[bid]=brs[bid]||{total:0,days:new Set(),hosts:{}};
        o.total+=Number(r.bytesGB||0);
        if(r.date)o.days.add(r.date);
        if(r.ip && r.ip.toLowerCase()!=='others') o.hosts[r.ip]=(o.hosts[r.ip]||0)+Number(r.bytesGB||0);
      });
      const grand=Object.values(brs).reduce((x,o)=>x+o.total,0);
      const rowsA=Object.entries(brs).sort((x,y)=>y[1].total-x[1].total).map(([bid,o])=>{
        const topIp=Object.entries(o.hosts).sort((x,y)=>y[1]-x[1])[0];
        const dv=topIp?deviceForReport(topIp[0],bid):null;
        return {bid,total:o.total,pct:grand?o.total/grand*100:0,hosts:Object.keys(o.hosts).length,days:o.days.size,avg:o.days.size?o.total/o.days.size:o.total,
                top:topIp?`${esc(dv?.name||topIp[0])} (${fmtGB(topIp[1])})`:'—'};
      });
      const dayTot={}; reportUsage.forEach(r=>{ if(r.date) dayTot[r.date]=(dayTot[r.date]||0)+Number(r.bytesGB||0); });
      const busiest=Object.entries(dayTot).sort((x,y)=>y[1]-x[1])[0];
      const lead=rowsA[0];
      const heavy=ranked[0];
      const heavyDev=heavy?deviceForReport(heavy.ip,heavy.branch):null;
      const sentences=[];
      if(lead) sentences.push(`<b>${esc(branchLabel(lead.bid))}</b> used the most bandwidth: ${fmtGB(lead.total)} (${lead.pct.toFixed(1)}% of ${fmtGB(grand)} total).`);
      if(heavy && grand) sentences.push(`The heaviest single host is <b>${esc(heavyDev?.name||heavy.ip)}</b> (${esc(heavy.ip)}, ${esc(branchLabel(heavy.branch))}) with ${fmtGB(heavy.total)} &mdash; ${(heavy.total/grand*100).toFixed(1)}% of everything logged.`);
      if(busiest) sentences.push(`The busiest day was <b>${esc(busiest[0])}</b> with ${fmtGB(busiest[1])}.`);
      an.innerHTML=`<div class="hint" style="margin-bottom:8px;line-height:1.6;">${sentences.join(' ')}</div>
      <div class="table-scroll"><table>
        <thead><tr><th>Branch</th><th>Total usage</th><th>Share</th><th>Hosts</th><th>Days logged</th><th>Avg. per day</th><th>Heaviest host</th></tr></thead>
        <tbody>${rowsA.map(r=>`<tr><td>${esc(branchLabel(r.bid))}</td><td class="mono">${fmtGB(r.total)}</td><td class="mono muted">${r.pct.toFixed(1)}%</td><td class="mono muted">${r.hosts}</td><td class="mono muted">${r.days}</td><td class="mono muted">${fmtGB(r.avg)}</td><td>${r.top}</td></tr>`).join('')}</tbody>
      </table></div>`;
    }
  }
}

let _repSeq=0;
async function loadAllBranchesForReport(){
  if(typeof store==='undefined'||!store||typeof store.get!=='function') return null;
  const out={usage:[],devices:[]};
  for(const b of REPORT_BRANCHES){
    let rows=[],devs=[];
    try{const r=await store.get(branchKeyFor(b.id,USAGE_KEY),true);rows=r&&r.value?JSON.parse(r.value):[];}catch(e){}
    try{const r=await store.get(branchKeyFor(b.id,DEVICE_KEY),true);devs=r&&r.value?JSON.parse(r.value):[];}catch(e){}
    if(Array.isArray(rows)) rows.forEach(u=>out.usage.push({...u,branch:u.branch||b.id}));
    if(Array.isArray(devs)) devs.forEach(d=>out.devices.push({...d,branch:d.branch||b.id}));
  }
  return out;
}
function renderReportPage(){
  const seq=++_repSeq;
  // 1) instant render from what is already in memory (rows tagged with their branch so the chart can group them)
  const fallbackBranch=(currentBranch&&currentBranch!=='all')?currentBranch:'chennai';
  const mem=(Array.isArray(usage)?usage:[]).map(u=>({...u,branch:u.branch||fallbackBranch}));
  const memDevs=(Array.isArray(devices)?devices:[]).map(d=>({...d,branch:d.branch||fallbackBranch}));
  renderReportPageWith(mem,memDevs);
  // 2) then load Chennai + Bangalore + Hosur from Firebase so the report always covers every branch
  loadAllBranchesForReport().then(res=>{
    if(seq!==_repSeq||!res||!res.usage.length) return;
    renderReportPageWith(res.usage,res.devices);
  }).catch(e=>console.warn('Report: all-branch load failed',e));
}

function downloadFullReportExcel(){
  if(!currentUser){ showToast('Please sign in first'); return; }
  const reportUsage = Array.isArray(usage) ? usage.map(u=>({
    ...u,
    ip:String(u?.ip||'').trim(),
    bytesGB:Number(u?.bytesGB ?? u?.gb ?? toGB(u?.bytesDisplay)) || 0
  })).filter(u=>u.ip && u.ip.toLowerCase()!=='others') : [];

  if(!reportUsage.length){ showToast('No report data available'); return; }

  const getDev=(ip,branch)=>devices.find(d=>String(d?.ip||'')===String(ip) && branch && String(d?.branch||'')===String(branch))
    || devices.find(d=>String(d?.ip||'')===String(ip)) || null;

  const detail=reportUsage.map(r=>{
    const d=getDev(r.ip,r.branch);
    return {
      Date:r.date || '—',
      Branch:branchLabel(r.branch || currentBranch),
      Host:d?.name || '—',
      'IP Address':r.ip,
      'MAC Address':d?.mac || '—',
      Username:d?.username || '—',
      'Usage (GB)':Number(r.bytesGB||0),
      'Usage Display':fmtGB(r.bytesGB||0),
      'Percent Share':r.percent ?? ''
    };
  });

  const summaryMap={};
  detail.forEach(r=>{
    const key=`${r.Branch}||${r['IP Address']}`;
    if(!summaryMap[key]) summaryMap[key]={Branch:r.Branch,Host:r.Host,'IP Address':r['IP Address'],'MAC Address':r['MAC Address'],Username:r.Username,total:0,days:new Set()};
    summaryMap[key].total += Number(r['Usage (GB)']||0);
    if(r.Date && r.Date!=='—') summaryMap[key].days.add(r.Date);
  });
  const summary=Object.values(summaryMap).sort((a,b)=>b.total-a.total).map((r,i)=>({
    Rank:i+1,Branch:r.Branch,Host:r.Host,'IP Address':r['IP Address'],'MAC Address':r['MAC Address'],Username:r.Username,
    'Total Usage (GB)':Math.round(r.total*100)/100,'Total Usage':fmtGB(r.total),'Days Seen':r.days.size,
    'Avg Per Day':fmtGB(r.days.size?r.total/r.days.size:r.total)
  }));

  const dailyMap={};
  detail.forEach(r=>dailyMap[r.Date]=(dailyMap[r.Date]||0)+Number(r['Usage (GB)']||0));
  const daily=Object.keys(dailyMap).sort().map(date=>({Date:date,'Total Usage (GB)':Math.round(dailyMap[date]*100)/100,'Total Usage':fmtGB(dailyMap[date]),Records:detail.filter(r=>r.Date===date).length}));

  const wb=XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(summary),'Host Summary');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(daily),'Daily Totals');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(detail),'Usage Detail');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet([
    {Metric:'Total Usage',Value:fmtGB(detail.reduce((s,r)=>s+Number(r['Usage (GB)']||0),0))},
    {Metric:'Logged Days',Value:new Set(detail.map(r=>r.Date).filter(Boolean)).size},
    {Metric:'Hosts',Value:summary.length},
    {Metric:'Generated',Value:new Date().toLocaleString()}
  ]),'Report Info');
  XLSX.writeFile(wb,`NOC-Full-Usage-Report-${todayISO()}.xlsx`);
  logChange('Downloaded Excel','Downloaded complete full usage report');
  showToast('Full Excel report downloaded ✓');
}

function goToView(viewId){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const matchingNav = document.querySelector(`.nav-btn[data-view="${viewId}"]`);
  if(matchingNav) matchingNav.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.getElementById('view-'+viewId).classList.add('active');
}

const viewReportBtn = document.getElementById('viewReportBtn');
if(viewReportBtn){
  viewReportBtn.addEventListener('click', ()=>{
    try{
      goToView('report');
      renderReportPage();
      logChange('Viewed report', 'Opened the full all-time usage report');
    }catch(err){
      console.error('Report open failed:', err);
      showToast('Report could not be opened');
    }
  });
}
document.getElementById('backToDashBtn').addEventListener('click', ()=>{
  renderDashboard();
  goToView('dashboard');
});
document.getElementById('printReportBtn').addEventListener('click', ()=>{
  window.print();
});
const fullReportExcelBtn = document.getElementById('fullReportExcelBtn');
if(fullReportExcelBtn) fullReportExcelBtn.addEventListener('click', downloadFullReportExcel);

/* ================= nav ================= */
function openModule(viewId, syncUrl=true){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
  const matchingNav = document.querySelector(`.nav-btn[data-view="${viewId}"]`);
  if(matchingNav) matchingNav.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  const target = document.getElementById('view-'+viewId);
  if(target) target.classList.add('active');

  if(syncUrl){
    const url = new URL(window.location.href);
    url.searchParams.set('branch', currentBranch);
    url.searchParams.set('view', viewId);
    window.history.replaceState({}, '', url.toString());
  }

  if(window.innerWidth <= 860){ document.getElementById('sidebar').classList.remove('open'); }
  if(viewId==='dashboard') renderDashboard();
  if(viewId==='devices') renderDevices();
  if(viewId==='hostdash') renderHostDashboard();
  if(viewId==='firewall') renderFirewallDashboard();
  if(viewId==='admin'){ renderUsersTable(); renderHistory(); }
  if(viewId==='ipdirectory'){
    if(currentUser && currentUser.role !== 'administrator'){
      ipdirBranch = String(currentUser.branch || currentBranch || 'chennai').toLowerCase();
    }
    renderIPDirectory();
  }
}

document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click', ()=> openModule(btn.dataset.view));
});

document.querySelectorAll('.module-tile').forEach(tile=>{
  tile.addEventListener('click', ()=>{
    if(tile.dataset.view){ openModule(tile.dataset.view); return; }
    const action = tile.dataset.action;
    if(action === 'report'){
      try{
        goToView('report');
        renderReportPage();
        logChange('Viewed report', 'Opened the full all-time usage report');
      }catch(err){
        console.error('Report tile failed:', err);
        showToast('Report could not be opened');
      }
    } else if(action === 'changepass'){
      if(window.innerWidth <= 860){ document.getElementById('sidebar').classList.add('open'); }
      document.getElementById('changePassBtn').click();
      document.getElementById('changePassBtn').scrollIntoView({ behavior:'smooth', block:'center' });
    } else if(action === 'logout'){
      document.getElementById('logoutBtn').click();
    }
  });
});

document.getElementById('burgerBtn').addEventListener('click', ()=>{
  document.getElementById('sidebar').classList.toggle('open');
});

/* ================= sidebar ticker + chart ================= */
function renderSidebar(){
  const today = todayISO();

  // Normalize usage before calculating the sidebar totals so imported Firebase
  // rows using numeric strings cannot turn the ticker into an invalid/empty value.
  let safeUsage = Array.isArray(usage) ? usage.map(r=>({
    ...r,
    bytesGB: Number(r?.bytesGB ?? r?.gb ?? 0) || 0
  })) : [];

  // If this branch has no host-level usage rows (only Application Usage was
  // uploaded), fall back to Application Usage totals so the ticker never sticks at 0 GB.
  let tickerFromApps = false;
  if(!safeUsage.some(r=>r.bytesGB>0) && Array.isArray(appUsage) && appUsage.length){
    safeUsage = appUsage.map(r=>({ date:r.date, bytesGB:Number(r?.gb ?? r?.bytesGB ?? 0) || 0 }));
    tickerFromApps = true;
  }

  const dates = [...new Set(safeUsage.map(r=>r.date).filter(Boolean))].sort();
  const overallTotal = safeUsage.reduce((s,r)=>s+r.bytesGB,0);
  const todayTotal = safeUsage.filter(u=>u.date===today).reduce((s,r)=>s+r.bytesGB,0);
  const hasToday = safeUsage.some(u=>u.date===today);

  const shown = dates.includes(today) ? today : (dates[dates.length-1] || null);

  document.getElementById('tickerLabel').textContent = 'Overall total';
  document.getElementById('tickerDate').textContent = dates.length ? `${dates.length} day${dates.length>1?'s':''}` : '--';
  setStatValue(document.getElementById('tickerValue'), dates.length ? fmtGB(overallTotal) : '0 GB');
  document.getElementById('tickerSub').textContent = dates.length
    ? ((hasToday ? `Today (${today}): ${fmtGB(todayTotal)}` : `No data for today (${today}) yet · latest: ${shown}`) + (tickerFromApps ? ' · from Application Usage' : ''))
    : `No data found for ${branchLabel(currentBranch)} yet — add/import usage data or check Firebase sync.`;

  // Top Consumers chart was intentionally removed from the sidebar.
  // The Monthly Report now occupies that space.
}

/* ================= dashboard ================= */
function populateDashDateSelect(preferredDate){
  const sel = document.getElementById('dashDateSelect');
  const dates = uniqueDates();
  if(!dates.length){ sel.innerHTML = '<option>No dates yet</option>'; return; }
  const selected = dates.includes(preferredDate) ? preferredDate : dates[0];
  sel.innerHTML = dates.map(d=>`<option value="${d}" ${d===selected?'selected':''}>${d}</option>`).join('');
}
document.getElementById('dashDateSelect').addEventListener('change', renderDashboard);
document.getElementById('userUsageSelect').addEventListener('change', renderPerUserUsageChart);

function renderOverall(){
  const real = usage.filter(u => u.ip !== 'others');
  const totalAll = usage.reduce((s,r)=>s+r.bytesGB,0);
  const days = uniqueDates();

  setStatValue(document.getElementById('ovTotal'), fmtGB(totalAll));
  setStatValue(document.getElementById('ovDays'), days.length);

  // In All Branches mode, aggregate by Location + IP so the same IP
  // used by different branches is never mixed together.
  const byKey = {};
  real.forEach(r=>{
    const locationId = currentBranch === 'all' ? (r.branch || 'unknown') : currentBranch;
    const key = currentBranch === 'all' ? `${locationId}::${r.ip}` : r.ip;

    if(!byKey[key]){
      byKey[key] = {
        ip: r.ip,
        location: locationId,
        total: 0,
        days: new Set()
      };
    }

    byKey[key].total += r.bytesGB;
    byKey[key].days.add(r.date);
  });

  const ranked = Object.entries(byKey).sort((a,b)=>b[1].total-a[1].total);

  setStatValue(
    document.getElementById('ovTop'),
    ranked[0] ? (deviceFor(ranked[0][1].ip)?.name || ranked[0][1].ip) : '—'
  );

  const body = document.getElementById('overallTableBody');
  if(!ranked.length){
    body.innerHTML = `<tr><td colspan="5"><div class="empty">No data logged yet — add your first day to see totals build up here.</div></td></tr>`;
    return;
  }

  body.innerHTML = ranked.map(([key, v])=>{
    const dev = deviceFor(v.ip);
    const locationLabel = v.location === 'unknown'
      ? 'Unknown'
      : branchLabel(v.location);

    return `<tr>
      <td><strong>${locationLabel}</strong></td>
      <td>${dev?.name || '— unknown —'}</td>
      <td class="mono muted">${v.ip}</td>
      <td class="mono">${fmtGB(v.total)}</td>
      <td class="mono muted">${v.days.size}</td>
    </tr>`;
  }).join('');
}

function updateDaySelectBar(){
  const validDates = new Set(uniqueDates());
  [...selectedDates].forEach(d=>{ if(!validDates.has(d)) selectedDates.delete(d); });
  const bar = document.getElementById('daySelectBar');
  const count = document.getElementById('daySelectCount');
  if(selectedDates.size){
    bar.style.display = 'flex';
    count.textContent = `${selectedDates.size} day${selectedDates.size>1?'s':''} selected`;
  } else {
    bar.style.display = 'none';
  }
  const selectAll = document.getElementById('selectAllDays');
  const all = document.querySelectorAll('#dailyTotalsBody .day-select');
  if(selectAll){
    selectAll.checked = all.length>0 && selectedDates.size === all.length;
    selectAll.indeterminate = selectedDates.size>0 && selectedDates.size < all.length;
  }
}

function renderDailyTotals(activeDate){
  const dates = uniqueDates();
  const body = document.getElementById('dailyTotalsBody');
  if(!dates.length){
    body.innerHTML = `<tr>
        <td><strong>${currentBranch==='all' ? 'Chennai · Bangalore · Hosur' : branchLabel(currentBranch)}</strong></td><td colspan="5"><div class="empty">No days logged yet.</div></td></tr>`;
    updateDaySelectBar();
    return;
  }
  body.innerHTML = dates.map(d=>{
    const dayRows = usage.filter(u=>u.date===d);
    const total = dayRows.reduce((s,r)=>s+r.bytesGB,0);
    const hostCount = dayRows.filter(r=>r.ip!=='others').length;
    const isActive = d === activeDate;
    return `<tr class="clickable${isActive?' row-active':''}" data-jump-date="${d}">
      <td><strong>${currentBranch==='all' ? 'Chennai · Bangalore · Hosur' : branchLabel(currentBranch)}</strong></td>
        <td class="admin-action-col"><input type="checkbox" class="day-select admin-action" data-date="${d}" ${selectedDates.has(d)?'checked':''}></td>
      <td class="mono">${d}</td>
      <td class="mono">${fmtGB(total)}</td>
      <td class="mono muted">${hostCount}</td>
    </tr>`;
  }).join('');

  body.querySelectorAll('tr[data-jump-date]').forEach(tr=>{
    tr.addEventListener('click', (e)=>{
      if(e.target.classList.contains('day-select')) return;
      document.getElementById('dashDateSelect').value = tr.dataset.jumpDate;
      renderDashboard();
    });
  });
  body.querySelectorAll('.day-select').forEach(cb=>{
    cb.addEventListener('click', e=>e.stopPropagation());
    cb.addEventListener('change', ()=>{
      if(cb.checked) selectedDates.add(cb.dataset.date); else selectedDates.delete(cb.dataset.date);
      updateDaySelectBar();
    });
  });
  updateDaySelectBar();
}

document.getElementById('selectAllDays').addEventListener('change', (e)=>{
  const checked = e.target.checked;
  document.querySelectorAll('#dailyTotalsBody .day-select').forEach(cb=>{
    cb.checked = checked;
    if(checked) selectedDates.add(cb.dataset.date); else selectedDates.delete(cb.dataset.date);
  });
  updateDaySelectBar();
});

document.getElementById('deleteSelectedDaysBtn').addEventListener('click', async ()=>{
  if(!selectedDates.size) return;
  const dates = [...selectedDates];
  const ok = confirm(`Delete all data for ${dates.length} selected day${dates.length>1?'s':''}? This can't be undone.`);
  if(!ok) return;
  const removedCount = usage.filter(u=>dates.includes(u.date)).length;
  usage = usage.filter(u=>!dates.includes(u.date));
  await saveUsage();
  await logChange('Deleted days', `${dates.join(', ')} — ${removedCount} record(s) removed via multi-select`);
  selectedDates.clear();
  showToast(`${dates.length} day${dates.length>1?'s':''} deleted`);
  renderSidebar();
  renderDashboard();
});

document.getElementById('downloadSelectedDaysBtn').addEventListener('click', ()=>{
  if(!currentUser || currentUser.role !== 'administrator'){ showToast('Only Administrator can download reports'); return; }
  if(!selectedDates.size) return;
  downloadExcelForDates([...selectedDates]);
});

function renderPerUserUsageChart(){
  const card=document.getElementById('perUserUsageCard');
  if(!card) return;

  const real=(usage||[]).filter(r=>r&&r.ip&&r.ip!=='others');
  const usersMap=new Map();

  real.forEach(r=>{
    const branch=r.branch||'unknown';
    const key=(currentBranch==='all'?branch+'|':'')+r.ip;
    if(!usersMap.has(key)){
      const dev=deviceFor(r.ip)||{};
      usersMap.set(key,{
        key, ip:r.ip, branch,
        name:dev.name||r.username||r.user||r.ip,
        username:dev.username||r.username||r.user||'—',
        mac:dev.mac||r.mac||'—',
        total:0, records:0, dates:new Set()
      });
    }
    const u=usersMap.get(key);
    u.total += Number(r.bytesGB)||0;
    u.records++;
    if(r.date) u.dates.add(r.date);
  });

  const list=[...usersMap.values()].sort((a,b)=>b.total-a.total);
  const fmtShort=n=>{
    n=Number(n)||0;
    if(n>=1000) return (n/1024).toFixed(2)+' TB';
    if(n>=1) return n.toFixed(2)+' GB';
    return (n*1024).toFixed(0)+' MB';
  };

  card.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;">
      <div>
        <h3 style="margin-bottom:5px;">User-wise bandwidth analytics</h3>
        <div class="hint">Compare users by total consumption, then select a user to drill into their daily usage trend.</div>
      </div>
      <div class="user-analytics-badge">${currentBranch==='all'?'All Branches':branchLabel(currentBranch)}</div>
    </div>

    <div class="user-chart-controls">
      <div style="min-width:280px;">
        <label for="userUsageSelect">User / device</label>
        <select id="userUsageSelect">
          <option value="__top__">Top users — overall ranking</option>
          ${list.map(u=>`<option value="${u.key.replace(/"/g,'&quot;')}">${String(u.name).replace(/</g,'&lt;')} · ${fmtShort(u.total)}</option>`).join('')}
        </select>
      </div>
      <div style="min-width:240px;">
        <label for="userChartSearch">Quick search</label>
        <input id="userChartSearch" type="text" placeholder="Search user, IP or MAC…">
      </div>
    </div>

    <div class="user-kpi-row" id="userAnalyticsKpis"></div>
    <div class="user-chart-wrap user-analytics-chart-wrap"><canvas id="perUserUsageChart"></canvas></div>
    <div class="user-chart-foot" id="userAnalyticsFoot"></div>
  `;

  const select=document.getElementById('userUsageSelect');
  const search=document.getElementById('userChartSearch');
  const kpis=document.getElementById('userAnalyticsKpis');
  const foot=document.getElementById('userAnalyticsFoot');

  if(window.perUserUsageChart){
    try{ window.perUserUsageChart.destroy(); }catch(e){}
    window.perUserUsageChart=null;
  }

  function escapeHtml(s){
    return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function draw(){
    if(window.perUserUsageChart){
      try{ window.perUserUsageChart.destroy(); }catch(e){}
      window.perUserUsageChart=null;
    }

    const q=(search.value||'').trim().toLowerCase();
    const filtered=list.filter(u=>{
      if(!q) return true;
      return [u.name,u.username,u.ip,u.mac,branchLabel(u.branch)]
        .some(v=>String(v||'').toLowerCase().includes(q));
    });

    if(!filtered.length){
      kpis.innerHTML='<div class="user-chart-empty">No matching user found.</div>';
      foot.textContent='Try a different user name, IP address or MAC address.';
      return;
    }

    let selected=select.value;
    if(selected!=='__top__' && !filtered.some(u=>u.key===selected)){
      selected='__top__';
      select.value='__top__';
    }

    if(selected==='__top__'){
      const top=filtered.slice(0,10);
      // Keep the dashboard KPI aligned with the sidebar Overall total.
      // The ranking itself still contains only identifiable users/devices.
      const rankedTotal=filtered.reduce((s,u)=>s+u.total,0);
      const total=!q
        ? (usage||[]).reduce((s,r)=>s+(Number(r?.bytesGB)||0),0)
        : rankedTotal;
      const leader=top[0];
      kpis.innerHTML=`
        <div class="user-kpi"><span>${!q?'Overall usage':'Total user usage'}</span><strong>${fmtShort(total)}</strong></div>
        <div class="user-kpi"><span>Users found</span><strong>${filtered.length}</strong></div>
        <div class="user-kpi"><span>Top consumer</span><strong title="${escapeHtml(leader.name)}">${escapeHtml(leader.name)}</strong></div>
        <div class="user-kpi"><span>Top share</span><strong>${total?((leader.total/total)*100).toFixed(1):'0.0'}%</strong></div>
      `;

      /* Circle chart: top user usage share, with remaining users grouped. */
      const pieTop=top.slice(0,6);
      const pieOther=top.slice(6).reduce((sum,u)=>sum+(Number(u.total)||0),0);
      const pieLabels=pieTop.map(u=>u.name);
      const pieValues=pieTop.map(u=>u.total);
      if(pieOther>0){ pieLabels.push('Other users'); pieValues.push(pieOther); }

      window.perUserUsageChart=new Chart(document.getElementById('perUserUsageChart').getContext('2d'),{
        type:'doughnut',
        data:{
          labels:pieLabels,
          datasets:[{
            label:'Usage',
            data:pieValues,
            backgroundColor:['#00E5FF','#7C4DFF','#00E676','#FFD740','#FF5252','#FF4081','#40C4FF','#69F0AE','#FFAB40','#EA80FC'],
            borderWidth:3,
            borderColor:'#111C31',
            hoverOffset:12
          }]
        },
        options:{
          responsive:true,
          maintainAspectRatio:false,
          cutout:'62%',
          interaction:{mode:'nearest',intersect:true},
          plugins:{
            legend:{
              display:true,
              position:'right',
              labels:{boxWidth:12,padding:14}
            },
            tooltip:{
              callbacks:{
                label:ctx=>{
                  const value=Number(ctx.raw)||0;
                  const pct=total?((value/total)*100).toFixed(1):'0.0';
                  return ` ${ctx.label}: ${fmtShort(value)} (${pct}%)`;
                },
                afterLabel:ctx=>{
                  if(ctx.dataIndex>=pieTop.length) return '';
                  const u=pieTop[ctx.dataIndex];
                  return [
                    `User: ${u.username||'—'}`,
                    `IP: ${u.ip}`,
                    `MAC: ${u.mac}`,
                    `Branch: ${branchLabel(u.branch)}`
                  ];
                }
              }
            }
          }
        }
      });
      foot.innerHTML=`Showing top ${top.length} users by total usage. Select a user above for a daily trend.`;
      return;
    }

    const u=filtered.find(x=>x.key===selected)||filtered[0];
    const rows=real.filter(r=>r.ip===u.ip&&(currentBranch!=='all'||(r.branch||'unknown')===u.branch));
    const byDate={};
    rows.forEach(r=>{
      const d=r.date||'Unknown';
      byDate[d]=(byDate[d]||0)+(Number(r.bytesGB)||0);
    });
    const labels=Object.keys(byDate).sort();
    const values=labels.map(d=>byDate[d]);
    const total=values.reduce((s,v)=>s+v,0);
    const avg=values.length?total/values.length:0;
    let peakIdx=0;
    values.forEach((v,i)=>{if(v>values[peakIdx])peakIdx=i;});
    const peak=values.length?values[peakIdx]:0;
    const peakDate=labels.length?labels[peakIdx]:'—';

    kpis.innerHTML=`
      <div class="user-kpi"><span>Total usage</span><strong>${fmtShort(total)}</strong></div>
      <div class="user-kpi"><span>Average / day</span><strong>${fmtShort(avg)}</strong></div>
      <div class="user-kpi"><span>Peak day</span><strong>${fmtShort(peak)}</strong></div>
      <div class="user-kpi"><span>Peak date</span><strong>${escapeHtml(peakDate)}</strong></div>
    `;

    if(!labels.length){
      foot.innerHTML=`<b>${escapeHtml(u.name)}</b> · ${escapeHtml(u.ip)} · No usage history available.`;
      return;
    }

    window.perUserUsageChart=new Chart(document.getElementById('perUserUsageChart').getContext('2d'),{
      type:'line',
      data:{
        labels,
        datasets:[{
          label:`${u.name} usage`,
          data:values,
          fill:true,
          tension:.32,
          borderWidth:3,
          pointRadius:4,
          pointHoverRadius:7
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        interaction:{mode:'index',intersect:false},
        plugins:{
          legend:{display:false},
          tooltip:{
            callbacks:{
              label:ctx=>` ${fmtShort(ctx.raw)}`,
              title:items=>items[0]?.label||''
            }
          }
        },
        scales:{
          y:{beginAtZero:true,title:{display:true,text:'Daily usage'},ticks:{callback:v=>fmtShort(v)}},
          x:{grid:{display:false}}
        }
      }
    });

    foot.innerHTML=`
      <span><b>${escapeHtml(u.name)}</b></span>
      <span>IP: <b>${escapeHtml(u.ip)}</b></span>
      <span>MAC: <b>${escapeHtml(u.mac)}</b></span>
      <span>User: <b>${escapeHtml(u.username)}</b></span>
      ${currentBranch==='all'?`<span>Branch: <b>${escapeHtml(branchLabel(u.branch))}</b></span>`:''}
    `;
  }

  select.addEventListener('change',draw);
  search.addEventListener('input',draw);
  draw();
}

function renderDashboard(){
  renderOverall();
  renderPerUserUsageChart();
  const sel = document.getElementById('dashDateSelect');
  const currentlyValid = uniqueDates().includes(sel.value);
  const preferredDate = currentlyValid ? sel.value : todayOrLatestDate();
  populateDashDateSelect(preferredDate);
  const date = sel.value || uniqueDates()[0];
  if(date !== dashboardLastDate){ selectedRowKeys.clear(); dashboardLastDate = date; }
  renderDailyTotals(date);
  // Always bind the host table to a date that actually has records.
  // This prevents an empty table when a saved/selected date is stale after a branch or data refresh.
  let activeDate = date;
  let rows = usage.filter(u=>u.date===activeDate).sort((a,b)=>b.bytesGB-a.bytesGB);
  if(!rows.length && usage.length){
    const fallbackDate = uniqueDates().find(d=>usage.some(u=>u.date===d));
    if(fallbackDate){
      activeDate = fallbackDate;
      sel.value = fallbackDate;
      if(activeDate !== dashboardLastDate){ selectedRowKeys.clear(); dashboardLastDate = activeDate; }
      rows = usage.filter(u=>u.date===activeDate).sort((a,b)=>b.bytesGB-a.bytesGB);
      renderDailyTotals(activeDate);
    }
  }
  const dateForRows = activeDate;
  const total = rows.reduce((s,r)=>s+r.bytesGB,0);
  const real = rows.filter(r=>r.ip!=='others');

  setStatValue(document.getElementById('statTotal'), fmtGB(total));
  setStatValue(document.getElementById('statHosts'), real.length);
  setStatValue(document.getElementById('statTop'), real[0] ? (deviceFor(real[0].ip)?.name || real[0].ip) : '—');

  const body = document.getElementById('dashTableBody');
  if(!rows.length){
    body.innerHTML = `<tr><td colspan="7"><div class="empty">No usage logged for this day yet.</div></td></tr>`;
    editingRowKey = null;
    selectedRowKeys.clear();
    updateRowSelectBar();
    return;
  }
  const maxVal = Math.max(...rows.map(r=>r.bytesGB), 0.01);
  body.innerHTML = rows.map(r=>{
    const dev = deviceFor(r.ip);
    const name = r.ip==='others' ? 'Other / unlisted hosts' : (dev?.name || '— unknown —');
    const pct = r.percent!=null ? r.percent.toFixed(2)+'%' : '—';
    const barPct = Math.min(100, (r.bytesGB/maxVal)*100);
    const rowKey = dateForRows+'|'+r.ip;

    if(editingRowKey === rowKey){
      return `<tr data-row-key="${rowKey}">
        <td></td>
        <td>${name}</td>
        <td class="mono muted">${r.ip==='others'?'—':r.ip}</td>
        <td><input type="text" class="edit-bytes" value="${r.bytesDisplay || fmtGB(r.bytesGB)}" style="padding:6px 8px; font-size:12.5px;"></td>
        <td><input type="number" step="0.01" class="edit-percent" value="${r.percent!=null?r.percent:''}" placeholder="%" style="padding:6px 8px; font-size:12.5px;"></td>
        <td style="white-space:nowrap;">
          <button class="btn small" data-save-key="${rowKey}" style="padding:6px 9px; margin-right:4px;">Save</button>
          <button class="btn ghost small" data-cancel-key="${rowKey}" style="padding:6px 9px;">✕</button>
        </td>
      </tr>`;
    }

    return `<tr data-row-key="${rowKey}">
      <td class="admin-action-col"><input type="checkbox" class="row-select admin-action" data-key="${rowKey}" ${selectedRowKeys.has(rowKey)?'checked':''}></td>
      <td><strong>${r.branch ? branchLabel(r.branch) : (currentBranch==='all' ? 'Unknown' : branchLabel(currentBranch))}</strong></td>
      <td>${name}</td>
      <td class="mono muted">${r.ip==='others'?'—':r.ip}</td>
      <td class="mono">${r.bytesDisplay || fmtGB(r.bytesGB)}</td>
      <td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:${barPct}%"></div></div><span class="mono muted" style="min-width:44px;text-align:right;">${pct}</span></div></td>
      <td style="white-space:nowrap;">
        <button class="btn ghost small admin-action" data-edit-key="${rowKey}" style="padding:6px 9px; margin-right:4px;">Edit</button>
        <button class="btn danger small admin-action" data-del-key="${rowKey}" style="padding:6px 9px;">✕</button>
      </td>
    </tr>`;
  }).join('');

  body.querySelectorAll('.row-select').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      if(cb.checked) selectedRowKeys.add(cb.dataset.key); else selectedRowKeys.delete(cb.dataset.key);
      updateRowSelectBar();
    });
  });
  updateRowSelectBar();

  body.querySelectorAll('button[data-edit-key]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ editingRowKey = btn.dataset.editKey; renderDashboard(); });
  });
  body.querySelectorAll('button[data-cancel-key]').forEach(btn=>{
    btn.addEventListener('click', ()=>{ editingRowKey = null; renderDashboard(); });
  });
  body.querySelectorAll('button[data-save-key]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const key = btn.dataset.saveKey;
      const tr = body.querySelector(`tr[data-row-key="${CSS.escape(key)}"]`);
      const newBytesDisplay = tr.querySelector('.edit-bytes').value.trim();
      const newPercentRaw = tr.querySelector('.edit-percent').value;
      if(!newBytesDisplay){ showToast('Usage value cannot be empty'); return; }

      const [rowDate, rowIp] = [date, key.slice(date.length+1)];
      const rec = usage.find(u => u.date===rowDate && u.ip===rowIp);
      if(!rec) return;
      const oldSummary = `${rec.bytesDisplay || fmtGB(rec.bytesGB)}${rec.percent!=null?' ('+rec.percent+'%)':''}`;
      rec.bytesDisplay = newBytesDisplay;
      rec.bytesGB = toGB(newBytesDisplay);
      rec.percent = newPercentRaw !== '' ? parseFloat(newPercentRaw) : null;
      const newSummary = `${rec.bytesDisplay}${rec.percent!=null?' ('+rec.percent+'%)':''}`;

      await saveUsage();
      const devName = deviceFor(rowIp)?.name || (rowIp==='others' ? 'Others' : rowIp);
      await logChange('Edited entry', `${rowDate} — ${devName}: ${oldSummary} → ${newSummary}`);
      editingRowKey = null;
      showToast('Entry updated ✓');
      renderSidebar();
      renderDashboard();
    });
  });
  body.querySelectorAll('button[data-del-key]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const key = btn.dataset.delKey;
      const rowIp = key.slice(date.length+1);
      const rec = usage.find(u => u.date===date && u.ip===rowIp);
      if(!rec) return;
      const devName = deviceFor(rowIp)?.name || (rowIp==='others' ? 'Others' : rowIp);
      const ok = confirm(`Remove ${devName}'s entry for ${date}? This can't be undone.`);
      if(!ok) return;
      usage = usage.filter(u => !(u.date===date && u.ip===rowIp));
      await saveUsage();
      selectedRowKeys.delete(key);
      await logChange('Deleted entry', `${date} — ${devName} (${rec.bytesDisplay || fmtGB(rec.bytesGB)}) removed`);
      showToast('Entry deleted');
      renderSidebar();
      renderDashboard();
    });
  });
}

function updateRowSelectBar(){
  const bar = document.getElementById('rowSelectBar');
  const count = document.getElementById('rowSelectCount');
  if(selectedRowKeys.size){
    bar.style.display = 'flex';
    count.textContent = `${selectedRowKeys.size} selected`;
  } else {
    bar.style.display = 'none';
  }
  const selectAll = document.getElementById('selectAllRows');
  const all = document.querySelectorAll('#dashTableBody .row-select');
  if(selectAll){
    selectAll.checked = all.length>0 && selectedRowKeys.size === all.length;
    selectAll.indeterminate = selectedRowKeys.size>0 && selectedRowKeys.size < all.length;
  }
}

document.getElementById('selectAllRows').addEventListener('change', (e)=>{
  const checked = e.target.checked;
  document.querySelectorAll('#dashTableBody .row-select').forEach(cb=>{
    cb.checked = checked;
    if(checked) selectedRowKeys.add(cb.dataset.key); else selectedRowKeys.delete(cb.dataset.key);
  });
  updateRowSelectBar();
});

document.getElementById('deleteSelectedRowsBtn').addEventListener('click', async ()=>{
  if(!selectedRowKeys.size) return;
  const date = document.getElementById('dashDateSelect').value;
  const keys = [...selectedRowKeys];
  const ok = confirm(`Delete ${keys.length} selected entr${keys.length>1?'ies':'y'} for ${date}? This can't be undone.`);
  if(!ok) return;
  const ips = keys.map(k => k.slice(date.length+1));
  const removed = usage.filter(u => u.date===date && ips.includes(u.ip));
  usage = usage.filter(u => !(u.date===date && ips.includes(u.ip)));
  await saveUsage();
  const names = removed.map(r => deviceFor(r.ip)?.name || (r.ip==='others'?'Others':r.ip)).join(', ');
  await logChange('Deleted entries', `${date} — ${removed.length} host(s) removed via multi-select: ${names}`);
  selectedRowKeys.clear();
  showToast(`${removed.length} entr${removed.length>1?'ies':'y'} deleted`);
  renderSidebar();
  renderDashboard();
});


/* ================= Application Usage — Firebase persistence =================
   Application Usage is stored in TWO layers:
   1) a daily Firebase record per branch/date, so a new day's upload is appended
      and never replaces older dates;
   2) the legacy branch aggregate key, kept for compatibility with the rest of
      the dashboard/export modules.
   This makes refresh/re-open safe even after many days of uploads. */
const APPUSAGE_DAILY_KEY = 'application-usage-daily';
const APPUSAGE_DATES_KEY = 'application-usage-dates';

function appUsageDailyKey(branch,date){
  return `${APPUSAGE_DAILY_KEY}::${branch}::${date}`;
}
function appUsageDatesKey(branch){
  return `${APPUSAGE_DATES_KEY}::${branch}`;
}
function normalizeAppUsageRows(rows, branch){
  return (Array.isArray(rows)?rows:[]).map(r=>({
    date:String(r?.date||''),
    branch:normalizeBranchId(r?.branch||branch),
    ip:String(r?.ip||''),
    app:String(r?.app||r?.application||'Other'),
    gb:Number(r?.gb)||0,
    hostName:String(r?.hostName||r?.hostname||r?.name||''),
    source:r?.source||'Application Usage',
    reportStatus:r?.reportStatus||''
  })).filter(r=>r.date && r.ip && r.app && r.gb>=0);
}

async function appUsageFirebaseRead(branch){
  if(!FIREBASE_ENABLED) throw new Error('Firebase is not enabled in this dashboard.');

  // Read the branch aggregate first. This is the single source of truth for
  // the Application Usage module and is what makes refresh/re-open reliable.
  // The daily records are an additional backup/index for date-wise viewing.
  let legacyRows=[];
  try{
    const legacyKey = `${APPUSAGE_KEY}::${branch}`;
    const legacyValue = await fbGet(legacyKey);
    let parsed = legacyValue;
    if(typeof parsed === 'string'){
      try{ parsed=JSON.parse(parsed); }catch(e){ parsed=[]; }
    }
    if(Array.isArray(parsed)) legacyRows=normalizeAppUsageRows(parsed,branch);
  }catch(e){
    console.warn('Application Usage aggregate read failed:',e);
  }

  // Also read date-wise Firebase records. If they exist, merge them with the
  // aggregate instead of blindly returning an empty/missing day. This protects
  // older uploads and prevents a refresh from making saved data disappear.
  let dailyRows=[];
  try{
    const idxRaw = await fbGet(appUsageDatesKey(branch));
    const dates = Array.isArray(idxRaw) ? idxRaw.map(String).filter(Boolean) : [];
    if(dates.length){
      window.__appDailyCache = window.__appDailyCache || new Map();
      const dayCache = window.__appDailyCache;
      const freshDays = new Set(dates.slice(-2)); // newest 2 days are always re-read
      const fetchDay = async date=>{
        const ck = branch+'::'+date;
        if(dayCache.has(ck) && !freshDays.has(date)) return dayCache.get(ck);
        try{
          const v=await fbGet(appUsageDailyKey(branch,date));
          const parsed=typeof v==='string' ? JSON.parse(v) : v;
          const rows=Array.isArray(parsed) ? parsed : [];
          dayCache.set(ck,rows);
          return rows;
        }catch(e){ return dayCache.get(ck) || []; }
      };
      const daily = [];
      for(let i=0;i<dates.length;i+=6){            // max 6 requests at a time
        daily.push(...await Promise.all(dates.slice(i,i+6).map(fetchDay)));
      }
      dailyRows=normalizeAppUsageRows(daily.flat(),branch);
    }
  }catch(e){
    console.warn('Daily Application Usage read failed:',e);
  }

  // Merge by Date + IP + Application. Prefer the daily copy when both exist,
  // but never discard an aggregate record merely because the daily index is
  // incomplete.
  const merged=new Map();
  legacyRows.forEach(r=>{
    const k=`${r.date}::${r.ip}::${String(r.app).trim().toLowerCase()}`;
    merged.set(k,r);
  });
  dailyRows.forEach(r=>{
    const k=`${r.date}::${r.ip}::${String(r.app).trim().toLowerCase()}`;
    merged.set(k,r);
  });
  const result=[...merged.values()].sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.ip).localeCompare(String(b.ip))||String(a.app).localeCompare(String(b.app)));
  if(result.length) markSyncOk();
  return result;
}

async function appUsageFirebaseWrite(branch, rows){
  if(!FIREBASE_ENABLED) throw new Error('Firebase is not enabled in this dashboard.');
  if(window.__appDailyCache) window.__appDailyCache.clear(); // data is changing, drop cached days
  const clean=normalizeAppUsageRows(rows,branch);

  // Preserve every existing Firebase date index. This prevents a new upload
  // from replacing the previous day's date when another browser/session has
  // already written data.
  let oldDates=[];
  try{
    const existing=await fbGet(appUsageDatesKey(branch));
    if(Array.isArray(existing)) oldDates=existing.map(String).filter(Boolean);
  }catch(e){}
  const dates=[...new Set([...oldDates,...clean.map(r=>r.date)])].sort();

  // Write each date separately. Existing dates remain untouched unless the
  // caller intentionally replaced records for that same date.
  await Promise.all(dates.map(async date=>{
    const dayRows=clean.filter(r=>r.date===date);
    if(dayRows.length) await fbSet(appUsageDailyKey(branch,date),dayRows);
  }));
  await fbSet(appUsageDatesKey(branch),dates);

  // Permanent branch aggregate used as the main refresh-safe source.
  const legacyKey=`${APPUSAGE_KEY}::${branch}`;
  await fbSet(legacyKey,clean);

  // Verify the actual Firebase data before reporting success.
  const verify=await fbGet(legacyKey);
  let verifyRows=verify;
  if(typeof verifyRows==='string'){
    try{ verifyRows=JSON.parse(verifyRows); }catch(e){ verifyRows=[]; }
  }
  const normalizedVerify=normalizeAppUsageRows(verifyRows,branch);
  if(!Array.isArray(verifyRows) || normalizedVerify.length!==clean.length){
    throw new Error(`Firebase verification failed for ${branchLabel(branch)} Application Usage.`);
  }
  markSyncOk();
  return normalizedVerify;
}
async function appUsageFirebaseReadAllBranches(){
  const out=[];
  for(const br of REPORT_BRANCHES){
    try{
      const rows=await appUsageFirebaseRead(br.id);
      out.push(...rows.map(r=>({...r,branch:br.id})));
    }catch(e){ console.warn('Application Usage Firebase read failed:',br.id,e); }
  }
  return out;
}

/* ================= Daily Usage Manager ================= */
let dmActiveTab = 'app';
/* App Usage tab loads its OWN data for the selected branch (independent of login branch) */
window.__dmApps = null;
function dmSourceApps(){ return Array.isArray(window.__dmApps) ? window.__dmApps : (Array.isArray(appUsage)?appUsage:[]); }
let __dmLoadSeq = 0;
async function dmReload(){
  const seq = ++__dmLoadSeq;
  const sel = document.getElementById('dmBranch')?.value || currentBranch || 'all';
  const ids = sel==='all' ? REPORT_BRANCHES.map(b=>b.id) : [normalizeBranchId(sel)];
  const st = document.getElementById('dmStatus');
  try{
    const out=[]; const devMap=new Map();
    for(const id of ids){
      try{ const rows=await appUsageFirebaseRead(id); out.push(...rows.map(r=>({...r,branch:id}))); }
      catch(e){ console.warn('dmReload read failed',id,e); }
      try{
        const devs=await dmReadBranch(DEVICE_KEY,id);
        (Array.isArray(devs)?devs:[]).forEach(d=>{
          const k=id+'|'+String(d?.ip||'').trim().toLowerCase();
          if(d?.ip && !devMap.has(k)) devMap.set(k,d);
        });
      }catch(e){ console.warn('dmReload device read failed',id,e); }
    }
    if(seq!==__dmLoadSeq) return;   // a newer branch selection won
    window.__dmApps = out;
    window.__dmDevMap = devMap;
  }catch(e){ console.error(e); }
  dmRefresh();
}

function dmEscape(v){
  return String(v ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function dmRowsForScope(){
  const branch = document.getElementById('dmBranch')?.value || currentBranch || 'all';
  const from = document.getElementById('dmFrom')?.value || '';
  const to = document.getElementById('dmTo')?.value || '';
  const q = String(document.getElementById('dmSearch')?.value || '').trim().toLowerCase();
  const selectedDate = String(document.getElementById('dmDateSelect')?.value || '');
  const branchOk = r => branch==='all' || normalizeBranchId(r.branch || currentBranch)===branch;
  const dateOk = r => (!from || String(r.date||'')>=from) && (!to || String(r.date||'')<=to) && (!selectedDate || String(r.date||'')===selectedDate);
  const textOk = (r, extra='') => !q || [r.ip,r.hostName,r.app,r.application,extra].filter(Boolean).join(' ').toLowerCase().includes(q);
  const hosts = (Array.isArray(usage)?usage:[]).filter(r=>branchOk(r)&&dateOk(r)&&textOk(r));
  const apps = dmSourceApps().filter(r=>branchOk(r)&&dateOk(r)&&textOk(r));
  return {hosts,apps,branch,from,to,q};
}
function dmHostName(ip, branch, row){
  if(String(ip||'').toLowerCase()==='others') return 'Others / unlisted';
  const direct=row?.hostName || row?.hostname || row?.name;
  if(direct && direct!=='Unmapped Host') return direct;
  const b=normalizeBranchId(branch || currentBranch);
  const ipKey=String(ip||'').trim().toLowerCase();
  const mapped=window.__dmDevMap instanceof Map ? window.__dmDevMap.get(b+'|'+ipKey) : null;
  if(mapped && (mapped.name || mapped.hostname)) return mapped.name || mapped.hostname;
  let d=null;
  if(b==='all') d=(Array.isArray(devices)?devices:[]).find(x=>String(x?.ip||'').trim().toLowerCase()===String(ip||'').trim().toLowerCase());
  else d=deviceFor(ip,b);
  return d?.name || d?.hostname || 'Host Name Not Mapped';
}
function dmBranchLabel(r){ return branchLabel(normalizeBranchId(r.branch || currentBranch)); }

async function dmReadBranch(base, branch){
  if(base===APPUSAGE_KEY) return await appUsageFirebaseRead(branch);
  const r=await store.get(`${base}::${branch}`, true).catch(()=>null);
  try{return r?.value ? JSON.parse(r.value) : [];}catch(e){return [];}
}
async function dmSaveBranch(base, branch, value){
  if(base===APPUSAGE_KEY){ await appUsageFirebaseWrite(branch,value); return; }
  await store.set(`${base}::${branch}`, JSON.stringify(value), true);
}

async function dmPersistImportedData(parsed){
  const branches=[...new Set(parsed.appRows.map(x=>normalizeBranchId(x.branch)))].filter(x=>REPORT_BRANCHES.some(b=>b.id===x));
  const summary={branches:[],hosts:0,apps:0,hostTotal:0,appTotal:0,dates:new Set()};
  for(const branch of branches){
    const incomingApps=parsed.appRows.filter(x=>normalizeBranchId(x.branch)===branch);
    const dates=new Set(incomingApps.map(x=>x.date));
    const oldApps=await dmReadBranch(APPUSAGE_KEY,branch);
    const appMap=new Map();
    (Array.isArray(oldApps)?oldApps:[]).forEach(r=>{
      const k=`${r.date||''}::${r.ip||''}::${String(r.app||'').trim().toLowerCase()}`;
      if(r.date && !dates.has(r.date)) appMap.set(k,r);
    });
    const appAgg=new Map();
    incomingApps.forEach(r=>{
      const k=`${r.date}::${r.ip}::${String(r.app||'').trim().toLowerCase()}`;
      appAgg.set(k,(appAgg.get(k)||0)+(Number(r.gb)||0));
    });
    for(const [k,gb] of appAgg){
      const [date,ip,appKey]=k.split('::');
      const src=incomingApps.find(x=>x.date===date && x.ip===ip && String(x.app||'').trim().toLowerCase()===appKey);
      appMap.set(k,{date,ip,app:src?.app||appKey,gb,branch,source:'Application Usage CSV',reportStatus:src?.reportStatus||''});
      summary.appTotal += gb;
      summary.apps++;
      summary.dates.add(date);
    }
    const newApps=[...appMap.values()].sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.ip).localeCompare(String(b.ip))||String(a.app).localeCompare(String(b.app)));
    await dmSaveBranch(APPUSAGE_KEY,branch,newApps);
    summary.branches.push(branch);
  }
  return summary;
}

/* ===== Application-only CSV (independent from Host Usage) =====
   Required columns : Date, Host (or IP), Application, App_Usage_GB
   Optional columns : Branch (defaults to the Branch selected on screen)
   Host_Usage_GB is NOT needed and is ignored here. */
function dmNormDate(v){
  v=String(v||'').trim(); if(!v) return '';
  let m=v.match(/^(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/); if(m) return `${m[1]}-${m[2].padStart(2,'0')}-${m[3].padStart(2,'0')}`;
  m=v.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})/); if(m) return `${m[3]}-${m[2].padStart(2,'0')}-${m[1].padStart(2,'0')}`;
  return '';
}
function dmParseAppCsv(text, selectedBranch){
  const lines=text.replace(/^\uFEFF/,'').split(/\r?\n/).filter(l=>l.trim());
  if(lines.length<2) return {error:'CSV is empty.'};
  const header=parseCSVLine(lines[0]).map(x=>String(x||'').trim().toLowerCase().replace(/[\s-]+/g,'_'));
  const find=(...names)=>{ for(const n of names){ const i=header.indexOf(n); if(i>=0) return i; } return -1; };
  const iDate=find('date'), iBranch=find('branch'), iHost=find('host','ip','host_ip','ip_address','source_ip'),
        iApp=find('application','app','app_name'), iGb=find('app_usage_gb','application_usage_gb','usage_gb','gb');
  const missing=[]; if(iDate<0) missing.push('Date'); if(iHost<0) missing.push('Host (or IP)'); if(iApp<0) missing.push('Application'); if(iGb<0) missing.push('App_Usage_GB');
  if(missing.length) return {error:'Missing column(s): '+missing.join(', ')+'. Required: Date, Host, Application, App_Usage_GB (Branch optional).'};
  const rows=[], otherBranches=new Set(); let skipped=0;
  for(let i=1;i<lines.length;i++){
    const c=parseCSVLine(lines[i]);
    const date=dmNormDate(c[iDate]), ip=String(c[iHost]||'').trim(), app=String(c[iApp]||'').trim(), gb=Number(String(c[iGb]||'').replace(/,/g,''));
    let br=selectedBranch;
    if(iBranch>=0 && String(c[iBranch]||'').trim()){ br=normalizeBranchId(c[iBranch]); }
    if(!date||!ip||!app||!Number.isFinite(gb)||gb<=0){ skipped++; continue; }
    if(br!==selectedBranch){ otherBranches.add(br); continue; }
    rows.push({date,branch:br,ip,app,gb,source:'Application Usage CSV'});
  }
  return {rows,skipped,otherBranches:[...otherBranches]};
}
function dmDownloadAppTemplate(){
  const csv='Date,Branch,Host,Application,App_Usage_GB\n2026-10-06,Bangalore,192.168.1.10,YouTube,1.25\n2026-10-06,Bangalore,192.168.1.10,Microsoft Teams,0.80\n';
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='application-usage-template.csv'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

async function dmUploadCsv(file){
  const status=document.getElementById('dmStatus');
  if(!file) return;
  if(window.FmtImport){
    const r=await window.FmtImport.run('app',file,(document.getElementById('dmFormatSelect')||{}).value==='table');
    if(r===null){ status.textContent='Upload cancelled.'; return; }
    if(typeof r==='string') file=new File([r],'application-usage-converted.csv',{type:'text/csv'});
  }
  try{
    const selected=normalizeBranchId(document.getElementById('dmBranch').value || currentBranch || 'all');
    if(selected==='all' || !REPORT_BRANCHES.some(b=>b.id===selected)){
      status.innerHTML='<span class="dm-danger">Select Chennai, Bangalore, or Hosur before uploading Application Usage.</span>'; return;
    }
    status.textContent='Reading CSV…';
    const parsed=dmParseAppCsv(await file.text(), selected);
    if(parsed.error){ status.innerHTML=`<span class="dm-danger">${dmEscape(parsed.error)}</span>`; return; }
    if(!parsed.rows.length){
      const extra=parsed.otherBranches.length ? ` This CSV is for ${parsed.otherBranches.map(branchLabel).join(', ')} — select that branch first.` : '';
      status.innerHTML=`<span class="dm-danger">No valid rows for ${dmEscape(branchLabel(selected))}.${dmEscape(extra)}</span>`; return;
    }
    // Saves ONLY application usage. Host usage and the device directory are not touched.
    const result=await dmPersistImportedData({appRows:parsed.rows});
    let note=`Saved to Firebase ✓ ${branchLabel(selected)} — ${result.apps} application rows, ${result.dates.size} day(s). Application total ${fmtGB(result.appTotal)}. Other dates were preserved.`;
    if(parsed.skipped) note+=` (${parsed.skipped} invalid row(s) skipped.)`;
    if(parsed.otherBranches.length) note+=` Rows for ${parsed.otherBranches.map(branchLabel).join(', ')} were ignored.`;
    status.innerHTML=`<span class="dm-status">${dmEscape(note)}</span>`;
    showToast('Application usage saved to Firebase');
    try{ await logChange('Application Usage import',`${branchLabel(selected)} — ${result.apps} application rows`); }catch(_){}
    // clear old From/To/search so freshly uploaded dates are visible
    const ds=parsed.rows.map(r=>r.date).sort();
    const f=document.getElementById('dmFrom'), t=document.getElementById('dmTo');
    if(f && f.value && ds[0]<f.value) f.value='';
    if(t && t.value && ds[ds.length-1]>t.value) t.value='';
    const sq=document.getElementById('dmSearch'); if(sq) sq.value='';
    await dmReload();
    try{ await loadState(); if(window.refreshAppDrilldown) window.refreshAppDrilldown(); }catch(_){}
  }catch(e){
    console.error(e);
    status.innerHTML=`<span class="dm-danger">Upload failed: ${dmEscape(e.message||e)}</span>`;
  }
}

let dmDailyAppChartInstance = null;
function dmRenderDateControls(allApps){
  const sel=document.getElementById('dmDateSelect');
  if(!sel) return;
  const prev=sel.value;
  const dates=[...new Set(allApps.map(r=>String(r.date||'').trim()).filter(Boolean))].sort().reverse();
  sel.innerHTML='<option value="">All Dates</option>'+dates.map(d=>`<option value="${dmEscape(d)}">${dmEscape(fmtDateHuman(d))}</option>`).join('');
  if(dates.includes(prev)) sel.value=prev;
}
function dmRenderDailyChart(allApps){
  const canvas=document.getElementById('dmDailyAppChart');
  if(!canvas || typeof Chart==='undefined') return;
  const daily={};
  allApps.forEach(r=>{const d=String(r.date||'').trim(); if(d) daily[d]=(daily[d]||0)+(Number(r.gb)||0);});
  const dates=Object.keys(daily).sort();
  const values=dates.map(d=>Number(daily[d].toFixed(4)));
  if(dmDailyAppChartInstance){dmDailyAppChartInstance.destroy();dmDailyAppChartInstance=null;}

  const light=window.__fiIsLight?window.__fiIsLight(canvas):document.body.classList.contains('light-theme');
  const txt=light?'#000000':'#e6edf7', grid=light?'rgba(15,23,42,.10)':'rgba(148,163,184,.14)';
  const txtFn=()=>((window.__fiIsLight?window.__fiIsLight(canvas):light)?'#000000':'#e6edf7');
  const n=values.length, total=values.reduce((a,b)=>a+b,0), avg=n?total/n:0;
  let maxI=0,minI=0; values.forEach((v,i)=>{ if(v>values[maxI])maxI=i; if(v<values[minI])minI=i; });
  const selected=String(document.getElementById('dmDateSelect')?.value||'');
  const short=d=>{const t=new Date(d+'T00:00:00'); return isNaN(t)?d:t.toLocaleDateString('en-GB',{day:'2-digit',month:'short'});};
  const labels=dates.map(short);
  const trend=values.map((_,i)=>{const s=Math.max(0,i-1),e=Math.min(n-1,i+1);let t=0,c=0;for(let k=s;k<=e;k++){t+=values[k];c++;}return Number((t/c).toFixed(3));});
  const fmt=v=>v>=1024?(v/1024).toFixed(2)+' TB':v.toFixed(1)+' GB';

  /* summary cards above the chart */
  let box=document.getElementById('dmChartStats');
  if(!box){ box=document.createElement('div'); box.id='dmChartStats'; canvas.parentNode.parentNode.insertBefore(box,canvas.parentNode); }
  box.innerHTML=[
    ['Total',fmt(total)],
    ['Daily average',fmt(avg)],
    ['Peak day',n?short(dates[maxI])+' · '+fmt(values[maxI]):'—'],
    ['Lowest day',n?short(dates[minI])+' · '+fmt(values[minI]):'—'],
    ['Days',String(n)]
  ].map((x,i)=>'<div class="dmcs c'+i+'"><span>'+x[0]+'</span><b>'+x[1]+'</b></div>').join('');

  /* gradient bars: blue/indigo normally, amber for the peak day, green for the selected day */
  const TONES={base:['#4f46e5','#38bdf8'],peak:['#f97316','#fde047'],sel:['#059669','#6ee7b7']};
  const grad=(chart,tone,dim)=>{
    const a=chart.chartArea; if(!a) return '#4C8DFF';
    chart.$gc=chart.$gc||{};
    const key=tone+(dim?'d':'')+'|'+a.top+'|'+a.bottom;
    if(chart.$gc[key]) return chart.$gc[key];
    const g=chart.ctx.createLinearGradient(0,a.bottom,0,a.top), c=TONES[tone];
    g.addColorStop(0,dim?c[0]+'55':c[0]); g.addColorStop(1,dim?c[1]+'55':c[1]);
    return (chart.$gc[key]=g);
  };
  const barColor=ctx=>{
    const i=ctx.dataIndex;
    if(selected) return grad(ctx.chart, dates[i]===selected?'sel':'base', dates[i]!==selected);
    return grad(ctx.chart, i===maxI?'peak':'base', false);
  };
  const peakPlugin={id:'dmPeak',afterDatasetsDraw(chart){
    if(!n||selected) return;
    const m=chart.getDatasetMeta(0).data[maxI]; if(!m) return;
    const c=chart.ctx; c.save(); c.font='600 11px Inter,sans-serif'; c.textAlign='center';
    c.fillStyle=light?'#c2410c':'#fcd34d';
    c.fillText('\u25B2 Peak '+values[maxI].toFixed(1)+' GB',Math.min(Math.max(m.x,64),chart.width-64),m.y-8);
    c.restore();
  }};

  dmDailyAppChartInstance=new Chart(canvas,{
    type:'bar',
    plugins:[peakPlugin],
    data:{labels,datasets:[
      {type:'bar',label:'Daily usage',data:values,backgroundColor:barColor,hoverBackgroundColor:barColor,
        borderRadius:{topLeft:9,topRight:9,bottomLeft:0,bottomRight:0},borderSkipped:false,
        maxBarThickness:42,categoryPercentage:.82,barPercentage:.86,order:2},
      {type:'line',label:'3-day trend',data:trend,borderColor:light?'#0891b2':'#22d3ee',borderWidth:2.5,
        tension:.4,pointRadius:0,pointHoverRadius:5,pointHoverBackgroundColor:'#fff',order:1},
      {type:'line',label:'Average '+avg.toFixed(1)+' GB',data:values.map(()=>avg),borderColor:'#f59e0b',
        borderDash:[6,6],borderWidth:1.5,pointRadius:0,pointHoverRadius:0,order:0}
    ]},
    options:{
      responsive:true,maintainAspectRatio:false,
      animation:{duration:700,easing:'easeOutQuart'},
      interaction:{mode:'index',intersect:false},
      layout:{padding:{top:20,right:6}},
      onClick:(e,els)=>{
        const el=els.find(x=>x.datasetIndex===0); if(!el) return;
        const d=dates[el.index], sel=document.getElementById('dmDateSelect'); if(!sel) return;
        sel.value=(sel.value===d)?'':d; sel.dispatchEvent(new Event('change'));
      },
      onHover:(e,els)=>{ if(e.native&&e.native.target) e.native.target.style.cursor=els.length?'pointer':'default'; },
      plugins:{
        legend:{position:'top',align:'end',labels:{color:txtFn,usePointStyle:true,pointStyle:'rectRounded',boxWidth:10,boxHeight:10,padding:16,font:{size:12}}},
        tooltip:{
          backgroundColor:'rgba(8,17,34,.96)',titleColor:'#ffffff',bodyColor:'#dbe7f7',footerColor:'#8fb4e8',
          borderColor:'rgba(120,170,255,.35)',borderWidth:1,padding:12,cornerRadius:10,boxPadding:4,
          filter:i=>i.datasetIndex!==2,
          callbacks:{
            title:items=>fmtDateHuman(dates[items[0].dataIndex]),
            label:c=>{
              if(c.datasetIndex===0){const v=c.parsed.y,d=avg?((v-avg)/avg*100):0; return ' Usage: '+v.toFixed(2)+' GB  ('+(d>=0?'+':'')+d.toFixed(0)+'% vs avg)';}
              return ' Trend: '+c.parsed.y.toFixed(2)+' GB';
            },
            footer:items=>{const i=items[0].dataIndex,rank=[...values].sort((a,b)=>b-a).indexOf(values[i])+1; return 'Rank '+rank+' of '+n+' days \u00B7 click bar to select';}
          }
        }
      },
      scales:{
        x:{grid:{display:false},border:{display:false},ticks:{color:txtFn,maxRotation:50,minRotation:0,autoSkipPadding:10,font:{size:11}}},
        y:{beginAtZero:true,grace:'8%',border:{display:false},grid:{color:grid,drawTicks:false},ticks:{color:txtFn,padding:8,callback:v=>v+' GB'}}
      }
    }
  });
}

function dmRenderDailySummary(allApps){
  const body=document.getElementById('dmDailyBody');
  if(!body) return;
  const byDate={};
  allApps.forEach(r=>{
    const d=String(r.date||'').trim(); if(!d) return;
    const br=normalizeBranchId(r.branch||currentBranch);
    const app=String(r.app||'Other').trim()||'Other';
    byDate[d] ||= {branches:new Set(),total:0,records:0,apps:{}};
    byDate[d].branches.add(br); byDate[d].total += Number(r.gb)||0; byDate[d].records++; byDate[d].apps[app]=(byDate[d].apps[app]||0)+(Number(r.gb)||0);
  });
  const rows=Object.entries(byDate).sort((a,b)=>b[0].localeCompare(a[0]));
  body.innerHTML=rows.length ? rows.map(([date,v])=>{
    const top=Object.entries(v.apps).sort((a,b)=>b[1]-a[1])[0];
    const branches=[...v.branches].map(branchLabel).join(', ');
    return `<tr><td>${dmEscape(fmtDateHuman(date))}</td><td>${dmEscape(branches)}</td><td class="mono">${dmEscape(fmtGB(v.total))}</td><td>${v.records}</td><td>${dmEscape(top?`${top[0]} — ${fmtGB(top[1])}`:'—')}</td></tr>`;
  }).join('') : '<tr><td colspan="5"><div class="dm-empty">No application usage found for the selected filters.</div></td></tr>';
}

function dmRefresh(){
  const pill=document.getElementById('dmBranchPill');
  if(pill) pill.textContent=branchLabel(document.getElementById('dmBranch')?.value || currentBranch);
  const branch=(document.getElementById('dmBranch')?.value || currentBranch || 'all');
  const from=document.getElementById('dmFrom')?.value || '';
  const to=document.getElementById('dmTo')?.value || '';
  const q=String(document.getElementById('dmSearch')?.value || '').trim().toLowerCase();
  const branchOk=r=>branch==='all' || normalizeBranchId(r.branch||currentBranch)===branch;
  const rangeOk=r=>(!from||String(r.date||'')>=from)&&(!to||String(r.date||'')<=to);
  const textOk=(r)=>!q || [r.ip,r.hostName,r.app,r.application].filter(Boolean).join(' ').toLowerCase().includes(q);
  const allApps=dmSourceApps().filter(r=>branchOk(r)&&rangeOk(r)&&textOk(r));
  dmRenderDateControls(allApps);
  const selectedDate=String(document.getElementById('dmDateSelect')?.value || '');
  const {hosts,apps}=dmRowsForScope();
  const appTotal=apps.reduce((s,r)=>s+(Number(r.gb)||0),0);
  const dmStatus=document.getElementById('dmStatus');
  if(dmStatus && __syncIsFallback){
    dmStatus.innerHTML='<span class="dm-danger">⚠ Firebase connection is offline. Data is NOT deleted; reconnect to load saved Application Usage from Firebase.</span>';
  }
  const allFilteredTotal=allApps.reduce((s,r)=>s+(Number(r.gb)||0),0);
  const selectedDayTotal=selectedDate ? allApps.filter(r=>String(r.date||'')===selectedDate).reduce((s,r)=>s+(Number(r.gb)||0),0) : 0;
  const days=new Set(allApps.map(r=>r.date).filter(Boolean)).size;
  const hostTotalEl=document.getElementById('dmHostTotal');
  const appTotalEl=document.getElementById('dmAppTotal');
  const gapTotalEl=document.getElementById('dmGapTotal');
  if(hostTotalEl) hostTotalEl.textContent='—';
  if(appTotalEl) appTotalEl.textContent=fmtGB(selectedDate ? selectedDayTotal : allFilteredTotal);
  if(gapTotalEl) gapTotalEl.textContent='—';
  const selectedDayEl=document.getElementById('dmSelectedDayTotal');
  if(selectedDayEl) selectedDayEl.textContent=selectedDate ? fmtGB(selectedDayTotal) : 'Select a date';
  document.getElementById('dmDayCount').textContent=String(days);
  dmRenderDailyChart(allApps);
  dmRenderDailySummary(allApps);

  const hb=document.getElementById('dmHostBody');
  hb.innerHTML=hosts.length ? [...hosts].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.bytesGB)-Number(a.bytesGB)).map(r=>{
    const br=normalizeBranchId(r.branch||currentBranch); const name=dmHostName(r.ip,br,r);
    return `<tr><td>${dmEscape(fmtDateHuman(r.date))}</td><td>${dmEscape(branchLabel(br))}</td><td><input class="dm-host-name" data-dm-host-name="1" data-branch="${dmEscape(br)}" data-ip="${dmEscape(r.ip)}" value="${dmEscape(name==='Host Name Not Mapped'?'':name)}" placeholder="Enter host name"></td><td class="mono">${dmEscape(r.ip)}</td><td class="mono">${dmEscape(fmtGB(r.bytesGB))}</td><td>${r.reportStatus?dmEscape(r.reportStatus):'<span class="dm-status">Saved</span>'}</td></tr>`;
  }).join('') : '<tr><td colspan="6"><div class="dm-empty">No host usage found for the selected filter.</div></td></tr>';

  const ab=document.getElementById('dmAppBody');
  ab.innerHTML=apps.length ? [...apps].sort((a,b)=>String(b.date).localeCompare(String(a.date))||Number(b.gb)-Number(a.gb)).map(r=>{
    const br=normalizeBranchId(r.branch||currentBranch); const name=dmHostName(r.ip,br,r);
    return `<tr><td>${dmEscape(fmtDateHuman(r.date))}</td><td>${dmEscape(branchLabel(br))}</td><td>${dmEscape(name)}</td><td class="mono">${dmEscape(r.ip||'—')}</td><td>${dmEscape(r.app||'Other')}</td><td class="mono">${dmEscape(fmtGB(r.gb))}</td></tr>`;
  }).join('') : '<tr><td colspan="6"><div class="dm-empty">No application usage found for the selected filter.</div></td></tr>';

  document.getElementById('dmHostPanel').style.display=dmActiveTab==='host'?'':'none';
  document.getElementById('dmAppPanel').style.display=dmActiveTab==='app'?'':'none';
  document.getElementById('dmTabHost').classList.toggle('active',dmActiveTab==='host');
  document.getElementById('dmTabApp').classList.toggle('active',dmActiveTab==='app');
}

async function dmSaveHostNames(){
  const inputs=[...document.querySelectorAll('#dmHostBody [data-dm-host-name]')];
  const groups={};
  inputs.forEach(inp=>{
    const branch=normalizeBranchId(inp.dataset.branch); const ip=String(inp.dataset.ip||'').trim(); const name=String(inp.value||'').trim();
    if(!branch || !ip || !name || !REPORT_BRANCHES.some(b=>b.id===branch)) return;
    (groups[branch] ||= []).push({ip,name});
  });
  let changed=0;
  for(const [branch,items] of Object.entries(groups)){
    const devs=await dmReadBranch(DEVICE_KEY,branch); const arr=Array.isArray(devs)?devs:[];
    for(const item of items){
      let d=arr.find(x=>String(x?.ip||'').trim()===item.ip);
      if(!d){d={name:item.name,mac:'—',ip:item.ip,username:''};arr.push(d);} else if(d.name!==item.name){d.name=item.name;}
      changed++;
    }
    // Keep the Application Usage records self-contained as well, so the
    // host name remains visible even after a full browser refresh.
    const appRows = await appUsageFirebaseRead(branch);
    let appChanged = false;
    appRows.forEach(r=>{
      const match = items.find(item=>String(item.ip)===String(r.ip));
      if(match && r.hostName !== match.name){ r.hostName = match.name; appChanged = true; }
    });
    await dmSaveBranch(DEVICE_KEY,branch,arr);
    if(appChanged) await appUsageFirebaseWrite(branch,appRows);
  }
  if(changed){showToast('Host names saved to Firebase');await loadState();await dmReload();renderHostDashboard();}
  else showToast('Enter a host name before saving');
}

function dmExportRows(){
  const {hosts,apps}=dmRowsForScope();
  const hostRows=hosts.map(r=>({Date:r.date,Branch:branchLabel(normalizeBranchId(r.branch||currentBranch)),'Host Name':dmHostName(r.ip,r.branch,r),'IP Address':r.ip,'Usage GB':Number(r.bytesGB)||0,Status:r.reportStatus||'Saved'}));
  const appRows=apps.map(r=>({Date:r.date,Branch:branchLabel(normalizeBranchId(r.branch||currentBranch)),'Host Name':dmHostName(r.ip,r.branch,r),'IP Address':r.ip,Application:r.app,'Usage GB':Number(r.gb)||0}));
  return {hostRows,appRows};
}
function dmDownloadExcel(kind){
  const {hostRows,appRows}=dmExportRows();
  const wb=XLSX.utils.book_new();
  if(kind==='host' || kind==='combined') XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(hostRows),'Host Usage');
  if(kind==='app' || kind==='combined') XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(appRows),'Application Usage');
  const scope=(document.getElementById('dmBranch')?.value||currentBranch||'all');
  XLSX.writeFile(wb,`daily-usage-${scope}-${todayISO()}.xlsx`);
}
async function dmClearAllAppData(){
  if(!currentUser || currentUser.role!=='administrator'){ showToast('Only Administrator can clear saved Application Usage data'); return; }
  const sel = document.getElementById('dmBranch')?.value || currentBranch || 'all';
  const ids = sel==='all' ? REPORT_BRANCHES.map(b=>b.id) : [normalizeBranchId(sel)];
  const scopeLabel = sel==='all' ? 'ALL branches (Chennai, Bangalore, Hosur)' : branchLabel(sel);
  const inScope = r => ids.includes(normalizeBranchId(r.branch || currentBranch));
  const before = dmSourceApps().filter(inScope).length;
  const typed = prompt(
    `This permanently deletes ALL saved Application Usage data (every day, every IP, every application) for ${scopeLabel} from Firebase.\n\n`+
    `Host usage data and the device directory are NOT touched.\n`+
    `Tip: click "App Excel" first if you want a backup.\n\n`+
    `${before} record(s) loaded now. This cannot be undone.\n\nType CLEAR to confirm:`);
  if(typed===null) return;
  if(String(typed).trim().toUpperCase()!=='CLEAR'){ showToast('Cancelled — you must type CLEAR'); return; }

  const btn=document.getElementById('dmClearAppBtn'), status=document.getElementById('dmStatus');
  if(btn){btn.disabled=true;btn.textContent='Clearing…';}
  const failed=[];
  try{
    for(const id of ids){
      // collect every date that has a daily record (Firebase index + what is loaded in memory)
      let dates=[];
      try{ const d=await fbGet(appUsageDatesKey(id)); if(Array.isArray(d)) dates=d.map(String).filter(Boolean); }catch(e){}
      (Array.isArray(appUsage)?appUsage:[]).forEach(r=>{ if(normalizeBranchId(r.branch||currentBranch)===id && r.date) dates.push(String(r.date)); });
      dates=[...new Set(dates)];
      await Promise.all(dates.map(d=>fbDelete(appUsageDailyKey(id,d)).catch(e=>failed.push(`${id} ${d}`))));
      try{ await fbDelete(appUsageDatesKey(id)); }catch(e){ failed.push(`${id} date index`); }
      try{ await fbDelete(`${APPUSAGE_KEY}::${id}`); }catch(e){ failed.push(`${id} main record`); }
    }
    if(window.__appDailyCache) window.__appDailyCache.clear();

    // verify against Firebase before claiming success
    let remaining=0;
    for(const id of ids){ try{ remaining += (await appUsageFirebaseRead(id)).length; }catch(e){ failed.push(`${id} verify`); } }
    if(failed.length || remaining){
      throw new Error(remaining ? `${remaining} record(s) are still in Firebase` : `could not delete: ${failed.slice(0,4).join(', ')}`);
    }
    appUsage = (Array.isArray(appUsage)?appUsage:[]).filter(r=>!inScope(r));
    const sd=document.getElementById('dmDateSelect'); if(sd) sd.value='';
    if(status) status.textContent=`All saved Application Usage data for ${scopeLabel} was cleared.`;
    showToast('Application Usage data cleared');
    try{ await logChange('Cleared Application Usage', `${before} record(s) deleted for ${scopeLabel}`); }catch(e){}
  }catch(e){
    console.error('Clear Application Usage failed',e);
    if(status) status.innerHTML=`<span class="dm-danger">Clear failed: ${dmEscape(e.message||e)}. Nothing was removed from this screen — try again.</span>`;
    showToast('Clear failed — see message');
    // reload truth from Firebase so the screen matches what is actually saved
    try{
      const fresh=[]; for(const id of ids){ const rows=await appUsageFirebaseRead(id); fresh.push(...rows.map(r=>({...r,branch:id}))); }
      appUsage=[...(Array.isArray(appUsage)?appUsage:[]).filter(r=>!inScope(r)),...fresh];
    }catch(_){}
  }finally{
    if(btn){btn.disabled=false;btn.textContent='🗑 Clear All Saved Data';}
    await dmReload();
    try{ if(typeof refreshAppDrilldown==='function') refreshAppDrilldown(); }catch(_){}
    try{ if(typeof renderHostDashboard==='function') renderHostDashboard(); }catch(_){}
  }
}
function dmInit(){
  const root=document.getElementById('view-dailymanager'); if(!root || root.dataset.bound) return; root.dataset.bound='1';
  const branchSel=document.getElementById('dmBranch');
  if(branchSel){branchSel.value=currentBranch; if(currentUser?.role==='administrator') branchSel.disabled=false; else branchSel.disabled=true; branchSel.addEventListener('change',dmReload);}
  ['dmFrom','dmTo','dmSearch'].forEach(id=>document.getElementById(id)?.addEventListener('input',dmRefresh));
  document.getElementById('dmDateSelect')?.addEventListener('change',dmRefresh);
  document.querySelectorAll('[data-dm-tab]').forEach(btn=>btn.addEventListener('click',()=>{dmActiveTab=btn.dataset.dmTab;dmRefresh();}));
  document.getElementById('dmUploadBtn')?.addEventListener('click',()=>document.getElementById('dmCsvInput')?.click());
  document.getElementById('dmCsvInput')?.addEventListener('change',async e=>{await dmUploadCsv(e.target.files?.[0]);e.target.value='';});
  document.getElementById('dmSaveNamesBtn')?.addEventListener('click',dmSaveHostNames);
  document.getElementById('dmHostExcelBtn')?.addEventListener('click',()=>dmDownloadExcel('host'));
  document.getElementById('dmAppExcelBtn')?.addEventListener('click',()=>dmDownloadExcel('app'));
  document.getElementById('dmTemplateBtn')?.addEventListener('click',dmDownloadAppTemplate);
  document.getElementById('dmClearAppBtn')?.addEventListener('click',dmClearAllAppData);
  document.getElementById('dmCombinedExcelBtn')?.addEventListener('click',()=>dmDownloadExcel('combined'));
  dmReload();
}
setTimeout(dmInit,0);
window.refreshDailyUsageManager=dmReload;

/* ================= host usage dashboard ================= */
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function pad2(n){ return String(n).padStart(2,'0'); }
function fmtDateHuman(iso){
  if(!iso) return '—';
  const [y,m,d] = iso.split('-');
  return `${d}-${MONTH_ABBR[parseInt(m,10)-1]}-${y}`;
}
function uniqueUsernames(){
  return [...new Set(devices.map(d=>d.username).filter(Boolean))].sort();
}

function populateHostDashSelects(){
  const hostSel = document.getElementById('hdHost');
  const userSel = document.getElementById('hdUsername');
  if(!hostSel) return;

  const prevHost = hostSel.value, prevUser = userSel.value;
  // hdHost is a free-text search box. Keep the user's search text intact.
  hostSel.value = prevHost;

  userSel.innerHTML = `<option value="">All usernames</option>` + uniqueUsernames().map(u=>
    `<option value="${u}">${u}</option>`
  ).join('');
  userSel.value = uniqueUsernames().includes(prevUser) ? prevUser : '';

  const yearSel = document.getElementById('hdYear');
  const years = new Set([new Date().getFullYear()]);
  usage.forEach(u=>{ if(u.date) years.add(parseInt(u.date.slice(0,4),10)); });
  appUsage.forEach(a=>{ if(a.date) years.add(parseInt(a.date.slice(0,4),10)); });
  const sortedYears = [...years].sort((a,b)=>b-a);
  const prevYear = yearSel.value;
  yearSel.innerHTML = sortedYears.map(y=>`<option value="${y}">${y}</option>`).join('');
  yearSel.value = sortedYears.includes(parseInt(prevYear,10)) ? prevYear : String(new Date().getFullYear());
}

function hostDashIpFilter(){
  const hostQuery = String(document.getElementById('hdHost').value || '').trim().toLowerCase();
  const username = document.getElementById('hdUsername').value;
  if(hostQuery){
    // Search the device directory AND the actual usage data. This allows an IP
    // to return its real usage even when the device directory has no matching host.
    const matched = new Set();
    devices.forEach(d=>{
      const haystack = [d.name,d.ip,d.mac,d.username].filter(Boolean).join(' ').toLowerCase();
      if(haystack.includes(hostQuery) && d.ip) matched.add(String(d.ip));
    });
    usage.forEach(u=>{
      const ip = String(u.ip || '').toLowerCase();
      if(ip && ip.includes(hostQuery)) matched.add(String(u.ip));
    });
    appUsage.forEach(a=>{
      const ip = String(a.ip || '').toLowerCase();
      if(ip && ip.includes(hostQuery)) matched.add(String(a.ip));
    });
    return [...matched];
  }
  if(username) return devices.filter(d=>d.username===username).map(d=>d.ip);
  return null; // no filter = every host
}

let netOverviewChart = null;
let netOverviewBound = false;

async function renderNetworkOverviewCard(){
  const card = document.getElementById('networkOverviewCard');
  if(!card) return;

  // Use the already-loaded shared state instead of issuing another 6 Firebase reads.
  const byId = id => ({usage: usage.filter(r=>String(r.branch||currentBranch)===id).reduce((sum,r)=>sum+(Number(r.bytesGB)||0),0)});
  const chennai = byId('chennai').usage || 0;
  const bangalore = byId('bangalore').usage || 0;
  const hosur = byId('hosur').usage || 0;
  const overall = chennai + bangalore + hosur;

  const scopedTotal = netOverviewScope === 'all' ? overall : byId(netOverviewScope).usage || 0;
  setStatValue(document.getElementById('netOverallTotal'), fmtGBorTB(scopedTotal));
  setStatValue(document.getElementById('netChennaiUsage'), fmtGBorTB(chennai));
  setStatValue(document.getElementById('netBangaloreUsage'), fmtGBorTB(bangalore));
  setStatValue(document.getElementById('netHosurUsage'), fmtGBorTB(hosur));

  const scopeLabel = netOverviewScope === 'all' ? 'All branches' : branchLabel(netOverviewScope);
  const title = card.querySelector('.network-card-head h3');
  const hint = card.querySelector('.network-card-head .hint');
  const totalLabel = card.querySelector('.network-card-total .l');
  if(title) title.textContent = `⦿ Network Usage — ${scopeLabel}`;
  if(hint) hint.textContent = netOverviewScope === 'all'
    ? 'Chennai, Bangalore & Hosur combined. Click a branch below to view only that branch.'
    : `${scopeLabel} selected. Click All branches above to return to the combined total.`;
  if(totalLabel) totalLabel.textContent = netOverviewScope === 'all' ? 'Total · 3 branches' : `Total · ${scopeLabel}`;

  document.querySelectorAll('#networkOverviewCard .net-branch-stat').forEach(el=>{
    el.classList.toggle('net-selected', el.dataset.netBranch === netOverviewScope);
    el.setAttribute('aria-pressed', el.dataset.netBranch === netOverviewScope ? 'true' : 'false');
  });

  const toggle = document.getElementById('networkOverviewToggle');
  if(toggle && !netOverviewBound){
    netOverviewBound = true;
    const flip = ()=>{
      const isExpanded = card.classList.toggle('expanded');
      toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      if(isExpanded) drawNetOverviewChart();
    };
    toggle.addEventListener('click', e=>{
      if(e.target.closest('.net-branch-stat')) return;
      flip();
    });
    toggle.addEventListener('keydown', e=>{
      if(e.key==='Enter' || e.key===' '){ e.preventDefault(); flip(); }
    });

    card.querySelectorAll('.net-branch-stat').forEach(el=>el.addEventListener('click', async e=>{
      e.stopPropagation();
      netOverviewScope = el.dataset.netBranch || 'all';
      await renderNetworkOverviewCard();
    }));
  }

  // Click the header text/total area to reset to all branches when a branch is selected.
  if(!card.dataset.allResetBound){
    card.dataset.allResetBound='1';
    const head=card.querySelector('.network-card-head');
    head?.addEventListener('dblclick', async ()=>{
      if(netOverviewScope !== 'all'){
        netOverviewScope='all';
        await renderNetworkOverviewCard();
      }
    });
  }

  if(card.classList.contains('expanded')) drawNetOverviewChart();
}
function drawNetOverviewChart(){
  const canvas = document.getElementById('netOverviewTrendChart');
  if(!canvas || typeof Chart==='undefined') return;
  if(netOverviewChart){ netOverviewChart.destroy(); netOverviewChart=null; }
  const gridColor=getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#253248';
  const textColor=getComputedStyle(document.documentElement).getPropertyValue('--muted').trim() || '#8794A8';
  netOverviewChart=new Chart(canvas,{
    type:'line',
    data:{labels:firewallTrend.labels,datasets:[
      {label:'Chennai',data:firewallTrend.chennai,borderColor:'#4C8DFF',backgroundColor:'rgba(76,141,255,.08)',fill:true,tension:.35,pointRadius:0,borderWidth:2},
      {label:'Bangalore',data:firewallTrend.bangalore,borderColor:'#F5A623',backgroundColor:'rgba(245,166,35,.08)',fill:true,tension:.35,pointRadius:0,borderWidth:2},
      {label:'Hosur',data:firewallTrend.hosur,borderColor:'#52E3B0',backgroundColor:'rgba(82,227,176,.08)',fill:true,tension:.35,pointRadius:0,borderWidth:2}
    ]},
    options:{responsive:true,maintainAspectRatio:false,animation:{duration:900,easing:'easeOutCubic'},plugins:{legend:{position:'top',align:'start',labels:{color:textColor,boxWidth:10,font:{size:11}}}},scales:{x:{grid:{display:false},ticks:{color:textColor}},y:{grid:{color:gridColor},ticks:{color:textColor},beginAtZero:true}}}
  });
}


function renderDailyDateDrilldown(filteredUsage){
  const fromEl = document.getElementById('hdFromDate');
  const toEl = document.getElementById('hdToDate');
  const usageEl = document.getElementById('hdSelectedDayUsage');
  const recordsEl = document.getElementById('hdSelectedDayRecords');
  const labelEl = document.getElementById('hdSelectedDayLabel');
  const titleEl = document.getElementById('hdSelectedDateTitle');
  const badgeEl = document.getElementById('hdSelectedDateBadge');
  const bodyEl = document.getElementById('hdDailyRecordsBody');
  if(!fromEl || !toEl || !usageEl || !recordsEl || !bodyEl) return;

  const availableDates = [...new Set((filteredUsage || []).map(u=>u.date).filter(Boolean))].sort();
  const fallbackDate = availableDates[availableDates.length-1] || todayISO();

  if(!fromEl.value) fromEl.value = fallbackDate;
  if(!toEl.value) toEl.value = fromEl.value || fallbackDate;

  // Keep the range valid when the user changes either side.
  if(fromEl.value && toEl.value && fromEl.value > toEl.value){
    if(document.activeElement === fromEl) toEl.value = fromEl.value;
    else fromEl.value = toEl.value;
  }

  const from = fromEl.value || fallbackDate;
  const to = toEl.value || from;

  const rows = (filteredUsage || []).filter(u => {
    if(!u.date) return false;
    return u.date >= from && u.date <= to;
  });

  const total = rows.reduce((sum,u)=>sum + Number(u.bytesGB || 0), 0);
  setStatValue(usageEl, fmtGB(total));
  setStatValue(recordsEl, rows.length);

  const isSingleDay = from === to;
  labelEl.textContent = isSingleDay ? 'Selected day usage' : 'Selected date range usage';
  titleEl.textContent = isSingleDay
    ? `Usage details for ${fmtDateHuman(from)}`
    : `Usage details from ${fmtDateHuman(from)} to ${fmtDateHuman(to)}`;
  badgeEl.textContent = isSingleDay ? fmtDateHuman(from) : `${fmtDateHuman(from)} → ${fmtDateHuman(to)}`;

  if(!rows.length){
    bodyEl.innerHTML = `<tr><td colspan="5"><div class="daily-empty">No usage data recorded for the selected date${isSingleDay ? '' : ' range'}.</div></td></tr>`;
    return;
  }

  const sortedRows = [...rows].sort((a,b)=>{
    const dateCmp = String(b.date).localeCompare(String(a.date));
    if(dateCmp) return dateCmp;
    return Number(b.bytesGB || 0) - Number(a.bytesGB || 0);
  });

  bodyEl.innerHTML = sortedRows.map(u=>{
    const rowBranch = u.branch || currentBranch;
    const dev = devices.find(d => String(d.ip) === String(u.ip) &&
      (!d.branch || !rowBranch || String(d.branch) === String(rowBranch))) ||
      deviceFor(u.ip);
    const host = u.ip === 'others' ? 'Others / unlisted' : (dev?.name || u.host || 'Unknown');
    const username = u.ip === 'others' ? '—' : (dev?.username || '—');
    const ip = u.ip || '—';

    return `<tr>
      <td><strong>${dailyEscapeHtml(host)}</strong>${!isSingleDay ? `<div class="hint" style="margin:2px 0 0;">${dailyEscapeHtml(fmtDateHuman(u.date))}</div>` : ''}</td>
      <td class="mono">${dailyEscapeHtml(ip)}</td>
      <td class="muted">${dailyEscapeHtml(username)}</td>
      <td><strong>${dailyEscapeHtml(rowBranch === 'unknown' ? 'Unknown' : branchLabel(rowBranch))}</strong></td>
      <td class="mono">${dailyEscapeHtml(u.bytesDisplay || fmtGB(u.bytesGB || 0))}</td>
    </tr>`;
  }).join('');
}

function renderHostDashboard(){
  const hdHostEl = document.getElementById('hdHost');
  if(!hdHostEl) return;
  populateHostDashSelects();
  renderNetworkOverviewCard();

  const hostQuery = String(hdHostEl.value || '').trim().toLowerCase();
  const ipFilter = hostDashIpFilter();
  const matchedHosts = hostQuery ? devices.filter(d=>[d.name,d.ip,d.mac,d.username].filter(Boolean).join(' ').toLowerCase().includes(hostQuery)) : [];
  const exactHost = matchedHosts.length===1 ? matchedHosts[0] : null;
  const matchedUsageRows = hostQuery ? usage.filter(u => ipFilter && ipFilter.includes(String(u.ip))) : [];
  const usageBranch = [...new Set(matchedUsageRows.map(u=>u.branch).filter(Boolean))];
  document.getElementById('hdBranch').value = hostQuery
    ? (exactHost?.branch ? branchLabel(exactHost.branch)
      : (usageBranch.length===1 ? branchLabel(usageBranch[0])
        : (usageBranch.length>1 ? 'Multiple branches' : (currentBranch==='all' ? 'No matching branch' : branchLabel(currentBranch)))))
    : '—';

  const filteredUsage = usage.filter(u => !ipFilter || ipFilter.includes(String(u.ip)));

  // date picker -> day/range details
  renderDailyDateDrilldown(filteredUsage);

  // per-day totals (a "day" combines every matching host's usage on that date)
  const dailyTotals = {};
  filteredUsage.forEach(u=>{ dailyTotals[u.date] = (dailyTotals[u.date]||0) + u.bytesGB; });
  const dates = Object.keys(dailyTotals).sort();
  const total = dates.reduce((s,d)=>s+dailyTotals[d],0);
  const days = dates.length;
  const avg = days ? total/days : 0;
  const high = days ? Math.max(...dates.map(d=>dailyTotals[d])) : 0;
  const low = days ? Math.min(...dates.map(d=>dailyTotals[d])) : 0;

  setStatValue(document.getElementById('hdTotal'), fmtGB(total));
  setStatValue(document.getElementById('hdDays'), days);
  setStatValue(document.getElementById('hdAvg'), fmtGB(avg));
  setStatValue(document.getElementById('hdHigh'), fmtGB(high));
  setStatValue(document.getElementById('hdLow'), fmtGB(low));
  setStatValue(document.getElementById('hdFirst'), days ? fmtDateHuman(dates[0]) : '—');
  setStatValue(document.getElementById('hdLast'), days ? fmtDateHuman(dates[dates.length-1]) : '—');

  // year / month drill-down
  const year = document.getElementById('hdYear').value;
  const month = document.getElementById('hdMonth').value;
  const yearMonthPrefix = `${year}-${pad2(month)}`;
  const yearPrefix = `${year}-`;
  const yearMonthTotal = dates.filter(d=>d.startsWith(yearMonthPrefix)).reduce((s,d)=>s+dailyTotals[d],0);
  const yearTotal = dates.filter(d=>d.startsWith(yearPrefix)).reduce((s,d)=>s+dailyTotals[d],0);
  setStatValue(document.getElementById('hdYearMonth'), fmtGB(yearMonthTotal));
  setStatValue(document.getElementById('hdYearOnly'), fmtGB(yearTotal));

  const monthlyBody = document.getElementById('hdMonthlyBody');
  monthlyBody.innerHTML = MONTH_ABBR.map((label,i)=>{
    const prefix = `${year}-${pad2(i+1)}`;
    const monthTotal = dates.filter(d=>d.startsWith(prefix)).reduce((s,d)=>s+dailyTotals[d],0);
    return `<tr><td>${label}</td><td class="mono">${fmtGB(monthTotal)}</td></tr>`;
  }).join('');

  // application breakdown — keep the IP visible so each application usage row
  // can be traced back to the actual firewall source IP. The chart still aggregates
  // by application, while the table shows Branch + IP + Application + usage.
  const brkFrom = (document.getElementById('appBrkFrom')||{}).value || '';
  const brkTo   = (document.getElementById('appBrkTo')||{}).value || '';
  const brkByDay = true;
  const filteredApp = appUsage.filter(a => {
    if(ipFilter && !ipFilter.includes(a.ip)) return false;
    const d = String(a.date||'');
    return (!brkFrom || d >= brkFrom) && (!brkTo || d <= brkTo);
  });
  const appTotals = {};
  filteredApp.forEach(a=>{
    const br = currentBranch === 'all' ? (a.branch || 'unknown') : currentBranch;
    const key = currentBranch === 'all' ? `${br}::${a.app}` : a.app;
    appTotals[key] = (appTotals[key]||0) + Number(a.gb || 0);
  });
  const appEntries = Object.entries(appTotals).sort((a,b)=>b[1]-a[1]);
  const appGrandTotal = appEntries.reduce((s,[,v])=>s+v,0);
  const isAdmin = currentUser && currentUser.role === 'administrator';

  // Table rows are grouped by branch + IP + application.
  const appIpTotals = {};
  filteredApp.forEach(a=>{
    const br = currentBranch === 'all' ? (a.branch || 'unknown') : currentBranch;
    const ip = String(a.ip || '').trim() || 'Not mapped';
    const app = String(a.app || 'Other').trim() || 'Other';
    const dateKey = brkByDay ? String(a.date||'—') : '';
    const key = `${dateKey}||${br}||${ip}||${app}`;
    if(!appIpTotals[key]) appIpTotals[key] = { date:dateKey, br, ip, app, gb:0, source:'' };
    if(!appIpTotals[key].source && a.source) appIpTotals[key].source = a.source;
    appIpTotals[key].gb += Number(a.gb || 0);
  });
  const appIpEntries = Object.values(appIpTotals).sort((a,b)=> brkByDay ? (b.date.localeCompare(a.date) || b.gb-a.gb) : (b.gb-a.gb));
  const brkDayTotals = {};
  appIpEntries.forEach(r=>{ brkDayTotals[r.date] = (brkDayTotals[r.date]||0) + r.gb; });
  const brkRangeLabel = (brkFrom||brkTo) ? ((brkFrom||'start')+' → '+(brkTo||'latest')) : 'All dates';

  const appBody = document.getElementById('hdAppBody');
  const HD_ROW_CAP = 400;
  appBody.innerHTML = appIpEntries.slice(0,HD_ROW_CAP).map(row=>{
    const pctBase = brkByDay ? (brkDayTotals[row.date]||0) : appGrandTotal;
    const pct = pctBase ? (row.gb/pctBase*100) : 0;
    const safeApp = dailyEscapeHtml(row.app);
    const safeIp = dailyEscapeHtml(row.ip);
    const appHost = appDrillHostLabel(row.ip, row.br, row);
    return `<tr>
      <td class="mono" style="white-space:nowrap;">${dailyEscapeHtml(brkByDay ? row.date : brkRangeLabel)}</td>
      <td><strong>${dailyEscapeHtml(branchLabel(row.br))}</strong></td>
      <td class="mono" style="white-space:nowrap;">${safeIp}</td>
      <td>${dailyEscapeHtml(appHost)}</td>
      <td>${safeApp}</td>
      <td class="mono">${fmtGB(row.gb)}</td>
      <td><div class="bar-cell"><div class="bar-track"><div class="bar-fill" style="width:${Math.min(100,pct).toFixed(1)}%"></div></div><span class="mono muted" style="font-size:11px;">${pct.toFixed(1)}%</span></div></td>
      <td>${String(row.source||'').toLowerCase().includes('application usage csv') ? '<span class="dm-source-badge">Uploaded</span>' : ipStatusBadgeHtml(row.ip)}</td>
      <td class="admin-action-col"><button class="btn small danger admin-action" data-app="${safeApp}" data-ip="${safeIp}" data-date="${dailyEscapeHtml(brkByDay ? row.date : '')}" style="opacity:${isAdmin?1:0.45}; cursor:${isAdmin?'pointer':'not-allowed'};">Delete</button></td>
    </tr>`;
  }).join('') + (appIpEntries.length>HD_ROW_CAP ? `<tr><td colspan="9" style="text-align:center;color:var(--muted);">Showing top ${HD_ROW_CAP} of ${appIpEntries.length} rows (highest usage first). Use the filters above to narrow down.</td></tr>` : '') || `<tr><td colspan="9"><div class="empty">No application usage logged yet for this filter.</div></td></tr>`;

  setStatValue(document.getElementById('hdTopApp'), appEntries.length ? appEntries[0][0] : '—');
  setStatValue(document.getElementById('hdTopAppGB'), fmtGB(appEntries.length ? appEntries[0][1] : 0));
  renderHdAppPieChart(appEntries, appGrandTotal);

  appBody.querySelectorAll('button[data-app]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      if(!currentUser || currentUser.role !== 'administrator'){ showToast('Only Administrator can delete app usage'); return; }
      const app = btn.dataset.app;
      const rowIp = btn.dataset.ip || '';
      const rowDate = btn.dataset.date || '';
      const before = appUsage.length;
      // Delete only what the row shows: that one day in date-wise view, or the selected date range.
      appUsage = appUsage.filter(a => {
        const d = String(a.date||'');
        const inScope = (!ipFilter || ipFilter.includes(a.ip)) && a.app === app && (!rowIp || String(a.ip||'') === rowIp)
          && (rowDate ? d === rowDate : ((!brkFrom || d >= brkFrom) && (!brkTo || d <= brkTo)));
        return !inScope;
      });
      await saveAppUsage();
      renderHostDashboard();
      showToast(`Removed ${before - appUsage.length} "${app}" entr${before-appUsage.length===1?'y':'ies'}`);
      await logChange('Deleted app usage', `${app} (${before - appUsage.length} record(s))`);
    });
  });

  /* ---------- Branch Overview (always whole branch, ignores host/username filters) ---------- */
  document.getElementById('hdBranchName').textContent = branchLabel(currentBranch);

  const brTotal = usage.reduce((s,u)=>s+u.bytesGB,0);
  const brRecords = usage.length;
  const brAvg = brRecords ? brTotal/brRecords : 0;
  const brHigh = brRecords ? Math.max(...usage.map(u=>u.bytesGB)) : 0;
  setStatValue(document.getElementById('brTotal'), fmtGB(brTotal));
  setStatValue(document.getElementById('brRecords'), brRecords);
  setStatValue(document.getElementById('brAvg'), fmtGB(brAvg));
  setStatValue(document.getElementById('brHigh'), fmtGB(brHigh));

  // branch-wide top applications, tagged per-row via the "Top application" field on Add Data
  const brAppTotals = {};
  usage.forEach(u=>{ if(u.topApp) brAppTotals[u.topApp] = (brAppTotals[u.topApp]||0) + (u.topAppGB||0); });
  const brAppEntries = Object.entries(brAppTotals).sort((a,b)=>b[1]-a[1]);
  const brAppBody = document.getElementById('brAppBody');
  brAppBody.innerHTML = brAppEntries.map(([app,gb])=>
    `<tr><td>${app}</td><td class="mono">${fmtGB(gb)}</td></tr>`
  ).join('') || `<tr><td colspan="2"><div class="empty">No host has a "Top application" tagged yet on the Add Data page.</div></td></tr>`;

  // branch-wide year/month drill-down (shares the Year/Month picker above)
  const brYearTotal = usage.filter(u=>u.date && u.date.startsWith(yearPrefix)).reduce((s,u)=>s+u.bytesGB,0);
  const brYearMonthTotal = usage.filter(u=>u.date && u.date.startsWith(yearMonthPrefix)).reduce((s,u)=>s+u.bytesGB,0);
  setStatValue(document.getElementById('brYear'), fmtGB(brYearTotal));
  setStatValue(document.getElementById('brYearMonth'), fmtGB(brYearMonthTotal));

  // host coverage
  const reportedIps = new Set(usage.map(u=>u.ip));
  const reported = reportedIps.size;
  const remaining = Math.max(fixedHosts - reported, 0);
  const coveragePct = fixedHosts > 0 ? (reported/fixedHosts*100) : 0;
  document.getElementById('fixedHostsInput').value = fixedHosts;
  setStatValue(document.getElementById('covTotal'), fixedHosts);
  setStatValue(document.getElementById('covReported'), reported);
  setStatValue(document.getElementById('covRemaining'), remaining);
  setStatValue(document.getElementById('covPct'), coveragePct.toFixed(1)+'%');

  // Full records — in All Branches mode, keep each row's real location.
  // The same IP can exist in more than one branch, so branch + IP is used as the key.
  const firstDateByBranchIp = {};
  usage.forEach(u=>{
    const rowBranch = u.branch || currentBranch;
    const key = `${rowBranch}::${u.ip}`;
    if(!firstDateByBranchIp[key] || u.date < firstDateByBranchIp[key]) firstDateByBranchIp[key] = u.date;
  });
  const fullBody = document.getElementById('hdFullRecordsBody');
  const recordRows = [...filteredUsage].sort((a,b)=> b.date.localeCompare(a.date)).slice(0, 500);
  fullBody.innerHTML = recordRows.map(u=>{
    const rowBranch = u.branch || currentBranch;
    const dev = devices.find(d => d.ip === u.ip && (!d.branch || d.branch === rowBranch)) || deviceFor(u.ip);
    const [y,m,d] = u.date.split('-');
    const isFirst = firstDateByBranchIp[`${rowBranch}::${u.ip}`] === u.date;
    const rowBranchLabel = rowBranch === 'unknown' ? 'Unknown' : branchLabel(rowBranch);
    return `<tr>
      <td class="mono">${u.date}</td>
      <td><strong>${rowBranchLabel}</strong></td>
      <td>${dev ? dev.name : (u.host || 'Unknown')}</td>
      <td class="mono">${u.ip || (dev && dev.ip) || '—'}</td>
      <td class="muted">${dev && dev.username ? dev.username : '—'}</td>
      <td class="mono">${u.bytesDisplay || fmtGB(u.bytesGB)}</td>
      <td class="mono">${u.bytesGB.toFixed(2)}</td>
      <td class="mono muted">${u.percent!=null ? u.percent+'%' : '—'}</td>
      <td class="mono muted">${y}</td>
      <td class="mono muted">${MONTH_ABBR[parseInt(m,10)-1]}</td>
      <td class="mono muted">${d}</td>
      <td class="muted">${(()=>{ const ta = appTopFor(u.ip, u.date, rowBranch); return u.topApp || (ta ? dailyEscapeHtml(ta.app) : '—'); })()}</td>
      <td class="mono muted">${(()=>{ const ta = appTopFor(u.ip, u.date, rowBranch); return u.topAppGB!=null ? u.topAppGB.toFixed(2) : (ta ? ta.gb.toFixed(2) : '—'); })()}</td>
      <td class="mono muted">${isFirst ? 'Yes' : 'No'}</td>
    </tr>`;
  }).join('') || `<tr><td colspan="14"><div class="empty">No records match this filter yet.</div></td></tr>`;
}

document.getElementById('saveFixedHostsBtn').addEventListener('click', async ()=>{
  if(!currentUser || currentUser.role !== 'administrator'){ showToast('Only Administrator can edit this'); return; }
  const feedback = document.getElementById('fixedHostsFeedback');
  const val = parseInt(document.getElementById('fixedHostsInput').value, 10);
  if(isNaN(val) || val < 0){ feedback.textContent = 'Enter a valid number.'; feedback.style.color='var(--danger)'; return; }
  fixedHosts = val;
  await saveFixedHosts();
  feedback.textContent = `Saved — ${val} fixed hosts for ${branchLabel(currentBranch)}.`;
  feedback.style.color = 'var(--accent)';
  showToast('Fixed host count saved');
  renderHostDashboard();
  await logChange('Updated fixed host count', `${val} for ${branchLabel(currentBranch)}`);
});

['appBrkView','appBrkFrom','appBrkTo'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('change', ()=>renderHostDashboard());
});
(function(){
  const clr = document.getElementById('appBrkClear');
  if(clr) clr.addEventListener('click', ()=>{
    document.getElementById('appBrkFrom').value='';
    document.getElementById('appBrkTo').value='';
    renderHostDashboard();
  });
})();

['hdUsername','hdYear','hdMonth','hdFromDate','hdToDate'].forEach(id=>{
  const el = document.getElementById(id);
  if(el) el.addEventListener('change', renderHostDashboard);
});
const hdHostSearch = document.getElementById('hdHost');
if(hdHostSearch){
  hdHostSearch.addEventListener('input', renderHostDashboard);
  hdHostSearch.addEventListener('search', renderHostDashboard);
}
const hdHostSearchBtn = document.getElementById('hdHostSearchBtn');
if(hdHostSearchBtn){
  hdHostSearchBtn.addEventListener('click', renderHostDashboard);
}


/* ================= Sophos "Applications" CSV import ================= */
// The exported Sophos report is firewall/branch-wide (not per individual
// host), so imported rows are attributed to one virtual "device" that
// represents the whole firewall's traffic for that branch, keeping the
// existing per-host {date, ip, app, gb} schema unchanged.
const SOPHOS_DEVICE_IP = 'sophos-firewall-aggregate';
const SOPHOS_DEVICE_NAME = 'Sophos Firewall (All Traffic)';

function parseCSVLine(line){
  // Minimal CSV splitter: handles quoted fields with commas inside them.
  const out = []; let cur = ''; let inQ = false;
  for(let i=0;i<line.length;i++){
    const ch = line[i];
    if(inQ){
      if(ch === '"'){
        if(line[i+1] === '"'){ cur += '"'; i++; } else inQ = false;
      } else cur += ch;
    } else {
      if(ch === '"') inQ = true;
      else if(ch === ','){ out.push(cur); cur = ''; }
      else cur += ch;
    }
  }
  out.push(cur);
  return out.map(s=>s.trim());
}

function parseHosurHostApplicationCSV(text){
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(l=>l.trim());
  if(!lines.length) return null;
  const header = parseCSVLine(lines[0]).map(x=>String(x||'').trim().toLowerCase());
  const required = ['date','branch','host','application','app_usage_gb','host_usage_gb'];
  if(!required.every(k=>header.includes(k))) return null;
  const idx = Object.fromEntries(header.map((h,i)=>[h,i]));
  const appRows = [];
  const hostMap = new Map();
  for(let i=1;i<lines.length;i++){
    const cols = parseCSVLine(lines[i]);
    if(cols.length < header.length) continue;
    const date = String(cols[idx.date]||'').trim();
    const branch = String(cols[idx.branch]||'').trim().toLowerCase();
    const ip = String(cols[idx.host]||'').trim();
    const app = String(cols[idx.application]||'').trim();
    const appGb = Number(cols[idx.app_usage_gb]);
    const hostGb = Number(cols[idx.host_usage_gb]);
    const status = String(cols[idx.report_status]||'').trim();
    if(!date || !ip || !app || !Number.isFinite(appGb) || appGb <= 0 || !Number.isFinite(hostGb) || hostGb < 0) continue;
    hostMap.set(`${date}::${branch}::${ip}`, {date, branch, ip, bytesGB:hostGb, reportStatus:status, source:'Hosur Host/Application CSV'});
    appRows.push({date, branch, ip, app, gb:appGb, source:'Hosur Host/Application CSV', reportStatus:status});
  }
  const hosts = Array.from(hostMap.values());
  const totalHostGb = hosts.reduce((sum,r)=>sum+r.bytesGB,0);
  hosts.forEach(r=>{
    r.bytesDisplay = fmtGB(r.bytesGB);
    r.percent = totalHostGb > 0 ? Math.round((r.bytesGB/totalHostGb)*10000)/100 : 0;
  });
  return {branch:(hosts[0]?.branch||appRows[0]?.branch||''), hosts, appRows};
}

function parseSophosApplicationsCSV(text){
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/);
  let endDate = null;
  let headerIdx = -1;
  let header = [];
  for(let i=0;i<lines.length;i++){
    const l = lines[i];
    if(/^End Date,/i.test(l)){
      const m = l.match(/^End Date,\s*(\d{4}-\d{2}-\d{2})/i);
      if(m) endDate = m[1];
    }
    if(/^Application\/Proto:Port,Risk,Category,Hits,Bytes/i.test(l)){
      headerIdx = i;
      header = parseCSVLine(l).map(x=>String(x||'').trim().toLowerCase());
      break;
    }
  }
  if(headerIdx === -1) return { rows: [], endDate, hasIp:false };

  // Some Sophos exports include a source/user/IP field; preserve it when
  // available. The normal "Applications" report is branch-wide and has no IP.
  const ipIdx = header.findIndex(h =>
    /^(source\s*ip|source\s*address|client\s*ip|user\s*ip|ip\s*address|ip)$/.test(h)
  );
  const rows = [];
  for(let i=headerIdx+1;i<lines.length;i++){
    const l = lines[i];
    if(!l || !l.trim()) continue;
    const cols = parseCSVLine(l);
    if(cols.length < 5) continue;
    const [app, risk, category, hits, bytes] = cols;
    const gb = toGB(bytes);
    if(!app || gb <= 0) continue;
    const ip = ipIdx >= 0 ? String(cols[ipIdx]||'').trim() : '';
    rows.push({ app, category, gb, ip });
  }
  return { rows, endDate, hasIp: ipIdx >= 0 };
}

document.getElementById('sophosImportBtn')?.addEventListener('click', ()=>{
  document.getElementById('sophosImportInput').click();
});

document.getElementById('sophosImportInput')?.addEventListener('change', async (e)=>{
  const file = e.target.files[0];
  const feedback = document.getElementById('sophosImportFeedback');
  if(!file) return;
  if(currentBranch === 'all'){
    feedback.textContent = 'Pick a specific branch first (not "All branches").';
    feedback.style.color = 'var(--danger)';
    e.target.value = '';
    return;
  }
  try{
    const text = await file.text();

    // Dedicated Host + Application CSV:
    // Date/Branch/Host/Application/App_Usage_GB/Host_Usage_GB
    // Host_Usage_GB is stored once per unique Date + Host. Application
    // rows are stored separately so application totals never double-count
    // the host total when one host has multiple applications.
    const hostAppData = parseHosurHostApplicationCSV(text);
    if(hostAppData){
      const csvBranch = hostAppData.branch;
      if(!['chennai','bangalore','hosur'].includes(csvBranch)){
        feedback.textContent = 'CSV branch must be Chennai, Bangalore, or Hosur.';
        feedback.style.color = 'var(--danger)';
        e.target.value = '';
        return;
      }
      if(currentBranch !== csvBranch){
        feedback.textContent = `Select ${branchLabel(csvBranch)} branch first, then import this CSV.`;
        feedback.style.color = 'var(--warning, #F5A623)';
        e.target.value = '';
        return;
      }
      const importSource = 'Hosur Host/Application CSV';
      const importedDates = new Set(hostAppData.hosts.map(r=>r.date));
      usage = usage.filter(r=>!(String(r.source||'')===importSource && importedDates.has(r.date)));
      const totalHostGb = hostAppData.hosts.reduce((sum,r)=>sum+r.bytesGB,0);
      hostAppData.hosts.forEach(r=>{
        usage.push({date:r.date,ip:r.ip,bytesDisplay:r.bytesDisplay,bytesGB:r.bytesGB,percent:r.percent,source:importSource,reportStatus:r.reportStatus});
      });
      // Host import saves HOST usage only. Application usage is uploaded separately in the Application Usage tab.
      for(const r of hostAppData.hosts){
        if(!devices.some(d=>String(d.ip||'').trim()===r.ip)){
          devices.push({name:'Unmapped Host',mac:'—',ip:r.ip,username:''});
        }
      }
      await saveDevices();
      await saveUsage();
      const appTotal=hostAppData.appRows.reduce((sum,r)=>sum+r.gb,0);
      const gap=Math.max(totalHostGb-appTotal,0);
      feedback.textContent=`Imported ${hostAppData.hosts.length} HOSTS for ${branchLabel(csvBranch)} (application rows are not saved here — use the Application Usage tab). Host total: ${fmtGB(totalHostGb)}; application rows: ${fmtGB(appTotal)}; unclassified host traffic: ${fmtGB(gap)}.`;
      feedback.style.color='var(--accent)';
      showToast(`Imported ${branchLabel(csvBranch)} usage CSV`);
      renderHostDashboard();
      if(window.refreshAppDrilldown) window.refreshAppDrilldown();
      await logChange('Imported Host + Application CSV',`${hostAppData.hosts.length} hosts + ${hostAppData.appRows.length} apps — ${branchLabel(csvBranch)} — ${fmtGB(totalHostGb)} host total`);
      e.target.value='';
      return;
    }

    const { rows, endDate, hasIp } = parseSophosApplicationsCSV(text);
    if(!rows.length){
      feedback.textContent = 'Could not read this CSV. Expected either the Host/Application format or a Sophos Applications report.';
      feedback.style.color = 'var(--danger)';
      e.target.value = '';
      return;
    }

    // If the CSV has source IPs, store each row against that real IP.
    // Otherwise keep the existing branch-wide aggregate, but make that
    // limitation explicit instead of pretending it is a host/IP record.
    const date = endDate || todayISO();
    const uniqueIps = [...new Set(rows.map(r=>String(r.ip||'').trim()).filter(Boolean))];

    if(hasIp && uniqueIps.length){
      uniqueIps.forEach(ip=>{
        if(!devices.some(d => String(d.ip||'').trim() === ip)){
          devices.push({ name: 'Sophos source IP', mac: '—', ip, username: '' });
        }
      });
      await saveDevices();
      for(const r of rows){
        appUsage.push({ date, ip: r.ip, app: r.app, gb: r.gb });
      }
      await saveAppUsage();
      feedback.textContent = `Imported ${rows.length} application rows with ${uniqueIps.length} source IPs (${fmtGB(rows.reduce((s,r)=>s+r.gb,0))} total). IP-wise usage is now available.`;
      feedback.style.color = 'var(--accent)';
    }else{
      if(!devices.some(d => d.ip === SOPHOS_DEVICE_IP)){
        devices.push({ name: SOPHOS_DEVICE_NAME, mac: '—', ip: SOPHOS_DEVICE_IP, username: '' });
        await saveDevices();
      }
      for(const r of rows){
        appUsage.push({ date, ip: SOPHOS_DEVICE_IP, app: r.app, gb: r.gb });
      }
      await saveAppUsage();
      feedback.textContent = `Imported ${rows.length} applications (${fmtGB(rows.reduce((s,r)=>s+r.gb,0))} total), but this Sophos report has no source IP column. It is branch-wide aggregate data, so per-IP usage cannot be calculated from this CSV.`;
      feedback.style.color = 'var(--warning, #F5A623)';
    }

    showToast(`Imported ${rows.length} apps from Sophos CSV`);
    renderHostDashboard();
    if(window.refreshAppDrilldown) window.refreshAppDrilldown();
    await logChange('Imported Sophos Applications CSV', `${rows.length} apps — ${fmtGB(rows.reduce((s,r)=>s+r.gb,0))} — ${branchLabel(currentBranch)} — ${date}`);
  }catch(err){
    console.error('Sophos CSV import failed', err);
    feedback.textContent = 'Could not read this file — is it the CSV export (not the zip)?';
    feedback.style.color = 'var(--danger)';
  }
  e.target.value = '';
});

/* ================= add data — row builder ================= */
function deviceOptionsHTML(selectedIp){
  return `<option value="">Select device…</option>` + devices.map(d=>
    `<option value="${d.ip}" ${d.ip===selectedIp?'selected':''}>${d.name} — ${d.ip}</option>`
  ).join('') + `<option value="others" ${selectedIp==='others'?'selected':''}>Others (unlisted total)</option>`;
}

function firewallAppOptionsHTML(selectedApp){
  return `<option value="">Top application (optional)</option>` + FIREWALL_APPS.map(a=>
    `<option value="${a}" ${a===selectedApp?'selected':''}>${a}</option>`
  ).join('');
}

function addRow(prefill){
  const container = document.getElementById('rowsContainer');
  const wrap = document.createElement('div');
  wrap.className = 'row-item-wrap';
  wrap.innerHTML = `
    <div class="row-item">
      <select class="row-ip">${deviceOptionsHTML(prefill?.ip)}</select>
      <input type="text" class="row-bytes" placeholder="e.g. 7.61 GB" value="${prefill?.bytesDisplay||''}">
      <input type="number" step="0.01" class="row-percent" placeholder="% (optional)" value="${prefill?.percent??''}">
      <button type="button" class="rm" title="Remove row">✕</button>
    </div>
    <div class="row-topapp-row">
      <select class="row-topapp">${firewallAppOptionsHTML(prefill?.topApp)}</select>
      <input type="text" class="row-topapp-other" placeholder="App name" style="display:${prefill?.topApp==='Other'?'':'none'};" value="${prefill?.topApp==='Other' ? (prefill?.topAppOther||'') : ''}">
      <input type="text" class="row-topapp-usage" placeholder="Top app usage, e.g. 2.1 GB" value="${prefill?.topAppDisplay||''}">
    </div>
  `;
  wrap.querySelector('.rm').addEventListener('click', ()=> wrap.remove());
  wrap.querySelector('.row-topapp').addEventListener('change', (e)=>{
    wrap.querySelector('.row-topapp-other').style.display = e.target.value === 'Other' ? '' : 'none';
  });
  container.appendChild(wrap);
}
document.getElementById('addRowBtn').addEventListener('click', ()=> addRow());

document.getElementById('clearRowsBtn').addEventListener('click', ()=>{
  document.getElementById('rowsContainer').innerHTML = '';
  addRow();
  document.getElementById('addDate').value = todayISO();
  const feedback = document.getElementById('addFeedback');
  feedback.textContent = 'Form cleared.';
  feedback.style.color = 'var(--muted)';
  showToast('Cleared');
});

document.getElementById('addDate').value = todayISO();

document.getElementById('saveDayBtn').addEventListener('click', async ()=>{
  const date = document.getElementById('addDate').value;
  const feedback = document.getElementById('addFeedback');
  if(!date){ feedback.textContent = 'Pick a date first.'; feedback.style.color='var(--danger)'; return; }

  const rowsEls = document.querySelectorAll('#rowsContainer .row-item');
  const newRows = [];
  rowsEls.forEach(el=>{
    const wrap = el.closest('.row-item-wrap');
    const ip = el.querySelector('.row-ip').value;
    const bytesDisplay = el.querySelector('.row-bytes').value.trim();
    const percentRaw = el.querySelector('.row-percent').value;
    if(!ip || !bytesDisplay) return;

    let topApp = wrap ? wrap.querySelector('.row-topapp').value : '';
    if(topApp === 'Other'){
      const other = wrap.querySelector('.row-topapp-other').value.trim();
      if(other) topApp = other;
    }
    const topAppDisplay = wrap ? wrap.querySelector('.row-topapp-usage').value.trim() : '';

    newRows.push({
      date, ip,
      bytesDisplay,
      bytesGB: toGB(bytesDisplay),
      percent: percentRaw!=='' ? parseFloat(percentRaw) : null,
      topApp: topApp || null,
      topAppGB: topApp && topAppDisplay ? toGB(topAppDisplay) : null
    });
  });

  if(!newRows.length){
    feedback.textContent = 'Add at least one host with a usage value.';
    feedback.style.color = 'var(--danger)';
    return;
  }

  // if percent missing, auto-compute against this day's total
  const total = newRows.reduce((s,r)=>s+r.bytesGB,0);
  newRows.forEach(r=>{ if(r.percent==null && total>0) r.percent = Math.round((r.bytesGB/total)*10000)/100; });

  // INSERT mode: keep existing rows and add every newly entered row.
  // This makes repeated inserts increase the branch total instead of replacing older data.
  usage = usage.concat(newRows);
  await saveUsage();

  feedback.textContent = `Saved ${newRows.length} host${newRows.length>1?'s':''} for ${date}. Form cleared for the next day.`;
  feedback.style.color = 'var(--accent)';
  showToast('Day saved ✓');
  renderSidebar();
  renderDashboard();
  await logChange('Saved day', `${date} — ${newRows.length} host(s) logged`);

  // refresh the form for fresh entry — clear rows, clear paste box, clear date for manual pick
  document.getElementById('rowsContainer').innerHTML = '';
  addRow();
  document.getElementById('pasteArea').value = '';
  document.getElementById('pasteFeedback').textContent = '';
  document.getElementById('addDate').value = '';
});

/* paste parser */
document.getElementById('parsePasteBtn').addEventListener('click', ()=>{
  const raw = document.getElementById('pasteArea').value.trim();
  const feedback = document.getElementById('pasteFeedback');
  if(!raw){ feedback.textContent='Paste some rows first.'; feedback.style.color='var(--danger)'; return; }

  const lines = raw.replace(/\r/g,'').split('\n').map(l=>l.trim()).filter(Boolean);
  document.getElementById('rowsContainer').innerHTML = '';
  let count = 0;

  // Accept all of these clipboard formats:
  // 1) 192.168.1.10    1.59 GB    1.84 %
  // 2) 192.168.1.10 1.59 GB 1.84 %
  // 3) 192.168.1.10\n  //    1.59 GB\n  //    1.84 %\n  // 4) Host / Bytes / Percent headers are optional.
  const usageRe = /^([0-9]+(?:\.[0-9]+)?)\s*(B|KB|MB|GB|TB|PB)$/i;
  const percentRe = /^([0-9]+(?:\.[0-9]+)?)\s*%?$/;
  const hostRe = /^(?:\d{1,3}(?:\.\d{1,3}){3}|others|[a-z0-9][a-z0-9._-]*)$/i;

  function addParsed(hostRaw, bytesRaw, percentRaw){
    if(!hostRaw || !bytesRaw) return false;
    if(/^host$/i.test(hostRaw) || /^bytes$/i.test(hostRaw)) return false;

    let ip = hostRaw.trim();
    if(/^others$/i.test(ip)) ip = 'others';
    else {
      const match = devices.find(d => d.name.toLowerCase()===ip.toLowerCase() || d.ip===ip);
      if(match) ip = match.ip;
    }

    const bytesText = String(bytesRaw).trim();
    if(!usageRe.test(bytesText)) return false;
    const percent = percentRaw == null || percentRaw === '' ? null : parseFloat(String(percentRaw).replace('%','').trim());
    if(percentRaw != null && percentRaw !== '' && !Number.isFinite(percent)) return false;

    addRow({ip, bytesDisplay: bytesText, percent});
    count++;
    return true;
  }

  for(let i=0; i<lines.length; i++){
    const line = lines[i];
    if(/^(host|bytes|percent)$/i.test(line)) continue;

    // Normal one-line / tab-separated row.
    let parts = line.split(/\t+|\s{2,}/).map(p=>p.trim()).filter(Boolean);
    if(parts.length >= 2){
      // If the whole line was separated by single spaces, join the usage unit back.
      if(parts.length === 2 && /^\d+(?:\.\d+)?$/.test(parts[1])){
        // handled by the stacked/single-space parser below
      } else if(addParsed(parts[0], parts[1], parts[2] || null)){
        continue;
      }
    }

    // Single-space row: host 1.59 GB 1.84 %
    const single = line.match(/^(\S+)\s+([0-9]+(?:\.[0-9]+)?)\s*(B|KB|MB|GB|TB|PB)(?:\s+([0-9]+(?:\.[0-9]+)?)\s*%)?$/i);
    if(single && addParsed(single[1], `${single[2]} ${single[3]}`, single[4] || null)) continue;

    // Stacked clipboard format: host on one line, usage on the next, percent on the next.
    if(hostRe.test(line) && i+1 < lines.length && usageRe.test(lines[i+1])){
      const host = line;
      const bytes = lines[++i];
      let pct = null;
      if(i+1 < lines.length && percentRe.test(lines[i+1]) && !usageRe.test(lines[i+1])) pct = lines[++i];
      addParsed(host, bytes, pct);
    }
  }

  feedback.textContent = count ? `Loaded ${count} rows above — review, then Save this day.` : 'Could not read any rows — check the format.';
  feedback.style.color = count ? 'var(--accent)' : 'var(--danger)';
});

/* ================= bulk multi-day upload =================
   Parses an export that has MANY days in one file/paste: each day starts
   with a line containing a date like "Monday (13/10/2025)", followed by
   Host / Bytes / Percent rows (tab or multi-space separated). Every day
   found is written straight into usage[] — no per-row review needed. */
function parseBulkMultiDayReport(raw){
  const lines = String(raw||'').split('\n');
  // dd/mm/yyyy or dd\mm\yyyy, wherever it appears in the line
  const dateRe = /(\d{1,2})\s*[\/\\]\s*(\d{1,2})\s*[\/\\]\s*(\d{2,4})/;
  const ipStartRe = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/; // avoid mistaking an IP for a date
  let curDate = null;
  const rows = [];

  lines.forEach(rawLine=>{
    const line = rawLine.replace(/\r/g,'').trim();
    if(!line) return;

    // ---- CSV row support: 2026-09-29,HOSUR,192.168.7.193,<name>,<total>,<up>,<down>,Final ----
    const csvCols = line.split(',').map(c=>c.trim());
    if(csvCols.length >= 5 && /^\d{4}-\d{2}-\d{2}$/.test(csvCols[0]) && ipStartRe.test(csvCols[2])){
      const hostRaw = csvCols[2];
      const totalNum = parseFloat(csvCols[4]);
      if(!isNaN(totalNum)){
        const match = devices.find(d => d.ip===hostRaw);
        rows.push({
          date: csvCols[0],
          ip: match ? match.ip : hostRaw,
          bytesDisplay: csvCols[4] + ' GB',
          bytesGB: Math.round(totalNum*1e6)/1e6,   // keep small values (toGB rounds to 2 decimals)
          percent: null,
          topApp: null,
          topAppGB: null
        });
      }
      return;
    }

    const dm = line.match(dateRe);
    if(dm && !ipStartRe.test(line)){
      let [ , dd, mm, yy ] = dm;
      dd = dd.padStart(2,'0'); mm = mm.padStart(2,'0');
      if(yy.length===2) yy = (parseInt(yy,10) < 50 ? '20' : '19') + yy;
      const mmN = parseInt(mm,10), ddN = parseInt(dd,10);
      if(mmN>=1 && mmN<=12 && ddN>=1 && ddN<=31){
        curDate = `${yy}-${mm}-${dd}`;
        return; // this line is a header, not a data row
      }
    }
    if(!curDate) return;

    let parts = line.split(/\t+/).map(p=>p.trim()).filter(Boolean);
    if(parts.length < 2) parts = line.split(/\s{2,}/).map(p=>p.trim()).filter(Boolean);
    if(parts.length < 2) return;

    const hostRaw = parts[0];
    if(/^host$/i.test(hostRaw)) return; // header row like "Host  Bytes  Percent"
    const bytesRaw = parts[1];
    if(!/\d/.test(bytesRaw)) return; // second column must look numeric

    let ip = hostRaw;
    if(/^others$/i.test(hostRaw)) ip = 'others';
    else {
      const match = devices.find(d => d.name.toLowerCase()===hostRaw.toLowerCase() || d.ip===hostRaw);
      if(match) ip = match.ip;
    }

    const percentRaw = parts[2] || '';
    const percentNum = percentRaw ? parseFloat(percentRaw.replace('%','')) : NaN;

    rows.push({
      date: curDate, ip,
      bytesDisplay: bytesRaw,
      bytesGB: toGB(bytesRaw),
      percent: isNaN(percentNum) ? null : percentNum,
      topApp: null,
      topAppGB: null
    });
  });

  // fill in any missing percent using that day's total
  const byDate = {};
  rows.forEach(r=>{ (byDate[r.date] = byDate[r.date] || []).push(r); });
  Object.values(byDate).forEach(group=>{
    const total = group.reduce((s,r)=>s+r.bytesGB,0);
    group.forEach(r=>{ if(r.percent==null && total>0) r.percent = Math.round((r.bytesGB/total)*10000)/100; });
  });

  return rows;
}

document.getElementById('bulkFileInput').addEventListener('change', async (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const feedback = document.getElementById('bulkFeedback');
  if(window.FmtImport){
    const r = await window.FmtImport.run('usage', file, (document.getElementById('bulkFormatSelect')||{}).value==='table');
    if(r===null){ e.target.value=''; feedback.textContent='Upload cancelled.'; feedback.style.color='var(--muted)'; return; }
    if(typeof r==='string'){
      document.getElementById('bulkPasteArea').value = r;
      feedback.textContent='Format applied — check the rows below, then press Bulk upload.';
      feedback.style.color='var(--accent)';
      return;
    }
  }
  const reader = new FileReader();
  reader.onload = ()=>{ document.getElementById('bulkPasteArea').value = String(reader.result||''); };
  reader.onerror = ()=>{
    feedback.textContent = 'Could not read that file.';
    feedback.style.color = 'var(--danger)';
  };
  reader.readAsText(file);
});

document.getElementById('bulkClearBtn').addEventListener('click', ()=>{
  document.getElementById('bulkPasteArea').value = '';
  document.getElementById('bulkFileInput').value = '';
  const feedback = document.getElementById('bulkFeedback');
  feedback.textContent = 'Cleared.';
  feedback.style.color = 'var(--muted)';
});

document.getElementById('bulkUploadBtn').addEventListener('click', async ()=>{
  const feedback = document.getElementById('bulkFeedback');
  const raw = document.getElementById('bulkPasteArea').value;
  if(!raw.trim()){
    feedback.textContent = 'Paste some text or choose a file first.';
    feedback.style.color = 'var(--danger)';
    return;
  }
  if(currentBranch === 'all'){
    feedback.textContent = 'Pick a single branch at the top of the page first (not "All branches").';
    feedback.style.color = 'var(--danger)';
    return;
  }

  feedback.textContent = 'Parsing…';
  feedback.style.color = 'var(--muted)';

  let newRows = [];
  try{ newRows = parseBulkMultiDayReport(raw); }
  catch(e){
    feedback.textContent = 'Could not parse that file — check the format.';
    feedback.style.color = 'var(--danger)';
    return;
  }

  if(!newRows.length){
    feedback.textContent = 'No rows found. Each day needs a line with a date like (13/10/2025), followed by Host / Bytes rows.';
    feedback.style.color = 'var(--danger)';
    return;
  }

  const dates = new Set(newRows.map(r=>r.date));

  const btn = document.getElementById('bulkUploadBtn');
  btn.disabled = true;
  try{
    usage = usage.concat(newRows);
    await saveUsage();
    scheduleDataRefresh();
    refreshAllDataViews();
    try{ renderDashboard(); }catch(e){}
    await logChange('Bulk upload', `${newRows.length} row(s) across ${dates.size} day(s) for ${branchLabel(currentBranch)}`);

    feedback.textContent = `Added ${newRows.length} rows across ${dates.size} day(s) to ${branchLabel(currentBranch)}. ✓`;
    feedback.style.color = 'var(--accent)';
    showToast('Bulk upload saved ✓');
    document.getElementById('bulkPasteArea').value = '';
    document.getElementById('bulkFileInput').value = '';
  }catch(e){
    console.error('Bulk upload failed', e);
    feedback.textContent = 'Could not save — try again.';
    feedback.style.color = 'var(--danger)';
  }finally{
    btn.disabled = false;
  }
});

/* ================= search ================= */
function populateIpDatalist(){
  const dl = document.getElementById('ipList');
  dl.innerHTML = devices.map(d=>`<option value="${d.ip}">${d.name}</option>`).join('');
}

/* ===== Application <-> IP/date linking (works whichever upload came first) ===== */
function appRowsFor(ip, date, branch){
  const ipS = String(ip||'').trim();
  const brN = branch ? normalizeBranchId(branch) : '';
  return (Array.isArray(appUsage)?appUsage:[]).filter(r=>{
    if(String(r?.ip||'').trim() !== ipS) return false;
    if(date && String(r.date||'') !== String(date)) return false;
    if(brN && brN !== 'all' && r.branch && normalizeBranchId(r.branch) !== brN) return false;
    return true;
  });
}
function appTotalsFor(ip, date, branch){
  const m = {};
  appRowsFor(ip, date, branch).forEach(r=>{
    const a = String(r.app||'Other').trim() || 'Other';
    m[a] = (m[a]||0) + (Number(r.gb)||0);
  });
  return Object.entries(m).map(([app,gb])=>({app,gb})).sort((a,b)=>b.gb-a.gb);
}
function appTopFor(ip, date, branch){
  const t = appTotalsFor(ip, date, branch);
  return t.length ? t[0] : null;
}
function appsInlineFor(ip, date, branch, max){
  const t = appTotalsFor(ip, date, branch).slice(0, max||3);
  return t.length ? t.map(x=>`${dailyEscapeHtml(x.app)} (${fmtGB(x.gb)})`).join(', ') : '—';
}

function doSearch(){
  const qRaw = document.getElementById('searchInput').value.trim();
  const box = document.getElementById('searchResult');
  if(!qRaw){ box.innerHTML=''; return; }
  const q = qRaw.toLowerCase();

  const activeBranch = normalizeBranchId(currentBranch);
  const ipQuery = /^(?:\d{1,3}\.){3}\d{1,3}$/.test(q);
  let dev = null;

  if(ipQuery){
    dev = deviceFor(q, activeBranch);
  }else{
    const scopedDevices = activeBranch==='all' ? devices : devices.filter(d=>normalizeBranchId(d?.branch||currentBranch)===activeBranch);
    const exactHit = scopedDevices.find(d => String(d?.ip||'').toLowerCase()===q || String(d?.name||'').toLowerCase()===q || String(d?.mac||'').toLowerCase()===q);

    if(exactHit){
      dev = exactHit;
    }else{
      const partialMatches = scopedDevices.filter(d =>
        String(d?.ip||'').toLowerCase().includes(q) ||
        String(d?.name||'').toLowerCase().includes(q) ||
        String(d?.mac||'').toLowerCase().includes(q)
      );

      if(partialMatches.length > 1){
        const safe = v => String(v == null ? '' : v)
          .replace(/&/g,'&amp;').replace(/</g,'&lt;')
          .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
          .replace(/'/g,'&#39;');

        box.innerHTML = `
          <div class="hint" style="margin-bottom:8px;">${partialMatches.length} devices match "${safe(qRaw)}" — pick one:</div>
          <div class="table-scroll" style="max-height:360px;">
            <table>
              <thead><tr><th>Name</th><th>IP address</th><th>MAC address</th><th>Status</th><th style="width:90px"></th></tr></thead>
              <tbody>
                ${partialMatches.map((d,i)=>`
                  <tr>
                    <td>${safe(d.name)}</td>
                    <td class="mono">${safe(d.ip)}</td>
                    <td class="mono muted">${safe(d.mac || '—')}</td>
                    <td>${ipStatusBadgeHtml(d.ip)}</td>
                    <td><button class="btn small ghost" data-search-pick-index="${i}">View</button></td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>`;

        box.querySelectorAll('button[data-search-pick-index]').forEach(btn=>{
          btn.addEventListener('click', ()=>{
            const picked = partialMatches[Number(btn.dataset.searchPickIndex)];
            if(!picked) return;
            document.getElementById('searchInput').value = picked.ip;
            doSearch();
          });
        });
        return;
      }

      dev = partialMatches[0];
    }
  }

  if(!dev && ipQuery){
    // Usage-only IP: keep the IP visible, but never invent the person.
    const usageHit = usage.find(u=>String(u?.ip||'').trim().toLowerCase()===q && (activeBranch==='all' || normalizeBranchId(u?.branch||currentBranch)===activeBranch));
    const directoryHit = IP_DIRECTORY_DATA.find(x=>String(x?.ip||'').trim().toLowerCase()===q && (activeBranch==='all' || normalizeBranchId(x?.b)===activeBranch));
    if(usageHit || directoryHit){
      dev = {
        ip:q,
        name:directoryHit?.h || usageHit?.name || '— unknown —',
        mac:usageHit?.mac || '—',
        username:usageHit?.username || usageHit?.user || 'Not mapped',
        branch:usageHit?.branch || (directoryHit?.b ? normalizeBranchId(directoryHit.b) : currentBranch)
      };
    }
  }

  if(!dev){
    const activeDirectoryRows = IP_DIRECTORY_DATA.filter(x=>x.b===branchLabel(currentBranch));
    const directoryHit = activeDirectoryRows.find(x=>x.ip.toLowerCase()===q || (x.h||'').toLowerCase()===q) || activeDirectoryRows.find(x=>x.ip.toLowerCase().includes(q) || (x.h||'').toLowerCase().includes(q));
    if(directoryHit){ openModule('ipdirectory'); ipdirBranch=directoryHit.b; document.getElementById('ipdirSearch').value=directoryHit.ip; renderIPDirectory(); showIPUserHistory(directoryHit.b,directoryHit.ip,directoryHit.h); return; }
    box.innerHTML = `<div class="empty">No device on file matches "${qRaw}".</div>`;
    return;
  }

  const history = usage.filter(u=>String(u?.ip||'')===String(dev.ip||'') && (activeBranch==='all' || normalizeBranchId(u?.branch||currentBranch)===activeBranch)).sort((a,b)=>String(a.date||'').localeCompare(String(b.date||'')));
  const mappedUser = String(dev.username || dev.user || '').trim() || 'Not mapped';
  const mappedMac = String(dev.mac || '').trim() || 'Not mapped';
  const mappedBranch = branchLabel(dev.branch || currentBranch);

  box.innerHTML = `
    <div class="device-card">
      <div>
        <div class="name">${dev.name} ${ipStatusBadgeHtml(dev.ip)}</div>
        <div class="meta">${dev.ip} &nbsp;·&nbsp; ${mappedMac}</div>
      </div>
      <div style="margin-top:8px;font-size:12px;color:var(--muted);">User: <b style="color:var(--text)">${mappedUser}</b> &nbsp;·&nbsp; Branch: <b style="color:var(--text)">${mappedBranch}</b></div>
      <div class="badge">${history.length} day${history.length!==1?'s':''} logged</div>
    </div>
    <div class="search-circle-wrap" style="margin-top:18px; height:320px;">
      <canvas id="searchChartCanvas"></canvas>
    </div>
    <div class="table-scroll" style="margin-top:18px; max-height:260px;">
      <table>
        <thead><tr><th>Date</th><th>Usage</th><th>Share of that day</th><th>Applications used</th></tr></thead>
        <tbody>
          ${history.length ? history.slice().reverse().map(h=>`
            <tr><td class="mono">${h.date}</td><td class="mono">${h.bytesDisplay || fmtGB(h.bytesGB)}</td><td class="mono muted">${h.percent!=null?h.percent.toFixed(2)+'%':'—'}</td><td>${appsInlineFor(dev.ip, h.date, activeBranch, 3)}</td></tr>
          `).join('') : `<tr><td colspan="4"><div class="empty">No usage logged for this host yet.</div></td></tr>`}
        </tbody>
      </table>
    </div>
    ${(()=>{
      const tot = appTotalsFor(dev.ip, null, activeBranch);
      const grand = tot.reduce((s,x)=>s+x.gb,0);
      return `<h3 style="margin:22px 0 8px;font-size:14px;">Applications used by ${dailyEscapeHtml(dev.ip)}</h3>
      <div class="table-scroll" style="max-height:300px;">
        <table>
          <thead><tr><th>Application</th><th>Total usage</th><th>Share</th></tr></thead>
          <tbody>
            ${tot.length ? tot.map(x=>`<tr><td>${dailyEscapeHtml(x.app)}</td><td class="mono">${fmtGB(x.gb)}</td><td class="mono muted">${grand?(x.gb/grand*100).toFixed(1)+'%':'—'}</td></tr>`).join('')
              : `<tr><td colspan="3"><div class="empty">No application data for this IP yet. Upload the Host/Application CSV or Sophos Applications CSV.</div></td></tr>`}
          </tbody>
        </table>
      </div>`;
    })()}
  `;

  if(history.length){
    const ctx = document.getElementById('searchChartCanvas');
    if(searchChart) searchChart.destroy();

    const circlePalette = [
      '#38BDF8','#818CF8','#A78BFA','#F472B6',
      '#FB7185','#F59E0B','#FACC15','#34D399',
      '#2DD4BF','#22D3EE','#60A5FA','#C084FC'
    ];

    const circleLabels = history.map(h=>h.date);
    const circleValues = history.map(h=>Number(h.bytesGB)||0);

    searchChart = new Chart(ctx, {
      type:'doughnut',
      data:{
        labels: circleLabels,
        datasets:[{
          label:'Daily usage',
          data: circleValues,
          backgroundColor: circleValues.map((_,i)=>circlePalette[i % circlePalette.length]),
          borderColor:'rgba(15,23,42,0.95)',
          borderWidth:3,
          hoverOffset:12
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        cutout:'62%',
        plugins:{
          legend:{
            display:true,
            position:'right',
            labels:{
              color:'#CBD5E1',
              boxWidth:14,
              boxHeight:14,
              padding:12,
              font:{size:12, weight:'600'}
            }
          },
          tooltip:{
            callbacks:{
              label:(c)=>{
                const total = circleValues.reduce((a,b)=>a+b,0);
                const value = Number(c.raw)||0;
                const pct = total ? ((value/total)*100).toFixed(1) : '0.0';
                return ` ${c.label}: ${fmtGB(value)} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }
}
document.getElementById('searchBtn').addEventListener('click', doSearch);
document.getElementById('searchInput').addEventListener('keydown', e=>{ if(e.key==='Enter') doSearch(); });

/* ================= devices ================= */
let selectedDeviceKeys = new Set();

function deviceKey(d){
  return `${String(d.branch || currentBranch || '').toLowerCase()}|${String(d.ip || '').trim().toLowerCase()}|${String(d.mac || '').trim().toLowerCase()}`;
}

function updateDeviceSelectionUI(list){
  const selectedVisible = list.filter(d=>selectedDeviceKeys.has(deviceKey(d))).length;
  const countEl = document.getElementById('deviceSelectionCount');
  const deleteBtn = document.getElementById('deviceDeleteSelectedBtn');
  const selectAll = document.getElementById('deviceSelectAll');
  if(countEl) countEl.textContent = `${selectedDeviceKeys.size} selected`;
  if(deleteBtn){
    deleteBtn.disabled = selectedDeviceKeys.size === 0;
    deleteBtn.title = selectedDeviceKeys.size ? `Delete ${selectedDeviceKeys.size} selected device(s)` : 'Select devices first';
  }
  if(selectAll){
    selectAll.checked = list.length > 0 && selectedVisible === list.length;
    selectAll.indeterminate = selectedVisible > 0 && selectedVisible < list.length;
  }
}

function renderDevices(){
  const filterVal = (document.getElementById('deviceFilter').value || '').toLowerCase();
  const list = devices.filter(d =>
    String(d.name||'').toLowerCase().includes(filterVal) ||
    String(d.ip||'').toLowerCase().includes(filterVal) ||
    String(d.mac||'').toLowerCase().includes(filterVal) ||
    String(d.username||'').toLowerCase().includes(filterVal)
  );

  document.getElementById('deviceCount').textContent = `${devices.length} devices on file`;
  const body = document.getElementById('devicesTableBody');
  const isAdmin = currentUser && currentUser.role === 'administrator';

  const safe = v => String(v == null ? '' : v)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');

  body.innerHTML = list.map((d,i)=>{
    const location = currentBranch === 'all'
      ? branchLabel(d.branch || 'unknown')
      : branchLabel(currentBranch);
    const key = deviceKey(d);
    const checked = selectedDeviceKeys.has(key);

    return `
    <tr class="${checked ? 'device-row-selected' : ''}">
      <td>
        <input class="device-row-check" type="checkbox" data-device-select-index="${i}"
          ${checked ? 'checked' : ''} aria-label="Select ${safe(d.name || d.ip)}">
      </td>
      <td><strong>${safe(location)}</strong></td>
      <td><button class="ipdir-name-btn" data-device-history-index="${i}">${safe(d.name)}</button></td>
      <td class="mono">${safe(d.ip)}</td>
      <td class="mono muted">${safe(d.mac || '—')}</td>
      <td class="mono muted">${safe(d.username || '—')}</td>
      <td>
        <div class="device-actions">
          <button class="btn small ghost" data-device-edit-index="${i}"
            style="opacity:${isAdmin?1:0.45};cursor:${isAdmin?'pointer':'not-allowed'};">Edit</button>
          <button class="btn small danger" data-device-remove-index="${i}"
            style="opacity:${isAdmin?1:0.45};cursor:${isAdmin?'pointer':'not-allowed'};">Remove</button>
        </div>
      </td>
    </tr>`;
  }).join('') || `<tr><td colspan="7"><div class="empty">No devices match that filter.</div></td></tr>`;

  body.querySelectorAll('.device-row-check').forEach(cb=>{
    cb.addEventListener('change', ()=>{
      const d = list[Number(cb.dataset.deviceSelectIndex)];
      if(!d) return;
      const key = deviceKey(d);
      if(cb.checked) selectedDeviceKeys.add(key);
      else selectedDeviceKeys.delete(key);
      cb.closest('tr')?.classList.toggle('device-row-selected', cb.checked);
      updateDeviceSelectionUI(list);
    });
  });

  body.querySelectorAll('button[data-device-history-index]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const d = list[Number(btn.dataset.deviceHistoryIndex)];
      if(d) showIPUserHistory(
        currentBranch === 'all' ? branchLabel(d.branch || 'unknown') : branchLabel(currentBranch),
        d.ip,
        d.name
      );
      openModule('ipdirectory');
    });
  });

  body.querySelectorAll('button[data-device-edit-index]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      if(!currentUser || currentUser.role !== 'administrator'){
        showToast('Only Administrator can edit devices');
        return;
      }

      const row = btn.closest('tr');
      const index = Number(btn.dataset.deviceEditIndex);
      const original = list[index];
      if(!original || !row) return;

      const originalIp = String(original.ip || '').trim();
      const branchId = original.branch || currentBranch;
      const originalDeviceIndex = devices.indexOf(original);

      row.innerHTML = `
        <td></td>
        <td><strong>${safe(currentBranch === 'all' ? branchLabel(branchId) : branchLabel(currentBranch))}</strong></td>
        <td><input type="text" data-edit-name value="${safe(original.name)}" style="width:100%;min-width:120px;"></td>
        <td><input type="text" data-edit-ip value="${safe(original.ip)}" style="width:100%;min-width:120px;" class="mono"></td>
        <td><input type="text" data-edit-mac value="${safe(original.mac || '')}" style="width:100%;min-width:120px;" class="mono"></td>
        <td><input type="text" data-edit-username value="${safe(original.username || '')}" style="width:100%;min-width:120px;"></td>
        <td>
          <div class="device-actions">
            <button class="btn small" type="button" data-device-save-edit>Save</button>
            <button class="btn small ghost" type="button" data-device-cancel-edit>Cancel</button>
          </div>
        </td>`;

      row.querySelector('[data-device-cancel-edit]').addEventListener('click', ()=>renderDevices());

      row.querySelector('[data-device-save-edit]').addEventListener('click', async ()=>{
        const name = row.querySelector('[data-edit-name]').value.trim();
        const ip = row.querySelector('[data-edit-ip]').value.trim();
        const mac = row.querySelector('[data-edit-mac]').value.trim() || '—';
        const username = row.querySelector('[data-edit-username]').value.trim();

        if(!name || !ip){
          showToast('Name and IP are required');
          return;
        }

        const deviceIndex = originalDeviceIndex >= 0
          ? originalDeviceIndex
          : devices.findIndex(d =>
              String(d.ip || '').trim().toLowerCase() === originalIp.toLowerCase() &&
              String(d.branch || currentBranch) === String(branchId)
            );

        if(deviceIndex < 0) {
          showToast('Device could not be found');
          return;
        }

        const duplicate = devices.some((d, idx) =>
          idx !== deviceIndex &&
          String(d.ip || '').trim().toLowerCase() === ip.toLowerCase() &&
          String(d.branch || currentBranch) === String(branchId)
        );

        if(duplicate){
          showToast('Another device already uses this IP in this branch');
          return;
        }

        const oldKey = deviceKey(original);
        const updated = {...devices[deviceIndex], name, ip, mac, username};
        devices[deviceIndex] = updated;
        if(selectedDeviceKeys.has(oldKey)){
          selectedDeviceKeys.delete(oldKey);
          selectedDeviceKeys.add(deviceKey(updated));
        }

        try{
          if(currentBranch === 'all'){
            const branchDevices = devices
              .filter(d => String(d.branch || '') === String(branchId))
              .map(d => { const copy={...d}; delete copy.branch; return copy; });
            await store.set(`${DEVICE_KEY}::${branchId}`, JSON.stringify(branchDevices), true);
          }else{
            await saveDevices();
          }

          renderDevices();
          populateIpDatalist();
          populateHostDashSelects();

          if(originalIp !== ip) await logChange('Edited device', `${name}: IP ${originalIp} → ${ip}`);
          else await logChange('Edited device', `${name} (${ip})`);

          showToast('Device updated successfully');
        }catch(e){
          console.error('Could not update device', e);
          devices[deviceIndex] = original;
          showToast('Could not save device — try again');
          renderDevices();
        }
      });
    });
  });

  body.querySelectorAll('button[data-device-remove-index]').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      if(!currentUser || currentUser.role !== 'administrator'){
        showToast('Only Administrator can remove devices');
        return;
      }

      const index = Number(btn.dataset.deviceRemoveIndex);
      const removed = list[index];
      if(!removed) return;

      const branchId = removed.branch || currentBranch;
      devices = devices.filter(d => d !== removed);
      selectedDeviceKeys.delete(deviceKey(removed));

      if(currentBranch === 'all'){
        const branchDevices = devices
          .filter(d => String(d.branch || '') === String(branchId))
          .map(d => { const copy={...d}; delete copy.branch; return copy; });
        await store.set(`${DEVICE_KEY}::${branchId}`, JSON.stringify(branchDevices), true);
      }else{
        await saveDevices();
      }

      renderDevices();
      populateIpDatalist();
      populateHostDashSelects();
      showToast('Device removed');
      await logChange('Removed device', `${removed.name} (${removed.ip})`);
    });
  });

  updateDeviceSelectionUI(list);
}

document.getElementById('deviceFilter').addEventListener('input', renderDevices);

document.getElementById('deviceSelectAll')?.addEventListener('change', ()=>{
  const filterVal = (document.getElementById('deviceFilter').value || '').toLowerCase();
  const visible = devices.filter(d =>
    String(d.name||'').toLowerCase().includes(filterVal) ||
    String(d.ip||'').toLowerCase().includes(filterVal) ||
    String(d.mac||'').toLowerCase().includes(filterVal) ||
    String(d.username||'').toLowerCase().includes(filterVal)
  );
  const checked = document.getElementById('deviceSelectAll').checked;
  visible.forEach(d=>{
    if(checked) selectedDeviceKeys.add(deviceKey(d));
    else selectedDeviceKeys.delete(deviceKey(d));
  });
  renderDevices();
});

document.getElementById('deviceClearSelectionBtn')?.addEventListener('click', ()=>{
  selectedDeviceKeys.clear();
  renderDevices();
});

document.getElementById('deviceDeleteSelectedBtn')?.addEventListener('click', async ()=>{
  if(!currentUser || currentUser.role !== 'administrator'){
    showToast('Only Administrator can delete devices');
    return;
  }
  const selected = devices.filter(d=>selectedDeviceKeys.has(deviceKey(d)));
  if(!selected.length){
    showToast('Select at least one device');
    return;
  }
  if(!confirm(`Delete ${selected.length} selected device${selected.length===1?'':'s'}? This cannot be undone.`)) return;

  const selectedByBranch = {};
  selected.forEach(d=>{
    const bid = normalizeBranchId(d.branch || currentBranch) || currentBranch;
    (selectedByBranch[bid] ||= []).push(d);
  });

  try{
    const removedCount = selected.length;

    if(currentBranch === 'all'){
      for(const [bid] of Object.entries(selectedByBranch)){
        const branchDevices = devices
          .filter(d => String(d.branch || '') === String(bid) && !selectedDeviceKeys.has(deviceKey(d)))
          .map(d => { const copy={...d}; delete copy.branch; return copy; });
        await store.set(`${DEVICE_KEY}::${bid}`, JSON.stringify(branchDevices), true);
      }
    }else{
      devices = devices.filter(d=>!selectedDeviceKeys.has(deviceKey(d)));
      await saveDevicesAfterBulkDeviceDelete();
    }

    devices = devices.filter(d=>!selectedDeviceKeys.has(deviceKey(d)));
    selectedDeviceKeys.clear();

    renderDevices();
    populateIpDatalist();
    populateHostDashSelects();
    await logChange('Bulk deleted devices', `${removedCount} device${removedCount===1?'':'s'}`);
    showToast(`${removedCount} device${removedCount===1?'':'s'} deleted successfully`);
  }catch(e){
    console.error('Bulk device delete failed', e);
    showToast('Could not delete selected devices — try again');
  }
});

/* Helper used only by bulk delete; preserves the existing branch save format. */
async function saveDevicesAfterBulkDeviceDelete(){
  await saveDevices();
}

document.getElementById('deviceFilter').addEventListener('input', renderDevices);

document.getElementById('addDeviceBtn').addEventListener('click', async ()=>{
  if(!currentUser || currentUser.role !== 'administrator'){ showToast('Only Administrator can add devices'); return; }
  const name = document.getElementById('newDevName').value.trim();
  const ip = document.getElementById('newDevIp').value.trim();
  const mac = document.getElementById('newDevMac').value.trim() || '—';
  const username = document.getElementById('newDevUsername').value.trim();
  const feedback = document.getElementById('deviceFeedback');

  if(!name || !ip){ feedback.textContent = 'Name and IP are required.'; feedback.style.color='var(--danger)'; return; }

  // An IP can be reused by a different device record when its MAC is different
  // (useful for laptops/phones moving between DHCP assignments). Block only a
  // true duplicate record: same IP + same MAC.
  const normalizedIp = ip.toLowerCase();
  const normalizedMac = (mac || '—').toLowerCase();
  const exactDuplicate = devices.some(d =>
    String(d.ip || '').trim().toLowerCase() === normalizedIp &&
    String(d.mac || '—').trim().toLowerCase() === normalizedMac
  );
  if(exactDuplicate){
    feedback.textContent = 'This IP + MAC device is already on file. Use Edit to change it.';
    feedback.style.color='var(--danger)';
    return;
  }

  const sameIp = devices.some(d => String(d.ip || '').trim().toLowerCase() === normalizedIp);
  devices.push({name, ip, mac, username});
  await saveDevices();
  document.getElementById('newDevName').value='';
  document.getElementById('newDevIp').value='';
  document.getElementById('newDevMac').value='';
  document.getElementById('newDevUsername').value='';
  feedback.textContent = sameIp
    ? `Added ${name}. Same IP exists, but this device has a different MAC.`
    : `Added ${name}.`;
  feedback.style.color = 'var(--accent)';
  renderDevices();
  populateIpDatalist();
  populateHostDashSelects();
  await logChange('Added device', `${name} (${ip})`);
});

/* Bulk add devices: paste or upload "name, ip, mac, username" lines */
const bulkDeviceFileInput = document.getElementById('bulkDeviceFileInput');
if(bulkDeviceFileInput){
  bulkDeviceFileInput.addEventListener('change', async ()=>{
    const file = bulkDeviceFileInput.files && bulkDeviceFileInput.files[0];
    if(!file) return;
    const fb = document.getElementById('bulkDeviceFeedback');
    if(window.FmtImport){
      const r = await window.FmtImport.run('devices', file, (document.getElementById('bulkDeviceFormatSelect')||{}).value==='table');
      if(r===null){ bulkDeviceFileInput.value=''; if(fb) fb.textContent='Upload cancelled.'; return; }
      if(typeof r==='string'){ document.getElementById('bulkDeviceArea').value = r; if(fb) fb.textContent='Format applied — press Bulk add.'; return; }
    }
    const reader = new FileReader();
    reader.onload = ()=>{ document.getElementById('bulkDeviceArea').value = reader.result; };
    reader.readAsText(file);
  });
}

const bulkDeviceClearBtn = document.getElementById('bulkDeviceClearBtn');
if(bulkDeviceClearBtn){
  bulkDeviceClearBtn.addEventListener('click', ()=>{
    document.getElementById('bulkDeviceArea').value = '';
    document.getElementById('bulkDeviceFileInput').value = '';
    document.getElementById('bulkDeviceFeedback').textContent = '';
  });
}

const bulkAddDevicesBtn = document.getElementById('bulkAddDevicesBtn');
if(bulkAddDevicesBtn){
  bulkAddDevicesBtn.addEventListener('click', async ()=>{
    if(!currentUser || currentUser.role !== 'administrator'){ showToast('Only Administrator can add devices'); return; }
    const feedback = document.getElementById('bulkDeviceFeedback');
    const raw = document.getElementById('bulkDeviceArea').value;
    const lines = raw.split(/\r?\n/).map(l=>l.trim()).filter(l=>l.length);

    if(!lines.length){ feedback.textContent = 'Paste at least one device line first.'; feedback.style.color='var(--danger)'; return; }

    const IP_RE = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    let added = 0, autoNamed = 0, skippedDup = 0, skippedBad = 0;
    const addedNames = [];
    const seenIps = new Set();

    for(const line of lines){
      let name, ip, mac, username;

      if(line.includes(',')){
        // Comma-separated: name, ip, mac, username
        const parts = line.split(/[,\t]/).map(p=>p.trim()).filter(Boolean);
        if(parts.length === 1 && IP_RE.test(parts[0])){
          ip = parts[0];
          name = `NEW-DEVICE-${ip.split('.').pop()}`;
          autoNamed++;
        }else{
          [name, ip, mac, username] = parts;
        }
      }else{
        // No commas: space/tab-separated, e.g. "192.168.30.44 CPPLUS coordinator gf"
        // or a single bare IP. Find the IP token wherever it sits and use whatever
        // else is on the line as the device name.
        const tokens = line.split(/\s+/).filter(Boolean);
        const ipIndex = tokens.findIndex(t=>IP_RE.test(t));
        if(ipIndex === -1){ skippedBad++; continue; }
        ip = tokens[ipIndex];
        const rest = tokens.filter((_,i)=>i!==ipIndex);
        if(rest.length){
          name = rest.join(' ');
        }else{
          name = `NEW-DEVICE-${ip.split('.').pop()}`;
          autoNamed++;
        }
      }

      if(!name || !ip || !IP_RE.test(ip)){ skippedBad++; continue; }
      if(devices.some(d=>d.ip===ip) || seenIps.has(ip)){ skippedDup++; continue; }

      devices.push({ name, ip, mac: mac || '—', username: username || '' });
      seenIps.add(ip);
      addedNames.push(name);
      added++;
    }

    if(added){
      await saveDevices();
      renderDevices();
      populateIpDatalist();
      populateHostDashSelects();
      await logChange('Bulk added devices', `${added} device(s): ${addedNames.join(', ')}`);
    }

    feedback.style.color = added ? 'var(--accent)' : 'var(--danger)';
    feedback.textContent = `Added ${added}${autoNamed ? ` (${autoNamed} auto-named from IP-only lines)` : ''}. Skipped ${skippedDup} duplicate IP(s), ${skippedBad} bad line(s).`;
    if(added){
      document.getElementById('bulkDeviceArea').value = '';
      document.getElementById('bulkDeviceFileInput').value = '';
    }
  });
}

/* Monthly Report buttons */
const downloadMonthlyExcelBtn = document.getElementById('downloadMonthlyExcelBtn');
if(downloadMonthlyExcelBtn){
  downloadMonthlyExcelBtn.addEventListener('click', downloadMonthlyExcel);
}
const downloadMonthlyPdfBtn = document.getElementById('downloadMonthlyPdfBtn');
if(downloadMonthlyPdfBtn){
  downloadMonthlyPdfBtn.addEventListener('click', downloadPdfReport);
}

/* ================= init (runs after successful login) ================= */
async function startApp(){
  if(IS_MANAGER_SNAPSHOT) document.body.classList.add('manager-snapshot');
  try{ addRow(); }catch(e){ console.error('addRow failed', e); }
  const reportMonthInput = document.getElementById('reportMonth');
  if(reportMonthInput) reportMonthInput.value = todayISO().slice(0,7);
  const note = document.getElementById('footerNote');
  if(note) note.textContent = CLOUD_STORAGE
    ? "Data is saved to Claude's storage — permanent across refreshes, on any device you sign in from."
    : "Data is saved to this browser's local storage — permanent across refreshes on this device/browser only.";
  // Each step is isolated so one failing widget can never stop the sidebar total from rendering.
  [updateBranchUI, renderSidebar, renderDevices, populateIpDatalist, populateHostDashSelects].forEach(fn=>{
    try{ fn(); }catch(e){ console.error('startApp step failed:', fn.name, e); }
  });
  // If Firebase was slow/unreachable on the first read, keep retrying in the
  // background so the total appears by itself right after login.
  (function(){
    let tries=0;
    const hasData=()=>(Array.isArray(usage)&&usage.length)||(Array.isArray(appUsage)&&appUsage.length);
    if(hasData()) return;
    const sub=document.getElementById('tickerSub');
    if(sub) sub.textContent='Loading data from Firebase…';
    const tm=setInterval(async()=>{
      tries++;
      if(hasData()||tries>6){ clearInterval(tm); try{renderSidebar();}catch(e){} return; }
      try{ isLoadingState=true; await loadState(); refreshAllDataViews(); }
      catch(e){ console.warn('auto reload failed', e); }
      finally{ isLoadingState=false; }
    }, 5000);
  })();

  const requestedView = new URLSearchParams(window.location.search).get('view');
  const allowedViews = ['home','dashboard','add','search','devices','ipdirectory','hostdash','firewall','admin'];
  if(IS_MANAGER_SNAPSHOT){
    openModule('firewall', false);
  }else if(requestedView && allowedViews.includes(requestedView)){
    openModule(requestedView, false);
  }else{
    openModule('home', false);
  }
}

/* ================= branch switching ================= */
function updateBranchUI(){
  const sel = document.getElementById('branchSelect');
  if(sel) sel.value = currentBranch;
  const filterBranch = document.getElementById('hdBranch');
  if(filterBranch && ['all','chennai','bangalore','hosur'].includes(currentBranch)) filterBranch.value = currentBranch;
  const label = branchLabel(currentBranch);
  const suffix = currentBranch === 'all' ? '' : ' Branch';
  const pill = document.getElementById('branchPill');
  if(pill) pill.textContent = `${label}${suffix}`;
  const pillHome = document.getElementById('branchPillHome');
  if(pillHome) pillHome.textContent = `${label}${suffix}`;
  document.title = `NOC · Bandwidth Ledger — ${label}`;
}

async function openFirewallBranch(branchId){
  if(!BRANCHES.some(b=>b.id===branchId)) return;
  const wasFirewallView = document.getElementById('view-firewall')?.classList.contains('active');
  const scrollY = window.scrollY;

  // Firewall branch state is completely LOCAL to Firewall Dashboard.
  // Never modify currentBranch, the sidebar branch, or the main dashboard filter.
  firewallMode = 'branch';
  firewallSelectedBranch = branchId;

  const url = new URL(window.location.href);
  url.searchParams.set('view', 'firewall');
  url.searchParams.set('fwbranch', branchId);
  url.searchParams.delete('branch');
  url.searchParams.delete('scope');
  window.history.replaceState({}, '', url.toString());

  await renderFirewallDashboard();
  if(!wasFirewallView) openModule('firewall', false);
  requestAnimationFrame(()=>window.scrollTo(0, scrollY));
}

async function openFirewallAll(){
  const wasFirewallView = document.getElementById('view-firewall')?.classList.contains('active');
  const scrollY = window.scrollY;

  // All Branches is LOCAL to this Firewall page. It must NOT change
  // currentBranch, the main dashboard branch selector, or any other page.
  firewallMode = 'all';

  const url = new URL(window.location.href);
  url.searchParams.set('view', 'firewall');
  url.searchParams.set('scope', 'all');
  url.searchParams.delete('fwbranch');
  window.history.replaceState({}, '', url.toString());

  await renderFirewallDashboard();
  if(!wasFirewallView) openModule('firewall', false);
  requestAnimationFrame(()=>window.scrollTo(0, scrollY));
}

async function switchBranch(branchId){
  if(!BRANCHES.some(b=>b.id===branchId)) return;

  // Snapshot Firewall state. This function is ONLY for the main Dashboard
  // branch selector, so Firewall must remain untouched even when its page
  // happens to be visible.
  const savedFirewallMode = firewallMode;
  const savedFirewallSelectedBranch = firewallSelectedBranch;

  // Safety: branch users can never switch outside their assigned branch.
  if(currentUser && currentUser.role !== 'administrator'){
    branchId = currentUser.branch || 'chennai';
  }

  const select = document.getElementById('branchSelect');
  if(select) select.disabled = true;

  currentBranch = branchId;
  try{ await store.set(BRANCH_PREF_KEY, currentBranch, false); }catch(e){}

  // Update the URL without forcing a browser reload. The previous implementation
  // used location.replace(), which could restore the old "all" branch preference
  // before the new branch state finished loading.
  const url = new URL(window.location.href);
  url.searchParams.set('branch', currentBranch);
  window.history.replaceState({}, '', url.toString());

  try{
    // IMPORTANT: the main Dashboard branch selector is independent from Firewall.
    // Changing Chennai/Bangalore/Hosur here must NEVER change the Firewall
    // branch selection or Firewall mode.

    // Load the selected branch for the normal dashboard modules only.
    await loadState();
    updateBranchUI();
    renderSidebar();
    renderDashboard();
    renderDevices();
    populateIpDatalist();
    populateHostDashSelects();

    // Re-render whichever module is open (except Firewall) so it never shows the
    // previous branch's numbers after switching branch.
    try{
      const __v=currentViewId();
      if(__v==='hostdash') renderHostDashboard();
      else if(__v==='ipdirectory') renderIPDirectory();
      else if(__v==='dailymanager') dmReload();
    }catch(e){ console.warn('view refresh after branch switch failed',e); }

    // Do NOT re-render Firewall here. Its own state (firewallMode /
    // firewallSelectedBranch) must remain exactly as the user left it.

    window.dispatchEvent(new Event('noc-data-updated'));
  }catch(err){
    console.error('Branch switch failed', err);
    showToast('Could not load ' + branchLabel(branchId) + ' data. Please try again.');
  }finally{
    // Hard safety net: main Dashboard branch switching can never alter
    // Firewall scope or selected Firewall branch.
    firewallMode = savedFirewallMode;
    firewallSelectedBranch = savedFirewallSelectedBranch;

    if(select){
      select.value = currentBranch;
      select.disabled = !(currentUser && currentUser.role === 'administrator');
    }
  }
}

const branchSelectEl = document.getElementById('branchSelect');
if(branchSelectEl){
  branchSelectEl.addEventListener('change', async (e)=>{
    await switchBranch(e.target.value);
  });
}

const hdBranchFilter = document.getElementById('hdBranch');
if(hdBranchFilter){
  hdBranchFilter.addEventListener('change', async (e)=>{
    const value = e.target.value;
    if(['all','chennai','bangalore','hosur'].includes(value) && currentUser?.role === 'administrator') {
      await switchBranch(value);
    }
  });
}



/* ================= password show/hide toggles ================= */
const EYE_OPEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_CLOSED = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"/><path d="M10.6 10.6a3 3 0 0 0 4.24 4.24"/><path d="M9.9 4.24A10.9 10.9 0 0 1 12 4c7 0 10.5 7 10.5 7a13.4 13.4 0 0 1-3.15 4.02M6.2 6.2C3.6 7.9 1.5 11 1.5 11.5s3.5 7 10.5 7c1.36 0 2.6-.24 3.7-.66"/></svg>';

function setupPasswordToggles(){
  document.querySelectorAll('input[type="password"]').forEach(inp=>{
    if(inp.dataset.pwWrapped) return;
    inp.dataset.pwWrapped = '1';

    const wrap = document.createElement('div');
    wrap.className = 'pw-field';
    inp.parentNode.insertBefore(wrap, inp);
    wrap.appendChild(inp);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pw-toggle';
    btn.setAttribute('aria-label', 'Show password');
    btn.innerHTML = EYE_OPEN;
    btn.addEventListener('click', ()=>{
      const isHidden = inp.type === 'password';
      inp.type = isHidden ? 'text' : 'password';
      btn.innerHTML = isHidden ? EYE_CLOSED : EYE_OPEN;
      btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });
    wrap.appendChild(btn);
  });
}
setupPasswordToggles();

// ---- Forgot-password recovery: resets the "administrator" account back
// to the built-in default password, in case it was changed or an older
// seeded account is stuck in storage. Available from the sign-in screen.
const resetAdminLink = document.getElementById('resetAdminLink');
if(resetAdminLink){
  resetAdminLink.addEventListener('click', async (e)=>{
    e.preventDefault();
    const ok = confirm(
      `Reset the "administrator" account password back to the default (${NEW_ADMIN_PASSWORD})?\n\n` +
      `This only resets the Administrator login — other user accounts are unaffected.`
    );
    if(!ok) return;
    await loadAccounts();
    accounts[NEW_ADMIN_USERNAME] = {
      password: NEW_ADMIN_PASSWORD,
      role: 'administrator',
      label: NEW_ADMIN_LABEL,
      lastLogin: accounts[NEW_ADMIN_USERNAME] ? accounts[NEW_ADMIN_USERNAME].lastLogin : null
    };
    await saveAccounts();
    document.getElementById('loginUser').value = NEW_ADMIN_USERNAME;
    document.getElementById('loginPass').value = NEW_ADMIN_PASSWORD;
    const errEl = document.getElementById('loginError');
    if(errEl) errEl.textContent = '';
    const hintEl = document.getElementById('signinHint');
    if(hintEl){ hintEl.textContent = `Administrator password reset to ${NEW_ADMIN_PASSWORD}. Click Sign in.`; hintEl.classList.remove('warn'); }
  });
}


/* ================= support ticket ================= */
const SUPPORT_EMAIL = 'karthik@msdgschennai.com';
const supportFabBtn = document.getElementById('supportFabBtn');
const supportOverlay = document.getElementById('supportModalOverlay');
const suppTitle = document.getElementById('suppTitle');
const suppModule = document.getElementById('suppModule');
const suppUrl = document.getElementById('suppUrl');
const suppDetails = document.getElementById('suppDetails');
const suppFile = document.getElementById('suppFile');
const suppError = document.getElementById('suppError');

function openSupportModal(){
  suppUrl.value = window.location.href;
  suppError.textContent = '';
  supportOverlay.classList.add('open');
}
function closeSupportModal(){
  supportOverlay.classList.remove('open');
  suppTitle.value = '';
  suppModule.value = '';
  suppUrl.value = '';
  suppDetails.value = '';
  suppFile.value = '';
  suppError.textContent = '';
}

supportFabBtn.addEventListener('click', openSupportModal);
document.getElementById('supportModalCloseX').addEventListener('click', closeSupportModal);
document.getElementById('suppCloseBtn').addEventListener('click', closeSupportModal);
supportOverlay.addEventListener('click', (e)=>{ if(e.target === supportOverlay) closeSupportModal(); });

document.getElementById('suppCreateBtn').addEventListener('click', async ()=>{
  const title = suppTitle.value.trim();
  const mod = suppModule.value;
  const url = suppUrl.value.trim();
  const details = suppDetails.value.trim();
  const hasFile = suppFile.files && suppFile.files.length > 0;

  if(!title || !mod || !details){
    suppError.textContent = 'Title, Module, and Issue Details are required.';
    return;
  }

  const who = currentUser ? `${currentUser.label} (${currentUser.username}, ${currentUser.role})` : 'Not signed in';
  const bodyLines = [
    `Reported by: ${who}`,
    `Branch: ${branchLabel(currentBranch)}`,
    `Module: ${mod}`,
    `URL: ${url || '—'}`,
    '',
    'Issue details:',
    details,
    ''
  ];
  if(hasFile){
    bodyLines.push(`Attachment: "${suppFile.files[0].name}" was selected — please attach it manually to this email before sending, as browsers can't attach files automatically.`);
  }

  const subject = `[Bandwidth Ledger Support] ${title}`;
  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

  await logChangeAs(currentUser ? currentUser.label : 'Guest', currentUser ? currentUser.role : '—', 'Support ticket', `${title} — ${mod}${hasFile ? ' (with attachment)' : ''}`);

  window.location.href = mailto;
  showToast('Opening your email app to send this ticket…');
  closeSupportModal();
});

document.getElementById('themeToggleDesktop').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);
initTheme();


// ===== Branch IP Directory (merged module) =====
/* IP_DIRECTORY_BASE lives in js/data/ip-directory-base.js */
let IP_DIRECTORY_DATA = IP_DIRECTORY_BASE.slice();
function branchIdFromDirectoryName(name){
  const map={Chennai:'chennai',Bangalore:'bangalore',Hosur:'hosur'};
  return map[name] || String(name||'').toLowerCase();
}
function directoryRecordsForBranch(branchId){
  const label=branchLabel(branchId);
  return IP_DIRECTORY_BASE.filter(x=>x.b===label);
}

// Keeps the IP Directory (and every total built from it) in sync with the
// Device directory of all branches. Any device added anywhere shows up here.
let ipDirSyncBusy=false;
async function syncIPDirectoryFromDevices(rerender){
  if(ipDirSyncBusy) return;
  ipDirSyncBusy=true;
  try{
    const rows=IP_DIRECTORY_BASE.slice();
    const seen=new Set(rows.map(x=>`${String(x.b||'').toLowerCase()}|${String(x.ip||'').trim()}`));
    const addRow=(bid,d)=>{
      const ip=String(d&&d.ip||'').trim();
      if(!ip) return;
      const id=normalizeBranchId(d&&d.branch||bid)||bid;
      const key=`${String(branchLabel(id)).toLowerCase()}|${ip}`;
      if(seen.has(key)) return;
      seen.add(key);
      rows.push({b:branchLabel(id), ip, h:(d&&(d.name||d.username))||ip});
    };
    for(const bid of ['chennai','bangalore','hosur']){
      let list=[];
      try{
        const r=await store.get(`${DEVICE_KEY}::${bid}`,true);
        list=r&&r.value?JSON.parse(r.value):[];
      }catch(e){}
      (Array.isArray(list)?list:[]).forEach(d=>addRow(bid,d));
    }
    // Devices held in memory for the branch in view (saved a moment ago).
    if(Array.isArray(devices)) devices.forEach(d=>addRow(currentBranch==='all'?'chennai':currentBranch,d));
    IP_DIRECTORY_DATA=rows;
  }finally{ ipDirSyncBusy=false; }
  if(rerender!==false){ try{ renderIPDirectory(); }catch(e){} }
}
function seedDevicesForBranch(branchId){
  const seedMap=new Map(SEED_DEVICES.map(([name,mac,ip])=>[ip,{name,mac,ip,username:''}]));
  return directoryRecordsForBranch(branchId).map(x=>{
    const seed=seedMap.get(x.ip);
    return seed ? {...seed, name: seed.name||x.h||'—'} : {name:x.h||'—',mac:'—',ip:x.ip,username:''};
  });
}
function usageToGBSafe(row){
  if(typeof row.bytesGB==='number') return row.bytesGB;
  const n=parseFloat(String(row.bytesDisplay||'').replace(/[^0-9.]/g,''));
  const t=String(row.bytesDisplay||'').toUpperCase();
  if(!Number.isFinite(n)) return 0;
  if(t.includes('TB')) return n*1024;
  if(t.includes('MB')) return n/1024;
  if(t.includes('KB')) return n/(1024*1024);
  if(t.includes('B') && !t.includes('GB')) return n/(1024*1024*1024);
  return n;
}
async function getUsageForBranch(branchId,ip){
  try{
    const r=await store.get(`${USAGE_KEY}::${branchId}`,true);
    const rows=r&&r.value?JSON.parse(r.value):[];
    return Array.isArray(rows)?rows.filter(u=>u.ip===ip):[];
  }catch(e){return [];}
}
async function showIPUserHistory(branchName,ip,name){
  const detail=document.getElementById('ipdirDetail');
  if(!detail) return;
  detail.innerHTML=`<div class="ipdir-detail"><div class="muted">Loading user history…</div></div>`;
  const branchId=branchIdFromDirectoryName(branchName);
  const rows=(await getUsageForBranch(branchId,ip)).sort((a,b)=>String(b.date).localeCompare(String(a.date)));
  const total=rows.reduce((sum,r)=>sum+usageToGBSafe(r),0);
  const latest=rows[0]?.date||'No usage logged yet';
  detail.innerHTML=`<div class="ipdir-detail">
    <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap"><div><h3 style="margin:0 0 5px">${name||'Unnamed device'}</h3><div class="mono muted">${ip} · ${branchName}</div></div><span class="ipdir-chip">${branchName} branch</span></div>
    <div class="ipdir-detail-grid">
      <div class="ipdir-detail-stat"><b>${rows.length}</b><span>Usage days logged</span></div>
      <div class="ipdir-detail-stat"><b>${fmtGB(total)}</b><span>Total data used</span></div>
      <div class="ipdir-detail-stat"><b>${latest}</b><span>Latest record</span></div>
    </div>
    <div class="ipdir-detail-actions"><button class="btn small" id="ipdirOpenSearch">Open full usage view</button><button class="btn small ghost" id="ipdirSwitchBranch">Switch to ${branchName}</button></div>
    <div class="table-scroll" style="max-height:280px;margin-top:14px"><table><thead><tr><th>Date</th><th>Usage</th><th>Share</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td class="mono">${r.date||'—'}</td><td class="mono">${r.bytesDisplay||fmtGB(usageToGBSafe(r))}</td><td class="mono muted">${r.percent==null?'—':r.percent+'%'}</td></tr>`).join(''):'<tr><td colspan="3"><div class="empty">No usage data has been logged for this IP yet. Add usage from “Add today’s data” after selecting this branch.</div></td></tr>'}</tbody></table></div>
  </div>`;
  document.getElementById('ipdirOpenSearch').onclick=async()=>{
    if(currentBranch!==branchId) await switchBranch(branchId);
    openModule('search');
    document.getElementById('searchInput').value=ip;
    doSearch();
  };
  document.getElementById('ipdirSwitchBranch').onclick=async()=>{
    if(currentBranch!==branchId) await switchBranch(branchId);
    else showToast(`${branchName} is already selected`);
  };
  detail.scrollIntoView({behavior:'smooth',block:'nearest'});
}
let ipdirBranch = currentBranch === 'all' ? 'all' : String(currentBranch).toLowerCase();

function renderIPDirectory(){
  // SECURITY: non-admin users can only see their assigned branch.
  if(currentUser && currentUser.role !== 'administrator'){
    const assigned = String(currentUser.branch || currentBranch || 'chennai').toLowerCase();
    currentBranch = assigned;
    ipdirBranch = assigned;

    document.querySelectorAll('.ipdir-branch-btn').forEach(btn=>{
      const id = String(btn.dataset.ipbranch || '').toLowerCase();
      btn.style.display = (id === assigned) ? '' : 'none';
    });
  }

  // This selector is LOCAL to the Branch IP Directory.
  // It never calls switchBranch(), never changes the URL and never refreshes.
  const active = (ipdirBranch || currentBranch || 'chennai').toLowerCase();
  const q = (document.getElementById('ipdirSearch')?.value || '').trim().toLowerCase();

  const branchOf = x => String(x.b || '').toLowerCase();

  const counts = {
    all: IP_DIRECTORY_DATA.length,
    chennai: IP_DIRECTORY_DATA.filter(x=>branchOf(x)==='chennai').length,
    bangalore: IP_DIRECTORY_DATA.filter(x=>branchOf(x)==='bangalore').length,
    hosur: IP_DIRECTORY_DATA.filter(x=>branchOf(x)==='hosur').length
  };

  const countEls = {
    all: document.getElementById('ipdirCountAll'),
    chennai: document.getElementById('ipdirCountChennai'),
    bangalore: document.getElementById('ipdirCountBangalore'),
    hosur: document.getElementById('ipdirCountHosur')
  };

  Object.entries(counts).forEach(([id,n])=>{
    if(countEls[id]) countEls[id].textContent = `${n.toLocaleString()} IPs`;
  });

  const branchRows = active === 'all'
    ? IP_DIRECTORY_DATA.slice()
    : IP_DIRECTORY_DATA.filter(x=>branchOf(x)===active);

  const filtered = branchRows.filter(x=>{
    const hay = `${x.b || ''} ${x.ip || ''} ${x.h || ''}`.toLowerCase();
    return hay.includes(q);
  });

  function getIPDirectoryExportRows(){
  const active = (ipdirBranch || 'all').toLowerCase();
  const q = (document.getElementById('ipdirSearch')?.value || '').trim().toLowerCase();
  const branchOf = x => String(x.b || '').toLowerCase();
  const branchRows = active === 'all'
    ? IP_DIRECTORY_DATA.slice()
    : IP_DIRECTORY_DATA.filter(x => branchOf(x) === active);
  return branchRows.filter(x => {
    const hay = `${x.b || ''} ${x.ip || ''} ${x.h || ''}`.toLowerCase();
    return hay.includes(q);
  });
}

function ipDirectoryFileLabel(){
  const active = (ipdirBranch || 'all').toLowerCase();
  return active === 'all' ? 'all-branches' : active;
}

function downloadIPDirectoryExcel(){
  const rows = getIPDirectoryExportRows();
  if(!rows.length){ showToast('No IP data to export'); return; }
  const data = rows.map((x,i)=>({
    'S.No': i + 1,
    'Location': x.b || '',
    'IP Address': x.ip || '',
    'Hostname / Device': x.h || ''
  }));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  ws['!cols'] = [{wch:8},{wch:16},{wch:20},{wch:34}];
  XLSX.utils.book_append_sheet(wb, ws, 'IP Directory');
  const fname = `ip-directory-${ipDirectoryFileLabel()}-${todayISO()}.xlsx`;
  XLSX.writeFile(wb, fname);
  showToast(`Downloaded ${rows.length.toLocaleString()} IP records as Excel ✓`);
  if(typeof logChange === 'function') logChange('Downloaded IP Directory Excel', fname);
}

function downloadIPDirectoryPDF(){
  const rows = getIPDirectoryExportRows();
  if(!rows.length){ showToast('No IP data to export'); return; }
  if(!window.jspdf || !window.jspdf.jsPDF){
    showToast('PDF library is still loading. Please try again.');
    return;
  }
  const active = (ipdirBranch || 'all').toLowerCase();
  const label = active === 'all' ? 'All Branches' : branchLabel(active);
  const q = (document.getElementById('ipdirSearch')?.value || '').trim();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:'landscape', unit:'mm', format:'a4'});
  const generated = new Date().toLocaleString();

  doc.setFont('helvetica','bold');
  doc.setFontSize(18);
  doc.text(`${label} IP Directory`, 14, 16);
  doc.setFont('helvetica','normal');
  doc.setFontSize(9);
  doc.setTextColor(95,105,120);
  doc.text(`IP / Hostname Directory Report  •  Generated: ${generated}`, 14, 22);
  doc.text(`Records: ${rows.length.toLocaleString()}${q ? `  •  Search: ${q}` : ''}`, 14, 27);
  doc.setTextColor(0,0,0);

  doc.autoTable({
    startY: 33,
    head: [['S.No','Location','IP Address','Hostname / Device']],
    body: rows.map((x,i)=>[i+1, x.b || '', x.ip || '', x.h || '']),
    theme: 'grid',
    styles: {fontSize: 8, cellPadding: 2.2, overflow: 'linebreak'},
    headStyles: {fillColor: [32,52,84], textColor: [255,255,255], fontStyle: 'bold'},
    columnStyles: {0:{cellWidth:14},1:{cellWidth:38},2:{cellWidth:48},3:{cellWidth:'auto'}},
    margin: {left:14,right:14},
    didDrawPage: function(data){
      const page = doc.internal.getNumberOfPages();
      doc.setFontSize(8);
      doc.setTextColor(120,120,120);
      doc.text(`NOC IP Directory • ${label}`, 14, 202);
      doc.text(`Page ${page}`, 283, 202, {align:'right'});
      doc.setTextColor(0,0,0);
    }
  });

  const fname = `ip-directory-${ipDirectoryFileLabel()}-${todayISO()}.pdf`;
  doc.save(fname);
  showToast(`Downloaded ${rows.length.toLocaleString()} IP records as PDF ✓`);
  if(typeof logChange === 'function') logChange('Downloaded IP Directory PDF', fname);
}

document.getElementById('ipdirExcelBtn')?.addEventListener('click', downloadIPDirectoryExcel);
document.getElementById('ipdirPdfBtn')?.addEventListener('click', downloadIPDirectoryPDF);

document.querySelectorAll('.ipdir-branch-btn').forEach(btn=>{
    const isActive = btn.dataset.ipbranch === active;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  const title = document.getElementById('ipdirTitle');
  const subtitle = document.getElementById('ipdirSubtitle');
  const pill = document.getElementById('ipdirBranchPill');

  if(active === 'all'){
    if(title) title.textContent = 'All Branches IP Directory';
    if(subtitle) subtitle.textContent = 'Chennai, Bangalore and Hosur IP data are shown together. Branch buttons change only this page — no refresh.';
    if(pill) pill.textContent = 'All Branches';
  }else{
    const label = branchLabel(active);
    if(title) title.textContent = `${label} IP Directory`;
    if(subtitle) subtitle.textContent = `Only ${label} IPs, hostnames and usage history are shown here.`;
    if(pill) pill.textContent = `${label} Branch`;
  }

  document.getElementById('ipdirStats').innerHTML = [
    ['Total IPs', counts.all.toLocaleString()],
    ['Visible', filtered.length.toLocaleString()],
    ['Chennai', counts.chennai.toLocaleString()],
    ['Bangalore', counts.bangalore.toLocaleString()],
    ['Hosur', counts.hosur.toLocaleString()]
  ].map(x=>`<div class="ipdir-stat"><b>${x[1]}</b><span>${x[0]}</span></div>`).join('');

  document.getElementById('ipdirBody').innerHTML = filtered.map((x,i)=>{
    const branchName = branchLabel(branchOf(x));
    return `<tr class="ipdir-row" data-iprow="${i}">
      <td><strong>${branchName}</strong></td>
      <td class="mono">${x.ip}</td>
      <td><button class="ipdir-name-btn" data-ipdetail="${i}">${x.h || '—'}</button></td>
      <td>${ipStatusSelectHtml(x.ip)}</td>
      <td><button class="btn small ghost" data-ipdetail="${i}">View history</button></td>
    </tr>`;
  }).join('') || `<tr><td colspan="5" class="empty">No IP records match this search.</td></tr>`;

  document.getElementById('ipdirInfo').textContent =
    `Showing ${filtered.length.toLocaleString()} of ${branchRows.length.toLocaleString()} ${active==='all'?'All Branches':branchLabel(active)} IP records · click a hostname or View history to see usage data.`;

  document.querySelectorAll('#view-ipdirectory [data-ipdetail]').forEach(btn=>{
    btn.onclick = ()=>{
      const x = filtered[Number(btn.dataset.ipdetail)];
      if(!x) return;
      showIPUserHistory(branchLabel(branchOf(x)), x.ip, x.h || x.ip);
    };
  });
}

document.querySelectorAll('.ipdir-branch-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    // LOCAL ONLY: no switchBranch(), no URL change, no page reload.
    ipdirBranch = btn.dataset.ipbranch;
    const search = document.getElementById('ipdirSearch');
    if(search) search.value = '';
    const detail = document.getElementById('ipdirDetail');
    if(detail) detail.innerHTML = '';
    renderIPDirectory();
  });
});

setTimeout(()=>{
  const s = document.getElementById('ipdirSearch');
  if(s && !s.dataset.ipdirBound){
    s.addEventListener('input', renderIPDirectory);
    s.dataset.ipdirBound = '1';
  }
  renderIPDirectory();
},0);

// Standalone-file safety: never leave the user on a blank background if a
// remote storage request is unavailable. The normal session restore wins if
// it completes first; otherwise the login screen is revealed automatically.
setTimeout(()=>{
  const overlay = document.getElementById('loginOverlay');
  const app = document.getElementById('appShell');
  if(overlay && app && app.style.display === 'none' && overlay.style.display === 'none'){
    overlay.style.display = 'flex';
    const hint = document.getElementById('signinHint');
    if(hint) hint.textContent = 'Storage connection is taking longer than expected. You can sign in using the browser-saved account.';
  }
}, 5500);

restoreSession().catch(err=>{
  console.error('Session restore failed:', err);
  const overlay = document.getElementById('loginOverlay');
  if(overlay) overlay.style.display = 'flex';
});
