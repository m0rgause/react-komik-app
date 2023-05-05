import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import PageLoader from "../Components/page_loader";
import ChapterButtons from "../Components/ch_button";
import LazyLoad from "react-lazy-load";
import config from "../../config.json";


const BookReader = () => {
    const { path } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState(null);
    const previousScrollPositionRef = useRef(0);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        axios
            .get(`${config.server}book/${path}`)
            .then((response) => {
                if (isMounted) {
                    setBook(response.data.result);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
        return () => {
            isMounted = false;
        };
    }, [path]);

    useEffect(() => {
        const homeButton = document.querySelector(".home-button");
        if (!isLoading) {
            window.addEventListener("scroll", function () {
                let readerEl = document.querySelector("#reader");
                if (readerEl) {
                    let scroll = window.pageYOffset;
                    let box = readerEl.offsetHeight;
                    scroll >= readerEl.offsetTop ? scroll <= readerEl.offsetTop + box ? document.querySelector(".bar-long").style.width = (scroll - readerEl.offsetTop) / box * 100 + "%" : document.querySelector(".bar-long").style.width = "100%" : document.querySelector(".bar-long").style.width = "0%";
                    let dataBook = {
                        id: book?.id,
                        title: book?.title,
                        path: book?.path,
                        thumb: book?.thumb,
                        scrollPosition: scroll,
                    }
                    localStorage.setItem(`post_${book?.book}`, JSON.stringify(dataBook));
                    if (localStorage.getItem('history') === null) {
                        let history = [`post_${book?.book}`];
                        localStorage.setItem('history', JSON.stringify(history));
                    } else {
                        let history = [];
                        history = JSON.parse(localStorage.getItem('history')) || [];
                        if (history.includes(`post_${book?.book}`)) {
                            history.unshift(history.splice(history.indexOf(`post_${book?.book}`), 1)[0]);
                        } else {
                            history.unshift(`post_${book?.book}`);
                        }
                        localStorage.setItem('history', JSON.stringify(history));
                    }
                }
            });
        }
        if (homeButton) {
            homeButton.style.display = "none";
        }
        return () => {
            window.removeEventListener("scroll", function () { });
        }
    }, [isLoading, book]);

    const bookPost = localStorage.getItem(`post_${book?.book}`);
    if (bookPost) {
        setTimeout(() => {
            const previousScrollPosition = JSON.parse(bookPost)?.scrollPosition;
            window.scrollTo(0, previousScrollPosition);
        }, 1000);
    }


    const onScroll = () => {
        let scroll = window.pageYOffset;
        let homeButton = document.querySelector(".home-button");
        if (homeButton) {
            if (scroll > 100) {
                homeButton.style.display = "block";
            } else {
                homeButton.style.display = "none";
            }
        }
    }

    window.addEventListener("scroll", onScroll);

    if (isLoading || !book) {
        return <PageLoader />;
    }


    return (
        <HelmetProvider>
            <Helmet>
                <title>{book?.title}</title>
            </Helmet>

            <a href="/" className="btn btn-sm bg-body-tertiary text-white bgH home-button sticky-top mt-5">
                <i className="bi bi-arrow-left"></i>
            </a>

            <div className="container mt-5">
                <div className="title text-center">
                    <h4>{book?.title}</h4>
                </div>
            </div>
            <div
                id="reader"
                className="d-flex flex-column overflow-y-scroll"
                style={{
                    maxWidth: "1142px",
                    margin: "10px auto",
                }}
            >
                <ChapterButtons book={book} />
                {book?.pages[0]?.images.map((el, index) => (
                    <LazyLoad key={index} offset={300} >
                        <img src={el} alt={book?.title} style={{ width: '100%' }} />
                    </LazyLoad>
                ))}
                <ChapterButtons book={book} />
            </div>
            <div className="ch-progress-bar sticky-bottom">
                <div className="bar">
                    <div className="bar-long"></div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default React.memo(BookReader);
