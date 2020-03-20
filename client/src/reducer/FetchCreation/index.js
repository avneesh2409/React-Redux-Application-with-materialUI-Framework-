// import React from 'react';
import { FETCH_CREATION_REQUEST, FETCH_CREATION_FAILURE, FETCH_CREATION_SUCCESS } from '../../constants';

const initial = {
    loading:false,
    data:null,
    error:''
}
const FetchCreationReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case FETCH_CREATION_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_CREATION_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case FETCH_CREATION_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default FetchCreationReducer