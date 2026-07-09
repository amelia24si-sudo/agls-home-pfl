import { useScrollReveal } from "../../hooks/useScrollReveal";

const hiddenByDirection = {
    up: "opacity-0 translate-y-10",
    down: "opacity-0 -translate-y-10",
    left: "opacity-0 translate-x-10",
    right: "opacity-0 -translate-x-10",
    zoom: "opacity-0 scale-95",
    fade: "opacity-0",
};

/**
 * Wraps children and animates them into view when scrolled into the viewport.
 */
export default function Reveal({
    as = "div",
    direction = "up",
    delay = 0,
    duration = 700,
    className = "",
    once = true,
    children,
    ...rest
}) {
    const [ref, isVisible] = useScrollReveal({ once });
    const hidden = hiddenByDirection[direction] ?? hiddenByDirection.up;
    const Tag = as;

    return (
        <Tag
            ref={ref}
            style={{ transitionDuration: `${duration}ms`, transitionDelay: `${delay}ms` }}
            className={[
                "transition-all ease-out will-change-transform",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100",
                isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hidden,
                className,
            ].join(" ")}
            {...rest}
        >
            {children}
        </Tag>
    );
}
