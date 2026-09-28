import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { Plus, Edit, Trash2, X, Loader2 } from 'lucide-react';
import { Bank } from '../../types';

export default function AdminBanks() {
  const { banks, saveBank, deleteBank } = useData();
  const { showToast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Bank | null>(null);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [active, setActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const sorted = [...banks].sort((a, b) => a.sortOrder - b.sortOrder);

  const openNew = () => { setEditing(null); setBankName(''); setAccountNumber(''); setAccountName(''); setInstructions(''); setActive(true); setShowForm(true); };
  const openEdit = (bank: Bank) => { setEditing(bank); setBankName(bank.bankName); setAccountNumber(bank.accountNumber); setAccountName(bank.accountName); setInstructions(bank.instructions); setActive(bank.active); setShowForm(true); };

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await saveBank({ id: editing?.id, bankName, accountNumber, accountName, instructions, active, sortOrder: editing?.sortOrder || banks.length + 1 });
      showToast(editing ? 'Bank diperbarui' : 'Bank ditambahkan', 'success');
      setShowForm(false);
    } catch { showToast('Gagal menyimpan', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus rekening ini?')) return;
    try { await deleteBank(id); showToast('Bank dihapus', 'success'); }
    catch { showToast('Gagal menghapus', 'error'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280]">{banks.length} rekening</p>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-[#1769E0] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1057BE]"><Plus className="w-4 h-4" /> Tambah Rekening</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FB]">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Bank</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">No. Rekening</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase hidden md:table-cell">Atas Nama</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase hidden md:table-cell">Status</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sorted.map(bank => (
              <tr key={bank.id} className="hover:bg-[#F5F7FB]">
                <td className="px-5 py-3 text-sm font-medium text-[#172033]">{bank.bankName}</td>
                <td className="px-5 py-3 text-sm text-[#172033] font-mono">{bank.accountNumber}</td>
                <td className="px-5 py-3 text-sm text-[#6B7280] hidden md:table-cell">{bank.accountName}</td>
                <td className="px-5 py-3 hidden md:table-cell"><span className={`px-2 py-1 rounded-full text-xs font-medium ${bank.active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{bank.active ? 'Aktif' : 'Nonaktif'}</span></td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(bank)} className="p-2 text-[#6B7280] hover:text-[#1769E0] hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(bank.id)} className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
              <h3 className="font-semibold text-[#172033]">{editing ? 'Edit Rekening' : 'Tambah Rekening'}</h3>
              <button onClick={() => setShowForm(false)} className="text-[#6B7280]"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Nama Bank</label><input type="text" value={bankName} onChange={e => setBankName(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">No. Rekening</label><input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Atas Nama</label><input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0]" /></div>
              <div><label className="block text-sm font-medium mb-1">Instruksi</label><textarea value={instructions} onChange={e => setInstructions(e.target.value)} rows={2} className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-[#1769E0] resize-none" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} id="bankActive" className="w-4 h-4 rounded" /><label htmlFor="bankActive" className="text-sm">Aktif</label></div>
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
