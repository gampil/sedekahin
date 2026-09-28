import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { formatCurrency } from '../../utils/helpers';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { Package } from '../../types';

export default function AdminPackages() {
  const { packages, savePackage, deletePackage } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Package | null>(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const sorted = [...packages].sort((a, b) => a.sortOrder - b.sortOrder);

  const openNew = () => {
    setEditing(null); setName(''); setAmount(''); setDescription(''); setActive(true); setShowForm(true);
  };
  const openEdit = (pkg: Package) => {
    setEditing(pkg); setName(pkg.name); setAmount(pkg.amount.toString()); setDescription(pkg.description); setActive(pkg.active); setShowForm(true);
  };
  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await savePackage({ id: editing?.id, name, amount: parseInt(amount) || 0, description, active, sortOrder: editing?.sortOrder || packages.length + 1 });
      showToast(editing ? 'Paket diperbarui' : 'Paket ditambahkan', 'success');
      setShowForm(false);
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };
  const handleDelete = async (id: string) => {
    if (!confirm('Hapus paket ini?')) return;
    setDeleting(id);
    try { await deletePackage(id); showToast('Paket dihapus', 'success'); }
    catch { showToast('Gagal menghapus', 'error'); }
    finally { setDeleting(null); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280]">{packages.length} paket</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#1769E0] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1057BE]">
          <Plus className="w-4 h-4" /> Tambah Paket
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FB]">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Nama</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Nominal</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase hidden md:table-cell">Status</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sorted.map(pkg => (
              <tr key={pkg.id} className="hover:bg-[#F5F7FB]">
                <td className="px-5 py-3">
                  <div className="font-medium text-sm text-[#172033]">{pkg.name}</div>
                  <div className="text-xs text-[#6B7280]">{pkg.description}</div>
                </td>
                <td className="px-5 py-3 text-sm font-medium text-[#172033]">{formatCurrency(pkg.amount)}</td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${pkg.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{pkg.active ? 'Aktif' : 'Nonaktif'}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(pkg)} className="p-2 text-[#6B7280] hover:text-[#1769E0] hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(pkg.id)} disabled={deleting === pkg.id} className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#172033]">{editing ? 'Edit Paket' : 'Tambah Paket'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#6B7280] hover:text-[#172033]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Nama</label><input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Nominal</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Deskripsi</label><input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} id="pkgActive" className="w-4 h-4 rounded" /><label htmlFor="pkgActive" className="text-sm">Aktif</label></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 border py-2.5 rounded-lg text-[#6B7280] hover:bg-gray-50">Batal</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 bg-[#1769E0] text-white py-2.5 rounded-lg font-medium hover:bg-[#1057BE] disabled:opacity-50 flex items-center justify-center gap-2">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
