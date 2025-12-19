import { Link, Navigate, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { logout, setUser } from "../modules/Auth/auth.slice.ts";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { useGetMeQuery } from "../modules/Auth/authApi.ts";
import { AppShell, Avatar, Button, Group, Menu, rem, Text, UnstyledButton } from "@mantine/core";
import { IconLogout, IconSettings, IconChevronDown } from "@tabler/icons-react";


export function Root() {
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.auth.token);

    const { data: user, isSuccess, error, isError } = useGetMeQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {
        
        if (isSuccess && user) {
            dispatch(setUser(user));
        }

        if (error && "status" in error && error.status === 401) {
            dispatch(logout());
        }

    }, [token, isSuccess, user, dispatch]);


    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    {/* Left side: Logo or Title */}
                    <Group>
                        <Text fw={700} size="lg">MyRecipeApp</Text>
                        <Button variant="subtle" onClick={() => <Navigate to="/recipes" />}>Recipes</Button>
                    </Group>

                    <Group>
                        {token && user ? (
                            <Menu shadow="md" width={200} position="bottom-end">
                                <Menu.Target>
                                    <UnstyledButton style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Avatar src={user.image} radius="xl" alt={user.firstName} />
                                        <div style={{ flex: 1 }}>
                                            <Text size="sm" fw={500}>{user.firstName} {user.lastName}</Text>
                                            <Text c="dimmed" size="xs">{user.email}</Text>
                                        </div>
                                        <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                                    </UnstyledButton>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Label>Application</Menu.Label>
                                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                        Settings
                                    </Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item
                                        color="red"
                                        leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                                        onClick={() => dispatch(logout())}
                                    >
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <Button onClick={() => <Navigate to='/login' />}>Login</Button>
                        )}
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}
