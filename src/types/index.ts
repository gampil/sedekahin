export interface Program {
  id: string;
  title: string;
  slug: string;
  thumbnail: string;
  coverImage: string;
  shortDescription: string;
  content: string;
  collectedAmount: number;
  donorCount: number;
  status: 'active' | 'archived' | 'draft';
  featured: boolean;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  amount: number;
  description: string;
  sortOrder: number;
  active: boolean;
}

export interface Bank {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  logoUrl: string;
  instructions: string;
  active: boolean;
  sortOrder: number;
}

export interface Donation {
  id: string;
  invoice: string;
  idempotencyKey: string;
  programId: string;
  programTitle: string;
  packageId?: string;
  packageName?: string;
  amount: number;
  salutation: string;
  name: string;
  anonymous: boolean;
  phone: string;
  email?: string;
  prayer?: string;
  paymentMethod: string;
  bankAccountId?: string;
  gatewayReference?: string;
  paymentUrl?: string;
  qrImageUrl?: string;
  status: 'pending' | 'awaiting_transfer' | 'awaiting_payment' | 'paid' | 'failed' | 'expired' | 'cancelled' | 'rejected';
  proofUrl?: string;
  proofStatus?: 'none' | 'submitted' | 'approved' | 'rejected';
  aamiinCount: number;
  createdAt: string;
  proofSubmittedAt?: string;
  paidAt?: string;
  updatedAt?: string;
}

export interface Update {
  id: string;
  programId: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  published: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatarUrl?: string;
  content: string;
  date: string;
  active: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'bank' | 'qris' | 'gateway';
  active: boolean;
  instructions?: string;
}

export interface Settings {
  siteName: string;
  siteDescription: string;
  logoUrl: string;
  whatsapp: string;
  email: string;
  address: string;
}
