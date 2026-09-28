import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { formatCurrency } from '../../utils/helpers';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminPrograms() {
  const { programs, deleteProgram } = useData();
  const { showToast } = useToast();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus campaign "${title}"?`)) return;
    setDeleting(id);
    try {
      await deleteProgram(id);
      showToast('Campaign berhasil dihapus', 'success');
    } catch {
      showToast('Gagal menghapus campaign', 'error');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-[#6B7280]">{programs.length} campaign</p>
        <Link to="/admin/programs/new" className="inline-flex items-center gap-2 bg-[#1769E0] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1057BE]">
          <Plus className="w-4 h-4" /> Tambah Campaign
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F7FB]">
            <tr>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Campaign</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase hidden md:table-cell">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase hidden md:table-cell">Terkumpul</th>
              <th className="text-right px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {programs.map(p => (
              <tr key={p.id} className="hover:bg-[#F5F7FB]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <div className="font-medium text-sm text-[#172033]">{p.title}</div>
                      <div className="text-xs text-[#6B7280]">/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 hidden md:table-cell">
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    p.status === 'active' ? 'bg-green-50 text-green-700' :
                    p.status === 'archived' ? 'bg-gray-100 text-gray-600' :
                    'bg-yellow-50 text-yellow-700'
                  }`}>{p.status}</span>
                </td>
                <td className="px-5 py-3 text-sm text-[#172033] hidden md:table-cell">{formatCurrency(p.collectedAmount)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/admin/programs/${p.id}/edit`} className="p-2 text-[#6B7280] hover:text-[#1769E0] hover:bg-blue-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      disabled={deleting === p.id}
                      className="p-2 text-[#6B7280] hover:text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {programs.length === 0 && (
          <div className="text-center py-12 text-[#6B7280]">Belum ada campaign.</div>
        )}
      </div>
    </div>
  );
}
