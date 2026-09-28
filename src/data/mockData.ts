import { Program, Package, Bank, Donation, Update, GalleryItem, Testimonial, Settings } from '../types';

export const mockSettings: Settings = {
  siteName: 'SedekahOnline',
  siteDescription: 'Platform donasi dan sedekah online terpercaya untuk membantu sesama.',
  logoUrl: '',
  whatsapp: '+6281234567890',
  email: 'info@sedekahonline.id',
  address: 'Jl. Kebaikan No. 1, Jakarta'
};

export const mockPrograms: Program[] = [
  {
    id: 'prog1',
    title: 'Sedekah Nasi Baitullah',
    slug: 'sedekah-nasi-baitullah',
    thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=600&fit=crop',
    shortDescription: 'Berbagi nasi bungkus untuk warga kurang mampu di sekitar masjid Baitullah setiap hari Jumat.',
    content: '<h2>Tentang Program</h2><p>Program Sedekah Nasi Baitullah adalah program rutin setiap hari Jumat untuk membagikan nasi bungkus kepada warga kurang mampu di sekitar masjid Baitullah.</p><p>Setiap bungkus nasi berisi makanan bergizi yang layak konsumsi. Target kami adalah 200 bungkus setiap minggunya.</p><h3>Manfaat Sedekah</h3><ul><li>Meringankan beban saudara kita</li><li>Mendapatkan pahala berlipat ganda</li><li>Membersihkan harta</li><li>Menambah keberkahan hidup</li></ul><blockquote>"Sedekah tidaklah mengurangi harta." - HR. Muslim</blockquote>',
    targetAmount: 50000000,
    collectedAmount: 32750000,
    donorCount: 245,
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    status: 'active',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prog2',
    title: 'Beasiswa Yatim Dhuafa',
    slug: 'beasiswa-yatim-dhuafa',
    thumbnail: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=600&fit=crop',
    shortDescription: 'Program beasiswa pendidikan untuk anak yatim dan dhuafa agar bisa terus bersekolah.',
    content: '<h2>Beasiswa Yatim Dhuafa</h2><p>Program ini bertujuan membantu anak-anak yatim dan dhuafa untuk mendapatkan pendidikan yang layak.</p><p>Dana yang terkumpul akan disalurkan untuk biaya sekolah, buku, seragam, dan kebutuhan pendidikan lainnya.</p><h3>Target Penerima</h3><p>50 anak yatim dan dhuafa di wilayah Jakarta dan sekitarnya.</p>',
    targetAmount: 100000000,
    collectedAmount: 67500000,
    donorCount: 189,
    startDate: '2024-02-01',
    endDate: '2025-06-30',
    status: 'active',
    featured: true,
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'prog3',
    title: 'Wakaf Al-Quran Pedesaan',
    slug: 'wakaf-alquran-pedesaan',
    thumbnail: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1200&h=600&fit=crop',
    shortDescription: 'Menyalurkan Al-Quran ke masjid-masjid di daerah pedesaan yang kekurangan mushaf.',
    content: '<h2>Wakaf Al-Quran</h2><p>Banyak masjid di daerah pedesaan yang masih kekurangan Al-Quran. Program ini bertujuan untuk menyalurkan mushaf Al-Quran ke masjid-masjid tersebut.</p><p>Setiap Al-Quran yang diwakafkan akan menjadi amal jariyah bagi yang mewakafkan.</p>',
    targetAmount: 25000000,
    collectedAmount: 18200000,
    donorCount: 156,
    startDate: '2024-03-01',
    endDate: '2025-03-01',
    status: 'active',
    featured: false,
    createdAt: '2024-03-01T00:00:00Z'
  }
];

