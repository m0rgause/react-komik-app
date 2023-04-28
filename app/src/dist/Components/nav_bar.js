import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import config from "../../config.json";
import $ from "jquery";

const NavBar = () => {
    $('.srcmob').click(function () {
        $('.minmb').toggleClass('show')
    })
    const storedTheme = localStorage.getItem('theme');
    const getPreferredTheme = () => {
        if (storedTheme) {
            return storedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    useEffect(() => {
        setTheme(getPreferredTheme());
        if (localStorage.getItem('theme') === 'dark') {
            setTheme('dark');
            $('#slider').prop('checked', false);
        } else {
            setTheme('light');
            $('#slider').prop('checked', true);
        }
    }, []);

    function setTheme(theme) {
        if (theme === 'auto' && $(window).matchMedia('(prefers-color-scheme: dark)').matches) {
            $('html').attr('data-bs-theme', 'dark')
            localStorage.setItem('theme', 'dark');
        } else {
            $('html').attr('data-bs-theme', theme)
            localStorage.setItem('theme', theme);
        }
    }

    function toggleSwitcher() {
        console.log(localStorage.getItem('theme'));
        if (localStorage.getItem('theme') === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    }


    return (
        <HelmetProvider>
            <Helmet>
                <title>{config.title}</title>
            </Helmet>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navMenu" aria-controls="navMenu">
                        <span className="bi bi-list"></span>
                    </button>
                    <Link className="navbar-brand fs-6" to="/">{config.title}</Link>
                    <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="navMenu" aria-labelledby="navMenuLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3">
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
                        </div>
                    </div>
                    <div className="ms-auto">
                        <div className="d-flex">
                            <div className="searchBar">
                                <form method="get" action="/search">
                                    <input type="text" className="search" name="s" placeholder="Search" />
                                    <button type="submit" className="font-search btn p-0"><i className="bi bi-search "></i></button>
                                </form>
                            </div>
                            <div className="theme-switch">
                                <label id="switch" className="switch">
                                    <input type="checkbox" id="slider" onChange={toggleSwitcher} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </HelmetProvider >
    )

}
export default NavBar;