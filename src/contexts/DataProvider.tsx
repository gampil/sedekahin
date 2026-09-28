import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ref, onValue, set, push, update, runTransaction } from 'firebase/database';
import { database, DEMO_MODE } from '../config/firebase';
import { Program, Package, Bank, Donation, Update, GalleryItem, Testimonial, Settings } from '../types';
import { mockPrograms, mockPackages, mockBanks, mockDonations, mockUpdates, mockGallery, mockTestimonials, mockSettings } from '../data/mockData';

interface DataContextType {
  programs: Program[];
  packages: Package[];
  banks: Bank[];
  donations: Donation[];
  updates: Update[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  settings: Settings;
  loading: boolean;
  getProgramBySlug: (slug: string) => Program | undefined;
  getProgramById: (id: string) => Program | undefined;
  getDonationsByProgram: (programId: string) => Donation[];
  getUpdatesByProgram: (programId: string) => Update[];
  createDonation: (donation: Omit<Donation, 'id' | 'createdAt' | 'aamiinCount' | 'status'>) => Promise<Donation>;
  incrementAamiin: (donationId: string) => Promise<number>;
  submitProof: (donationId: string, proofUrl: string) => Promise<void>;
  updateDonationStatus: (donationId: string, status: Donation['status'], paidAt?: string) => Promise<void>;
  saveProgram: (program: Partial<Program>) => Promise<string>;
  deleteProgram: (id: string) => Promise<void>;
  savePackage: (pkg: Partial<Package>) => Promise<string>;
  deletePackage: (id: string) => Promise<void>;
  saveBank: (bank: Partial<Bank>) => Promise<string>;
  deleteBank: (id: string) => Promise<void>;
  saveUpdate: (updateData: Partial<Update>) => Promise<string>;
  deleteUpdate: (id: string) => Promise<void>;
  saveGalleryItem: (item: Partial<GalleryItem>) => Promise<string>;
  deleteGalleryItem: (id: string) => Promise<void>;
  saveTestimonial: (item: Partial<Testimonial>) => Promise<string>;
  deleteTestimonial: (id: string) => Promise<void>;
  saveSettings: (settings: Partial<Settings>) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

// Demo store for when Firebase is not configured
class DemoStore {
  programs: Program[] = [...mockPrograms];
  packages: Package[] = [...mockPackages];
  banks: Bank[] = [...mockBanks];
  donations: Donation[] = [...mockDonations];
  updates: Update[] = [...mockUpdates];
  gallery: GalleryItem[] = [...mockGallery];
  testimonials: Testimonial[] = [...mockTestimonials];
  settings: Settings = { ...mockSettings };
  listeners: Set<() => void> = new Set();

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    this.listeners.forEach(fn => fn());
  }

  generateId() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  generateInvoice() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10).replace(/-/g, '');
    const seq = Math.floor(Math.random() * 999).toString().padStart(3, '0');
    return `INV-${date}-${seq}`;
  }

  addDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'aamiinCount' | 'status'>): Donation {
    const newDonation: Donation = {
      ...donation,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      aamiinCount: 0,
      status: donation.paymentMethod === 'gateway' ? 'awaiting_payment' : 'awaiting_transfer'
    };
    this.donations = [newDonation, ...this.donations];
    // Update program collected amount and donor count
    const progIdx = this.programs.findIndex(p => p.id === donation.programId);
    if (progIdx >= 0) {
      this.programs[progIdx] = {
        ...this.programs[progIdx],
        collectedAmount: this.programs[progIdx].collectedAmount + donation.amount,
        donorCount: this.programs[progIdx].donorCount + 1
      };
    }
    this.notify();
    return newDonation;
  }

  incrementAamiin(donationId: string): number {
    const idx = this.donations.findIndex(d => d.id === donationId);
    if (idx >= 0) {
      this.donations[idx] = { ...this.donations[idx], aamiinCount: this.donations[idx].aamiinCount + 1 };
      this.notify();
      return this.donations[idx].aamiinCount;
    }
    return 0;
  }

  submitProof(donationId: string, proofUrl: string) {
    const idx = this.donations.findIndex(d => d.id === donationId);
    if (idx >= 0) {
      this.donations[idx] = {
        ...this.donations[idx],
        proofUrl,
        proofStatus: 'submitted',
        proofSubmittedAt: new Date().toISOString()
      };
      this.notify();
    }
  }

  updateDonationStatus(donationId: string, status: Donation['status'], paidAt?: string) {
    const idx = this.donations.findIndex(d => d.id === donationId);
    if (idx >= 0) {
      this.donations[idx] = {
        ...this.donations[idx],
        status,
        paidAt: paidAt || this.donations[idx].paidAt,
        updatedAt: new Date().toISOString()
      };
      this.notify();
    }
  }

  saveProgram(program: Partial<Program>): string {
    if (program.id) {
      const idx = this.programs.findIndex(p => p.id === program.id);
      if (idx >= 0) {
        this.programs[idx] = { ...this.programs[idx], ...program } as Program;
      }
    } else {
      const newProgram: Program = {
        id: this.generateId(),
        title: program.title || '',
        slug: program.slug || '',
        thumbnail: program.thumbnail || '',
        coverImage: program.coverImage || '',
        shortDescription: program.shortDescription || '',
        content: program.content || '',
        targetAmount: program.targetAmount || 0,
        collectedAmount: 0,
        donorCount: 0,
        startDate: program.startDate || new Date().toISOString().slice(0, 10),
        endDate: program.endDate || '',
        status: program.status || 'draft',
        featured: program.featured || false,
        createdAt: new Date().toISOString()
      };
      this.programs = [newProgram, ...this.programs];
      this.notify();
      return newProgram.id;
    }
    this.notify();
    return program.id!;
  }

  deleteProgram(id: string) {
    this.programs = this.programs.filter(p => p.id !== id);
    this.notify();
  }

  savePackage(pkg: Partial<Package>): string {
    if (pkg.id) {
      const idx = this.packages.findIndex(p => p.id === pkg.id);
      if (idx >= 0) this.packages[idx] = { ...this.packages[idx], ...pkg } as Package;
    } else {
      const newPkg: Package = {
        id: this.generateId(),
        name: pkg.name || '',
        amount: pkg.amount || 0,
        description: pkg.description || '',
        sortOrder: pkg.sortOrder || this.packages.length + 1,
        active: pkg.active !== false
      };
      this.packages = [...this.packages, newPkg];
      this.notify();
      return newPkg.id;
    }
    this.notify();
    return pkg.id!;
  }

  deletePackage(id: string) {
    this.packages = this.packages.filter(p => p.id !== id);
    this.notify();
  }

  saveBank(bank: Partial<Bank>): string {
    if (bank.id) {
      const idx = this.banks.findIndex(b => b.id === bank.id);
      if (idx >= 0) this.banks[idx] = { ...this.banks[idx], ...bank } as Bank;
    } else {
      const newBank: Bank = {
        id: this.generateId(),
        bankName: bank.bankName || '',
        accountNumber: bank.accountNumber || '',
        accountName: bank.accountName || '',
        logoUrl: bank.logoUrl || '',
        instructions: bank.instructions || '',
        active: bank.active !== false,
        sortOrder: bank.sortOrder || this.banks.length + 1
      };
      this.banks = [...this.banks, newBank];
      this.notify();
      return newBank.id;
    }
    this.notify();
    return bank.id!;
  }

  deleteBank(id: string) {
    this.banks = this.banks.filter(b => b.id !== id);
    this.notify();
  }

  saveUpdate(updateData: Partial<Update>): string {
    if (updateData.id) {
      const idx = this.updates.findIndex(u => u.id === updateData.id);
      if (idx >= 0) this.updates[idx] = { ...this.updates[idx], ...updateData } as Update;
    } else {
      const newUpdate: Update = {
        id: this.generateId(),
        programId: updateData.programId || '',
        title: updateData.title || '',
        content: updateData.content || '',
        imageUrl: updateData.imageUrl || '',
        createdAt: new Date().toISOString(),
        published: updateData.published !== false
      };
      this.updates = [newUpdate, ...this.updates];
      this.notify();
      return newUpdate.id;
    }
    this.notify();
    return updateData.id!;
  }

  deleteUpdate(id: string) {
    this.updates = this.updates.filter(u => u.id !== id);
    this.notify();
  }

  saveGalleryItem(item: Partial<GalleryItem>): string {
    if (item.id) {
      const idx = this.gallery.findIndex(g => g.id === item.id);
      if (idx >= 0) this.gallery[idx] = { ...this.gallery[idx], ...item } as GalleryItem;
    } else {
      const newItem: GalleryItem = {
        id: this.generateId(),
        imageUrl: item.imageUrl || '',
        caption: item.caption || '',
        date: item.date || new Date().toISOString().slice(0, 10)
      };
      this.gallery = [newItem, ...this.gallery];
      this.notify();
      return newItem.id;
    }
    this.notify();
    return item.id!;
  }

  deleteGalleryItem(id: string) {
    this.gallery = this.gallery.filter(g => g.id !== id);
    this.notify();
  }

  saveTestimonial(item: Partial<Testimonial>): string {
    if (item.id) {
      const idx = this.testimonials.findIndex(t => t.id === item.id);
      if (idx >= 0) this.testimonials[idx] = { ...this.testimonials[idx], ...item } as Testimonial;
    } else {
      const newItem: Testimonial = {
        id: this.generateId(),
        name: item.name || '',
        avatarUrl: item.avatarUrl || '',
        content: item.content || '',
        date: item.date || new Date().toISOString().slice(0, 10),
        active: item.active !== false
      };
      this.testimonials = [newItem, ...this.testimonials];
      this.notify();
      return newItem.id;
    }
    this.notify();
    return item.id!;
  }

  deleteTestimonial(id: string) {
    this.testimonials = this.testimonials.filter(t => t.id !== id);
    this.notify();
  }

  saveSettings(settings: Partial<Settings>) {
    this.settings = { ...this.settings, ...settings };
    this.notify();
  }
}

