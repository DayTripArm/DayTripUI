import React from 'react';
import Buttons from './components/Buttons';
import Typography from './components/Typography';
import Inputs from './components/Inputs';
import Dropdowns from './components/Dropdowns';
import Checkboxes from './components/Checkboxes';
import Chipses from './components/Chipses';
import Modals from './components/Modals';
import Cards from './components/Cards';
import Headers from './components/Headers';
import Onboarding from './components/Onboarding';
import Icons from './components/Icons';
import Calendars from './components/Calendars';

const UiKit = () => {
  return (
    <div>
      <div className='container pt-8'>
        <h1>UI Kit</h1>
        <hr className='my-6' />
        <h2 className='bg-grey p-3'>Typography</h2>
        <Typography />
        <h2 className='bg-grey p-3 mt-10'>Buttons</h2>
        <Buttons />
        <h2 className='bg-grey p-3 mt-10'>Inputs</h2>
        <Inputs />
        <h2 className='bg-grey p-3 mt-10'>Drop Downs</h2>
        <Dropdowns />
        <h2 className='bg-grey p-3 mt-10'>Checkboxes</h2>
        <Checkboxes />
        <h2 className='bg-grey p-3 mt-10'>Chipses</h2>
        <Chipses />
        <h2 className='bg-grey p-3 mt-10'>Modals</h2>
        <Modals />
        <h2 className='bg-grey p-3 mt-10'>Calendars</h2>
        <Calendars />
      </div>
      <div>
        <div className='container'>
          <h2 className='bg-grey p-3 mt-10'>Cards</h2>
        </div>
        <Cards />
      </div>
      <div className='container pb-8'>
        <h2 className='bg-grey p-3 mt-10'>Headers</h2>
        <Headers />
        <h2 className='bg-grey p-3 mt-10'>Onboarding</h2>
        <Onboarding />
        <h2 className='bg-grey p-3 mt-10'>Icons</h2>
        <Icons />
      </div>
    </div>
  );
};

export default UiKit;
