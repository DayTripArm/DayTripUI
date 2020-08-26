import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import {useDispatch} from "react-redux";
import AccountMain from './routes/AccountMain';
import Personal from './routes/Personal';
import LoginSecurity from './routes/LoginSecurity';
import PaymentPayout from './routes/PaymentPayout';
import actions from "../../../actions";

const Account = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.userType) {
            dispatch(actions.profileInfoRequest(localStorage.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
