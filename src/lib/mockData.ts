export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    images: { url: string; altText: string; isPrimary: boolean }[];
    category: string;
    categorySlug: string;
    tags: string[];
    price: number;
    compareAtPrice: number;
    stock: number;
    sku: string;
    variants: { name: string; options: string[] }[];
    isFeatured: boolean;
    isNewArrival: boolean;
    isOnSale: boolean;
    isActive: boolean;
    averageRating: number;
    reviewCount: number;
    soldCount: number;
}

export interface Review {
    id: string;
    productId: string;
    userName: string;
    rating: number;
    title: string;
    body: string;
    date: string;
    helpfulVotes: number;
}

export interface Order {
    orderNumber: string;
    items: { productId: string; name: string; image: string; price: number; quantity: number; variant?: string }[];
    shippingAddress: { fullName: string; phone: string; addressLine1: string; city: string; state: string; pincode: string };
    paymentMethod: string;
    orderStatus: string;
    statusHistory: { status: string; timestamp: string; note?: string }[];
    pricing: { subtotal: number; discount: number; shipping: number; total: number };
    createdAt: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1', name: 'Blue Cotton Kurti', slug: 'blue-cotton-kurti',
        description: 'Elegant blue cotton kurti with intricate embroidery work. Perfect for casual and semi-formal occasions. Made from pure cotton fabric that ensures comfort throughout the day.',
        shortDescription: 'Elegant blue cotton kurti with embroidery',
        images: [
            { url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600', altText: 'Blue Cotton Kurti', isPrimary: true },
            { url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600', altText: 'Blue Kurti Side', isPrimary: false },
        ],
        category: 'Fashion', categorySlug: 'fashion', tags: ['kurti', 'cotton', 'ethnic'], price: 499, compareAtPrice: 899, stock: 23, sku: 'DS-FK-001',
        variants: [{ name: 'Size', options: ['S', 'M', 'L', 'XL'] }],
        isFeatured: true, isNewArrival: false, isOnSale: true, isActive: true, averageRating: 4.2, reviewCount: 128, soldCount: 450,
    },
    {
        id: '2', name: 'Wireless Bluetooth Earbuds', slug: 'wireless-bluetooth-earbuds',
        description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. IPX5 water resistant.',
        shortDescription: 'Premium wireless earbuds with ANC',
        images: [
            { url: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600', altText: 'Wireless Earbuds', isPrimary: true },
        ],
        category: 'Electronics', categorySlug: 'electronics', tags: ['earbuds', 'wireless', 'bluetooth'], price: 1299, compareAtPrice: 2499, stock: 45, sku: 'DS-EL-001',
        variants: [{ name: 'Color', options: ['Black', 'White', 'Navy'] }],
        isFeatured: true, isNewArrival: true, isOnSale: true, isActive: true, averageRating: 4.5, reviewCount: 89, soldCount: 320,
    },
    {
        id: '3', name: 'Minimalist Desk Lamp', slug: 'minimalist-desk-lamp',
        description: 'Modern LED desk lamp with adjustable brightness, touch controls, and USB charging port. Perfect for home office.',
        shortDescription: 'Modern LED desk lamp with touch controls',
        images: [
            { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=600', altText: 'Desk Lamp', isPrimary: true },
        ],
        category: 'Home & Living', categorySlug: 'home-living', tags: ['lamp', 'desk', 'led'], price: 799, compareAtPrice: 1299, stock: 12, sku: 'DS-HL-001',
        variants: [{ name: 'Color', options: ['White', 'Black'] }],
        isFeatured: false, isNewArrival: true, isOnSale: false, isActive: true, averageRating: 4.0, reviewCount: 34, soldCount: 156,
    },
    {
        id: '4', name: 'Organic Face Serum', slug: 'organic-face-serum',
        description: 'Vitamin C enriched organic face serum for glowing skin. Reduces dark spots and improves skin texture.',
        shortDescription: 'Vitamin C organic face serum',
        images: [
            { url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600', altText: 'Face Serum', isPrimary: true },
        ],
        category: 'Beauty', categorySlug: 'beauty', tags: ['serum', 'organic', 'skincare'], price: 349, compareAtPrice: 599, stock: 67, sku: 'DS-BT-001',
        variants: [],
        isFeatured: true, isNewArrival: false, isOnSale: true, isActive: true, averageRating: 4.7, reviewCount: 256, soldCount: 890,
    },
    {
        id: '5', name: 'Yoga Mat Premium', slug: 'yoga-mat-premium',
        description: 'Extra thick premium yoga mat with anti-slip texture. Eco-friendly TPE material, includes carry strap.',
        shortDescription: 'Extra thick premium yoga mat',
        images: [
            { url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600', altText: 'Yoga Mat', isPrimary: true },
        ],
        category: 'Sports', categorySlug: 'sports', tags: ['yoga', 'mat', 'fitness'], price: 699, compareAtPrice: 999, stock: 34, sku: 'DS-SP-001',
        variants: [{ name: 'Color', options: ['Purple', 'Blue', 'Green', 'Pink'] }],
        isFeatured: false, isNewArrival: true, isOnSale: false, isActive: true, averageRating: 4.3, reviewCount: 67, soldCount: 234,
    },
    {
        id: '6', name: 'Men\'s Casual Sneakers', slug: 'mens-casual-sneakers',
        description: 'Lightweight and comfortable casual sneakers. Breathable mesh upper with cushioned sole.',
        shortDescription: 'Lightweight casual sneakers',
        images: [
            { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600', altText: 'Sneakers', isPrimary: true },
        ],
        category: 'Fashion', categorySlug: 'fashion', tags: ['sneakers', 'shoes', 'casual'], price: 899, compareAtPrice: 1499, stock: 56, sku: 'DS-FK-002',
        variants: [{ name: 'Size', options: ['7', '8', '9', '10', '11'] }, { name: 'Color', options: ['White', 'Black', 'Grey'] }],
        isFeatured: true, isNewArrival: false, isOnSale: true, isActive: true, averageRating: 4.1, reviewCount: 198, soldCount: 567,
    },
    {
        id: '7', name: 'Stainless Steel Water Bottle', slug: 'stainless-steel-water-bottle',
        description: 'Double-walled insulated stainless steel water bottle. Keeps drinks cold 24hrs, hot 12hrs. BPA free.',
        shortDescription: 'Insulated stainless steel bottle',
        images: [
            { url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600', altText: 'Water Bottle', isPrimary: true },
        ],
        category: 'Kitchen', categorySlug: 'kitchen', tags: ['bottle', 'steel', 'insulated'], price: 449, compareAtPrice: 799, stock: 89, sku: 'DS-KT-001',
        variants: [{ name: 'Size', options: ['500ml', '750ml', '1L'] }],
        isFeatured: false, isNewArrival: false, isOnSale: true, isActive: true, averageRating: 4.4, reviewCount: 312, soldCount: 1200,
    },
    {
        id: '8', name: 'Kids Drawing Tablet', slug: 'kids-drawing-tablet',
        description: 'LCD writing tablet for kids. 10-inch color screen, one-click erase, lightweight and durable.',
        shortDescription: 'LCD drawing tablet for kids',
        images: [
            { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600', altText: 'Drawing Tablet', isPrimary: true },
        ],
        category: 'Kids', categorySlug: 'kids', tags: ['tablet', 'drawing', 'toy'], price: 399, compareAtPrice: 699, stock: 41, sku: 'DS-KD-001',
        variants: [{ name: 'Color', options: ['Blue', 'Pink', 'Green'] }],
        isFeatured: true, isNewArrival: true, isOnSale: false, isActive: true, averageRating: 4.6, reviewCount: 87, soldCount: 345,
    },
    {
        id: '9', name: 'Portable Phone Charger', slug: 'portable-phone-charger',
        description: '20000mAh portable power bank with fast charging. Dual USB ports, LED indicator, slim design.',
        shortDescription: '20000mAh portable power bank',
        images: [
            { url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600', altText: 'Power Bank', isPrimary: true },
        ],
        category: 'Electronics', categorySlug: 'electronics', tags: ['charger', 'powerbank', 'portable'], price: 799, compareAtPrice: 1499, stock: 78, sku: 'DS-EL-002',
        variants: [{ name: 'Color', options: ['Black', 'White'] }],
        isFeatured: false, isNewArrival: false, isOnSale: true, isActive: true, averageRating: 4.3, reviewCount: 156, soldCount: 678,
    },
    {
        id: '10', name: 'Bestseller Novel Collection', slug: 'bestseller-novel-collection',
        description: 'Set of 5 bestselling fiction novels. Includes titles from award-winning authors. Perfect gift set.',
        shortDescription: 'Set of 5 bestselling novels',
        images: [
            { url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600', altText: 'Books Collection', isPrimary: true },
        ],
        category: 'Books', categorySlug: 'books', tags: ['books', 'novels', 'fiction'], price: 599, compareAtPrice: 999, stock: 25, sku: 'DS-BK-001',
        variants: [],
        isFeatured: false, isNewArrival: true, isOnSale: false, isActive: true, averageRating: 4.8, reviewCount: 45, soldCount: 189,
    },
    {
        id: '11', name: 'Smart Watch Pro', slug: 'smart-watch-pro',
        description: 'Feature-rich smartwatch with heart rate monitoring, SpO2, GPS tracking, and 7-day battery life.',
        shortDescription: 'Smart watch with health tracking',
        images: [
            { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', altText: 'Smart Watch', isPrimary: true },
        ],
        category: 'Electronics', categorySlug: 'electronics', tags: ['watch', 'smart', 'fitness'], price: 2499, compareAtPrice: 4999, stock: 19, sku: 'DS-EL-003',
        variants: [{ name: 'Color', options: ['Black', 'Silver', 'Rose Gold'] }],
        isFeatured: true, isNewArrival: true, isOnSale: true, isActive: true, averageRating: 4.4, reviewCount: 203, soldCount: 456,
    },
    {
        id: '12', name: 'Bamboo Cutting Board Set', slug: 'bamboo-cutting-board-set',
        description: 'Set of 3 premium bamboo cutting boards in different sizes. Anti-bacterial and eco-friendly.',
        shortDescription: 'Premium bamboo cutting board set',
        images: [
            { url: 'https://images.unsplash.com/photo-1594226801341-41427b4e5c22?w=600', altText: 'Cutting Board', isPrimary: true },
        ],
        category: 'Kitchen', categorySlug: 'kitchen', tags: ['kitchen', 'cutting', 'bamboo'], price: 549, compareAtPrice: 899, stock: 33, sku: 'DS-KT-002',
        variants: [],
        isFeatured: false, isNewArrival: false, isOnSale: true, isActive: true, averageRating: 4.1, reviewCount: 78, soldCount: 290,
    },
];

export const MOCK_REVIEWS: Review[] = [
    { id: 'r1', productId: '1', userName: 'Priya S.', rating: 5, title: 'Beautiful Kurti!', body: 'Amazing quality fabric and the embroidery work is stunning. Fits perfectly!', date: '2024-12-15', helpfulVotes: 24 },
    { id: 'r2', productId: '1', userName: 'Anita M.', rating: 4, title: 'Good value', body: 'Nice kurti for the price. Color is slightly different from the image but still looks great.', date: '2024-12-10', helpfulVotes: 12 },
    { id: 'r3', productId: '1', userName: 'Neha R.', rating: 4, title: 'Comfortable', body: 'Very comfortable to wear. Good for daily use. Washes well.', date: '2024-11-28', helpfulVotes: 8 },
    { id: 'r4', productId: '2', userName: 'Rahul K.', rating: 5, title: 'Best earbuds in this range', body: 'Sound quality is amazing, ANC works great. Battery easily lasts 2 days.', date: '2024-12-20', helpfulVotes: 45 },
    { id: 'r5', productId: '2', userName: 'Vikram P.', rating: 4, title: 'Very good', body: 'Comfortable fit and good bass. Slightly bulky but overall great.', date: '2024-12-18', helpfulVotes: 19 },
];

export const MOCK_ORDERS: Order[] = [
    {
        orderNumber: 'DS-20240815-7821',
        items: [
            { productId: '1', name: 'Blue Cotton Kurti', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200', price: 499, quantity: 1, variant: 'Size: M' },
            { productId: '7', name: 'Stainless Steel Water Bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200', price: 449, quantity: 2 },
        ],
        shippingAddress: { fullName: 'Rahul Sharma', phone: '9876543210', addressLine1: '123 MG Road', city: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
        paymentMethod: 'COD', orderStatus: 'Shipped',
        statusHistory: [
            { status: 'Placed', timestamp: '2024-08-15T10:30:00Z' },
            { status: 'Confirmed', timestamp: '2024-08-15T14:00:00Z' },
            { status: 'Shipped', timestamp: '2024-08-16T09:00:00Z', note: 'Shipped via DTDC' },
        ],
        pricing: { subtotal: 1397, discount: 89, shipping: 0, total: 1308 },
        createdAt: '2024-08-15T10:30:00Z',
    },
    {
        orderNumber: 'DS-20240820-4532',
        items: [
            { productId: '11', name: 'Smart Watch Pro', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', price: 2499, quantity: 1, variant: 'Color: Black' },
        ],
        shippingAddress: { fullName: 'Rahul Sharma', phone: '9876543210', addressLine1: '123 MG Road', city: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
        paymentMethod: 'COD', orderStatus: 'Delivered',
        statusHistory: [
            { status: 'Placed', timestamp: '2024-08-20T11:00:00Z' },
            { status: 'Confirmed', timestamp: '2024-08-20T13:00:00Z' },
            { status: 'Shipped', timestamp: '2024-08-21T08:00:00Z' },
            { status: 'Delivered', timestamp: '2024-08-23T16:00:00Z' },
        ],
        pricing: { subtotal: 2499, discount: 0, shipping: 0, total: 2499 },
        createdAt: '2024-08-20T11:00:00Z',
    },
];
