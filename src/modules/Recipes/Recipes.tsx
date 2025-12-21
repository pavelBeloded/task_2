import React, { useState } from 'react';
import { SimpleGrid, Card, Image, Text, Badge, Group, Loader, Button } from '@mantine/core';
import { useGetRecipesQuery } from "./recipesApi";
import { useNavigate, useSearchParams } from "react-router-dom";
export function Recipes() {

    const [searchParam, setSearchParam] = useSearchParams();

    const page = parseInt(searchParam.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const { data, isLoading, error } = useGetRecipesQuery({ limit, skip });



    const navigate = useNavigate();
    if (isLoading) return <Loader />;
    if (error) return <Text c="red">Error loading recipes</Text>;
    const totalRecipes = data?.total;

    return (
        <>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                {data?.recipes.map((recipe) => (
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
                ))}
            </SimpleGrid>

            <Group justify='center' mt="xl">

                <Button
                    disabled={page === 1}
                    onClick={() => {
                        setSearchParam({ page: (page - 1).toString() });
                    }}>
                    Previous
                </Button>

                <Text>{page}</Text>

                <Button
                    disabled={data?.total! < (page + 1) * limit}
                    onClick={() => setSearchParam({ page: (page + 1).toString() })}
                >
                    Next
                </Button>
            </Group >

        </>
    );
}
