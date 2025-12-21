import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
import { Recipes } from "../modules/Recipes/Recipes";
import { Recipe } from "../modules/Recipes/Recipe";
import React from "react";
import { Auth } from "../modules/Auth/Auth";
import { Root } from "../modules/root";
import { ProtectedRoute } from "../modules/protectedRoute";
import { store } from "./store";
import { recipesApi } from "../modules/Recipes/recipesApi";
export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Root />
        ),
        children: [
            {
                path: "login",
                element: <Auth />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        index: true,
                        loader: () => redirect("/recipes"),
                    },
                    {
                        path: "recipes",
                        element: <Recipes />,
                        // loader: async () => {
                        //     store.dispatch(recipesApi.endpoints.getRecipes.initiate({ limit: 10, skip: 0 }));
                        //     return null;
                        // }
                    },
                    {
                        path: "recipes/:recipeId",
                        element: <Recipe />
                    }
                ]
            }

        ]
    }
])