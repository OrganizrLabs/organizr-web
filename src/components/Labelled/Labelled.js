// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Flex } from 'reflexbox';

type Props = {
  children: React.Node,
  label: string,
  primaryColor: string,
  className?: string
};

/** Small wrapper component for labelling */
const Labelled = ({
  children,
  label,
  primaryColor,
  className,
  ...otherProps
}: Props) =>
  <Flex {...otherProps} column className={className}>
    <Label primaryColor={primaryColor}>
      {label}
    </Label>
    {children}
  </Flex>;

const Label = styled.h4`color: ${({ primaryColor }) => primaryColor};`;

const mapStateToProps = ({ app: { primaryColor } }) => ({ primaryColor });

export default connect(mapStateToProps)(Labelled);
