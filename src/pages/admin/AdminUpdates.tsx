import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { formatDate } from '../../utils/helpers';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { Update } from '../../types';

export default function AdminUpdates() {
  const { updates, programs, saveUpdate, deleteUpdate } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Update | null>(null);
  const [programId, setProgramId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setProgramId(programs[0]?.id || ''); setTitle(''); setContent(''); setImageUrl(''); setPublished(true); setShowForm(true); };
  const openEdit = (u: Update) => { setEditing(u); setProgramId(u.programId); setTitle(u.title); setContent(u.content); setImageUrl(u.imageUrl || ''); setPublished(u.published); setShowForm(true); };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await saveUpdate({ id: editing?.id, programId, title, content, imageUrl, published });
      showToast(editing ? 'Kabar diperbarui' : 'Kabar ditambahkan', 'success');
      setShowForm(false);
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus kabar ini?')) return;
    try { await deleteUpdate(id); showToast('Kabar dihapus', 'success'); }
    catch { showToast('Gagal menghapus', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280]">{updates.length} kabar</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#1769E0] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1057BE]"><Plus className="w-4 h-4" /> Tambah Kabar</button>
      </div>

      <div className="space-y-3">
        {updates.map(u => (
          <div key={u.id} className="bg-white rounded-xl p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${u.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{u.published ? 'Published' : 'Draft'}</span>
                <span className="text-xs text-[#6B7280]">{formatDate(u.createdAt)}</span>
              </div>
              <h3 className="font-medium text-[#172033]">{u.title}</h3>
              <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">{u.content}</p>
              <p className="text-xs text-[#6B7280] mt-1">Program: {programs.find(p => p.id === u.programId)?.title || '-'}</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => openEdit(u)} className="p-2 text-[#6B7280] hover:text-[#1769E0] hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(u.id)} className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {updates.length === 0 && <div className="text-center py-12 text-[#6B7280] bg-white rounded-xl">Belum ada kabar terbaru.</div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#172033]">{editing ? 'Edit Kabar' : 'Tambah Kabar'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#6B7280]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Program</label>
                <select value={programId} onChange={e => setProgramId(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]">
                  {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-1">Judul</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Konten</label><textarea value={content} onChange={e => setContent(e.target.value)} rows={4} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0] resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1">URL Gambar</label><input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} id="updPub" className="w-4 h-4 rounded" /><label htmlFor="updPub" className="text-sm">Published</label></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border py-2.5 rounded-lg text-[#6B7280] hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-[#1769E0] text-white py-2.5 rounded-lg font-medium hover:bg-[#1057BE] disabled:opacity-50 flex items-center justify-center gap-2">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
