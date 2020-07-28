import React from 'react';
import UploadFile from 'app/routes/UiKit/components/UploadFile';

const GovermentAndLicense = () => (
  <>
    <h4 className='text__blue mb-4'>Add photos of Governmental ID</h4>
    <p className='text__grey-dark'>ID help travelers Take You Serious</p>
    <div className='row row-2'>
      <div className='col-6 px-2'>
        <UploadFile size='sm' name='photo' label='Upload Photos' />
      </div>
      <div className='col-6 px-2'>
        <img
          className='upload-img rounded__4 object-fit-contain object-position-center bg__grey mb-4'
          src='https://www.gotocourt.com.au/wp-content/uploads/legalnews_images/licencetasmania-2.jpg'
          alt='car'
        />
      </div>
    </div>
    <h4 className='text__blue mt-6 mb-4'>Add photos of Governmental ID</h4>
    <p className='text__grey-dark'>
      Photos help travelers imagine their future ride. You can start with one and add more after you
      publish.
    </p>
    <UploadFile name='photo' label='Upload Photos' />
  </>
);

export default GovermentAndLicense;
