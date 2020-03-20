// import React from "react";
import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "../constants";
import { getToken, fetchStore } from "../helpers/fetchStore";

const t = getToken();
const {token} = fetchStore();
export const fetchUsers = () =>{
    let url = "http://localhost:8012/api/users/"+token.userid;
    const options = {
        method: 'GET',
        headers: {
          'token':`${t}`
        }
      }
    return (dispatch)=>{
        dispatch(FetchUserRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(FetchUserSuccess(json)))
        .catch(err=>dispatch(FetchUserFailure(err.message)))
    }
}

export const FetchUserRequest = () =>{
    return {
        type:FETCH_USER_REQUEST
    }
}
export const FetchUserSuccess = (data) =>{
    return {
        type:FETCH_USER_SUCCESS,
        data
    }
}
export const FetchUserFailure = (error) =>{
    return {
        type:FETCH_USER_FAILURE,
        error
    }
}
