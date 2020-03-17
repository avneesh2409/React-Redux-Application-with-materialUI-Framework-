import {STORE_ACTION} from '../constants'

export const storeUser = (user) =>{
  return {
    type:STORE_ACTION,
    user
  }
}