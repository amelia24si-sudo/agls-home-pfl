import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into the viewport using IntersectionObserver.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15] Portion of the element that must be visible.
 * @param {string} [options.rootMargin="0px 0px -10% 0px"] Margin around the root.
 * @param {boolean} [options.once=true] Reveal only the first time it enters the viewport.
 * @returns {[React.RefObject, boolean]} A ref to attach and whether the element is visible.
 */
export function useScrollReveal({
    threshold = 0.15,
    rootMargin = "0px 0px -10% 0px",
    once = true,
} = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.unobserve(entry.target);
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin, once]);

    return [ref, isVisible];
}

export default useScrollReveal;
