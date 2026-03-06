'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MapPin, CreditCard, CheckCircle, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const { items, getSubtotal, getTotal, couponCode, couponDiscount, clearCart } = useCartStore();
    const [step, setStep] = useState(1);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [address, setAddress] = useState({ fullName: '', phone: '', addressLine1: '', city: '', state: '', pincode: '' });
    const subtotal = getSubtotal();
    const total = getTotal();
    const shipping = subtotal >= 499 ? 0 : 49;

    const steps = [
        { num: 1, label: 'Address', icon: MapPin },
        { num: 2, label: 'Payment', icon: CreditCard },
        { num: 3, label: 'Review', icon: CheckCircle },
    ];

    const handlePlaceOrder = () => {
        setOrderPlaced(true);
        clearCart();
        toast.success('Order placed successfully!');
    };

    if (orderPlaced) {
        return (
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-success" />
                </div>
                <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Order Placed! 🎉</h1>
                <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>Your order has been placed successfully.</p>
                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Order #DS-{new Date().toISOString().slice(0, 10).replace(/-/g, '')}-{Math.floor(1000 + Math.random() * 9000)}</p>
                <div className="flex gap-3 justify-center">
                    <Link href="/orders" className="px-5 py-2.5 bg-primary text-white rounded-xl font-medium text-sm hover:bg-primary-hover transition-colors">View Orders</Link>
                    <Link href="/" className="px-5 py-2.5 border border-border rounded-xl font-medium text-sm hover:bg-border-light transition-colors" style={{ color: 'var(--text-primary)' }}>Continue Shopping</Link>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="max-w-lg mx-auto px-4 py-16 text-center">
                <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Your cart is empty</h1>
                <Link href="/products" className="text-primary text-sm font-medium hover:underline">Browse products →</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'Checkout' }]} />

            {/* Stepper */}
            <div className="flex items-center justify-center gap-0 mt-4 mb-8">
                {steps.map((s, i) => (
                    <div key={s.num} className="flex items-center">
                        <div className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${step >= s.num ? 'bg-primary text-white' : 'bg-border-light'}`} style={step < s.num ? { color: 'var(--text-muted)' } : undefined}>
                            <s.icon size={16} />
                            <span className="hidden sm:inline">{s.label}</span>
                        </div>
                        {i < steps.length - 1 && <ChevronRight size={16} className="mx-1" style={{ color: 'var(--text-muted)' }} />}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    {step === 1 && (
                        <div className="bg-surface rounded-2xl border border-border p-6">
                            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Delivery Address</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: 'Full Name', key: 'fullName', placeholder: 'John Doe' },
                                    { label: 'Phone', key: 'phone', placeholder: '9876543210' },
                                    { label: 'Address', key: 'addressLine1', placeholder: '123 MG Road', full: true },
                                    { label: 'City', key: 'city', placeholder: 'Jaipur' },
                                    { label: 'State', key: 'state', placeholder: 'Rajasthan' },
                                    { label: 'Pincode', key: 'pincode', placeholder: '302001' },
                                ].map((field) => (
                                    <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                                        <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            value={address[field.key as keyof typeof address]}
                                            onChange={(e) => setAddress({ ...address, [field.key]: e.target.value })}
                                            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:border-primary"
                                            style={{ color: 'var(--text-primary)' }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setStep(2)} className="mt-6 w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                                Continue to Payment →
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-surface rounded-2xl border border-border p-6">
                            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Payment Method</h2>
                            <div className="space-y-3">
                                {[
                                    { value: 'COD', label: 'Cash on Delivery', desc: 'Pay when you receive' },
                                    { value: 'Online', label: 'Pay Online', desc: 'Razorpay (UPI, Cards, Wallets)' },
                                ].map((method) => (
                                    <label key={method.value} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${paymentMethod === method.value ? 'border-primary bg-primary-light' : 'border-border hover:border-primary/50'}`}>
                                        <input type="radio" name="payment" checked={paymentMethod === method.value} onChange={() => setPaymentMethod(method.value)} className="accent-primary" />
                                        <div>
                                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{method.label}</p>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{method.desc}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setStep(1)} className="px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-border-light transition-colors" style={{ color: 'var(--text-primary)' }}>
                                    ← Back
                                </button>
                                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                                    Review Order →
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-surface rounded-2xl border border-border p-6">
                            <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Review Order</h2>
                            <div className="space-y-3 mb-4">
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.variant}`} className="flex items-center gap-3">
                                        <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative bg-border-light">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Qty: {item.quantity}{item.variant ? ` | ${item.variant}` : ''}</p>
                                        </div>
                                        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 rounded-lg mb-4" style={{ background: 'var(--background)' }}>
                                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Delivering to</p>
                                <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{address.fullName}, {address.addressLine1}, {address.city} - {address.pincode}</p>
                                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Payment: {paymentMethod === 'COD' ? 'Cash on Delivery' : 'Online Payment'}</p>
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setStep(2)} className="px-6 py-3 border border-border rounded-xl font-medium text-sm hover:bg-border-light transition-colors" style={{ color: 'var(--text-primary)' }}>
                                    ← Back
                                </button>
                                <button onClick={handlePlaceOrder} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                                    🛍️ Place Order — {formatPrice(total)}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-surface rounded-2xl border border-border p-5 sticky top-24">
                        <h3 className="text-sm font-semibold mb-3" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}><span>Subtotal ({items.length} items)</span><span>{formatPrice(subtotal)}</span></div>
                            {couponDiscount > 0 && <div className="flex justify-between text-success"><span>Discount ({couponCode})</span><span>-{formatPrice(couponDiscount)}</span></div>}
                            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span></div>
                            <div className="flex justify-between font-bold pt-2 border-t border-border" style={{ color: 'var(--text-primary)' }}><span>Total</span><span>{formatPrice(total)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
