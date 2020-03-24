import { UPDATE_USER_FAILURE,UPDATE_USER_SUCCESS,UPDATE_USER_REQUEST, SERVER_URL } from '../constants'
import { getToken} from "../helpers/fetchStore";

const t = getToken();
export const UpdateUser = (payload) =>{
    let url = SERVER_URL + "api/update";
    const options = {
        method: 'PATCH',
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
    console.log("my data is here :-",data);
    if(data.status)
    {alert("user updated successfully");
        return {
            type:UPDATE_USER_SUCCESS,
            data:data.message
        }
    }
   else{
       return (dispatch)=>{
           alert(data.message)
           dispatch(UpdateUserFailure(data.message))
       }
   }
}
export const UpdateUserFailure = (error) =>{
    alert('something went wrong!! unable to process the request');
    return {
        type:UPDATE_USER_FAILURE,
        error
    }
}