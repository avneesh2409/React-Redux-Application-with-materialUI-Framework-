// import React from "react";
import { POST_IMAGE_REQUEST,POST_IMAGE_SUCCESS,POST_IMAGE_FAILURE, SERVER_URL } from "../constants";
import { getToken } from "../helpers/fetchStore";

const t = getToken();
export const postImage = (payload) =>{
    let url = SERVER_URL + "api/fileupload";
    let data = new FormData();
    data.append('image', payload.image);
    const options = {
        method: 'POST',
        headers: {
          'token':`${t}`
        },
        body:data
      }
    return (dispatch)=>{
        dispatch(PostImageRequest())
        fetch(url,options)
        .then(response => response.json())
        .then(json => dispatch(PostImageSuccess(json)))
        .catch(err=>dispatch(PostImageFailure(err.message)))
    }
}

export const PostImageRequest = () =>{
    return {
        type:POST_IMAGE_REQUEST
    }
}
export const PostImageSuccess = (data) =>{
    // console.log("data here:-",data);
    (data.status)?alert("image uploaded successfully"):alert("unable to upload")
    return {
        type:POST_IMAGE_SUCCESS,
        data:data.location
    }
}
export const PostImageFailure = (error) =>{
    alert('something went wrong!! unable to process the request');
    return {
        type:POST_IMAGE_FAILURE,
        error
    }
}
