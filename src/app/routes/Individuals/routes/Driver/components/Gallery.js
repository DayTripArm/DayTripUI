import React from 'react';
import Slider from 'react-slick';

const Gallery = (props) => {
    const {car_photos} = props;
    const settings = {
        className: 'slick-gallery',
        infinite: true,
        dots: true,
        speed: 500,
        slidesToShow: car_photos.length > 1 ? 2 : 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
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
        <div>
            <Slider {...settings} >
                {
                    car_photos.map((photo, id) => {
                        const src = process.env.NODE_ENV === "development"
                            ? "http://localhost:3000" + photo.full_path
                            : photo.full_path;

                        return (
                            <img
                                key={id}
                                src={src}
                                alt='car'
                                className='upload-img-big rounded__4 object-fit-contain object-position-center bg__grey mb-4'
                            />
                        )
                    })
                }
            </Slider>
        </div>
    );
};

export default Gallery;
