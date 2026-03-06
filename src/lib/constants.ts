import { Shirt, Smartphone, Home, Sparkles, Dumbbell, BookOpen, Baby, UtensilsCrossed } from 'lucide-react';

export const STORE_NAME = 'DropStore';
export const STORE_TAGLINE = 'Your Brand. Your Store. Your Rules.';

export const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY || '';

export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '#' },
];

export const CATEGORIES = [
    { id: '1', name: 'Fashion', slug: 'fashion', icon: Shirt, image: '/categories/fashion.jpg' },
    { id: '2', name: 'Electronics', slug: 'electronics', icon: Smartphone, image: '/categories/electronics.jpg' },
    { id: '3', name: 'Home & Living', slug: 'home-living', icon: Home, image: '/categories/home.jpg' },
    { id: '4', name: 'Beauty', slug: 'beauty', icon: Sparkles, image: '/categories/beauty.jpg' },
    { id: '5', name: 'Sports', slug: 'sports', icon: Dumbbell, image: '/categories/sports.jpg' },
    { id: '6', name: 'Books', slug: 'books', icon: BookOpen, image: '/categories/books.jpg' },
    { id: '7', name: 'Kids', slug: 'kids', icon: Baby, image: '/categories/kids.jpg' },
    { id: '8', name: 'Kitchen', slug: 'kitchen', icon: UtensilsCrossed, image: '/categories/kitchen.jpg' },
];

export const SORT_OPTIONS = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Newest First', value: 'newest' },
    { label: 'Best Selling', value: 'best_selling' },
    { label: 'Top Rated', value: 'top_rated' },
];

export const FOOTER_LINKS = {
    shop: [
        { label: 'All Products', href: '/products' },
        { label: 'New Arrivals', href: '/products?filter=new' },
        { label: 'Best Sellers', href: '/products?sort=best_selling' },
        { label: 'Deals & Offers', href: '/products?filter=sale' },
    ],
    account: [
        { label: 'My Account', href: '/account' },
        { label: 'My Orders', href: '/orders' },
        { label: 'Wishlist', href: '/account/wishlist' },
        { label: 'Track Order', href: '/orders' },
    ],
    info: [
        { label: 'About Us', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Shipping Policy', href: '#' },
        { label: 'Return Policy', href: '#' },
    ],
};

export const ORDER_STATUSES = [
    'Placed',
    'Confirmed',
    'Processing',
    'Shipped',
    'OutForDelivery',
    'Delivered',
] as const;

export type OrderStatus = typeof ORDER_STATUSES[number];
