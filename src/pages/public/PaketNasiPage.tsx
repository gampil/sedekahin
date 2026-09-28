import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency } from '../../utils/helpers';

export default function PaketNasiPage() {
  const { packages } = useData();
  const activePackages = packages.filter(p => p.active).sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="section">
      <div className="container-shell">
        <div className="section-head">
          <div className="section-copy">
            <p className="kicker">Paket Sedekah</p>
            <h1 className="section-title">Pilih Paket Nasi untuk Sedekah</h1>
            <p className="section-description">
              Setiap paket nasi yang Anda sedekahkan akan langsung didistribusikan kepada jamaah dan warga di sekitar Masjidil Haram.
            </p>
          </div>
        </div>

        <div className="package-grid">
          {activePackages.map(pkg => (
            <div key={pkg.id} className="package-card surface">
              <div className="package-body">
                <h3 className="text-lg font-bold text-[#0a1628] mb-2">{pkg.name}</h3>
                <p className="text-sm text-[#6B7280] mb-4">{pkg.description}</p>
                <div className="package-price mb-4">{formatCurrency(pkg.amount)}</div>
                <Link
                  to={`/donasi?package=${pkg.id}&amount=${pkg.amount}`}
                  className="btn btn-primary w-full"
                >
                  Pilih Paket Ini
                </Link>
              </div>
            </div>
          ))}
        </div>

        {activePackages.length === 0 && (
          <div className="empty-copy">
            <p>Belum ada paket nasi yang tersedia.</p>
          </div>
        )}

        <div className="mt-12 surface p-6">
          <h2 className="text-xl font-bold text-[#0a1628] mb-4">Keutamaan Sedekah Nasi</h2>
          <div className="prose max-w-none text-[#6B7280]">
            <p>
              Rasulullah ﷺ bersabda, "Sedekah tidaklah mengurangi harta." (HR. Muslim). Sedekah nasi di Tanah Suci memiliki keutamaan khusus karena:
            </p>
            <ul>
              <li>Pahala dilipatgandakan di Tanah Haram</li>
              <li>Memberikan kekuatan bagi jamaah untuk beribadah</li>
              <li>Menjadi amal jariyah yang terus mengalir</li>
              <li>Meringankan beban saudara seiman</li>
            </ul>
            <p>
              Setiap porsi nasi yang Anda sedekahkan akan langsung didistribusikan kepada jamaah umrah dan warga kurang mampu di sekitar Masjidil Haram, Makkah Al-Mukarramah.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
