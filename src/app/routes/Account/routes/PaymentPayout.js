import React, { useState } from 'react';
import Breadcrumbs from 'shared/components/Breadcrumbs';
import { IconCheckMarkFilled } from 'shared/components/Icons';
import { useTranslation } from 'react-i18next';

const Payment = ({ cardExists, payments_texts }) =>
  cardExists ? (
    <>
      <h4 className='mb-4'>{payments_texts.title}</h4>
      <div className='rounded__4 border-style border__default mxw-md-388px'>
        <div className='p-4 text-sm d-flex align-items-center'>
          <IconCheckMarkFilled className='mr-2' />
            {payments_texts.card_currency}
        </div>
        <hr className='border__top border__default m-0' />
        <div className='pt-3 px-4 pb-4 d-flex'>
          <div className='flex-fill mr-3'>
            <p className='text-sm weight-500 mb-1 text__grey-dark'>{payments_texts.card_type}</p>
            <p className='text-sm mb-0'>{payments_texts.visa_ends}</p>
          </div>
          <div className='flex-fill mr-3'>
            <p className='text-sm weight-500 mb-1 text__grey-dark'>{payments_texts.name_on_card}</p>
            <p className='text-sm mb-0'>Poghos Poghosyan</p>
          </div>
          <div className='flex-fill'>
            <p className='text-sm weight-500 mb-1 text__grey-dark'>{payments_texts.expires_on}</p>
            <p className='text-sm mb-0'>01/2024</p>
          </div>
        </div>
      </div>
      <button className='btn btn-secondary text-uppercase mt-1'>{payments_texts.btn}</button>
    </>
  ) : (
    <>
      <h4 className='mb-3'>{payments_texts.title}</h4>
      <p className='mb-5 mb-md-6'>
        {payments_texts.text}
      </p>
      <button className='btn btn-primary text-uppercase btn-xs-block'>{payments_texts.btn}</button>
    </>
  );

const Payout = ({payout_texts}) => (
  <>
    <h4 className='mb-3'>{payout_texts.title}</h4>
    <p className='mb-5 mb-md-6'>
        {payout_texts.text}
    </p>
    <button className='btn btn-primary text-uppercase btn-xs-block'>{payout_texts.btn}</button>
  </>
);

const PaymentPayout = () => {
  const cardExists = true;
  const [tab, setTab] = useState(1);
  const { t } = useTranslation();
  const routes = [
    {
        route: '/account',
        name: t("account_page.page_title"),
        isActive : false
    },
    {
        route: '/payment',
        name: t("account_page.payments.page_title"),
        isActive : true
    },
  ];
  const payments_texts = {
      title: t("account_page.payments.payment_title"),
      text: t("account_page.payments.add_payment_text"),
      card_currency: t("account_page.payments.card_currency", {currency: "AMD"}),
      card_type: t("account_page.payments.card_type"),
      visa_ends: t("account_page.payments.visa_ends", {number: 1234}),
      name_on_card: t("account_page.payments.name_on_card"),
      expires_on: t("account_page.payments.expires_on"),
      btn: t("account_page.payments.add_payment_btn")
  }
  const payout_texts = {
      title: t("account_page.payments.payout_title"),
      text: t("account_page.payments.add_payout_text"),
      card_currency: t("account_page.payments.card_currency", {currency: "AMD"}),
      card_type: t("account_page.payments.card_type"),
      visa_ends: t("account_page.payments.visa_ends", {number: 1234}),
      name_on_card: t("account_page.payments.name_on_card"),
      expires_on: t("account_page.payments.expires_on"),
      btn: t("account_page.payments.add_payout_btn")
  }
  return (
    <>
      <div className='mh-min-screen container'>
        <div className='col-xl-9 col-xxl-8 col-xxxl-7 m-auto p-0'>
          <Breadcrumbs routes={routes} className='pt-4 pb-5 pt-xl-5 pb-xl-6' />

          <h2 className='text__blue mb-5 mb-md-6 mb-xl-7'>{t("account_page.payments.page_title")}</h2>

          <div className='tabs mb-6'>
            <ul className='no-list-style mb-3 mb-lg-0 clearfix'>
              <li
                className={tab === 1 ? 'active' : ''}
                onClick={() => setTab(1)}
                role='presentation'
              >
                { t("account_page.payments.payment_title")}
              </li>
              <li
                className={tab === 2 ? 'active' : ''}
                onClick={() => setTab(2)}
                role='presentation'
              >
                { t("account_page.payments.payout_title")}
              </li>
            </ul>
          </div>
          {tab === 1 && <Payment cardExists={cardExists} payments_texts={payments_texts} />}
          {tab === 2 && <Payout payout_texts={payout_texts} />}
        </div>
      </div>
    </>
  );
};

export default PaymentPayout;
