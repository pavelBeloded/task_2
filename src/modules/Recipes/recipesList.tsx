import { SimpleGrid } from '@mantine/core';
import type { Recipe } from './recipesApi';
import { RecipeCard } from './recipeCard';

interface RecipesListProps {
    recipes: Recipe[];
}

export function RecipesList({ recipes }: RecipesListProps) {


    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </SimpleGrid>
    )
}