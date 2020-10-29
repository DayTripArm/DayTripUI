import React from 'react';
import Slider from 'react-slick';
import { IconArrowLeft, IconArrowRight } from 'shared/components/Icons';
import Card from 'shared/components/Card';
import {useSelector} from "react-redux";
import _ from "lodash";

const SlideNavigation = ({ dir, onClick }) => (
    <button className={`btn btn-circle btn-static btn-circle__primary btn-${dir}`} onClick={onClick}>
        {dir === 'next' ? <IconArrowRight /> : <IconArrowLeft />}
    </button>
);

const TopChoises = () => {
    const {travelerData={}} = useSelector(state => state);
    const {trips=[]} = travelerData;

    const top_choices = _.filter(trips, item => item.trip.is_top_choice) || [];

    const settings = {
        className: 'slick-cards',
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <SlideNavigation dir='next' />,
        prevArrow: <SlideNavigation dir='prev' />,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <>
            <h2 className='pull-b-8 text__blue'> Top Choices </h2>
            <Slider {...settings}>
                {
                    top_choices.map(trip => {
                        const src = process.env.NODE_ENV === "development"
                            ? "http://localhost:3000" + trip.trip.images[0].url
                            : trip.trip.images[0].url;
                        return (
                            <Card
                                key={trip.trip.id}
                                size='lg'
                                favorite={trip.is_saved}
                                imageUrl={src}
                                title={trip.trip.title}
                                trip_duration={trip.trip.trip_duration}
                                id={trip.trip.id}
                            />
                        );
                    })
                }
            </Slider>
        </>
    );
};

export default TopChoises;
