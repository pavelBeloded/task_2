import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface RecipesResponse {
    recipes: Recipe[];
    total: number;
    skip: number;
    limit: number;
}

interface GetRecipesArgs {
    limit: number;
    skip: number;
}
type Igridient = string;
type Instruction = string;
type Tag = string;

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





export const recipesApi = createApi({
    reducerPath: "recipesApi",
    keepUnusedDataFor: 300,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),

    endpoints: (builder) => ({
        getRecipes: builder.query<RecipesResponse, GetRecipesArgs>({
            query: ({ limit, skip }) => `/recipes?limit=${limit}&skip=${skip}`,
        }),

        getRecipe: builder.query<Recipe, number>({
            query: (id) => `/recipes/${id}`,
        }),

    }),
})

export const { useGetRecipesQuery, useGetRecipeQuery } = recipesApi;