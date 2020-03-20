import {TOGGLE_BUTTON} from '../constants';

export const ToggleButton = (status,value) =>{
    return {
        type:TOGGLE_BUTTON,
        status,
        value
    }
}