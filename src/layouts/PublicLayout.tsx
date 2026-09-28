import { Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';
import { useState } from 'react';

export default function PublicLayout() {
  const { settings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Beranda', key: 'home' },
    { path: '/program', label: 'Program', key: 'program' },
    { path: '/paket-nasi', label: 'Paket Nasi', key: 'paket-nasi' },
    { path: '/donatur', label: 'Donatur', key: 'donatur' },
    { path: '/galeri', label: 'Galeri', key: 'galeri' },
    { path: '/tentang', label: 'Tentang', key: 'tentang' },
    { path: '/status', label: 'Cek donasi', key: 'status' },
  ];

  const currentKey = location.pathname === '/' ? 'home' : location.pathname.split('/')[1] || 'home';

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Header */}
      <header className="site-header">
        <div className="container-shell nav-wrap">
          <Link to="/" className="brand" aria-label={`${settings.siteName} Beranda`}>
            <span className="brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/>
              </svg>
            </span>
            <span className="brand-copy">
              <span className="brand-copy-text">{settings.siteName}</span>
              <small>Sedekah Online</small>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Navigasi utama">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link"
                aria-current={currentKey === link.key ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link to="/program" className="btn btn-primary">
              Mulai sedekah
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-button"
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="icon-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? <path d="m18 6-12 12M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-menu open" aria-label="Navigasi seluler">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="nav-link"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/program" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary">
              Mulai sedekah
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main" className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container-shell footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"/>
                </svg>
              </span>
              <span className="brand-copy">
                <span className="brand-copy-text">{settings.siteName}</span>
                <small>Sedekah Online</small>
              </span>
            </Link>
            <p className="footer-about">Platform sedekah yang menghubungkan niat baik dengan program terverifikasi dan laporan yang transparan.</p>
          </div>
          <div>
            <div className="footer-title">Jelajahi</div>
            <div className="footer-links">
              <Link to="/program">Semua program</Link>
              <Link to="/paket-nasi">Paket nasi</Link>
              <Link to="/donatur">Doa donatur</Link>
              <Link to="/galeri">Galeri</Link>
              <Link to="/status">Cek donasi</Link>
            </div>
          </div>
          <div>
            <div className="footer-title">Informasi</div>
            <div className="footer-links">
              <Link to="/tentang">Tentang kami</Link>
              <Link to="/kebijakan-privasi">Kebijakan privasi</Link>
              <Link to="/syarat-ketentuan">Syarat & ketentuan</Link>
              <Link to="/admin/login">Panel admin</Link>
            </div>
          </div>
          <div>
            <div className="footer-title">Butuh bantuan?</div>
            <div className="footer-links">
              <a href={`mailto:${settings.email}`} className="support-email">{settings.email}</a>
              <a href={`https://wa.me/${settings.whatsapp?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="support-whatsapp">WhatsApp dukungan</a>
            </div>
          </div>
        </div>
        <div className="container-shell footer-bottom">
          <span>© {new Date().getFullYear()} {settings.siteName}. Semua hak dilindungi.</span>
          <span>Pembayaran aman diproses melalui layanan pembayaran</span>
        </div>
      </footer>
    </div>
  );
}
