import { Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { formatCurrency, calculateProgress, getRemainingDays } from '../../utils/helpers';
import { Users, Clock } from 'lucide-react';

export default function ProgramPage() {
  const { programs } = useData();
  const activePrograms = programs.filter(p => p.status === 'active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#172033] mb-3">Program Sedekah</h1>
        <p className="text-[#6B7280]">Pilih program yang ingin Anda dukung</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activePrograms.map(program => (
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
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-[#172033] text-lg mb-2">{program.title}</h3>
              <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">{program.shortDescription}</p>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-semibold text-[#1769E0]">{formatCurrency(program.collectedAmount)}</span>
                  <span className="text-[#6B7280]">{calculateProgress(program.collectedAmount, program.targetAmount)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-[#1769E0] h-2 rounded-full" style={{ width: `${calculateProgress(program.collectedAmount, program.targetAmount)}%` }}></div>
                </div>
                <div className="text-xs text-[#6B7280] mt-1">Target: {formatCurrency(program.targetAmount)}</div>
              </div>
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {program.donorCount} donatur</span>
                {program.endDate && getRemainingDays(program.endDate) > 0 && (
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {getRemainingDays(program.endDate)} hari lagi</span>
                )}
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
