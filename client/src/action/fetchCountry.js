import { FETCH_COUNTRY_REQUEST,FETCH_COUNTRY_SUCCESS,FETCH_COUNTRY_FAILURE } from "../constants";

export const fetchCountry = () =>{
    let url = "https://restcountries.eu/rest/v2/all";
    const options = {
        method: 'GET'
      }
    return (dispatch)=>{
        dispatch(FetchCountryRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(FetchCountrySuccess(json)))
        .catch(err=>dispatch(FetchCountryFailure(err.message)))
    }
}

export const FetchCountryRequest = () =>{
    return {
        type:FETCH_COUNTRY_REQUEST
    }
}
export const FetchCountrySuccess = (data) =>{
    return {
        type:FETCH_COUNTRY_SUCCESS,
        data
    }
}
export const FetchCountryFailure = (error) =>{
    alert('something went wrong!! unable to process the request');
    return {
        type:FETCH_COUNTRY_FAILURE,
        error
    }
}
