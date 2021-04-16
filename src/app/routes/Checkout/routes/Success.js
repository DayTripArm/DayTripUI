import React from 'react';
import ImpPersonJump from 'assets/images/person_jump.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Success = () => {
    const { t } = useTranslation();
  return (
   <div className='px-4 mt-6 mt-md-11 mt-lg-13 mt-xxxl-18 text-center'>
    <img src={ImpPersonJump} alt='person' className='mb-6 px-6 px-md-0' />
    <h2 className='text__blue mb-4'>{t("thank_you_title")}</h2>
    <h4 className='mb-4'>{t("title1")}</h4>
    <p className='text__grey-dark'>{t("title2")}</p>
    <Link to='/home' className='btn btn-primary text-uppercase btn-xs-block'>
        {t("btn")}
    </Link>
  </div>)
};

export default Success;
