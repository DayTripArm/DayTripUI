import React from 'react';
import Card from 'shared/components/Card';

const ExploreTrips = () => (
  <>
    <h2 className='text__blue'> Explore All Day Trips </h2>
    <div className='row row-1'>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          favorite
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          favorite
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/199/19966748.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card size='sm' imageUrl='https://tufenkianheritage.com/media/images/hotels/5/3011.png' />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          favorite
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
      <div className='col-6 col-md-4 col-lg-3 col-xxl-2__4 col-xxxl-2 px-2 mb-7'>
        <Card
          size='sm'
          imageUrl='https://r-cf.bstatic.com/images/hotel/max1024x768/818/81815884.jpg'
        />
      </div>
    </div>
    <div className='text-center'>
      <button className='btn btn-primary'>Load More</button>
    </div>
  </>
);

export default ExploreTrips;
