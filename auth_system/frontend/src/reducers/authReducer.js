import {
    LOGIN_FAIL,LOGIN_SUCCESS,USER_LOADED_SUCCESS,USER_LOADED_FAIL,LOGOUT
} from '../actions/types'



const initialState={
    "access":localStorage.getItem("access"),
    "refresh":localStorage.getItem("refresh"),
    "user":null,
    "isAuthenticated":null    
}

export default function authReducer(state=initialState,action){
 const{type,payload}=action

 switch(type){
 
    case LOGIN_SUCCESS:
      localStorage.setItem('access', payload.access);
      localStorage.setItem('refresh', payload.refresh);
       return {
          ...state,
          isAuthenticated: true,
          access: payload.access,
        }
    case USER_LOADED_SUCCESS:
        return {
         ...state,
         user:payload,
         isAuthenticated: true,
        }  
    case USER_LOADED_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
            }
            
    default:
        return state
    } 


 }

