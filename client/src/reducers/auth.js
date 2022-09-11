import { REGISTER_SUCCESS, REGISTER_FAILURE, AUTH_ERROR, USER_LOADED } from "../actions/types"


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
            localStorage.setItem('token',payload.token);
            return ({
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            })
        case REGISTER_FAILURE:
        case AUTH_ERROR:
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