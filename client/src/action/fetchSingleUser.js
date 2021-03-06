import { FETCH_SINGLE_USER_REQUEST,FETCH_SINGLE_USER_SUCCESS,FETCH_SINGLE_USER_FAILURE, SERVER_URL } from "../constants";
import { getToken } from "../helpers/fetchStore";

const t = getToken();
export const fetchSingleUser = (id) =>{
    let url = SERVER_URL + "api/singleuser/"+id;
    const options = {
        method: 'GET',
        headers: {
          'token':`${t}`
        }
      }
    return (dispatch)=>{
        dispatch(FetchSingleUserRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(FetchSingleUserSuccess(json)))
        .catch(err=>dispatch(FetchSingleUserFailure(err.message)))
    }
}

export const FetchSingleUserRequest = () =>{
    return {
        type:FETCH_SINGLE_USER_REQUEST
    }
}
export const FetchSingleUserSuccess = (data) =>{
    return {
        type:FETCH_SINGLE_USER_SUCCESS,
        data
    }
}
export const FetchSingleUserFailure = (error) =>{
    alert('something went wrong!! unable to process the request');
    return {
        type:FETCH_SINGLE_USER_FAILURE,
        error
    }
}
