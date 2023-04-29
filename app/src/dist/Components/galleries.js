import React from 'react'
import ImageLoader from './image_loader'

const Galleries = (props) => {
    return (
        <div className="card mt-5 shadow">
            <div className="card-header">
                <div className="d-flex">
                    <div style={{
                        backgroundColor: "var(--bs-secondary-bg)",
                        marginBottom: "-10px"
                    }} className="px-3 pt-2 rounded-top">
                        <h6 className="card-title">{props.title}</h6>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="row">
                    {props.data.map((el, index) => (
                        <div key={index} className="col-md-6 col-lg-4 py-3 border-bottom">
                            <div className="row">
                                <div className="col-md-4 col-4 col-sm-4">
                                    <a href={"book/" + el.path} className='galleriesThumb'>
                                        <ImageLoader src={el.thumb} alt={el.title} />
                                    </a>
                                </div>
                                <div className="col-md-8 col-8 col-sm-8">
                                    <div className="float-start" style={{ width: "100%" }} >
                                        <a href={"book/" + el.path} className="card-title fw-medium title fs-6 lh-1 word-break" style={{
                                            color: "var(--bs-emphasis-color)"
                                        }}>{el.title}</a>
                                        <div className="chInfo mt-2">
                                            <ul style={{ paddingLeft: "1rem" }}>
                                                {el.chapters.map((ell, i) => (
                                                    <li key={i}>
                                                        <div className="float-start">
                                                            <a className="title fw-light" style={{
                                                                color: "rgba(var(--bs-emphasis-color-rgb), .8)",
                                                                fontSize: "14px"
                                                            }} href={ell.path}>{ell.ch}</a>
                                                        </div>
                                                        <div className="float-end">
                                                            <span className="text-muted" style={{
                                                                fontSize: "12px"
                                                            }}>{ell.date_updated}</span>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default Galleries