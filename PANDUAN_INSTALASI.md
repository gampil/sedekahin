# 🚀 PANDUAN INSTALASI LENGKAP - SEDERHANAIN

## ⚠️ MASALAH YANG ANDA ALAMI

Error yang muncul:
```
ENOENT: no such file or directory, open 'C:\Users\User\Documents\sedekahin-main\package.json'
```

**Penyebab:** Folder `sedekahin-main` tidak memiliki file `package.json` dan file-file source code lainnya.

---

## ✅ SOLUSI LENGKAP

### LANGKAH 1: Download Semua File dari Environment Ini

Karena file sudah ada di environment web ini, Anda perlu **mendownload/menyalin** semua file ke komputer lokal Anda.

#### Cara A: Download Manual (Recommended)

1. **Buka file explorer di komputer Anda**
   - Buka folder: `C:\Users\User\Documents\sedekahin-main\`

2. **Untuk setiap file di bawah ini, copy isinya:**

   **FILE 1: package.json**
   ```json
   {
     "name": "sedekahin",
     "private": true,
     "version": "1.0.0",
     "type": "module",
     "scripts": {
       "dev": "vite",
       "build": "vite build",
       "preview": "vite preview"
     },
     "dependencies": {
       "firebase": "^12.19.0",
       "lucide-react": "^0.294.0",
       "react": "^18.2.0",
       "react-dom": "^18.2.0",
       "react-router-dom": "^6.8.0",
       "uuid": "^9.0.1"
     },
     "devDependencies": {
       "@tailwindcss/vite": "^4.1.7",
       "@types/react": "^18.2.0",
       "@types/react-dom": "^18.2.0",
       "@types/uuid": "^9.0.7",
       "@vitejs/plugin-react": "^4.3.4",
       "tailwindcss": "^4.1.7",
       "typescript": "^5.7.0",
       "vite": "^6.3.5"
     }
   }
   ```

3. **Buat file `package.json` di folder `sedekahin-main`**
   - Buka Notepad atau VS Code
   - Copy isi di atas
   - Save dengan nama: `package.json`
   - Pastikan lokasi: `C:\Users\User\Documents\sedekahin-main\package.json`

4. **Ulangi untuk semua file lainnya** (lihat daftar di bawah)

---

### LANGKAH 2: Struktur Folder yang Harus Dibuat

Pastikan struktur folder seperti ini:

```
sedekahin-main/
├── package.json                    ← WAJIB ADA
├── package-lock.json               ← Akan dibuat otomatis saat npm install
├── index.html
├── tsconfig.json
├── vite.config.js
├── README.md
├── .env.example
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── vite-env.d.ts
    ├── config/
    │   └── firebase.ts
    ├── types/
    │   └── index.ts
    ├── data/
    │   └── mockData.ts
    ├── utils/
    │   └── helpers.ts
    ├── components/
    │   └── Toast.tsx
    ├── contexts/
    │   ├── AuthContext.tsx
    │   └── DataProvider.tsx
    ├── layouts/
    │   ├── PublicLayout.tsx
    │   └── AdminLayout.tsx
    └── pages/
        ├── public/
        │   ├── HomePage.tsx
        │   ├── ProgramPage.tsx
        │   ├── CampaignDetailPage.tsx
        │   ├── DonationPage.tsx
        │   ├── InvoicePage.tsx
        │   └── GalleryPage.tsx
        └── admin/
            ├── AdminLogin.tsx
            ├── AdminDashboard.tsx
            ├── AdminPrograms.tsx
            ├── AdminProgramForm.tsx
            ├── AdminPackages.tsx
            ├── AdminBanks.tsx
            ├── AdminDonations.tsx
            ├── AdminUpdates.tsx
            ├── AdminGallery.tsx
            ├── AdminTestimonials.tsx
            └── AdminSettings.tsx
