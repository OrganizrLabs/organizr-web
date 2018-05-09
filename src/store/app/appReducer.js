// @flow
import { type Action } from 'types/Action';

type State = {};

const appReducer = (state: State = {}, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default appReducer;
