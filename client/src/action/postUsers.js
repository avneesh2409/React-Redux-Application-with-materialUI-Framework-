import { POST_USER_FAILURE,POST_USER_SUCCESS,POST_USER_REQUEST } from '../constants'
import { getToken, fetchStore } from "../helpers/fetchStore";

const t = getToken();
export const postUsers = (url,payload) =>{
    let {token} = fetchStore();
    payload.createdby = `${token.userid}`;
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':`${t}`
        },
        body:JSON.stringify(payload)
      }
    return (dispatch)=>{
        dispatch(PostUserRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(PostUserSuccess(json)))
        .catch(err=>dispatch(PostUserFailure(err.message)))
    }
}

export const PostUserRequest = () =>{
    return {
        type:POST_USER_REQUEST
    }
}
export const PostUserSuccess = (data) =>{
   if(data.status){
    alert("successfully registered");
    return {
        type:POST_USER_SUCCESS,
        data
    }
   }
  else{
      alert("unable to register try again");
    return (dispatch)=>{
          dispatch(PostUserFailure(data.message))
    }
  }
}
export const PostUserFailure = (error) =>{
    return {
        type:POST_USER_FAILURE,
        error
    }
}