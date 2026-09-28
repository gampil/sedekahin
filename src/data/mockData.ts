import { Program, Package, Bank, Donation, Update, GalleryItem, Testimonial, Settings } from '../types';

export const mockSettings: Settings = {
  siteName: 'Sedekah Subuh Haramain',
  siteDescription: 'Platform sedekah tepercaya. Salurkan kebaikan untuk program yang terverifikasi di Tanah Suci.',
  logoUrl: '',
  whatsapp: '+6281234567890',
  email: 'info@sedekahsubuhharamain.com',
  address: 'Makkah Al-Mukarramah, Arab Saudi'
};

export const mockPrograms: Program[] = [
  {
    id: 'prog1',
    title: 'Raih Pahala Berlipat di Tanah Suci',
    slug: 'raih-pahala-berlipat-di-tanah-suci',
    thumbnail: 'https://drive.google.com/thumbnail?id=1Dqf0XAX2Oy_LE1SayNdABuzNaqBDUpyV&sz=w1600',
    coverImage: 'https://drive.google.com/thumbnail?id=1Dqf0XAX2Oy_LE1SayNdABuzNaqBDUpyV&sz=w1600',
    shortDescription: 'Raih Pahala Berlipat di Tanah Suci: 1 Kotak Nasi Sangatlah Berharga Untuk Mereka',
    content: '<h2>Tentang Program</h2><p>Program Sedekah Subuh Baitullah adalah program rutin untuk membagikan kotak nasi kepada jamaah dan warga kurang mampu di sekitar Masjidil Haram, Makkah Al-Mukarramah.</p><p>Setiap kotak nasi berisi makanan bergizi yang layak konsumsi. 1 kotak nasi sangatlah berharga untuk mereka yang sedang beribadah di Tanah Suci.</p><h3>Keutamaan Sedekah di Tanah Suci</h3><ul><li>Pahala berlipat ganda di Tanah Haram</li><li>Meringankan beban saudara seiman</li><li>Menjadi amal jariyah yang terus mengalir</li><li>Membersihkan harta dan menambah keberkahan</li></ul><blockquote>"Sedekah tidaklah mengurangi harta." - HR. Muslim</blockquote><h3>Target Penyaluran</h3><p>Target kami adalah menyalurkan nasi kepada jamaah umrah dan warga kurang mampu di sekitar Masjidil Haram setiap harinya.</p>',
    targetAmount: 100000000,
    collectedAmount: 560000,
    donorCount: 45,
    startDate: '2024-01-01',
    endDate: '2028-12-31',
    status: 'active',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prog2',
    title: 'SEDEKAH IFTAR DI TANAH SUCI',
    slug: 'sedekah-iftar-di-tanah-suci',
    thumbnail: 'https://drive.google.com/thumbnail?id=1R7ZPTX8dCRHKdqoqMtXwQ572dy2KkcPY&sz=w1600',
    coverImage: 'https://drive.google.com/thumbnail?id=1R7ZPTX8dCRHKdqoqMtXwQ572dy2KkcPY&sz=w1600',
    shortDescription: 'SATU HIDANGAN DARI ANDA, MENJADI KEBAHAGIAAN BAGI MEREKA DI WAKTU BERBUKA. Mari Berbagi Berkah di Tanah Suci.',
    content: '<h2>Sedekah Iftar di Tanah Suci</h2><p>Satu hidangan dari Anda, menjadi kebahagiaan bagi mereka di waktu buka puasa. Mari berbagi berkah di Tanah Suci.</p><p>Program ini bertujuan menyediakan hidangan iftar untuk jamaah dan warga yang berpuasa di Makkah Al-Mukarramah.</p><h3>Keutamaan Memberi Makan Orang Berpuasa</h3><ul><li>Mendapatkan pahala seperti orang yang berpuasa</li><li>Pahala berlipat di Tanah Haram</li><li>Menjadi sebab masuk surga</li><li>Menambah keberkahan hidup</li></ul><blockquote>"Barangsiapa yang memberi makan orang yang berpuasa, maka baginya pahala seperti orang yang berpuasa tersebut." - HR. Ahmad</blockquote>',
    targetAmount: 100000000,
    collectedAmount: 0,
    donorCount: 0,
    startDate: '2024-06-01',
    endDate: '2028-06-01',
    status: 'active',
    featured: true,
    createdAt: '2024-06-01T00:00:00Z'
  },
  {
    id: 'prog3',
    title: 'Sedekah Subuh Nasi di Baitullah, Ikhtiar Pelunasan Hutang',
    slug: 'sedekah-subuh-nasi-di-baitullah-ikhtiar-pelunasan-hutang',
    thumbnail: 'https://drive.google.com/thumbnail?id=1ck28L_4uRqK_cF9qCWJnAwctjTAzf4d-&sz=w1600',
    coverImage: 'https://drive.google.com/thumbnail?id=1ck28L_4uRqK_cF9qCWJnAwctjTAzf4d-&sz=w1600',
    shortDescription: 'Sedekah nasi di Tanah Suci sebagai bentuk amal dan ikhtiar memohon kemudahan rezeki serta pertolongan Allah dalam menyelesaikan hutang.',
    content: '<h2>Ikhtiar Pelunasan Hutang</h2><p>Sedekah nasi di Tanah Suci sebagai bentuk amal dan ikhtiar memohon kemudahan rezeki serta pertolongan Allah dalam menyelesaikan hutang.</p><p>Program ini khusus ditujukan bagi mereka yang sedang terbelit hutang dan membutuhkan pertolongan Allah SWT.</p><h3>Keutamaan Sedekah untuk Pelunasan Hutang</h3><ul><li>Sedekah di waktu subuh memiliki keutamaan khusus</li><li>Sedekah di Tanah Haram dilipatgandakan pahalanya</li><li>Menjadi sebab dibukakan pintu rezeki</li><li>Memohon pertolongan Allah dari beban hutang</li></ul><blockquote>"Obatilah orang-orang sakit di antara kalian dengan sedekah." - HR. Abu Dawud</blockquote>',
    targetAmount: 100000000,
    collectedAmount: 0,
    donorCount: 0,
    startDate: '2024-01-01',
    endDate: '2038-12-31',
    status: 'active',
    featured: true,
    createdAt: '2024-01-01T00:00:00Z'
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
    programId: 'prog1', programTitle: 'Raih Pahala Berlipat di Tanah Suci',
    packageId: 'pkg3', packageName: 'Paket Besar',
    amount: 100000, salutation: 'Bapak', name: 'Ahmad Fauzi', anonymous: false,
    phone: '081234567890', email: 'ahmad@email.com',
    prayer: 'Semoga menjadi berkah dan diterima oleh Allah SWT. Aamiin.',
    paymentMethod: 'bank', bankAccountId: 'bank1',
    status: 'paid', proofStatus: 'approved', aamiinCount: 24,
    createdAt: '2024-12-15T10:30:00Z', paidAt: '2024-12-15T11:00:00Z'
  },
  {
    id: 'don2', invoice: 'INV-20240101-002', idempotencyKey: 'key2',
    programId: 'prog1', programTitle: 'Raih Pahala Berlipat di Tanah Suci',
    amount: 50000, salutation: 'Ibu', name: 'Siti Nurhaliza', anonymous: true,
    phone: '081234567891', prayer: 'Semoga Allah membalas dengan kebaikan berlipat. Jazakumullah khairan.',
    paymentMethod: 'bank', bankAccountId: 'bank2',
    status: 'paid', proofStatus: 'approved', aamiinCount: 18,
    createdAt: '2024-12-14T09:00:00Z', paidAt: '2024-12-14T09:30:00Z'
  },
  {
    id: 'don3', invoice: 'INV-20240101-003', idempotencyKey: 'key3',
    programId: 'prog3', programTitle: 'Sedekah Subuh Nasi di Baitullah, Ikhtiar Pelunasan Hutang',
    amount: 250000, salutation: 'Bapak', name: 'Muhammad Rizki', anonymous: false,
    phone: '081234567892', prayer: 'Ya Allah, mudahkanlah urusan hutangku. Aamiin ya Rabbal Alamin.',
    paymentMethod: 'bank', bankAccountId: 'bank1',
    status: 'paid', proofStatus: 'approved', aamiinCount: 32,
    createdAt: '2024-12-13T14:00:00Z', paidAt: '2024-12-13T14:30:00Z'
  },
  {
    id: 'don4', invoice: 'INV-20240101-004', idempotencyKey: 'key4',
    programId: 'prog1', programTitle: 'Raih Pahala Berlipat di Tanah Suci',
    amount: 100000, salutation: 'Bapak', name: 'Rizky Pratama', anonymous: false,
    phone: '081234567893', prayer: 'Semoga menjadi amal jariyah dan pemberat timbangan kebaikan.',
    paymentMethod: 'bank', bankAccountId: 'bank3',
    status: 'awaiting_transfer', proofStatus: 'none', aamiinCount: 0,
    createdAt: '2024-12-16T08:00:00Z'
  },
  {
    id: 'don5', invoice: 'INV-20240101-005', idempotencyKey: 'key5',
    programId: 'prog2', programTitle: 'SEDEKAH IFTAR DI TANAH SUCI',
    amount: 50000, salutation: 'Ibu', name: 'Dewi Lestari', anonymous: true,
    phone: '081234567894', prayer: 'Semoga menjadi amal jariyah. Barakallahu fiikum.',
    paymentMethod: 'bank', bankAccountId: 'bank1',
    status: 'paid', proofStatus: 'approved', aamiinCount: 12,
    createdAt: '2024-12-12T16:00:00Z', paidAt: '2024-12-12T16:30:00Z'
  },
  {
    id: 'don6', invoice: 'INV-20240101-006', idempotencyKey: 'key6',
    programId: 'prog1', programTitle: 'Raih Pahala Berlipat di Tanah Suci',
    amount: 100000, salutation: 'Kak', name: 'Hasan Abdullah', anonymous: false,
    phone: '081234567895', prayer: 'Allahumma taqabbal minna innaka antas samiul alim.',
    paymentMethod: 'bank', bankAccountId: 'bank2',
    status: 'paid', proofStatus: 'approved', aamiinCount: 8,
    createdAt: '2024-12-11T12:00:00Z', paidAt: '2024-12-11T12:30:00Z'
  },
];

