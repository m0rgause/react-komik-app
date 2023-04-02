import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";

const BookDetail = () => {
    const { path } = useParams();
    const [book, setBook] = React.useState({});

    React.useEffect(() => {
        axios.get(config.server + "/api/book/" + path).then((res) => {
            setBook(res.data.result);
        });
    }, [path]);

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.prevChapter}</p>
        </div>
    );
}

export default BookDetail;