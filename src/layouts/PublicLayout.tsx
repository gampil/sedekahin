import { Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function PublicLayout() {
  const { settings } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/program', label: 'Program' },
    { path: '/galeri', label: 'Galeri' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#1769E0] to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-base font-extrabold text-[#0a1628] block leading-tight">SEDEKAH SUBUH</span>
                <span className="text-xs font-semibold text-[#1769E0] leading-tight">HARAMAIN</span>
              </div>
              <span className="sm:hidden text-base font-extrabold text-[#0a1628]">SSH</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-[#1769E0]' : 'text-[#6B7280] hover:text-[#0a1628]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/program"
                className="bg-[#1769E0] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#1057BE] transition-colors shadow-sm"
              >
                Sedekah Sekarang
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#6B7280]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white px-4 py-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 text-sm font-medium ${
                  location.pathname === link.path ? 'text-[#1769E0]' : 'text-[#6B7280]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/program"
              onClick={() => setMobileMenuOpen(false)}
              className="block mt-3 bg-[#1769E0] text-white px-5 py-3 rounded-xl text-sm font-bold text-center"
            >
              Sedekah Sekarang
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a1628] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-[#1769E0] to-emerald-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block leading-tight">SEDEKAH SUBUH</span>
                  <span className="text-xs font-semibold text-[#1769E0] leading-tight">HARAMAIN</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{settings.siteDescription}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigasi</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Kontak</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <p>{settings.email}</p>
                <p>{settings.whatsapp}</p>
                <p>{settings.address}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 Sedekah Subuh Haramain. Sedekah Online Aman & Transparan.
          </div>
        </div>
      </footer>
    </div>
  );
}
