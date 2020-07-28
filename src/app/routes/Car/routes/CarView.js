import React from 'react';

const CarView = () => {
  return (
    <>
      <div className='d-flex align-items-end justify-content-between mb-4'>
        <p className='weight-700 mb-0'>Car Image</p>
        <button className='btn btn-secondary btn-sm'>Add a new image</button>
      </div>
      <div className='row'>
        <div className='col-6 col-md-4 mb-4'>
          <img
            src='https://www.market2cars.com/wp-content/uploads/2019/11/960x0.jpg'
            alt='car'
            className='rounded__4'
          />
        </div>
        <div className='col-6 col-md-4 mb-4'>
          <img
            src='https://www.market2cars.com/wp-content/uploads/2019/11/960x0.jpg'
            alt='car'
            className='rounded__4'
          />
        </div>
        <div className='col-6 col-md-4 mb-4'>
          <img
            src='https://www.market2cars.com/wp-content/uploads/2019/11/960x0.jpg'
            alt='car'
            className='rounded__4'
          />
        </div>
      </div>
      <hr className='border__top border__default mt-0 mb-4' />
      <div className='mb-2 d-flex justify-content-between'>
        <p className='weight-700 mb-0'>What is Your Car Type?</p>
        <button className='btn btn-secondary btn-sm'>Edit</button>
      </div>
      <p className='mb-0 text__grey-dark'>Sedan</p>
      <hr className='border__top border__default my-4' />
      <div className='mb-2 d-flex justify-content-between'>
        <p className='weight-700 mb-0'>What is Your Car Mark?</p>
        <button className='btn btn-secondary btn-sm'>Edit</button>
      </div>
      <p className='mb-0 text__grey-dark'>Chevrolet</p>
      <hr className='border__top border__default my-4' />
      <div className='mb-2 d-flex justify-content-between'>
        <p className='weight-700 mb-0'>What is Your Car Model?</p>
        <button className='btn btn-secondary btn-sm'>Edit</button>
      </div>
      <p className='mb-0 text__grey-dark'>Corvette</p>
      <hr className='border__top border__default my-4' />
      <div className='mb-2 d-flex justify-content-between'>
        <p className='weight-700 mb-0'>Year</p>
        <button className='btn btn-secondary btn-sm'>Edit</button>
      </div>
      <p className='mb-0 text__grey-dark'>2020</p>
      <hr className='border__top border__default my-4' />
      <div className='mb-2 d-flex justify-content-between'>
        <p className='weight-700 mb-0'>Color</p>
        <button className='btn btn-secondary btn-sm'>Edit</button>
      </div>
      <p className='mb-0 text__grey-dark'>Red</p>
      <hr className='border__top border__default mt-4 mb-0' />
    </>
  );
};

export default CarView;
