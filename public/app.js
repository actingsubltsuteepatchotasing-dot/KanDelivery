/* =====================================================================
   ตรรกะทั้งหมดของระบบ (ย้ายมาจาก <script> ใน index.html เดิม)
   โหลดโดย app/page.js ผ่าน next/script หลังหน้าเว็บพร้อมใช้งาน
   ===================================================================== */
/* =====================================================================
   ข้อมูลอ้างอิง
   ===================================================================== */
const DOC_ST = {
  pending:  {th:'รอดำเนินการ',    cls:'b-pending',   color:'#8a94a2'},
  packed:   {th:'จัดเสร็จแล้ว',    cls:'b-packed',    color:'#e0a800'},
  shipped:  {th:'ส่งแล้ว',        cls:'b-shipped',   color:'#2a7fd4'},
  delivered:{th:'ถึงมือลูกค้าแล้ว', cls:'b-delivered', color:'#1f9d55'}
};
const SCAN_ST = ['packed','shipped','delivered'];      // 3 สถานะที่ยิงบาร์โค้ดอัปเดตได้
const TRIP_ST = {
  booked:   {th:'จองแล้ว',    cls:'b-booked',    bg:'#fff3d4', bd:'#e8c979'},
  traveling:{th:'เดินทางอยู่', cls:'b-traveling', bg:'#dcecfb', bd:'#9cc6ea'},
  done:     {th:'เสร็จสิ้น',   cls:'b-done',      bg:'#eef1f5', bd:'#d3d9e0'}
};
const FREE = {th:'ว่าง', cls:'b-free'};

/* 77 จังหวัด: [ชื่อ, lat, lng, ภาค] */
const PROVINCES = [
["กรุงเทพมหานคร",13.75,100.52,"กลาง"],["สมุทรปราการ",13.60,100.60,"กลาง"],["นนทบุรี",13.86,100.51,"กลาง"],
["ปทุมธานี",14.02,100.53,"กลาง"],["พระนครศรีอยุธยา",14.35,100.58,"กลาง"],["อ่างทอง",14.59,100.45,"กลาง"],
["ลพบุรี",14.80,100.65,"กลาง"],["สิงห์บุรี",14.89,100.40,"กลาง"],["ชัยนาท",15.19,100.13,"กลาง"],
["สระบุรี",14.53,100.91,"กลาง"],["ชลบุรี",13.36,100.98,"ตะวันออก"],["ระยอง",12.68,101.28,"ตะวันออก"],
["จันทบุรี",12.61,102.10,"ตะวันออก"],["ตราด",12.24,102.51,"ตะวันออก"],["ฉะเชิงเทรา",13.69,101.07,"ตะวันออก"],
["ปราจีนบุรี",14.05,101.37,"ตะวันออก"],["นครนายก",14.20,101.21,"ตะวันออก"],["สระแก้ว",13.82,102.07,"ตะวันออก"],
["นครราชสีมา",14.98,102.10,"อีสาน"],["บุรีรัมย์",14.99,103.10,"อีสาน"],["สุรินทร์",14.88,103.49,"อีสาน"],
["ศรีสะเกษ",15.12,104.32,"อีสาน"],["อุบลราชธานี",15.24,104.85,"อีสาน"],["ยโสธร",15.79,104.15,"อีสาน"],
["ชัยภูมิ",15.81,102.03,"อีสาน"],["อำนาจเจริญ",15.87,104.63,"อีสาน"],["บึงกาฬ",18.36,103.65,"อีสาน"],
["หนองบัวลำภู",17.20,102.44,"อีสาน"],["ขอนแก่น",16.44,102.83,"อีสาน"],["อุดรธานี",17.41,102.79,"อีสาน"],
["เลย",17.49,101.72,"อีสาน"],["หนองคาย",17.88,102.74,"อีสาน"],["มหาสารคาม",16.18,103.30,"อีสาน"],
["ร้อยเอ็ด",16.05,103.65,"อีสาน"],["กาฬสินธุ์",16.43,103.51,"อีสาน"],["สกลนคร",17.16,104.15,"อีสาน"],
["นครพนม",17.41,104.78,"อีสาน"],["มุกดาหาร",16.54,104.72,"อีสาน"],["เชียงใหม่",18.79,98.98,"เหนือ"],
["ลำพูน",18.58,99.01,"เหนือ"],["ลำปาง",18.29,99.49,"เหนือ"],["อุตรดิตถ์",17.62,100.10,"เหนือ"],
["แพร่",18.14,100.14,"เหนือ"],["น่าน",18.78,100.78,"เหนือ"],["พะเยา",19.17,99.90,"เหนือ"],
["เชียงราย",19.91,99.83,"เหนือ"],["แม่ฮ่องสอน",19.30,97.97,"เหนือ"],["นครสวรรค์",15.70,100.14,"กลาง"],
["อุทัยธานี",15.38,100.02,"กลาง"],["กำแพงเพชร",16.48,99.52,"กลาง"],["ตาก",16.87,99.13,"เหนือ"],
["สุโขทัย",17.01,99.82,"เหนือ"],["พิษณุโลก",16.82,100.26,"เหนือ"],["พิจิตร",16.44,100.35,"กลาง"],
["เพชรบูรณ์",16.42,101.16,"เหนือ"],["ราชบุรี",13.53,99.81,"ตะวันตก"],["กาญจนบุรี",14.02,99.53,"ตะวันตก"],
["สุพรรณบุรี",14.47,100.12,"กลาง"],["นครปฐม",13.82,100.06,"กลาง"],["สมุทรสาคร",13.55,100.27,"กลาง"],
["สมุทรสงคราม",13.41,100.00,"กลาง"],["เพชรบุรี",13.11,99.94,"ตะวันตก"],["ประจวบคีรีขันธ์",11.81,99.80,"ตะวันตก"],
["ชุมพร",10.49,99.18,"ใต้"],["ระนอง",9.96,98.64,"ใต้"],["สุราษฎร์ธานี",9.14,99.33,"ใต้"],
["พังงา",8.45,98.53,"ใต้"],["ภูเก็ต",7.88,98.39,"ใต้"],["กระบี่",8.09,98.91,"ใต้"],
["นครศรีธรรมราช",8.43,99.96,"ใต้"],["ตรัง",7.56,99.61,"ใต้"],["พัทลุง",7.62,100.08,"ใต้"],
["สตูล",6.62,100.07,"ใต้"],["สงขลา",7.19,100.60,"ใต้"],["ปัตตานี",6.87,101.25,"ใต้"],
["ยะลา",6.54,101.28,"ใต้"],["นราธิวาส",6.43,101.82,"ใต้"]
];

/* เส้นขอบประเทศไทย (โดยประมาณ) — [lng, lat] */
const OUTLINE = [
[99.88,20.46],[100.10,20.28],[100.35,20.36],[100.55,20.15],[100.35,19.95],[100.60,19.60],[101.00,19.55],
[101.20,19.15],[100.95,18.75],[101.15,18.40],[101.55,18.10],[101.80,18.05],[102.10,18.20],[102.45,17.95],
[102.75,17.85],[103.20,18.10],[103.55,18.35],[103.95,18.30],[104.15,17.95],[104.35,17.75],[104.75,17.50],
[104.75,17.00],[104.60,16.60],[104.85,16.30],[105.15,15.90],[105.45,15.55],[105.60,15.20],[105.50,14.75],
[105.20,14.35],[104.60,14.40],[104.10,14.35],[103.55,14.40],[103.10,14.30],[102.70,13.95],[102.35,13.55],
[102.60,13.05],[102.90,12.60],[102.95,12.20],[102.60,11.85],[102.45,12.15],[102.05,12.55],[101.55,12.60],
[101.05,12.65],[100.85,13.10],[100.60,13.45],[100.35,13.50],[100.05,13.35],[99.95,13.10],[100.00,12.60],
[99.85,12.10],[99.70,11.60],[99.45,11.00],[99.30,10.60],[99.35,10.20],[99.60,9.70],[99.90,9.35],
[99.95,9.00],[100.10,8.60],[100.30,8.20],[100.55,7.55],[100.75,7.15],[101.20,6.85],[101.60,6.60],
[101.95,6.30],[102.05,6.05],[101.60,5.90],[101.20,5.85],[100.80,6.20],[100.35,6.50],[100.10,6.45],
[99.95,6.70],[99.85,7.05],[99.60,7.35],[99.20,7.60],[98.95,8.05],[98.60,8.35],[98.30,8.60],
[98.45,9.20],[98.60,9.75],[98.75,10.30],[98.55,10.80],[98.40,11.40],[98.60,12.10],[98.85,12.60],
[99.15,13.10],[99.30,13.60],[98.90,14.10],[98.55,14.60],[98.20,15.10],[98.40,15.60],[98.70,16.10],
[98.55,16.60],[98.30,17.10],[97.80,17.60],[97.55,18.10],[97.75,18.60],[98.00,19.10],[98.25,19.55],
[98.60,19.75],[99.00,20.10],[99.45,20.35]
];

