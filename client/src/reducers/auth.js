import { REGISTER_SUCCESS, REGISTER_FAILURE, AUTH_ERROR, USER_LOADED, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/types"


const intialState = {
    token : localStorage.getItem("token"),
    isAuthenticated : null,
    loading: true,
    user: null
}
const auth = (state=intialState,action) =>{ 
    const {type,payload} = action;
    switch(type){
        case USER_LOADED:
            return ({
                ...state,
                isAuthenticated: true,
                loading: false,
                user:payload
            })
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return ({
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            })
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading : false
            }
        default:
            return state;
    }
}


export default auth;