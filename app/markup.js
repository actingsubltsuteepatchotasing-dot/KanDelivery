/* =====================================================================
   โครงสร้าง HTML ของทุกหน้าจอ (ย้ายมาจาก index.html เดิม ไม่ได้แก้เนื้อหา)
   หน้า app/page.js จะนำสตริงนี้ไป render ออกมาเป็น HTML ตรง ๆ
   ===================================================================== */
const MARKUP = `
<!-- ============ หน้าเข้าสู่ระบบ (รหัสคงที่ ไม่ใช้ฐานข้อมูล) ============ -->
<div id="login">
  <form class="login-card" id="loginForm" autocomplete="off">
    <div class="lg-brand">
      <div class="lg-logo">▣</div>
      <b>บริษัท เกาอาน จำกัด</b>
      <span>ระบบบันทึกสถานะการส่งสินค้า</span>
    </div>
    <div class="lg-error" id="lgError"></div>
    <div class="fld">
      <label for="lgUser">ชื่อผู้ใช้</label>
      <input id="lgUser" type="text" autocomplete="username" placeholder="admin">
    </div>
    <div class="fld">
      <label for="lgPass">รหัสผ่าน</label>
      <input id="lgPass" type="password" autocomplete="current-password" placeholder="••••••••">
    </div>
    <label class="lg-remember"><input type="checkbox" id="lgRemember"> จำการเข้าสู่ระบบในเครื่องนี้</label>
    <button class="btn primary" type="submit">เข้าสู่ระบบ</button>
    <div class="lg-foot">เวอร์ชัน 1.1 · ข้อมูลเก็บในเครื่องนี้ (localStorage)</div>
  </form>
</div>
<div id="app">
  <aside>
    <div class="brand">
      <b>บริษัท เกาอาน จำกัด</b>
      <span>ระบบบันทึกสถานะการส่งสินค้า</span>
    </div>
    <nav id="nav">
      <a data-view="scan" class="active"><span class="ic">▣</span> ยิงบาร์โค้ด / บันทึกสถานะ</a>
      <a data-view="docs"><span class="ic">▤</span> เลขที่เอกสาร</a>
      <a data-view="vehicles"><span class="ic">▥</span> ข้อมูลรถขนส่ง</a>
      <a data-view="calendar"><span class="ic">▦</span> ปฏิทินสถานะรถ</a>
      <a data-view="report"><span class="ic">▧</span> รายงานสรุปรายวัน</a>
      <a data-view="map"><span class="ic">◎</span> แผนที่ประเทศไทย</a>
      <a data-view="settings"><span class="ic">⚙</span> ข้อมูล / สำรองข้อมูล</a>
    </nav>
    <div class="sidefoot">
      ผู้ใช้: <b>admin</b><br>ข้อมูลเก็บในเครื่องนี้ (localStorage) · เวอร์ชัน 1.1
      <button type="button" class="btn-logout" id="btnLogout">ออกจากระบบ</button>
    </div>
  </aside>

  <main>
    <!-- ============ SCAN ============ -->
    <section class="view active" id="v-scan">
      <div class="page-head">
        <div><h1>ยิงบาร์โค้ด / บันทึกสถานะ</h1>
        <p>เลือกรถ → เลือกสถานะ → ยิงบาร์โค้ดเลขที่เอกสาร (เครื่องยิงจะกด Enter ให้อัตโนมัติ)</p></div>
        <button class="btn" id="btnFocusScan">โฟกัสช่องยิงบาร์โค้ด</button>
      </div>

      <div class="scanbox">
        <div class="grid g2" style="margin-bottom:14px">
          <div>
            <label>รถที่ใช้ส่ง</label>
            <select id="scanVehicle"></select>
          </div>
          <div>
            <label>วันที่ส่ง</label>
            <input type="date" id="scanDate">
          </div>
        </div>
        <label>สถานะที่จะบันทึก</label>
        <div class="statuspick" id="scanStatus"></div>
        <div style="margin-top:16px">
          <label>ยิงบาร์โค้ด / พิมพ์เลขที่เอกสาร</label>
          <input id="scanInput" autocomplete="off" placeholder="รอรับข้อมูลจากเครื่องยิงบาร์โค้ด…">
        </div>
        <div class="hint" style="color:#bcd8ec;margin-top:8px">
          ถ้าไม่พบเลขที่เอกสารในระบบ จะเปิดหน้าจอให้เพิ่มเอกสารใหม่ทันที
        </div>
      </div>

      <div class="grid g4" id="scanStats" style="margin-top:16px"></div>

      <div class="card">
        <h2>รายการที่บันทึกล่าสุด <small id="scanFeedSub"></small></h2>
        <div class="feed" id="scanFeed"></div>
      </div>
    </section>

    <!-- ============ DOCS ============ -->
    <section class="view" id="v-docs">
      <div class="page-head">
        <div><h1>เลขที่เอกสาร</h1><p>ข้อมูลลูกค้า ที่อยู่ ตำบล อำเภอ จังหวัด และสถานะการส่ง</p></div>
        <button class="btn primary" onclick="openDoc()">+ เพิ่มเอกสาร</button>
      </div>
      <div class="card">
        <div class="row">
          <div class="field"><label>ค้นหา</label><input id="dqText" placeholder="เลขที่เอกสาร / ลูกค้า / ที่อยู่"></div>
          <div class="field"><label>สถานะ</label><select id="dqStatus"></select></div>
          <div class="field"><label>จังหวัด</label><select id="dqProv"></select></div>
          <div class="field"><label>รถ</label><select id="dqVeh"></select></div>
          <div class="field"><label>วันที่ส่ง</label><input type="date" id="dqDate"></div>
          <div><button class="btn" onclick="clearDocFilter()">ล้างตัวกรอง</button></div>
        </div>
      </div>
      <div class="tbl-wrap"><table id="docTable"></table></div>
    </section>

    <!-- ============ VEHICLES ============ -->
    <section class="view" id="v-vehicles">
      <div class="page-head">
        <div><h1>ข้อมูลรถขนส่ง</h1><p>ยี่ห้อ ทะเบียน ชื่อคนขับ และข้อมูลสำคัญอื่น ๆ พร้อมสถานะปัจจุบัน</p></div>
        <div class="row">
          <button class="btn" onclick="openTrip()">+ จองรถ / บันทึกการเดินทาง</button>
          <button class="btn primary" onclick="openVehicle()">+ เพิ่มรถ</button>
        </div>
      </div>
      <div class="grid g4" id="vehStats"></div>
      <div class="tbl-wrap" style="margin-top:14px"><table id="vehTable"></table></div>
      <div class="card" style="margin-top:16px">
        <h2>ตารางการเดินทาง / การจอง</h2>
        <div class="tbl-wrap"><table id="tripTable"></table></div>
      </div>
    </section>

    <!-- ============ CALENDAR ============ -->
    <section class="view" id="v-calendar">
      <div class="page-head">
        <div><h1>ปฏิทินสถานะรถ</h1><p>ดูสถานะรถแต่ละคันในแต่ละวัน: ว่าง / จองแล้ว / เดินทางอยู่ พร้อมเวลาไป-กลับ</p></div>
        <div class="row">
          <button class="btn" onclick="calMove(-1)">◀ เดือนก่อน</button>
          <button class="btn" onclick="calToday()">วันนี้</button>
          <button class="btn" onclick="calMove(1)">เดือนถัดไป ▶</button>
        </div>
      </div>
      <div class="card">
        <div class="row" style="justify-content:space-between;margin-bottom:12px">
          <h2 id="calTitle" style="margin:0"></h2>
          <div class="legend">
            <span><i style="background:#dcf3e4;border:1px solid #9ed7b4"></i>ว่าง</span>
            <span><i style="background:#fff3d4;border:1px solid #e8c979"></i>จองแล้ว</span>
            <span><i style="background:#dcecfb;border:1px solid #9cc6ea"></i>เดินทางอยู่</span>
          </div>
        </div>
        <div class="row" style="margin-bottom:12px">
          <div class="field" style="max-width:280px"><label>กรองเฉพาะรถ</label><select id="calVeh"></select></div>
        </div>
        <div class="cal" id="calGrid"></div>
      </div>
      <div class="card" id="calDayCard" style="display:none">
        <h2 id="calDayTitle"></h2>
        <div id="calDayBody"></div>
      </div>
    </section>

    <!-- ============ REPORT ============ -->
    <section class="view" id="v-report">
      <div class="page-head">
        <div><h1>รายงานสรุปรายวัน</h1><p>สรุปเลขที่เอกสารตามวันที่ที่เลือก</p></div>
        <div class="row noprint">
          <button class="btn" onclick="exportCSV()">ดาวน์โหลด CSV</button>
          <button class="btn primary" onclick="window.print()">พิมพ์รายงาน</button>
        </div>
      </div>
      <div class="card noprint">
        <div class="row">
          <div class="field" style="max-width:220px"><label>เลือกวันที่</label><input type="date" id="rpDate"></div>
          <div class="field" style="max-width:180px"><label>ถึงวันที่ (ไม่บังคับ)</label><input type="date" id="rpDate2"></div>
          <div class="field" style="max-width:240px"><label>รถ</label><select id="rpVeh"></select></div>
        </div>
      </div>
      <div id="rpOut"></div>
    </section>

    <!-- ============ MAP ============ -->
    <section class="view" id="v-map">
      <div class="page-head">
        <div><h1>แผนที่ประเทศไทย</h1><p>เลือกวันที่เพื่อดูว่ารถไปส่งจังหวัดใดบ้าง พร้อมรายละเอียดอำเภอ / ตำบล</p></div>
        <div class="row">
          <div class="field" style="max-width:200px"><label>วันที่ส่ง</label><input type="date" id="mpDate"></div>
          <div class="field" style="max-width:220px"><label>รถ</label><select id="mpVeh"></select></div>
        </div>
      </div>
      <div class="maplayout">
        <div class="card" style="margin:0">
          <div class="legend" style="margin-bottom:8px">
            <span><i style="background:#c9d3de"></i>ไม่มีรายการ</span>
            <span><i style="background:#e0a800"></i>จัดเสร็จแล้ว</span>
            <span><i style="background:#2a7fd4"></i>ส่งแล้ว</span>
            <span><i style="background:#1f9d55"></i>ถึงมือลูกค้าแล้ว</span>
            <span class="hint">• ขนาดวงกลม = จำนวนเอกสาร</span>
          </div>
          <svg id="thmap" viewBox="0 0 560 1010" preserveAspectRatio="xMidYMid meet"></svg>
        </div>
        <div>
          <div class="card" style="margin:0 0 14px"><h2>สรุปวันที่เลือก</h2><div id="mpSummary"></div></div>
          <div class="card pvpanel" style="margin:0"><h2 id="mpPvTitle">รายละเอียดจังหวัด</h2><div id="mpPvBody"><div class="empty">คลิกจังหวัดบนแผนที่เพื่อดูอำเภอ / ตำบล</div></div></div>
          <div class="card" style="margin:14px 0 0">
            <h2>Google Maps <small>ตำแหน่งจริงของจุดส่ง</small></h2>
            <div class="row" style="margin-bottom:9px">
              <button class="btn sm" id="btnGmapOpen">เปิดใน Google Maps</button>
              <button class="btn sm" id="btnGmapRoute">เส้นทางส่งของวันที่เลือก</button>
            </div>
            <div class="gmapwrap">
              <div class="gmapempty" id="gmapEmpty">คลิกจังหวัดบนแผนที่ประเทศไทย เพื่อดูตำแหน่งจริงจาก Google Maps</div>
              <iframe id="gmapFrame" title="Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="display:none"></iframe>
            </div>
            <div class="hint" id="gmapNote" style="margin-top:7px"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ SETTINGS ============ -->
    <section class="view" id="v-settings">
      <div class="page-head"><div><h1>ข้อมูล / สำรองข้อมูล</h1><p>นำออก นำเข้า และล้างข้อมูลทั้งหมด</p></div></div>
      <div class="card">
        <h2>สำรอง / กู้คืน</h2>
        <div class="row">
          <button class="btn" onclick="exportJSON()">นำออกข้อมูล (JSON)</button>
          <button class="btn" onclick="document.getElementById('impFile').click()">นำเข้าข้อมูล (JSON)</button>
          <input type="file" id="impFile" accept="application/json" style="display:none">
          <button class="btn" onclick="loadDemo()">โหลดข้อมูลตัวอย่าง</button>
          <button class="btn danger" onclick="wipe()">ล้างข้อมูลทั้งหมด</button>
        </div>
        <hr>
        <div class="hint" id="stTotals"></div>
      </div>
      <div class="card">
        <h2>ข้อกำหนดสถานะ</h2>
        <table>
          <tr><th>สถานะเอกสาร</th><td><span class="badge b-pending">รอดำเนินการ</span> <span class="badge b-packed">จัดเสร็จแล้ว</span> <span class="badge b-shipped">ส่งแล้ว</span> <span class="badge b-delivered">ถึงมือลูกค้าแล้ว</span></td></tr>
          <tr><th>สถานะรถ</th><td><span class="badge b-free">ว่าง</span> <span class="badge b-booked">จองแล้ว</span> <span class="badge b-traveling">เดินทางอยู่</span> <span class="badge b-done">เสร็จสิ้น</span></td></tr>
        </table>
      </div>
    </section>
  </main>
</div>

<div class="mask" id="mask"><div class="modal">
  <header><h3 id="mTitle"></h3><button class="x" onclick="closeModal()">✕</button></header>
  <div class="body" id="mBody"></div>
  <footer id="mFoot"></footer>
</div></div>
<div id="toast"></div>

<datalist id="dlAmphoe"></datalist>
<datalist id="dlTambon"></datalist>
`;
export default MARKUP;