/* ตัวอย่างอำเภอ/ตำบล (ใช้เป็นคำแนะนำ — พิมพ์ชื่ออื่นได้อิสระ) */
const AREA = {
"กรุงเทพมหานคร":{"บางรัก":["สีลม","สุริยวงศ์","มหาพฤฒาราม"],"จตุจักร":["ลาดยาว","จตุจักร","จอมพล"],"บางนา":["บางนาเหนือ","บางนาใต้"],"ลาดกระบัง":["ลาดกระบัง","คลองสองต้นนุ่น","ทับยาว"]},
"สมุทรปราการ":{"เมืองสมุทรปราการ":["ปากน้ำ","บางเมือง","ท้ายบ้าน"],"บางพลี":["บางพลีใหญ่","บางแก้ว","ราชาเทวะ"],"พระประแดง":["ตลาด","บางพึ่ง"]},
"นนทบุรี":{"เมืองนนทบุรี":["บางกระสอ","ท่าทราย","ตลาดขวัญ"],"บางบัวทอง":["โสนลอย","บางรักใหญ่"],"ปากเกร็ด":["ปากเกร็ด","บางตลาด","คลองเกลือ"]},
"ปทุมธานี":{"เมืองปทุมธานี":["บางปรอก","บ้านกลาง"],"คลองหลวง":["คลองหนึ่ง","คลองสอง","คลองสาม"],"ลำลูกกา":["คูคต","ลาดสวาย"]},
"พระนครศรีอยุธยา":{"พระนครศรีอยุธยา":["ประตูชัย","หอรัตนไชย","ท่าวาสุกรี"],"บางปะอิน":["บ้านเลน","คลองจิก"],"วังน้อย":["ลำตาเสา","ชะแมบ"]},
"ชลบุรี":{"เมืองชลบุรี":["บางปลาสร้อย","เสม็ด","หนองข้างคอก"],"ศรีราชา":["ศรีราชา","สุรศักดิ์","ทุ่งสุขลา"],"บางละมุง":["หนองปรือ","นาเกลือ","บางละมุง"],"พานทอง":["พานทอง","หนองตำลึง"]},
"ระยอง":{"เมืองระยอง":["ท่าประดู่","เชิงเนิน","เนินพระ"],"ปลวกแดง":["มาบยางพร","ปลวกแดง"],"นิคมพัฒนา":["นิคมพัฒนา","มาบข่า"]},
"นครปฐม":{"เมืองนครปฐม":["พระปฐมเจดีย์","นครปฐม","สนามจันทร์"],"สามพราน":["ไร่ขิง","อ้อมใหญ่","กระทุ่มล้ม"],"นครชัยศรี":["นครชัยศรี","ท่าตำหนัก"]},
"เชียงใหม่":{"เมืองเชียงใหม่":["ศรีภูมิ","ช้างคลาน","สุเทพ","หายยา"],"สันทราย":["หนองหาร","สันทรายหลวง"],"หางดง":["หางดง","หนองแก๋ว"],"สารภี":["ยางเนิ้ง","หนองผึ้ง"]},
"นครราชสีมา":{"เมืองนครราชสีมา":["ในเมือง","หนองจะบก","จอหอ"],"ปากช่อง":["ปากช่อง","หนองสาหร่าย","ขนงพระ"],"สีคิ้ว":["สีคิ้ว","ลาดบัวขาว"],"โชคชัย":["โชคชัย","กระโทก"]},
"ขอนแก่น":{"เมืองขอนแก่น":["ในเมือง","ศิลา","บ้านเป็ด"],"น้ำพอง":["น้ำพอง","วังชัย"],"ชุมแพ":["ชุมแพ","หนองไผ่"]},
"อุดรธานี":{"เมืองอุดรธานี":["หมากแข้ง","หนองบัว","บ้านเลื่อม"],"กุมภวาปี":["ตูมใต้","พันดอน"],"บ้านดุง":["ศรีสุทโธ","บ้านดุง"]},
"สุราษฎร์ธานี":{"เมืองสุราษฎร์ธานี":["ตลาด","มะขามเตี้ย","บางกุ้ง"],"พุนพิน":["ท่าข้าม","ท่าโรงช้าง"],"เกาะสมุย":["อ่างทอง","แม่น้ำ","บ่อผุด"]},
"ภูเก็ต":{"เมืองภูเก็ต":["ตลาดใหญ่","ตลาดเหนือ","รัษฎา"],"กะทู้":["กะทู้","ป่าตอง","กมลา"],"ถลาง":["เชิงทะเล","ศรีสุนทร","ไม้ขาว"]},
"สงขลา":{"เมืองสงขลา":["บ่อยาง","เขารูปช้าง","พะวง"],"หาดใหญ่":["หาดใหญ่","คอหงส์","ควนลัง"],"สะเดา":["สะเดา","ปาดังเบซาร์"]}
};

/* =====================================================================
   ที่เก็บข้อมูล
   ===================================================================== */
const KEY = 'kaoan_delivery_v1';
let S = {vehicles:[], docs:[], trips:[], seq:1};

function save(){ localStorage.setItem(KEY, JSON.stringify(S)); }
function load(){
  try{
    const raw = localStorage.getItem(KEY);
    if(raw){ S = Object.assign({vehicles:[],docs:[],trips:[],seq:1}, JSON.parse(raw)); return true; }
  }catch(e){ console.warn(e); }
  return false;
}
const uid = p => p + '-' + (S.seq++) + '-' + (Date.now()%100000);

/* =====================================================================
   ยูทิลิตี้
   ===================================================================== */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad = n => String(n).padStart(2,'0');
const todayISO = () => { const d=new Date(); return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()); };
const TH_MONTH = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const TH_DOW = ['อา','จ','อ','พ','พฤ','ศ','ส'];
function thDate(iso){
  if(!iso) return '-';
  const [y,m,d] = iso.split('-').map(Number);
  return d + ' ' + TH_MONTH[m-1] + ' ' + (y+543);
}
function thTime(ts){ const d=new Date(ts); return pad(d.getHours())+':'+pad(d.getMinutes()); }
function toast(msg, kind){
  const el = document.createElement('div');
  el.className = kind || '';
  el.textContent = msg;
  $('#toast').appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transition='opacity .3s'; setTimeout(()=>el.remove(),320); }, 2400);
}
const vehById = id => S.vehicles.find(v=>v.id===id);
const vehLabel = v => v ? (v.plate + ' · ' + v.brand + (v.driver ? ' · ' + v.driver : '')) : '-';
function badge(st, map){ const m = (map||DOC_ST)[st]; return m ? `<span class="badge ${m.cls}">${m.th}</span>` : '<span class="badge b-pending">-</span>'; }

function fillSelect(el, items, {value='', placeholder=null}={}){
  el.innerHTML = (placeholder!==null ? `<option value="">${esc(placeholder)}</option>` : '')
    + items.map(i=>`<option value="${esc(i.v)}"${i.v===value?' selected':''}>${esc(i.t)}</option>`).join('');
}
function vehOptions(){ return S.vehicles.map(v=>({v:v.id, t:vehLabel(v)})); }

/* =====================================================================
   Modal
   ===================================================================== */
