import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { Plus, Trash2, X, Loader2 } from 'lucide-react';
import { GalleryItem } from '../../types';

export default function AdminGallery() {
  const { gallery, saveGalleryItem, deleteGalleryItem } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving || !imageUrl) return;
    setSaving(true);
    try {
      await saveGalleryItem({ imageUrl, caption, date });
      showToast('Foto ditambahkan', 'success');
      setShowForm(false); setImageUrl(''); setCaption('');
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus foto ini?')) return;
    try { await deleteGalleryItem(id); showToast('Foto dihapus', 'success'); }
    catch { showToast('Gagal menghapus', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280]">{gallery.length} foto</p>
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 bg-[#1769E0] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1057BE]"><Plus className="w-4 h-4" /> Tambah Foto</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <button onClick={() => handleDelete(item.id)} className="opacity-0 group-hover:opacity-100 p-2 bg-white rounded-full text-red-600 hover:bg-red-50 transition-opacity"><Trash2 className="w-4 h-4" /></button>
            </div>
            {item.caption && <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2"><p className="text-white text-xs truncate">{item.caption}</p></div>}
          </div>
        ))}
      </div>
      {gallery.length === 0 && <div className="text-center py-12 text-[#6B7280] bg-white rounded-xl">Belum ada foto.</div>}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#172033]">Tambah Foto</h3>
              <button onClick={() => setShowForm(false)} className="text-[#6B7280]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">URL Gambar *</label><input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              {imageUrl && <img src={imageUrl} alt="Preview" className="w-full h-40 object-cover rounded-lg" />}
              <div><label className="block text-sm font-medium mb-1">Caption</label><input type="text" value={caption} onChange={e => setCaption(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Tanggal</label><input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border py-2.5 rounded-lg text-[#6B7280] hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving || !imageUrl} className="flex-1 bg-[#1769E0] text-white py-2.5 rounded-lg font-medium hover:bg-[#1057BE] disabled:opacity-50 flex items-center justify-center gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
