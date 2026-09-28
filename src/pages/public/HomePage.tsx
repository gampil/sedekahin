import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, calculateProgress, getRemainingDays, formatRelativeTime } from '../../utils/helpers';
import { ArrowRight, Shield, Eye, Lock, FileText, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const { programs, settings, donations, testimonials } = useData();
  const featuredPrograms = programs.filter(p => p.featured && p.status === 'active');
  const paidDonations = donations.filter(d => d.status === 'paid');
  const totalCollected = paidDonations.reduce((sum, d) => sum + d.amount, 0);
  const uniqueDonors = new Set(paidDonations.map(d => d.anonymous ? 'anon' : d.name)).size;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Apakah saya bisa bersedekah tanpa menampilkan nama?',
      a: 'Bisa. Aktifkan pilihan "Tampilkan sebagai Hamba Allah" pada formulir donasi. Data kontak tetap digunakan secara terbatas untuk keperluan transaksi.'
    },
    {
      q: 'Bagaimana saya mengetahui pembayaran berhasil?',
      a: 'Setelah pembayaran, Anda diarahkan ke halaman status. Simpan ID transaksi untuk memeriksa ulang kapan saja.'
    },
    {
      q: 'Di mana laporan penyaluran dipublikasikan?',
      a: 'Pembaruan tersedia pada halaman detail masing-masing program, lengkap dengan tanggal dan ringkasan kegiatan.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1769E0] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1769E0] rounded-full blur-[100px]"></div>
        </div>
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-white/90">Platform sedekah tepercaya</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Sedekah Subuh<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-blue-300">Jalur Langit</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Salurkan kebaikan untuk program yang terverifikasi di Tanah Suci.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/program"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0a1628] px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg shadow-white/10"
              >
                Pilih program
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#cara-kerja"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all"
              >
                Cara penyaluran
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm text-[#6B7280]">
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Pembayaran aman</span>
            <span className="flex items-center gap-2"><Eye className="w-4 h-4 text-blue-500" /> Program diverifikasi</span>
            <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-purple-500" /> Laporan berkala</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-emerald-600">100% transparan</span>
            <span className="text-sm text-[#6B7280]">— Perkembangan penyaluran dipublikasikan pada setiap program.</span>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-extrabold text-[#0a1628]">{formatCurrency(totalCollected)}</div>
              <div className="text-sm text-[#6B7280] mt-1">Sedekah tersalurkan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-extrabold text-[#0a1628]">{uniqueDonors}</div>
              <div className="text-sm text-[#6B7280] mt-1">Sahabat baik</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-extrabold text-[#0a1628]">{featuredPrograms.length}</div>
              <div className="text-sm text-[#6B7280] mt-1">Program aktif</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#1769E0] uppercase tracking-wider">Program pilihan</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a1628] mt-2 mb-4">Kebaikan yang bisa dimulai hari ini</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">Pilih program sesuai kepedulian Anda. Nominal kecil sekalipun ikut menguatkan langkah bersama.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrograms.map(program => (
            <Link
              key={program.id}
              to={`/program/${program.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#1769E0] uppercase tracking-wider">
                    SEDEKAH SUBUH BAITULLAH
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0a1628] text-lg mb-2 line-clamp-2 group-hover:text-[#1769E0] transition-colors">{program.title}</h3>
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{program.shortDescription}</p>
                
                {/* Collected Amount */}
                <div className="mb-4">
                  <div className="text-2xl font-bold text-[#1769E0] mb-1">
                    {formatCurrency(program.collectedAmount)}
                  </div>
                  <div className="text-xs text-[#6B7280]">
                    {program.donorCount} donatur
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6B7280]">Program aktif</span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1769E0] group-hover:gap-2 transition-all">
                    Sedekah sekarang <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/program"
            className="inline-flex items-center gap-2 text-[#1769E0] font-semibold hover:underline"
          >
            Lihat semua program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Cara Kerja */}
      <section id="cara-kerja" className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#1769E0] uppercase tracking-wider">Alur singkat</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a1628] mt-2 mb-4">Tiga langkah menuju kebaikan</h2>
            <p className="text-[#6B7280] max-w-2xl mx-auto">Kami membuat prosesnya sederhana tanpa mengurangi keamanan dan transparansi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Pilih program', desc: 'Baca tujuan, kebutuhan dana, pelaksana, dan pembaruan program sebelum menentukan pilihan.' },
              { num: '2', title: 'Isi nominal', desc: 'Masukkan nominal dan data kontak untuk menerima informasi status pembayaran.' },
              { num: '3', title: 'Bayar dengan aman', desc: 'Selesaikan pembayaran melalui halaman resmi layanan pembayaran, lalu pantau status transaksi.' }
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#1769E0] to-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold mx-auto mb-4 shadow-lg">
                  {step.num}
                </div>
                <h3 className="font-bold text-[#0a1628] text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Kepercayaan dijaga</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a1628] mt-2 mb-6">Setiap rupiah dapat ditelusuri.</h2>
            <p className="text-[#6B7280] mb-8 leading-relaxed">Pengelola program wajib memberikan informasi, target, dan pembaruan penyaluran yang dapat dilihat publik.</p>
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Verifikasi berlapis', desc: 'Data program ditinjau sebelum ditayangkan.', color: 'text-emerald-500 bg-emerald-50' },
                { icon: Eye, title: 'Progres terbuka', desc: 'Dana terkumpul dan target tampil jelas.', color: 'text-blue-500 bg-blue-50' },
                { icon: Lock, title: 'Kunci tetap rahasia', desc: 'Kredensial pembayaran hanya berada di server.', color: 'text-purple-500 bg-purple-50' },
                { icon: FileText, title: 'Jejak aktivitas', desc: 'Perubahan admin tercatat untuk audit.', color: 'text-orange-500 bg-orange-50' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0a1628]">{item.title}</h4>
                      <p className="text-sm text-[#6B7280]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] rounded-2xl p-8 text-white">
            <div className="text-center">
              <div className="text-5xl font-extrabold mb-2">{formatCurrency(totalCollected)}</div>
              <div className="text-blue-200 mb-6">Total sedekah tersalurkan</div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">{uniqueDonors}</div>
                  <div className="text-xs text-blue-200">Sahabat baik</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl font-bold">{featuredPrograms.length}</div>
                  <div className="text-xs text-blue-200">Program aktif</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donations / Doa Donatur */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-[#1769E0] uppercase tracking-wider">Transparansi publik</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a1628] mt-2 mb-4">Tren dan doa donatur</h2>
            <p className="text-[#6B7280]">Data yang tampil hanya berasal dari transaksi terkonfirmasi. Nomor WhatsApp dan email tidak pernah dipublikasikan.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Donations */}
            <div>
              <h3 className="font-bold text-[#0a1628] text-lg mb-4">Doa para sahabat baik</h3>
              <div className="space-y-3">
                {paidDonations.slice(0, 5).map(d => (
                  <div key={d.id} className="bg-[#fafafa] rounded-xl p-4 border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-[#0a1628]">
                          {d.anonymous ? 'Hamba Allah' : `${d.salutation} ${d.name}`}
                        </div>
                        <div className="text-xs text-[#6B7280] mt-0.5">{formatRelativeTime(d.createdAt)}</div>
                        {d.prayer && (
                          <div className="mt-2 text-sm text-[#374151] italic">"{d.prayer}"</div>
                        )}
                      </div>
                      <div className="text-sm font-bold text-[#1769E0] whitespace-nowrap">{formatCurrency(d.amount)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h3 className="font-bold text-[#0a1628] text-lg mb-4">Kata mereka</h3>
              <div className="space-y-3">
                {testimonials.filter(t => t.active).slice(0, 3).map(t => (
                  <div key={t.id} className="bg-[#fafafa] rounded-xl p-4 border">
                    <p className="text-sm text-[#374151] italic mb-3">"{t.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#1769E0] to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-[#0a1628]">{t.name}</div>
                        <div className="text-xs text-[#6B7280]">Sahabat baik</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-[#1769E0] uppercase tracking-wider">Pertanyaan umum</span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0a1628] mt-2 mb-4">Yang sering ditanyakan</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-medium text-[#0a1628]">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-[#6B7280]" /> : <ChevronDown className="w-5 h-5 text-[#6B7280]" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-sm text-[#6B7280] leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-[100px]"></div>
          </div>
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Siap menyalurkan kebaikan?</h2>
            <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">Temukan program yang paling dekat dengan kepedulian Anda.</p>
            <Link
              to="/program"
              className="inline-flex items-center gap-2 bg-white text-[#0a1628] px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg"
            >
              Lihat program <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
