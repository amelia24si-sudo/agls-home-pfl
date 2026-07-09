import { useEffect, useState } from "react";

/**
 * A thin progress bar fixed to the top of the page that reflects scroll position.
 */
export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const update = () => {
            const scrollTop = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-transparent pointer-events-none">
            <div
                className="h-full bg-primary2 shadow-[0_0_10px_rgba(255,142,41,0.6)] transition-[width] duration-150 ease-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
