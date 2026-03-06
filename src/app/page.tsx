import ProductGrid from '@/components/product/ProductGrid';
import CategoryPills from '@/components/common/CategoryPills';
import { MOCK_PRODUCTS } from '@/lib/mockData';
import Link from 'next/link';
import { ArrowRight, Truck, RotateCcw, Shield, Headphones } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.isNewArrival);
  const onSale = MOCK_PRODUCTS.filter((p) => p.isOnSale);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #7C3AED 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white mb-4">
              🎉 Grand Launch Sale — Up to 50% OFF
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif", lineHeight: '1.15' }}>
              Your Brand.<br />Your Store.<br />Your Rules.
            </h1>
            <p className="text-base sm:text-lg text-white/80 mb-8" style={{ lineHeight: '1.6' }}>
              Discover amazing products at unbeatable prices. Free shipping on orders above ₹499.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-colors">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link href="/products?filter=new" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                New Arrivals
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-white/5 rounded-full hidden lg:block" />
        <div className="absolute -bottom-20 right-32 w-96 h-96 bg-white/5 rounded-full hidden lg:block" />
      </section>

      {/* Trust Badges */}
      <section className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'On orders above ₹499' },
              { icon: RotateCcw, label: 'Easy Returns', desc: '7-day return policy' },
              { icon: Shield, label: 'Secure Payment', desc: '100% secure checkout' },
              { icon: Headphones, label: '24/7 Support', desc: 'Always here to help' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Categories */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "'Sora', sans-serif", color: 'var(--text-primary)' }}>
            Shop by Category
          </h2>
          <CategoryPills />
        </section>

        {/* Hot Deals */}
        <ProductGrid products={onSale} title="🔥 Hot Deals" viewAllHref="/products?filter=sale" />

        {/* Promo Banner */}
        <section className="rounded-2xl overflow-hidden p-8 sm:p-12 relative" style={{ background: 'linear-gradient(135deg, #1E1B4B 0%, var(--primary) 100%)' }}>
          <div className="relative z-10 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              New User? Get 10% OFF
            </h3>
            <p className="text-white/70 text-sm mb-5">Use code WELCOME10 at checkout. Valid for first-time buyers only.</p>
            <Link href="/register" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary font-semibold rounded-full text-sm hover:bg-gray-100 transition-colors">
              Register Now <ArrowRight size={16} />
            </Link>
          </div>
          <div className="absolute top-5 right-5 w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute -bottom-10 right-20 w-60 h-60 bg-white/5 rounded-full" />
        </section>

        {/* New Arrivals */}
        <ProductGrid products={newArrivals} title="✨ New Arrivals" viewAllHref="/products?filter=new" />

        {/* Featured */}
        <ProductGrid products={featuredProducts} title="⭐ Featured Products" viewAllHref="/products?filter=featured" />
      </div>
    </div>
  );
}
