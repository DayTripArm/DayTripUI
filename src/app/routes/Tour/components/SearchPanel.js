import React from 'react';
import StickyPanel from 'shared/components/StickyPanel';
import { IconStar } from 'shared/components/Icons';
import Input from 'shared/components/Input';
import { Link } from 'react-router-dom';

const SearchPanel = () => (
  <StickyPanel className='border__top border__default'>
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <div className='d-none d-lg-block'>
          <div className='d-flex align-items-center'>
            <h4 className='mb-1 text__blue mr-2'>Garni Temple and Geghard Monastery</h4>
            <p className='mb-0 d-none d-xl-block'>
              <span className='weight-700'>5.0</span>
              <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
              <span className='text-sm text__grey-dark'>(125 reviews)</span>
            </p>
          </div>
          <p className='text-sm weight-500 mb-0 d-none d-xl-block'>
            Trip Duration: <span className='text__grey-dark'>8 hours</span>
          </p>
        </div>
        <div className='d-flex justify-content-end flex-fill'>
          <div className='d-none d-md-flex flex-fill justify-content-lg-end'>
            <Input
              type='text'
              name='date'
              placeholder='Date'
              containerClass='mb-0 mr-3 mnw-0 w-156px'
            />
            <Input
              type='number'
              name='travelers'
              placeholder='Travelers'
              hideApperance
              containerClass='mb-0 mr-3 mnw-0 w-156px'
            />
          </div>
          <Link to='/drivers' className='btn btn-primary text-uppercase btn-xs-block'>
            Search For Drivers
          </Link>
        </div>
      </div>
    </div>
  </StickyPanel>
);

export default SearchPanel;
