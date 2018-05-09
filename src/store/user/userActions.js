// @flow
import * as actionTypes from './userActionTypes';

// Actions
export const loginUser = (token: string, error: Object) => ({
  type: actionTypes.USER_LOGIN,
  payload: token,
  error
});

export const logoutUser = () => ({
  type: actionTypes.USER_LOGOUT
});
