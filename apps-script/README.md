# Google Apps Script Backend - SEDEKAH SUBUH HARAMAIN

File ini berisi backend Google Apps Script untuk menangani:
- Firebase RTDB operations (server-side)
- ImgBB image upload
- Telegram Bot notifications & approval
- Email notifications (via PHP SMTP)
- Payment Gateway integration

## 📋 CARA SETUP

### 1. Buat Google Apps Script Project

1. Buka https://script.google.com/
2. Klik **"New Project"**
3. Beri nama: **"SedekahSubuhBackend"**
4. Hapus file `Code.gs` default
5. Copy **SEMUA isi file `Code.gs`** dari folder ini
6. Paste ke editor Apps Script
7. Save (Ctrl+S)

### 2. Setup Script Properties

1. Klik icon **⚙️ (Project Settings)** di sidebar kiri
2. Scroll ke bagian **"Script Properties"**
3. Klik **"Add script property"**
4. Tambahkan properties berikut:

| Property Name | Value | Keterangan |
|--------------|-------|------------|
| `FIREBASE_DATABASE_URL` | `https://your-project-id-default-rtdb.firebaseio.com` | URL Firebase RTDB Anda |
| `IMGBB_API_KEY` | `your_imgbb_api_key` | Dapatkan dari https://imgbb.com/ |
| `TELEGRAM_BOT_TOKEN` | `123456789:ABCdefGHIjklMNOpqrsTUVwxyz` | Token dari @BotFather |
| `TELEGRAM_CHAT_ID` | `123456789` | Chat ID admin untuk notifikasi |
| `TELEGRAM_ADMIN_IDS` | `123456789,987654321` | Comma-separated Telegram user IDs yang bisa approve |
| `EMAIL_API_URL` | `https://your-domain.com/api/email.php` | Endpoint PHP SMTP (opsional) |
| `EMAIL_API_SECRET` | `your_secret_key_here` | Secret untuk HMAC verification (opsional) |
| `PAYMENT_GATEWAY_KEY` | `your_payment_key` | API key payment gateway (opsional) |
| `PAYMENT_GATEWAY_SECRET` | `your_payment_secret` | Secret key payment gateway (opsional) |

### 3. Deploy sebagai Web App

1. Klik **"Deploy"** → **"New deployment"**
2. Klik icon ⚙️ di sebelah "Select type"
3. Pilih **"Web app"**
4. Isi konfigurasi:
   - **Description**: `Sedekah Subuh Backend v1`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
5. Klik **"Deploy"**
6. **Copy URL** yang muncul (contoh: `https://script.google.com/macros/s/AKfycbx.../exec`)
7. URL ini akan digunakan di frontend sebagai `VITE_APPS_SCRIPT_URL`

### 4. Setup Telegram Bot

#### a. Buat Bot
1. Chat dengan **@BotFather** di Telegram
2. Kirim `/newbot`
3. Ikuti instruksi (nama bot, username)
4. Copy **Bot Token** yang diberikan
5. Masukkan ke Script Properties: `TELEGRAM_BOT_TOKEN`

