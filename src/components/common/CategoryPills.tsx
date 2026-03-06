'use client';

import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export default function CategoryPills() {
    return (
        <div className="flex gap-3 overflow-x-auto hide-scrollbar py-2 px-1">
            {CATEGORIES.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`} className="flex flex-col items-center gap-2 min-w-[72px] group">
                    <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300" style={{ color: 'var(--primary)' }}>
                        <cat.icon size={24} />
                    </div>
                    <span className="text-xs font-medium text-center whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                </Link>
            ))}
        </div>
    );
}
