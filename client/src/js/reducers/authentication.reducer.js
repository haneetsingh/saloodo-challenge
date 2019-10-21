import { userConstants } from '../constants';

export function authentication(state = {
  loggingIn: false,
  loggedIn: false,
  user: null,
  error: null
}, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        loggedIn: true,
        user: action.payload,
        error: null
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loggedIn: false,
        user: null,
        error: action.payload
      };
    case userConstants.LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    default:
      return state
  }
}