export const mockUpdates: Update[] = [
  {
    id: 'upd1', programId: 'prog1',
    title: 'Penyaluran Nasi di Masjidil Haram',
    content: 'Alhamdulillah, hari ini kami telah menyalurkan 150 kotak nasi kepada jamaah dan warga di sekitar Masjidil Haram, Makkah Al-Mukarramah. Terima kasih kepada para sahabat baik yang telah berpartisipasi.',
    imageUrl: 'https://drive.google.com/thumbnail?id=1Dqf0XAX2Oy_LE1SayNdABuzNaqBDUpyV&sz=w1600',
    createdAt: '2024-12-13T15:00:00Z',
    published: true
  },
  {
    id: 'upd2', programId: 'prog1',
    title: 'Alhamdulillah, 45 Sahabat Baik Telah Berpartisipasi',
    content: 'Alhamdulillah, program Raih Pahala Berlipat di Tanah Suci telah diikuti oleh 45 sahabat baik. Semoga Allah membalas kebaikan kalian dengan pahala yang berlipat ganda.',
    createdAt: '2024-12-10T10:00:00Z',
    published: true
  },
  {
    id: 'upd3', programId: 'prog3',
    title: 'Ikhtiar Melalui Sedekah Subuh',
    content: 'Sedekah subuh memiliki keutamaan khusus sebagai ikhtiar memohon kemudahan rezeki. Mari rutin bersedekah di waktu subuh untuk mendapatkan keberkahan.',
    createdAt: '2024-12-08T14:00:00Z',
    published: true
  }
];

