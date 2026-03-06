import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav className="flex items-center gap-1.5 text-sm py-3 overflow-x-auto hide-scrollbar">
            <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                <Home size={14} />
                <span>Home</span>
            </Link>
            {items.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
                    <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
                    {item.href ? (
                        <Link href={item.href} className="hover:text-primary transition-colors" style={{ color: 'var(--text-muted)' }}>{item.label}</Link>
                    ) : (
                        <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{item.label}</span>
                    )}
                </span>
            ))}
        </nav>
    );
}
