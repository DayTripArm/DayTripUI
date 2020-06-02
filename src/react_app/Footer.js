import React from "react";

function Footer(props) {
    return (
        <footer>
            <span className="copyright">© Daytrip. All rights reserved.</span>
            <div className="wrapper">
                <span className="terms-conditions"><a href={() => {}}>Terms & Conditions</a></span>
                <span className="help"><a href={() => {}}>Help</a></span>
                <div className="icons">
                    <span className="fb"> </span>
                    <span className="insta"> </span>
                    <span className="twitter"> </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;