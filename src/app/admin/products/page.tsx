'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import { formatPrice } from '@/lib/utils';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminProductsPage() {
    const [search, setSearch] = useState('');
    const products = MOCK_PRODUCTS.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>Products</h1>
                <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors">
                    <Plus size={16} /> Add Product
                </Link>
            </div>

            {/* Search */}
            <div className="relative mb-4 max-w-md">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
                <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:border-primary" style={{ color: 'var(--text-primary)' }} />
            </div>

            {/* Table */}
            <div className="bg-surface rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border" style={{ background: 'var(--background)' }}>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Product</th>
                                <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell" style={{ color: 'var(--text-muted)' }}>Category</th>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Price</th>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Stock</th>
                                <th className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Status</th>
                                <th className="text-right px-4 py-3 font-semibold" style={{ color: 'var(--text-muted)' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-b border-border hover:bg-border-light transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative bg-border-light">
                                                <Image src={product.images[0].url} alt={product.name} fill className="object-cover" sizes="40px" />
                                            </div>
                                            <span className="font-medium truncate max-w-[180px]" style={{ color: 'var(--text-primary)' }}>{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'var(--text-secondary)' }}>{product.category}</td>
                                    <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-primary)' }}>{formatPrice(product.price)}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.stock === 0 ? 'bg-red-100 text-red-700' : product.stock < 10 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {product.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 rounded-lg hover:bg-border-light transition-colors" style={{ color: 'var(--text-muted)' }}><Edit size={14} /></button>
                                            <button className="p-2 rounded-lg hover:bg-red-50 text-error transition-colors"><Trash2 size={14} /></button>
                                        </div>
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
