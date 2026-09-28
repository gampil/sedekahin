import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, calculateProgress, getRemainingDays } from '../../utils/helpers';
import { ArrowRight } from 'lucide-react';

export default function ProgramPage() {
  const { programs } = useData();
  const activePrograms = programs.filter(p => p.status === 'active');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-[#1769E0] uppercase tracking-wider">Program pilihan</span>
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#0a1628] mt-2 mb-4">Kebaikan yang bisa dimulai hari ini</h1>
        <p className="text-[#6B7280] max-w-2xl mx-auto">Pilih program sesuai kepedulian Anda. Nominal kecil sekalipun ikut menguatkan langkah bersama.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePrograms.map(program => (
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
      {activePrograms.length === 0 && (
        <div className="text-center py-16 text-[#6B7280]">Belum ada program aktif.</div>
      )}
    </div>
  );
}
