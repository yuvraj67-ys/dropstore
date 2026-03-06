'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/uiStore';

export default function ThemeInitializer() {
    const { theme } = useUIStore();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return null;
}
