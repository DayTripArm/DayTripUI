import React from 'react';

// Load Vendors
import { Route, Switch, Redirect } from 'react-router-dom';

// Load Components
import Breadcrumbs from 'shared/components/Breadcrumbs';

// Load Routes
import Review from './routes/Review';
import Payment from './routes/Payment';
import Success from './routes/Success';

// Conditionally
const routes = [
  {
    route: 'checkout/review',
    name: 'Review Your Trip',
    isActive: true
  },
  {
    route: 'checkout/payment',
    name: 'Payment Information',
    isActive: false
  },
];

const Checkout = ({ location, match }) => {
  const isSuccessPage = location.pathname.includes('success');

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
