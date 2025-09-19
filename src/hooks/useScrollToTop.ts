import { useEffect } from 'react';

export const useScrollToTop = (dependency?: any) => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [dependency]);
};

export default useScrollToTop;

