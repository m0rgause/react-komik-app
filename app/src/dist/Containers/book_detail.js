import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import axios from "axios";
import config from "../../config.json";
import ListCh from "../Components/list_ch";

const BookDetail = () => {
    const { path } = useParams();
    const [result, setResult] = useState([]);
    const [related, setRelated] = useState([]);
    const [search, setSearch] = useState('');
    console.log(search)

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
                            <div className="col-md-3 col-12 text-center">
                                <img src={result?.thumb} alt={result?.title?.english} width="100%" className="mb-3" />
                                <a href="#" className="btn bg-body-tertiary form-control text-white bgH"><i className="bi bi-bookmark"></i> Bookmark</a>
                            </div>
                            <div className="col-md-9 col-12 mt-3">
                                {result?.title?.full !== '' ?
                                    <p className="text-muted lh-1 word-break">{result?.title?.full}</p>
                                    : null}
                                <p className="text-muted" style={{ fontSize: "14px" }}>{result?.description}</p>
                                <div className="d-flex justify-content-md-start justify-content-evenly my-3">
                                    <a href={result?.chapters?.first?.path} className="btn bg-body-tertiary text-white mx-1 bgH"><font className="text-muted">First: </font>{result?.chapters?.first?.ch}</a>
                                    <a href={result?.chapters?.last?.path} className="btn bg-body-tertiary text-white mx-1 bgH"><font className="text-muted">Last: </font>{result?.chapters?.last?.ch}</a>
                                </div>
                                <div className="info d-flex flex-column ">
                                    {result?.info?.status !== '' ?
                                        <span className="border p-2">
                                            <b>Status : </b>
                                            {result?.info?.status}
                                        </span>
                                        : null}
                                    {result?.info?.released !== '' ?
                                        <span className="border p-2">
                                            <b>Released : </b>
                                            {result?.info?.released}
                                        </span>
                                        : null}
                                    {result?.info?.artis !== '' ?
                                        <span className="border p-2">
                                            <b>Artist : </b>
                                            {result?.info?.artis}
                                        </span> : null}
                                    {result?.info?.type !== '' ?
                                        <span className="border p-2">
                                            <b>Type : </b>
                                            {result?.info?.type}
                                        </span> : null}
                                    {result?.info?.author !== '' ?
                                        <span className="border p-2">
                                            <b>Author : </b>
                                            {result?.info?.author}
                                        </span> : null}
                                    {result?.info?.postedOn !== '' ?
                                        <span className="border p-2">
                                            <b>postedOn : </b>
                                            {result?.info?.postedOn}
                                        </span> : null}
                                </div>
                                <div className="genre mt-3">
                                    {result?.genres?.map((genre, index) => (
                                        <a href={genre?.path} className="btn bg-body-tertiary text-white mx-1 my-1 bgH" key={index}>{genre?.tag}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mt-3">
                    <div className="card-body">
                        <div className="searchCH border-bottom pb-3">
                            <input type="text" onChange={(e) => setSearch(e.target.value)} className="form-control" placeholder="Search Chapter" />
                        </div>
                        <div className="listCH mt-3 d-flex flex-column overflow-y-scroll" style={{ height: '300px' }}>
                            <ListCh chapters={result?.chapters} search={search} />
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
}

export default BookDetail;