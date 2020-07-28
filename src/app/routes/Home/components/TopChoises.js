import React from 'react';
import Slider from 'react-slick';
import { IconArrowLeft, IconArrowRight } from 'shared/components/Icons';
import Card from 'shared/components/Card';

const SlideNavigation = ({ dir, onClick }) => (
  <button className={`btn btn-circle btn-static btn-circle__primary btn-${dir}`} onClick={onClick}>
    {dir === 'next' ? <IconArrowRight /> : <IconArrowLeft />}
  </button>
);

const TopChoises = () => {
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
    <>
      <h2 className='pull-b-8 text__blue'> Top Choices </h2>
      <Slider {...settings}>
        <Card
          size='lg'
          favorite
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
        />
        <Card
          size='lg'
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
        />
        <Card
          size='lg'
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
        />
        <Card
          size='lg'
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
        />
        <Card
          size='lg'
          imageUrl='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
        />
      </Slider>
    </>
  );
};

export default TopChoises;
