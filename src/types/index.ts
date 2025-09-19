// Types pour les produits
export type Product = {
  id: number;
  nom: string;
  price: number;
  fname: string;
  pdf: string | null;
  pdf_2: string | null;
  image: string;
  pays: number[];
  informations?: {
    price_bba?: number;
    product_name?: string;
    description?: string;
    suggested_use?: string;
    dosage_form?: string;
    producer?: string;
    tablet_size?: string;
    tablet_weight?: string;
    code_reference?: string;
    galenic_form?: string;
    product_classification?: string;
    presentation?: string;
    weight?: string;
    serving_size?: string;
  };
};

export type ApiResponse = {
  products: Product[];
  loading: boolean;
  error: string | null;
};
