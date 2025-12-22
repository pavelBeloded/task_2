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
    Paper,
    Center,
    Stack,
    Box,
    Divider,
    Grid,
    Card,
} from '@mantine/core';
import { IconArrowLeft, IconChefHat, IconClock, IconFlame, IconUsers } from '@tabler/icons-react';
import { useGetRecipeQuery } from './recipesApi';

export function Recipe() {
    const { recipeId } = useParams();
    const navigate = useNavigate();

    const { data: recipe, isLoading, error } = useGetRecipeQuery(Number(recipeId)!, {
        skip: !recipeId,
    });

    if (isLoading) {
        return (
            <Container size="md" py="xl">
                <Center style={{ height: 400 }}>
                    <Stack align="center" gap="md">
                        <Loader size="xl" />
                        <Text size="lg">Loading recipe...</Text>
                    </Stack>
                </Center>
            </Container>
        );
    }
    if (error || !recipe) {
        return (
            <Container size="md" py="xl">
                <Paper p="xl" radius="md" withBorder>
                    <Center>
                        <Stack align="center" gap="sm">
                            <Text size="xl" fw={700} c="red">Recipe not found</Text>
                            <Text c="dimmed">The recipe you're looking for doesn't exist</Text>
                            <Button
                                mt="md"
                                variant="light"
                                leftSection={<IconArrowLeft size={16} />}
                                onClick={() => navigate(-1)}
                            >
                                Back to Recipes
                            </Button>
                        </Stack>
                    </Center>
                </Paper>
            </Container>
        );
    }

    return (
       <Container size="lg" py="xl">
            {/* ✅ Better Back Button */}
            <Button
                variant="subtle"
                size="md"
                leftSection={<IconArrowLeft size={18} />}
                onClick={() => navigate(-1)}
                mb="lg"
            >
                Back to Recipes
            </Button>

            <Stack gap="lg">
                {/* ✅ Hero Section */}
                <Paper shadow="md" p="xl" radius="lg" withBorder>
                    <Grid gutter="xl">
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Image
                                src={recipe.image}
                                radius="md"
                                alt={recipe.name}
                                h={{ base: 300, md: 400 }}
                                fit="cover"
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Stack gap="md">
                                <Title order={1}>{recipe.name}</Title>

                                {/* ✅ Tags with icons */}
                                <Group gap="xs">
                                    <Badge 
                                        size="lg" 
                                        variant="light" 
                                        color="pink"
                                    >
                                        {recipe.difficulty}
                                    </Badge>
                                    <Badge 
                                        size="lg" 
                                        variant="light" 
                                        color="blue"
                                    >
                                        {recipe.cuisine}
                                    </Badge>
                                    {recipe.tags.slice(0, 3).map((tag) => (
                                        <Badge 
                                            key={tag} 
                                            size="lg" 
                                            variant="outline"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </Group>

                                <Divider />

                                {/* ✅ Stats with Icons */}
                                <Grid gutter="lg">
                                    <Grid.Col span={6}>
                                        <Card withBorder padding="md" radius="md">
                                            <Group gap="xs">
                                                <IconClock size={20} color="gray" />
                                                <Box>
                                                    <Text size="xs" c="dimmed">Prep Time</Text>
                                                    <Text fw={700} size="lg">
                                                        {recipe.prepTimeMinutes} min
                                                    </Text>
                                                </Box>
                                            </Group>
                                        </Card>
                                    </Grid.Col>

                                    <Grid.Col span={6}>
                                        <Card withBorder padding="md" radius="md">
                                            <Group gap="xs">
                                                <IconChefHat size={20} color="gray" />
                                                <Box>
                                                    <Text size="xs" c="dimmed">Cook Time</Text>
                                                    <Text fw={700} size="lg">
                                                        {recipe.cookTimeMinutes} min
                                                    </Text>
                                                </Box>
                                            </Group>
                                        </Card>
                                    </Grid.Col>

                                    <Grid.Col span={6}>
                                        <Card withBorder padding="md" radius="md">
                                            <Group gap="xs">
                                                <IconUsers size={20} color="gray" />
                                                <Box>
                                                    <Text size="xs" c="dimmed">Servings</Text>
                                                    <Text fw={700} size="lg">
                                                        {recipe.servings}
                                                    </Text>
                                                </Box>
                                            </Group>
                                        </Card>
                                    </Grid.Col>

                                    <Grid.Col span={6}>
                                        <Card withBorder padding="md" radius="md">
                                            <Group gap="xs">
                                                <IconFlame size={20} color="orange" />
                                                <Box>
                                                    <Text size="xs" c="dimmed">Calories</Text>
                                                    <Text fw={700} size="lg">
                                                        {recipe.caloriesPerServing} kcal
                                                    </Text>
                                                </Box>
                                            </Group>
                                        </Card>
                                    </Grid.Col>
                                </Grid>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Paper>

                {/* ✅ Ingredients & Instructions */}
                <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
                            <Title order={3} mb="md">🥕 Ingredients</Title>
                            <List spacing="sm" size="md">
                                {recipe.ingredients.map((item, index) => (
                                    <List.Item key={index}>
                                        <Text>{item}</Text>
                                    </List.Item>
                                ))}
                            </List>
                        </Paper>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
                            <Title order={3} mb="md">👨‍🍳 Instructions</Title>
                            <List 
                                type="ordered" 
                                spacing="md" 
                                size="md"
                                withPadding
                            >
                                {recipe.instructions.map((step, index) => (
                                    <List.Item key={index}>
                                        <Text>{step}</Text>
                                    </List.Item>
                                ))}
                            </List>
                        </Paper>
                    </Grid.Col>
                </Grid>

                {/* ✅ All Tags Section */}
                {recipe.tags.length > 0 && (
                    <Paper shadow="sm" p="lg" radius="md" withBorder>
                        <Title order={4} mb="md">🏷️ Tags</Title>
                        <Group gap="xs">
                            {recipe.tags.map((tag) => (
                                <Badge 
                                    key={tag} 
                                    size="lg" 
                                    variant="dot"
                                    color="gray"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </Group>
                    </Paper>
                )}
            </Stack>
        </Container>
    );
}
