import { STORE_ACTION, STORE_TAB, Registration } from "../../constants"

const initial = {
    users:[],
    payload:Registration
}
export const userReducer = (state=initial,action) =>{
    switch(action.type){
        case STORE_ACTION:
            state.users.push(action.user)
            return {
                ...state
            }
        case STORE_TAB:
            return {
                ...state,
                payload:action.payload
            }
        default : return state
    }
}