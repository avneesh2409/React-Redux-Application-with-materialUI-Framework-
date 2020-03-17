import { getToken, fetchStore } from "./fetchStore";

let data1 = null
const t = getToken();
export const  Post = async (url,credentials) =>{
    const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      }
    const response = await fetch(url,options).then(res=>res.json()).catch(err=>{console.log(err.message)})
    data1 = await response;
    return {data1};
}
export const  registerPost = async (url,credentials) =>{
  const {token} = fetchStore();
  credentials.createdby = `${token.roleid}`;
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token':`${t}`
        },
        body: JSON.stringify(credentials)
      }
    data1 = await fetch(url,options).then(res=>res.json()).then(d=>d).catch(err=>{console.log(err.message)})
    return {data1};
}
// export const getUsers = async (url) =>{


//   let data = await fetch(url,options).then(res=>res.json()).then(data=>data).catch(err=>{console.log(err.message)});
//   return data;
// }

export const fetchData = () =>{

}