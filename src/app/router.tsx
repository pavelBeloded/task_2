import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { Recipes } from "../modules/Recipes/Recipes";
import { Recipe } from "../modules/Recipes/Recipe";
import React from "react";
import { Auth } from "../modules/Auth/Auth";
import { Root } from "../modules/root";
export const router = createBrowserRouter([
    {
        path: "/",
        element: (
         <Root />
        ),
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
                element: <Recipe />,
            },
            {
                path: "login",
                element: <Auth />,
            }
        ]
    }
])