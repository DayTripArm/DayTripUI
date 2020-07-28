import React from 'react';
import { IconStar } from 'shared/components/Icons';

const Reviews = () => (
  <>
    <div className='mt-14 mt-md-15 mt-xl-16'>
      <h2 className='text__blue mt-4'>Reviews</h2>
      <p className='pb-1'>
        <span className='weight-700'>5.0</span>
        <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
        <span className='text-sm text__grey-dark'>(125 reviews)</span>
      </p>
    </div>
    <ul className='no-list-style mb-0'>
      <li className='mt-4'>
        <div className='d-flex'>
          <img
            width='48'
            height='48'
            src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
            alt='user'
            className='rounded__50 object-pos-center object-fit-cover mr-3'
          />
          <div>
            <div className='mb-5'>
              <p className='weight-500 text-sm pt-1 mb-0'>Julia</p>
              <p className='text__grey text-xs mb-0'>January, 2020</p>
            </div>
          </div>
        </div>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet, nec
          egestas tempus orci. Eget sapien hac blandit id ipsum, nulla vitae enim. Odio lorem
          pretium nibh nulla. Aenean tellus quis in ornare non pellentesque. Id pretium urna, nibh
          eget tortor amet. Sed auctor tellus lectus senectus. Mauris amet, adipiscing ipsum urna,
          sed sagittis auctor. Semper sem morbi gravida mattis. Eget eget neque, quis auctor.
        </p>
        <hr className='border__top border__default my-0' />
      </li>
      <li className='mt-4'>
        <div className='d-flex'>
          <img
            width='48'
            height='48'
            src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
            alt='user'
            className='rounded__50 object-pos-center object-fit-cover mr-3'
          />
          <div>
            <div className='mb-5'>
              <p className='weight-500 text-sm pt-1 mb-0'>Julia</p>
              <p className='text__grey text-xs mb-0'>January, 2020</p>
            </div>
          </div>
        </div>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet, nec
          egestas tempus orci. Eget sapien hac blandit id ipsum, nulla vitae enim. Odio lorem
          pretium nibh nulla. Aenean tellus quis in ornare non pellentesque. Id pretium urna, nibh
          eget tortor amet. Sed auctor tellus lectus senectus. Mauris amet, adipiscing ipsum urna,
          sed sagittis auctor. Semper sem morbi gravida mattis. Eget eget neque, quis auctor.
        </p>
        <hr className='border__top border__default my-0' />
      </li>
      <li className='mt-4'>
        <div className='d-flex'>
          <img
            width='48'
            height='48'
            src='https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'
            alt='user'
            className='rounded__50 object-pos-center object-fit-cover mr-3'
          />
          <div>
            <div className='mb-5'>
              <p className='weight-500 text-sm pt-1 mb-0'>Julia</p>
              <p className='text__grey text-xs mb-0'>January, 2020</p>
            </div>
          </div>
        </div>
        <p className='text-sm'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rhoncus volutpat libero amet, nec
          egestas tempus orci. Eget sapien hac blandit id ipsum, nulla vitae enim. Odio lorem
          pretium nibh nulla. Aenean tellus quis in ornare non pellentesque. Id pretium urna, nibh
          eget tortor amet. Sed auctor tellus lectus senectus. Mauris amet, adipiscing ipsum urna,
          sed sagittis auctor. Semper sem morbi gravida mattis. Eget eget neque, quis auctor.
        </p>
        <hr className='border__top border__default my-0' />
      </li>
    </ul>
    <div className='text-right mt-5'>
      <button className='btn btn-secondary btn-sm'>Show More Reviews</button>
    </div>
  </>
);

export default Reviews;
