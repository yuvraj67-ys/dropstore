'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchModal() {
    const { isSearchOpen, closeSearch } = useUIStore();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(MOCK_PRODUCTS.slice(0, 4));
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query.trim()) {
                const filtered = MOCK_PRODUCTS.filter(
                    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
                );
                setResults(filtered);
            } else {
                setResults(MOCK_PRODUCTS.slice(0, 4));
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [query]);

    if (!isSearchOpen) return null;

    const trendingSearches = ['Kurti', 'Earbuds', 'Smart Watch', 'Sneakers'];

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-[70] animate-fadeIn" onClick={closeSearch} />
            <div className="fixed inset-x-0 top-0 z-[71] bg-surface animate-slideInDown" style={{ maxHeight: '85vh', boxShadow: 'var(--shadow-xl)' }}>
                <div className="max-w-2xl mx-auto p-4">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary"
                                style={{ color: 'var(--text-primary)' }}
                            />
                        </div>
                        <button onClick={closeSearch} className="p-2 rounded-full hover:bg-border-light transition-colors" style={{ color: 'var(--text-muted)' }}>
                            <X size={22} />
                        </button>
                    </div>

                    {/* Trending */}
                    {!query && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={14} className="text-primary" />
                                <span className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>Trending</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {trendingSearches.map((term) => (
                                    <button key={term} onClick={() => setQuery(term)} className="px-3 py-1.5 rounded-full text-xs font-medium border border-border hover:border-primary hover:text-primary transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                        {term}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    <div className="max-h-[50vh] overflow-y-auto space-y-2">
                        {results.length > 0 ? (
                            results.map((product) => (
                                <Link key={product.id} href={`/products/${product.slug}`} onClick={closeSearch} className="flex items-center gap-3 p-3 rounded-xl hover:bg-border-light transition-colors">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative bg-border-light">
                                        <Image src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="48px" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{product.name}</h4>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
                                    </div>
                                    <span className="text-sm font-semibold text-primary">₹{product.price}</span>
                                </Link>
                            ))
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No products found for &quot;{query}&quot;</p>
                            </div>
                        )}
                    </div>

                    {query && results.length > 0 && (
                        <Link href={`/search?q=${encodeURIComponent(query)}`} onClick={closeSearch} className="block text-center text-sm font-medium text-primary mt-3 py-2 hover:underline">
                            View all results →
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
}
