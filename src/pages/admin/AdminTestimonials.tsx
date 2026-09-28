import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { Testimonial } from '../../types';

export default function AdminTestimonials() {
  const { testimonials, saveTestimonial, deleteTestimonial } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const openNew = () => { setEditing(null); setName(''); setContent(''); setActive(true); setShowForm(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setName(t.name); setContent(t.content); setActive(t.active); setShowForm(true); };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await saveTestimonial({ id: editing?.id, name, content, active, date: editing?.date || new Date().toISOString().slice(0, 10) });
      showToast(editing ? 'Testimoni diperbarui' : 'Testimoni ditambahkan', 'success');
      setShowForm(false);
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return;
    try { await deleteTestimonial(id); showToast('Testimoni dihapus', 'success'); }
    catch { showToast('Gagal menghapus', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280]">{testimonials.length} testimoni</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#1769E0] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1057BE]"><Plus className="w-4 h-4" /> Tambah Testimoni</button>
      </div>

      <div className="space-y-3">
        {testimonials.map(t => (
          <div key={t.id} className="bg-white rounded-xl p-5 shadow-sm flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${t.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{t.active ? 'Aktif' : 'Nonaktif'}</span>
              </div>
              <h3 className="font-medium text-[#172033]">{t.name}</h3>
              <p className="text-sm text-[#6B7280] mt-1">"{t.content}"</p>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => openEdit(t)} className="p-2 text-[#6B7280] hover:text-[#1769E0] hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(t.id)} className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && <div className="text-center py-12 text-[#6B7280] bg-white rounded-xl">Belum ada testimoni.</div>}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#172033]">{editing ? 'Edit Testimoni' : 'Tambah Testimoni'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#6B7280]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Nama</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Isi Testimoni</label><textarea value={content} onChange={e => setContent(e.target.value)} rows={3} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0] resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} id="testActive" className="w-4 h-4 rounded" /><label htmlFor="testActive" className="text-sm">Tampilkan</label></div>
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
