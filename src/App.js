import React from 'react';
import './App.css';
import Home from "./react_app/Home";
import Account from "./react_app/Account";
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
          <Route render={() => {
              return (
                  <h1>404!</h1>
              );
          }} />
        </Switch>
      </Router>
  );
}

export default App;
