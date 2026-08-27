import './globals.css';

export const metadata = {
  title: 'ระบบบันทึกสถานะการส่งสินค้า — บริษัท เกาอาน จำกัด',
  description: 'บันทึกสถานะการส่งสินค้าจากเลขที่เอกสารผ่านเครื่องยิงบาร์โค้ด'
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* class="locked" = ล็อกหน้าจอไว้ก่อน จนกว่าจะเข้าสู่ระบบสำเร็จ */}
      <body className="locked">{children}</body>
    </html>
  );
}
