import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import PageLoader from "../Components/page_loader";
import ImageLoader from "../Components/image_loader";
import BookType from "../Components/book_type";
import BookStatus from "../Components/book_status";

const decimalToPercent = (decimal) => {
    return Math.round(decimal * 10) + "%";
}
const NotFound = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="text-center">
                        <h1 className="display-2">404</h1>
                        <p className="lead">Halaman tidak ditemukan.</p>
                        <a href="/" className="btn my-2">Kembali ke Beranda</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Genres = () => {
    let { page, path } = useParams();
    path = path.replaceAll(" ", "");
    page = page ? page : 1;
    const [books, setBooks] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`${config.server}/genres/${path}/${page}`).then((res) => {
            console.log(res.data.result);
            setBooks(res.data.result);
            setMaxPage(res.data.maxPage);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(true);
        })
    }, [page]);

    if (loading) {
        return (
            <PageLoader />
        )
    }

    if (books === "") {
        return (<NotFound />)
    }
    return (
        <div className="container mt-5">
            <div className="card mt-3">
                <div className="card-header">
                    <div className="d-flex">
                        <div style={{
                            backgroundColor: "var(--bs-secondary-bg)",
                            marginBottom: "-10px"
                        }} className="px-3 pt-2 rounded-top">
                            <h6 className="card-title">{path.toUpperCase()}</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row d-flex justify-content-evenly">
                        {books?.map((el, index) => (
                            <div className="col-6 col-md-2 px-2 my-2" key={index}>
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
                        ))}

                        {/* pagination */}
                        <div className="d-flex justify-content-center my-4">
                            <ul className="pagination">
                                <li className={page <= 1 ? 'page-item disabled' : 'page-item'}><a className="page-link title" style={{
                                    color: "var(--bs-emphasis-color)",
                                    backgroundColor: "var(--bs-secondary-bg)",
                                }} href={`/genres/${path}/${parseInt(page) - 1}`}>← Sebelumnya</a></li>
                                <li className={page >= maxPage ? 'page-item disabled' : 'page-item'}><a className={"page-link title"} style={{
                                    color: "var(--bs-emphasis-color)",
                                    backgroundColor: "var(--bs-secondary-bg)",
                                }} href={`/genres/${path}/${parseInt(page) + 1}`}>Selanjutnya →</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Genres;