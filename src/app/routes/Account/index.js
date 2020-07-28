import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountMain from './routes/AccountMain';
import Personal from './routes/Personal';
import LoginSecurity from './routes/LoginSecurity';
import PaymentPayout from './routes/PaymentPayout';

const Account = () => {

  return (

    <Switch>
      <Route exact path="/account" component={AccountMain} />
      <Route exact path="/account/personal" component={() => <Personal />}/>
      <Route exact path="/account/loginSecurity" component={LoginSecurity}/>
      <Route exact path="/account/paymentPayout" component={PaymentPayout}/>
    </Switch>
  );
};

export default Account;
