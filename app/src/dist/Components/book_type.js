import React from "react";

const BookType = (props) => {
    const { className } = props;
    if (className === ' Manga') {
        return (
            <span className="type manga"><img alt="Type" src={'assets/img/manga.png'} /></span>
        );
    } else if (className === ' Manhua') {
        return (
            <span className="type manhua"><img alt="Type" src={'assets/img/manhua.png'} /></span>
        );
    } else if (className === ' Manhwa') {
        return (
            <span className="type manhwa"><img alt="Type" src={'assets/img/manhwa.png'} /></span>
        );
    }
}

export default BookType;