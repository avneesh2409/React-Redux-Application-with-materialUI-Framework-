import { FETCH_DELETE_REQUEST, FETCH_DELETE_FAILURE, FETCH_DELETE_SUCCESS } from '../../constants';

const initial = {
    loading:false,
    data:null,
    error:''
}
const FetchDeleteReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case FETCH_DELETE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_DELETE_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case FETCH_DELETE_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default FetchDeleteReducer