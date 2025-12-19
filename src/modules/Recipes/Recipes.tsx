import React from 'react';
import { SimpleGrid, Card, Image, Text, Badge, Group, Loader } from '@mantine/core';
import { useGetRecipesQuery } from "./recipesApi";

export function Recipes() {
  const { data, isLoading, error } = useGetRecipesQuery(0);

  if (isLoading) return <Loader />;
  if (error) return <Text c="red">Error loading recipes</Text>;

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
      {data?.recipes.map((recipe) => (
        <Card key={recipe.id} shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image
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
  );
}
