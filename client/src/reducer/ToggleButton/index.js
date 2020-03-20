import {TOGGLE_BUTTON} from '../../constants';

const ToggleButtonReducer = (state={},action) =>{
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