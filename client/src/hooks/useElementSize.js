import { useEffect, useRef, useState } from 'react';

// Devuelve una ref y el tamaño actual del elemento (se actualiza al redimensionar)
export default function useElementSize() {
    const ref = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return undefined;

        const observer = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return [ref, size];
}
