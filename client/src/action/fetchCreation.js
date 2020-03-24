import { FETCH_CREATION_REQUEST,FETCH_CREATION_SUCCESS,FETCH_CREATION_FAILURE,SERVER_URL } from "../constants";
import { getToken } from "../helpers/fetchStore";

const t = getToken();
export const fetchCreation = () =>{
    let url = SERVER_URL + "api/admin";
    const options = {
        method: 'GET',
        headers: {
            'token':`${t}`
          }
      }
    return (dispatch)=>{
        dispatch(FetchCreationRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(FetchCreationSuccess(json)))
        .catch(err=>dispatch(FetchCreationFailure(err.message)))
    }
}

export const FetchCreationRequest = () =>{
    return {
        type:FETCH_CREATION_REQUEST
    }
}
export const FetchCreationSuccess = (data) =>{
    return {
        type:FETCH_CREATION_SUCCESS,
        data
    }
}
export const FetchCreationFailure = (error) =>{
    alert('something went wrong!! unable to process the request');
    return {
        type:FETCH_CREATION_FAILURE,
        error
    }
}
