// @flow
import * as actionTypes from './userActionTypes';

// Actions
export const loginUser = () => ({
  type: actionTypes.USER_LOGIN,
  payload: {}
});

export const logoutUser = () => ({
  type: actionTypes.USER_LOGOUT
});
