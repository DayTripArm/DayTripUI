import React from 'react';
import { IconArrowRight } from 'shared/components/Icons';

const Buttons = () => (
  <>
    <div className='mb-3'>
      <button className='btn btn-primary text-uppercase mr-5'>Prime Rest</button>
      <button className='btn btn-primary text-uppercase mr-5' disabled>
        Disabled
      </button>
      <button className='btn btn-outline-black text-uppercase'>Prime Rest</button>
      <button className='btn text-uppercase'>Prime Rest</button>
    </div>
    <div className='mb-3'>
      <button className='btn btn-secondary text-uppercase mr-5'>Prime Rest</button>
      <button className='btn btn-secondary text-uppercase' disabled>
        Disabled
      </button>
    </div>
    <div className='mb-3'>
      <button className='btn btn-primary btn-fixed text-uppercase mr-5'>
        Fixed size/Prime rest
      </button>
      <button className='btn btn-primary btn-fixed text-uppercase' disabled>
        Fixed size/Disabled
      </button>
    </div>
    <div className='mb-3'>
      <button className='btn btn-secondary btn-fixed text-uppercase mr-5'>
        Fixed size/Prime rest
      </button>
      <button className='btn btn-secondary btn-fixed text-uppercase' disabled>
        Fixed size/Disabled
      </button>
    </div>
    <div className='mb-3'>
      <button className='btn btn-primary btn-sm mr-5'>Prime Rest</button>
      <button className='btn btn-primary btn-sm mr-5' disabled>
        Disabled
      </button>
    </div>
    <div className='mb-3'>
      <button className='btn btn-secondary btn-sm mr-5'>Prime Rest</button>
      <button className='btn btn-secondary btn-sm' disabled>
        Disabled
      </button>
    </div>

    <div className='mb-3'>
      <button className='btn btn-circle mr-5'>
        <IconArrowRight />
      </button>
      <button className='btn btn-circle btn-sm mr-5'>
        <IconArrowRight />
      </button>
      <button className='btn btn-circle border-0 mr-5'>
        <IconArrowRight />
      </button>
      <button className='btn btn-circle btn-sm border-0'>
        <IconArrowRight />
      </button>
    </div>
  </>
);

export default Buttons;