export const mockPackages: Package[] = [
  { id: 'pkg1', name: 'Paket Ringan', amount: 25000, description: 'Sedekah ringan untuk kebaikan', sortOrder: 1, active: true },
  { id: 'pkg2', name: 'Paket Sedang', amount: 50000, description: 'Sedekah untuk dampak lebih', sortOrder: 2, active: true },
  { id: 'pkg3', name: 'Paket Besar', amount: 100000, description: 'Sedekah besar untuk kebaikan besar', sortOrder: 3, active: true },
  { id: 'pkg4', name: 'Paket Istimewa', amount: 250000, description: 'Sedekah istimewa untuk saudara kita', sortOrder: 4, active: true },
];

export const mockBanks: Bank[] = [
  { id: 'bank1', bankName: 'Bank Syariah Indonesia', accountNumber: '7123456789', accountName: 'Yayasan Sedekah Online', logoUrl: '', instructions: 'Transfer sesuai nominal invoice. Gunakan nomor invoice sebagai keterangan.', active: true, sortOrder: 1 },
  { id: 'bank2', bankName: 'Bank Mandiri', accountNumber: '1300012345678', accountName: 'Yayasan Sedekah Online', logoUrl: '', instructions: 'Transfer sesuai nominal invoice. Gunakan nomor invoice sebagai keterangan.', active: true, sortOrder: 2 },
  { id: 'bank3', bankName: 'BCA', accountNumber: '4567890123', accountName: 'Yayasan Sedekah Online', logoUrl: '', instructions: 'Transfer sesuai nominal invoice. Gunakan nomor invoice sebagai keterangan.', active: true, sortOrder: 3 },
];

export const mockDonations: Donation[] = [
  {
    id: 'don1', invoice: 'INV-20240101-001', idempotencyKey: 'key1',
    programId: 'prog1', programTitle: 'Sedekah Nasi Baitullah',
    packageId: 'pkg3', packageName: 'Paket Besar',
    amount: 100000, salutation: 'Bapak', name: 'Ahmad Fauzi', anonymous: false,
    phone: '081234567890', email: 'ahmad@email.com',
    prayer: 'Semoga menjadi berkah dan diterima oleh Allah SWT.',
    paymentMethod: 'bank', bankAccountId: 'bank1',
    status: 'paid', proofStatus: 'approved', aamiinCount: 24,
    createdAt: '2024-12-15T10:30:00Z', paidAt: '2024-12-15T11:00:00Z'
  },
  {
    id: 'don2', invoice: 'INV-20240101-002', idempotencyKey: 'key2',
    programId: 'prog1', programTitle: 'Sedekah Nasi Baitullah',
    amount: 50000, salutation: 'Ibu', name: 'Siti Nurhaliza', anonymous: true,
    phone: '081234567891', prayer: 'Semoga Allah membalas dengan kebaikan berlipat.',
    paymentMethod: 'bank', bankAccountId: 'bank2',
    status: 'paid', proofStatus: 'approved', aamiinCount: 18,
    createdAt: '2024-12-14T09:00:00Z', paidAt: '2024-12-14T09:30:00Z'
  },
  {
    id: 'don3', invoice: 'INV-20240101-003', idempotencyKey: 'key3',
    programId: 'prog2', programTitle: 'Beasiswa Yatim Dhuafa',
    amount: 250000, salutation: 'Kak', name: 'Budi Santoso', anonymous: false,
    phone: '081234567892', prayer: 'Untuk pendidikan anak-anak yatim.',
    paymentMethod: 'bank', bankAccountId: 'bank1',
    status: 'paid', proofStatus: 'approved', aamiinCount: 32,
    createdAt: '2024-12-13T14:00:00Z', paidAt: '2024-12-13T14:30:00Z'
  },
  {
    id: 'don4', invoice: 'INV-20240101-004', idempotencyKey: 'key4',
    programId: 'prog1', programTitle: 'Sedekah Nasi Baitullah',
    amount: 100000, salutation: 'Bapak', name: 'Rizky Pratama', anonymous: false,
    phone: '081234567893', prayer: 'Semoga menjadi amal jariyah.',
    paymentMethod: 'bank', bankAccountId: 'bank3',
    status: 'awaiting_transfer', proofStatus: 'none', aamiinCount: 0,
    createdAt: '2024-12-16T08:00:00Z'
  },
  {
    id: 'don5', invoice: 'INV-20240101-005', idempotencyKey: 'key5',
    programId: 'prog3', programTitle: 'Wakaf Al-Quran Pedesaan',
    amount: 50000, salutation: 'Ibu', name: 'Dewi Lestari', anonymous: true,
    phone: '081234567894', prayer: 'Semoga menjadi amal jariyah.',
    paymentMethod: 'bank', bankAccountId: 'bank1',
    status: 'paid', proofStatus: 'approved', aamiinCount: 12,
    createdAt: '2024-12-12T16:00:00Z', paidAt: '2024-12-12T16:30:00Z'
  },
  {
    id: 'don6', invoice: 'INV-20240101-006', idempotencyKey: 'key6',
    programId: 'prog2', programTitle: 'Beasiswa Yatim Dhuafa',
    amount: 100000, salutation: 'Kak', name: 'Hasan Abdullah', anonymous: false,
    phone: '081234567895', prayer: 'Barakallahu fiikum.',
    paymentMethod: 'bank', bankAccountId: 'bank2',
    status: 'paid', proofStatus: 'approved', aamiinCount: 8,
    createdAt: '2024-12-11T12:00:00Z', paidAt: '2024-12-11T12:30:00Z'
  },
];

