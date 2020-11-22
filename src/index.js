import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter as Router, useLocation } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./reducer/";
import rootSaga from "./rootSaga";
import App from './app';
import 'scss/app.scss';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0,0)
        }, 200)
    }, [pathname]);

    return null;
}
ReactDOM.render(
    <Provider store={store}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route path='/' component={() => <App />} />
          </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
