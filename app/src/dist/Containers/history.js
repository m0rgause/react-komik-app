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
            <div className="card mt-5 shadow">
                <div className="card-header">
                    <div className="d-flex">
                        <div style={{
                            backgroundColor: "var(--bs-secondary-bg)",
                            marginBottom: "-10px"
                        }} className="px-3 pt-2 rounded-top">
                            <h6 className="card-title">History</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="">
                        <OwlCarousel className='owl-theme' {...options}>
                            {history.length > 0 ? history.slice(0, 9).map((item, index) => {
                                const book = JSON.parse(localStorage.getItem(item)) || [];
                                return (
                                    <div key={index}>
                                        <div className="px-2 my-2">
                                            <a href={book.path} className="popularHover">
                                                <div className="card popular">
                                                    <div className="thumb" >
                                                        <ImageLoader src={book.thumb} alt={book.title} />
                                                    </div>
                                                    <div className="card-body">
                                                        <h6 className="card-title title fs-6 lh-1 word-break" style={{
                                                            color: "var(--bs-emphasis-color)"
                                                        }}>{book.title}</h6>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                )
                            }) : <div></div>}
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default History;