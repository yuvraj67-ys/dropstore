import { MOCK_PRODUCTS, MOCK_ORDERS } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import { DollarSign, ShoppingBag, Users, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
    const totalRevenue = MOCK_ORDERS.reduce((sum, o) => sum + o.pricing.total, 0);
    const totalOrders = MOCK_ORDERS.length;
    const totalProducts = MOCK_PRODUCTS.length;
    const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock < 10);

    const stats = [
        { icon: DollarSign, label: 'Revenue', value: formatPrice(totalRevenue), change: '+12%', color: 'text-success' },
        { icon: ShoppingBag, label: 'Orders', value: totalOrders.toString(), change: '+5%', color: 'text-primary' },
        { icon: Users, label: 'Users', value: '843', change: '+21%', color: 'text-warning' },
        { icon: Package, label: 'Products', value: totalProducts.toString(), change: totalProducts.toString(), color: 'text-primary' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-surface rounded-xl border border-border p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold uppercase" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                            <div className="w-9 h-9 rounded-lg bg-primary-light flex items-center justify-center">
                                <stat.icon size={18} className="text-primary" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 mt-auto">
                            <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                            <p className={`text-xs font-medium ${stat.color}`}>
                                <TrendingUp size={12} className="inline mr-1 shrink-0" />{stat.change}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Recent Orders</h2>
                        <Link href="/admin/orders" className="text-xs text-primary font-medium hover:underline">View All</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {MOCK_ORDERS.map((order) => (
                            <div key={order.orderNumber} className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--background)' }}>
                                <div>
                                    <p className="text-sm font-mono font-medium" style={{ color: 'var(--text-primary)' }}>#{order.orderNumber}</p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{order.shippingAddress.fullName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{formatPrice(order.pricing.total)}</p>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-surface rounded-xl border border-border p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Low Stock Alerts</h2>
                        <Link href="/admin/products" className="text-xs text-primary font-medium hover:underline">Manage</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        {lowStockProducts.map((product) => (
                            <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--background)' }}>
                                <AlertTriangle size={16} className={product.stock < 5 ? 'text-error' : 'text-warning'} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{product.name}</p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{product.category}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {product.stock} left
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
