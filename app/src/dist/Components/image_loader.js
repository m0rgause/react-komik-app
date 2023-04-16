import React from "react";
import { Img } from "react-image";
import LazyLoad from "react-lazy-load";

const ImageLoader = (props) => {
    return (
        <LazyLoad offset={300} >
            <Img key={props.index}
                src={"https://cdn.statically.io/img/" + props.src.replace('https://', "")}
                alt={props.alt}
                className={props.className}
                id={props.index}
                loader={
                    <center>
                        <img alt="loading" src={require("../img/loader.svg").default} />
                    </center>
                }
                style={{ width: "100%" }} />
        </LazyLoad>
    );
}

export default ImageLoader;