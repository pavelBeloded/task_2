import { useEffect, useState } from 'react';
import { Text, Group, Loader, Button } from '@mantine/core';
import { useGetRecipesQuery } from "./recipesApi";
import type { Order, RecipesQuery, SortBy, Tag } from "./recipesApi";
import { useSearchParams } from "react-router-dom";
import { RecipesList } from './recipesList';
export function Recipes() {

    const [searchParam, setSearchParam] = useSearchParams();
    const [mode, setMode] = useState<'search' | 'tag' | 'mealType'>('search');
    const [search, setSearch] = useState('');
    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
    const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>('name');
    const [order, setOrder] = useState<Order>('asc');
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(parseInt(searchParam.get('page') || '1'));
    useEffect(() => {
        const urlPage = searchParam.get('page');
        if (urlPage) {
            setPage(parseInt(urlPage));
        }
    }, [searchParam]);

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
