import React, { useState } from 'react';
import TourIllustration from './components/TourIllustration';
import { IconStar, IconClockOutlined, IconDestination } from 'shared/components/Icons';
import Destinations from './components/Destinations';
import ImgMap from 'assets/images/temp/map.png';
import Reviews from '../Individuals/routes/Driver/components/Reviews';
import SearchPanel from './components/SearchPanel';
import InfoModal from './components/InfoModal';

const Tour = ({ history }) => {
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <>
      <TourIllustration history={history} TourIllustration={() => setOpenInfoModal(true)} />
      <div className='rounded-top__30 bg-white pull-t-9 position-relative mb-10 mb-md-13 mb-xxl-15'>
        <div className='container pt-6 pt-md-8 pt-xl-11'>
          <div className='row'>
            <div className='col-xl-4'>
              <h2 className='text__blue mb-1'>Garni Temple and Geghard Monastery</h2>
              <p>
                <span className='weight-700'>5.0</span>
                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
                <span className='text-sm text__grey-dark'>(125 reviews)</span>
              </p>
            </div>
            <div className='col-xl-8 d-xl-flex align-items-end pb-xl-4'>
              <div className='d-md-flex'>
                <div className='d-flex mb-4 mb-md-0 mr-md-5'>
                  <IconClockOutlined className='mr-2' />
                  <p className='mb-0'>
                    Trip duration: <span className='weight-500 text__grey-dark'>8 hours</span>
                  </p>
                </div>
                <div className='d-flex mb-0'>
                  <IconDestination className='mr-2' />
                  <p className='mb-0'>
                    Starting destination:{' '}
                    <span className='weight-500 text__grey-dark'>Yerevan</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
            <div className='col-xl-4'>
              <h2 className='mb-4 mb-md-5'>What You'll Do</h2>
            </div>
            <div className='col-xl-8'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet,
              nec egestas tempus orci. Eget sapien hac blandit id ipsum, nulla vitae enim. Odio
              lorem pretium nibh nulla. Aenean tellus quis in ornare non pellentesque. Id pretium
              urna, nibh eget tortor amet. Sed auctor tellus lectus senectus. Mauris amet,
              adipiscing ipsum urna, sed sagittis auctor. Semper sem morbi gravida mattis. Eget eget
              neque, quis auctor. Ligula tellus sapien nec, sed tellus mattis. Justo, elementum
              laoreet ultrices augue accumsan ut a sapien
            </div>
          </div>
          <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
            <div className='col-xl-4'>
              <h2 className='mb-4 mb-md-5'>What You'll See</h2>
            </div>
            <div className='col-xl-8'>
              <Destinations />
            </div>
          </div>
          <div className='row mt-9 mt-md-11 mt-xl-13 mt-xxl-15'>
            <div className='col-xl-4'>
              <h2 className='mb-4 mb-md-5'>Where You'll Be</h2>
            </div>
            <div className='col-xl-8'>
              <img src={ImgMap} alt='map' className='w-100 rounded__8' />
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-4' />
            <div className='col-xl-8'>
              <Reviews />
            </div>
          </div>
        </div>
      </div>
      <SearchPanel />
      {openInfoModal && <InfoModal onClose={() => setOpenInfoModal(false)} />}
    </>
  );
};

export default Tour;
