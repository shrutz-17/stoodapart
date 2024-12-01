export interface Product {
  id: string;
  name: string;
  brand: string;
  currentPrice: string;
  originalPrice?: string;
  discount?: string;
  productLink: string;
  imageUrl: string;
  imageAlt: string;
  swatchImage1?: string;
  swatchAlt1?: string;
  swatchImage2?: string;
  swatchAlt2?: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'discount' | 'newest';
export type BrandFilter = 'Dorothy Perkins' | 'Oasis' | 'PixieGirl' | 'M&Co' | 'River Island' | 'Roman';