```

---

### LANGKAH 3: Copy Semua File Source Code

**UNTUK SETIAP FILE DI BAWAH INI:**
1. Klik file di environment ini
2. Copy seluruh isi file
3. Buat file baru di komputer lokal dengan nama yang sama
4. Paste isi file
5. Save

**Daftar file yang harus di-copy:**

#### Root Files:
- ✅ `index.html`
- ✅ `tsconfig.json`
- ✅ `vite.config.js`
- ✅ `package.json` (sudah di atas)

#### src/ Files:
- ✅ `src/main.tsx`
- ✅ `src/App.tsx`
- ✅ `src/index.css`
- ✅ `src/vite-env.d.ts`
- ✅ `src/config/firebase.ts`
- ✅ `src/types/index.ts`
- ✅ `src/data/mockData.ts`
- ✅ `src/utils/helpers.ts`
- ✅ `src/components/Toast.tsx`
- ✅ `src/contexts/AuthContext.tsx`
- ✅ `src/contexts/DataProvider.tsx`
- ✅ `src/layouts/PublicLayout.tsx`
- ✅ `src/layouts/AdminLayout.tsx`

#### src/pages/public/ Files:
- ✅ `src/pages/public/HomePage.tsx`
- ✅ `src/pages/public/ProgramPage.tsx`
- ✅ `src/pages/public/CampaignDetailPage.tsx`
- ✅ `src/pages/public/DonationPage.tsx`
- ✅ `src/pages/public/InvoicePage.tsx`
- ✅ `src/pages/public/GalleryPage.tsx`

#### src/pages/admin/ Files:
- ✅ `src/pages/admin/AdminLogin.tsx`
- ✅ `src/pages/admin/AdminDashboard.tsx`
- ✅ `src/pages/admin/AdminPrograms.tsx`
- ✅ `src/pages/admin/AdminProgramForm.tsx`
- ✅ `src/pages/admin/AdminPackages.tsx`
- ✅ `src/pages/admin/AdminBanks.tsx`
- ✅ `src/pages/admin/AdminDonations.tsx`
- ✅ `src/pages/admin/AdminUpdates.tsx`
- ✅ `src/pages/admin/AdminGallery.tsx`
- ✅ `src/pages/admin/AdminTestimonials.tsx`
- ✅ `src/pages/admin/AdminSettings.tsx`

---

### LANGKAH 4: Install Dependencies

Setelah semua file di-copy, buka **Git Bash** atau **Command Prompt** di folder project:

```bash
cd C:\Users\User\Documents\sedekahin-main
npm install
```

Tunggu sampai selesai (1-3 menit).

---

### LANGKAH 5: Build Project

```bash
npm run build
```

Jika berhasil, akan muncul folder `dist/` dengan isi:
```
dist/
├── index.html
└── assets/
    ├── index-[hash].css
    └── index-[hash].js
```

---

### LANGKAH 6: Upload ke Hosting

#### Opsi A: Netlify (Paling Mudah)
1. Buka https://app.netlify.com/drop
2. Drag & drop folder `dist/`
3. Selesai! Website langsung online

#### Opsi B: Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Opsi C: Hosting Biasa (cPanel/FTP)
1. Upload **isi folder `dist/`** (bukan folder dist, tapi isinya) ke `public_html`
2. Selesai!

---

## 🎯 ALTERNATIF: Cara Lebih Cepat

### Gunakan Script Otomatis

Saya bisa buatkan script untuk download semua file sekaligus. Jalankan command ini di Git Bash:

```bash
# Buat folder baru
mkdir sedekahin-complete
cd sedekahin-complete

# Download package.json
curl -o package.json [URL_FILE_DARI_ENVIRONMENT]

# Download semua file lainnya...
```

**TAPI**, karena file ada di environment web ini, cara termudah adalah:

### Cara Termudah: Screenshot & Copy-Paste

1. Buka setiap file di environment ini
2. Screenshot atau copy isi file
3. Buat file baru di komputer lokal
4. Paste dan save

---

## 🔍 CEK APAKAH FILE SUDAH LENGKAP

Jalankan command ini di folder project:

```bash
# Windows (Git Bash)
ls -la

# Harus muncul:
# - package.json
# - index.html
# - tsconfig.json
# - vite.config.js
# - src/ (folder)
```

Jika `package.json` tidak ada, berarti file belum ter-copy dengan benar.

---

## 📞 BANTUAN LEBIH LANJUT

Jika masih ada masalah:

1. **Pastikan Node.js sudah terinstall**
   ```bash
   node --version
   npm --version
   ```

2. **Hapus node_modules dan install ulang**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Cek koneksi internet** saat `npm install`

4. **Gunakan npm versi terbaru**
   ```bash
   npm install -g npm@latest
   ```

---

## ✅ CHECKLIST FINAL

Sebelum build, pastikan:
- [ ] Semua file sudah di-copy ke folder lokal
- [ ] `package.json` ada di root folder
- [ ] Folder `src/` ada dengan semua file di dalamnya
- [ ] Node.js terinstall (cek: `node --version`)
- [ ] Koneksi internet stabil

Setelah itu:
```bash
npm install
npm run build
```

Upload folder `dist/` ke hosting → **SELESAI!** 🎉

---

## 🎬 VIDEO TUTORIAL (Jika Ada)

Jika Anda lebih suka video tutorial, silakan minta saya buatkan panduan video step-by-step.

---

**Catatan Penting:** 
- Website akan berjalan dalam **mode demo** dengan data lokal
- Untuk data permanen, perlu setup Firebase (panduan ada di README.md)
- Semua fitur sudah berfungsi, tinggal upload ke hosting!
