import { FETCH_ROLE_REQUEST,FETCH_ROLE_SUCCESS,FETCH_ROLE_FAILURE } from "../constants";
import { getToken, fetchStore } from "../helpers/fetchStore";

const t = getToken();
export const fetchRole = () =>{
    const {token} = fetchStore();
    let url = "http://localhost:8012/api/role/"+token.roleid;
    const options = {
        method: 'GET',
        headers: {
          'token':`${t}`
        }
      }
    return (dispatch)=>{
        dispatch(FetchRoleRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(FetchRoleSuccess(json)))
        .catch(err=>dispatch(FetchRoleFailure(err.message)))
    }
}

export const FetchRoleRequest = () =>{
    return {
        type:FETCH_ROLE_REQUEST
    }
}
export const FetchRoleSuccess = (data) =>{
    return {
        type:FETCH_ROLE_SUCCESS,
        data
    }
}
export const FetchRoleFailure = (error) =>{
    return {
        type:FETCH_ROLE_FAILURE,
        error
    }
}
