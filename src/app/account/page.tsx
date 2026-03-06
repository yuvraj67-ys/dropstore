'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { MOCK_ORDERS } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/common/Breadcrumb';
import { User, MapPin, Heart, Award, Package, ChevronRight, LogOut, Settings } from 'lucide-react';

export default function AccountPage() {
    const { user, isAuthenticated, logout } = useAuthStore();

    if (!isAuthenticated) {
        return (
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
                <User size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Login to view your account</h1>
                <Link href="/login" className="inline-block mt-4 px-6 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-hover transition-colors">Login</Link>
            </div>
        );
    }

    const menuItems = [
        { icon: Package, label: 'My Orders', href: '/orders', desc: 'Track and manage your orders' },
        { icon: Heart, label: 'Wishlist', href: '/account/wishlist', desc: 'Your saved items' },
        { icon: MapPin, label: 'Addresses', href: '#', desc: 'Manage delivery addresses' },
        { icon: Award, label: 'Loyalty Points', href: '#', desc: `${user?.loyaltyPoints || 0} points available` },
        { icon: Settings, label: 'Settings', href: '#', desc: 'Account preferences' },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'My Account' }]} />

            {/* Profile Card */}
            <div className="bg-surface rounded-2xl border border-border p-6 mt-2 mb-6 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                    <h1 className="text-lg font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>{user?.name}</h1>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
                    {user?.role === 'admin' && <span className="inline-block mt-1 px-2 py-0.5 bg-primary-light text-primary text-xs font-bold rounded-full">Admin</span>}
                </div>
            </div>

            {/* Menu */}
            <div className="space-y-2">
                {menuItems.map((item) => (
                    <Link key={item.label} href={item.href} className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                            <item.icon size={18} className="text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                        </div>
                        <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                    </Link>
                ))}
                <button onClick={logout} className="w-full flex items-center gap-4 p-4 bg-surface rounded-xl border border-border hover:border-error/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                        <LogOut size={18} className="text-error" />
                    </div>
                    <div className="flex-1 text-left">
                        <p className="text-sm font-medium text-error">Logout</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sign out of your account</p>
                    </div>
                </button>
            </div>
        </div>
    );
}
