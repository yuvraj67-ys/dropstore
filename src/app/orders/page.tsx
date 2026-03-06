'use client';

import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/common/Breadcrumb';
import { MOCK_ORDERS } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import { Package, ChevronRight } from 'lucide-react';

const statusColors: Record<string, string> = {
    Placed: 'bg-blue-100 text-blue-700',
    Confirmed: 'bg-indigo-100 text-indigo-700',
    Processing: 'bg-yellow-100 text-yellow-700',
    Shipped: 'bg-orange-100 text-orange-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-4">
            <Breadcrumb items={[{ label: 'My Orders' }]} />
            <h1 className="text-xl sm:text-2xl font-bold mt-2 mb-6" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>My Orders</h1>

            {MOCK_ORDERS.length > 0 ? (
                <div className="space-y-4">
                    {MOCK_ORDERS.map((order) => (
                        <Link key={order.orderNumber} href={`/orders/${order.orderNumber}`} className="block bg-surface rounded-2xl border border-border p-4 hover:border-primary/30 transition-colors">
                            <div className="flex items-center justify-between mb-3">
                                <div>
                                    <p className="text-sm font-semibold font-mono" style={{ color: 'var(--text-primary)' }}>#{order.orderNumber}</p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                                    {order.orderStatus}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {order.items.slice(0, 3).map((item, i) => (
                                        <div key={i} className="w-10 h-10 rounded-lg overflow-hidden border-2 border-surface relative bg-border-light">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="40px" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                                </div>
                                <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatPrice(order.pricing.total)}</span>
                                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <Package size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>No orders yet</p>
                    <Link href="/products" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">Start shopping →</Link>
                </div>
            )}
        </div>
    );
}
