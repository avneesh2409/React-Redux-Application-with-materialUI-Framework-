import { POST_IMAGE_FAILURE,POST_IMAGE_REQUEST,POST_IMAGE_SUCCESS } from "../../constants";

const initial = {
    loading:false,
    data:null,
    error:''
}
const PostImageReducer = (state=initial,action) =>{
    switch(action.type)
    {
        case POST_IMAGE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case POST_IMAGE_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.error
            }
        case POST_IMAGE_SUCCESS:
            return {
                ...state,
                loading:false,
                data:action.data
            }
        default: return state
    }
}
export default PostImageReducer