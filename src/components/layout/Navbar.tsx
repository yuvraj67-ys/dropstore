'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Heart, ShoppingCart, User, Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { STORE_NAME, CATEGORIES } from '@/lib/constants';

export default function Navbar() {
    const [showCategories, setShowCategories] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const { getItemCount } = useCartStore();
    const { openCart, openSearch, theme, toggleTheme } = useUIStore();
    const { isAuthenticated, user, logout } = useAuthStore();
    const itemCount = getItemCount();

    return (
        <header className="sticky top-0 z-50 bg-surface border-b border-border" style={{ boxShadow: 'var(--shadow-sm)' }}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">D</span>
                        </div>
                        <span className="text-xl font-bold hidden sm:block" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                            {STORE_NAME}
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-primary transition-colors" style={{ color: 'var(--text-primary)' }}>
                            Home
                        </Link>
                        <div className="relative" onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
                            <button className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                                Categories <ChevronDown size={14} />
                            </button>
                            {showCategories && (
                                <div className="absolute top-full left-0 mt-1 w-56 bg-surface rounded-lg border border-border py-2 animate-fadeIn" style={{ boxShadow: 'var(--shadow-lg)' }}>
                                    {CATEGORIES.map((cat) => (
                                        <Link key={cat.id} href={`/category/${cat.slug}`} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-primary-light transition-colors" style={{ color: 'var(--text-primary)' }}>
                                            <cat.icon size={16} className="text-primary" />
                                            {cat.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors" style={{ color: 'var(--text-primary)' }}>
                            Products
                        </Link>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button onClick={openSearch} className="p-2 rounded-full hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Search">
                            <Search size={20} />
                        </button>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-border-light transition-colors hidden sm:flex" style={{ color: 'var(--text-secondary)' }} aria-label="Toggle theme">
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                        <Link href="/account/wishlist" className="p-2 rounded-full hover:bg-border-light transition-colors hidden sm:flex" style={{ color: 'var(--text-secondary)' }} aria-label="Wishlist">
                            <Heart size={20} />
                        </Link>
                        <button onClick={openCart} className="p-2 rounded-full hover:bg-border-light transition-colors relative" style={{ color: 'var(--text-secondary)' }} aria-label="Cart">
                            <ShoppingCart size={20} />
                            {itemCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount > 9 ? '9+' : itemCount}
                                </span>
                            )}
                        </button>

                        {/* Account */}
                        <div className="relative hidden sm:block" onMouseEnter={() => setShowAccountMenu(true)} onMouseLeave={() => setShowAccountMenu(false)}>
                            <button className="p-2 rounded-full hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Account">
                                <User size={20} />
                            </button>
                            {showAccountMenu && (
                                <div className="absolute top-full right-0 mt-1 w-48 bg-surface rounded-lg border border-border py-2 animate-fadeIn" style={{ boxShadow: 'var(--shadow-lg)' }}>
                                    {isAuthenticated ? (
                                        <>
                                            <div className="px-4 py-2 border-b border-border">
                                                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{user?.name}</p>
                                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
                                            </div>
                                            <Link href="/account" className="block px-4 py-2 text-sm hover:bg-primary-light transition-colors" style={{ color: 'var(--text-primary)' }}>My Account</Link>
                                            <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-primary-light transition-colors" style={{ color: 'var(--text-primary)' }}>My Orders</Link>
                                            <Link href="/account/wishlist" className="block px-4 py-2 text-sm hover:bg-primary-light transition-colors" style={{ color: 'var(--text-primary)' }}>Wishlist</Link>
                                            {user?.role === 'admin' && (
                                                <Link href="/admin" className="block px-4 py-2 text-sm hover:bg-primary-light transition-colors text-primary font-medium">Admin Panel</Link>
                                            )}
                                            <button onClick={logout} className="w-full text-left px-4 py-2 text-sm hover:bg-primary-light transition-colors text-error">Logout</button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href="/login" className="block px-4 py-2 text-sm hover:bg-primary-light transition-colors" style={{ color: 'var(--text-primary)' }}>Login</Link>
                                            <Link href="/register" className="block px-4 py-2 text-sm hover:bg-primary-light transition-colors" style={{ color: 'var(--text-primary)' }}>Register</Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
