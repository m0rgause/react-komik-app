import React from "react";

const BookStatus = (props) => {
    const { className } = props;
    if (className === 'Ongoing') {
        return (
            <span className="status ongoing bg-danger p-0 py-1 px-2 rounded-circle text-white">
                <i className="bi bi-cup-hot-fill"></i>
            </span>
        );
    } else if (className === 'Completed') {
        return (
            <span className="status completed">
                <i className="bi bi-cup-fill"></i>
            </span>
        );
    }
}

export default BookStatus;