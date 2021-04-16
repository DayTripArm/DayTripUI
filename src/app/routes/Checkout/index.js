import React from 'react';
import { useTranslation } from 'react-i18next';
// Load Vendors
import { Route, Switch, Redirect } from 'react-router-dom';

// Load Components
import Breadcrumbs from 'shared/components/Breadcrumbs';

// Load Routes
import Review from './routes/Review';
import Payment from './routes/Payment';
import Success from './routes/Success';

const Checkout = ({ location, match }) => {
  const { t } = useTranslation();
  const isSuccessPage = location.pathname.includes('success');
  const isPaymentPage = location.pathname.includes('payment');
    // Conditionally
    let routes = [
        {
            route: '/checkout/review',
            name: t("checkout_page.pickup_info.page_title"),
            isActive: true
        },
        {
            route: '/checkout/payment',
            name: t("checkout_page.payment_page_title"),
            isActive: false
        },
    ];
  if (isPaymentPage) {
      routes[0].isActive = false;
      routes[1].isActive = true;
  } else {
      routes[0].isActive = true;
      routes[1].isActive = false;
  }

  return (
    <div className='container'>
      {!isSuccessPage && (
        <div className='mt-5 mb-6'>
          <Breadcrumbs routes={routes} />
        </div>
      )}
      <div className='d-flex flex-column flex-md-row justify-content-center'>
        <Switch>
          <Route path={`${match.path}/review`} component={Review} />
          <Route path={`${match.path}/payment`} component={Payment} />
          <Route path={`${match.path}/success`} component={Success} />
          <Redirect from={match.path} to={`${match.path}/review`} />
        </Switch>
      </div>
    </div>
  );
};

export default Checkout;
