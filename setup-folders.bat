@echo off
chcp 65001 >nul
echo ============================================
echo   SEDERHANAIN - Auto File Creator
echo ============================================
echo.
echo Script ini akan membuat semua file yang diperlukan.
echo Pastikan Anda menjalankan di folder project yang benar.
echo.

REM Create directories
echo [1/7] Membuat folder...
if not exist "src" mkdir src
if not exist "src\config" mkdir src\config
if not exist "src\types" mkdir src\types
if not exist "src\data" mkdir src\data
if not exist "src\utils" mkdir src\utils
if not exist "src\components" mkdir src\components
if not exist "src\contexts" mkdir src\contexts
if not exist "src\layouts" mkdir src\layouts
if not exist "src\pages" mkdir src\pages
if not exist "src\pages\public" mkdir src\pages\public
if not exist "src\pages\admin" mkdir src\pages\admin

echo [2/7] File-file folder sudah dibuat.
echo.
echo [3/7] SELANJUTNYA: Copy isi file dari environment web ke folder ini.
echo.
echo ============================================
echo   LANGKAH SELANJUTNYA:
echo ============================================
echo.
echo 1. Buka environment web ini
echo 2. Untuk SETIAP file, klik file tersebut
echo 3. Copy SELURUH isi file
echo 4. Buat file baru di folder ini dengan nama yang sama
echo 5. Paste isi file dan Save
echo.
echo File yang harus di-copy (TOTAL 30+ file):
echo.
echo ROOT:
echo   - package.json
echo   - index.html
echo   - tsconfig.json
echo   - vite.config.js
echo.
echo SRC:
echo   - src\main.tsx
echo   - src\App.tsx
echo   - src\index.css
echo   - src\vite-env.d.ts
echo   - src\config\firebase.ts
echo   - src\types\index.ts
echo   - src\data\mockData.ts
echo   - src\utils\helpers.ts
echo   - src\components\Toast.tsx
echo   - src\contexts\AuthContext.tsx
echo   - src\contexts\DataProvider.tsx
echo   - src\layouts\PublicLayout.tsx
echo   - src\layouts\AdminLayout.tsx
echo   - src\pages\public\HomePage.tsx
echo   - src\pages\public\ProgramPage.tsx
echo   - src\pages\public\CampaignDetailPage.tsx
echo   - src\pages\public\DonationPage.tsx
echo   - src\pages\public\InvoicePage.tsx
echo   - src\pages\public\GalleryPage.tsx
echo   - src\pages\admin\AdminLogin.tsx
echo   - src\pages\admin\AdminDashboard.tsx
echo   - src\pages\admin\AdminPrograms.tsx
echo   - src\pages\admin\AdminProgramForm.tsx
echo   - src\pages\admin\AdminPackages.tsx
echo   - src\pages\admin\AdminBanks.tsx
echo   - src\pages\admin\AdminDonations.tsx
echo   - src\pages\admin\AdminUpdates.tsx
echo   - src\pages\admin\AdminGallery.tsx
echo   - src\pages\admin\AdminTestimonials.tsx
echo   - src\pages\admin\AdminSettings.tsx
echo.
echo ============================================
echo   SETELAH SEMUA FILE DI-COPY:
echo ============================================
echo.
echo Jalankan command berikut:
echo.
echo   npm install
echo   npm run build
echo.
echo Upload folder 'dist' ke hosting. SELESAI!
echo.
pause
