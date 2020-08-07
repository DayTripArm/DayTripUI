import React from 'react';
import Modal from 'shared/components/Modal';

const InfoModal = ({ onClose, description="" }) => (
  <Modal title='Welcome to Daytrip' showDismissButton onClose={onClose}>
    <div className='py-4 px-0 px-md-8'>
      <img
        className='rounded__4 mb-4'
        alt='garni'
        src='https://upload.wikimedia.org/wikipedia/commons/c/c5/Garni_Temple_02.JPG'
      />
      <p className='text-sm mh-100px'>{description}</p>
    </div>
  </Modal>
);

export default InfoModal;
