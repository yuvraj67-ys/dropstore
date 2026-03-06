'use client';

import { useState } from 'react';
import { Save, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        storeName: 'DropStore',
        tagline: 'Your Brand. Your Store. Your Rules.',
        contactEmail: 'hello@dropstore.com',
        contactPhone: '+91 98765 43210',
        primaryColor: '#4F46E5',
        announcementText: 'Free shipping on orders above ₹499',
        announcementActive: true,
        freeShippingThreshold: '499',
        shippingFlatRate: '49',
    });

    const handleSave = () => toast.success('Settings saved! (Demo)');

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Store Settings</h1>
                <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">
                    <Save size={16} /> Save Changes
                </button>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Branding */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Branding</h3>
                    <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Store Name</label>
                        <input type="text" value={settings.storeName} onChange={(e) => setSettings({ ...settings, storeName: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Tagline</label>
                        <input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Primary Color</label>
                        <div className="flex items-center gap-3">
                            <input type="color" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border border-border" />
                            <input type="text" value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} className="flex-1 px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary font-mono" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Store Logo</label>
                        <label className="flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors">
                            <Upload size={18} style={{ color: 'var(--text-muted)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Upload logo (uploads to ImgBB)</span>
                            <input type="file" accept="image/*" className="hidden" />
                        </label>
                    </div>
                </div>

                {/* Contact */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Contact Info</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Email</label>
                            <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Phone</label>
                            <input type="tel" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                </div>

                {/* Announcement */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Announcement Bar</h3>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={settings.announcementActive} onChange={(e) => setSettings({ ...settings, announcementActive: e.target.checked })} className="accent-primary w-4 h-4" />
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Active</span>
                        </label>
                    </div>
                    <input type="text" value={settings.announcementText} onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                </div>

                {/* Shipping */}
                <div className="bg-surface rounded-xl border border-border p-5 space-y-4">
                    <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Shipping Config</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Free Shipping Above (₹)</label>
                            <input type="number" value={settings.freeShippingThreshold} onChange={(e) => setSettings({ ...settings, freeShippingThreshold: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>Flat Rate Shipping (₹)</label>
                            <input type="number" value={settings.shippingFlatRate} onChange={(e) => setSettings({ ...settings, shippingFlatRate: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
