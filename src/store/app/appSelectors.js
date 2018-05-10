// @flow
import { themes } from 'constants/styles';
import { createSelector } from 'reselect';

const getThemeName = state => state.theme;

export const getTheme = createSelector(
  [getThemeName],
  themeName => themes[themeName]
);
