import React from 'react';
import { IconStar } from 'shared/components/Icons';
import moment from "moment";
import _ from 'lodash';

const DriverProgressReviews = ({overall_rating}) => {
    return (
        <div>
            <p className='text__blue mt-4'>
                <span className='weight-700'>Average Rating Score   {overall_rating?.rate || 'No reviews'}</span>
                <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
            </p>
            {
                overall_rating && _.map(overall_rating?.reviews, (mnt_reviews, month) => (
                    <div key={month}>
                        <div className='text-separator my-5' >
                          <span className='separator-content text-xs text__grey-dark py-1 px-2'>{month}</span>
                        </div>
                        {
                            mnt_reviews.map((review, i) => (
                                <div key={i}>
                                  <div className='d-flex mb-4'>
                                    <img
                                      width='48'
                                      height='48'
                                      src={process.env.NODE_ENV === "development" ? "http://localhost:3000" + review.reviewer_img: review.reviewer_img}
                                      alt='user'
                                      className='rounded__50 object-pos-center object-fit-cover mr-3'
                                    />
                                    <div>
                                      <div>
                                        <p className='weight-500 text-sm pt-1 mb-0'>{review.reviewer_name}</p>
                                        <p className='text__grey text-xs mb-0'>{moment(review.created_at).format("MMMM D")}</p>
                                        <span className='weight-700'>{review.rate || 'No reviews'}</span>
                                        <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1'/>
                                      </div>
                                    </div>
                                  </div>
                                  <p className='text-sm mb-0'>
                                    {review.review_text}
                                  </p>
                                  <hr className='border__top border__default my-4' />
                               </div>
                               )
                            )
                        }
                    </div>
                    )
                )
            }
         </div>
     );
};

export default DriverProgressReviews;