export const mockUpdates: Update[] = [
  {
    id: 'upd1', programId: 'prog1',
    title: 'Distribusi Nasi Jumat Minggu Ini',
    content: 'Alhamdulillah, hari ini kami telah mendistribusikan 200 bungkus nasi kepada warga di sekitar masjid Baitullah. Terima kasih kepada para donatur yang telah berpartisipasi.',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop',
    createdAt: '2024-12-13T15:00:00Z',
    published: true
  },
  {
    id: 'upd2', programId: 'prog1',
    title: 'Target Tercapai 65%',
    content: 'Alhamdulillah, program Sedekah Nasi Baitullah telah mencapai 65% dari target donasi. Terima kasih atas kepercayaan Anda.',
    createdAt: '2024-12-10T10:00:00Z',
    published: true
  },
  {
    id: 'upd3', programId: 'prog2',
    title: 'Penyaluran Beasiswa Tahap 2',
    content: 'Beasiswa tahap 2 telah disalurkan kepada 25 anak yatim dan dhuafa. Semoga bermanfaat untuk pendidikan mereka.',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop',
    createdAt: '2024-12-08T14:00:00Z',
    published: true
  }
];

export const mockGallery: GalleryItem[] = [
  { id: 'gal1', imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop', caption: 'Distribusi nasi bungkus', date: '2024-12-13' },
  { id: 'gal2', imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop', caption: 'Kegiatan sosial bersama relawan', date: '2024-12-10' },
  { id: 'gal3', imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=400&h=300&fit=crop', caption: 'Penyerahan beasiswa', date: '2024-12-08' },
  { id: 'gal4', imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop', caption: 'Anak-anak penerima beasiswa', date: '2024-12-05' },
  { id: 'gal5', imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=300&fit=crop', caption: 'Penyaluran Al-Quran', date: '2024-12-01' },
  { id: 'gal6', imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=300&fit=crop', caption: 'Gotong royong bersama warga', date: '2024-11-28' },
];

export const mockTestimonials: Testimonial[] = [
  { id: 'test1', name: 'Hj. Fatimah', content: 'Alhamdulillah, platform ini sangat memudahkan saya untuk bersedekah. Prosesnya mudah dan transparan.', date: '2024-12-01', active: true },
  { id: 'test2', name: 'Ustadz Rahman', content: 'Program-program yang ditawarkan sangat bermanfaat. Penyalurannya tepat sasaran.', date: '2024-11-25', active: true },
  { id: 'test3', name: 'Ibu Aisyah', content: 'Saya rutin bersedekah melalui platform ini. Semoga menjadi amal jariyah.', date: '2024-11-20', active: true },
];
