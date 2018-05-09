// @flow
import { type Action } from 'types/Action';
import * as actionTypes from './userActionTypes';

type State = {
  // The user token provided from firebase auth
  token: ?string
};

const initialState: State = {
  token: null
};

const appReducer = (
  state: State = initialState,
  { type, error, payload }: Action
) => {
  switch (type) {
    case actionTypes.USER_LOGIN:
      return !error ? { ...state, token: payload } : state;
    case actionTypes.USER_LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
};

export default appReducer;
