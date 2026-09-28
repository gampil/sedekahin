export default function KebijakanPrivasiPage() {
  return (
    <div className="section">
      <div className="container-shell">
        <div className="max-w-3xl mx-auto">
          <div className="section-head">
            <div className="section-copy">
              <p className="kicker">Legal</p>
              <h1 className="section-title">Kebijakan Privasi</h1>
              <p className="section-description">
                Terakhir diperbarui: Januari 2024
              </p>
            </div>
          </div>

          <div className="surface p-8 prose max-w-none">
            <h2 className="text-xl font-bold text-[#0a1628] mb-4">1. Pendahuluan</h2>
            <p className="text-[#6B7280] mb-6">
              Sedekah Subuh Haramain ("kami", "milik kami") menghargai privasi Anda dan berkomitmen untuk melindungi informasi pribadi Anda. 
              Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data Anda saat menggunakan platform kami.
            </p>

            <h2 className="text-xl font-bold text-[#0a1628] mb-4">2. Informasi yang Kami Kumpulkan</h2>
            <p className="text-[#6B7280] mb-4">Kami mengumpulkan informasi berikut:</p>
            <ul className="text-[#6B7280] mb-6 space-y-2 list-disc list-inside">
              <li><strong>Informasi Donatur:</strong> Nama, nomor WhatsApp, email (opsional), dan doa/pesan</li>
              <li><strong>Informasi Transaksi:</strong> Nominal donasi, metode pembayaran, dan bukti transfer</li>
              <li><strong>Informasi Teknis:</strong> IP address, browser type, dan device information</li>
            </ul>

            <h2 className="text-xl font-bold text-[#0a1628] mb-4">3. Penggunaan Informasi</h2>
            <p className="text-[#6B7280] mb-4">Informasi Anda digunakan untuk:</p>
            <ul className="text-[#6B7280] mb-6 space-y-2 list-disc list-inside">
              <li>Memproses dan memverifikasi donasi</li>
              <li>Mengirim konfirmasi dan update status donasi</li>
              <li>Memberikan layanan pelanggan</li>
              <li>Menampilkan doa donatur di halaman publik (dengan opsi anonim)</li>
              <li>Meningkatkan kualitas layanan kami</li>
            </ul>

            <h2 className="text-xl font-bold text-[#0a1628] mb-4">4. Perlindungan Data</h2>
            <p className="text-[#6B7280] mb-6">
              Kami menggunakan enkripsi dan langkah-langkah keamanan standar industri untuk melindungi data Anda. 
              Informasi sensitif seperti bukti transfer disimpan dengan aman dan hanya diakses oleh tim yang berwenang.
            </p>

            <h2 className="text-xl font-bold text-[#0a1628] mb-4">5. Berbagi Informasi</h2>
            <p className="text-[#6B7280] mb-6">
              Kami tidak menjual atau menyewakan data pribadi Anda. Informasi hanya dibagikan kepada:
            </p>
            <ul className="text-[#6B7280] mb-6 space-y-2 list-disc list-inside">
              <li>Payment gateway untuk memproses pembayaran</li>
              <li>Tim operasional untuk verifikasi dan penyaluran donasi</li>
              <li>Pihak berwenang jika diwajibkan oleh hukum</li>
            </ul>

            <h2 className="text-xl font-bold text-[#0a1628] mb-4">6. Hak Anda</h2>
            <p className="text-[#6B7280] mb-4">Anda memiliki hak untuk:</p>
            <ul className="text-[#6B7280] mb-6 space-y-2 list-disc list-inside">
              <li>Mengakses data pribadi Anda</li>
              <li>Meminta koreksi data yang tidak akurat</li>
              <li>Meminta penghapusan data (dengan beberapa pengecualian)</li>
              <li>Menarik persetujuan kapan saja</li>
            </ul>

            <h2 className="text-xl font-bold text-[#0a1628] mb-4">7. Kontak</h2>
            <p className="text-[#6B7280] mb-6">
              Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami di:
              <br />
              Email: info@sedekahsubuhharamain.com
              <br />
              WhatsApp: +62 812-3456-7890
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
