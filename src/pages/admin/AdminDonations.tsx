import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { Check, X, Eye, Loader2, Search } from 'lucide-react';

export default function AdminDonations() {
  const { donations, updateDonationStatus } = useData();
  const { showToast } = useToast();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const [viewProof, setViewProof] = useState<string | null>(null);

  const filtered = donations.filter(d => {
    if (filter === 'pending') return d.status === 'awaiting_transfer' || d.status === 'awaiting_payment';
    if (filter === 'proof') return d.proofStatus === 'submitted';
    if (filter === 'paid') return d.status === 'paid';
    if (filter === 'rejected') return d.status === 'rejected';
    return true;
  }).filter(d => {
    if (!search) return true;
    const s = search.toLowerCase();
    return d.name.toLowerCase().includes(s) || d.invoice.toLowerCase().includes(s) || d.phone.includes(s);
  });

  const handleApprove = async (id: string) => {
    setProcessing(id);
    try {
      await updateDonationStatus(id, 'paid', new Date().toISOString());
      showToast('Donasi disetujui', 'success');
    } catch { showToast('Gagal menyetujui', 'error'); }
    finally { setProcessing(null); }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Tolak donasi ini?')) return;
    setProcessing(id);
    try {
      await updateDonationStatus(id, 'rejected');
      showToast('Donasi ditolak', 'success');
    } catch { showToast('Gagal menolak', 'error'); }
    finally { setProcessing(null); }
  };

  const statusLabel = (d: any) => {
    if (d.status === 'paid') return 'Lunas';
    if (d.status === 'rejected') return 'Ditolak';
    if (d.proofStatus === 'submitted') return 'Bukti Masuk';
    if (d.status === 'awaiting_transfer') return 'Menunggu Transfer';
    return d.status;
  };

  const statusColor = (d: any) => {
    if (d.status === 'paid') return 'bg-green-50 text-green-700';
    if (d.status === 'rejected') return 'bg-red-50 text-red-700';
    if (d.proofStatus === 'submitted') return 'bg-yellow-50 text-yellow-700';
    return 'bg-gray-50 text-gray-700';
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama, invoice, atau HP..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[['all', 'Semua'], ['pending', 'Pending'], ['proof', 'Bukti Masuk'], ['paid', 'Lunas'], ['rejected', 'Ditolak']].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} className={`px-3 py-2 rounded-lg text-sm font-medium ${filter === val ? 'bg-[#1769E0] text-white' : 'bg-white text-[#6B7280] border hover:bg-gray-50'}`}>{label}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F7FB]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase">Invoice</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase">Donatur</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase hidden lg:table-cell">Program</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase">Nominal</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase hidden md:table-cell">Tanggal</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#6B7280] uppercase">Status</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-[#6B7280] uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map(d => (
                <tr key={d.id} className="hover:bg-[#F5F7FB]">
                  <td className="px-4 py-3 text-sm font-mono text-[#172033]">{d.invoice}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-[#172033]">{d.anonymous ? 'Orang Baik' : d.name}</div>
                    <div className="text-xs text-[#6B7280]">{d.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6B7280] max-w-[120px] truncate hidden lg:table-cell">{d.programTitle}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#172033]">{formatCurrency(d.amount)}</td>
                  <td className="px-4 py-3 text-sm text-[#6B7280] hidden md:table-cell">{formatDateTime(d.createdAt)}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(d)}`}>{statusLabel(d)}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {d.proofUrl && (
                        <button onClick={() => setViewProof(d.proofUrl!)} className="p-1.5 text-[#6B7280] hover:text-[#1769E0] hover:bg-blue-50 rounded" title="Lihat Bukti"><Eye className="w-4 h-4" /></button>
                      )}
                      {(d.proofStatus === 'submitted' || d.status === 'awaiting_transfer') && d.status !== 'paid' && d.status !== 'rejected' && (
                        <>
                          <button onClick={() => handleApprove(d.id)} disabled={processing === d.id} className="p-1.5 text-green-600 hover:bg-green-50 rounded disabled:opacity-50" title="Approve"><Check className="w-4 h-4" /></button>
                          <button onClick={() => handleReject(d.id)} disabled={processing === d.id} className="p-1.5 text-red-600 hover:bg-red-50 rounded disabled:opacity-50" title="Reject"><X className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-[#6B7280]">Tidak ada donasi ditemukan.</div>}
      </div>

      {/* Proof Modal */}
      {viewProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setViewProof(null)}>
          <div className="bg-white rounded-xl p-4 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold mb-3">Bukti Transfer</h3>
            <img src={viewProof} alt="Bukti" className="w-full rounded-lg" />
            <button onClick={() => setViewProof(null)} className="mt-3 w-full border py-2 rounded-lg text-[#6B7280] hover:bg-gray-50">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
