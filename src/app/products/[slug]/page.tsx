'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Minus, Plus, Truck, RotateCcw, Shield, ChevronRight } from 'lucide-react';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '@/lib/mockData';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'shipping'>('description');
    const { addItem } = useCartStore();

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Product not found</h1>
            </div>
        );
    }

    const discount = getDiscountPercentage(product.price, product.compareAtPrice);
    const reviews = MOCK_REVIEWS.filter((r) => r.productId === product.id);
    const relatedProducts = MOCK_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
    const variantString = Object.entries(selectedVariants).map(([k, v]) => `${k}: ${v}`).join(', ');

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            quantity,
            variant: variantString || undefined,
            stock: product.stock,
        });
        toast.success('Added to cart!');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-4">
            <Breadcrumb items={[
                { label: product.category, href: `/category/${product.categorySlug}` },
                { label: product.name },
            ]} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                {/* Image Gallery */}
                <div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-border-light mb-3">
                        <Image
                            src={product.images[selectedImage]?.url || product.images[0].url}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                        {discount > 0 && (
                            <span className="absolute top-3 left-3 bg-error text-white text-xs font-bold px-3 py-1 rounded-full">
                                {discount}% OFF
                            </span>
                        )}
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-2">
                            {product.images.map((img, i) => (
                                <button key={i} onClick={() => setSelectedImage(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${i === selectedImage ? 'border-primary' : 'border-border'}`}>
                                    <Image src={img.url} alt={img.altText} width={64} height={64} className="object-cover w-full h-full" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
                    <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} className={star <= Math.round(product.averageRating) ? 'fill-warning text-warning' : ''} style={star > Math.round(product.averageRating) ? { color: 'var(--border)' } : undefined} />
                            ))}
                        </div>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {product.averageRating} ({product.reviewCount} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                        {product.compareAtPrice > product.price && (
                            <>
                                <span className="text-lg line-through" style={{ color: 'var(--text-muted)' }}>{formatPrice(product.compareAtPrice)}</span>
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">Save {formatPrice(product.compareAtPrice - product.price)}</span>
                            </>
                        )}
                    </div>

                    {/* Variants */}
                    {product.variants.map((variant) => (
                        <div key={variant.name} className="mb-4">
                            <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                                {variant.name}: <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>{selectedVariants[variant.name] || 'Select'}</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {variant.options.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.name]: opt }))}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${selectedVariants[variant.name] === opt ? 'border-primary bg-primary-light text-primary' : 'border-border hover:border-primary'}`}
                                        style={selectedVariants[variant.name] !== opt ? { color: 'var(--text-secondary)' } : undefined}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Quantity */}
                    <div className="mb-6">
                        <p className="text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>Quantity</p>
                        <div className="flex items-center gap-1 border border-border rounded-xl w-fit overflow-hidden">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                <Minus size={16} />
                            </button>
                            <span className="w-12 text-center font-semibold" style={{ color: 'var(--text-primary)' }}>{quantity}</span>
                            <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3 hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                <Plus size={16} />
                            </button>
                        </div>
                        <p className="text-xs mt-1" style={{ color: product.stock < 5 ? 'var(--error)' : 'var(--text-muted)' }}>
                            {product.stock < 5 ? `Only ${product.stock} left!` : `${product.stock} in stock`}
                        </p>
                    </div>

                    {/* Add to Cart */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart size={18} />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button className="w-14 flex items-center justify-center rounded-xl border border-border hover:border-primary hover:text-primary transition-colors" style={{ color: 'var(--text-muted)' }}>
                            <Heart size={20} />
                        </button>
                    </div>

                    {/* Trust */}
                    <div className="space-y-2.5 p-4 rounded-xl" style={{ background: 'var(--background)' }}>
                        {[
                            { icon: Truck, text: 'Free Delivery above ₹499' },
                            { icon: RotateCcw, text: '7-Day Easy Returns' },
                            { icon: Shield, text: 'Secure Payments' },
                        ].map((item) => (
                            <div key={item.text} className="flex items-center gap-2">
                                <item.icon size={16} className="text-success" />
                                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-12">
                <div className="flex border-b border-border gap-2 sm:gap-6 overflow-x-auto hide-scrollbar">
                    {(['description', 'reviews', 'shipping'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 sm:px-5 py-3 text-sm font-medium border-b-2 transition-colors capitalize whitespace-nowrap ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent'}`}
                            style={activeTab !== tab ? { color: 'var(--text-muted)' } : undefined}
                        >
                            {tab === 'reviews' ? `Reviews (${reviews.length})` : tab}
                        </button>
                    ))}
                </div>
                <div className="py-6">
                    {activeTab === 'description' && (
                        <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{product.description}</p>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="flex flex-col gap-4 max-w-2xl">
                            {reviews.length > 0 ? reviews.map((review) => (
                                <div key={review.id} className="p-4 rounded-xl border border-border">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} size={13} className={s <= review.rating ? 'fill-warning text-warning' : ''} style={s > review.rating ? { color: 'var(--border)' } : undefined} />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{review.userName}</span>
                                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{review.date}</span>
                                    </div>
                                    <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{review.title}</h4>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{review.body}</p>
                                </div>
                            )) : (
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No reviews yet.</p>
                            )}
                        </div>
                    )}
                    {activeTab === 'shipping' && (
                        <div className="text-sm flex flex-col gap-2 max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                            <p>• Free shipping on orders above ₹499</p>
                            <p>• Standard delivery: 5-7 business days</p>
                            <p>• Express delivery available at checkout</p>
                            <p>• We ship to all major cities in India</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="mt-8 mb-8">
                    <ProductGrid products={relatedProducts} title="You May Also Like" />
                </div>
            )}
        </div>
    );
}
