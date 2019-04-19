/**
 * @author DucPL
 */
import ActionType from '../ActionTypes';

// a place to store common variables, and we change these vars by calling different Action functions.
const LoginReducer = (
  state = {
    isLoginSuccess: false,
    username: '',
    password: ''
  }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: payload
      }

    case ActionType.CLEAR_LOGIN_STATE:
      return {
        ...state,
        isLoginSuccess: false,
        username: '',
        password: ''
      }
    case ActionType.SET_USERNAME:
      return {
        ...state,
        username: payload
      }
    default:
      return state;
  }
}


export default LoginReducer;