import { FORGOT_PASSWORD_FAILURE,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_REQUEST, SERVER_URL } from '../constants'
// import { getToken} from "../helpers/fetchStore";


export const forgotPassword = (payload) =>{
    const url =  SERVER_URL + "forgotpassword";
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(payload)
      }
    return (dispatch)=>{
        dispatch(ForgotPasswordRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(ForgotPasswordSuccess(json)))
        .catch(err=>dispatch(ForgotPasswordFailure(err.message)))
    }
}

export const ForgotPasswordRequest = () =>{
    return {
        type:FORGOT_PASSWORD_REQUEST
    }
}
export const ForgotPasswordSuccess = (data) =>{
   if(data.status){
       alert(data.message)
    return {
        type:FORGOT_PASSWORD_SUCCESS,
        data
    }
   }
  else{
    return (dispatch)=>{
          dispatch(ForgotPasswordFailure(data.message))
    }
  }
}
export const ForgotPasswordFailure = (error) =>{
    alert(error)
    return {
        type:FORGOT_PASSWORD_FAILURE,
        error
    }
}