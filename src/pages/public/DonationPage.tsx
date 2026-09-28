import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { formatCurrency, generateUUID, generateInvoice, validateEmail } from '../../utils/helpers';
import { Heart, ArrowLeft, Loader2 } from 'lucide-react';

export default function DonationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { programs, packages, banks, createDonation } = useData();
  const { showToast } = useToast();
  const programId = searchParams.get('program') || '';
  const program = programs.find(p => p.id === programId);

  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [selectedBank, setSelectedBank] = useState('');
  const [salutation, setSalutation] = useState('Bapak');
  const [name, setName] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [prayer, setPrayer] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!program && programs.length > 0) {
      navigate('/program');
    }
  }, [program, programs, navigate]);

  const activePackages = packages.filter(p => p.active).sort((a, b) => a.sortOrder - b.sortOrder);
  const activeBanks = banks.filter(b => b.active).sort((a, b) => a.sortOrder - b.sortOrder);

  const selectPackage = (pkgId: string, amt: number) => {
    setSelectedPackage(pkgId);
    setCustomAmount('');
    setAmount(amt);
  };

  const handleCustomAmount = (val: string) => {
    const num = parseInt(val.replace(/[^0-9]/g, '')) || 0;
    setCustomAmount(val);
    setAmount(num);
    setSelectedPackage('');
  };

  const canProceedStep1 = amount >= 10000;
  const canProceedStep2 = paymentMethod === 'bank' ? !!selectedBank : true;
  const canProceedStep3 = name.length >= 2 && phone.length >= 8 && agreed;

  const handleSubmit = async () => {
    if (submitting) return;
    if (!canProceedStep3) return;
    setSubmitting(true);
    try {
      const donation = await createDonation({
        invoice: generateInvoice(),
        idempotencyKey: generateUUID(),
        programId: program!.id,
        programTitle: program!.title,
        packageId: selectedPackage || undefined,
        packageName: selectedPackage ? activePackages.find(p => p.id === selectedPackage)?.name : undefined,
        amount,
        salutation,
        name,
        anonymous,
        phone,
        email: email || undefined,
        prayer: prayer || undefined,
        paymentMethod,
        bankAccountId: paymentMethod === 'bank' ? selectedBank : undefined,
      });
      showToast('Donasi berhasil dibuat!', 'success');
      navigate(`/invoice/${donation.id}`);
    } catch (err) {
      showToast('Gagal membuat donasi. Silakan coba lagi.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!program) return null;

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link to={`/program/${program.slug}`} className="text-[#6B7280] hover:text-[#172033]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-semibold text-[#172033] truncate">Sedekah: {program.title}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        {/* Step 1: Amount */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-[#172033] mb-4">Pilih Nominal Sedekah</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {activePackages.map(pkg => (
                <button
                  key={pkg.id}
                  onClick={() => selectPackage(pkg.id, pkg.amount)}
                  className={`p-4 rounded-xl border-2 text-left transition-colors ${
                    selectedPackage === pkg.id ? 'border-[#1769E0] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-[#172033]">{formatCurrency(pkg.amount)}</div>
                  <div className="text-xs text-[#6B7280] mt-1">{pkg.name}</div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <label className="text-sm font-medium text-[#6B7280] mb-2 block">Nominal Lainnya</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">Rp</span>
                <input
                  type="text"
                  value={customAmount}
                  onChange={e => handleCustomAmount(e.target.value)}
                  placeholder="Masukkan nominal"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-[#172033] focus:outline-none focus:border-[#1769E0]"
                />
              </div>
            </div>
            {amount > 0 && (
              <div className="mt-4 bg-[#1769E0]/5 rounded-xl p-4 text-center">
                <div className="text-sm text-[#6B7280]">Total Sedekah</div>
                <div className="text-2xl font-bold text-[#1769E0]">{formatCurrency(amount)}</div>
              </div>
            )}
            <button
              onClick={() => setStep(2)}
              disabled={!canProceedStep1}
              className="mt-6 w-full bg-[#1769E0] text-white py-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1057BE] transition-colors"
            >
              Lanjutkan
            </button>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-[#172033] mb-4">Metode Pembayaran</h2>
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setPaymentMethod('bank')}
                className={`w-full p-4 rounded-xl border-2 text-left flex items-center gap-4 ${
                  paymentMethod === 'bank' ? 'border-[#1769E0] bg-blue-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="w-10 h-10 bg-[#1769E0]/10 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-[#1769E0]" />
                </div>
                <div>
                  <div className="font-medium text-[#172033]">Transfer Bank</div>
                  <div className="text-xs text-[#6B7280]">Transfer manual ke rekening</div>
                </div>
              </button>
            </div>

            {paymentMethod === 'bank' && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-[#6B7280]">Pilih Rekening</label>
                {activeBanks.map(bank => (
                  <button
                    key={bank.id}
                    onClick={() => setSelectedBank(bank.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left ${
                      selectedBank === bank.id ? 'border-[#1769E0] bg-blue-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="font-medium text-[#172033]">{bank.bankName}</div>
                    <div className="text-sm text-[#6B7280]">{bank.accountNumber} - {bank.accountName}</div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 py-4 rounded-xl font-medium text-[#6B7280] hover:bg-gray-50">
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex-1 bg-[#1769E0] text-white py-4 rounded-xl font-semibold disabled:opacity-50 hover:bg-[#1057BE] transition-colors"
              >
                Lanjutkan
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Donor Info */}
        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-[#172033] mb-4">Data Donatur</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#172033] mb-1.5 block">Sapaan</label>
                <div className="flex gap-2">
                  {['Bapak', 'Ibu', 'Kak'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSalutation(s)}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium border ${
                        salutation === s ? 'border-[#1769E0] bg-blue-50 text-[#1769E0]' : 'border-gray-200 text-[#6B7280]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-[#172033] mb-1.5 block">Nama Lengkap *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={anonymous}
                  onChange={e => setAnonymous(e.target.checked)}
                  className="w-4 h-4 text-[#1769E0] rounded border-gray-300"
                />
                <label htmlFor="anonymous" className="text-sm text-[#6B7280]">Sembunyikan nama saya (Orang Baik)</label>
              </div>
              <div>
                <label className="text-sm font-medium text-[#172033] mb-1.5 block">WhatsApp *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#172033] mb-1.5 block">Email (opsional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#172033] mb-1.5 block">Doa / Pesan (opsional)</label>
                <textarea
                  value={prayer}
                  onChange={e => setPrayer(e.target.value)}
                  placeholder="Tuliskan doa atau pesan Anda"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0] resize-none"
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agreed"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="w-4 h-4 text-[#1769E0] rounded border-gray-300 mt-0.5"
                />
                <label htmlFor="agreed" className="text-sm text-[#6B7280]">
                  Saya menyetujui syarat dan ketentuan yang berlaku. Donasi yang telah diberikan tidak dapat ditarik kembali.
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-200 py-4 rounded-xl font-medium text-[#6B7280] hover:bg-gray-50">
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                disabled={!canProceedStep3 || submitting}
                className="flex-1 bg-[#1769E0] text-white py-4 rounded-xl font-semibold disabled:opacity-50 hover:bg-[#1057BE] transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Memproses Sedekah...</>
                ) : 'Sedekah Sekarang'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      {amount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="max-w-2xl mx-auto flex items-center justify-between">
            <div>
              <div className="text-xs text-[#6B7280]">Total Sedekah</div>
              <div className="text-lg font-bold text-[#1769E0]">{formatCurrency(amount)}</div>
            </div>
            <div className="text-sm text-[#6B7280]">
              Step {step}/3
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
