import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useData } from '../../contexts/DataProvider';
import { useToast } from '../../components/Toast';
import { generateSlug } from '../../utils/helpers';
import { ArrowLeft, Loader2, Save } from 'lucide-react';

export default function AdminProgramForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { programs, saveProgram } = useData();
  const { showToast } = useToast();
  const isEdit = !!id;
  const existing = id ? programs.find(p => p.id === id) : null;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'active' | 'archived' | 'draft'>('draft');
  const [featured, setFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setSlug(existing.slug);
      setThumbnail(existing.thumbnail);
      setShortDescription(existing.shortDescription);
      setContent(existing.content);
      setStatus(existing.status);
      setFeatured(existing.featured);
    }
  }, [existing]);

  useEffect(() => {
    if (!slugManual && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManual]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    try {
      await saveProgram({
        id: isEdit ? id : undefined,
        title,
        slug,
        thumbnail,
        coverImage: thumbnail,
        shortDescription,
        content,
        status,
        featured
      });
      showToast(isEdit ? 'Campaign berhasil diperbarui' : 'Campaign berhasil dibuat', 'success');
      navigate('/admin/programs');
    } catch {
      showToast('Gagal menyimpan campaign', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/programs" className="text-[#6B7280] hover:text-[#172033]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[#172033]">{isEdit ? 'Edit Campaign' : 'Tambah Campaign'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Judul *</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Slug</label>
          <div className="flex items-center gap-2">
            <input type="text" value={slug} onChange={e => { setSlug(e.target.value); setSlugManual(true); }} className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" />
            <button type="button" onClick={() => { setSlugManual(false); setSlug(generateSlug(title)); }} className="px-3 py-3 border border-gray-200 rounded-lg text-sm text-[#6B7280] hover:bg-gray-50">Auto</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">URL Thumbnail</label>
          <input type="url" value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="https://..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]" />
          {thumbnail && <img src={thumbnail} alt="Preview" className="mt-2 w-32 h-20 object-cover rounded-lg" />}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Deskripsi Singkat</label>
          <textarea value={shortDescription} onChange={e => setShortDescription(e.target.value)} rows={2} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0] resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#172033] mb-1.5">Konten (HTML)</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} rows={8} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0] font-mono text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#172033] mb-1.5">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1769E0]">
              <option value="draft">Draft</option>
              <option value="active">Aktif</option>
              <option value="archived">Arsip</option>
            </select>
          </div>
          <div className="flex items-center gap-2 pt-7">
            <input type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)} className="w-4 h-4 rounded" />
            <label htmlFor="featured" className="text-sm text-[#172033]">Tampilkan sebagai unggulan</label>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Link to="/admin/programs" className="flex-1 border border-gray-200 py-3 rounded-lg text-center font-medium text-[#6B7280] hover:bg-gray-50">Batal</Link>
          <button type="submit" disabled={saving} className="flex-1 bg-[#1769E0] text-white py-3 rounded-lg font-semibold hover:bg-[#1057BE] disabled:opacity-50 flex items-center justify-center gap-2">
            {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : <><Save className="w-4 h-4" /> Simpan</>}
          </button>
        </div>
      </form>
    </div>
  );
}
