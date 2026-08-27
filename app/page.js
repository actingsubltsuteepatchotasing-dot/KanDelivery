import Script from 'next/script';
import MARKUP from './markup';

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
      {/* โหลดตรรกะของระบบหลังหน้าเว็บพร้อมใช้งาน (ไฟล์อยู่ที่ public/app.js) */}
      <Script src="/app.js" strategy="afterInteractive" />
    </>
  );
}
