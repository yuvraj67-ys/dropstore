'use client';

import Link from 'next/link';
import { Home, Search, ShoppingCart, Heart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();
    const { getItemCount } = useCartStore();
    const { openSearch, openCart } = useUIStore();
    const itemCount = getItemCount();

    // Hide on admin pages
    if (pathname?.startsWith('/admin')) return null;

    const navItems = [
        { icon: Home, label: 'Home', href: '/', action: null },
        { icon: Search, label: 'Search', href: null, action: openSearch },
        { icon: ShoppingCart, label: 'Cart', href: null, action: openCart, badge: itemCount },
        { icon: Heart, label: 'Wishlist', href: '/account/wishlist', action: null },
        { icon: User, label: 'Account', href: '/account', action: null },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border md:hidden" style={{ boxShadow: '0 -2px 10px rgba(0,0,0,0.05)' }}>
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = item.href === pathname;
                    const content = (
                        <div className="flex flex-col items-center gap-0.5 relative">
                            <div className="relative">
                                <item.icon size={22} className={isActive ? 'text-primary' : ''} style={{ color: isActive ? undefined : 'var(--text-muted)' }} />
                                {item.badge ? (
                                    <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                        {item.badge > 9 ? '9+' : item.badge}
                                    </span>
                                ) : null}
                            </div>
                            <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : ''}`} style={{ color: isActive ? undefined : 'var(--text-muted)' }}>
                                {item.label}
                            </span>
                        </div>
                    );

                    if (item.action) {
                        return (
                            <button key={item.label} onClick={item.action} className="flex-1 flex justify-center py-2" style={{ minWidth: '44px', minHeight: '44px' }}>
                                {content}
                            </button>
                        );
                    }

                    return (
                        <Link key={item.label} href={item.href!} className="flex-1 flex justify-center py-2" style={{ minWidth: '44px', minHeight: '44px' }}>
                            {content}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