#### b. Dapatkan Chat ID Admin
1. Chat dengan bot Anda, kirim `/start`
2. Buka URL ini di browser (ganti `<BOT_TOKEN>` dengan token Anda):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
   ```
3. Cari `"chat":{"id":123456789,...}`
4. Copy angka tersebut
5. Masukkan ke Script Properties: `TELEGRAM_CHAT_ID`

#### c. Dapatkan Telegram User ID untuk Approval
1. Chat dengan **@userinfobot** di Telegram
2. Bot akan memberikan User ID Anda
3. Masukkan ke Script Properties: `TELEGRAM_ADMIN_IDS`
4. Untuk multiple admin, pisahkan dengan koma: `123456789,987654321`

#### d. Setup Webhook untuk Approval
1. Setelah deploy Apps Script, dapatkan URL Web App
2. Buka URL ini di browser (ganti `<BOT_TOKEN>` dan `<WEB_APP_URL>`):
   ```
   https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<WEB_APP_URL>?action=telegram
   ```
   Contoh:
   ```
   https://api.telegram.org/bot123456789:ABCdef/setWebhook?url=https://script.google.com/macros/s/AKfycbx.../exec?action=telegram
   ```
3. Jika berhasil, akan muncul: `{"ok":true,"result":true,"description":"Webhook was set"}`

### 5. Setup ImgBB (Image Hosting)

1. Daftar di https://imgbb.com/
2. Login → Dashboard
3. Klik **"API"** di menu
4. Copy **API Key**
5. Masukkan ke Script Properties: `IMGBB_API_KEY`

### 6. Setup Email (Opsional)

Jika ingin notifikasi email:

1. Siapkan hosting dengan PHP + SMTP
2. Upload folder `api/` ke hosting
3. Edit `api/config.php`:
   ```php
   define('SMTP_HOST', 'smtp.gmail.com');
   define('SMTP_PORT', 587);
   define('SMTP_USER', 'your-email@gmail.com');
   define('SMTP_PASS', 'your-app-password');
   define('SMTP_FROM', 'noreply@sedekahsubuhharamain.com');
   define('EMAIL_API_SECRET', 'your-secret-here');
   ```
4. Masukkan URL endpoint ke Script Properties: `EMAIL_API_URL`
5. Masukkan secret yang sama ke: `EMAIL_API_SECRET`

### 7. Setup Payment Gateway (Opsional)

Pilih provider (Midtrans, Xendit, Tripay, dll):

1. Daftar dan dapatkan API credentials
2. Masukkan ke Script Properties:
   - `PAYMENT_GATEWAY_KEY`
   - `PAYMENT_GATEWAY_SECRET`
3. Setup webhook/callback URL di dashboard provider:
   ```
   https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?action=paymentCallback
   ```

### 8. Update Frontend Config

Di project React, buat/edit file `.env`:

```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
```

Lalu rebuild:
```bash
npm run build
```

---

## 🔧 FITUR YANG SUDAH IMPLEMENTED

### ✅ Telegram Bot Notifications
- Notifikasi saat donasi baru dibuat
- Notifikasi saat bukti transfer masuk
- Notifikasi saat donasi di-approve/reject

### ✅ Telegram Approval (Inline Buttons)
- Tombol APPROVE dan REJECT di notifikasi bukti transfer
- Hanya admin yang terdaftar di `TELEGRAM_ADMIN_IDS` bisa approve
- Setelah approve, pesan Telegram di-edit dengan status
- Mencegah double approval

### ✅ ImgBB Image Upload
- Upload gambar dari frontend
- Return URL, delete URL, width, height
- Digunakan untuk: campaign images, gallery, payment proofs

### ✅ Firebase RTDB Operations
- Server-side CRUD untuk admin actions
- Public read untuk data publik
- Transaction untuk atomic operations (aamiin counter)

### ✅ Email Notifications (Opsional)
- Via PHP SMTP endpoint
- HMAC verification untuk security
- Events: donation created, proof submitted, donation paid

### ✅ Payment Gateway (Opsional)
- Integration dengan provider payment
- Callback/webhook handling
- Status verification

---

## 🧪 TESTING

### Test Telegram Notification
1. Buat donasi baru dari frontend
2. Cek Telegram admin - harus ada notifikasi

### Test Telegram Approval
1. Upload bukti transfer dari frontend
2. Cek Telegram admin - harus ada tombol APPROVE/REJECT
3. Klik APPROVE
4. Cek status donasi - harus berubah menjadi "paid"
5. Pesan Telegram harus ter-edit dengan status "DISETUJUI"

### Test ImgBB Upload
1. Upload gambar campaign dari admin panel
2. Cek ImgBB dashboard - gambar harus muncul
3. Cek URL gambar di Firebase - harus valid

### Test Email (jika setup)
1. Buat donasi baru
2. Cek email admin - harus ada notifikasi
3. Upload bukti transfer
4. Cek email admin - harus ada notifikasi bukti masuk

---

## 🐛 TROUBLESHOOTING

### Telegram tidak menerima notifikasi
- Cek `TELEGRAM_BOT_TOKEN` valid
- Cek bot sudah di-start oleh admin
- Cek `TELEGRAM_CHAT_ID` benar
- Test manual: buka `https://api.telegram.org/bot<TOKEN>/sendMessage?chat_id=<CHAT_ID>&text=test`

### Telegram approval tidak bekerja
- Cek webhook sudah di-setup: `https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
- Cek `TELEGRAM_ADMIN_IDS` berisi User ID yang benar
- Cek Apps Script deployed sebagai Web App dengan access "Anyone"

### ImgBB upload gagal
- Cek `IMGBB_API_KEY` valid
- Cek quota ImgBB (free: 100 uploads/hari)
- Cek format base64 benar

### Firebase tidak ter-update
- Cek `FIREBASE_DATABASE_URL` benar (tanpa trailing slash)
- Cek Firebase RTDB rules mengizinkan write dari Apps Script
- Test manual: buka `https://<DATABASE_URL>/test.json`

### Email tidak terkirim
- Cek `EMAIL_API_URL` accessible dari internet
- Cek `EMAIL_API_SECRET` sama di Apps Script dan PHP
- Cek SMTP credentials valid
- Test endpoint: `curl https://your-domain.com/api/email.php`

---

## 📞 SUPPORT

Jika ada masalah, cek:
1. Script Properties sudah terisi semua
2. Apps Script sudah di-deploy sebagai Web App
3. Telegram webhook sudah di-setup
4. Firebase RTDB rules sudah benar
5. ImgBB API key valid

Untuk debug, tambahkan `Logger.log()` di Apps Script dan lihat di **View → Logs**.

---

## 🔒 SECURITY NOTES

- **JANGAN** share Bot Token, API Keys, atau Secrets
- **GUNAKAN** Script Properties untuk menyimpan credentials
- **VERIFIKASI** Telegram admin IDs sebelum approve
- **VALIDASI** semua input dari frontend
- **LIMIT** rate untuk public endpoints

---

## 📝 CHANGELOG

### v1.0.0 (Initial)
- ✅ Telegram notifications
- ✅ Telegram approval with inline buttons
- ✅ ImgBB image upload
- ✅ Firebase RTDB operations
- ✅ Email notifications (via PHP)
- ✅ Payment gateway integration (placeholder)
