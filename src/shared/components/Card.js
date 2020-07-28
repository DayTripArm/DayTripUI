import React from 'react';
import { IconStar, IconHeartOutlined, IconHeartFilled } from 'shared/components/Icons';

// Size 'lg' or 'sm'
const Card = ({ size = 'lg', favorite, imageUrl }) => (
  <div className={`card-item card-item__${size}`}>
    <div className='image-container mb-4'>
      <img
        src={imageUrl}
        className='object-pos-center object-fit-cover bg__grey-dark rounded__10'
        alt='img'
      />
      <button className={`btn btn-favorite btn-circle btn-static border-0 btn-${size}`}>
        {favorite ? <IconHeartFilled fill='#FE4C30' /> : <IconHeartOutlined />}
      </button>
    </div>
    {size === 'sm' ? (
      <p className='mb-2 weight-700'>Garni Temple and Geghard Monastery</p>
    ) : (
      <h4 className='mb-2'>Garni Temple and Geghard Monastery</h4>
    )}
    <p className='text__grey-dark weight-700 mb-2'>Trip duraction : 8 hours</p>
    <p className='mb-0'>
      <span className='weight-700'>5.0</span>
      <IconStar className='card-star mx-1 pull-t-1' />
      <span className='text-sm text__grey-dark'>(125 reviews)</span>
    </p>
  </div>
);

export default Card;
