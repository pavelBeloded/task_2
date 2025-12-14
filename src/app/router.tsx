import { createBrowserRouter, Link, Outlet, redirect } from "react-router-dom";
import { Recipes } from "../modules/Recipes";
import { Recipe } from "../modules/Recipe";
import React from "react";
import { LogIn } from "../modules/LogIn";
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
                element: <LogIn />,
            }
        ]
    }
])