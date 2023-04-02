import React, { useState, useEffect } from "react";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import ImageLoader from "../Components/image_loader";

const decimalToPercent = (decimal) => {
    return Math.round(decimal * 10) + "%";
}

const Home = () => {
    const [popular, setPopular] = useState([]);
    const [newRelease, setNewRelease] = useState([]);
    const [project, setProject] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/home")
            .then((response) => {
                setPopular(response.data.result.popular);
                setNewRelease(response.data.result.newRelease);
                setProject(response.data.result.project);
            })
            .catch((error) => console.log(error));
    }, []);
    const options = {
        // loop: true,
        nav: true,
        dots: false,
        // center: true,
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
    return (
        <div className="container">
            {/* Popular */}
            <div className="card mt-5 shadow">
                <div className="card-header">
                    <div className="d-flex">
                        <div style={{
                            backgroundColor: "var(--bs-body-bg)",
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
                                        <a href={el.path} className="popularHover">
                                            <div className="card popular">
                                                <ImageLoader src={el.thumb} alt={el.title} />
                                                {/* <img src={el.thumb} /> */}
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
                    <div className="card mt-5 shadow">
                        <div className="card-header">
                            <div className="d-flex">
                                <div style={{
                                    backgroundColor: "var(--bs-body-bg)",
                                    marginBottom: "-10px"
                                }} className="px-3 pt-2 rounded-top">
                                    <h6 className="card-title">Project</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                        </div>
                    </div>
                    {/* End Project */}
                </div>
            </div>
        </div >
    );
}

export default Home;