import React from 'react';
import Slider from 'react-slick';

const Gallery = () => {
  const settings = {
    className: 'slick-gallery',
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 2,
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
      <Slider {...settings}>
        <img
          src='https://www.market2cars.com/wp-content/uploads/2019/11/960x0.jpg'
          alt='car'
          className='rounded__4'
        />
        <img
          src='https://www.market2cars.com/wp-content/uploads/2019/11/960x0.jpg'
          alt='car'
          className='rounded__4'
        />
        <img
          src='https://www.market2cars.com/wp-content/uploads/2019/11/960x0.jpg'
          alt='car'
          className='rounded__4'
        />
      </Slider>
    </div>
  );
};

export default Gallery;
