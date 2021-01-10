import React, { useState, useEffect } from 'react';
import ProgressList from './components/ProgressList';
import DetailsModal from './components/DetailsModal';
import {useDispatch, useSelector} from "react-redux";
import actions from "actions";

const Progress = () => {
  const dispatch = useDispatch();
  const {driverData} = useSelector(state => state);

  const {driver_progress} = driverData
  const [openModal, setOpenModal] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  useEffect (() => {
        dispatch(actions.driverProgressRequest(Number(localStorage.id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className='container'>
        <div className='container pt-6 pt-md-8 pt-xl-11 xxl-13'>
          <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
            <h2 className='text__blue mb-5 mb-md-6 mb-xl-9'>Progress</h2>
            <ProgressList driver_progress={driver_progress} onOpenModal={(evt) => {console.log(evt); setActiveSection(evt); setOpenModal(true); window.location.hash = "modal"}} />
          </div>
        </div>
      </div>
      {openModal && <DetailsModal activeSection={activeSection} onClose={() => setOpenModal(false)} />}
    </>
  );
};

export default Progress;
