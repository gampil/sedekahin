import { Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../contexts/DataProvider';
import { Heart, Menu, X } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col bg-[#F5F7FB]">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1769E0] rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-bold text-[#172033]">{settings.siteName}</span>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.path ? 'text-[#1769E0]' : 'text-[#6B7280] hover:text-[#172033]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/program"
                className="bg-[#1769E0] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1057BE] transition-colors"
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
              className="block mt-3 bg-[#1769E0] text-white px-5 py-3 rounded-lg text-sm font-semibold text-center"
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
      <footer className="bg-[#172033] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#1769E0] rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-lg font-bold">{settings.siteName}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{settings.siteDescription}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigasi</h4>
              <div className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <Link key={link.path} to={link.path} className="text-gray-400 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <p>{settings.email}</p>
                <p>{settings.whatsapp}</p>
                <p>{settings.address}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 {settings.siteName}. Semua hak dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
