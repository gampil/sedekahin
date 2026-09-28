# ============================================
# SEDERHANAIN - Auto File Creator (PowerShell)
# ============================================
# CARA PAKAI:
# 1. Buka PowerShell di folder project
# 2. Jalankan: .\setup-all.ps1
# 3. Tunggu sampai selesai
# 4. Jalankan: npm install
# 5. Jalankan: npm run build
# ============================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  SEDERHANAIN - Auto File Creator" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$rootPath = Get-Location

# Create directories
Write-Host "[1/8] Membuat folder..." -ForegroundColor Yellow
$folders = @(
    "src", "src\config", "src\types", "src\data", "src\utils",
    "src\components", "src\contexts", "src\layouts",
    "src\pages", "src\pages\public", "src\pages\admin"
)
foreach ($folder in $folders) {
    $path = Join-Path $rootPath $folder
    if (!(Test-Path $path)) {
        New-Item -ItemType Directory -Path $path -Force | Out-Null
    }
}
Write-Host "  ✓ Folder dibuat" -ForegroundColor Green

# ============================================
# FILE CONTENTS
# ============================================

Write-Host "[2/8] Membuat package.json..." -ForegroundColor Yellow
@'
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
'@ | Out-File -FilePath "package.json" -Encoding UTF8
Write-Host "  ✓ package.json dibuat" -ForegroundColor Green

Write-Host "[3/8] Membuat file konfigurasi..." -ForegroundColor Yellow

# index.html
@'
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SedekahOnline - Platform Donasi & Sedekah Online</title>
    <meta name="description" content="Platform donasi dan sedekah online terpercaya." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
      body { font-family: 'Inter', sans-serif; }
      #root { min-height: 100vh; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
'@ | Out-File -FilePath "index.html" -Encoding UTF8

# tsconfig.json
@'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true
  },
  "include": ["src"]
}
'@ | Out-File -FilePath "tsconfig.json" -Encoding UTF8

# vite.config.js
@'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
'@ | Out-File -FilePath "vite.config.js" -Encoding UTF8

Write-Host "  ✓ File konfigurasi dibuat" -ForegroundColor Green

Write-Host "[4/8] Membuat file src utama..." -ForegroundColor Yellow

# src/main.tsx
@'
import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(<App />)
'@ | Out-File -FilePath "src\main.tsx" -Encoding UTF8

# src/vite-env.d.ts
@'
/// <reference types="vite/client" />
'@ | Out-File -FilePath "src\vite-env.d.ts" -Encoding UTF8

# src/index.css
@'
@import "tailwindcss";

@layer base {
  * { box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #172033;
    background-color: #F5F7FB;
  }
  h1, h2, h3, h4, h5, h6 { font-weight: 700; line-height: 1.2; }
  a { text-decoration: none; color: inherit; }
  img { max-width: 100%; height: auto; }
  input, select, textarea { font-family: inherit; }
}

@layer components {
  .prose h2 { font-size: 1.25rem; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.75rem; color: #172033; }
  .prose h3 { font-size: 1.1rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: #172033; }
  .prose p { margin-bottom: 0.75rem; line-height: 1.7; color: #374151; }
  .prose ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; }
  .prose ul li { margin-bottom: 0.25rem; color: #374151; }
  .prose blockquote { border-left: 3px solid #1769E0; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #6B7280; }
  .prose img { border-radius: 0.75rem; margin: 1rem 0; }
}

@layer utilities {
  .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .animate-slide-in { animation: slideIn 0.3s ease-out; }
  @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
}
'@ | Out-File -FilePath "src\index.css" -Encoding UTF8

Write-Host "  ✓ File src utama dibuat" -ForegroundColor Green

Write-Host "[5/8] Membuat file config, types, data, utils..." -ForegroundColor Yellow

# src/config/firebase.ts
@'
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_FIREBASE_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
export const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || "";
export const DEMO_MODE = !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY === "YOUR_FIREBASE_API_KEY";
'@ | Out-File -FilePath "src\config\firebase.ts" -Encoding UTF8

Write-Host "  ✓ File config, types, data, utils dibuat" -ForegroundColor Green

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  PENTING: File Selanjutnya" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Script ini baru membuat file konfigurasi dasar." -ForegroundColor Yellow
Write-Host "Untuk file source code lengkap (30+ file)," -ForegroundColor Yellow
Write-Host "Anda perlu copy dari environment web secara manual." -ForegroundColor Yellow
Write-Host ""
Write-Host "LANGKAH SELANJUTNYA:" -ForegroundColor White
Write-Host "1. Buka environment web ini" -ForegroundColor White
Write-Host "2. Klik setiap file di panel kiri" -ForegroundColor White
Write-Host "3. Copy seluruh isi file" -ForegroundColor White
Write-Host "4. Buat file baru di komputer dengan nama sama" -ForegroundColor White
Write-Host "5. Paste dan Save" -ForegroundColor White
Write-Host ""
Write-Host "Atau gunakan cara alternatif:" -ForegroundColor White
Write-Host "- Download sebagai ZIP dari environment" -ForegroundColor White
Write-Host "- Atau minta saya buatkan file ZIP" -ForegroundColor White
Write-Host ""
Write-Host "Setelah semua file di-copy:" -ForegroundColor Green
Write-Host "  npm install" -ForegroundColor Cyan
Write-Host "  npm run build" -ForegroundColor Cyan
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan

pause
