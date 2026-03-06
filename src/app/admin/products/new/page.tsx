'use client';

import { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import toast from 'react-hot-toast';

export default function NewProductPage() {
    const [form, setForm] = useState({
        name: '', description: '', category: '', price: '', compareAtPrice: '', costPrice: '', stock: '', sku: '',
        supplierUrl: '', supplierPlatform: 'Meesho',
        isFeatured: false, isNewArrival: false, isOnSale: false,
    });
    const [images, setImages] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploading(true);
        for (const file of Array.from(files)) {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
                if (!apiKey) { toast.error('ImgBB API key not set'); setUploading(false); return; }
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, { method: 'POST', body: formData });
                const data = await res.json();
                if (data.success) {
                    setImages((prev) => [...prev, data.data.url]);
                    toast.success('Image uploaded!');
                } else {
                    toast.error('Upload failed');
                }
            } catch {
                toast.error('Upload error');
            }
        }
        setUploading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Product created! (Demo)');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Add New Product</h1>

            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                {/* Images */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Product Images</h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                        {images.map((url, i) => (
                            <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border group">
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <button onClick={() => setImages(images.filter((_, j) => j !== i))} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                        <label className={`w-24 h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors ${uploading ? 'animate-pulse' : ''}`}>
                            <Upload size={20} style={{ color: 'var(--text-muted)' }} />
                            <span className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{uploading ? 'Uploading...' : 'Upload'}</span>
                            <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" disabled={uploading} />
                        </label>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Images uploaded to ImgBB CDN. Max 5MB per file.</p>
                </div>

                {/* Basic Info */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Basic Info</h3>
                    {[
                        { label: 'Product Name', key: 'name', placeholder: 'Blue Cotton Kurti' },
                        { label: 'Description', key: 'description', placeholder: 'Detailed product description...', textarea: true },
                        { label: 'SKU', key: 'sku', placeholder: 'DS-FK-001' },
                    ].map((field) => (
                        <div key={field.key}>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                            {field.textarea ? (
                                <textarea value={form[field.key as keyof typeof form] as string} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} rows={4} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary resize-none" style={{ color: 'var(--text-primary)' }} />
                            ) : (
                                <input type="text" value={form[field.key as keyof typeof form] as string} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                            )}
                        </div>
                    ))}
                    <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Category</label>
                        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }}>
                            <option value="">Select category</option>
                            {CATEGORIES.map((cat) => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Pricing & Stock</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                            { label: 'Selling Price (₹)', key: 'price' },
                            { label: 'Compare Price (₹)', key: 'compareAtPrice' },
                            { label: 'Cost Price (₹)', key: 'costPrice' },
                            { label: 'Stock', key: 'stock' },
                        ].map((field) => (
                            <div key={field.key}>
                                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                                <input type="number" value={form[field.key as keyof typeof form] as string} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Supplier */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Supplier Info (Private)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Platform</label>
                            <select value={form.supplierPlatform} onChange={(e) => setForm({ ...form, supplierPlatform: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }}>
                                <option>Meesho</option><option>GlowRoad</option><option>IndiaMART</option><option>Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Supplier URL</label>
                            <input type="url" value={form.supplierUrl} onChange={(e) => setForm({ ...form, supplierUrl: e.target.value })} placeholder="https://meesho.com/..." className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                </div>

                {/* Flags */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Product Flags</h3>
                    <div className="flex flex-wrap gap-4">
                        {[
                            { key: 'isFeatured', label: 'Featured' },
                            { key: 'isNewArrival', label: 'New Arrival' },
                            { key: 'isOnSale', label: 'On Sale' },
                        ].map((flag) => (
                            <label key={flag.key} className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={form[flag.key as keyof typeof form] as boolean} onChange={(e) => setForm({ ...form, [flag.key]: e.target.checked })} className="accent-primary w-4 h-4" />
                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{flag.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                    Create Product
                </button>
            </form>
        </div>
    );
}