let modalSave = null;
function openModal(title, html, onSave, saveText){
  $('#mTitle').textContent = title;
  $('#mBody').innerHTML = html;
  modalSave = onSave;
  $('#mFoot').innerHTML = onSave
    ? `<button class="btn" onclick="closeModal()">ยกเลิก</button><button class="btn primary" onclick="modalSave&&modalSave()">${esc(saveText||'บันทึก')}</button>`
    : `<button class="btn" onclick="closeModal()">ปิด</button>`;
  $('#mask').classList.add('on');
}
function closeModal(){ $('#mask').classList.remove('on'); modalSave=null; }
$('#mask').addEventListener('mousedown', e=>{ if(e.target.id==='mask') closeModal(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* =====================================================================
   Router
   ===================================================================== */
let currentView = 'scan';
function go(view){
  currentView = view;
  $$('#nav a').forEach(a=>a.classList.toggle('active', a.dataset.view===view));
  $$('.view').forEach(v=>v.classList.toggle('active', v.id==='v-'+view));
  window.scrollTo(0,0);
  render();
  if(view==='scan') setTimeout(()=>$('#scanInput').focus(), 60);
}
$('#nav').addEventListener('click', e=>{ const a=e.target.closest('a'); if(a) go(a.dataset.view); });

/* =====================================================================
   1) หน้าจอยิงบาร์โค้ด
   ===================================================================== */
let scanState = {status:'packed', log:[]};

function initScan(){
  $('#scanStatus').innerHTML = SCAN_ST.map(k=>
    `<button data-st="${k}" class="${k===scanState.status?'on':''}">${DOC_ST[k].th}</button>`).join('');
  $('#scanStatus').onclick = e => {
    const b = e.target.closest('button'); if(!b) return;
    scanState.status = b.dataset.st;
    $$('#scanStatus button').forEach(x=>x.classList.toggle('on', x===b));
    $('#scanInput').focus();
  };
  $('#scanDate').value = todayISO();
  $('#btnFocusScan').onclick = ()=>$('#scanInput').focus();
  $('#scanInput').addEventListener('keydown', e=>{
    if(e.key==='Enter'){ e.preventDefault(); handleScan($('#scanInput').value.trim()); $('#scanInput').value=''; }
  });
}

function handleScan(code){
  if(!code) return;
  const vId = $('#scanVehicle').value;
  const date = $('#scanDate').value || todayISO();
  const doc = S.docs.find(d => d.docNo.toLowerCase() === code.toLowerCase());

  if(!doc){
    toast('ไม่พบเลขที่เอกสาร ' + code + ' — เปิดหน้าเพิ่มเอกสาร', 'err');
    openDoc(null, {docNo:code, vehicleId:vId, deliveryDate:date, status:scanState.status});
    return;
  }
  const st = scanState.status;
  if(doc.status === st){
    toast('เอกสาร ' + doc.docNo + ' เป็น "' + DOC_ST[st].th + '" อยู่แล้ว');
  }
  doc.status = st;
  doc.deliveryDate = date;
  if(vId) doc.vehicleId = vId;
  doc.history = doc.history || [];
  doc.history.push({status:st, at:Date.now(), vehicleId:vId||null});
  save();

  scanState.log.unshift({docNo:doc.docNo, customer:doc.customer, province:doc.province, status:st, at:Date.now(), vehicleId:vId||doc.vehicleId});
  scanState.log = scanState.log.slice(0,60);
  toast('บันทึก ' + doc.docNo + ' → ' + DOC_ST[st].th, 'ok');
  renderScan();
}

function renderScan(){
  const cur = $('#scanVehicle').value;
  fillSelect($('#scanVehicle'), vehOptions(), {value:cur, placeholder:'— ไม่ระบุรถ —'});
  const date = $('#scanDate').value || todayISO();
  const dayDocs = S.docs.filter(d=>d.deliveryDate===date);
  const c = k => dayDocs.filter(d=>d.status===k).length;
  $('#scanStats').innerHTML = `
    <div class="stat s-all"><div class="n">${dayDocs.length}</div><div class="l">เอกสารวันที่ ${thDate(date)}</div></div>
    <div class="stat s-packed"><div class="n">${c('packed')}</div><div class="l">จัดเสร็จแล้ว</div></div>
    <div class="stat s-shipped"><div class="n">${c('shipped')}</div><div class="l">ส่งแล้ว</div></div>
    <div class="stat s-delivered"><div class="n">${c('delivered')}</div><div class="l">ถึงมือลูกค้าแล้ว</div></div>`;

  $('#scanFeedSub').textContent = scanState.log.length ? '(' + scanState.log.length + ' รายการในรอบนี้)' : '';
  $('#scanFeed').innerHTML = scanState.log.length ? scanState.log.map(l=>`
    <div class="it">
      <div class="t">${thTime(l.at)}</div>
      <div style="flex:1">
        <b>${esc(l.docNo)}</b> ${badge(l.status)}<br>
        <span class="addr">${esc(l.customer||'-')} · ${esc(l.province||'-')} · ${esc(vehLabel(vehById(l.vehicleId)))}</span>
      </div>
    </div>`).join('') : '<div class="empty">ยังไม่มีการยิงบาร์โค้ดในรอบนี้</div>';
}

/* =====================================================================
   2) เลขที่เอกสาร
   ===================================================================== */
function docFilter(){
  const q  = $('#dqText').value.trim().toLowerCase();
  const st = $('#dqStatus').value, pv = $('#dqProv').value, vh = $('#dqVeh').value, dt = $('#dqDate').value;
  return S.docs.filter(d=>{
    if(st && d.status!==st) return false;
    if(pv && d.province!==pv) return false;
    if(vh && d.vehicleId!==vh) return false;
    if(dt && d.deliveryDate!==dt) return false;
    if(q){
      const hay = [d.docNo,d.customer,d.address,d.tambon,d.amphoe,d.province,d.note].join(' ').toLowerCase();
      if(!hay.includes(q)) return false;
    }
    return true;
  }).sort((a,b)=>(b.deliveryDate||'').localeCompare(a.deliveryDate||'') || a.docNo.localeCompare(b.docNo));
}
function clearDocFilter(){ ['#dqText','#dqStatus','#dqProv','#dqVeh','#dqDate'].forEach(s=>$(s).value=''); renderDocs(); }

function renderDocs(){
  fillSelect($('#dqStatus'), Object.keys(DOC_ST).map(k=>({v:k,t:DOC_ST[k].th})), {value:$('#dqStatus').value, placeholder:'ทุกสถานะ'});
  fillSelect($('#dqProv'), PROVINCES.map(p=>({v:p[0],t:p[0]})), {value:$('#dqProv').value, placeholder:'ทุกจังหวัด'});
  fillSelect($('#dqVeh'), vehOptions(), {value:$('#dqVeh').value, placeholder:'ทุกคัน'});

  const rows = docFilter();
  $('#docTable').innerHTML = `
    <thead><tr>
      <th>เลขที่เอกสาร</th><th>ลูกค้า</th><th>ที่อยู่ / ตำบล / อำเภอ</th><th>จังหวัด</th>
      <th>รถที่ส่ง</th><th>วันที่ส่ง</th><th>สถานะ</th><th></th>
    </tr></thead>
    <tbody>${ rows.length ? rows.map(d=>`
      <tr>
        <td><b>${esc(d.docNo)}</b></td>
        <td>${esc(d.customer||'-')}<div class="addr">${esc(d.phone||'')}</div></td>
        <td>${esc(d.address||'-')}<div class="addr">${esc(d.tambon?'ต.'+d.tambon:'')} ${esc(d.amphoe?'อ.'+d.amphoe:'')}</div></td>
        <td>${esc(d.province||'-')}</td>
        <td>${esc(vehLabel(vehById(d.vehicleId)))}</td>
        <td>${thDate(d.deliveryDate)}</td>
        <td>${badge(d.status)}</td>
        <td style="white-space:nowrap">
          <button class="btn sm" onclick="openDoc('${d.id}')">แก้ไข</button>
          <button class="btn sm" onclick="docHistory('${d.id}')">ประวัติ</button>
          <button class="btn sm danger" onclick="delDoc('${d.id}')">ลบ</button>
        </td>
      </tr>`).join('') : `<tr><td colspan="8"><div class="empty">ไม่พบข้อมูลเอกสาร</div></td></tr>` }</tbody>`;
}
function openDoc(id, preset){
  const d = id ? S.docs.find(x=>x.id===id) : Object.assign({
    docNo:'', customer:'', phone:'', address:'', tambon:'', amphoe:'', province:'',
    vehicleId:'', deliveryDate:todayISO(), status:'pending', note:''
  }, preset||{});
  const provOpts = PROVINCES.map(p=>`<option value="${esc(p[0])}"${p[0]===d.province?' selected':''}>${esc(p[0])} (${esc(p[3])})</option>`).join('');
  const vehOpts  = S.vehicles.map(v=>`<option value="${esc(v.id)}"${v.id===d.vehicleId?' selected':''}>${esc(vehLabel(v))}</option>`).join('');
  const stOpts   = Object.keys(DOC_ST).map(k=>`<option value="${k}"${k===d.status?' selected':''}>${DOC_ST[k].th}</option>`).join('');

  openModal(id?'แก้ไขเอกสาร':'เพิ่มเอกสาร', `
    <div class="grid g2">
      <div><label>เลขที่เอกสาร *</label><input id="f_docNo" value="${esc(d.docNo)}"></div>
      <div><label>วันที่ส่ง</label><input type="date" id="f_date" value="${esc(d.deliveryDate||'')}"></div>
      <div><label>ชื่อลูกค้า *</label><input id="f_cus" value="${esc(d.customer)}"></div>
      <div><label>เบอร์โทร</label><input id="f_tel" value="${esc(d.phone||'')}"></div>
    </div>
    <div style="margin-top:12px"><label>ที่อยู่</label><input id="f_addr" value="${esc(d.address||'')}" placeholder="บ้านเลขที่ หมู่ ถนน"></div>
    <div class="grid g3" style="margin-top:12px">
      <div><label>จังหวัด *</label><select id="f_prov"><option value="">— เลือกจังหวัด —</option>${provOpts}</select></div>
      <div><label>อำเภอ / เขต</label><input id="f_amp" list="dlAmphoe" value="${esc(d.amphoe||'')}"></div>
      <div><label>ตำบล / แขวง</label><input id="f_tam" list="dlTambon" value="${esc(d.tambon||'')}"></div>
    </div>
    <div class="grid g2" style="margin-top:12px">
      <div><label>รถที่ใช้ส่ง</label><select id="f_veh"><option value="">— ไม่ระบุ —</option>${vehOpts}</select></div>
      <div><label>สถานะ</label><select id="f_st">${stOpts}</select></div>
    </div>
    <div style="margin-top:12px"><label>หมายเหตุ</label><textarea id="f_note">${esc(d.note||'')}</textarea></div>
  `, ()=>{
    const docNo = $('#f_docNo').value.trim();
    const cus = $('#f_cus').value.trim();
    const prov = $('#f_prov').value;
    if(!docNo || !cus || !prov){ toast('กรอกเลขที่เอกสาร ชื่อลูกค้า และจังหวัด','err'); return; }
    const dup = S.docs.find(x=>x.docNo.toLowerCase()===docNo.toLowerCase() && x.id!==id);
    if(dup){ toast('เลขที่เอกสารนี้มีอยู่แล้ว','err'); return; }
    const newSt = $('#f_st').value;
    const obj = {
      id: id || uid('D'), docNo, customer:cus, phone:$('#f_tel').value.trim(),
      address:$('#f_addr').value.trim(), province:prov, amphoe:$('#f_amp').value.trim(), tambon:$('#f_tam').value.trim(),
      vehicleId:$('#f_veh').value, deliveryDate:$('#f_date').value, status:newSt,
      note:$('#f_note').value.trim(),
      history:(d.history||[]).slice()
    };
    if(!id || d.status!==newSt) obj.history.push({status:newSt, at:Date.now(), vehicleId:obj.vehicleId||null});
    if(id){ S.docs[S.docs.findIndex(x=>x.id===id)] = obj; } else { S.docs.push(obj); }
    save(); closeModal(); toast(id?'บันทึกการแก้ไขแล้ว':'เพิ่มเอกสารแล้ว','ok'); render();
  });

  const syncAmp = ()=>{
    const list = AREA[$('#f_prov').value] || {};
    $('#dlAmphoe').innerHTML = Object.keys(list).map(a=>`<option value="${esc(a)}">`).join('');
    syncTam();
  };
  const syncTam = ()=>{
    const list = (AREA[$('#f_prov').value]||{})[$('#f_amp').value] || [];
    $('#dlTambon').innerHTML = list.map(t=>`<option value="${esc(t)}">`).join('');
  };
  $('#f_prov').onchange = syncAmp;
  $('#f_amp').oninput = syncTam;
  syncAmp();
  setTimeout(()=>$('#f_docNo').focus(),50);
}

function docHistory(id){
  const d = S.docs.find(x=>x.id===id); if(!d) return;
  const h = (d.history||[]).slice().reverse();
  openModal('ประวัติสถานะ · ' + d.docNo, `
    <div class="addr" style="margin-bottom:10px">
      ${esc(d.customer)} — ${esc(d.address||'')} ${esc(d.tambon?'ต.'+d.tambon:'')} ${esc(d.amphoe?'อ.'+d.amphoe:'')} จ.${esc(d.province)}
    </div>
    ${ h.length ? `<table><thead><tr><th>เวลา</th><th>สถานะ</th><th>รถ</th></tr></thead><tbody>
      ${h.map(x=>`<tr><td>${new Date(x.at).toLocaleString('th-TH')}</td><td>${badge(x.status)}</td><td>${esc(vehLabel(vehById(x.vehicleId)))}</td></tr>`).join('')}
    </tbody></table>` : '<div class="empty">ยังไม่มีประวัติ</div>' }
  `, null);
}
function delDoc(id){
  const d = S.docs.find(x=>x.id===id); if(!d) return;
  if(!confirm('ลบเอกสาร ' + d.docNo + ' ?')) return;
  S.docs = S.docs.filter(x=>x.id!==id); save(); toast('ลบแล้ว'); render();
}

/* =====================================================================
   3) รถขนส่ง + การจอง/เดินทาง
   ===================================================================== */
function tripsOn(dateISO, vehId){
  return S.trips.filter(t=>{
    if(vehId && t.vehicleId!==vehId) return false;
    const from = t.dateFrom, to = t.dateTo || t.dateFrom;
    return dateISO >= from && dateISO <= to;
  });
}
function vehStatusOn(vehId, dateISO){
  const ts = tripsOn(dateISO, vehId).filter(t=>t.status!=='done');
  if(!ts.length) return {key:'free', th:FREE.th, cls:FREE.cls, trip:null};
  const trav = ts.find(t=>t.status==='traveling');
  const t = trav || ts[0];
  return {key:t.status, th:TRIP_ST[t.status].th, cls:TRIP_ST[t.status].cls, trip:t};
}

function renderVehicles(){
  const today = todayISO();
  const cnt = k => S.vehicles.filter(v=>vehStatusOn(v.id,today).key===k).length;
  $('#vehStats').innerHTML = `
    <div class="stat s-all"><div class="n">${S.vehicles.length}</div><div class="l">รถทั้งหมด</div></div>
    <div class="stat s-delivered"><div class="n">${cnt('free')}</div><div class="l">ว่าง (วันนี้)</div></div>
    <div class="stat s-packed"><div class="n">${cnt('booked')}</div><div class="l">จองแล้ว (วันนี้)</div></div>
    <div class="stat s-shipped"><div class="n">${cnt('traveling')}</div><div class="l">เดินทางอยู่ (วันนี้)</div></div>`;

  $('#vehTable').innerHTML = `
    <thead><tr><th>ทะเบียน</th><th>ยี่ห้อ / รุ่น</th><th>ประเภท</th><th>น้ำหนักบรรทุก</th>
      <th>คนขับ</th><th>เบอร์โทร</th><th>สถานะวันนี้</th><th>เวลาไป-กลับ</th><th>หมายเหตุ</th><th></th></tr></thead>
    <tbody>${ S.vehicles.length ? S.vehicles.map(v=>{
      const st = vehStatusOn(v.id, today);
      const t = st.trip;
      return `<tr>
        <td><b>${esc(v.plate)}</b></td>
        <td>${esc(v.brand)} ${esc(v.model||'')}</td>
        <td>${esc(v.type||'-')}</td>
        <td>${esc(v.capacity||'-')}</td>
        <td>${esc(v.driver||'-')}</td>
        <td>${esc(v.phone||'-')}</td>
        <td><span class="badge ${st.cls}">${st.th}</span></td>
        <td>${ t ? esc((t.departAt||'--:--')+' → '+(t.returnAt||'--:--')) : '-' }</td>
        <td class="addr">${esc(v.note||'')}</td>
        <td style="white-space:nowrap">
          <button class="btn sm" onclick="openVehicle('${v.id}')">แก้ไข</button>
          <button class="btn sm danger" onclick="delVehicle('${v.id}')">ลบ</button>
        </td></tr>`;
    }).join('') : `<tr><td colspan="10"><div class="empty">ยังไม่มีข้อมูลรถ — กด “+ เพิ่มรถ”</div></td></tr>` }</tbody>`;

  const trips = S.trips.slice().sort((a,b)=>(b.dateFrom||'').localeCompare(a.dateFrom||''));
  $('#tripTable').innerHTML = `
    <thead><tr><th>วันที่</th><th>รถ</th><th>เวลาไป</th><th>เวลากลับ</th><th>จังหวัดปลายทาง</th><th>สถานะ</th><th>หมายเหตุ</th><th></th></tr></thead>
    <tbody>${ trips.length ? trips.map(t=>`
      <tr>
        <td>${thDate(t.dateFrom)}${t.dateTo && t.dateTo!==t.dateFrom ? ' – ' + thDate(t.dateTo) : ''}</td>
        <td>${esc(vehLabel(vehById(t.vehicleId)))}</td>
        <td>${esc(t.departAt||'-')}</td><td>${esc(t.returnAt||'-')}</td>
        <td>${esc((t.provinces||[]).join(', ') || '-')}</td>
        <td>${badge(t.status, TRIP_ST)}</td>
        <td class="addr">${esc(t.note||'')}</td>
        <td style="white-space:nowrap">
          <button class="btn sm" onclick="openTrip('${t.id}')">แก้ไข</button>
          <button class="btn sm danger" onclick="delTrip('${t.id}')">ลบ</button>
        </td>
      </tr>`).join('') : `<tr><td colspan="8"><div class="empty">ยังไม่มีการจอง / การเดินทาง</div></td></tr>` }</tbody>`;
}

function openVehicle(id){
  const v = id ? S.vehicles.find(x=>x.id===id) : {plate:'',brand:'',model:'',type:'',capacity:'',driver:'',phone:'',license:'',insurance:'',note:''};
  openModal(id?'แก้ไขข้อมูลรถ':'เพิ่มรถ', `
    <div class="grid g2">
      <div><label>ทะเบียนรถ *</label><input id="f_plate" value="${esc(v.plate)}" placeholder="70-1234 กรุงเทพมหานคร"></div>
      <div><label>ยี่ห้อ *</label><input id="f_brand" value="${esc(v.brand)}" placeholder="ISUZU / HINO / FUSO"></div>
      <div><label>รุ่น</label><input id="f_model" value="${esc(v.model||'')}"></div>
      <div><label>ประเภทรถ</label><input id="f_type" value="${esc(v.type||'')}" placeholder="6 ล้อ / 10 ล้อ / กระบะตู้ทึบ"></div>
      <div><label>น้ำหนักบรรทุก</label><input id="f_cap" value="${esc(v.capacity||'')}" placeholder="เช่น 5 ตัน"></div>
      <div><label>ชื่อคนขับ *</label><input id="f_driver" value="${esc(v.driver||'')}"></div>
      <div><label>เบอร์โทรคนขับ</label><input id="f_phone" value="${esc(v.phone||'')}"></div>
      <div><label>เลขที่ใบขับขี่</label><input id="f_lic" value="${esc(v.license||'')}"></div>
      <div><label>ประกัน / พ.ร.บ. หมดอายุ</label><input type="date" id="f_ins" value="${esc(v.insurance||'')}"></div>
    </div>
    <div style="margin-top:12px"><label>ข้อมูลสำคัญอื่น ๆ</label><textarea id="f_vnote">${esc(v.note||'')}</textarea></div>
  `, ()=>{
    const plate=$('#f_plate').value.trim(), brand=$('#f_brand').value.trim(), driver=$('#f_driver').value.trim();
    if(!plate||!brand||!driver){ toast('กรอกทะเบียน ยี่ห้อ และชื่อคนขับ','err'); return; }
    const obj = {id:id||uid('V'), plate, brand, model:$('#f_model').value.trim(), type:$('#f_type').value.trim(),
      capacity:$('#f_cap').value.trim(), driver, phone:$('#f_phone').value.trim(),
      license:$('#f_lic').value.trim(), insurance:$('#f_ins').value, note:$('#f_vnote').value.trim()};
    if(id){ S.vehicles[S.vehicles.findIndex(x=>x.id===id)] = obj; } else { S.vehicles.push(obj); }
    save(); closeModal(); toast(id?'บันทึกแล้ว':'เพิ่มรถแล้ว','ok'); render();
  });
  setTimeout(()=>$('#f_plate').focus(),50);
}
function delVehicle(id){
  const v = S.vehicles.find(x=>x.id===id); if(!v) return;
  const used = S.docs.filter(d=>d.vehicleId===id).length + S.trips.filter(t=>t.vehicleId===id).length;
  if(!confirm('ลบรถ ' + v.plate + (used?(' ? มีการอ้างอิงอยู่ ' + used + ' รายการ'):' ?'))) return;
  S.vehicles = S.vehicles.filter(x=>x.id!==id);
  S.docs.forEach(d=>{ if(d.vehicleId===id) d.vehicleId=''; });
  S.trips = S.trips.filter(t=>t.vehicleId!==id);
  save(); toast('ลบแล้ว'); render();
}

function openTrip(id, presetDate){
  const t = id ? S.trips.find(x=>x.id===id)
    : {vehicleId:'', dateFrom:presetDate||todayISO(), dateTo:presetDate||todayISO(), departAt:'08:00', returnAt:'17:00', status:'booked', provinces:[], note:''};
  if(!S.vehicles.length){ toast('กรุณาเพิ่มข้อมูลรถก่อน','err'); return; }
  const vehOpts = S.vehicles.map(v=>`<option value="${esc(v.id)}"${v.id===t.vehicleId?' selected':''}>${esc(vehLabel(v))}</option>`).join('');
  const stOpts = Object.keys(TRIP_ST).map(k=>`<option value="${k}"${k===t.status?' selected':''}>${TRIP_ST[k].th}</option>`).join('');
  openModal(id?'แก้ไขการเดินทาง':'จองรถ / บันทึกการเดินทาง', `
    <div class="grid g2">
      <div><label>รถ *</label><select id="t_veh"><option value="">— เลือกรถ —</option>${vehOpts}</select></div>
      <div><label>สถานะ</label><select id="t_st">${stOpts}</select></div>
      <div><label>วันที่ไป *</label><input type="date" id="t_from" value="${esc(t.dateFrom)}"></div>
      <div><label>วันที่กลับ</label><input type="date" id="t_to" value="${esc(t.dateTo||t.dateFrom)}"></div>
      <div><label>เวลาเดินทางไป</label><input type="time" id="t_dep" value="${esc(t.departAt||'')}"></div>
      <div><label>เวลาเดินทางกลับ</label><input type="time" id="t_ret" value="${esc(t.returnAt||'')}"></div>
    </div>
    <div style="margin-top:12px">
      <label>จังหวัดปลายทาง (เลือกได้หลายจังหวัด — กด Ctrl ค้าง)</label>
      <select id="t_prov" multiple size="7">${PROVINCES.map(p=>`<option value="${esc(p[0])}"${(t.provinces||[]).includes(p[0])?' selected':''}>${esc(p[0])}</option>`).join('')}</select>
    </div>
    <div style="margin-top:12px"><label>หมายเหตุ</label><textarea id="t_note">${esc(t.note||'')}</textarea></div>
  `, ()=>{
    const veh=$('#t_veh').value, from=$('#t_from').value;
    if(!veh||!from){ toast('เลือกรถและวันที่ไป','err'); return; }
    const to = $('#t_to').value || from;
    if(to < from){ toast('วันที่กลับต้องไม่ก่อนวันที่ไป','err'); return; }
    const obj = {id:id||uid('T'), vehicleId:veh, dateFrom:from, dateTo:to,
      departAt:$('#t_dep').value, returnAt:$('#t_ret').value, status:$('#t_st').value,
      provinces:Array.from($('#t_prov').selectedOptions).map(o=>o.value), note:$('#t_note').value.trim()};
    if(id){ S.trips[S.trips.findIndex(x=>x.id===id)] = obj; } else { S.trips.push(obj); }
    save(); closeModal(); toast('บันทึกแล้ว','ok'); render();
  });
}
function delTrip(id){
  if(!confirm('ลบรายการเดินทางนี้ ?')) return;
  S.trips = S.trips.filter(x=>x.id!==id); save(); toast('ลบแล้ว'); render();
}

/* =====================================================================
   4) ปฏิทิน
   ===================================================================== */
let calY, calM, calSel = null;
function calToday(){ const d=new Date(); calY=d.getFullYear(); calM=d.getMonth(); calSel=todayISO(); renderCalendar(); }
function calMove(n){ calM+=n; if(calM<0){calM=11;calY--;} if(calM>11){calM=0;calY++;} renderCalendar(); }

function renderCalendar(){
  if(calY===undefined){ const d=new Date(); calY=d.getFullYear(); calM=d.getMonth(); }
  fillSelect($('#calVeh'), vehOptions(), {value:$('#calVeh').value, placeholder:'ทุกคัน'});
  const filterVeh = $('#calVeh').value;
  $('#calTitle').textContent = TH_MONTH[calM] + ' ' + (calY+543);

  const first = new Date(calY, calM, 1);
  const start = new Date(first); start.setDate(1 - first.getDay());
  let html = TH_DOW.map(d=>`<div class="dow">${d}</div>`).join('');
  const today = todayISO();

  for(let i=0;i<42;i++){
    const dt = new Date(start); dt.setDate(start.getDate()+i);
    const iso = dt.getFullYear()+'-'+pad(dt.getMonth()+1)+'-'+pad(dt.getDate());
    const out = dt.getMonth()!==calM;
    const list = tripsOn(iso, filterVeh);
    const vehs = filterVeh ? S.vehicles.filter(v=>v.id===filterVeh) : S.vehicles;
    const freeCount = vehs.filter(v=>vehStatusOn(v.id,iso).key==='free').length;
    const chips = list.slice(0,3).map(t=>{
      const c = TRIP_ST[t.status];
      const v = vehById(t.vehicleId);
      return `<span class="chip" style="background:${c.bg};border:1px solid ${c.bd}" title="${esc((v?v.plate:'')+' '+(t.departAt||'')+'-'+(t.returnAt||''))}">${esc(v?v.plate:'?')} ${esc(t.departAt||'')}</span>`;
    }).join('');
    const more = list.length>3 ? `<span class="chip" style="background:#eef1f5">+${list.length-3} รายการ</span>` : '';
    const freeChip = (!list.length && freeCount) ? `<span class="chip" style="background:#dcf3e4;border:1px solid #9ed7b4">ว่าง ${freeCount} คัน</span>` : '';
    html += `<div class="day${out?' out':''}${iso===today?' today':''}" data-iso="${iso}">
      <div class="d">${dt.getDate()}</div>${chips}${more}${freeChip}</div>`;
  }
  $('#calGrid').innerHTML = html;
  $('#calGrid').onclick = e => { const d=e.target.closest('.day'); if(d){ calSel=d.dataset.iso; renderCalDay(); } };
  if(calSel) renderCalDay();
}

function renderCalDay(){
  const iso = calSel; if(!iso) return;
  const filterVeh = $('#calVeh').value;
  const vehs = filterVeh ? S.vehicles.filter(v=>v.id===filterVeh) : S.vehicles;
  $('#calDayCard').style.display='block';
  $('#calDayTitle').innerHTML = 'สถานะรถวันที่ ' + thDate(iso) +
    ` <button class="btn sm" style="margin-left:8px" onclick="openTrip(null,'${iso}')">+ จองรถวันนี้</button>`;
  const docsOfDay = S.docs.filter(d=>d.deliveryDate===iso);
  $('#calDayBody').innerHTML = `
    <div class="tbl-wrap"><table>
      <thead><tr><th>รถ</th><th>คนขับ</th><th>สถานะ</th><th>เวลาไป</th><th>เวลากลับ</th><th>ปลายทาง</th><th>เอกสารที่ส่ง</th></tr></thead>
      <tbody>${ vehs.length ? vehs.map(v=>{
        const st = vehStatusOn(v.id, iso), t = st.trip;
        const nd = docsOfDay.filter(d=>d.vehicleId===v.id).length;
        return `<tr>
          <td><b>${esc(v.plate)}</b><div class="addr">${esc(v.brand)}</div></td>
          <td>${esc(v.driver||'-')}</td>
          <td><span class="badge ${st.cls}">${st.th}</span></td>
          <td>${esc(t?.departAt||'-')}</td><td>${esc(t?.returnAt||'-')}</td>
          <td>${esc((t?.provinces||[]).join(', ')||'-')}</td>
          <td>${nd?nd+' ใบ':'-'}</td>
        </tr>`;
      }).join('') : `<tr><td colspan="7"><div class="empty">ยังไม่มีข้อมูลรถ</div></td></tr>` }</tbody>
    </table></div>`;
}

/* =====================================================================
   5) รายงานรายวัน
   ===================================================================== */
function reportRows(){
  const d1 = $('#rpDate').value || todayISO();
  const d2 = $('#rpDate2').value || d1;
  const vh = $('#rpVeh').value;
  const from = d1<=d2?d1:d2, to = d1<=d2?d2:d1;
  return {from, to, rows: S.docs.filter(d=>{
    if(!d.deliveryDate) return false;
    if(d.deliveryDate<from || d.deliveryDate>to) return false;
    if(vh && d.vehicleId!==vh) return false;
    return true;
  }).sort((a,b)=>(a.deliveryDate||'').localeCompare(b.deliveryDate||'') || a.docNo.localeCompare(b.docNo))};
}

function renderReport(){
  if(!$('#rpDate').value) $('#rpDate').value = todayISO();
  fillSelect($('#rpVeh'), vehOptions(), {value:$('#rpVeh').value, placeholder:'ทุกคัน'});
  const {from,to,rows} = reportRows();
  const c = k => rows.filter(r=>r.status===k).length;

  const byVeh = {};
  rows.forEach(r=>{ const k=r.vehicleId||'-'; (byVeh[k]=byVeh[k]||[]).push(r); });
  const byProv = {};
  rows.forEach(r=>{ (byProv[r.province]=byProv[r.province]||[]).push(r); });

  $('#rpOut').innerHTML = `
    <div class="card">
      <h2>สรุปวันที่ ${thDate(from)}${from!==to?' ถึง '+thDate(to):''} <small>บริษัท เกาอาน จำกัด</small></h2>
      <div class="grid g4">
        <div class="stat s-all"><div class="n">${rows.length}</div><div class="l">เอกสารทั้งหมด</div></div>
        <div class="stat s-packed"><div class="n">${c('packed')}</div><div class="l">จัดเสร็จแล้ว</div></div>
        <div class="stat s-shipped"><div class="n">${c('shipped')}</div><div class="l">ส่งแล้ว</div></div>
        <div class="stat s-delivered"><div class="n">${c('delivered')}</div><div class="l">ถึงมือลูกค้าแล้ว</div></div>
      </div>
    </div>

    <div class="grid g2">
      <div class="card">
        <h2>สรุปตามรถ</h2>
        <table><thead><tr><th>รถ</th><th>จำนวน</th><th>ถึงมือลูกค้า</th></tr></thead><tbody>
        ${Object.keys(byVeh).length ? Object.keys(byVeh).map(k=>`
          <tr><td>${k==='-'?'<i>ไม่ระบุรถ</i>':esc(vehLabel(vehById(k)))}</td>
          <td>${byVeh[k].length}</td><td>${byVeh[k].filter(x=>x.status==='delivered').length}</td></tr>`).join('')
          : '<tr><td colspan="3"><div class="empty">ไม่มีข้อมูล</div></td></tr>'}
        </tbody></table>
      </div>
      <div class="card">
        <h2>สรุปตามจังหวัด</h2>
        <table><thead><tr><th>จังหวัด</th><th>จำนวน</th><th>ถึงมือลูกค้า</th></tr></thead><tbody>
        ${Object.keys(byProv).length ? Object.keys(byProv).sort().map(k=>`
          <tr><td>${esc(k||'-')}</td><td>${byProv[k].length}</td>
          <td>${byProv[k].filter(x=>x.status==='delivered').length}</td></tr>`).join('')
          : '<tr><td colspan="3"><div class="empty">ไม่มีข้อมูล</div></td></tr>'}
        </tbody></table>
      </div>
    </div>

    <div class="card">
      <h2>รายละเอียดเอกสาร</h2>
      <div class="tbl-wrap"><table>
        <thead><tr><th>วันที่</th><th>เลขที่เอกสาร</th><th>ลูกค้า</th><th>ตำบล / อำเภอ / จังหวัด</th><th>รถ</th><th>สถานะ</th></tr></thead>
        <tbody>${ rows.length ? rows.map(r=>`
          <tr><td>${thDate(r.deliveryDate)}</td><td><b>${esc(r.docNo)}</b></td><td>${esc(r.customer)}</td>
          <td>${esc(r.tambon?'ต.'+r.tambon+' ':'')}${esc(r.amphoe?'อ.'+r.amphoe+' ':'')}จ.${esc(r.province)}</td>
          <td>${esc(vehLabel(vehById(r.vehicleId)))}</td><td>${badge(r.status)}</td></tr>`).join('')
          : '<tr><td colspan="6"><div class="empty">ไม่มีเอกสารในช่วงวันที่ที่เลือก</div></td></tr>' }
        </tbody></table></div>
    </div>`;
}

function exportCSV(){
  const {from,to,rows} = reportRows();
  const head = ['วันที่','เลขที่เอกสาร','ลูกค้า','เบอร์โทร','ที่อยู่','ตำบล','อำเภอ','จังหวัด','ทะเบียนรถ','คนขับ','สถานะ'];
  const body = rows.map(r=>{
    const v = vehById(r.vehicleId);
    return [r.deliveryDate, r.docNo, r.customer, r.phone||'', r.address||'', r.tambon||'', r.amphoe||'', r.province,
            v?v.plate:'', v?v.driver:'', DOC_ST[r.status].th];
  });
  const csv = [head, ...body].map(a=>a.map(x=>'"'+String(x??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
  dl('﻿'+csv, 'report_'+from+(from!==to?'_to_'+to:'')+'.csv', 'text/csv;charset=utf-8');
}
function dl(content, name, type){
  const b = new Blob([content], {type});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(b); a.download = name; a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}

/* =====================================================================
   6) แผนที่ประเทศไทย
   ===================================================================== */
const MAP_W=560, MAP_H=1010, LNG0=97.3, LNG1=105.7, LAT0=5.5, LAT1=20.6;
const mx = lng => (lng-LNG0)/(LNG1-LNG0)*MAP_W;
const my = lat => (LAT1-lat)/(LAT1-LAT0)*MAP_H;
let mapSelProv = null;

function mapDocs(){
  const date = $('#mpDate').value;
  const vh = $('#mpVeh').value;
  return S.docs.filter(d=>{
    if(date && d.deliveryDate!==date) return false;
    if(vh && d.vehicleId!==vh) return false;
    return true;
  });
}
function provColor(list){
  if(!list.length) return '#c9d3de';
  if(list.every(d=>d.status==='delivered')) return DOC_ST.delivered.color;
  if(list.some(d=>d.status==='shipped')) return DOC_ST.shipped.color;
  if(list.some(d=>d.status==='packed')) return DOC_ST.packed.color;
  return '#8a94a2';
}

function renderMap(){
  if(!$('#mpDate').value) $('#mpDate').value = todayISO();
  fillSelect($('#mpVeh'), vehOptions(), {value:$('#mpVeh').value, placeholder:'ทุกคัน'});

  const docs = mapDocs();
  const byProv = {};
  docs.forEach(d=>{ (byProv[d.province]=byProv[d.province]||[]).push(d); });

  const path = 'M ' + OUTLINE.map(p=>mx(p[0]).toFixed(1)+' '+my(p[1]).toFixed(1)).join(' L ') + ' Z';
  let svg = `<path class="outline" d="${path}"></path>`;

  PROVINCES.forEach(p=>{
    const [name,lat,lng] = p;
    const list = byProv[name] || [];
    const x = mx(lng), y = my(lat);
    const r = list.length ? Math.min(16, 5 + Math.sqrt(list.length)*3.2) : 2.6;
    const cls = 'pv' + (list.length?' has':'') + (mapSelProv===name?' sel':'');
    svg += `<g class="${cls}" data-p="${esc(name)}">
      <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${provColor(list)}" fill-opacity="${list.length?0.92:0.55}"></circle>
      ${ list.length ? `<text x="${x.toFixed(1)}" y="${(y-r-3).toFixed(1)}" text-anchor="middle">${esc(name)} (${list.length})</text>` : '' }
      <title>${esc(name)}${list.length?' — '+list.length+' เอกสาร':' — ไม่มีรายการ'}</title>
    </g>`;
  });
  $('#thmap').innerHTML = svg;
  $('#thmap').onclick = e => {
    const g = e.target.closest('.pv'); if(!g) return;
    mapSelProv = g.dataset.p; renderMap();
  };

  const names = Object.keys(byProv).sort((a,b)=>byProv[b].length-byProv[a].length);
  $('#mpSummary').innerHTML = docs.length ? `
    <div class="grid g2" style="margin-bottom:10px">
      <div class="stat s-all" style="padding:10px 12px"><div class="n">${docs.length}</div><div class="l">เอกสาร</div></div>
      <div class="stat s-delivered" style="padding:10px 12px"><div class="n">${names.length}</div><div class="l">จังหวัดปลายทาง</div></div>
    </div>
    <table><thead><tr><th>จังหวัด</th><th>เอกสาร</th><th>รถ</th></tr></thead><tbody>
    ${names.map(n=>{
      const veh = Array.from(new Set(byProv[n].map(d=>{const v=vehById(d.vehicleId); return v?v.plate:'-';})));
      return `<tr style="cursor:pointer" onclick="mapSelProv='${n.replace(/'/g,"\\'")}';renderMap()">
        <td>${esc(n)}</td><td>${byProv[n].length}</td><td class="addr">${esc(veh.join(', '))}</td></tr>`;
    }).join('')}
    </tbody></table>` : '<div class="empty">ไม่มีรายการส่งในวันที่เลือก</div>';

  renderProvPanel(byProv);
}

function renderProvPanel(byProv){
  if(!mapSelProv){
    $('#mpPvTitle').textContent = 'รายละเอียดจังหวัด';
    $('#mpPvBody').innerHTML = '<div class="empty">คลิกจังหวัดบนแผนที่เพื่อดูอำเภอ / ตำบล</div>';
    return;
  }
  const list = byProv[mapSelProv] || [];
  const meta = PROVINCES.find(p=>p[0]===mapSelProv);
  $('#mpPvTitle').innerHTML = 'จังหวัด' + esc(mapSelProv) + ` <small style="font-weight:400;color:var(--muted)">ภาค${esc(meta?meta[3]:'-')}</small>`;
  if(!list.length){
    $('#mpPvBody').innerHTML = `<div class="empty">ไม่มีรายการส่งที่จังหวัดนี้ในวันที่เลือก</div>`;
    return;
  }
  const byAmp = {};
  list.forEach(d=>{ const a=d.amphoe||'(ไม่ระบุอำเภอ)'; (byAmp[a]=byAmp[a]||[]).push(d); });
  $('#mpPvBody').innerHTML = Object.keys(byAmp).sort().map(a=>`
    <div style="margin-bottom:12px">
      <div style="font-weight:700;font-size:13.5px;color:var(--brand)">อ.${esc(a)} <span class="addr">(${byAmp[a].length} เอกสาร)</span></div>
      ${byAmp[a].map(d=>`
        <div class="it">
          <b>${esc(d.docNo)} ${badge(d.status)}</b>
          <div>${esc(d.customer)}</div>
          <div class="addr">${esc(d.address||'')} ${esc(d.tambon?'ต.'+d.tambon:'')} · ${esc(vehLabel(vehById(d.vehicleId)))}</div>
        </div>`).join('')}
    </div>`).join('');
}

/* =====================================================================
   สำรองข้อมูล / ตัวอย่าง
   ===================================================================== */
function exportJSON(){ dl(JSON.stringify(S,null,2), 'kaoan-delivery-'+todayISO()+'.json', 'application/json'); }
$('#impFile').addEventListener('change', e=>{
  const f = e.target.files[0]; if(!f) return;
  const rd = new FileReader();
  rd.onload = () => {
    try{
      const o = JSON.parse(rd.result);
      if(!o || !Array.isArray(o.docs)) throw new Error('รูปแบบไฟล์ไม่ถูกต้อง');
      S = Object.assign({vehicles:[],docs:[],trips:[],seq:1}, o);
      save(); toast('นำเข้าข้อมูลแล้ว','ok'); render();
    }catch(err){ toast('นำเข้าไม่สำเร็จ: '+err.message,'err'); }
  };
  rd.readAsText(f); e.target.value='';
});
function wipe(){
  if(!confirm('ล้างข้อมูลทั้งหมด (รถ เอกสาร การเดินทาง) ?')) return;
  S = {vehicles:[],docs:[],trips:[],seq:1}; save(); toast('ล้างข้อมูลแล้ว'); render();
}

function loadDemo(){
  if(S.docs.length && !confirm('จะแทนที่ข้อมูลปัจจุบันด้วยข้อมูลตัวอย่าง ?')) return;
  S = {vehicles:[],docs:[],trips:[],seq:1};
  const t = todayISO();
  const d = new Date(); d.setDate(d.getDate()+1);
  const tm = d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());

  const V = [
    {plate:'70-1234 กรุงเทพมหานคร', brand:'ISUZU', model:'FTR', type:'6 ล้อ ตู้ทึบ', capacity:'5 ตัน', driver:'สมชาย ใจดี', phone:'081-234-5678', license:'กท-5512345', insurance:'2027-03-31', note:'มีลิฟท์ท้าย'},
    {plate:'82-5678 ชลบุรี', brand:'HINO', model:'FC9J', type:'6 ล้อ คอกสูง', capacity:'6 ตัน', driver:'ประเสริฐ มั่นคง', phone:'089-777-1122', license:'ชบ-4498877', insurance:'2026-11-15', note:'วิ่งสายตะวันออกประจำ'},
    {plate:'70-9012 กรุงเทพมหานคร', brand:'FUSO', model:'FI', type:'10 ล้อ', capacity:'12 ตัน', driver:'วิรัตน์ แสงทอง', phone:'062-555-9090', license:'กท-1129933', insurance:'2027-01-20', note:'สำหรับสายเหนือ/อีสาน'},
    {plate:'บง-4477 นครราชสีมา', brand:'TOYOTA', model:'Hilux Revo', type:'กระบะตู้ทึบ', capacity:'1 ตัน', driver:'อนุชา พูลสุข', phone:'095-321-4477', license:'นม-7781122', insurance:'2026-09-30', note:'ส่งงานด่วนระยะใกล้'}
  ].map(v=>Object.assign({id:uid('V')}, v));
  S.vehicles = V;

  const rows = [
    ['KA-25080001','บจก. ไทยรุ่งเรืองการค้า','02-111-2233','88/9 ถ.สุขุมวิท','บางนาเหนือ','บางนา','กรุงเทพมหานคร',0,t,'delivered'],
    ['KA-25080002','ร้านวัสดุพี่ชาย','081-999-4545','12 หมู่ 3','ราชาเทวะ','บางพลี','สมุทรปราการ',0,t,'shipped'],
    ['KA-25080003','หจก. ศรีราชาเซอร์วิส','038-222-1188','199/2 ถ.สุขุมวิท','ทุ่งสุขลา','ศรีราชา','ชลบุรี',1,t,'shipped'],
    ['KA-25080004','โรงงานพลาสติกระยอง','038-654-3210','55 นิคมฯ','มาบยางพร','ปลวกแดง','ระยอง',1,t,'delivered'],
    ['KA-25080005','บจก. โคราชอุปกรณ์','044-333-9911','23 ถ.มิตรภาพ','ในเมือง','เมืองนครราชสีมา','นครราชสีมา',2,t,'packed'],
    ['KA-25080006','ร้านค้าปากช่อง','086-121-3434','7 หมู่ 9','หนองสาหร่าย','ปากช่อง','นครราชสีมา',2,t,'packed'],
    ['KA-25080007','สหกรณ์ขอนแก่น','043-777-8899','101 ถ.ศรีจันทร์','ในเมือง','เมืองขอนแก่น','ขอนแก่น',2,t,'shipped'],
    ['KA-25080008','บจก. เชียงใหม่ซัพพลาย','053-808-101','9/9 ถ.ช้างคลาน','ช้างคลาน','เมืองเชียงใหม่','เชียงใหม่',2,tm,'packed'],
    ['KA-25080009','ร้านหาดใหญ่วัสดุ','074-232-121','45 ถ.เพชรเกษม','หาดใหญ่','หาดใหญ่','สงขลา',3,tm,'packed'],
    ['KA-25080010','บจก. ภูเก็ตมารีน','076-212-909','3 ถ.รัษฎา','รัษฎา','เมืองภูเก็ต','ภูเก็ต',3,tm,'pending'],
    ['KA-25080011','ร้านอยุธยาการช่าง','035-241-556','66 หมู่ 2','บ้านเลน','บางปะอิน','พระนครศรีอยุธยา',0,t,'delivered'],
    ['KA-25080012','บจก. อุดรพาณิชย์','042-244-100','120 ถ.โพศรี','หมากแข้ง','เมืองอุดรธานี','อุดรธานี',2,tm,'packed']
  ];
  S.docs = rows.map(r=>({
    id:uid('D'), docNo:r[0], customer:r[1], phone:r[2], address:r[3], tambon:r[4], amphoe:r[5],
    province:r[6], vehicleId:V[r[7]].id, deliveryDate:r[8], status:r[9], note:'',
    history:[{status:r[9], at:Date.now(), vehicleId:V[r[7]].id}]
  }));

  S.trips = [
    {id:uid('T'), vehicleId:V[0].id, dateFrom:t, dateTo:t, departAt:'07:30', returnAt:'16:00', status:'traveling', provinces:['กรุงเทพมหานคร','สมุทรปราการ','พระนครศรีอยุธยา'], note:'สายกรุงเทพฯ-ปริมณฑล'},
    {id:uid('T'), vehicleId:V[1].id, dateFrom:t, dateTo:t, departAt:'06:00', returnAt:'18:30', status:'traveling', provinces:['ชลบุรี','ระยอง'], note:'สายตะวันออก'},
    {id:uid('T'), vehicleId:V[2].id, dateFrom:t, dateTo:tm, departAt:'05:00', returnAt:'20:00', status:'booked', provinces:['นครราชสีมา','ขอนแก่น','อุดรธานี'], note:'สายอีสานค้างคืน'},
    {id:uid('T'), vehicleId:V[3].id, dateFrom:tm, dateTo:tm, departAt:'08:00', returnAt:'17:00', status:'booked', provinces:['สงขลา','ภูเก็ต'], note:'รอบใต้'}
  ];
  save(); toast('โหลดข้อมูลตัวอย่างแล้ว','ok'); render();
}

/* =====================================================================
   Render รวม
   ===================================================================== */
function render(){
  switch(currentView){
    case 'scan': renderScan(); break;
    case 'docs': renderDocs(); break;
    case 'vehicles': renderVehicles(); break;
    case 'calendar': renderCalendar(); break;
    case 'report': renderReport(); break;
    case 'map': renderMap(); break;
    case 'settings':
      $('#stTotals').innerHTML = `ข้อมูลปัจจุบัน: รถ <b>${S.vehicles.length}</b> คัน · เอกสาร <b>${S.docs.length}</b> ใบ · การเดินทาง <b>${S.trips.length}</b> รายการ`;
      break;
  }
}

/* bind filters */
['#dqText'].forEach(s=>$(s).addEventListener('input', renderDocs));
['#dqStatus','#dqProv','#dqVeh','#dqDate'].forEach(s=>$(s).addEventListener('change', renderDocs));
['#rpDate','#rpDate2','#rpVeh'].forEach(s=>$(s).addEventListener('change', renderReport));
['#mpDate','#mpVeh'].forEach(s=>$(s).addEventListener('change', ()=>{ mapSelProv=null; renderMap(); }));
$('#calVeh').addEventListener('change', renderCalendar);
$('#scanVehicle').addEventListener('change', ()=>$('#scanInput').focus());
$('#scanDate').addEventListener('change', renderScan);

/* start */
initScan();
if(!load()) loadDemo();
calToday();
go('scan');
render();

/* =====================================================================
   เข้าสู่ระบบ (รหัสคงที่ ไม่ต้องใช้ฐานข้อมูล)
   ===================================================================== */
const AUTH = {user:'admin', pass:'admin888'};
const AUTH_KEY = 'kaoan_auth_v1';

function authed(){
  try{ return sessionStorage.getItem(AUTH_KEY)==='1' || localStorage.getItem(AUTH_KEY)==='1'; }
  catch(e){ return false; }
}
function unlockApp(){
  document.body.classList.remove('locked');
  $('#lgPass').value = '';
  $('#lgError').classList.remove('on');
  render();
  if(currentView==='scan') setTimeout(()=>$('#scanInput').focus(), 60);
}
function lockApp(){
  try{ sessionStorage.removeItem(AUTH_KEY); localStorage.removeItem(AUTH_KEY); }catch(e){}
  document.body.classList.add('locked');
  $('#lgUser').value = ''; $('#lgPass').value = '';
  setTimeout(()=>$('#lgUser').focus(), 60);
}
$('#loginForm').addEventListener('submit', e=>{
  e.preventDefault();
  const u = $('#lgUser').value.trim(), p = $('#lgPass').value;
  if(u === AUTH.user && p === AUTH.pass){
    try{
      if($('#lgRemember').checked) localStorage.setItem(AUTH_KEY,'1');
      else sessionStorage.setItem(AUTH_KEY,'1');
    }catch(e){}
    unlockApp();
    toast('เข้าสู่ระบบแล้ว','ok');
  }else{
    const el = $('#lgError');
    el.textContent = 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง';
    el.classList.add('on');
    $('#lgPass').value = '';
    $('#lgPass').focus();
  }
});
$('#btnLogout').addEventListener('click', ()=>{
  if(confirm('ต้องการออกจากระบบหรือไม่?')) lockApp();
});

if(authed()) unlockApp();
else setTimeout(()=>$('#lgUser').focus(), 60);
