import React from 'react';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import { useTranslation } from 'react-i18next';

const LoginSecurity = () => {
  const { t } = useTranslation();
  const routes = [
    {
        route: '/account',
        name: t("account_page.page_title"),
        isActive : false
    },
    {
        route: '/login',
        name: t("account_page.login_page.page_title"),
        isActive : true
    },
  ];
  return (
    <div className='container'>
      <div className='col-xl-10 col-xxl-9 col-xxxl-8 m-auto p-0'>
        <Breadcrumbs routes={routes} className='mt-4 mb-5 mt-xl-5 mb-xl-6' />

        <h2 className='text__blue mb-0'>{t("account_page.login_page.page_title")}</h2>

        <h4 className='text__grey-dark mb-0 mt-5 mt-md-6'>{t("account_page.login_page.section1")}</h4>

        <ul className='no-list-style mb-0'>
          <li className='border__bottom border__default pt-4 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <p className='mb-0 weight-700'>{t("account_page.login_page.section1_title")}</p>
              <button className='btn btn-sm btn-secondary'>{t("commons.buttons.update_btn")}</button>
            </div>
            <p className='text__grey-dark mb-0'>{t("account_page.login_page.section1_pholder",{days: 13})}</p>
          </li>
        </ul>

        <h4 className='text__grey-dark mb-0 mt-5 mt-md-6'>{t("account_page.login_page.section2")}</h4>

        <ul className='no-list-style mb-0'>
          <li className='border__bottom border__default pt-4 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <p className='mb-0 weight-700'>{t("account_page.login_page.section2_title1")}</p>
              <button className='btn btn-sm btn-secondary'>{t("commons.buttons.connect_btn")}</button>
            </div>
            <p className='text__grey-dark mb-0'>{t("commons.not_connected")}</p>
          </li>
        </ul>
        <ul className='no-list-style mb-0'>
          <li className='border__bottom border__default pt-4 pb-4'>
            <div className='d-flex align-items-center justify-content-between mb-2'>
              <p className='mb-0 weight-700'>{t("account_page.login_page.section2_title2")}</p>
              <button className='btn btn-sm btn-secondary'>{t("commons.buttons.connect_btn")}</button>
            </div>
            <p className='text__grey-dark mb-0'>{t("commons.not_connected")}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LoginSecurity;
