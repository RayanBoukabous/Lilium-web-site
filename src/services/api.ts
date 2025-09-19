import type { Product } from '../types';

// Configuration de l'API
const API_BASE_URL = 'https://app.liliumpharma.com';

// Fonction pour récupérer les produits
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/produits/api/`);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const products: Product[] = await response.json();
        return products;
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
        throw error;
    }
};

// Fonction pour formater le prix
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(price);
};

// Fonction pour obtenir l'URL complète de l'image
export const getImageUrl = (imagePath: string): string => {
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    return `${API_BASE_URL}${imagePath}`;
};

// Fonction pour obtenir le nom du pays
export const getCountryName = (countryId: number): string => {
    const countries: { [key: number]: string } = {
        1: 'Algérie',
        2: 'Tunisie',
        3: 'Maroc',
    };
    return countries[countryId] || 'Inconnu';
};

// Fonction pour obtenir les noms des pays
export const getCountriesNames = (countryIds: number[]): string[] => {
    return countryIds.map(getCountryName);
};
