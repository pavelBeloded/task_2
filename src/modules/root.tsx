import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout, setUser } from "../modules/Auth/auth.slice.ts";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { useGetMeQuery } from "../modules/Auth/authApi.ts";
import { 
    AppShell, 
    Avatar, 
    Button, 
    Group, 
    Menu, 
    rem, 
    Text, 
    UnstyledButton,
    Box,
    Burger,
    Container,
    useMantineColorScheme,
    ActionIcon
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { 
    IconLogout, 
    IconSettings, 
    IconChevronDown,
    IconChefHat,
    IconSun,
    IconMoon
} from "@tabler/icons-react";

export function Root() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector((state) => state.auth.token);
    const [opened, { toggle }] = useDisclosure();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const { data: user, isSuccess, error } = useGetMeQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        if (isSuccess && user) dispatch(setUser(user));
        if (error && "status" in error && error.status === 401) dispatch(logout());
    }, [token, isSuccess, user, error, dispatch]);

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{ width: 300, breakpoint: 'lg', collapsed: { mobile: !opened, desktop: true } }}
            padding="md"
        >
            <AppShell.Header>
                <Container size="xl" h="100%">
                    <Group h="100%" justify="space-between">
                        <Group gap="xs" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                            <IconChefHat size={32} color="var(--mantine-color-blue-6)" />
                            <Text fw={700} size="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>
                                MyRecipeApp
                            </Text>
                        </Group>

                        <Group gap="md" visibleFrom="md">
                            <Button variant="subtle" onClick={() => navigate('/recipes')}>
                                🍳 Recipes
                            </Button>

                            <ActionIcon variant="subtle" size="lg" onClick={() => toggleColorScheme()}>
                                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                            </ActionIcon>

                            {token && user ? (
                                <Menu shadow="xl" width={260} position="bottom-end" radius="md">
                                    <Menu.Target>
                                        <UnstyledButton style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <Avatar src={user.image} radius="xl" size="md" />
                                            <Box>
                                                <Text size="sm" fw={600}>{user.firstName}</Text>
                                                <Text c="dimmed" size="xs">{user.email}</Text>
                                            </Box>
                                            <IconChevronDown style={{ width: rem(14), height: rem(14) }} />
                                        </UnstyledButton>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}>
                                            Settings
                                        </Menu.Item>
                                        <Menu.Item
                                            color="red"
                                            leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} />}
                                            onClick={() => {
                                                dispatch(logout());
                                                navigate('/login');
                                            }}
                                        >
                                            Logout
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            ) : (
                                <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }} onClick={() => navigate('/login')}>
                                    Login
                                </Button>
                            )}
                        </Group>

                        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
                    </Group>
                </Container>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Button variant="subtle" fullWidth onClick={() => { navigate('/recipes'); toggle(); }} mb="xs">
                    🍳 Recipes
                </Button>

                <Button variant="subtle" fullWidth onClick={() => toggleColorScheme()} mb="md">
                    {colorScheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </Button>

                {token && user ? (
                    <>
                        <Box p="md" mb="md" style={{ borderRadius: 8, backgroundColor: 'var(--mantine-color-default-hover)' }}>
                            <Group>
                                <Avatar src={user.image} radius="xl" size="lg" />
                                <Box>
                                    <Text size="sm" fw={600}>{user.firstName} {user.lastName}</Text>
                                    <Text size="xs" c="dimmed">{user.email}</Text>
                                </Box>
                            </Group>
                        </Box>

                        <Button variant="light" fullWidth leftSection={<IconSettings size={18} />} mb="xs">
                            Settings
                        </Button>

                        <Button
                            color="red"
                            variant="light"
                            fullWidth
                            leftSection={<IconLogout size={18} />}
                            onClick={() => {
                                dispatch(logout());
                                navigate('/login');
                                toggle();
                            }}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }} fullWidth onClick={() => { navigate('/login'); toggle(); }}>
                        Login
                    </Button>
                )}
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
