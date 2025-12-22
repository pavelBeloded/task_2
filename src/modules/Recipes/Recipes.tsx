import { useEffect, useState } from 'react';
import { Text, Group, Loader, Button, SegmentedControl, Stack, TextInput, ActionIcon, Radio } from '@mantine/core';
import { useGetRecipesQuery, useGetTagsQuery } from "./recipesApi";
import type { Order, RecipesQuery, SortBy, Tag } from "./recipesApi";
import { useSearchParams } from "react-router-dom";
import { RecipesList } from './recipesList';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { useDebouncedCallback } from '@mantine/hooks';

type SelectMode = 'search' | 'tag' | 'mealType';

export function Recipes() {

    const [searchParam, setSearchParam] = useSearchParams();
    const [mode, setMode] = useState<SelectMode>('search');
    const [search, setSearch] = useState('');
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


    const debouncedSetSearch = useDebouncedCallback((value: string) => {
        setSearch(value);
        setPage(1);
    }, 300);

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



    if (isLoading) return <Loader />;
    if (error) return <Text c="red">Error loading recipes</Text>;

    return (
        <>
            <Stack>
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
                        radius="xl"
                        size="md"
                        mb="md"
                        placeholder="Search questions"
                        rightSectionWidth={42}
                        // value={search}
                        onChange={(event) => debouncedSetSearch(event.currentTarget.value)}
                        leftSection={<IconSearch size={18} stroke={1.5} />}

                    />
                )}

                {mode === 'tag' && (
                    <Radio.Group
                        name="tags"
                        label="Select recipe by tag"
                        description="You can select only one tag"
                        size="lg"
                    >
                        <Group mt="md" mb="md">
                            {
                                tags.map((tag, index) => (
                                    <Radio
                                        key={index}
                                        label={tag}
                                        value={tag}
                                        onChange={() => setSelectedTag(tag)}
                                    />
                                ))
                            }
                        </Group>
                    </Radio.Group>
                )}

                {mode === 'mealType' && (
                    <Radio.Group
                        name="mealTypes"
                        label="Select recipe by meal type"
                        description="You can select only one meal type"
                        size="lg"
                    >
                        <Group mt="md" mb="md">
                            <Radio label="Breakfast" value="Breakfast" onChange={() => setSelectedMealType('Breakfast')} />
                            <Radio label="Lunch" value="Lunch" onChange={() => setSelectedMealType('Lunch')} />
                            <Radio label="Dinner" value="Dinner" onChange={() => setSelectedMealType('Dinner')} />
                            <Radio label="Snack" value="Snack" onChange={() => setSelectedMealType('Snack')} />
                            <Radio label="Side Dish" value="Side Dish" onChange={() => setSelectedMealType('Side Dish')} />
                            <Radio label="Appetizer" value="Appetizer" onChange={() => setSelectedMealType('Appetizer')} />
                            <Radio label="Dessert" value="Dessert" onChange={() => setSelectedMealType('Dessert')} />
                            <Radio label="Beverage" value="Beverage" onChange={() => setSelectedMealType('Beverage')} />
                        </Group>
                    </Radio.Group>
                )}
            </Stack>
            <RecipesList recipes={data?.recipes || []} />
            <Group justify='center' mt="xl">

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
            </Group >

        </>
    );
}
