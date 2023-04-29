import React, { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import config from "../../config.json";
import ImageLoader from "../Components/image_loader";
import BookType from "../Components/book_type";
import BookStatus from "../Components/book_status";
import Galleries from "../Components/galleries";
import PageLoader from "../Components/page_loader";
import HistoryPart from "../Components/history";

const decimalToPercent = (decimal) => {
    return Math.round(decimal * 10) + "%";
}

const Home = () => {
    const [popular, setPopular] = useState([]);
    const [newRelease, setNewRelease] = useState([]);
    const [project, setProject] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${config.server}home`)
            .then((response) => {
                setPopular(response.data.result.popular);
                setNewRelease(response.data.result.newRelease);
                setProject(response.data.result.project);
                setIsLoading(false);
            })
            .catch((error) => { console.log(error); setIsLoading(false) });
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
            {/* Popular */}
            <div className="card mt-5 shadow">
                <div className="card-header">
                    <div className="d-flex">
                        <div style={{
                            backgroundColor: "var(--bs-secondary-bg)",
                            marginBottom: "-10px"
                        }} className="px-3 pt-2 rounded-top">
                            <h6 className="card-title">Popular</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="">
                        <OwlCarousel className='owl-theme' {...options}>
                            {popular.map((el, index) => (
                                <div key={index}>
                                    <div className="px-2 my-2">
                                        <a href={"/book/" + el.path} className="popularHover">
                                            <div className="card popular">
                                                <div className="thumb" >
                                                    <ImageLoader src={el.thumb} alt={el.title} />
                                                </div>
                                                <div className="card-body">
                                                    <h6 className="card-title title fs-6 lh-1 word-break" style={{
                                                        color: "var(--bs-emphasis-color)"
                                                    }}>{el.title}</h6>
                                                    <p className="card-text mb-0" style={{
                                                        fontSize: "13px"
                                                    }}>{el.chapter}</p>
                                                    <div className="ratings">
                                                        <div className="empty-stars"></div>
                                                        <div className="full-stars" style={{ width: decimalToPercent(el.rating) }}></div>
                                                        <span className="text-muted">{el.rating}</span>
                                                    </div>
                                                    <br />
                                                    <div className="badgeInfo">
                                                        <div className="float-start ms-2 mt-2">
                                                            <BookType className={el.type} />
                                                        </div>
                                                        <div className="float-end me-2 mt-2">
                                                            <BookStatus className={el.status} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </OwlCarousel>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-9">
                    {/* Project */}
                    <Galleries data={project} title={"Project"} />
                    {/* End Project */}
                    {/* New Release */}
                    <Galleries data={newRelease} title={"New Release"} />
                    {/* End New Release */}
                </div>
                {/* Last Read */}
                <div className="col-md-3 col-lg-3 d-none d-sm-block">
                    <div className="card mt-5 shadow">
                        <div className="card-header">
                            <div className="d-flex">
                                <div style={{
                                    backgroundColor: "var(--bs-secondary-bg)",
                                    marginBottom: "-10px"
                                }} className="px-3 pt-2 rounded-top">
                                    <h6 className="card-title">Last Read</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <HistoryPart />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Home;