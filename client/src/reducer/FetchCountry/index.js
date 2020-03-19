// import React from 'react';
import { FETCH_COUNTRY_REQUEST, FETCH_COUNTRY_FAILURE, FETCH_COUNTRY_SUCCESS } from '../../constants';

const initial = {
    loading:false,
    data:null,
    error:''
}
const FetchCountryReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case FETCH_COUNTRY_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_COUNTRY_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case FETCH_COUNTRY_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default FetchCountryReducer