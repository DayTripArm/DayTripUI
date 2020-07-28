import React from 'react';
import ModalAside from 'shared/components/ModalAside';
import { IconStar, IconDestination, IconFlag, IconGlobe, IconPhone } from 'shared/components/Icons';

const TripDetailsModal = ({ onClose, title = 'Trips' }) => (
  <ModalAside title={title} onClose={onClose}>
    <div className='d-flex align-items-center justify-content-between mb-5'>
      <h4 className='mb-0 text__grey-dark'>Trip Tour</h4>
      <button className='btn btn-secondary btn-sm'>More About</button>
    </div>
    <div className='d-flex'>
      <img
        width='106'
        height='136'
        src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
        alt='garni'
        className='rounded__4 object-pos-center object-fit-cover mr-2'
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
    <hr className='border__top border__default my-4' />
    <div className='d-flex align-items-center justify-content-between mb-5'>
      <h4 className='mb-0 text__grey-dark'>Trip Info</h4>
      <button className='btn btn-secondary btn-sm'>Edit</button>
    </div>
    <div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Day</span>
        <span className='mxw-60pc weight-700'>September 1</span>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Travelers</span>
        <span className='mxw-60pc weight-700'>3 Adults</span>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Trip Duration</span>
        <span className='mxw-60pc weight-700'>8 hours</span>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Order Status</span>
        <span className='mxw-60pc weight-700'>Confirmed on May 2</span>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Order ID</span>
        <span className='mxw-60pc weight-700'>12097</span>
      </div>
    </div>
    <hr className='border__top border__default my-4' />
    <div className='d-flex align-items-center justify-content-between mb-5'>
      <h4 className='mb-0 text__grey-dark'>Pick Up Info</h4>
      <button className='btn btn-secondary btn-sm'>Edit</button>
    </div>
    <div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Time</span>
        <span className='mxw-60pc weight-700'>08:00</span>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Address</span>
        <div className='mxw-60pc d-flex align-items-center weight-700'>
          <IconDestination fill='#757575' className='mr-1' />
          Yerevan, Abelyan st.5
        </div>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Note</span>
        <span className='mxw-60pc weight-700'>Lorem ipsum dolor...</span>
      </div>
    </div>
    <hr className='border__top border__default my-4' />
    <div className='d-flex align-items-center justify-content-between mb-5'>
      <h4 className='mb-0 text__grey-dark'>Driver</h4>
      <button className='btn btn-secondary btn-sm'>View Profile</button>
    </div>
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
    <div>
      <div className='d-flex mb-4'>
        <IconFlag className='mr-2' />
        <p className='mb-0'>
          Nation: <span className='weight-500 text__grey-dark'>Armenia</span>
        </p>
      </div>
      <div className='d-flex mb-4'>
        <IconGlobe className='mr-2' />
        <p className='mb-0'>
          Languages: <span className='weight-500 text__grey-dark'>English, Russian, French</span>
        </p>
      </div>
      <div className='d-flex mb-4'>
        <IconPhone className='mr-2' />
        <p className='mb-0'>
          Number: <span className='weight-500 text__grey-dark'>+374 12 345 678</span>
        </p>
      </div>
    </div>
    <hr className='border__top border__default my-4' />
    <h4 className='mb-5 text__grey-dark'>Price</h4>
    <div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Total Price</span>
        <span className='mxw-60pc weight-700'>$44.00</span>
      </div>
      <div className='d-flex align-items-center justify-content-between text-sm mb-2'>
        <span className='text__grey-dark'>Service Fee</span>
        <span className='mxw-60pc weight-700'>$4.00</span>
      </div>
    </div>
    <hr className='border__top border__default my-4' />
    <div className='mb-3'>
      <div className='d-flex align-items-center justify-content-between text-sm'>
        <span className='text__grey-dark'>Total</span>
        <span className='mxw-60pc weight-700'>$48.00</span>
      </div>
    </div>
    <div className='shadow__4-up p-4 row position-sticky fixed-bottom bg-white translate-y-16'>
      <button className='btn btn-primary btn-block text-uppercase'>Contact to Nane</button>
    </div>
  </ModalAside>
);

export default TripDetailsModal;
