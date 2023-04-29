import React from "react";

const HistoryPart = () => {
    const history = JSON.parse(localStorage.getItem("history")) || [];

    return (
        <div className="row">
            {history.length > 0 ? history.slice(0, 9).map((item, index) => {
                const book = JSON.parse(localStorage.getItem(item)) || [];
                return (
                    <div className="col-12 border-bottom py-3" key={index}>
                        <div className="row">
                            <div className="col-md-4 col-4 col-sm-4">
                                <a href={book.path} className='galleriesThumb'>
                                    <img src={book.thumb} alt={book.title} style={{ width: '100%' }} />
                                </a>
                            </div>
                            <div className="col-md-8 col-8 col-sm-8">
                                <div className="float-start" style={{ width: "100%" }} >
                                    <a href={book.path} className="card-title fw-medium title fs-6 lh-1 " style={{
                                        color: "var(--bs-emphasis-color)"
                                    }}>{book.title}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            }) : <div></div>}
        </div>
    );
}

export default HistoryPart;