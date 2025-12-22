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
                        <Group 
                            gap="xs" 
                            onClick={() => navigate('/')} 
                            style={{ cursor: 'pointer' }}
                            tabIndex={0}
                            role="button"
                            aria-label="Go to home page"
                        >
                            <IconChefHat size={32} color="var(--mantine-color-blue-filled)" />
                            <Text 
                                fw={700} 
                                size="xl"
                                c="bright" 
                            >
                                MyRecipeApp
                            </Text>
                        </Group>

                        <Group gap="md" visibleFrom="md">
                            <Button 
                                variant="default" 
                                onClick={() => navigate('/recipes')}
                            >
                                🍳 Recipes
                            </Button>

                            <ActionIcon 
                                aria-label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
                                variant="default" 
                                size="lg" 
                                onClick={() => toggleColorScheme()}
                            >
                                {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
                            </ActionIcon>

                            {token && user ? (
                                <Menu shadow="xl" width={260} position="bottom-end" radius="md">
                                    <Menu.Target>
                                        <UnstyledButton 
                                            style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                gap: 8,
                                                padding: '8px 12px',
                                                borderRadius: 'var(--mantine-radius-md)',
                                                backgroundColor: 'var(--mantine-color-default)',
                                                border: '1px solid var(--mantine-color-default-border)'
                                            }}
                                        >
                                            <Avatar 
                                                src={user.image} 
                                                radius="xl" 
                                                size="md" 
                                                alt={`${user.firstName}'s profile`}
                                            />
                                            <Box>
                                                <Text size="sm" fw={600}>{user.firstName}</Text>
                                                <Text c="dimmed" size="xs">{user.email}</Text>
                                            </Box>
                                            <IconChevronDown style={{ width: rem(14), height: rem(14) }} />
                                        </UnstyledButton>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item 
                                            leftSection={<IconSettings style={{ width: rem(16), height: rem(16) }} />}
                                        >
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
                                <Button 
                                    variant="gradient" 
                                    gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
                                    autoContrast 
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                            )}
                        </Group>

                        <Burger 
                            aria-label="Toggle navigation menu" 
                            opened={opened} 
                            onClick={toggle} 
                            hiddenFrom="md" 
                            size="sm" 
                        />
                    </Group>
                </Container>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                {/* ✅ Better mobile menu contrast */}
                <Button 
                    variant="default" 
                    fullWidth 
                    onClick={() => { navigate('/recipes'); toggle(); }} 
                    mb="xs"
                >
                    🍳 Recipes
                </Button>

                <Button 
                    variant="default"
                    fullWidth 
                    onClick={() => toggleColorScheme()} 
                    mb="md"
                >
                    {colorScheme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </Button>

                {token && user ? (
                    <>
                        <Box 
                            p="md" 
                            mb="md" 
                            style={{ 
                                borderRadius: 8, 
                                backgroundColor: 'var(--mantine-color-default)',
                                border: '1px solid var(--mantine-color-default-border)'
                            }}
                        >
                            <Group>
                                <Avatar 
                                    src={user.image} 
                                    radius="xl" 
                                    size="lg"
                                    alt={`${user.firstName}'s profile`}
                                />
                                <Box>
                                    <Text size="sm" fw={600}>{user.firstName} {user.lastName}</Text>
                                    <Text size="xs" c="dimmed">{user.email}</Text>
                                </Box>
                            </Group>
                        </Box>

                        <Button 
                            variant="light" 
                            fullWidth 
                            leftSection={<IconSettings size={18} />} 
                            mb="xs"
                            autoContrast 
                        >
                            Settings
                        </Button>

                        <Button
                            color="red"
                            variant="filled"
                            fullWidth
                            leftSection={<IconLogout size={18} />}
                            autoContrast  
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
                    <Button 
                        variant="gradient" 
                        gradient={{ from: 'blue', to: 'cyan', deg: 45 }} 
                        fullWidth 
                        autoContrast 
                        onClick={() => { navigate('/login'); toggle(); }}
                    >
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
