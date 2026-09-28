import { useData } from '../../contexts/DataProvider';
import { formatCurrency, formatRelativeTime } from '../../utils/helpers';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function DonaturPage() {
  const { donations, incrementAamiin } = useData();
  const [aamiinCooldown, setAamiinCooldown] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const perPage = 20;

  const paidDonations = donations
    .filter(d => d.status === 'paid')
    .sort((a, b) => new Date(b.paidAt || b.createdAt).getTime() - new Date(a.paidAt || a.createdAt).getTime());

  const totalPages = Math.ceil(paidDonations.length / perPage);
  const paginatedDonations = paidDonations.slice((page - 1) * perPage, page * perPage);

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
    <div className="section">
      <div className="container-shell">
        <div className="section-head">
          <div className="section-copy">
            <p className="kicker">Transparansi publik</p>
            <h1 className="section-title">Doa Para Sahabat Baik</h1>
            <p className="section-description">
              Data yang tampil hanya berasal dari transaksi terkonfirmasi. Nomor WhatsApp dan email tidak pernah dipublikasikan.
            </p>
          </div>
        </div>

        <div className="public-grid">
          {paginatedDonations.map(donation => (
            <div key={donation.id} className="donor-card">
              <div className="donor-head">
                <div className="donor-avatar">
                  {donation.anonymous ? 'H' : donation.name.charAt(0).toUpperCase()}
                </div>
                <div className="donor-identity">
                  <strong>{donation.anonymous ? 'Hamba Allah' : `${donation.salutation} ${donation.name}`}</strong>
                  <small>{formatRelativeTime(donation.paidAt || donation.createdAt)}</small>
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

        {paginatedDonations.length === 0 && (
          <div className="empty-copy">
            <p>Belum ada donatur yang tercatat.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="btn btn-secondary btn-sm"
            >
              Sebelumnya
            </button>
            <span className="flex items-center px-4 text-sm text-[#6B7280]">
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="btn btn-secondary btn-sm"
            >
              Selanjutnya
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
