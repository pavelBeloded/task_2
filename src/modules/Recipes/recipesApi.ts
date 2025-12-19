import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Recipe } from "./recipes.slice"

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}


export const recipesApi = createApi({
    reducerPath: "recipesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),

    endpoints: (builder) => ({
        getRecipes: builder.query<RecipesResponse, number>({
            query: (limit = 0) => `/recipes?limit=${limit}`,
        }),

        getRecipe: builder.query<Recipe, number>({
            query: (id) => `/recipes/${id}`,
        }),

    }),
})

export const { useGetRecipesQuery, useGetRecipeQuery } = recipesApi;