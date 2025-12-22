import { SimpleGrid } from '@mantine/core';
import { Recipe,RecipeCard } from '../recipe';

interface RecipesListProps {
    recipes: Recipe[];
}

export function RecipesList({ recipes }: RecipesListProps) {


    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} mb="md">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </SimpleGrid>
    )
}