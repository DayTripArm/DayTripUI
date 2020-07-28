import React from 'react';
import Card from 'shared/components/Card';
import NoResults from './components/NoResults';

const Favorites = () => {
  const dataLengt = true;

  if (!dataLengt) return <NoResults />;

  return (
    <div className='container pt-6 pt-md-8 pt-xl-11 xxl-13'>
      <h2 className='text__blue'>Saved Trips</h2>
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
      </div>
    </div>
  );
};

export default Favorites;
