export function fetchStore() {
    const store = JSON.parse(localStorage.getItem('token'));
    const token = parseJwt(store.data);
    return {token};
}
export function getToken(){
    const store = JSON.parse(localStorage.getItem('token'));
    if(store){
        if(store.data){
            return store.data;
        }
        return null;
    }
    else{
        return null;
    }
}
export function setStore(token)
{
    localStorage.setItem('token',JSON.stringify({"data":token}));
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};