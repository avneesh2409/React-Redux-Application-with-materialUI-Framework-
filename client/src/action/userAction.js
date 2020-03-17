import {STORE_STYLE, STORE_TAB } from '../constants'

export const storeUserAction = (payload) => {
    return {
        type: STORE_STYLE,
        payload
    }
}
export const storeTab = (payload) =>{
    return {
        type:STORE_TAB,
        payload
    }
}