import React from "react";
import Loader from "../img/page_loader.svg";

function PageLoader() { // eslint-disable-line arrow-body-style
    return (
        <div className="d-flex align-items-center flex-column mt-5" >
            <h1 className="loading">Loading...</h1>
            <img src={Loader} className="loader-primary" />
        </div>
    );
}

export default PageLoader;