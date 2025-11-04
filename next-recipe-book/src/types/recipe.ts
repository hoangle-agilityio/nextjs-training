export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  ingredients: string[];
  cuisineType: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RecipeListItem {
  id: string;
  title: string;
  cuisineType: string;
  imageUrl: string;
}

export type RecipeFilters = {
  cuisineType?: string;
  search?: string;
};
