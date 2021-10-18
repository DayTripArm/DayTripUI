import React from 'react';
import Slider from 'react-slick';
import { IconArrowLeft, IconHeartOutlined, IconShare, IconHeartFilled } from 'shared/components/Icons';
import actions from "../../../../actions";
import {HOST_URL} from "../../../../constants";
import {useDispatch} from "react-redux";
import {isAuthorized} from "../../../../helper";
import ProgressiveImage from "react-progressive-image-loading";

const TourIllustration = (props) => {
    const dispatch = useDispatch();


    const {
        id,
        isSaved,
        images=[],
        history,
        booked_trip
    } = props;


    const settings = {
        className: 'slick-gallery',
        infinite: false,
        dots: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const favoriteHandle = () => {
        if(!isAuthorized()) {
            dispatch(actions.showHideSignIn(true));
        } else {
            dispatch(actions.saveTrip(!isSaved, id));
        }
    };

    return (
        <div className='tour-illustration box-overlay overflow-hidden'>
            <Slider {...settings}>
                {
                    images.map((image, i) => {
                        const src = process.env.NODE_ENV === "development" ? HOST_URL + image.url : image.url;

                        return (
                            <ProgressiveImage
                                src={src}
                                key={i}
                                transitionTime={100}
                                render={(src, style) => <img key={i} src={src} style={style} alt='car' className='w-100 object-pos-center object-fit-cover' role='presentation'/>}
                                preview={src}
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
                        { !booked_trip &&
                            <button className='back-btn btn btn-circle border-0 mr-2 mr-md-4'
                                    onClick={() => favoriteHandle()}>
                                {isSaved ? <IconHeartFilled fill='#FE4C30'/> : <IconHeartOutlined/>}
                            </button>
                        }
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
