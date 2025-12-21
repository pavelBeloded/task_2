import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Image,
    Text,
    Title,
    Badge,
    Group,
    List,
    Loader,
    Button,
    Paper
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useGetRecipeQuery } from './recipesApi';

export function Recipe() {
    const { recipeId } = useParams(); 
    const navigate = useNavigate();

    const { data: recipe, isLoading, error } = useGetRecipeQuery(Number(recipeId)!, {
        skip: !recipeId,
    });

    if (isLoading) return <Loader />;
    if (error || !recipe) return <Text c="red">Recipe not found</Text>;

    return (
        <Container size="md" py="xl">
            <Button
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
                onClick={() => navigate('/recipes')}
                mb="md"
            >
                Back to Recipes
            </Button>

            <Paper shadow="xs" p="md" withBorder>
                <Group align="flex-start" wrap="nowrap">
                    <Image
                        src={recipe.image}
                        w={300}
                        radius="md"
                        alt={recipe.name}
                    />

                    <div>
                        <Title order={2}>{recipe.name}</Title>

                        <Group mt="xs">
                            <Badge color="pink">{recipe.difficulty}</Badge>
                            <Badge color="blue">{recipe.cuisine}</Badge>
                            <Text size="sm" c="dimmed">{recipe.caloriesPerServing} kcal</Text>
                        </Group>

                        <Group mt="md" gap="xl">
                            <div>
                                <Text fw={700}>Prep Time</Text>
                                <Text>{recipe.prepTimeMinutes} min</Text>
                            </div>
                            <div>
                                <Text fw={700}>Cook Time</Text>
                                <Text>{recipe.cookTimeMinutes} min</Text>
                            </div>
                            <div>
                                <Text fw={700}>Servings</Text>
                                <Text>{recipe.servings}</Text>
                            </div>
                        </Group>
                    </div>
                </Group>

                <Group mt="xl" align="flex-start" gap={50}>
                    <div style={{ flex: 1 }}>
                        <Title order={3} mb="sm">Ingredients</Title>
                        <List withPadding>
                            {recipe.ingredients.map((item, index) => (
                                <List.Item key={index}>{item}</List.Item>
                            ))}
                        </List>
                    </div>

                    <div style={{ flex: 1 }}>
                        <Title order={3} mb="sm">Instructions</Title>
                        <List type="ordered" withPadding>
                            {recipe.instructions.map((step, index) => (
                                <List.Item key={index}>{step}</List.Item>
                            ))}
                        </List>
                    </div>
                </Group>
            </Paper>
        </Container>
    );
}
