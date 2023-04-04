import React from "react";
import { Img } from "react-image";
import LazyLoad from "react-lazy-load";

const ImageLoader = (props) => {
    return (
        <LazyLoad>
            <Img
                src={"https://cdn.statically.io/img/" + props.src.replace('https://', "")}
                alt={props.alt}
                className={props.className}
                loader={
                    <img alt="loading" src={require("../img/loader.svg").default} />
                }
                style={{ width: "100%" }} />
        </LazyLoad>
    );
}

export default ImageLoader;