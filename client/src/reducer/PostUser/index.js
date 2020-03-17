import { POST_USER_REQUEST,POST_USER_SUCCESS,POST_USER_FAILURE } from "../../constants";

const initial = {
    loading:false,
    data:null,
    error:''
}
const PostUserReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case POST_USER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case POST_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case POST_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default PostUserReducer