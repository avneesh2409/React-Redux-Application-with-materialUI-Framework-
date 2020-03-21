import { UPDATE_USER_FAILURE,UPDATE_USER_SUCCESS,UPDATE_USER_REQUEST } from '../constants'
import { getToken} from "../helpers/fetchStore";

const t = getToken();
export const UpdateUser = (payload) =>{
    let url = "";
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':`${t}`
        },
        body:JSON.stringify(payload)
      }
    return (dispatch)=>{
        dispatch(UpdateUserRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(UpdateUserSuccess(json)))
        .catch(err=>dispatch(UpdateUserFailure(err.message)))
    }
}

export const UpdateUserRequest = () =>{
    return {
        type:UPDATE_USER_REQUEST
    }
}
export const UpdateUserSuccess = (data) =>{
   return {
        type:UPDATE_USER_SUCCESS,
        data
    }
}
export const UpdateUserFailure = (error) =>{
    return {
        type:UPDATE_USER_FAILURE,
        error
    }
}