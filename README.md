# CMS Image Queue System

ระบบจัดการคิวรูปภาพสำหรับ Digital Signage CMS แบ่งเป็น 2 ส่วนหลัก:

## 🏗️ โครงสร้างโปรเจค

```
CMS/
├── User/                    # ส่วนผู้ใช้งาน
│   ├── frontend/           # React frontend (Port 3000)
│   │   ├── src/
│   │   │   ├── Upload.js
│   │   │   ├── Payment.js
│   │   │   ├── Home.js
│   │   │   └── ...
│   │   └── package.json
│   └── backend/            # Node.js backend (Port 4000)
│       ├── server.js
│       └── package.json
└── Admin/                  # ส่วนผู้ดูแลระบบ
    ├── frontend/           # React frontend (Port 3001)
    │   ├── src/
    │   │   ├── ImageQueue.js
    │   │   ├── home.js
    │   │   └── ...
    │   └── package.json
    └── backend/            # Node.js backend (Port 5001)
        ├── server.js
        ├── hashPasswords.js
        └── package.json
```

## 🚀 การติดตั้งและใช้งาน

### 1. Clone Repository
```bash
git clone https://github.com/Boriwat-wtm/CMS.git
cd CMS
```

### 2. ติดตั้ง Dependencies

#### User Backend
```bash
cd User/backend
npm install
npm start
```

#### User Frontend
```bash
cd User/frontend
npm install
npm start
```

#### Admin Backend
```bash
cd Admin/backend
npm install
npm start
```

#### Admin Frontend
```bash
cd Admin/frontend
npm install
npm start
```

## 🌐 URLs

- **User Frontend**: http://localhost:3000
- **Admin Frontend**: http://localhost:3001
- **User Backend API**: http://localhost:4000
- **Admin Backend API**: http://localhost:5001

## 🔐 ข้อมูลการเข้าสู่ระบบ Admin

| Username | Password  | Role  |
|----------|-----------|-------|
| admin    | admin123  | Admin |
| cms1     | dfhy1785  | Admin |
| cms2     | sdgsd5996 | Admin |

## 📋 คุณสมบัติ

### User Side
- ✅ อัปโหลดรูปภาพพร้อมข้อความ
- ✅ เลือกสีข้อความ (ดำ/ขาว)
- ✅ ระบบการชำระเงิน (PromptPay/TrueMoney)
- ✅ ตรวจสอบสลิปการโอนเงินด้วย OCR
- ✅ ระบบคิวรอชำระเงิน (10 นาทีหมดอายุ)

### Admin Side
- ✅ ดูคิวรูปภาพที่รอการอนุมัติ
- ✅ อนุมัติ/ปฏิเสธรูปภาพ
- ✅ ระบบ login ด้วย hash password
- ✅ UI แบบ minimal design
- ✅ ลบคิวอัตโนมัติหลังตัดสินใจ

## 🔧 Technology Stack

### Frontend
- React.js
- React Router
- CSS3 (Minimal Design)

### Backend
- Node.js
- Express.js
- Multer (File Upload)
- Tesseract.js (OCR)
- bcrypt (Password Hashing)
- CORS

## 📱 การใช้งาน

### สำหรับผู้ใช้ (User)
1. เลือกประเภท (รูปภาพ/ข้อความ)
2. เลือกเวลาและราคา
3. อัปโหลดรูปภาพและใส่ข้อความ
4. ชำระเงินผ่าน PromptPay หรือ TrueMoney
5. รอการอนุมัติจาก Admin

### สำหรับผู้ดูแล (Admin)
1. เข้าสู่ระบบด้วย username/password
2. ดูคิวรูปภาพที่รอการอนุมัติ
3. คลิกดูรายละเอียดรูปภาพ
4. อนุมัติหรือปฏิเสธ

## 🛡️ Security Features

- Hash password ด้วย bcrypt
- ตรวจสอบไฟล์ upload
- ระบบหมดอายุสำหรับคิวที่ไม่ชำระเงิน
- CORS protection

## 📝 License

MIT License

## 👨‍💻 Developer

Developed by Boriwat-wtm
