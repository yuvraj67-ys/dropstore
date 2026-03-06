'use client';

import { X, ShoppingCart, Plus, Minus, Trash2, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CartDrawer() {
    const { items, removeItem, updateQuantity, getSubtotal, getTotal, getItemCount, couponCode, couponDiscount, applyCoupon, removeCoupon } = useCartStore();
    const { isCartOpen, closeCart } = useUIStore();
    const [couponInput, setCouponInput] = useState('');
    const subtotal = getSubtotal();
    const total = getTotal();
    const itemCount = getItemCount();
    const shipping = subtotal >= 499 ? 0 : 49;

    if (!isCartOpen) return null;

    const handleApplyCoupon = () => {
        const code = couponInput.trim().toUpperCase();
        if (code === 'WELCOME10') {
            const discount = Math.round(subtotal * 0.1);
            applyCoupon(code, discount);
            toast.success('Coupon applied! 10% off');
        } else if (code === 'SAVE50') {
            applyCoupon(code, 50);
            toast.success('Coupon applied! ₹50 off');
        } else {
            toast.error('Invalid coupon code');
        }
        setCouponInput('');
    };

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/40 z-[60] animate-fadeIn" onClick={closeCart} />

            {/* Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-surface z-[61] flex flex-col animate-slideInRight" style={{ boxShadow: 'var(--shadow-xl)' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                    <div className="flex items-center gap-2">
                        <ShoppingCart size={20} className="text-primary" />
                        <h2 className="text-lg font-semibold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                            My Cart ({itemCount})
                        </h2>
                    </div>
                    <button onClick={closeCart} className="p-2 rounded-full hover:bg-border-light transition-colors" style={{ color: 'var(--text-muted)' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                            <ShoppingCart size={48} style={{ color: 'var(--text-muted)' }} />
                            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your cart is empty</p>
                            <button onClick={closeCart} className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-hover transition-colors">
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={`${item.productId}-${item.variant}`} className="flex gap-3 p-3 rounded-xl border border-border" style={{ background: 'var(--background)' }}>
                                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative bg-border-light">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.name}</h4>
                                        {item.variant && <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.variant}</p>}
                                        <p className="text-sm font-semibold mt-1 text-primary">{formatPrice(item.price)}</p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variant)} className="p-1.5 hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)} className="p-1.5 hover:bg-border-light transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                            <button onClick={() => removeItem(item.productId, item.variant)} className="p-1.5 text-error hover:bg-red-50 rounded-lg transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-border px-5 py-4 space-y-3">
                        {/* Coupon */}
                        {!couponCode ? (
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="Coupon code"
                                        value={couponInput}
                                        onChange={(e) => setCouponInput(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background focus:outline-none focus:border-primary"
                                        style={{ color: 'var(--text-primary)' }}
                                    />
                                </div>
                                <button onClick={handleApplyCoupon} className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light transition-colors">
                                    Apply
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'var(--primary-light)' }}>
                                <span className="text-sm font-medium text-primary">🎉 {couponCode} applied</span>
                                <button onClick={removeCoupon} className="text-xs text-error font-medium">Remove</button>
                            </div>
                        )}

                        {/* Summary */}
                        <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                            </div>
                            {couponDiscount > 0 && (
                                <div className="flex justify-between text-success">
                                    <span>Discount</span><span>-{formatPrice(couponDiscount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
                                <span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold pt-2 border-t border-border" style={{ color: 'var(--text-primary)' }}>
                                <span>Total</span><span>{formatPrice(total)}</span>
                            </div>
                        </div>

                        <Link href="/checkout" onClick={closeCart} className="w-full py-3 bg-primary text-white text-center rounded-xl font-semibold hover:bg-primary-hover transition-colors block">
                            Proceed to Checkout →
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
