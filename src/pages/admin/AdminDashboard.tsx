import { useData } from '../../contexts/DataProvider';
import { formatCurrency } from '../../utils/helpers';
import { Heart, FolderOpen, Clock, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { programs, donations } = useData();
  
  const totalDonations = donations.filter(d => d.status === 'paid').reduce((sum, d) => sum + d.amount, 0);
  const todayDonations = donations.filter(d => {
    const today = new Date().toDateString();
    return new Date(d.createdAt).toDateString() === today && d.status === 'paid';
  }).reduce((sum, d) => sum + d.amount, 0);
  const pendingDonations = donations.filter(d => d.status === 'awaiting_transfer' || d.proofStatus === 'submitted').length;
  const activePrograms = programs.filter(p => p.status === 'active').length;

  const stats = [
    { label: 'Total Donasi', value: formatCurrency(totalDonations), icon: Heart, color: 'bg-green-50 text-green-600' },
    { label: 'Donasi Hari Ini', value: formatCurrency(todayDonations), icon: Heart, color: 'bg-blue-50 text-blue-600' },
    { label: 'Menunggu Review', value: pendingDonations.toString(), icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Campaign Aktif', value: activePrograms.toString(), icon: FolderOpen, color: 'bg-purple-50 text-purple-600' },
  ];

  const recentDonations = donations.slice(0, 10);

  return (
    <div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-[#6B7280]">{stat.label}</div>
                  <div className="text-xl font-bold text-[#172033]">{stat.value}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Donations */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-5 border-b">
          <h2 className="font-semibold text-[#172033]">Donasi Terbaru</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F5F7FB]">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Invoice</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Donatur</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Program</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Nominal</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-[#6B7280] uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentDonations.map(d => (
                <tr key={d.id} className="hover:bg-[#F5F7FB]">
                  <td className="px-5 py-3 text-sm font-mono text-[#172033]">{d.invoice}</td>
                  <td className="px-5 py-3 text-sm text-[#172033]">{d.anonymous ? 'Orang Baik' : d.name}</td>
                  <td className="px-5 py-3 text-sm text-[#6B7280] max-w-[150px] truncate">{d.programTitle}</td>
                  <td className="px-5 py-3 text-sm font-medium text-[#172033]">{formatCurrency(d.amount)}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      d.status === 'paid' ? 'bg-green-50 text-green-700' :
                      d.status === 'rejected' ? 'bg-red-50 text-red-700' :
                      d.proofStatus === 'submitted' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {d.status === 'paid' ? 'Lunas' : d.status === 'awaiting_transfer' ? 'Menunggu Transfer' : d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
