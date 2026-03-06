'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import type { Product } from '@/lib/mockData';

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCartStore();
    const discount = getDiscountPercentage(product.price, product.compareAtPrice);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            productId: product.id,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            quantity: 1,
            stock: product.stock,
        });
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <Link href={`/products/${product.slug}`} className="group block">
            <div className="bg-surface rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30" style={{ boxShadow: 'var(--shadow-xs)' }}>
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-border-light">
                    <Image
                        src={product.images[0].url}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {discount > 0 && (
                            <span className="bg-error text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{discount}% OFF</span>
                        )}
                        {product.isNewArrival && (
                            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
                        )}
                        {product.stock === 0 && (
                            <span className="bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">SOLD OUT</span>
                        )}
                    </div>
                    {/* Wishlist */}
                    <button
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toast.success('Added to wishlist'); }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                    >
                        <Heart size={16} className="text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                    {/* Quick Add */}
                    {product.stock > 0 && (
                        <button
                            onClick={handleAddToCart}
                            className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-hover shadow-lg transform translate-y-2 group-hover:translate-y-0"
                        >
                            <ShoppingCart size={16} />
                        </button>
                    )}
                </div>

                {/* Info */}
                <div className="p-3">
                    <p className="text-[11px] font-medium uppercase tracking-wide mb-0.5" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
                    <h3 className="text-sm font-medium truncate mb-1" style={{ color: 'var(--text-primary)' }}>{product.name}</h3>
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-1.5">
                        <Star size={12} className="fill-warning text-warning" />
                        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{product.averageRating}</span>
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>({product.reviewCount})</span>
                    </div>
                    {/* Price */}
                    <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.compareAtPrice > product.price && (
                            <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>{formatPrice(product.compareAtPrice)}</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
