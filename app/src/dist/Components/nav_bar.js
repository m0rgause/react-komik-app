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
            setTheme('light');
            $('#slider').prop('checked', true);
        } else {
            setTheme('dark');
            $('#slider').prop('checked', false);
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
                    <button className="navbar-toggler border-0 p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand ms-3" to="/">{config.title}</Link>
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
                    </div>
                    <div className="d-flex d-block">
                        <div className="searchBar">
                            <form>
                                <input type="text" className="search" name="s" />
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
            </nav>
        </HelmetProvider >
    )

}
export default NavBar;