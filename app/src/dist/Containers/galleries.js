import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import PageLoader from "../Components/page_loader";
import ImageLoader from "../Components/image_loader";
import BookType from "../Components/book_type";
import BookStatus from "../Components/book_status";

const decimalToPercent = (decimal) => {
    return Math.round(decimal * 10) + "%";
}


const Galleries = () => {
    let { uri, page } = useParams();
    page = page ? page : 1;
    const location = useLocation();

    function getQueryParam(paramName, defaultValue) {
        let queryParams = new URLSearchParams(location.search);
        let paramValue = queryParams.get(paramName);
        return paramValue !== null && paramValue !== '' ? paramValue : defaultValue;
    }

    let status = getQueryParam("status", "all");
    let order = getQueryParam("order", "update");
    let type = getQueryParam("type", "all");
    const [newStatus, setNewStatus] = useState(status);
    const [newOrder, setNewOrder] = useState(order);
    const [newType, setNewType] = useState(type);

    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(`${config.server}galleries/${uri ? uri : 'manga'}/${page}?=${status}&order=${order}&type=${type}`)
            .then((res) => {
                setGalleries(res.data.result);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <PageLoader />;
    }

    const availableStatuses = ['all', 'ongoing', 'completed', 'hiatus'];
    const availableOrders = ['default', 'title', 'titlereverse', 'update', 'latest', 'popular'];
    const availableTypes = ['all', 'manga', 'manhwa', 'manhua', 'comic', 'novel'];

    return (
        <div className="container mt-5">
            <div className="card mt-3">
                <div className="card-header">
                    <div className="d-flex">
                        <div style={{
                            backgroundColor: "var(--bs-secondary-bg)",
                            marginBottom: "-10px"
                        }} className="px-3 pt-2 rounded-top">
                            <h6 className="card-title">Galleries</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form className="row my-3">
                        <div className="col-3">
                            <select name="status" value={newStatus} className="form-select form-select-sm" onChange={(e) => setNewStatus(e.target.value)}>
                                {availableStatuses.map((status, i) => <option key={i} value={status}>{status}</option>)}
                            </select>
                        </div>
                        <div className="col-3">
                            <select name="order" value={newOrder} className="form-select form-select-sm" onChange={(e) => setNewOrder(e.target.value)}>
                                {availableOrders.map((order, i) => <option key={i} value={order}>{order}</option>)}
                            </select>
                        </div>
                        <div className="col-3">
                            <select name="type" value={newType} className="form-select form-select-sm" onChange={(e) => setNewType(e.target.value)}>
                                {availableTypes.map((type, i) => <option key={i} value={type}>{type}</option>)}
                            </select>
                        </div>
                        <div className="col-3">
                            <button type="submit" className="btn btn-sm bg-body-tertiary form-control">Apply</button>
                        </div>
                    </form>
                    <div className="row d-flex justify-content-evenly">
                        {galleries?.map((el, index) => (
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
                                }} href={`/galleries/${uri ? uri : 'manga'}/${parseInt(page) - 1}`}>← Sebelumnya</a></li>
                                <li className={'page-item'}><a className={"page-link title"} style={{
                                    color: "var(--bs-emphasis-color)",
                                    backgroundColor: "var(--bs-secondary-bg)",
                                }} href={`/galleries/${uri ? uri : 'manga'}/${parseInt(page) + 1}`}>Selanjutnya →</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Galleries;