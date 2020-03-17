import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import Routers from './router';
// import SignInSide from './components/login';
import LoginRouter from './router/beforeLoginRouter';
import { getToken } from './helpers/fetchStore';


ReactDOM.render(
    <Provider store={store}>
        {
            (getToken())?<Routers />:<LoginRouter />
        }
    </Provider>, document.getElementById('root'));


serviceWorker.unregister();
