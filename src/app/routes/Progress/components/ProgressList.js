import React from 'react';
import { IconStar } from 'shared/components/Icons';
import {MONTH_LIST} from "../../../../constants";
import { useTranslation } from 'react-i18next';

const ProgressList = ({ onOpenModal, driver_progress }) => {
  const { t } = useTranslation();
  return(
  <ul className='no-list-style mb-0'>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{t("progress_page.section1_title", {month: t(`commons.months.${MONTH_LIST[new Date().getMonth()]}`)})}</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(1)}}>
            {t("commons.view_details_btn")}
        </button>
      </div>
      <h2 className='mb-2'>$ {driver_progress?.current_month_earnings || 0}</h2>
      <p className='text__grey-dark mb-0'>{t("progress_page.section1_text")}</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{t("progress_page.section2_title")}</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(2)}}>
            {t("commons.view_details_btn")}
        </button>
      </div>
      <h2 className='mb-2 d-flex align-items-center'>
        <span className='weight-700'>{driver_progress?.overall_rating || t("commons.no_reviews")}</span>
        <IconStar fill='#FE4C30' width='32' height='32' className='ml-2' />
      </h2>
      <p className='text__grey-dark mb-0'>{t("progress_page.section2_title")}</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{t("progress_page.section3_title")}</h4>
      </div>
      <h2 className='mb-2'>{driver_progress?.bookings || 0}</h2>
      <p className='text__grey-dark mb-0'>{t("progress_page.section3_text")}</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{t("progress_page.section4_title")}</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(4)}}>
          {t("commons.view_details_btn")}
        </button>
      </div>
      <h2 className='mb-2'>{driver_progress?.completed_trips || 0}</h2>
      <p className='text__grey-dark mb-0'>{t("progress_page.section4_text")}</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{t("progress_page.section5_title")}</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(5)}}>
          {t("commons.view_details_btn")}
        </button>
      </div>
      <h2 className='mb-2'>{driver_progress?.popular_trips || 0}</h2>
      <p className='text__grey-dark mb-0'>{t("progress_page.section5_6_text")}</p>
    </li>
    <li className='border__bottom border__default pb-4 mb-3'>
      <div className='d-flex align-items-center justify-content-between mb-4 mb-md-5'>
        <h4 className='mb-0 text__grey-dark'>{t("progress_page.section6_title")}</h4>
        <button className='btn btn-sm btn-secondary' onClick={() => {onOpenModal(6)}}>
          {t("commons.view_details_btn")}
        </button>
      </div>
      <h2 className='mb-2'>{driver_progress?.upcoming_trips || 0}</h2>
      <p className='text__grey-dark mb-0'>{t("progress_page.section5_6_text")}</p>
    </li>
  </ul>)
};

export default ProgressList;
