import React from 'react';
import './App.css';
import Home from "./react_app/Home";
import Account from "./react_app/Account/Account";
import Driver from "./react_app/Driver/Driver";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/driver" component={Driver} />
          <Route render={() => <h1>404!</h1>} />
        </Switch>
      </Router>
  );
}

export default App;