export const mockGallery: GalleryItem[] = [
  { id: 'gal1', imageUrl: 'https://drive.google.com/thumbnail?id=1Dqf0XAX2Oy_LE1SayNdABuzNaqBDUpyV&sz=w1600', caption: 'Penyaluran nasi di Masjidil Haram', date: '2024-12-13' },
  { id: 'gal2', imageUrl: 'https://drive.google.com/thumbnail?id=1R7ZPTX8dCRHKdqoqMtXwQ572dy2KkcPY&sz=w1600', caption: 'Sedekah Iftar di Tanah Suci', date: '2024-12-10' },
  { id: 'gal3', imageUrl: 'https://drive.google.com/thumbnail?id=1ck28L_4uRqK_cF9qCWJnAwctjTAzf4d-&sz=w1600', caption: 'Sedekah Subuh di Baitullah', date: '2024-12-08' },
  { id: 'gal4', imageUrl: 'https://drive.google.com/thumbnail?id=1Dqf0XAX2Oy_LE1SayNdABuzNaqBDUpyV&sz=w1600', caption: 'Jamaah menerima paket nasi', date: '2024-12-05' },
  { id: 'gal5', imageUrl: 'https://drive.google.com/thumbnail?id=1R7ZPTX8dCRHKdqoqMtXwQ572dy2KkcPY&sz=w1600', caption: 'Kegiatan sedekah di Makkah', date: '2024-12-01' },
  { id: 'gal6', imageUrl: 'https://drive.google.com/thumbnail?id=1ck28L_4uRqK_cF9qCWJnAwctjTAzf4d-&sz=w1600', caption: 'Relawan Sedekah Subuh Haramain', date: '2024-11-28' },
];

export const mockTestimonials: Testimonial[] = [
  { id: 'test1', name: 'Hj. Fatimah', content: 'Alhamdulillah, platform ini sangat memudahkan saya untuk bersedekah di Tanah Suci. Prosesnya mudah, aman, dan transparan. Semoga menjadi amal jariyah.', date: '2024-12-01', active: true },
  { id: 'test2', name: 'Ustadz Ahmad', content: 'Program sedekah subuh di Baitullah sangat berkah. Penyalurannya tepat sasaran dan laporan penyaluran selalu update. Jazakumullah khairan.', date: '2024-11-25', active: true },
  { id: 'test3', name: 'Hamba Allah', content: 'Saya rutin bersedekah melalui platform ini setiap subuh. Alhamdulillah, rezeki semakin berkah. Semoga Allah membalas kebaikan semua sahabat baik.', date: '2024-11-20', active: true },
];
