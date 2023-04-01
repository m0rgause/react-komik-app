import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import config from "../../config.json";

const NavBar = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{config.title}</title>
            </Helmet>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <Link className="navbar-brand" to="/">{config.title}</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/galleries">Manga List</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/bookmark">Bookmark</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0 d-flex">
                            <li className="nav-item dropdown">
                                <button className="btn btn-link nav-link py-2 px-0 px-lg-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button" aria-expanded="false" data-bs-toggle="dropdown" data-bs-display="static" aria-label="Toggle theme (dark)">
                                    <i className="bi bi-moon-fill me-2 theme-icon-active" data-icon-active='bi-moon-fill'></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme-text">
                                    <li>
                                        <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="light" aria-pressed="false">
                                            <i className="bi bi-sun-fill me-2 " data-icon-active='bi-sun-fill'></i>
                                            Light
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item d-flex align-items-center active" data-bs-theme-value="dark" aria-pressed="true">
                                            <i className="bi bi-moon-fill me-2" data-icon-active='bi-moon-fill'></i>
                                            Dark
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="dropdown-item d-flex align-items-center" data-bs-theme-value="auto" aria-pressed="false">
                                            <i className="bi bi-circle-half me-2" data-icon-active='bi-circle-half'></i>
                                            Auto
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </HelmetProvider>
    )

}
export default NavBar;