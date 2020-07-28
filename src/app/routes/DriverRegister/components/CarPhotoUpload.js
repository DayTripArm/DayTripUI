import React, { useState } from 'react';
import UploadFile from 'app/routes/UiKit/components/UploadFile';
import { IconQuestionOutlined, IconTimes } from 'shared/components/Icons';
import ModalAside from 'shared/components/ModalAside';

const CarRegistration = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <h4 className='text__blue mb-4'>
        Add photos of your car{' '}
        <button
          className='btn btn-circle btn-sm border-0 pull-t-5'
          onClick={() => setOpenModal(true)}
        >
          <IconQuestionOutlined fill='#757575' />
        </button>
      </h4>
      <p className='text__grey-dark'>
        Photos help travelers imagine their future ride. You can start with one and add more after
        you publish.
      </p>
      <div className='row row-2'>
        <div className='col-6 px-2'>
          <UploadFile size='sm' name='photo' label='Upload Photos' multiple />
        </div>
        <div className='box-removable col-6 px-2'>
          <img
            className='upload-img rounded__4 object-fit-contain object-position-center bg__grey mb-4'
            src='https://wallpaperaccess.com/full/40047.jpg'
            alt='car'
          />
          <button className='remove-btn position-absolute t-8 r-16 btn btn-circle btn-sm border-0'>
            <IconTimes />
          </button>
        </div>
        <div className='box-removable col-6 px-2'>
          <img
            className='upload-img rounded__4 object-fit-contain object-position-center bg__grey mb-4'
            src='https://images.unsplash.com/photo-1588017014938-53b90597bca5?ixlib=rb-1.2.1&w=1000&q=80'
            alt='car'
          />
          <button className='remove-btn position-absolute t-8 r-16 btn btn-circle btn-sm border-0'>
            <IconTimes />
          </button>
        </div>
      </div>
      {openModal && (
        <ModalAside title='Trips' onClose={() => setOpenModal(false)}>
          <h4 className='text__blue'>Tips to Get Great Photos of Your Car</h4>
          <p className='weight-500 mb-3'>
            <span className='bullet bg__black mr-2 mb-01' />
            Shoot on the right time of day
          </p>
          <p className='mb-5'>
            Most car shoots take place outdoors, so make sure you're shooting at the right time of
            the day. Overcast days are great for car photography, as it keeps the light relatively
            flat, minimizing reflections caused by harsh sunlight.
          </p>

          <p className='weight-500 mb-3'>
            <span className='bullet bg__black mr-2 mb-01' />
            Keep it clean
          </p>
          <p className='mb-5'>
            His will save you a ton of potential post-production work, and keep your clients happy.
            No one wants to promote a dirty car. We suggest carrying an extra rag and a car spray to
            wipe off any marks when you get to your location.
          </p>

          <p className='weight-500 mb-3'>
            <span className='bullet bg__black mr-2 mb-01' />
            Capture all the angles
          </p>
          <p className='mb-5'>
            Move around your entire car, and capture every angle before you start your shoot. This
            ensures that you don’t miss anything, as you’ll have at least one photograph of every
            angle of the car.
          </p>

          <p className='weight-500 mb-3'>
            <span className='bullet bg__black mr-2 mb-01' />
            Shoot on the right time of day
          </p>
          <p className='mb-5'>
            Most car shoots take place outdoors, so make sure you're shooting at the right time of
            the day. Overcast days are great for car photography, as it keeps the light relatively
            flat, minimizing reflections caused by harsh sunlight.
          </p>

          <p className='weight-500 mb-3'>
            <span className='bullet bg__black mr-2 mb-01' />
            Keep it clean
          </p>
          <p className='mb-5'>
            His will save you a ton of potential post-production work, and keep your clients happy.
            No one wants to promote a dirty car. We suggest carrying an extra rag and a car spray to
            wipe off any marks when you get to your location.
          </p>

          <p className='weight-500 mb-3'>
            <span className='bullet bg__black mr-2 mb-01' />
            Capture all the angles
          </p>
          <p className='mb-5'>
            Move around your entire car, and capture every angle before you start your shoot. This
            ensures that you don’t miss anything, as you’ll have at least one photograph of every
            angle of the car.
          </p>
        </ModalAside>
      )}
    </>
  );
};

export default CarRegistration;
