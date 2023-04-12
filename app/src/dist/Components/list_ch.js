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
                <a key={index} href={chapter.path} className="border my-1 p-2 me-2 bgH" style={{
                    color: "var(--bs-body-color)",
                }}>
                    {chapter.ch}
                </a>
            ))}
        </>
    );
}

export default ListCh;