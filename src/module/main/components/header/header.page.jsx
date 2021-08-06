import React from 'react'
import { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="/">Navbar</NavLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                        </span></button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink activeClassname="nav-link-active" className="
                            nav-link" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassname="nav-link-active" className="
                            nav-link" to="/sign-in">Sign In</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassname="nav-link-active" className="
                            nav-link" to="/sign-up">Sign Up</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink activeClassname="nav-link-active" className="
                            nav-link" to="/movie-detail">Movie Detail</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
