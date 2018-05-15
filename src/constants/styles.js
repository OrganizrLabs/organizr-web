// @flow

export type FontSize = 'tiny' | 'small' | 'normal' | 'large' | 'huge';
export type Color = 'teal' | 'lightgray' | 'white' | 'black';

export const fontSizes = {
  tiny: '8px',
  small: '10px',
  normal: '14px',
  large: '18px',
  huge: '24px',
  gigantic: '36px'
};

export const colors = {
  teal: '#00b5ad',
  yellow: '#fbbd08',
  lightgray: '#d4d4d5',
  white: '#ffffff',
  black: '#000000'
};

export const primaryColors = [
  {
    title: 'Green',
    color: '#25b47d'
  },
  {
    title: 'Teal',
    color: '#00BCD4'
  },
  {
    title: 'Light Blue',
    color: '#2979ff'
  },
  {
    title: 'Blue',
    color: '#1565c0'
  },
  {
    title: 'Indigo',
    color: '#673ab7'
  },
  {
    title: 'Orange',
    color: '#f57c00'
  },
  {
    title: 'Red',
    color: '#f44336'
  },
  {
    title: 'Pink',
    color: '#ec407a'
  },
  {
    title: 'Slate',
    color: '#455a64'
  }
];

export const themes = {
  light: {
    background: '#fff',
    backgroundSecondary: '#fff',
    color: '#000',
    colorSecondary: 'gray',
    shadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px'
  },
  dark: {
    background: '#212121',
    // light background color
    backgroundSecondary: '#404040',
    color: '#fff',
    colorSecondary: 'lightgray',
    shadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px'
  }
};

export const breakpoints = {
  desktop: 992,
  tablet: 768,
  mobile: 376
};
