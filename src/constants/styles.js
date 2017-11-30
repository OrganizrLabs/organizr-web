// @flow

export type FontSize = 'tiny' | 'small' | 'normal' | 'large' | 'huge';
export type Color = 'teal' | 'lightgray' | 'white' | 'black';

const fontSizes = {
  tiny: '8px',
  small: '10px',
  normal: '14px',
  large: '18px',
  huge: '24px',
  gigantic: '36px'
};

const colors = {
  teal: '#00b5ad',
  yellow: '#fbbd08',
  lightgray: '#d4d4d5',
  white: '#ffffff',
  black: '#000000'
};

const breakpoints = {
  desktop: 992,
  tablet: 768,
  mobile: 0
};

export { colors, fontSizes, breakpoints };
