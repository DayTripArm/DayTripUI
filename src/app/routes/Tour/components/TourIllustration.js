import React from 'react';
import Slider from 'react-slick';
import { IconArrowLeft, IconHeartOutlined, IconShare } from 'shared/components/Icons';

const TourIllustration = ({ history, onOpenModal }) => {
  const settings = {
    className: 'slick-gallery',
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='tour-illustration box-overlay overflow-hidden'>
      <Slider {...settings}>
        <img
          src='https://www.advantour.com/img/armenia/kotayk/garni.jpg'
          alt='car'
          className='w-100 object-pos-center object-fit-cover'
          onClick={onOpenModal}
          role='presentation'
        />
        <img
          src='https://www.advantour.com/img/armenia/kotayk/garni.jpg'
          alt='car'
          className='w-100 object-pos-center object-fit-cover'
          onClick={onOpenModal}
          role='presentation'
        />
        <img
          src='https://www.advantour.com/img/armenia/kotayk/garni.jpg'
          alt='car'
          className='w-100 object-pos-center object-fit-cover'
          onClick={onOpenModal}
          role='presentation'
        />
      </Slider>
      <div className='overlay'>
        <div className='container pt-4 pt-xl-5 d-flex justify-content-between'>
          <button className='back-btn btn btn-circle border-0' onClick={() => history.goBack()}>
            <IconArrowLeft />
          </button>
          <div>
            <button className='back-btn btn btn-circle border-0 mr-2 mr-md-4'>
              <IconHeartOutlined />
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
