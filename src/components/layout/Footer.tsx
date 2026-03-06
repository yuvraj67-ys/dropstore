import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { STORE_NAME, FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-border mt-auto pb-20 md:pb-0">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">D</span>
                            </div>
                            <span className="text-lg font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                                {STORE_NAME}
                            </span>
                        </div>
                        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            Your one-stop shop for quality products at unbeatable prices. Shop with confidence.
                        </p>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-9 h-9 rounded-full bg-border-light flex items-center justify-center hover:bg-primary hover:text-white transition-all" style={{ color: 'var(--text-muted)' }}>
                                <Instagram size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-border-light flex items-center justify-center hover:bg-primary hover:text-white transition-all" style={{ color: 'var(--text-muted)' }}>
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-9 h-9 rounded-full bg-border-light flex items-center justify-center hover:bg-primary hover:text-white transition-all" style={{ color: 'var(--text-muted)' }}>
                                <Twitter size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Shop</h3>
                        <ul className="space-y-2.5">
                            {FOOTER_LINKS.shop.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Account Links */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Account</h3>
                        <ul className="space-y-2.5">
                            {FOOTER_LINKS.account.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Newsletter</h3>
                        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
                            Get the latest deals and updates
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary transition-colors"
                                style={{ color: 'var(--text-primary)' }}
                            />
                            <button className="px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                                <Mail size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        © 2025 {STORE_NAME}. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-xs hover:text-primary transition-colors" style={{ color: 'var(--text-muted)' }}>Privacy</Link>
                        <Link href="#" className="text-xs hover:text-primary transition-colors" style={{ color: 'var(--text-muted)' }}>Terms</Link>
                        <Link href="#" className="text-xs hover:text-primary transition-colors" style={{ color: 'var(--text-muted)' }}>Refund</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
