import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { Search, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function StatusPage() {
  const { donations } = useData();
  const [invoice, setInvoice] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = () => {
    setError('');
    setResult(null);
    
    if (!invoice.trim()) {
      setError('Silakan masukkan nomor invoice');
      return;
    }

    const donation = donations.find(d => d.invoice === invoice.trim());
    
    if (!donation) {
      setError('Invoice tidak ditemukan. Pastikan nomor invoice benar.');
      return;
    }

    setResult(donation);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'awaiting_transfer':
      case 'awaiting_payment':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'rejected':
      case 'failed':
      case 'expired':
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      paid: 'Lunas',
      awaiting_transfer: 'Menunggu Transfer',
      awaiting_payment: 'Menunggu Pembayaran',
      rejected: 'Ditolak',
      failed: 'Gagal',
      expired: 'Kedaluwarsa',
      cancelled: 'Dibatalkan'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'awaiting_transfer':
      case 'awaiting_payment':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'rejected':
      case 'failed':
      case 'expired':
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="section">
      <div className="container-shell">
        <div className="max-w-2xl mx-auto">
          <div className="section-head text-center">
            <div className="section-copy mx-auto">
              <p className="kicker">Cek Status Donasi</p>
              <h1 className="section-title">Pantau Status Sedekah Anda</h1>
              <p className="section-description">
                Masukkan nomor invoice untuk melihat status donasi Anda
              </p>
            </div>
          </div>

          <div className="surface p-6 mt-8">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  placeholder="Masukkan nomor invoice (contoh: INV-20240101-001)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#0284c7]"
                  onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                />
              </div>
              <button
                onClick={handleCheck}
                className="btn btn-primary px-6"
              >
                Cek
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 p-6 bg-[#f8fafc] rounded-lg border border-gray-200">
                <div className="flex items-start gap-4 mb-4">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-[#0a1628] text-lg">
                        {getStatusLabel(result.status)}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(result.status)}`}>
                        {getStatusLabel(result.status)}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280]">Invoice: {result.invoice}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-[#6B7280]">Program</span>
                    <span className="font-medium text-[#0a1628]">{result.programTitle}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-[#6B7280]">Nominal</span>
                    <span className="font-bold text-[#0284c7]">{formatCurrency(result.amount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-[#6B7280]">Donatur</span>
                    <span className="font-medium text-[#0a1628]">
                      {result.anonymous ? 'Hamba Allah' : `${result.salutation} ${result.name}`}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-[#6B7280]">Tanggal</span>
                    <span className="font-medium text-[#0a1628]">{formatDateTime(result.createdAt)}</span>
                  </div>
                  {result.paidAt && (
                    <div className="flex justify-between py-2">
                      <span className="text-[#6B7280]">Dibayar pada</span>
                      <span className="font-medium text-green-600">{formatDateTime(result.paidAt)}</span>
                    </div>
                  )}
                </div>

                {result.status === 'paid' && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✓ Sedekah Anda telah diterima dan akan segera disalurkan. Jazakallahu khairan atas kebaikan Anda.
                    </p>
                  </div>
                )}

                {(result.status === 'awaiting_transfer' || result.status === 'awaiting_payment') && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      ⏳ Donasi Anda sedang menunggu pembayaran. Silakan selesaikan pembayaran untuk memproses sedekah Anda.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-8 surface p-6">
            <h2 className="text-lg font-bold text-[#0a1628] mb-3">Cara Cek Status Donasi</h2>
            <ol className="text-sm text-[#6B7280] space-y-2 list-decimal list-inside">
              <li>Simpan nomor invoice yang Anda terima setelah melakukan donasi</li>
              <li>Masukkan nomor invoice pada kolom di atas</li>
              <li>Klik tombol "Cek" atau tekan Enter</li>
              <li>Status donasi Anda akan ditampilkan</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
