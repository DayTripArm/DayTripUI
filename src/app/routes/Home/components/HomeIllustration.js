import React from 'react';
import {useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {HOST_URL} from "../../../../constants";
import ProgressiveImage from "react-progressive-image-loading";

const HomeIllustration = () => {
    const {travelerData={}} = useSelector(state => state);
    const {heroes={}} = travelerData;
    console.log(heroes)
    const {
        btn_link,
        btn_title,
        description,
        image={},
        title
    } = heroes;

    const src = process.env.NODE_ENV === "development" ? HOST_URL + image.url : image.url;

    return (
        <>
            <div className='home-illustration box-overlay'>
                {/* if src is undefined  show empty img for keep container width/height (via style) proportion  */}
                {image.url ? <ProgressiveImage
                    src={src}
                    transitionTime={100}
                    render={(src, style) => <img src={src} style={style} alt='' className='w-100 object-pos-center object-fit-cover'/>}
                    preview={src}
                /> : <img src="" alt="" />}

                <div className='overlay'>
                    <div className='container illustration-inner'>
                        <div className='col-md-10 col-lg-8 col-xl-6 col-xxl-5 px-0 px-md-4'>
                            <h1 className='text-white mb-4'>{title}</h1>
                            <h4 className='text-white mb-5 weight-300' dangerouslySetInnerHTML={{__html: description}}></h4>
                            <Link to={`/${btn_link}`}>
                                <button className='btn btn-secondary'>{btn_title}</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomeIllustration;
