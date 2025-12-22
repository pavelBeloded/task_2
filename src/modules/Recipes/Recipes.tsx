import { useEffect, useState } from 'react';
import { Text, Group, Loader, Button, SegmentedControl, Stack, TextInput, ActionIcon, Radio, Container, Center, Paper, Select } from '@mantine/core';
import { useGetRecipesQuery, useGetTagsQuery } from "./recipesApi";
import type { Order, RecipesQuery, SortBy, Tag } from "./recipesApi";
import { useSearchParams } from "react-router-dom";
import { RecipesList } from './recipesList';
import { IconSearch } from '@tabler/icons-react';
import { useDebouncedCallback, useDebouncedValue } from '@mantine/hooks';

type SelectMode = 'search' | 'tag' | 'mealType';

export function Recipes() {


    const [value, setValue] = useState('');
    const [search] = useDebouncedValue(value, 200);

    const [searchParam, setSearchParam] = useSearchParams();
    const [mode, setMode] = useState<SelectMode>('search');
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>('name');
    const [order, setOrder] = useState<Order>('asc');
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(parseInt(searchParam.get('page') || '1'));
    const tags = useGetTagsQuery().data || [];

    useEffect(() => {
        setSearchParam({ page: String(page) });
    }, [page]);


    const query: RecipesQuery = {
        q: mode === 'search' ? search : null,
        tag: mode === 'tag' ? selectedTag : null,
        mealType: mode === 'mealType' ? selectedMealType : null,
        sortBy,
        order,
        limit,
        skip: (page - 1) * limit
    }

    const { data, isLoading, error } = useGetRecipesQuery(query);



    if (isLoading) {
        return (
            <Container size="xl" py="lg">
                <Center style={{ height: 400 }}>
                    <Stack align="center" gap="md">
                        <Loader size="xl" />
                        <Text size="lg">Loading recipes...</Text>
                    </Stack>
                </Center>
            </Container>
        );
    }

    if (error) {
        return (
            <Container size="xl" py="lg">
                <Paper p="xl" radius="md" withBorder>
                    <Text c="red" size="lg">Error loading recipes</Text>
                </Paper>
            </Container>
        );
    }

    return (
        <Container>
            <Stack mb="md">
                <SegmentedControl
                    mb={"md"}
                    size="md"
                    value={mode}
                    data={[
                        { label: 'Search', value: 'search' },
                        { label: 'Tag', value: 'tag' },
                        { label: 'Meal Type', value: 'mealType' },
                    ]}
                    onChange={value => setMode(value as SelectMode)}
                />
                {mode === 'search' && (
                    <TextInput
                        radius="md"
                        size="md"
                        placeholder="Search recipes by name..."
                        rightSectionWidth={42}
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        leftSection={<IconSearch size={18} stroke={1.5} />}
                        rightSection={
                            value && (
                                <Button
                                    variant="subtle"
                                    size="xs"
                                    onClick={() => {
                                        setValue('');
                                        setPage(1);
                                    }}
                                >
                                    Clear
                                </Button>
                            )
                        }
                    />
                )}
                {mode === 'tag' && (
                    <Select
                        label="Select a tag"
                        placeholder="Choose tag..."
                        data={tags}
                        value={selectedTag || ''}
                        onChange={(value) => {
                            setSelectedTag(value || null);
                            setPage(1);
                        }}
                        searchable
                        clearable
                    />
                )}


                {mode === 'mealType' && (
                    <Select
                        label="Select meal type"
                        placeholder="Choose meal type..."
                        data={[
                            'Breakfast', 'Lunch', 'Dinner', 'Snack',
                            'Side Dish', 'Appetizer', 'Dessert', 'Beverage'
                        ]}
                        value={selectedMealType || ''}
                        onChange={(value) => {
                            setSelectedMealType(value || null);
                            setPage(1);
                        }}
                        clearable
                    />
                )}
            </Stack>
            {!data?.recipes?.length ? (
                <Paper p="xl" radius="md" withBorder>
                    <Center>
                        <Stack align="center" gap="sm">
                            <IconSearch size={64} stroke={1.5} color="gray" />
                            <Text size="lg" fw={500}>No recipes found</Text>
                            <Text size="sm" c="dimmed">Try different search or filters</Text>
                        </Stack>
                    </Center>
                </Paper>
            ) : (
                <RecipesList recipes={data.recipes} />
            )}


            {data?.recipes && data.recipes.length > 0 && (
                <Paper withBorder p="lg" radius="md" shadow="sm">
                    <Group justify="space-between" align="center">
                        <Text size="sm" c="dimmed">
                            Showing {data.recipes.length} of {data.total} recipes
                        </Text>

                        <Group gap="xs">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={page === 1}
                                onClick={() => {
                                    const newPage = page - 1;
                                    setPage(newPage);
                                    setSearchParam({ page: newPage.toString() });
                                }}
                            >
                                ← Previous
                            </Button>

                            <Text size="sm" fw={500}>Page {page}</Text>

                            <Button
                                size="sm"
                                variant="outline"
                                disabled={!data.total || data.total <= page * limit}
                                onClick={() => {
                                    const newPage = page + 1;
                                    setPage(newPage);
                                    setSearchParam({ page: newPage.toString() });
                                }}
                            >
                                Next →
                            </Button>
                        </Group>
                    </Group>
                </Paper>
            )}

            {/* <Group justify='center' mt="xl">

                <Button
                    disabled={page === 1}
                    onClick={() => {
                        setSearchParam({ page: (page - 1).toString() });
                        setPage(page - 1);
                    }}>
                    Previous
                </Button>

                <Text>{page}</Text>

                <Button
                    disabled={data?.total! <= (page) * limit}
                    onClick={() => {
                        setSearchParam({ page: (page + 1).toString() })
                        setPage(page + 1);
                    }}
                >
                    Next
                </Button>
            </Group > */}

        </Container>
    );
}
