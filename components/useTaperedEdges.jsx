import { useRef, useEffect } from 'react';

function useTaperedEdges({size, tr=1, tl=1,bl=1, br=1}) {

    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const setClipPath = () => {

            const trTaper = parseFloat(getComputedStyle(element).fontSize) * (size || tr);
            const tlTaper = parseFloat(getComputedStyle(element).fontSize) * (size || tl);
            const brTaper = parseFloat(getComputedStyle(element).fontSize) * (size || br);
            const blTaper = parseFloat(getComputedStyle(element).fontSize) * (size || bl);
            const width = element.clientWidth;
            const height = element.clientHeight;

            const clipPath = `polygon(${trTaper}px 0%,
                ${width - tlTaper}px 0%, ${width}px ${tlTaper}px,
                ${width}px ${height - brTaper}px, ${width - brTaper}px ${height}px,
                ${blTaper}px ${height}px, 0% ${height - blTaper}px,
                0% ${trTaper}px
              )`;
            element.style.clipPath = clipPath;
        };

        const resizeObserver = new ResizeObserver(() => {
            setClipPath();
        });
        resizeObserver.observe(element);
        setClipPath();
        return () => resizeObserver.disconnect();
    }, []);

    return ref;
}

export default useTaperedEdges;
