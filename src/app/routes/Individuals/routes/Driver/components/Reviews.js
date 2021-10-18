import React from 'react';
import { IconStar } from 'shared/components/Icons';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import {HOST_URL} from "../../../../../../constants";
import moment from 'moment';

const Reviews = ({reviews, review_stats}) => {
  const { t } = useTranslation();
  const locale_code = localStorage.getItem('lang') || 'en'
  return (<>
    <div className='mt-14 mt-md-15 mt-xl-16'>
      <h2 className='text__blue mt-4'>{t("commons.reviews")}</h2>
      <p className='pb-1'>
            <span className='weight-700'>{review_stats?.rate || t("commons.no_reviews")}</span>
            <IconStar fill='#FE4C30' className='card-star mx-1 pull-t-1' />
            {review_stats?.rate && <span className='text-sm text__grey-dark'>({review_stats.count} {t("commons.reviews")})</span>}
      </p>
    </div>
    <ul className='no-list-style mb-0'>
      {reviews && reviews.map((review, i) => (
          <li className='mt-4' key={i}>
            <div className='d-flex'>
              <img
                width='48'
                height='48'
                src={process.env.NODE_ENV === "development" ? HOST_URL + review.reviewer_img : review.reviewer_img}
                alt='user'
                className='rounded__50 object-pos-center object-fit-cover mr-3'
              />
              <div>
                <div className='mb-5'>
                  <p className='weight-500 text-sm pt-1 mb-0'>{ review.reviewer_name}</p>
                  <p className='text__grey text-xs mb-0'>{_.startCase(moment(review.created_at).locale(locale_code === "am" ? "hy-am" : locale_code).format("MMMM D"))}</p>
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
      <button className='btn btn-secondary btn-sm'>{t("trip_details_page.show_more")}</button>
    </div>}
  </>)
};

export default Reviews;
