import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import config from "../../config.json";

const BookDetail = () => {
    const { path } = useParams();
    const [result, setResult] = useState([]);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        axios.get(`${config.server}api/book/detail/${path}`)
            .then((response) => {
                setResult(response.data.result);
                setRelated(response.data.related);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{result?.title?.english}</title>
            </Helmet>
            <div className="container mt-5">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex">
                            <div style={{
                                backgroundColor: "var(--bs-body-bg)",
                                marginBottom: "-10px"
                            }} className="px-3 pt-2 rounded-top">
                                <h6 className="card-title text-center">{result?.title?.english}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-2 col-12 text-center">
                                <img src={result?.thumb} alt={result?.title?.english} width="100%" className="mb-3" />
                                <a href="asd" className="btn bg-body-tertiary form-control text-white"><i className="bi bi-bookmark"></i> Bookmark</a>
                            </div>
                            <div className="col-md-10 col-12 mt-3">
                                <p className="text-muted lh-1 word-break">{result?.title?.full}</p>
                                <p className="text-muted" style={{ fontSize: "14px" }}>{result?.description}</p>
                                <div className="d-flex justify-content-md-start justify-content-evenly my-3">
                                    <a href={result?.chapters?.first?.path} className="btn bg-body-tertiary text-white mx-1"><font className="text-muted">First: </font>{result?.chapters?.first?.ch}</a>
                                    <a href={result?.chapters?.last?.path} className="btn bg-body-tertiary text-white mx-1"><font className="text-muted">Last: </font>{result?.chapters?.last?.ch}</a>
                                </div>
                                <div className="info">
                                    <span>
                                        <b>Status : </b>
                                        {result?.info?.status}
                                    </span>
                                    <span>
                                        <b>Released : </b>
                                        {result?.info?.released}
                                    </span>
                                    <span>
                                        <b>Artist : </b>
                                        {result?.info?.artis}
                                    </span>
                                    <span>
                                        <b>Type : </b>
                                        {result?.info?.type}
                                    </span>
                                    <span>
                                        <b>Author : </b>
                                        {result?.info?.author}
                                    </span>
                                    <span>
                                        <b>postedOn : </b>
                                        {result?.info?.postedOn}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}

export default BookDetail;