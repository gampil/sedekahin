export default function TentangPage() {
  return (
    <div className="section">
      <div className="container-shell">
        <div className="section-head">
          <div className="section-copy">
            <p className="kicker">Tentang Kami</p>
            <h1 className="section-title">Sedekah Subuh Haramain</h1>
            <p className="section-description">
              Platform sedekah yang menghubungkan niat baik dengan program terverifikasi dan laporan yang transparan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="surface p-6">
            <h2 className="text-xl font-bold text-[#0a1628] mb-4">Visi Kami</h2>
            <p className="text-[#6B7280] leading-relaxed">
              Menjadi platform sedekah terpercaya yang memudahkan umat Islam dalam menyalurkan kebaikan, 
              khususnya untuk program-program di Tanah Suci. Kami berkomitmen untuk menjaga amanah para 
              donatur dengan transparansi penuh dan laporan yang berkala.
            </p>
          </div>

          <div className="surface p-6">
            <h2 className="text-xl font-bold text-[#0a1628] mb-4">Misi Kami</h2>
            <ul className="text-[#6B7280] leading-relaxed space-y-2">
              <li>• Menyediakan platform sedekah yang aman dan transparan</li>
              <li>• Menyalurkan sedekah kepada yang berhak di Tanah Suci</li>
              <li>• Memberikan laporan penyaluran yang berkala dan detail</li>
              <li>• Membangun kepercayaan donatur melalui akuntabilitas</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 surface p-6">
          <h2 className="text-xl font-bold text-[#0a1628] mb-4">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-[#0284c7] mb-2">Amanah</h3>
              <p className="text-sm text-[#6B7280]">
                Kami menjaga setiap rupiah yang Anda titipkan dengan penuh tanggung jawab dan menyalurkannya sesuai niat Anda.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#0284c7] mb-2">Transparan</h3>
              <p className="text-sm text-[#6B7280]">
                Setiap penyaluran didokumentasikan dan dilaporkan secara berkala kepada para donatur.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#0284c7] mb-2">Profesional</h3>
              <p className="text-sm text-[#6B7280]">
                Dikelola oleh tim yang berpengalaman dalam manajemen sedekah dan penyaluran bantuan.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 surface p-6">
          <h2 className="text-xl font-bold text-[#0a1628] mb-4">Hubungi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#6B7280]">
            <div>
              <h3 className="font-bold text-[#0a1628] mb-2">Email</h3>
              <p>info@sedekahsubuhharamain.com</p>
            </div>
            <div>
              <h3 className="font-bold text-[#0a1628] mb-2">WhatsApp</h3>
              <p>+62 812-3456-7890</p>
            </div>
            <div>
              <h3 className="font-bold text-[#0a1628] mb-2">Alamat</h3>
              <p>Makkah Al-Mukarramah, Arab Saudi</p>
            </div>
            <div>
              <h3 className="font-bold text-[#0a1628] mb-2">Jam Operasional</h3>
              <p>Senin - Jumat: 08.00 - 17.00 WIB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
