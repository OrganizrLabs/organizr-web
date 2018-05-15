// @flow
import * as React from 'react';
import { type FontSize, type Color, fontSizes, colors } from 'constants/styles';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  className?: string,
  color?: Color,
  size?: FontSize
};

const Text = ({
  children,
  className,
  size = 'normal',
  color = 'black'
}: Props) =>
  <Span size={size} color={color} className={className}>
    {children}
  </Span>;

const Span = styled.span`
  font-size: ${({ size }) => fontSizes[size]};
  color: ${({ color }) => colors[color]};
`;

export { Text };
export default Text;
