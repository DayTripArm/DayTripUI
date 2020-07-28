import React from 'react';

const OnboardingPanel = ({ step, name, progress, fixed }) => (
  <div className={`onboarding-panel py-4${fixed ? ' onboarding-panel__fixed' : ''}`}>
    <div className='container'>
      <div className='d-flex align-items-center'>
        <h3 className='d-inline-block mr-4 mr-lg-6 text__blue mb-0 weight-400'>
          <span className='d-none d-md-inline-block'>DAYTRIP</span>
          <span className='d-md-none'>D</span>
        </h3>
        <p className='mb-0 d-inline-block text__grey-dark'>
          <span className='weight-700'>Step {step}:</span> {name}
        </p>
      </div>
    </div>
    <div className='panel-progress' style={{ width: `${progress}%` }} />
  </div>
);

export default OnboardingPanel;
