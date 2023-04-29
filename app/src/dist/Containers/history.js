import React, { useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import config from "../../config.json";
import ImageLoader from "../Components/image_loader";
import PageLoader from "../Components/page_loader";

const History = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setHistory(JSON.parse(localStorage.getItem("history")));
        if (history) setIsLoading(false);
    }, []);

    const options = {
        nav: true,
        dots: false,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    }
    if (isLoading) {
        return <PageLoader />
    }

    return (
        <div className="container">
            <OwlCarousel className='owl-theme' {...options}>

            </OwlCarousel>
        </div>
    )
}
export default History;