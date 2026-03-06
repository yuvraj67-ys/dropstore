'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) { toast.error('Please fill all required fields'); return; }
        if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
        login({ id: Date.now().toString(), name: form.name, email: form.email, role: 'customer', loyaltyPoints: 0, phone: form.phone }, 'demo-token');
        toast.success('Account created! Welcome to DropStore 🎉');
        router.push('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Create Account</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Join DropStore and start shopping</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 space-y-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Full Name *</label>
                        <div className="relative">
                            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email *</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Phone</label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="9876543210" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password *</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Confirm Password *</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">Create Account</button>
                    <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Login</Link></p>
                </form>
            </div>
        </div>
    );
}
