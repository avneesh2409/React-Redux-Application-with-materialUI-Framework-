// import React from 'react';
import { FETCH_ROLE_REQUEST, FETCH_ROLE_FAILURE, FETCH_ROLE_SUCCESS } from '../../constants';

const initial = {
    loading:false,
    data:null,
    error:''
}
const FetchRoleReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case FETCH_ROLE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_ROLE_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case FETCH_ROLE_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default FetchRoleReducer