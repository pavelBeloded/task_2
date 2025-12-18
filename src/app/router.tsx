import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
import { Recipes } from "../modules/Recipes/Recipes";
import { Recipe } from "../modules/Recipes/Recipe";
import React from "react";
import { Auth } from "../modules/Auth/Auth";
import { Root } from "../modules/root";
import { ProtectedRoute } from "../modules/protectedRoute";

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