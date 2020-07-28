import React from 'react';

const ContactInner = () => (
  <>
    <div className='d-flex'>
      <img
        width='56'
        height='56'
        src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
        alt='user'
        className='rounded__50 object-pos-center object-fit-cover mr-3'
      />
      <div>
        <p className='weight-500 pt-2 mb-0 text-sm'>Nane Minasyan</p>
        <p className='mb-0 text-xs text__grey-dark'>Yesterday</p>
      </div>
    </div>
    <div className='dsc-text col-6 col-lg-4 col-xl-3 text__grey-dark weight-700 d-none d-md-block'>
      Garni Temple and Geghard Monastery
    </div>
    <div className='dsc-text col-4 col-xl-5 col-xxl-4 text__grey-dark d-none d-lg-block'>
      Yerevan, Hrachya Qochar st. 12,(September 1 - 08:00)
    </div>
    <span className='weight-500 text-xs'>Pending</span>
  </>
);

const ContactList = ({ onClick }) => (
  <ul className='contacts-list no-list-style mb-0 overflow-auto py-5'>
    <li className='text-separator'>
      <span className='separator-content text-xs text__grey-dark py-1 px-2'>October, 2019</span>
    </li>
    <li
      className='p-4 d-flex align-items-center justify-content-between clickable'
      tabIndex='0'
      onClick={onClick}
      role='presentation'
    >
      <ContactInner />
    </li>
    <li>
      <hr className='border__top border__default my-0' />
    </li>
    <li
      className='p-4 d-flex align-items-center justify-content-between clickable'
      tabIndex='0'
      onClick={onClick}
      role='presentation'
    >
      <ContactInner />
    </li>
    <li>
      <hr className='border__top border__default my-0' />
    </li>
    <li
      className='p-4 d-flex align-items-center justify-content-between clickable'
      tabIndex='0'
      onClick={onClick}
      role='presentation'
    >
      <ContactInner />
    </li>
    <li className='text-separator'>
      <span className='separator-content text-xs text__grey-dark py-1 px-2'>October, 2019</span>
    </li>
    <li
      className='p-4 d-flex align-items-center justify-content-between clickable'
      tabIndex='0'
      onClick={onClick}
      role='presentation'
    >
      <ContactInner />
    </li>
    <li>
      <hr className='border__top border__default my-0' />
    </li>
  </ul>
);

export default ContactList;
