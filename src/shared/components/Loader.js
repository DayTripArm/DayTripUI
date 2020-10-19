import React from 'react';
import LoaderSVG from 'assets/images/Loader.svg';
// class name _loader_svg.scss

const Loader = ({text=""}) => {
    return (
        <>
            <div id="loader">
                <div className="svg-loader">
                    <img alt="" src={LoaderSVG} />
                </div>
                <div className="svg-text">
                    {text}
                </div>
            </div>
        </>
    )
};

export default Loader;
