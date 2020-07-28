import React, { useState } from 'react';
import { IconStar } from 'shared/components/Icons';
import SelectCustom from 'shared/components/SelectCustom';
import ReviewModal from './components/ReviewModal';
import DetailsModal from './components/DetailsModal';
import NoResults from './components/NoResults';

const UpcomingTrips = ({ onDetailsModal }) => (
  <>
    <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center mb-2'>
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
          onClick={onDetailsModal}
        >
          Details
        </button>
        <button className='btn btn-secondary btn-secondary__grey text-uppercase'>
          Contact Traveler
        </button>
      </div>
    </div>
    <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center mb-2'>
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
          onClick={onDetailsModal}
        >
          Details
        </button>
        <button className='btn btn-secondary btn-secondary__grey text-uppercase'>
          Contact Traveler
        </button>
      </div>
    </div>
    <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center mb-2'>
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
          onClick={onDetailsModal}
        >
          Details
        </button>
        <button className='btn btn-secondary btn-secondary__grey text-uppercase'>
          Contact Traveler
        </button>
      </div>
    </div>
  </>
);

const PastTrips = ({ onDetailsModal, onReviewModal }) => (
  <>
    <SelectCustom
      name='select'
      placeholder='All Trips(4)'
      iconPosition='left'
      options={[
        { label: 'Option1', value: '1' },
        { label: 'Option2', value: '2' },
        { label: 'Option3', value: '3' },
      ]}
    />
    <div className='text-separator my-6'>
      <span className='separator-content text-xs text__grey-dark py-1 px-2'>January, 2020</span>
    </div>
    <div>
      <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center mb-2'>
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
            </div>
          </div>
        </div>
        <hr className='border__top border__default my-0' />
        <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
          <button
            className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
            onClick={onDetailsModal}
          >
            Details
          </button>
          <button
            className='btn btn-secondary btn-secondary__grey text-uppercase'
            onClick={onReviewModal}
          >
            Write a review
          </button>
        </div>
      </div>
      <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center mb-2'>
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
              <div className='cancelation-container d-md-inline-block d-flex justify-content-center py-3 py-md-0'>
                <div className='d-flex align-items-center'>
                  <p className='text-xs mb-0 mr-2'>Already wrote a review</p>
                  <p className='weight-700 mb-0'>5.0</p>
                  <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='border__top border__default my-0' />
        <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
          <button
            className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
            onClick={onDetailsModal}
          >
            Details
          </button>
        </div>
      </div>
      <div className='rounded__4 border-style border__default d-md-flex justify-content-between align-items-center mb-2'>
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
              <div className='cancelation-container d-md-inline-block d-flex justify-content-center py-3 py-md-0'>
                <div className='d-flex align-items-center'>
                  <p className='text-xs mb-0 mr-2'>Already wrote a review</p>
                  <p className='weight-700 mb-0'>5.0</p>
                  <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className='border__top border__default my-0' />
        <div className='py-3 d-flex flex-column flex-lg-row align-items-center pr-lg-5'>
          <button
            className='btn btn-secondary btn-secondary__grey text-uppercase mb-1'
            onClick={onDetailsModal}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  </>
);

const Trips = () => {
  // Conditionally
  const dataLength = true;
  const [tab, setTab] = useState(1);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);

  if (!dataLength) return <NoResults />;

  return (
    <>
      <div className='container'>
        <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
          <h2 className='text__blue mb-0 mt-6 mb-5 mt-md-9 mb-md-9 mt-xl-11 mt-xxl-13'>Trips</h2>
          <div className='tabs mb-6'>
            <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
              <li
                className={tab === 1 ? 'active' : ''}
                onClick={() => setTab(1)}
                role='presentation'
              >
                Upcoming Trips
              </li>
              <li
                className={tab === 2 ? 'active' : ''}
                onClick={() => setTab(2)}
                role='presentation'
              >
                Past Trips
              </li>
            </ul>
          </div>
          {tab === 1 && <UpcomingTrips onDetailsModal={() => setOpenDetailsModal(true)} />}
          {tab === 2 && (
            <PastTrips
              onDetailsModal={() => setOpenDetailsModal(true)}
              onReviewModal={() => setOpenReviewModal(true)}
            />
          )}
        </div>
      </div>
      {openDetailsModal && <DetailsModal onClose={() => setOpenDetailsModal(false)} />}
      {openReviewModal && <ReviewModal onClose={() => setOpenReviewModal(false)} />}
    </>
  );
};

export default Trips;
