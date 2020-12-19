import React from 'react';
import { IconStar } from 'shared/components/Icons';
import _ from 'lodash';
import moment from 'moment';

const Reviews = ({reviews, review_stats}) => (
  <>
    <div className='mt-14 mt-md-15 mt-xl-16'>
      <h2 className='text__blue mt-4'>Reviews</h2>
      <p className='pb-1'>
            <span className='weight-700'>{review_stats?.rate || 'No reviews yet'}</span>
            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
            {review_stats?.rate && <span className='text-sm text__grey-dark'>({review_stats.count} reviews)</span>}
      </p>
    </div>
    <ul className='no-list-style mb-0'>
      {reviews && reviews.map((review, i) => (
          <li className='mt-4' key={i}>
            <div className='d-flex'>
              <img
                width='48'
                height='48'
                src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + review.reviewer_img : review.reviewer_img}
                alt='user'
                className='rounded__50 object-pos-center object-fit-cover mr-3'
              />
              <div>
                <div className='mb-5'>
                  <p className='weight-500 text-sm pt-1 mb-0'>{ review.reviewer_name}</p>
                  <p className='text__grey text-xs mb-0'>{moment(review.created_at).format("MMMM D")}</p>
                </div>
              </div>
            </div>
            <p className='text-sm'>
              {review.review_text}
            </p>
            <hr className='border__top border__default my-0' />
          </li>)
      )}
    </ul>
    { !_.isEmpty(reviews) && <div className='text-right mt-5'>
      <button className='btn btn-secondary btn-sm'>Show More Reviews</button>
    </div>}
  </>);

export default Reviews;
