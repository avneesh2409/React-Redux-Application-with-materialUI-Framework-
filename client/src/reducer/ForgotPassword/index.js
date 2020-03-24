import { FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAILURE } from "../../constants";

const initial = {
    loading:false,
    data:null,
    error:''
}
const ForgotPasswordReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case FORGOT_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FORGOT_PASSWORD_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default ForgotPasswordReducer