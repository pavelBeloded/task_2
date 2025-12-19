import { createSlice } from "@reduxjs/toolkit";

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


type Igridient = string;
type Instruction = string;
type Tag = string;


export interface recipesState {
    recipes: Recipe[];
}

const initialState: recipesState = {
    recipes: [],
}

export const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.recipes = action.payload;
        },
    }
})

export const { setRecipes } = recipesSlice.actions;

export default recipesSlice.reducer;