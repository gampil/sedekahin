import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataProvider';
import { useState } from 'react';
import { LayoutDashboard, FolderOpen, Package, Landmark, Heart, Newspaper, Image, MessageSquare, Settings, LogOut, Menu, X, ExternalLink } from 'lucide-react';

export default function AdminLayout() {
  const { isAdmin, loading, logout } = useAuth();
  const { settings } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-[#1769E0] border-t-transparent rounded-full"></div></div>;
  }

  if (!isAdmin && location.pathname !== '/admin/login') {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/programs', icon: FolderOpen, label: 'Campaign' },
    { path: '/admin/donations', icon: Heart, label: 'Donasi' },
    { path: '/admin/packages', icon: Package, label: 'Paket Donasi' },
    { path: '/admin/banks', icon: Landmark, label: 'Rekening Bank' },
    { path: '/admin/updates', icon: Newspaper, label: 'Kabar Terbaru' },
    { path: '/admin/gallery', icon: Image, label: 'Galeri' },
    { path: '/admin/testimonials', icon: MessageSquare, label: 'Testimoni' },
    { path: '/admin/settings', icon: Settings, label: 'Pengaturan' },
  ];

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex flex-col h-full bg-[#172033] ${mobile ? '' : 'w-64'}`}>
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1769E0] rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-white font-bold">{settings.siteName}</span>
          <span className="text-xs text-gray-400 ml-1">Admin</span>
        </div>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => mobile && setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${
                isActive ? 'bg-[#1769E0] text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t border-white/10">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 mb-1">
          <ExternalLink className="w-4 h-4" /> Lihat Website
        </Link>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-white/5 w-full text-left">
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative w-64 h-full">
            <Sidebar mobile />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[#6B7280]">
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg font-semibold text-[#172033]">
                {menuItems.find(m => m.path === location.pathname || (m.path !== '/admin' && location.pathname.startsWith(m.path)))?.label || 'Dashboard'}
              </h1>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
