# SedekahOnline - Platform Donasi & Sedekah

Website donasi/sedekah production-ready dengan Public Website + Admin Panel.

## 🚀 Quick Start - Langsung Tampil

### Cara Tercepat (Mode Demo)
Website langsung bisa tampil tanpa konfigurasi apapun:

1. **Build project:**
   ```bash
   npm install
   npm run build
   ```

2. **Upload folder `dist/` ke hosting:**
   - Netlify: Drag & drop folder `dist/`
   - Vercel: `vercel --prod`
   - Hosting biasa: Upload isi folder `dist/` via FTP/cPanel

3. **Selesai!** Website langsung tampil dengan data demo.

---

## 📋 Fitur

### Public Website
- ✅ Halaman utama dengan program unggulan
- ✅ Detail campaign dengan progress bar
- ✅ Tab: Keterangan, Kabar Terbaru, Donatur
- ✅ Form donasi multi-step (nominal → pembayaran → data)
- ✅ Invoice & upload bukti transfer
- ✅ Aamiin (dengan cooldown anti-spam)
- ✅ Gallery dengan lightbox
- ✅ Responsive mobile-first

### Admin Panel
- ✅ Dashboard statistik
- ✅ CRUD Campaign (dengan auto-slug)
- ✅ CRUD Paket Donasi
- ✅ CRUD Rekening Bank
- ✅ CRUD Kabar Terbaru
- ✅ CRUD Gallery
- ✅ CRUD Testimoni
- ✅ Manajemen Donasi (approve/reject)
- ✅ Pengaturan website

---

## 🔧 Setup Production (Firebase + Backend)

Untuk mengaktifkan fitur lengkap, ikuti langkah berikut:

### 1. Firebase Setup

#### a. Buat Firebase Project
1. Buka https://console.firebase.google.com/
2. Klik "Add Project" → beri nama → Create

#### b. Aktifkan Realtime Database
1. Menu kiri → Build → Realtime Database
2. Klik "Create Database"
3. Pilih lokasi (Singapore untuk Indonesia)
4. Mulai dalam **test mode** (nanti kita ubah rules)

#### c. Dapatkan Konfigurasi Firebase
1. Project Settings (gear icon) → General
2. Scroll ke "Your apps" → klik Web icon (</>)
3. Daftarkan app → copy konfigurasi

#### d. Buat file `.env` di root project:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

#### e. Setup Firebase Authentication
1. Menu kiri → Build → Authentication
2. Tab "Sign-in method" → Enable **Email/Password**
3. Buat user admin:
   - Tab "Users" → "Add user"
   - Email: admin@sedekahonline.id
   - Password: (buat password kuat)
   - Copy **UID** user tersebut

#### f. Daftarkan Admin di Database
1. Buka Realtime Database
2. Tambahkan data:
```json
{
  "admins": {
    "UID_DARI_LANGKAH_E": {
      "active": true,
      "role": "admin"
    }
  }
}
```

#### g. Import Data Template
1. Download file `firebase/database-template.json`
2. Di Realtime Database → menu (⋮) → Import JSON
3. Upload file template

#### h. Update Security Rules
1. Realtime Database → Tab "Rules"
2. Copy isi `firebase/database.rules.json`
3. Klik "Publish"

### 2. Google Apps Script (Backend)

Untuk fitur: ImgBB, Telegram, Email, Payment Gateway

#### a. Buat Apps Script Project
1. Buka https://script.google.com/
2. New Project → beri nama "SedekahBackend"

#### b. Copy file dari folder `apps-script/`
Copy semua file `.gs` ke Apps Script editor

#### c. Setup Script Properties
Menu Project Settings → Script Properties → Add row:

| Property | Value | Keterangan |
|----------|-------|------------|
| FIREBASE_DATABASE_URL | https://...-rtdb.firebaseio.com | URL database |
| IMGBB_API_KEY | (dapatkan di imgbb.com) | Untuk upload gambar |
| TELEGRAM_BOT_TOKEN | (dari @BotFather) | Token bot Telegram |
| TELEGRAM_CHAT_ID | (chat ID admin) | Untuk notifikasi |
| TELEGRAM_ADMIN_IDS | 123456,789012 | ID admin yang bisa approve |
| EMAIL_API_URL | https://domain.com/api/email.php | Endpoint SMTP |
| EMAIL_API_SECRET | (buat secret random) | Untuk HMAC |
| PAYMENT_GATEWAY_KEY | (dari provider) | API key payment |
| PAYMENT_GATEWAY_SECRET | (dari provider) | Secret key |

#### d. Deploy Apps Script
1. Deploy → New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Copy **Web app URL**

#### e. Tambahkan ke `.env`:
```env
VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
```

### 3. Telegram Bot Setup

1. Chat dengan @BotFather di Telegram
2. `/newbot` → ikuti instruksi
3. Copy **Bot Token** → masukkan ke Script Properties
4. Chat dengan bot Anda, kirim `/start`
5. Buka: `https://api.telegram.org/bot<TOKEN>/getUpdates`
6. Copy **chat.id** → masukkan ke TELEGRAM_CHAT_ID
7. Untuk Telegram Admin ID: chat dengan @userinfobot

### 4. ImgBB Setup (Image Hosting)

1. Daftar di https://imgbb.com/
2. Dashboard → API Key
3. Copy key → masukkan ke Script Properties `IMGBB_API_KEY`

