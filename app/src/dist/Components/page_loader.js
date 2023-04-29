import React, { useState, useEffect } from "react";
import Loader from "../img/page_loader.svg";

const NotFound = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center">
                        <h1 className="display-2">404</h1>
                        <p className="lead">Halaman tidak ditemukan.</p>
                        <a href="/" className="btn my-2">Kembali ke Beranda</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PageLoader = () => {
    // show 404 page if the page is not respond in 10 seconds
    const [showNotFound, setShowNotFound] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowNotFound(true); // Show Not Found page if the page is not responding within 10 seconds
        }, 5000)
        return () => { clearTimeout(timeout) };
    });

    return showNotFound ? <NotFound /> : (
        <div className="d-flex align-items-center flex-column mt-5" >
            <h1 className="loading">Loading...</h1>
            <img src={Loader} className="loader-primary" />
        </div>
    );
}

export default PageLoader;