import React from 'react';
import Input from 'shared/components/Input';
import {
  IconDestination,
  IconStar,
  IconGlobe,
  IconCar,
  IconNoSmoking,
  IconPetStep,
} from 'shared/components/Icons';
import Textarea from 'shared/components/Textarea';
import { Link } from 'react-router-dom';

const Review = () => {
  return (
    <>
      <div className='col-lg-5 col-xl-4 col-xxl-3 px-0 mb-10'>
        <h2 className='text__blue'>Review Your Trip</h2>
        <h4 className='text__grey-dark mb-4'>Pick Up Information</h4>
        <Input type='text' label='Pick Up Time' placeholder='Select the time' />
        <Input
          type='text'
          name='locationMap'
          label='Pick Up Location'
          placeholder='Select Location'
          icon={IconDestination}
          iconPosition='right'
          containerClass='mb-8'
        />
        <Textarea
          name='field5'
          label='Text'
          placeholder='Description'
          value=''
          className='h-152px'
        />
        <Link to='/checkout/payment' className='btn btn-primary text-uppercase'>
          Continue
        </Link>
      </div>
      <div className='col-lg-5 col-xl-4 col-xxl-3 px-0'>
        <div className='rounded__4 border-style border__default'>
          <div className='p-4 d-flex'>
            <img
              width='106'
              height='136'
              src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
              alt='garni'
              className='rounded__4 object-pos-center object-fit-cover mr-3'
            />
            <div>
              <p className='weight-500 mb-2'>Garni Temple and Geghard Monastery</p>
              <p className='mb-0'>
                <span className='weight-700'>5.0</span>
                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                <span className='text-sm text__grey-dark'>(125 reviews)</span>
              </p>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>Day</span>
              <span className='weight-500'>September 1</span>
            </div>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>Travelers</span>
              <span className='weight-500'>3 Adults</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>Trip Duration</span>
              <span className='weight-500'>8 hours</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='p-4'>
            <div className='d-flex justify-content-between mb-2'>
              <span className='text-sm text__grey-dark'>Trip Price</span>
              <span className='weight-500'>$44.00</span>
            </div>
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>Service Fee</span>
              <span className='weight-500'>$4.00</span>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex justify-content-between'>
              <span className='text-sm text__grey-dark'>Total</span>
              <span className='weight-500'>$48.00</span>
            </div>
          </div>
          <hr className='border__top border__default m-0' />
          <div className='pt-3 px-4 pb-4'>
            <p className='text-center'>
              <button className='btn btn-secondary btn-sm'>Less Details</button>
            </p>
            <div className='d-flex'>
              <img
                width='56'
                height='56'
                src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
                alt='user'
                className='rounded__50 object-pos-center object-fit-cover mr-3'
              />
              <div>
                <p className='weight-500 pt-1 mb-0'>Nane Minasyan</p>
                <p className='mb-0'>
                  <span className='weight-700'>5.0</span>
                  <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                  <span className='text-sm text__grey-dark'>(125 reviews)</span>
                </p>
              </div>
            </div>
            <hr className='border__top border__default my-4' />
            <div className='d-flex mb-4'>
              <IconGlobe className='mr-2' />
              <p className='mb-0'>
                Languages:{' '}
                <span className='weight-500 text__grey-dark'>English, Russian, French</span>
              </p>
            </div>
            <div className='d-flex mb-4'>
              <IconCar className='mr-2' />
              <p className='mb-0'>
                Car: <span className='weight-500 text__grey-dark'>Mercedes Benz C130</span>
              </p>
            </div>
            <div className='d-flex mb-4'>
              <IconNoSmoking className='mr-2' />
              <p className='mb-0'>
                Smoking: <span className='weight-500 text__grey-dark'>No</span>
              </p>
            </div>
            <div className='d-flex'>
              <IconPetStep className='mr-2' />
              <p className='mb-0'>
                Pets Allowed: <span className='weight-500 text__grey-dark'>Yes</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
