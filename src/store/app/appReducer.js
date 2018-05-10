// @flow
import { type Action } from 'types/Action';
import * as appActions from './appActionTypes';

type State = {
  sidebarCollapsed: boolean,
  sidebarVisible: boolean,
  primaryColor: string,
  theme: string
};

const initialState: State = {
  sidebarCollapsed: false,
  sidebarVisible: true,
  primaryColor: '#2979ff',
  theme: 'light'
};

const appReducer = (state: State = initialState, { type, payload }: Action) => {
  switch (type) {
    case appActions.TOGGLE_SIDEBAR_VISIBILITY:
      return { ...state, sidebarVisible: !state.sidebarVisible };
    case appActions.TOGGLE_SIDEBAR_COLLAPSED:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case appActions.CHANGE_PRIMARY_COLOR:
      return { ...state, primaryColor: payload };
    case appActions.CHANGE_THEME:
      return { ...state, theme: payload };
    default:
      return state;
  }
};

export default appReducer;
