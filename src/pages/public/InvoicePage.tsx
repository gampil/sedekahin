import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { formatCurrency, formatDateTime } from '../../utils/helpers';
import { CheckCircle, Clock, XCircle, Copy, Upload, Loader2, ArrowLeft } from 'lucide-react';
import { useState, useRef } from 'react';

export default function InvoicePage() {
  const { id } = useParams();
  const { donations, banks, submitProof } = useData();
  const { showToast } = useToast();
  const donation = donations.find(d => d.id === id);
  const [uploading, setUploading] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!donation) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#172033] mb-4">Invoice Tidak Ditemukan</h1>
          <Link to="/" className="text-[#1769E0] hover:underline">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const bank = banks.find(b => b.id === donation.bankAccountId);
  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: 'Menunggu', color: 'text-yellow-600 bg-yellow-50', icon: Clock },
    awaiting_transfer: { label: 'Menunggu Transfer', color: 'text-blue-600 bg-blue-50', icon: Clock },
    awaiting_payment: { label: 'Menunggu Pembayaran', color: 'text-blue-600 bg-blue-50', icon: Clock },
    paid: { label: 'Lunas', color: 'text-green-600 bg-green-50', icon: CheckCircle },
    rejected: { label: 'Ditolak', color: 'text-red-600 bg-red-50', icon: XCircle },
    expired: { label: 'Kadaluarsa', color: 'text-gray-600 bg-gray-50', icon: XCircle },
    cancelled: { label: 'Dibatalkan', color: 'text-gray-600 bg-gray-50', icon: XCircle },
    failed: { label: 'Gagal', color: 'text-red-600 bg-red-50', icon: XCircle },
  };

  const statusInfo = statusConfig[donation.status] || statusConfig.pending;
  const StatusIcon = statusInfo.icon;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Berhasil disalin!', 'success');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Ukuran file maksimal 5MB', 'error');
        return;
      }
      setProofFile(file);
    }
  };

  const handleUploadProof = async () => {
    if (!proofFile) return;
    setUploading(true);
    try {
      // In production, this would upload to Apps Script -> ImgBB
      // For demo, we create a local URL
      const url = URL.createObjectURL(proofFile);
      await submitProof(donation.id, url);
      showToast('Bukti transfer berhasil dikirim!', 'success');
      setProofFile(null);
    } catch (err) {
      showToast('Gagal mengunggah bukti transfer', 'error');
    } finally {
      setUploading(false);
    }
  };

  const deadline = new Date(new Date(donation.createdAt).getTime() + 24 * 60 * 60 * 1000);

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-[#6B7280] hover:text-[#172033]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-bold text-[#0a1628]">Invoice Sedekah</h1>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
          <div className="text-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
              <StatusIcon className="w-4 h-4" />
              {statusInfo.label}
            </div>
            <div className="mt-4">
              <div className="text-sm text-[#6B7280]">Terima kasih atas sedekah Anda!</div>
              <div className="text-3xl font-bold text-[#172033] mt-2">{formatCurrency(donation.amount)}</div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">No. Invoice</span>
              <span className="font-medium text-[#172033]">{donation.invoice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Program</span>
              <span className="font-medium text-[#172033] text-right max-w-[200px] truncate">{donation.programTitle}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Donatur</span>
              <span className="font-medium text-[#172033]">{donation.anonymous ? 'Hamba Allah' : `${donation.salutation} ${donation.name}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Tanggal</span>
              <span className="font-medium text-[#172033]">{formatDateTime(donation.createdAt)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6B7280]">Metode</span>
              <span className="font-medium text-[#172033]">Transfer Bank</span>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        {bank && donation.status !== 'paid' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <h3 className="font-semibold text-[#172033] mb-4">Instruksi Pembayaran</h3>
            <div className="bg-[#F5F7FB] rounded-xl p-4 space-y-3">
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Bank</div>
                <div className="font-semibold text-[#172033]">{bank.bankName}</div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">No. Rekening</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#172033]">{bank.accountNumber}</span>
                  <button
                    onClick={() => copyToClipboard(bank.accountNumber)}
                    className="text-[#1769E0] hover:text-[#1057BE]"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Atas Nama</div>
                <div className="font-semibold text-[#172033]">{bank.accountName}</div>
              </div>
              <div>
                <div className="text-xs text-[#6B7280] mb-1">Nominal</div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1769E0] text-lg">{formatCurrency(donation.amount)}</span>
                  <button
                    onClick={() => copyToClipboard(donation.amount.toString())}
                    className="text-[#1769E0] hover:text-[#1057BE]"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-[#6B7280]">
              <p>{bank.instructions}</p>
              <p className="mt-2">Batas waktu: <strong>{formatDateTime(deadline.toISOString())}</strong></p>
            </div>
          </div>
        )}

        {/* Upload Proof */}
        {(donation.status === 'awaiting_transfer') && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
            <h3 className="font-semibold text-[#172033] mb-4">Upload Bukti Transfer</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              {proofFile ? (
                <div>
                  <div className="text-sm text-[#172033] font-medium mb-2">{proofFile.name}</div>
                  <div className="text-xs text-[#6B7280]">{(proofFile.size / 1024).toFixed(0)} KB</div>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 text-[#6B7280] mx-auto mb-2" />
                  <p className="text-sm text-[#6B7280]">Klik untuk pilih gambar bukti transfer</p>
                  <p className="text-xs text-[#6B7280] mt-1">Maks. 5MB</p>
                </div>
              )}
            </div>
            <button
              onClick={() => !proofFile ? fileInputRef.current?.click() : handleUploadProof()}
              disabled={uploading}
              className="mt-4 w-full bg-[#1769E0] text-white py-3 rounded-xl font-semibold disabled:opacity-50 hover:bg-[#1057BE] transition-colors flex items-center justify-center gap-2"
            >
              {uploading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Mengunggah...</>
              ) : proofFile ? 'Kirim Bukti Transfer' : 'Pilih File'}
            </button>
          </div>
        )}

        {/* Paid confirmation */}
        {donation.status === 'paid' && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-green-800 text-lg">Donasi Terverifikasi</h3>
            <p className="text-sm text-green-600 mt-2">Jazakallahu khairan. Sedekah Anda telah diterima.</p>
            {donation.paidAt && (
              <p className="text-xs text-green-500 mt-2">Diverifikasi: {formatDateTime(donation.paidAt)}</p>
            )}
          </div>
        )}

        {/* Proof submitted */}
        {donation.proofStatus === 'submitted' && donation.status !== 'paid' && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
            <Clock className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-blue-800 text-lg">Bukti Sedang Direview</h3>
            <p className="text-sm text-blue-600 mt-2">Bukti transfer Anda sedang diverifikasi oleh admin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
