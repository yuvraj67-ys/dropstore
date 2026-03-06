'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) { toast.error('Please enter your email'); return; }
        setSent(true);
        toast.success('Password reset link sent! (Demo)');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Reset Password</h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {sent ? 'Check your email for the reset link' : 'Enter your email to get a reset link'}
                    </p>
                </div>
                {!sent ? (
                    <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-6 space-y-4" style={{ boxShadow: 'var(--shadow-sm)' }}>
                        <div>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
                            </div>
                        </div>
                        <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                            Send Reset Link
                        </button>
                        <Link href="/login" className="flex items-center justify-center gap-1 text-sm text-primary font-medium hover:underline">
                            <ArrowLeft size={14} /> Back to Login
                        </Link>
                    </form>
                ) : (
                    <div className="bg-surface rounded-2xl border border-border p-6 text-center" style={{ boxShadow: 'var(--shadow-sm)' }}>
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail size={28} className="text-success" />
                        </div>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                            We&apos;ve sent a password reset link to <strong>{email}</strong>
                        </p>
                        <Link href="/login" className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline">
                            <ArrowLeft size={14} /> Back to Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
