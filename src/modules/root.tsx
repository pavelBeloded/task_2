import { Link, Outlet } from "react-router-dom";
import React, { useEffect } from "react";
import { setToken, setUser } from "../modules/Auth/auth.slice.ts";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { useGetMeQuery } from "../modules/Auth/authApi.ts";

export function Root() {
    const dispatch = useAppDispatch();

    const token = useAppSelector((state) => state.auth.token);

    const { data: user, isSuccess } = useGetMeQuery(undefined, {
        skip: !token,
    });

    useEffect(() => {

        if (isSuccess && user) {
            dispatch(setUser(user));
        }
    }, [token, isSuccess, user, dispatch]);

    return (
        <div>
            <header>
                <Link to="recipes">Recipes</Link>
                <Link to="login">Login</Link>
            </header>

            <div className="detail">
                <Outlet />
            </div>
        </div>
    );
}
