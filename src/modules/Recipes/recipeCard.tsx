import type { Recipe } from "./recipesApi";
import { SimpleGrid, Card, Image, Text, Badge, Group, Loader, Button } from '@mantine/core';
import { useNavigate, useSearchParams } from "react-router-dom";

interface RecipeCardProps {
    recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    const navigate = useNavigate();

    return (
        <Card key={recipe.id} shadow="sm" padding="lg" radius="md" withBorder
            style={{ cursor: 'pointer' }}
            onClick={() => {
                navigate(`/recipes/${recipe.id}`);
            }}
        >
            <Card.Section>
                <Image
                    loading="lazy"
                    src={recipe.image}
                    height={160}
                    alt={recipe.name}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{recipe.name}</Text>
                <Badge color="pink" variant="light">
                    {recipe.difficulty}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {recipe.cuisine} • {recipe.caloriesPerServing} kcal
            </Text>
        </Card>
    )
}