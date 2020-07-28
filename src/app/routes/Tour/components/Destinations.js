import React from 'react';

const Destinations = () => (
  <>
    <div className='step-vertical step-vertical__contained pb-6'>
      <h4 className='text__grey-dark mb-4 mb-md-5'>
        First stop:{' '}
        <span className='weight-400'>
          Garni Temple (Yerevan to Garni is 27,5 km, estimated time to explore Garni is 1 hour)
        </span>
      </h4>
      <div className='row'>
        <div className='col-12 col-md-5'>
          <img
            src='https://d31qtdfy11mjj9.cloudfront.net/places/1511524295874407964.jpg'
            alt='garni'
            className='w-100 rounded__4 mb-5 mb-md-0'
          />
        </div>
        <div className='col-12 col-md-7'>
          <h4 className='mb-4'>Garni Temple</h4>
          <p className='mb-0'>
            Geghard is a medieval monastery in the Kotayk province of Armenia, being partially
            carved out of the adjacent mountain, surrounded by cliffs. It is listed as a UNESCO
            World Heritage Site with enhanced protection status. While the main chapel was built in
            1215, the monastery complex was founded in the 4th century by Gregory the Illuminator at
            the site of a sacred spring inside a cave...
            <button className='btn btn-secondary btn-sm d-lg-none'>Read More</button>
          </p>
        </div>
      </div>
    </div>
    <div className='step-vertical step-vertical__contained pb-6'>
      <h4 className='text__grey-dark mb-4 mb-md-5'>
        Second Stop:{' '}
        <span className='weight-400'>
          Geghard Monastery (Garni to Geghard is 10.5 km, estimated time to explore Garni is 2
          hours)
        </span>
      </h4>
      <div className='row'>
        <div className='col-12 col-md-5'>
          <img
            src='https://www.armeniatourinfo.com/wp-content/uploads/2019/05/05-GEGHARD-MONASTERY.jpg'
            alt='geghard'
            className='w-100 rounded__4 mb-5 mb-md-0'
          />
        </div>
        <div className='col-12 col-md-7'>
          <h4 className='mb-4'>Geghard Monastery</h4>
          <p className='mb-0'>
            Geghard is a medieval monastery in the Kotayk province of Armenia, being partially
            carved out of the adjacent mountain, surrounded by cliffs. It is listed as a UNESCO
            World Heritage Site with enhanced protection status. While the main chapel was built in
            1215, the monastery complex was founded in the 4th century by Gregory the Illuminator at
            the site of a sacred spring inside a cave...
            <button className='btn btn-secondary btn-sm d-lg-none'>Read More</button>
          </p>
        </div>
      </div>
    </div>
    <div className='step-vertical'>
      <h4 className='text__grey-dark mb-0'>
        Third stop:{' '}
        <span className='weight-400'>
          Yerevan (Geghard to Yerevan is 37.1 km, no estimated time, as it is the way back)
        </span>
      </h4>
    </div>
  </>
);

export default Destinations;
