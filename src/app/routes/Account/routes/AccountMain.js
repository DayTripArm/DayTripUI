import React from 'react';
import { Link } from 'react-router-dom';
import IconUser from 'assets/images/ic_user.svg';
import IconShield from 'assets/images/ic_shield.svg';
import IconWallet from 'assets/images/ic_wallet.svg';
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';
import _ from "lodash";

const AccountMain = ({ match }) => {

  const {travelerData={}, driverData={}, config} = useSelector(state => state);
  const {profile={}} = !_.isEmpty(travelerData.profile) ? travelerData : driverData;
  const {name} = profile;
  const {userType} = config;
  const { t } = useTranslation();

  return (
    <div className='container'>
      <h2 className='text__blue mb-4 mt-6 mt-md-9 mt-xl-11 mt-xxl-14 mt-xxxl-13'>{t("account_page.page_title")}</h2>
      <div className='d-flex align-items-center mb-5'>
        <p className='text-sm mb-0 mr-5'>{name}</p>
          <Link to={Number(userType) === 1 ? "/individuals/user" : "/individuals/driver"} className='btn btn-secondary btn-sm ml-5'>
             {t("account_page.btn_to_profile")}
          </Link>
      </div>

      <div className='row row-1'>
        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2'>
          <Link to="account/personal" className='d-block text__black'>
            <div className='rounded__4 border-style border__default p-4 p-md-5 p-xl-6'>
              <img src={IconUser} alt='user' className='mb-4 mb-xl-5' />
              <h4 className='mb-2 mb-md-4'>{t("account_page.persona_info_title")}</h4>
              <p className='mb-0'>{t("account_page.persona_info_desc")}</p>
            </div>
          </Link>
        </div>

        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2'>
          <Link to="account/loginSecurity" className='d-block text__black'>
            <div className='rounded__4 border-style border__default p-4 p-md-5 p-xl-6'>
              <img src={IconShield} alt='user' className='mb-4 mb-xl-5' />
              <h4 className='mb-2 mb-md-4'>{t("account_page.login_title")}</h4>
              <p className='mb-0'>{t("account_page.login_desc")}</p>
            </div>
          </Link>
        </div>

        <div className='col-12 col-md-6 col-xxl-4 mb-2 mb-md-4 px-2'>
          <Link to="account/paymentPayout" className='d-block text__black'>
            <div className='rounded__4 border-style border__default p-4 p-md-5 p-xl-6'>
              <img src={IconWallet} alt='user' className='mb-4 mb-xl-5' />
              <h4 className='mb-2 mb-md-4'>{t("account_page.payments_title")}</h4>
              <p className='mb-0'>{t("account_page.payments_desc")}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountMain;
