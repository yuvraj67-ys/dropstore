'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingBag, Users, Tags, Ticket, Settings, LogOut, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingBag, label: 'Orders', href: '/admin/orders' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Tags, label: 'Categories', href: '/admin/categories' },
    { icon: Ticket, label: 'Coupons', href: '/admin/coupons' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated } = useAuthStore();
    const [collapsed, setCollapsed] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            router.push('/login');
        } else {
            setIsAuthorized(true);
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthorized) return null; // Avoid flashing the layout before redirecting


    return (
        <div className="flex min-h-[calc(100vh-64px)]">
            {/* Sidebar */}
            <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-surface border-r border-border flex-shrink-0 hidden md:flex flex-col transition-all duration-300`}>
                <div className="p-3 flex items-center justify-between border-b border-border">
                    {!collapsed && <span className="text-sm font-bold text-primary" style={{ fontFamily: "'Sora', sans-serif" }}>Admin Panel</span>}
                    <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-border-light transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <ChevronLeft size={16} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
                    </button>
                </div>
                <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                        return (
                            <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'hover:bg-border-light'}`} style={!isActive ? { color: 'var(--text-secondary)' } : undefined} title={collapsed ? item.label : undefined}>
                                <item.icon size={18} className="shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-2 border-t border-border">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-border-light transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <LogOut size={18} />
                        {!collapsed && <span>Back to Store</span>}
                    </Link>
                </div>
            </aside>

            {/* Mobile admin nav */}
            <div className="md:hidden fixed bottom-16 left-0 right-0 z-40 bg-surface border-t border-border overflow-x-auto hide-scrollbar">
                <div className="flex">
                    {menuItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.label} href={item.href} className={`flex flex-col items-center gap-0.5 px-4 py-2 min-w-[64px] ${isActive ? 'text-primary' : ''}`} style={!isActive ? { color: 'var(--text-muted)' } : undefined}>
                                <item.icon size={18} />
                                <span className="text-[9px] font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 overflow-y-auto" style={{ background: 'var(--background)' }}>
                {children}
            </main>
        </div>
    );
}
