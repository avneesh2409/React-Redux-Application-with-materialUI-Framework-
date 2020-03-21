import { UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,UPDATE_USER_FAILURE } from "../../constants";

const initial = {
    loading:false,
    data:null,
    error:''
}
const UpdateUserReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case UPDATE_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default UpdateUserReducer