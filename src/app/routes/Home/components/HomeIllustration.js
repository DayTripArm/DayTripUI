import React from 'react';
import {useSelector} from "react-redux";

const HomeIllustration = () => {
    const {travelerData={}} = useSelector(state => state);
    const {heroes={}} = travelerData;
    const {
        // btn_link,
        btn_title,
        description,
        image={},
        title
    } = heroes;

    const src = process.env.NODE_ENV === "development" ? "http://localhost:3000" + image.url : image.url;

    return (
        <>
            <div className='home-illustration box-overlay'>
                <img src={src} alt='' className='w-100 object-pos-center object-fit-cover'/>
                <div className='overlay'>
                    <div className='container illustration-inner'>
                        <div className='col-md-10 col-lg-8 col-xl-6 col-xxl-5 px-0 px-md-4'>
                            <h1 className='text-white mb-4'>{title}</h1>
                            <h4 className='text-white mb-5 weight-300' dangerouslySetInnerHTML={{__html: description}}></h4>
                            <button className='btn btn-secondary'>{btn_title}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default HomeIllustration;
