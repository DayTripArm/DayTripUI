import React, { useState } from 'react';
import { IconArrowLeft, IconDots } from 'shared/components/Icons';
import HelpViewNavigation from './components/HelpViewNavigation';
import HelpViewContent from './components/HelpViewContent';

const HelpView = ({ history }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className='container'>
      <div className='pt-5 pb-6 d-flex justify-content-between'>
        <button className='btn btn-circle size-fixed border-0' onClick={() => history.goBack()}>
          <IconArrowLeft />
        </button>
        <button
          className='btn btn-circle size-fixed border-0 d-md-none'
          onClick={() => setOpen(true)}
        >
          <IconDots />
        </button>
      </div>
      <div className='row'>
        <div className='col-md-4 col-lg-3 d-flex justify-content-xl-end'>
          <HelpViewNavigation open={open} onClose={() => setOpen(false)} />
        </div>
        <div className='col-12 col-md-8 col-lg-9'>
          <HelpViewContent />
        </div>
      </div>
    </div>
  );
};

export default HelpView;
