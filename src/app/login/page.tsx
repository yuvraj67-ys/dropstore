'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuthStore();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo login
        if (email === 'admin@dropstore.com' && password === 'admin123') {
            login({ id: '1', name: 'Admin', email, role: 'admin', loyaltyPoints: 0 }, 'demo-token');
            toast.success('Welcome back, Admin!');
            router.push('/admin');
        } else if (email && password) {
            login({ id: '2', name: email.split('@')[0], email, role: 'customer', loyaltyPoints: 150 }, 'demo-token');
            toast.success('Login successful!');
            router.push('/');
        } else {
            toast.error('Please fill all fields');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-white font-bold text-lg">D</span>
                    </div>
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Welcome Back</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Login to your DropStore account</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 space-y-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Password</label>
                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}>
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="accent-primary" />
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">Forgot Password?</Link>
                    </div>
                    <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                        Login
                    </button>
                    <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Don&apos;t have an account? <Link href="/register" className="text-primary font-medium hover:underline">Register</Link>
                    </p>
                </form>

                <div className="mt-4 p-3 rounded-xl text-center" style={{ background: 'var(--primary-light)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        Demo Admin: <span className="font-mono text-primary">admin@dropstore.com / admin123</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
