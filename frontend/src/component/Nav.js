import React from 'react'
import "./Nav.css"
import { Link } from "react-router-dom";

function Nav() {
    return (
        <div>
            <header className="header">
                <div className="nav-container">
                    <h2 className="logo">DUTRIX</h2>
                    <nav className="nav">
                        <Link to="/">Home</Link>
                        <Link to="/feature">Feature</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Nav
