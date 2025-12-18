import React, { useState } from "react"
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLoginMutation } from "./authApi";
import { setCredentials } from "./auth.slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface FormValues {
    username: string;
    password: string;
}


export function Auth() {

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
            username: (value) => (value.length < 2 ? 'Username should have at least 2 letters' : null),
            password: (value) => (value.length < 2 ? 'Password should have at least 2 letters' : null),
        }
    });

    const handleSubmit = form.onSubmit(async ({ username, password }) => {
        try {
            const result = await login({ username, password, expiresInMins: 60 }).unwrap();
            console.log(result);

            console.log("Successfull");
            dispatch(setCredentials(result));
            setTimeout(() => {
            }, 2000);
        } catch (err) {
            console.error('Login failed', err);
        }
    });


    if (!token) {
        return (
            <>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Username"
                        placeholder="Your username"
                        key={form.key("username")}
                        {...form.getInputProps('username')}
                    />
                    <TextInput
                        type="password"
                        label="Password"
                        placeholder="Your password"
                        key={form.key("password")}
                        {...form.getInputProps('password')}
                    />
                    <Group justify="right" mt="md">
                        <Button type="submit">
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
            </>
        )
    }

    // return (
    //     <>
    //         <h2>Hello, {}</h2>
    //     </>
    // )



}
