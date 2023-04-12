import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import ImageLoader from "../Components/image_loader";
import PageLoader from "../Components/page_loader";

const BookReader = () => {
    const { path } = useParams();
    const [book, setBook] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.kikii.me/api/book/${path}`)
            .then((response) => {
                setBook(response.data.result);
                setIsLoading(false);
            })
            .catch((error) => { console.log(error); setIsLoading(false) });
    }, [])

    if (isLoading) {
        return <PageLoader />
    }

    return (
        <HelmetProvider>
            <Helmet><title>{book?.title}</title></Helmet>
        </HelmetProvider>
    )
}
export default BookReader;