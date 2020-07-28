import React from 'react';
import StickyPanel from 'shared/components/StickyPanel';
import { Link } from 'react-router-dom';

const BookPanel = () => (
  <StickyPanel className='shadow__4-up'>
    <div className='container'>
      <div className='d-flex align-items-center justify-content-between py-4'>
        <div className='d-none d-md-block'>
          <h4 className='mb-1 text__blue'>Garni Temple and Geghard Monastery</h4>
          <p className='text-sm weight-500 mb-0'>
            Day: <span className='text__grey-dark'>September 1</span> Travelers:{' '}
            <span className='text__grey-dark'>3</span>
          </p>
        </div>
        <Link to='/checkout' className='btn btn-primary text-uppercase btn-xs-block'>
          Book For $44.00
        </Link>
      </div>
    </div>
  </StickyPanel>
);

export default BookPanel;
