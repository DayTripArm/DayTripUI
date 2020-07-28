import React, { useState } from 'react';
import { IconSetting } from 'shared/components/Icons';
import TripDetailsModal from '../Messaging/components/TripDetailsModal';
import SettingsModal from './components/SettingsModal';

const Calendar = () => {
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  return (
    <>
      <div className='container'>
        <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
          <div className='d-flex align-items-center justify-content-between mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13 '>
            <h2 className='text__blue mb-0'>Calendar</h2>
            <button className='btn btn-circle border-0' onClick={() => setOpenSettingsModal(true)}>
              <IconSetting />
            </button>
          </div>
          <div className='p-1 border-style border__default'>CALENDAR AREA</div>
          <h2 className='text__blue mt-9 mb-2 mt-md-13 mb-md-6 mt-xl-15'>Overview</h2>
          <p>March 1, 2020</p>
          <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center'>
            <div>
              <div className='px-4 pt-4 pb-11 pt-md-5 pb-md-5 px-md-5 d-flex position-relative'>
                <img
                  width='78'
                  height='98'
                  src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
                  alt='garni'
                  className='rounded__4 object-pos-center object-fit-cover mr-3'
                />
                <div>
                  <p className='weight-500 mb-1'>Garni Temple and Geghard Monastery</p>
                  <p className='mb-1 text-xs'>
                    <span className='weight-500'>Day:</span>{' '}
                    <span className='weight-500 text__grey-dark'>September 1</span>
                  </p>
                  <p className='mb-0 text-xs'>
                    <span className='weight-500'>Travelers:</span>{' '}
                    <span className='weight-500 text__grey-dark'>3 Adults</span>
                  </p>
                  <div className='cancelation-container d-inline-block text-center py-2 py-md-0'>
                    <button className='btn btn-secondary btn-sm'>Cancelation</button>
                  </div>
                </div>
              </div>
            </div>
            <hr className='border__top border__default my-0' />
            <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
              <button
                className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
                onClick={() => setOpenDetailsModal(true)}
              >
                Details
              </button>
              <button className='btn btn-secondary text-uppercase'>Contact Traveler</button>
            </div>
          </div>
        </div>
      </div>
      {openSettingsModal && <SettingsModal onClose={() => setOpenSettingsModal(false)} />}
      {openDetailsModal && (
        <TripDetailsModal title='March 18' onClose={() => setOpenDetailsModal(false)} />
      )}
    </>
  );
};

export default Calendar;
