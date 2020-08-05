import React from 'react';
import Slider from 'react-slick';
import { IconArrowLeft, IconHeartOutlined, IconShare, IconHeartFilled } from 'shared/components/Icons';
import actions from "../../../../actions";
import {useDispatch} from "react-redux";

const TourIllustration = (props) => {
    const dispatch = useDispatch();


    const {
        id,
        isSaved,
        images=[],
        setSaved,
        history,
        onOpenModal,
    } = props;


    const settings = {
        className: 'slick-gallery',
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const favoriteHandle = () => {
        dispatch(actions.saveTrip(!isSaved, id));

        setSaved(!isSaved);
    };

    console.log(" is dsacd", isSaved);

    return (
        <div className='tour-illustration box-overlay overflow-hidden'>
            <Slider {...settings}>
                {
                    images.map((image, i) => {
                        const src = process.env.NODE_ENV === "development"
                            ? "http://localhost:3000" + image.url
                            : image.url;

                        return (
                            <img
                                key={i}
                                src={src}
                                alt='car'
                                className='w-100 object-pos-center object-fit-cover'
                                onClick={onOpenModal}
                                role='presentation'
                            />
                        );
                    })
                }
            </Slider>
            <div className='overlay'>
                <div className='container pt-4 pt-xl-5 d-flex justify-content-between'>
                    <button className='back-btn btn btn-circle border-0' onClick={() => history.goBack()}>
                        <IconArrowLeft />
                    </button>
                    <div>
                        <button className='back-btn btn btn-circle border-0 mr-2 mr-md-4' onClick={() => favoriteHandle()}>
                            {isSaved ? <IconHeartFilled fill='#FE4C30'/> : <IconHeartOutlined/>}
                        </button>
                        <button className='back-btn btn btn-circle border-0'>
                            <IconShare />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourIllustration;
