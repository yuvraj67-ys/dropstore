'use client';

import { useParams } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { CATEGORIES } from '@/lib/constants';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const category = CATEGORIES.find((c) => c.slug === slug);
    const products = MOCK_PRODUCTS.filter((p) => p.categorySlug === slug);

    if (!category) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Category not found</h1>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: category.name }]} />

            {/* Category Header */}
            <div className="mb-6 mt-2 p-6 rounded-2xl" style={{ background: 'var(--primary-light)' }}>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <category.icon size={24} className="text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                            {category.name}
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{products.length} products</p>
                    </div>
                </div>
            </div>

            {products.length > 0 ? (
                <ProductGrid products={products} />
            ) : (
                <div className="text-center py-16">
                    <p className="text-lg font-medium" style={{ color: 'var(--text-secondary)' }}>No products in this category yet</p>
                </div>
            )}
        </div>
    );
}
