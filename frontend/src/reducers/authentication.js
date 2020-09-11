import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
  isLogged: false,
  user,
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLogged: true,
        user: action.user
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        user: action.user,
      }
    case userConstants.LOGIN_ERROR:
      return {
        ...state,
      }
    default:
      return state;
  }
}