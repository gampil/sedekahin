import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, formatDate, formatRelativeTime, calculateProgress, getRemainingDays, sanitizeHtml } from '../../utils/helpers';
import { Heart, Shield, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

export default function CampaignDetailPage() {
  const { slug } = useParams();
  const { getProgramBySlug, getDonationsByProgram, getUpdatesByProgram, incrementAamiin } = useData();
  const program = getProgramBySlug(slug || '');
  const [activeTab, setActiveTab] = useState<'description' | 'updates' | 'donors'>('description');
  const [aamiinCooldown, setAamiinCooldown] = useState<Record<string, boolean>>({});

  if (!program) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#0a1628] mb-4">Program Tidak Ditemukan</h1>
        <Link to="/program" className="text-[#1769E0] hover:underline">Kembali ke Program</Link>
      </div>
    );
  }

  const donations = getDonationsByProgram(program.id);
  const updates = getUpdatesByProgram(program.id);
  const progress = calculateProgress(program.collectedAmount, program.targetAmount);
  const remainingDays = getRemainingDays(program.endDate);

  const handleAamiin = async (donationId: string) => {
    if (aamiinCooldown[donationId]) return;
    const lastClick = localStorage.getItem(`aamiin_${donationId}`);
    if (lastClick && Date.now() - parseInt(lastClick) < 60000) return;
    
    setAamiinCooldown(prev => ({ ...prev, [donationId]: true }));
    localStorage.setItem(`aamiin_${donationId}`, Date.now().toString());
    await incrementAamiin(donationId);
    setTimeout(() => setAamiinCooldown(prev => ({ ...prev, [donationId]: false })), 1000);
  };

  return (
    <div>
      {/* Cover */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img src={program.coverImage || program.thumbnail} alt={program.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 mb-3">
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Sedekah Subuh Baitullah</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-2">{program.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl p-1 mb-6 border shadow-sm">
              <button
                onClick={() => setActiveTab('description')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'description' ? 'bg-[#1769E0] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#0a1628]'}`}
              >
                Keterangan
              </button>
              <button
                onClick={() => setActiveTab('updates')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'updates' ? 'bg-[#1769E0] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#0a1628]'}`}
              >
                Kabar Terbaru
              </button>
              <button
                onClick={() => setActiveTab('donors')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors ${activeTab === 'donors' ? 'bg-[#1769E0] text-white shadow-sm' : 'text-[#6B7280] hover:text-[#0a1628]'}`}
              >
                Donatur
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
              <div className="bg-white rounded-xl p-6 md:p-8 prose prose-sm max-w-none border shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(program.content) }} />
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="space-y-4">
                {updates.length > 0 ? updates.map(update => (
                  <div key={update.id} className="bg-white rounded-xl p-6 border shadow-sm">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(update.createdAt)}
                    </div>
                    <h3 className="font-bold text-[#0a1628] mb-2">{update.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{update.content}</p>
                    {update.imageUrl && (
                      <img src={update.imageUrl} alt={update.title} className="mt-4 rounded-lg w-full max-h-64 object-cover" loading="lazy" />
                    )}
                  </div>
                )) : (
                  <div className="bg-white rounded-xl p-8 text-center text-[#6B7280] border shadow-sm">Belum ada kabar terbaru.</div>
                )}
              </div>
            )}

            {activeTab === 'donors' && (
              <div className="space-y-3">
                {donations.length > 0 ? donations.slice(0, 20).map(donation => (
                  <div key={donation.id} className="bg-white rounded-xl p-4 flex items-start gap-4 border shadow-sm">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#1769E0] to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-[#0a1628]">
                          {donation.anonymous ? 'Hamba Allah' : `${donation.salutation} ${donation.name}`}
                        </span>
                        <span className="text-sm font-bold text-[#1769E0] whitespace-nowrap">{formatCurrency(donation.amount)}</span>
                      </div>
                      <div className="text-xs text-[#6B7280] mt-0.5">{formatRelativeTime(donation.createdAt)}</div>
                      {donation.prayer && (
                        <div className="mt-2 text-sm text-[#374151] italic">"{donation.prayer}"</div>
                      )}
                      {donation.prayer && (
                        <button
                          onClick={() => handleAamiin(donation.id)}
                          disabled={aamiinCooldown[donation.id]}
                          className="mt-2 inline-flex items-center gap-1 text-xs text-[#1769E0] hover:text-[#1057BE] disabled:opacity-50 font-medium"
                        >
                          <Heart className="w-3 h-3" /> Aamiin ({donation.aamiinCount})
                        </button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="bg-white rounded-xl p-8 text-center text-[#6B7280] border shadow-sm">Belum ada donatur.</div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 sticky top-24 border shadow-sm">
              {/* Progress */}
              <div className="mb-6">
                <div className="text-3xl font-extrabold text-[#1769E0] mb-1">{formatCurrency(program.collectedAmount)}</div>
                <div className="text-sm text-[#6B7280] mb-3">terkumpul dari {formatCurrency(program.targetAmount)}</div>
                <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-[#1769E0] to-emerald-500 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="text-sm font-bold text-[#1769E0]">{progress}% tercapai</div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="text-center p-3 bg-[#fafafa] rounded-xl border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-[#1769E0]" />
                    <span className="text-lg font-extrabold text-[#0a1628]">{program.donorCount}</span>
                  </div>
                  <div className="text-xs text-[#6B7280]">Sahabat baik</div>
                </div>
                <div className="text-center p-3 bg-[#fafafa] rounded-xl border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span className="text-lg font-extrabold text-[#0a1628]">
                      {remainingDays > 0 ? remainingDays : '∞'}
                    </span>
                  </div>
                  <div className="text-xs text-[#6B7280]">Hari lagi</div>
                </div>
              </div>

              {/* CTA */}
              <Link
                to={`/donasi?program=${program.id}`}
                className="block w-full bg-[#1769E0] text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-[#1057BE] transition-colors shadow-sm"
              >
                SEDEKAH SEKARANG
              </Link>

              {/* Share */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: program.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="mt-3 w-full border border-gray-200 text-[#6B7280] py-3 rounded-xl text-sm font-medium hover:bg-[#fafafa] transition-colors"
              >
                Bagikan program
              </button>

              {/* Trust */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>100% transparan & amanah</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
