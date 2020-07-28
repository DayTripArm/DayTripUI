import React from 'react';
import OnboardingPanel from 'shared/components/OnboardingPanel';

const Onboarding = () => {
  return (
    <>
      <div className='mb-10'>
        <OnboardingPanel step={1} name='Lorep Ipsum' progress={25} />
      </div>
      <div className='mb-10'>
        <OnboardingPanel step={2} name='Lorep Ipsum' progress={50} />
      </div>
      <div className='mb-10'>
        <OnboardingPanel step={3} name='Lorep Ipsum' progress={75} />
      </div>
    </>
  );
};

export default Onboarding;
