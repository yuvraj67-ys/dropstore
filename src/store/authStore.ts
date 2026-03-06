import { create } from 'zustand';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    phone?: string;
    loyaltyPoints: number;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    login: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
    logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
    updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null,
    })),
}));
