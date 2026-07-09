import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

/**
 * Floating button that appears after scrolling down and smoothly returns to top.
 */
export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 500);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary2 text-white shadow-lg shadow-primary2/30 transition-all duration-300 hover:bg-[#e07a3d] active:scale-95 ${
                visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
            }`}
        >
            <FaArrowUp />
        </button>
    );
}
