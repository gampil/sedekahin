import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { Loader2, Save } from 'lucide-react';

export default function AdminSettings() {
  const { settings, saveSettings } = useData();
  const { showToast } = useToast();
  const [siteName, setSiteName] = useState(settings.siteName);
  const [siteDescription, setSiteDescription] = useState(settings.siteDescription);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await saveSettings({ siteName, siteDescription, whatsapp, email, address });
      showToast('Pengaturan berhasil disimpan', 'success');
    } catch {
      showToast('Gagal menyimpan pengaturan', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <h2 className="text-lg font-semibold text-[#172033] border-b pb-4">Pengaturan Website</h2>
        
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Nama Website</label>
          <input type="text" value={siteName} onChange={e => setSiteName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Deskripsi Website</label>
          <textarea value={siteDescription} onChange={e => setSiteDescription(e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0] resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">WhatsApp</label>
          <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Alamat</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0] resize-none" />
        </div>

        <div className="pt-4 border-t">
          <button type="submit" disabled={saving} className="bg-[#1769E0] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1057BE] disabled:opacity-50 flex items-center gap-2">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4" /> Simpan Pengaturan</>}
          </button>
        </div>
      </form>

      {/* Firebase Info */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold text-[#172033] border-b pb-4 mb-4">Informasi Sistem</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Mode</span>
            <span className="font-medium text-[#172033]">Demo (Data Lokal)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Database</span>
            <span className="font-medium text-[#172033]">Firebase RTDB (Perlu Konfigurasi)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Apps Script</span>
            <span className="font-medium text-[#172033]">Belum dikonfigurasi</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Telegram Bot</span>
            <span className="font-medium text-[#172033]">Belum dikonfigurasi</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6B7280]">Payment Gateway</span>
            <span className="font-medium text-[#172033]">Belum dikonfigurasi</span>
          </div>
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Catatan:</strong> Website saat ini berjalan dalam mode demo dengan data lokal. 
            Untuk mengaktifkan fitur penuh (Firebase, Telegram, Payment Gateway, dll), 
            silakan konfigurasi environment variables sesuai panduan di README.
          </p>
        </div>
      </div>
    </div>
  );
}