const demoStore = new DemoStore();

export function DataProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>(DEMO_MODE ? mockPrograms : []);
  const [packages, setPackages] = useState<Package[]>(DEMO_MODE ? mockPackages : []);
  const [banks, setBanks] = useState<Bank[]>(DEMO_MODE ? mockBanks : []);
  const [donations, setDonations] = useState<Donation[]>(DEMO_MODE ? mockDonations : []);
  const [updates, setUpdates] = useState<Update[]>(DEMO_MODE ? mockUpdates : []);
  const [gallery, setGallery] = useState<GalleryItem[]>(DEMO_MODE ? mockGallery : []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEMO_MODE ? mockTestimonials : []);
  const [settings, setSettings] = useState<Settings>(DEMO_MODE ? mockSettings : { siteName: 'SedekahOnline', siteDescription: '', logoUrl: '', whatsapp: '', email: '', address: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEMO_MODE) {
      const unsub = demoStore.subscribe(() => {
        setPrograms([...demoStore.programs]);
        setPackages([...demoStore.packages]);
        setBanks([...demoStore.banks]);
        setDonations([...demoStore.donations]);
        setUpdates([...demoStore.updates]);
        setGallery([...demoStore.gallery]);
        setTestimonials([...demoStore.testimonials]);
        setSettings({ ...demoStore.settings });
      });
      setLoading(false);
      return unsub;
    } else {
      // Firebase listeners
      const unsubPrograms = onValue(ref(database, 'programs'), (snap) => {
        const data = snap.val();
        setPrograms(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubPackages = onValue(ref(database, 'packages'), (snap) => {
        const data = snap.val();
        setPackages(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubBanks = onValue(ref(database, 'banks'), (snap) => {
        const data = snap.val();
        setBanks(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubDonations = onValue(ref(database, 'donations'), (snap) => {
        const data = snap.val();
        setDonations(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubUpdates = onValue(ref(database, 'updates'), (snap) => {
        const data = snap.val();
        setUpdates(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubGallery = onValue(ref(database, 'gallery'), (snap) => {
        const data = snap.val();
        setGallery(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubTestimonials = onValue(ref(database, 'testimonials'), (snap) => {
        const data = snap.val();
        setTestimonials(data ? Object.entries(data).map(([id, v]) => ({ id, ...(v as any) })) : []);
      });
      const unsubSettings = onValue(ref(database, 'settings'), (snap) => {
        const data = snap.val();
        setSettings(data || { siteName: 'SedekahOnline', siteDescription: '', logoUrl: '', whatsapp: '', email: '', address: '' });
      });
      setLoading(false);
      return () => {
        unsubPrograms(); unsubPackages(); unsubBanks(); unsubDonations();
        unsubUpdates(); unsubGallery(); unsubTestimonials(); unsubSettings();
      };
    }
  }, []);

  const getProgramBySlug = useCallback((slug: string) => programs.find(p => p.slug === slug), [programs]);
  const getProgramById = useCallback((id: string) => programs.find(p => p.id === id), [programs]);
  const getDonationsByProgram = useCallback((programId: string) => donations.filter(d => d.programId === programId && d.status === 'paid'), [donations]);
  const getUpdatesByProgram = useCallback((programId: string) => updates.filter(u => u.programId === programId && u.published), [updates]);

  const createDonation = async (donationData: Omit<Donation, 'id' | 'createdAt' | 'aamiinCount' | 'status'>): Promise<Donation> => {
    if (DEMO_MODE) {
      return demoStore.addDonation(donationData);
    }
    const newRef = push(ref(database, 'donations'));
    const donation: Donation = {
      ...donationData,
      id: newRef.key!,
      createdAt: new Date().toISOString(),
      aamiinCount: 0,
      status: donationData.paymentMethod === 'gateway' ? 'awaiting_payment' : 'awaiting_transfer'
    };
    await set(newRef, donation);
    // Update program stats
    await runTransaction(ref(database, `programs/${donationData.programId}/collectedAmount`), (current) => (current || 0) + donationData.amount);
    await runTransaction(ref(database, `programs/${donationData.programId}/donorCount`), (current) => (current || 0) + 1);
    return donation;
  };

  const incrementAamiin = async (donationId: string): Promise<number> => {
    if (DEMO_MODE) {
      return demoStore.incrementAamiin(donationId);
    }
    const aamiinRef = ref(database, `donations/${donationId}/aamiinCount`);
    const result = await runTransaction(aamiinRef, (current) => (current || 0) + 1);
    return result.snapshot.val() || 0;
  };

  const submitProof = async (donationId: string, proofUrl: string) => {
    if (DEMO_MODE) {
      demoStore.submitProof(donationId, proofUrl);
      return;
    }
    await update(ref(database, `donations/${donationId}`), {
      proofUrl,
      proofStatus: 'submitted',
      proofSubmittedAt: new Date().toISOString()
    });
  };

  const updateDonationStatus = async (donationId: string, status: Donation['status'], paidAt?: string) => {
    if (DEMO_MODE) {
      demoStore.updateDonationStatus(donationId, status, paidAt);
      return;
    }
    const updates: any = { status, updatedAt: new Date().toISOString() };
    if (paidAt) updates.paidAt = paidAt;
    if (status === 'paid') updates.proofStatus = 'approved';
    if (status === 'rejected') updates.proofStatus = 'rejected';
    await update(ref(database, `donations/${donationId}`), updates);
  };

  const saveProgram = async (program: Partial<Program>): Promise<string> => {
    if (DEMO_MODE) return demoStore.saveProgram(program);
    if (program.id) {
      await update(ref(database, `programs/${program.id}`), program);
      return program.id;
    }
    const newRef = push(ref(database, 'programs'));
    await set(newRef, { ...program, collectedAmount: 0, donorCount: 0, createdAt: new Date().toISOString() });
    return newRef.key!;
  };

  const deleteProgram = async (id: string) => {
    if (DEMO_MODE) { demoStore.deleteProgram(id); return; }
    await set(ref(database, `programs/${id}`), null);
  };

  const savePackage = async (pkg: Partial<Package>): Promise<string> => {
    if (DEMO_MODE) return demoStore.savePackage(pkg);
    if (pkg.id) {
      await update(ref(database, `packages/${pkg.id}`), pkg);
      return pkg.id;
    }
    const newRef = push(ref(database, 'packages'));
    await set(newRef, pkg);
    return newRef.key!;
  };

  const deletePackage = async (id: string) => {
    if (DEMO_MODE) { demoStore.deletePackage(id); return; }
    await set(ref(database, `packages/${id}`), null);
  };

  const saveBank = async (bank: Partial<Bank>): Promise<string> => {
    if (DEMO_MODE) return demoStore.saveBank(bank);
    if (bank.id) {
      await update(ref(database, `banks/${bank.id}`), bank);
      return bank.id;
    }
    const newRef = push(ref(database, 'banks'));
    await set(newRef, bank);
    return newRef.key!;
  };

  const deleteBank = async (id: string) => {
    if (DEMO_MODE) { demoStore.deleteBank(id); return; }
    await set(ref(database, `banks/${id}`), null);
  };

  const saveUpdate = async (updateData: Partial<Update>): Promise<string> => {
    if (DEMO_MODE) return demoStore.saveUpdate(updateData);
    if (updateData.id) {
      await update(ref(database, `updates/${updateData.id}`), updateData);
      return updateData.id;
    }
    const newRef = push(ref(database, 'updates'));
    await set(newRef, { ...updateData, createdAt: new Date().toISOString() });
    return newRef.key!;
  };

  const deleteUpdate = async (id: string) => {
    if (DEMO_MODE) { demoStore.deleteUpdate(id); return; }
    await set(ref(database, `updates/${id}`), null);
  };

  const saveGalleryItem = async (item: Partial<GalleryItem>): Promise<string> => {
    if (DEMO_MODE) return demoStore.saveGalleryItem(item);
    if (item.id) {
      await update(ref(database, `gallery/${item.id}`), item);
      return item.id;
    }
    const newRef = push(ref(database, 'gallery'));
    await set(newRef, item);
    return newRef.key!;
  };

  const deleteGalleryItem = async (id: string) => {
    if (DEMO_MODE) { demoStore.deleteGalleryItem(id); return; }
    await set(ref(database, `gallery/${id}`), null);
  };

  const saveTestimonial = async (item: Partial<Testimonial>): Promise<string> => {
    if (DEMO_MODE) return demoStore.saveTestimonial(item);
    if (item.id) {
      await update(ref(database, `testimonials/${item.id}`), item);
      return item.id;
    }
    const newRef = push(ref(database, 'testimonials'));
    await set(newRef, item);
    return newRef.key!;
  };

  const deleteTestimonial = async (id: string) => {
    if (DEMO_MODE) { demoStore.deleteTestimonial(id); return; }
    await set(ref(database, `testimonials/${id}`), null);
  };

  const saveSettings = async (newSettings: Partial<Settings>) => {
    if (DEMO_MODE) { demoStore.saveSettings(newSettings); return; }
    await update(ref(database, 'settings'), newSettings);
  };

  return (
    <DataContext.Provider value={{
      programs, packages, banks, donations, updates, gallery, testimonials, settings, loading,
      getProgramBySlug, getProgramById, getDonationsByProgram, getUpdatesByProgram,
      createDonation, incrementAamiin, submitProof, updateDonationStatus,
      saveProgram, deleteProgram, savePackage, deletePackage, saveBank, deleteBank,
      saveUpdate, deleteUpdate, saveGalleryItem, deleteGalleryItem,
      saveTestimonial, deleteTestimonial, saveSettings
    }}>
      {children}
    </DataContext.Provider>
  );
}
