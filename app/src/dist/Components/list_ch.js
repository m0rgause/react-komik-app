import React from "react";

const ListCh = (props) => {
    let { chapters, search } = props;
    chapters = chapters?.list;
    if (search !== '') {
        chapters = chapters?.filter((chapter) => {
            return chapter.ch.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        console.log(chapters)
    }

    return (
        <>
            {chapters?.map((chapter, index) => (
                <a key={index} href={chapter.path} className="border my-1 rounded p-2 bgH" style={{
                    color: "var(--bs-body-color)",
                }}>
                    <span>{chapter.ch}</span>
                    <span className="text-muted float-end">{chapter.uploaded}</span>
                </a>
            ))}
        </>
    );
}

export default ListCh;