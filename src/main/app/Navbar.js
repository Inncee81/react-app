import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/users-browser" className="nav-item nav-link">Browser Users</NavLink>
                <NavLink to="/users-memory" className="nav-item nav-link">Memory Users</NavLink>
                <NavLink to="/users-hash" className="nav-item nav-link">Hash Users</NavLink>
                <NavLink to="/api" className="nav-item nav-link">Client Api</NavLink>
            </div>
        </nav>
    )
}
