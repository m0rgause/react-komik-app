import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import PageLoader from "../Components/page_loader";
import ImageLoader from "../Components/image_loader";

const ChapterButtons = ({ book }) => {
    return (
        <div className="d-flex justify-content-end my-3">
            <a
                href={book?.prevChapter}
                className={`btn bg-body-tertiary text-white bgH me-2 ${!book?.prevChapter && "disabled"
                    }`}
            >
                &lt; Prev Chapter
            </a>
            <a
                href={book?.nextChapter}
                className={`btn bg-body-tertiary text-white bgH ${!book?.nextChapter && "disabled"
                    }`}
            >
                Next Chapter &gt;
            </a>
        </div>
    );
};

const BookReader = () => {
    const { path } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [book, setBook] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        axios
            .get(`https://api.kikii.me/api/book/${path}`)
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
    }, [path])


    if (isLoading) {
        return <PageLoader />;
    }



    return (
        <HelmetProvider>
            <Helmet>
                <title>{book?.title}</title>
            </Helmet>
            <div className="container mt-5">
                <div className="title text-center">
                    <h4>{book?.title}</h4>
                </div>
            </div>
            <div
                id="reader"
                className="d-flex flex-column "
                style={{
                    maxWidth: "1142px",
                    margin: "10px auto",
                }}
            >
                <ChapterButtons book={book} />
                {book?.pages[0]?.images.map((el, index) => (
                    <ImageLoader key={index} src={el} index={index} alt={book?.title} />
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
