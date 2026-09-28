import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, calculateProgress, getRemainingDays } from '../../utils/helpers';
import { ArrowRight, Users, Target, Clock } from 'lucide-react';

export default function HomePage() {
  const { programs, settings, testimonials } = useData();
  const featuredPrograms = programs.filter(p => p.featured && p.status === 'active').slice(0, 3);
  const activeTestimonials = testimonials.filter(t => t.active);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1769E0] to-[#1057BE] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              Salurkan Sedekah<br />untuk Kebaikan
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
              {settings.siteDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/program"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1769E0] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
              >
                Lihat Program
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#1769E0]">{programs.filter(p => p.status === 'active').length}</div>
            <div className="text-sm text-[#6B7280] mt-1">Program Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#1769E0]">
              {programs.reduce((sum, p) => sum + p.donorCount, 0)}
            </div>
            <div className="text-sm text-[#6B7280] mt-1">Donatur</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#1769E0]">
              {formatCurrency(programs.reduce((sum, p) => sum + p.collectedAmount, 0))}
            </div>
            <div className="text-sm text-[#6B7280] mt-1">Tersalurkan</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#1769E0]">100%</div>
            <div className="text-sm text-[#6B7280] mt-1">Transparan</div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#172033] mb-4">Program Unggulan</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">Pilih program sedekah yang ingin Anda dukung. Setiap donasi akan disalurkan dengan amanah.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPrograms.map(program => (
            <Link
              key={program.id}
              to={`/program/${program.slug}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#1769E0]">
                  Aktif
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#172033] text-lg mb-2 line-clamp-2">{program.title}</h3>
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{program.shortDescription}</p>
                
                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-[#1769E0]">{formatCurrency(program.collectedAmount)}</span>
                    <span className="text-[#6B7280]">{calculateProgress(program.collectedAmount, program.targetAmount)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-[#1769E0] h-2 rounded-full transition-all"
                      style={{ width: `${calculateProgress(program.collectedAmount, program.targetAmount)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#6B7280] mt-1">
                    <span>Target: {formatCurrency(program.targetAmount)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" /> {program.donorCount} donatur
                  </span>
                  {program.endDate && getRemainingDays(program.endDate) > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {getRemainingDays(program.endDate)} hari lagi
                    </span>
                  )}
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
            Lihat Semua Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      {activeTestimonials.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#172033] mb-4">Kata Mereka</h2>
              <p className="text-[#6B7280]">Testimoni dari para donatur kami</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeTestimonials.slice(0, 3).map(t => (
                <div key={t.id} className="bg-[#F5F7FB] rounded-xl p-6">
                  <p className="text-[#172033] text-sm leading-relaxed mb-4 italic">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1769E0] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#172033]">{t.name}</div>
                      <div className="text-xs text-[#6B7280]">Donatur</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#1769E0] to-[#1057BE] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Mulai Bersedekah Hari Ini</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">Setiap sedekah yang Anda berikan akan menjadi amal jariyah. Jangan tunda kebaikan.</p>
          <Link
            to="/program"
            className="inline-flex items-center gap-2 bg-white text-[#1769E0] px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors"
          >
            Sedekah Sekarang <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
