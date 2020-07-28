import React, { useState } from 'react';
import ProgressList from './components/ProgressList';
import DetailsModal from './components/DetailsModal';

const Progress = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className='container'>
        <div className='container pt-6 pt-md-8 pt-xl-11 xxl-13'>
          <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
            <h2 className='text__blue mb-5 mb-md-6 mb-xl-9'>Progress</h2>
            <ProgressList onOpenModal={() => setOpenModal(true)} />
          </div>
        </div>
      </div>
      {openModal && <DetailsModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default Progress;
