import { Button, Container, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoginMutation, setCredentials } from '../modules/auth';
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Navigate } from "react-router-dom";

interface FormValues {
    username: string;
    password: string;
}


export function LoginPage() {

    const [login, { isSuccess, isLoading, error }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);



    const form = useForm<FormValues>({
        initialValues: {
            username: '',
            password: '',
        },
        mode: 'uncontrolled',

        validate: {
            username: (value) => (value.trim().length < 2 ? 'Username should have at least 2 letters' : null),
            password: (value) => (value.trim().length < 2 ? 'Password should have at least 2 letters' : null),
        },

        transformValues: (values) => ({
            username: values.username.trim(),
            password: values.password.trim(),
        })
    });

    const handleSubmit = form.onSubmit(async ({ username, password }) => {
        try {
            const result = await login({ username, password, expiresInMins: 60 }).unwrap();

            dispatch(setCredentials(result));
            setTimeout(() => {
            }, 2000);
        } catch (err) {
            console.error('Login failed', err);
        }
    });


    if (!token) {
        return (
            <Container>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        radius="md"
                        size="md"
                        label="Username"
                        aria-label="Your username"
                        placeholder="Your username"
                        key={form.key("username")}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        radius="md"
                        size="md"
                        type="password"
                        aria-label="Your password"
                        label="Password"
                        placeholder="Your password"
                        key={form.key("password")}
                        {...form.getInputProps('password')}
                    />
                    <Group justify="right" mt="md">
                        <Button
                            type="submit"
                            size="sm"
                            >
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                    </Group>
                </form>
                {error && (
                    <div style={{ color: 'red', marginTop: '8px' }}>
                        Login failed
                    </div>
                )}

                {isSuccess && (
                    <div style={{ color: 'green', marginTop: '8px' }}>
                        Logged in successfully
                    </div>
                )}
            </Container>
        )
    }

    return (
        <Navigate to="/recipes" />
    )



}
