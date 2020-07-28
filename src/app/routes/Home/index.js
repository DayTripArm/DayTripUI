import React from 'react';
import HomeIllustration from './components/HomeIllustration';
import TopChoises from './components/TopChoises';
import SearchDriver from './components/SearchDriver';
import ExploreTrips from './components/ExploreTrips';

const Home = () => (
  <section className='home-page'>
    <HomeIllustration />
    <div className='mt-10 mt-md-13 mt-lg-15 pl-4'>
      <div className='slider-container'>
        <TopChoises />
      </div>
    </div>
    <div className='container'>
      <div className='mt-10 mt-md-13 mt-lg-15'>
        <SearchDriver />
      </div>
      <div className='mt-10 mt-md-13 mt-lg-15'>
        <ExploreTrips />
      </div>
    </div>
  </section>
);

export default Home;
