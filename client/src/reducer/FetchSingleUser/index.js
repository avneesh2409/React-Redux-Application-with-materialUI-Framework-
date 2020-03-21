// import React from 'react';
import { FETCH_SINGLE_USER_REQUEST, FETCH_SINGLE_USER_FAILURE, FETCH_SINGLE_USER_SUCCESS } from '../../constants';

const initial = {
    loading:false,
    data:[],
    error:''
}
const FetchSingleUserReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case FETCH_SINGLE_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_SINGLE_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case FETCH_SINGLE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default FetchSingleUserReducer