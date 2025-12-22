import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Recipe, RecipesQuery, RecipesResponse, Tag } from "./model";



export const recipesApi = createApi({
    reducerPath: "recipesApi",
    keepUnusedDataFor: 300,
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),

    endpoints: (builder) => ({
        getRecipes: builder.query<RecipesResponse, RecipesQuery>({
            query: ({ q, tag, mealType, sortBy, order, limit, skip }) => {
                let path = '/recipes';

                if (q) {
                    path = `/recipes/search?q=${encodeURIComponent(q)}`;
                } else if (tag) {
                    path = `/recipes/tag/${encodeURIComponent(tag)}`;
                } else if (mealType) {
                    path = `/recipes/meal-type/${encodeURIComponent(mealType)}`;
                }

                const params = new URLSearchParams({
                    limit: String(limit),
                    skip: String(skip),
                    sortBy,
                    order,
                });

                const separator = path.includes('?') ? '&' : '?';
                return `${path}${separator}${params.toString()}`;
            },
        }),

        getRecipe: builder.query<Recipe, number>({
            query: (id) => `/recipes/${id}`,
        }),

        getTags: builder.query<Tag[], void>({
            query: () => `/recipes/tags`,
        }),

    }),
})

export const { useGetRecipesQuery, useGetRecipeQuery, useGetTagsQuery } = recipesApi;