import React from 'react';
import Slider from 'react-slick';
import { IconArrowLeft, IconArrowRight } from 'shared/components/Icons';
import Card from 'shared/components/Card';

const SlideNavigation = ({ dir, onClick }) => (
  <button className={`btn btn-circle btn-static btn-circle__primary btn-${dir}`} onClick={onClick}>
    {dir === 'next' ? <IconArrowRight /> : <IconArrowLeft />}
  </button>
);

const CardsLg = () => {
  const settings = {
    className: 'slick-cards',
    infinite: true,
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
    <div className='pl-4'>
      <div className='slider-container'>
        <h2 className='pull-b-8 text__blue'> Top Choices </h2>
        <Slider {...settings}>
          <Card
            favorite
            size='lg'
            imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
          />
          <Card
            favorite
            size='lg'
            imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
          />
          <Card
            favorite
            size='lg'
            imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
          />
          <Card
            favorite
            size='lg'
            imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
          />
          <Card
            favorite
            size='lg'
            imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
          />
        </Slider>
      </div>
    </div>
  );
};

const CardsSm = () => (
  <div className='container'>
    <h2 className='text__blue'> Explore All Day Trips </h2>
    <div className='row row-1'>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          favorite
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          favorite
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          favorite
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
    </div>
  </div>
);

const Cards = () => {
  return (
    <div>
      <div className='mb-10'>
        <CardsLg />
      </div>
      <div>
        <CardsSm />
      </div>
    </div>
  );
};

export default Cards;
