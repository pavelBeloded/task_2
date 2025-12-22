export interface RecipesResponse {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
}


type Igridient = string;
type Instruction = string;
export type Tag = string;

export interface Recipe {
    id: number;
    name: string;
    ingredients: Igridient[];
    instructions: Instruction[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: Tag[];
    image: string;
}

export type SortBy = 'name' | 'rating' | 'caloriesPerServing' | 'prepTimeMinutes';
export type Order = 'asc' | 'desc';

export interface RecipesQuery {
    q: string | null;
    tag: Tag | null;
    mealType: string | null;
    sortBy: SortBy;
    order: Order;
    limit: number;
    skip: number;
}