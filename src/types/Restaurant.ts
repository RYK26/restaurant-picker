export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating?: number;
  address?: string;
  phone?: string;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  description?: string;
  website?: string;
  hours?: string;
}

export interface CuisineCategory {
  id: string;
  name: string;
  color: string;
  restaurants: Restaurant[];
}