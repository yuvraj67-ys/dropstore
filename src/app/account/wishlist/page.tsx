import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
    // Demo: show first 4 products as wishlisted
    const wishlistProducts = MOCK_PRODUCTS.slice(0, 4);

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'Account', href: '/account' }, { label: 'Wishlist' }]} />
            <div className="mt-2 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>My Wishlist</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{wishlistProducts.length} items saved</p>
            </div>
            {wishlistProducts.length > 0 ? (
                <ProductGrid products={wishlistProducts} />
            ) : (
                <div className="text-center py-16">
                    <Heart size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your wishlist is empty</p>
                </div>
            )}
        </div>
    );
}
