// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  className?: string,
  children?: React.Node
};

const DashboardPanel = ({ children, className, ...otherProps }: Props) => {
  return (
    <Panel className={className} {...otherProps}>
      {children}
    </Panel>
  );
};

const Panel = styled(Flex)`
  padding: 10px;
  background: #fff;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

export default DashboardPanel;
