import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import config from "../../config.json";
import $ from "jquery";

const NavBar = () => {
    $('.srcmob').click(function () {
        $('.minmb').toggleClass('show')
    })

    useEffect(() => {
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
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navMenu" aria-controls="navMenu">
                        <span class="bi bi-list"></span>
                    </button>
                    <Link className="navbar-brand fs-6" to="/">{config.title}</Link>
                    <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="navMenu" aria-labelledby="navMenuLabel">
                        <div class="offcanvas-header">
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
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
                                <form method="get" action="">
                                    <input type="text" className="search" name="s" placeholder="Search" />
                                    <i className="bi bi-search font-search"></i>
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