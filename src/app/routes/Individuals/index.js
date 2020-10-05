import React from 'react';

// Load Vendors
import { Route, Switch, Redirect } from 'react-router-dom';

import Driver from './routes/Driver';
import User from './routes/User';

const Individuals = ({ match }) => {

    return (
        <Switch>
            <Route path={`${match.path}/driver`} component={Driver}/>
            <Route path={`${match.path}/user`} component={User} />
            <Redirect from={match.path} to={`${match.path}/driver`}/>
        </Switch>
    )
};

export default Individuals;
