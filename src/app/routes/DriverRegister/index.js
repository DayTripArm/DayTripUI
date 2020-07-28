import React, { useState } from 'react';

// Load Components
import OnboardingPanel from 'shared/components/OnboardingPanel';
import CarRegistration from './components/CarRegistration';
import CarCommunications from './components/CarCommunications';
import CarPhotoUpload from './components/CarPhotoUpload';
import GovermentAndLicence from './components/GovermentAndLicence';
import CarRegComplete from './components/CarRegComplete';
import ProfilePicture from './components/ProfilePicture';
import ProfileData from './components/ProfileData';
import LocationAndDestination from './components/LocationAndDestination';

const DriverRegister = () => {
  const steps = {
    1: <CarRegistration />,
    2: <CarCommunications />,
    3: <CarPhotoUpload />,
    4: <GovermentAndLicence />,
    5: <CarRegComplete />,
    6: <ProfilePicture />,
    7: <ProfileData />,
    8: <LocationAndDestination />,
  };

  const limit = Object.keys(steps).length;

  const [step, setStep] = useState(1);
  return (
    <>
      <OnboardingPanel step={step} name='Lorep Ipsum' progress={(100 / limit) * step} />
      <div className='container mh-min-screen'>
        <div className='d-flex justify-content-center mt-3 pt-8 pt-md-10 pt-xl-12'>
          <div className='w-100 mxw-328px'>
            {steps[step]}
            <div className='mt-6'>
              <div className='d-flex align-items-center justify-content-between'>
                <button
                  className='btn btn-secondary btn-bold btn-secondary__black text-uppercase'
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1}
                >
                  Back
                </button>
                <button
                  className='btn btn-primary text-uppercase'
                  onClick={() => setStep(step + 1)}
                  disabled={step === limit}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverRegister;
