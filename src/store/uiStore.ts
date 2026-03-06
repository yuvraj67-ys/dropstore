import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
    theme: 'light' | 'dark';
    isCartOpen: boolean;
    isSearchOpen: boolean;
    isMobileMenuOpen: boolean;
    toggleTheme: () => void;
    setTheme: (theme: 'light' | 'dark') => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    openSearch: () => void;
    closeSearch: () => void;
    openMobileMenu: () => void;
    closeMobileMenu: () => void;
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            theme: 'light',
            isCartOpen: false,
            isSearchOpen: false,
            isMobileMenuOpen: false,
            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                if (typeof document !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', newTheme);
                }
                return { theme: newTheme };
            }),
            setTheme: (theme) => {
                if (typeof document !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', theme);
                }
                set({ theme });
            },
            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
            toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
            openSearch: () => set({ isSearchOpen: true }),
            closeSearch: () => set({ isSearchOpen: false }),
            openMobileMenu: () => set({ isMobileMenuOpen: true }),
            closeMobileMenu: () => set({ isMobileMenuOpen: false }),
        }),
        { name: 'dropstore-ui', partialize: (state) => ({ theme: state.theme }) }
    )
);
