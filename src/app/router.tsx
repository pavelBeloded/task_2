import { createBrowserRouter, redirect, Navigate } from "react-router-dom";
import { Root, ProtectedRoute } from "../widgets";
import { LoginPage, RecipesPage, RecipeDetailPage } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Root />
        ),
        children: [
            {
                path: "login",
                element: <LoginPage />,
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
                        element: <RecipesPage />,
                    },
                    {
                        path: "recipes/:recipeId",
                        element: <RecipeDetailPage />
                    }
                ]
            }

        ]
    }
])