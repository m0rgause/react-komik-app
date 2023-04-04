import React from "react";

const Footer = () => {
    return (
        <div className="footer mt-5 text-center text-white py-3" >
            <div className="bg-body-tertiary" style={{ height: "20px" }}>
                <div className="container pt-3" style={{
                    color: "var(--bs-body-color)",
                }}>
                    <br />
                    <div>
                        Developed with <i className="bi bi-heart-fill text-danger"></i> by <a target="_blank" href="https://github.com/m0rgause" title="m0rgause">m0rgause</a>
                    </div>
                    <div>
                        <a href="#" title="Join">JOIN</a> Discord For Issue & Bugs
                    </div>
                    <div>
                        Running <a href="#">App</a> v1.0.0 Powered by React.js
                    </div>
                    <br />
                    <div>
                        All the comics on this app are only previews of the original comics, there may be many language errors, character names, and story lines.<br /> For the original version, please buy the comic if it's available in your city.
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default Footer;