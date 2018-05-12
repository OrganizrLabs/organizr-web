// @flow
import * as React from 'react';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';

type Props = {
  /**
   * Click handler for the button. If action, label, or value are
   * supplied as props clicking the button will also send an event
   * to Google Analytics
   */
  onClick?: Function,
  /** Whether or not a drop shadow should be added to the button */
  flat?: boolean,
  /** Child - should just be a text field */
  children?: React.Node
};

/**
 * A simple button component build on top of the antd component
 * with some styling additions
 */
const Button = ({ onClick, flat, children, ...other }: Props) => {
  return (
    <StyledButton onClick={onClick} flat={flat} {...other}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(AntButton)`
  height: 38px;
  padding: 0 20px;
  font-size: 14px;
  // text-transform: uppercase;
`;

export default Button;
