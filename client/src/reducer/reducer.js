import { combineReducers } from 'redux';
import { userReducer } from './userData';
import userActionReducer,{loginStyleReducer} from './userActionData';
import FetchUserReducer from './FetchUser';
import PostImageReducer from './PostImage';
import PostUserReducer from './PostUser';
import FetchRoleReducer from './FetchRole';
import FetchCountryReducer from './FetchCountry';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    userReducer,
    userActionReducer,
    loginStyleReducer,
    FetchUserReducer,
    PostUserReducer,
    FetchRoleReducer,
    FetchCountryReducer,
    PostImageReducer,
    routing: routerReducer
});

export default rootReducer;


