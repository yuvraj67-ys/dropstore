'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MOCK_ORDERS } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import { ORDER_STATUSES } from '@/lib/constants';
import { CheckCircle, Circle, Package } from 'lucide-react';

export default function OrderDetailPage() {
    const params = useParams();
    const orderNumber = params.orderNumber as string;
    const order = MOCK_ORDERS.find((o) => o.orderNumber === orderNumber);

    if (!order) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-16 text-center">
                <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Order not found</h1>
            </div>
        );
    }

    const activeStepIndex = ORDER_STATUSES.indexOf(order.orderStatus as any);

    return (
        <div className="max-w-3xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'Orders', href: '/orders' }, { label: `#${order.orderNumber}` }]} />

            <div className="mt-2 bg-surface rounded-2xl border border-border p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-lg font-bold font-mono" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
                            #{order.orderNumber}
                        </h1>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <span className="text-sm font-bold text-primary">{formatPrice(order.pricing.total)}</span>
                </div>

                {/* Status Stepper */}
                <div className="mb-8">
                    <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Order Status</h3>
                    <div className="flex items-center justify-between">
                        {ORDER_STATUSES.map((status, i) => {
                            const isCompleted = i <= activeStepIndex;
                            const isCurrent = i === activeStepIndex;
                            return (
                                <div key={status} className="flex flex-col items-center flex-1 relative">
                                    {i > 0 && (
                                        <div className={`absolute top-3 right-1/2 h-0.5 w-full ${i <= activeStepIndex ? 'bg-primary' : 'bg-border'}`} style={{ zIndex: 0 }} />
                                    )}
                                    <div className="relative z-10">
                                        {isCompleted ? (
                                            <CheckCircle size={24} className={`${isCurrent ? 'text-primary' : 'text-success'}`} />
                                        ) : (
                                            <Circle size={24} style={{ color: 'var(--border)' }} />
                                        )}
                                    </div>
                                    <span className={`text-[10px] mt-1 font-medium text-center ${isCompleted ? 'text-primary' : ''}`} style={!isCompleted ? { color: 'var(--text-muted)' } : undefined}>
                                        {status.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Items */}
                <div className="mb-6">
                    <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>Items Ordered</h3>
                    <div className="space-y-3">
                        {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'var(--background)' }}>
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
                </div>

                {/* Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ background: 'var(--background)' }}>
                        <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Delivery Address</h4>
                        <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{order.shippingAddress.fullName}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{order.shippingAddress.addressLine1}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{order.shippingAddress.phone}</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ background: 'var(--background)' }}>
                        <h4 className="text-xs font-semibold uppercase mb-2" style={{ color: 'var(--text-muted)' }}>Order Summary</h4>
                        <div className="space-y-1 text-sm">
                            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}><span>Subtotal</span><span>{formatPrice(order.pricing.subtotal)}</span></div>
                            {order.pricing.discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(order.pricing.discount)}</span></div>}
                            <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}><span>Shipping</span><span>{order.pricing.shipping === 0 ? 'Free' : formatPrice(order.pricing.shipping)}</span></div>
                            <div className="flex justify-between font-bold pt-1 border-t border-border" style={{ color: 'var(--text-primary)' }}><span>Total</span><span>{formatPrice(order.pricing.total)}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
