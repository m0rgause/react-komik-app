import React, { useState, useEffect, useCallback } from "react";
import ImageLoader from "../Components/image_loader";
import PageLoader from "../Components/page_loader";

const Bookmark = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getBookmark = useCallback(() => {
        setBookmarks(JSON.parse(localStorage.getItem("bookmarks")) || []);
    }, []);

    useEffect(() => {
        getBookmark();
        setIsLoading(false);
    }, [getBookmark]);

    if (isLoading) {
        return <PageLoader />
    }

    const handleUnbookmark = (item) => {
        if (window.confirm("Are you sure to delete this bookmark?")) {
            const thumb = item?.thumb;
            const newBookmarks = bookmarks.filter((bookmark) => bookmark.thumb !== thumb);
            localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
            setBookmarks(newBookmarks);
        }
    }

    return (
        <div className="container">
            <div className="card mt-5 shadow">
                <div className="card-header">
                    <div className="d-flex">
                        <div style={{
                            backgroundColor: "var(--bs-secondary-bg)",
                            marginBottom: "-10px"
                        }} className="px-3 pt-2 rounded-top">
                            <h6 className="card-title">Bookmark</h6>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row">
                        {bookmarks.length > 0 ? bookmarks.slice(0, 9).map((item, index) => {
                            return (
                                <div key={index} className="col-6 col-md-3 px-2 my-2">
                                    <div className="card popular">
                                        <a href={'/book/' + item?.path}>
                                            <div className="thumb mb-3" >
                                                <ImageLoader src={item?.thumb} alt={item?.title.english} />
                                            </div>
                                        </a>
                                        <div className="card-body">
                                            <h6 className="card-title title fs-6 lh-1 word-break text-center" style={{
                                                color: "var(--bs-emphasis-color)"
                                            }}>{item.title.english}</h6>
                                            <button onClick={(e) => { handleUnbookmark(item) }} className={`bookmark mt-2 btn btn-sm form-control text-white bgH bg-body-tertiary`}><i className={`bi bi-trash`}></i> Hapus</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div>Tidak ada Bookmark</div>}
                    </div>
                </div>
            </div>
        </div >
    )
}
export default Bookmark;