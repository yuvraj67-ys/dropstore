'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (
        <div className="relative bg-primary text-white text-center text-sm py-2 px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p className="font-medium">
                🚚 Free shipping on orders above ₹499 | Use code <span className="font-bold">WELCOME10</span> for 10% off!
            </p>
            <button
                onClick={() => setVisible(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                aria-label="Dismiss announcement"
            >
                <X size={16} />
            </button>
        </div>
    );
}
