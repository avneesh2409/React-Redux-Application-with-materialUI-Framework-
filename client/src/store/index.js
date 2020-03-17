import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducer/reducer';
import { routerMiddleware} from 'react-router-redux'
import { browserHistory } from 'react-router'

const middleware = routerMiddleware(browserHistory)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk,middleware)));

export default store
