import React from 'react';
import ImgHomeMain from 'assets/images/temp/home_main.jpg';

const HomeIllustration = () => (
  <>
    <div className='home-illustration box-overlay'>
      <img src={ImgHomeMain} alt='home' className='w-100 object-pos-center object-fit-cover' />
      <div className='overlay'>
        <div className='container illustration-inner'>
          <div className='col-md-10 col-lg-8 col-xl-6 col-xxl-5 px-0 px-md-4'>
            <h1 className='text-white mb-4'>Be Flexible to Discover More</h1>
            <h4 className='text-white mb-5 weight-300'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vulputate augue purus
            </h4>
            <button className='btn btn-secondary'>EXPLORE DAYTRIP</button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default HomeIllustration;
