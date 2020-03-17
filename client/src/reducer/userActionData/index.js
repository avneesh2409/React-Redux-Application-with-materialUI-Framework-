import { STORE_STYLE, LOGIN_STYLE } from '../../constants';

const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
const routerclass = {
    width:(isChrome)?'83.5vw':'75vw',
    position: 'absolute',
    top: '60px',
    left: '240px',
    right:'0px',
    textAlign : 'center',
    paddingTop : '0%'
}
const loginstyle = {
    position: 'absolute',
    right: '20px',
    marginTop:'50px',
    top: '0px',
    width:'600px',
    textAlign:'center'
  }

export function loginStyleReducer(state=loginstyle,action){
    switch(action.type)
    {
        case LOGIN_STYLE:
            return {
                ...state,
                left:action.payload
            }
        default: return state
    }
}
const userActionReducer = (state = routerclass, action) => {

    switch (action.type) {
        case STORE_STYLE:
            return {
                ...state,
                left: action.payload
            }
        default: return state
    }
}
export default userActionReducer;