import { Link, Outlet } from "react-router-dom"
import React from "react"

export function Root() {
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
    )
}   