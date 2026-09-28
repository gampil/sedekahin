import { useState } from 'react';
import { useData } from '../../contexts/DataProvider';
import { formatDate } from '../../utils/helpers';
import { X } from 'lucide-react';

export default function GalleryPage() {
  const { gallery } = useData();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#172033] mb-3">Galeri Dokumentasi</h1>
        <p className="text-[#6B7280]">Dokumentasi kegiatan dan penyaluran donasi</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.imageUrl)}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
          >
            <img
              src={item.imageUrl}
              alt={item.caption || 'Gallery'}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
            {item.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs">{item.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="text-center py-16 text-[#6B7280]">Belum ada foto dokumentasi.</div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
