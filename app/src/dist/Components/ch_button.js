const ChapterButtons = ({ book }) => {
    return (
        <div className="d-flex justify-content-end my-3">
            <a
                href={book?.prevChapter}
                className={`btn btn-sm bg-body-tertiary text-white bgH me-2 ${!book?.prevChapter && "disabled"
                    }`}
            >
                &lt; Prev Chapter
            </a>
            <a
                href={book?.nextChapter}
                className={`btn btn-sm bg-body-tertiary text-white bgH ${!book?.nextChapter && "disabled"
                    }`}
            >
                Next Chapter &gt;
            </a>
        </div>
    );
};

export default ChapterButtons;