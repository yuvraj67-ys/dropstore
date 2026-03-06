import ProductCard from './ProductCard';
import type { Product } from '@/lib/mockData';

export default function ProductGrid({ products, title, viewAllHref }: { products: Product[]; title?: string; viewAllHref?: string }) {
    return (
        <section>
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>{title}</h2>
                    {viewAllHref && (
                        <a href={viewAllHref} className="text-sm font-medium text-primary hover:underline">View All →</a>
                    )}
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
