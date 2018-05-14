// @flow
import * as React from 'react';
import { Button as AntButton } from 'antd';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTheme } from 'store/app/appSelectors';
import { type Theme } from 'types/Theme';

type Props = {
  /** Click handler for the button. */
  onClick?: Function,
  /** Whether or not a drop shadow should be added to the button */
  flat?: boolean,
  /** Child - should just be a text field */
  children?: React.Node,
  /** Current theme of the application */
  theme: Theme,
  /** Primary color of the application */
  primaryColor: string
};

/**
 * A simple button component build on top of the antd component
 * with some styling additions
 */
const Button = ({
  onClick,
  theme,
  primaryColor,
  flat,
  children,
  ...other
}: Props) => {
  return (
    <StyledButton
      onClick={onClick}
      primaryColor={primaryColor}
      flat={flat}
      theme={theme}
      {...other}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(AntButton)`
  height: 38px;
  padding: 0 20px;
  text-transform: uppercase;
  font-size: 14px;
  ${({ primary, flat, theme, primaryColor }) =>
    `
    background-color: ${theme.background};
    color: ${theme.color};
    ${primary &&
      `
      background-color: ${primaryColor}; 
      color: #fff;
    `}
    ${!flat ? `box-shadow: ${theme.shadow}` : ``};
    &:hover {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:active {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:focus {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
  `};
`;

const mapStateToProps = ({ app, app: { primaryColor } }) => ({
  theme: getTheme(app),
  primaryColor
});

export default connect(mapStateToProps)(Button);
