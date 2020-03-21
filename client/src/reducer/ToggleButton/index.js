import {TOGGLE_BUTTON} from '../../constants';

const ToggleButtonReducer = (state={status:false,value:"Sign Up"},action) =>{
    switch(action.type)
    {
        case TOGGLE_BUTTON:
            return {
                ...state,
                status:action.status,
                value:action.value
            }
        default : return state
    }
}
export default ToggleButtonReducer;