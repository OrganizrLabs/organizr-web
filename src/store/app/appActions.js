// @flow
import * as appActions from './appActionTypes';

export const toggleSidebarVisibility = () => ({
  type: appActions.TOGGLE_SIDEBAR_VISIBILITY,
  payload: {}
});

export const toggleSidebarCollapsed = () => ({
  type: appActions.TOGGLE_SIDEBAR_COLLAPSED,
  payload: {}
});

export const changePrimaryColor = (color: string) => ({
  type: appActions.CHANGE_PRIMARY_COLOR,
  payload: color
});

export const changeTheme = (themeName: 'dark' | 'light') => ({
  type: appActions.CHANGE_THEME,
  payload: themeName
});
