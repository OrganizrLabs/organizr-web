// @flow
import { type Action } from 'types/Action';
import * as actionTypes from './userActionTypes';

type State = {
  // The user token provided from firebase auth
  loggedIn: boolean
};

const initialState: State = {
  loggedIn: false
};

const appReducer = (
  state: State = initialState,
  { type, error, payload }: Action
) => {
  switch (type) {
    case actionTypes.USER_LOGIN:
      return !error ? { ...state, loggedIn: true } : state;
    case actionTypes.USER_LOGOUT:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default appReducer;
