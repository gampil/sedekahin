import { HashRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataProvider';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/Toast';
import PublicLayout from './layouts/PublicLayout';
import HomePage from './pages/public/HomePage';
import ProgramPage from './pages/public/ProgramPage';
import CampaignDetailPage from './pages/public/CampaignDetailPage';
import DonationPage from './pages/public/DonationPage';
import InvoicePage from './pages/public/InvoicePage';
import GalleryPage from './pages/public/GalleryPage';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPrograms from './pages/admin/AdminPrograms';
import AdminProgramForm from './pages/admin/AdminProgramForm';
import AdminPackages from './pages/admin/AdminPackages';
import AdminBanks from './pages/admin/AdminBanks';
import AdminDonations from './pages/admin/AdminDonations';
import AdminUpdates from './pages/admin/AdminUpdates';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminSettings from './pages/admin/AdminSettings';

export default function App() {
  return (
    <HashRouter>
      <DataProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/program" element={<ProgramPage />} />
                <Route path="/program/:slug" element={<CampaignDetailPage />} />
                <Route path="/galeri" element={<GalleryPage />} />
              </Route>
              {/* Donation pages (no footer) */}
              <Route path="/donasi" element={<DonationPage />} />
              <Route path="/invoice/:id" element={<InvoicePage />} />
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/programs" element={<AdminPrograms />} />
                <Route path="/admin/programs/new" element={<AdminProgramForm />} />
                <Route path="/admin/programs/:id/edit" element={<AdminProgramForm />} />
                <Route path="/admin/packages" element={<AdminPackages />} />
                <Route path="/admin/banks" element={<AdminBanks />} />
                <Route path="/admin/donations" element={<AdminDonations />} />
                <Route path="/admin/updates" element={<AdminUpdates />} />
                <Route path="/admin/gallery" element={<AdminGallery />} />
                <Route path="/admin/testimonials" element={<AdminTestimonials />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
            </Routes>
          </ToastProvider>
        </AuthProvider>
      </DataProvider>
    </HashRouter>
  );
}
