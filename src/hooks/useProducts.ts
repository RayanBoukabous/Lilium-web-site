import { useState, useEffect } from 'react';
import type { Product } from '../types';
import { fetchProducts } from '../services/api';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Une erreur est survenue');
                console.error('Erreur lors du chargement des produits:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    return { products, loading, error };
};
