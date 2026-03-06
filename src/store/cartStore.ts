import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: string;
    name: string;
    image: string;
    price: number;
    compareAtPrice: number;
    quantity: number;
    variant?: string;
    stock: number;
}

interface CartState {
    items: CartItem[];
    couponCode: string | null;
    couponDiscount: number;
    addItem: (item: CartItem) => void;
    removeItem: (productId: string, variant?: string) => void;
    updateQuantity: (productId: string, quantity: number, variant?: string) => void;
    clearCart: () => void;
    applyCoupon: (code: string, discount: number) => void;
    removeCoupon: () => void;
    getSubtotal: () => number;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            couponCode: null,
            couponDiscount: 0,

            addItem: (newItem) => set((state) => {
                const existingIndex = state.items.findIndex(
                    (i) => i.productId === newItem.productId && i.variant === newItem.variant
                );
                if (existingIndex > -1) {
                    const updated = [...state.items];
                    updated[existingIndex].quantity = Math.min(
                        updated[existingIndex].quantity + newItem.quantity,
                        newItem.stock
                    );
                    return { items: updated };
                }
                return { items: [...state.items, newItem] };
            }),

            removeItem: (productId, variant) => set((state) => ({
                items: state.items.filter(
                    (i) => !(i.productId === productId && i.variant === variant)
                ),
            })),

            updateQuantity: (productId, quantity, variant) => set((state) => ({
                items: state.items.map((i) =>
                    i.productId === productId && i.variant === variant
                        ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
                        : i
                ),
            })),

            clearCart: () => set({ items: [], couponCode: null, couponDiscount: 0 }),

            applyCoupon: (code, discount) => set({ couponCode: code, couponDiscount: discount }),
            removeCoupon: () => set({ couponCode: null, couponDiscount: 0 }),

            getSubtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            getTotal: () => {
                const subtotal = get().getSubtotal();
                const discount = get().couponDiscount;
                const shipping = subtotal >= 499 ? 0 : 49;
                return Math.max(0, subtotal - discount + shipping);
            },
            getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
        }),
        { name: 'dropstore-cart' }
    )
);
