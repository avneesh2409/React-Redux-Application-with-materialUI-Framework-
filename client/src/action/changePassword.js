import { CHANGE_PASSWORD_FAILURE,CHANGE_PASSWORD_SUCCESS,CHANGE_PASSWORD_REQUEST, SERVER_URL, Registration } from '../constants'
import { getToken } from '../helpers/fetchStore';
import { push } from 'react-router-redux';
// import { getToken} from "../helpers/fetchStore";

let t = getToken();
export const changePassword = (token,payload) =>{
    let url =  null;
    let data = null;
    let options = null;
    console.log("token is here :-",token);
    if(token)
    {url = SERVER_URL + "changepassword";
        data = {
            newpassword:payload,
            userid:parseInt(token)
        }
        options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        }
    }
    else{
        url = SERVER_URL + "api/changepasswordauth";
        data = {
            newpassword:payload,
        }
        options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'token':`${t}`
            },
            body:JSON.stringify(data)
          }
    }

    return (dispatch)=>{
        dispatch(ChangePasswordRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(ChangePasswordSuccess(json,token)))
        .catch(err=>dispatch(ChangePasswordFailure(err.message)))
    }
}

export const ChangePasswordRequest = () =>{
    return {
        type:CHANGE_PASSWORD_REQUEST
    }
}
export const ChangePasswordSuccess = (data,token) =>{
   if(data.status){
       alert(data.message)
    return (dispatch)=>{
        // type:CHANGE_PASSWORD_SUCCESS,
        // data
        if(token){
            dispatch(push('/login'))
        }
        else{
            dispatch(push(`${Registration}`))
        }
    }
   }
  else{
      alert(data.message)
    return (dispatch)=>{
        //   dispatch(ChangePasswordFailure(data.message))
        dispatch(push('/login'))
    }
  }
}
export const ChangePasswordFailure = (error) =>{
    return {
        type:CHANGE_PASSWORD_FAILURE,
        error
    }
}