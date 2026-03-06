import { MOCK_ORDERS } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

const statusColors: Record<string, string> = {
    Placed: 'bg-blue-100 text-blue-700',
    Confirmed: 'bg-indigo-100 text-indigo-700',
    Shipped: 'bg-orange-100 text-orange-700',
    Delivered: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrdersPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Orders</h1>
            <div className="bg-surface rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border" style={{ background: 'var(--background)' }}>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Order</th>
                                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>Customer</th>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Total</th>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Payment</th>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Status</th>
                                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ORDERS.map((order) => (
                                <tr key={order.orderNumber} className="border-b border-border hover:bg-border-light transition-colors">
                                    <td className="px-4 py-3 font-mono font-medium" style={{ color: 'var(--text-primary)' }}>#{order.orderNumber}</td>
                                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>{order.shippingAddress.fullName}</td>
                                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{formatPrice(order.pricing.total)}</td>
                                    <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{order.paymentMethod}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell" style={{ color: 'var(--text-muted)' }}>
                                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
