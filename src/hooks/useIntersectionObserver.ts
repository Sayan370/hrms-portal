import React, { RefObject, useEffect, useRef, useState } from "react";

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

function useIntersectionObserver<K extends Element | null = Element>(
    args: Args = {
        threshold: 0,
        root: null,
        rootMargin: "1%",
        freezeOnceVisible: false,
    }
): [
    ref: React.MutableRefObject<K | null>,
    entry: IntersectionObserverEntry | undefined
] {
    const { freezeOnceVisible, root, rootMargin, threshold } = args;
    const elementRef = useRef<K | null>(null);
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        const node = elementRef?.current; // DOM Ref
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const observerParams = { threshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        // eslint-disable-next-line consistent-return
        return () => {
            observer.unobserve(node);
            observer.disconnect();
        };
    }, [elementRef, threshold, root, rootMargin, frozen]);

    return [elementRef, entry];
}

export default useIntersectionObserver;
