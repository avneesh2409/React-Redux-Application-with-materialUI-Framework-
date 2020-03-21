import { combineReducers } from 'redux';
import { userReducer } from './userData';
import userActionReducer,{loginStyleReducer} from './userActionData';
import FetchUserReducer from './FetchUser';
import PostImageReducer from './PostImage';
import PostUserReducer from './PostUser';
import FetchRoleReducer from './FetchRole';
import FetchCountryReducer from './FetchCountry';
import FetchCreationReducer from './FetchCreation';
import FetchDeleteReducer from './DeleteUser';
import ToggleButtonReducer from './ToggleButton';
import FetchSingleUserReducer from './FetchSingleUser';
import UpdateUserReducer from './UpdateUser';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    userReducer,
    userActionReducer,
    loginStyleReducer,
    UpdateUserReducer,
    FetchSingleUserReducer,
    ToggleButtonReducer,
    FetchDeleteReducer,
    FetchUserReducer,
    FetchCreationReducer,
    PostUserReducer,
    FetchRoleReducer,
    FetchCountryReducer,
    PostImageReducer,
    routing: routerReducer
});

export default rootReducer;


