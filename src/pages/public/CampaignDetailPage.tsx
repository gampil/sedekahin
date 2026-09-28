import { useParams, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, formatRelativeTime, sanitizeHtml } from '../../utils/helpers';
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
        <Link to="/program" className="text-[#0284c7] hover:underline">Kembali ke Program</Link>
      </div>
    );
  }

  const donations = getDonationsByProgram(program.id);
  const updates = getUpdatesByProgram(program.id);

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
    <div className="campaign-detail">
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
            <div className="detail-tabs">
              <button
                onClick={() => setActiveTab('description')}
                className={`detail-tab ${activeTab === 'description' ? 'active' : ''}`}
              >
                Keterangan
              </button>
              <button
                onClick={() => setActiveTab('updates')}
                className={`detail-tab ${activeTab === 'updates' ? 'active' : ''}`}
              >
                Kabar Terbaru
              </button>
              <button
                onClick={() => setActiveTab('donors')}
                className={`detail-tab ${activeTab === 'donors' ? 'active' : ''}`}
              >
                Donatur
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'description' && (
              <div className="detail-tab-panel surface">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: sanitizeHtml(program.content) }} />
              </div>
            )}

            {activeTab === 'updates' && (
              <div className="detail-tab-panel">
                {updates.length > 0 ? (
                  <div className="space-y-4">
                    {updates.map(update => (
                      <div key={update.id} className="surface p-6">
                        <div className="flex items-center gap-2 text-xs text-[#6B7280] mb-2">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(update.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <h3 className="font-bold text-[#0a1628] mb-2">{update.title}</h3>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{update.content}</p>
                        {update.imageUrl && (
                          <img src={update.imageUrl} alt={update.title} className="mt-4 rounded-lg w-full max-h-64 object-cover" loading="lazy" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#6B7280]">Belum ada kabar terbaru.</div>
                )}
              </div>
            )}

            {activeTab === 'donors' && (
              <div className="detail-tab-panel">
                {donations.length > 0 ? (
                  <div className="space-y-3">
                    {donations.slice(0, 20).map(donation => (
                      <div key={donation.id} className="donor-card">
                        <div className="donor-head">
                          <div className="donor-avatar">
                            {donation.anonymous ? 'H' : donation.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="donor-identity">
                            <strong>{donation.anonymous ? 'Hamba Allah' : `${donation.salutation} ${donation.name}`}</strong>
                            <small>{formatRelativeTime(donation.createdAt)}</small>
                          </div>
                          <div className="donor-amount">{formatCurrency(donation.amount)}</div>
                        </div>
                        {donation.prayer && (
                          <>
                            <div className="donor-prayer">"{donation.prayer}"</div>
                            <button
                              onClick={() => handleAamiin(donation.id)}
                              disabled={aamiinCooldown[donation.id]}
                              className="aamiin-button"
                            >
                              <Heart className="w-4 h-4" />
                              Aamiin
                              <span className="aamiin-count">{donation.aamiinCount}</span>
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#6B7280]">Belum ada donatur.</div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="donation-card surface sticky top-24">
              <div className="mb-6">
                <div className="text-3xl font-extrabold text-[#0284c7] mb-1">{formatCurrency(program.collectedAmount)}</div>
                <div className="text-sm text-[#6B7280]">dan masih terus dikumpulkan</div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="text-center p-3 bg-[#f8fafc] rounded-xl border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Users className="w-4 h-4 text-[#0284c7]" />
                    <span className="text-lg font-extrabold text-[#0a1628]">{program.donorCount}</span>
                  </div>
                  <div className="text-xs text-[#6B7280]">Donatur</div>
                </div>
                <div className="text-center p-3 bg-[#f8fafc] rounded-xl border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    <span className="text-lg font-extrabold text-[#0a1628]">∞</span>
                  </div>
                  <div className="text-xs text-[#6B7280]">Hari lagi</div>
                </div>
              </div>

              <Link
                to={`/donasi?program=${program.id}`}
                className="block w-full btn btn-primary text-center py-4 rounded-xl font-bold text-lg"
              >
                SEDEKAH SEKARANG
              </Link>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: program.title, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }}
                className="mt-3 w-full btn btn-secondary py-3 rounded-xl text-sm font-medium"
              >
                Bagikan program
              </button>

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
