import React from 'react';
import UploadFile from 'app/routes/UiKit/components/UploadFile';

const ProfilePicture = () => (
  <>
    <h4 className='text__blue mt-6 mb-4'>Uplaod your Profile Picture</h4>
    <p className='text__grey-dark'>
      Photos help travelers imagine their future ride. You can start with one and add more after you
      publish.
    </p>
    <UploadFile name='photo' label='Upload Photos' />
  </>
);

export default ProfilePicture;
