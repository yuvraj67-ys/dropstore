'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Search } from 'lucide-react';

function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const results = MOCK_PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) || p.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: `Search: "${query}"` }]} />
            <div className="mt-2 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                    {results.length > 0 ? `Results for "${query}"` : `No results for "${query}"`}
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{results.length} products found</p>
            </div>
            {results.length > 0 ? (
                <ProductGrid products={results} />
            ) : (
                <div className="text-center py-16">
                    <Search size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Try searching for something else</p>
                </div>
            )}
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div></div>}>
            <SearchContent />
        </Suspense>
    );
}