### 5. SMTP Email Setup

1. Siapkan hosting dengan PHP + SMTP
2. Upload folder `api/` ke hosting
3. Edit `api/config.php`:
```php
<?php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-app-password');
define('SMTP_FROM', 'noreply@sedekahonline.id');
define('EMAIL_API_SECRET', 'your-secret-here');
```
4. Pastikan `EMAIL_API_URL` di Apps Script mengarah ke `https://domain.com/api/email.php`

### 6. Payment Gateway Setup

Pilih provider (Midtrans, Xendit, Tripay, dll):

1. Daftar dan dapatkan API credentials
2. Masukkan ke Script Properties:
   - `PAYMENT_GATEWAY_KEY`
   - `PAYMENT_GATEWAY_SECRET`
3. Setup webhook/callback URL di dashboard provider
4. Callback URL: `https://script.google.com/macros/s/XXXXX/exec?action=paymentCallback`

### 7. Build & Deploy

```bash
# Install dependencies
npm install

# Build production
npm run build

# Upload folder dist/ ke hosting
```

---

## 📁 Struktur Project

```
project/
├── src/
│   ├── App.tsx              # Router utama
│   ├── config/firebase.ts   # Konfigurasi Firebase
│   ├── contexts/            # Data & Auth context
│   ├── pages/
│   │   ├── public/          # Halaman publik
│   │   └── admin/           # Halaman admin
│   ├── layouts/             # Layout public & admin
│   ├── types/               # TypeScript types
│   ├── data/mockData.ts     # Data demo
│   └── utils/helpers.ts     # Helper functions
├── apps-script/             # Backend Google Apps Script
├── api/                     # PHP backend (SMTP)
├── firebase/                # Rules & template
└── dist/                    # Build output (upload ini)
```

---

## 🌐 URL Routing

### Public
- `/` - Homepage
- `/program` - Daftar campaign
- `/program/:slug` - Detail campaign
- `/donasi?program=ID` - Form donasi
- `/invoice/:id` - Invoice & upload bukti
- `/galeri` - Gallery foto

### Admin
- `/admin/login` - Login admin
- `/admin` - Dashboard
- `/admin/programs` - CRUD Campaign
- `/admin/donations` - Manajemen donasi
- `/admin/packages` - CRUD Paket
- `/admin/banks` - CRUD Bank
- `/admin/updates` - CRUD Kabar
- `/admin/gallery` - CRUD Gallery
- `/admin/testimonials` - CRUD Testimoni
- `/admin/settings` - Pengaturan

---

## 🔒 Security

### Firebase Rules
- Public: hanya bisa baca data published & buat donasi
- Admin: full CRUD setelah verified di `admins/{uid}`
- Tidak bisa self-approve donasi
- Validasi schema di level database

### Apps Script
- Secret (Telegram, ImgBB, Payment) hanya di server
- HMAC verification untuk email API
- Telegram approval hanya untuk whitelisted admin IDs

### Frontend
- Tidak ada secret di client-side
- Idempotency key mencegah double submit
- Aamiin cooldown via localStorage

---

## 🧪 Testing Checklist

### Public
- [ ] Homepage tampil
- [ ] Klik campaign → detail tampil
- [ ] Tab Keterangan/Kabar/Donatur bekerja
- [ ] Klik "Sedekah Sekarang" → form donasi
- [ ] Pilih nominal → lanjut
- [ ] Pilih bank → lanjut
- [ ] Isi data → submit
- [ ] Invoice tampil
- [ ] Upload bukti transfer
- [ ] Aamiin bisa diklik (count bertambah)

### Admin
- [ ] Login dengan email/password Firebase
- [ ] Dashboard tampil statistik
- [ ] Tambah campaign → tampil di public
- [ ] Edit campaign → update di public
- [ ] Approve donasi → status berubah
- [ ] Reject donasi → status berubah

### Integration (jika sudah setup)
- [ ] Upload gambar → masuk ImgBB
- [ ] Donasi baru → notifikasi Telegram
- [ ] Bukti masuk → notifikasi Telegram
- [ ] Approve dari Telegram → status berubah
- [ ] Email terkirim saat donasi dibuat

---

## 🐛 Troubleshooting

### Website tidak tampil
- Pastikan build berhasil: `npm run build`
- Upload isi folder `dist/`, bukan folder project

### Data tidak muncul (setelah setup Firebase)
- Cek `.env` sudah terisi dengan benar
- Rebuild: `npm run build`
- Cek Firebase Database → data sudah di-import

### Login admin gagal
- Pastikan UID admin sudah didaftarkan di `admins/{uid}`
- Cek `active: true` di database
- Cek Firebase Authentication → user sudah dibuat

### Gambar tidak bisa upload
- Cek Apps Script deployed sebagai Web App
- Cek IMGBB_API_KEY di Script Properties
- Cek CORS di Apps Script (harus return proper headers)

### Telegram tidak menerima notifikasi
- Cek TELEGRAM_BOT_TOKEN valid
- Cek bot sudah di-start oleh admin
- Cek TELEGRAM_CHAT_ID benar

---

## 📞 Support

Untuk bantuan setup atau pertanyaan, silakan buka issue di repository atau hubungi tim development.

---

## 📄 License

Proprietary - All rights reserved.
