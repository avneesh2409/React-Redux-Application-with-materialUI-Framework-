import { FETCH_DELETE_REQUEST,FETCH_DELETE_SUCCESS,FETCH_DELETE_FAILURE } from "../constants";
import { getToken } from "../helpers/fetchStore";

const t = getToken();
export const deleteUser = (url) =>{
    const options = {
        method: 'DELETE',
        headers: {
            'token':`${t}`
          }
      }
    return (dispatch)=>{
        dispatch(FetchDeleteRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(FetchDeleteSuccess(json)))
        .catch(err=>dispatch(FetchDeleteFailure(err.message)))
    }
}

export const FetchDeleteRequest = () =>{
    return {
        type:FETCH_DELETE_REQUEST
    }
}
export const FetchDeleteSuccess = (data) =>{
    return {
        type:FETCH_DELETE_SUCCESS,
        data
    }
}
export const FetchDeleteFailure = (error) =>{
    return {
        type:FETCH_DELETE_FAILURE,
        error
    }
}
