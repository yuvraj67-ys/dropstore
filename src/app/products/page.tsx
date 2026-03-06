'use client';

import { Suspense } from 'react';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { CATEGORIES, SORT_OPTIONS } from '@/lib/constants';
import { SlidersHorizontal } from 'lucide-react';

function ProductsContent() {
    const searchParams = useSearchParams();
    const filterParam = searchParams.get('filter');
    const [sortBy, setSortBy] = useState('relevance');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = useMemo(() => {
        let products = [...MOCK_PRODUCTS];
        if (filterParam === 'new') products = products.filter((p) => p.isNewArrival);
        if (filterParam === 'sale') products = products.filter((p) => p.isOnSale);
        if (filterParam === 'featured') products = products.filter((p) => p.isFeatured);
        if (selectedCategory !== 'all') products = products.filter((p) => p.categorySlug === selectedCategory);
        products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
        switch (sortBy) {
            case 'price_asc': products.sort((a, b) => a.price - b.price); break;
            case 'price_desc': products.sort((a, b) => b.price - a.price); break;
            case 'newest': products.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0)); break;
            case 'best_selling': products.sort((a, b) => b.soldCount - a.soldCount); break;
            case 'top_rated': products.sort((a, b) => b.averageRating - a.averageRating); break;
        }
        return products;
    }, [sortBy, selectedCategory, priceRange, filterParam]);

    const title = filterParam === 'new' ? 'New Arrivals' : filterParam === 'sale' ? 'Deals & Offers' : filterParam === 'featured' ? 'Featured Products' : 'All Products';

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: title }]} />
            <div className="flex flex-col lg:flex-row gap-6 mt-2">
                <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-surface rounded-xl border border-border p-4 sticky top-24 space-y-5">
                        <h3 className="font-semibold text-sm" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Filters</h3>
                        <div>
                            <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Category</h4>
                            <div className="space-y-1.5">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="category" checked={selectedCategory === 'all'} onChange={() => setSelectedCategory('all')} className="accent-primary" />
                                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>All Categories</span>
                                </label>
                                {CATEGORIES.map((cat) => (
                                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="category" checked={selectedCategory === cat.slug} onChange={() => setSelectedCategory(cat.slug)} className="accent-primary" />
                                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Price Range</h4>
                            <input type="range" min={0} max={5000} step={100} value={priceRange[1]} onChange={(e) => setPriceRange([0, Number(e.target.value)])} className="w-full accent-primary" />
                            <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-muted)' }}><span>₹0</span><span>₹{priceRange[1]}</span></div>
                        </div>
                        <button onClick={() => { setSelectedCategory('all'); setPriceRange([0, 5000]); }} className="w-full py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light transition-colors">Clear Filters</button>
                    </div>
                </aside>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>{title}</h1>
                            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>{filteredProducts.length} products</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden p-2 rounded-lg border border-border hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                <SlidersHorizontal size={18} />
                            </button>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm px-3 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }}>
                                {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                            </select>
                        </div>
                    </div>
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
                            {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>No products found</p>
                            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div></div>}>
            <ProductsContent />
        </Suspense>
    );
}
