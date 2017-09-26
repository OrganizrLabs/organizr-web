// @flow
import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

type Props = {
  children: React.Node
};

const Panel = ({ children, ...otherProps }: Props) => {
  return (
    <AppSegment {...otherProps}>
      {children}
    </AppSegment>
  );
};

const AppSegment = styled(Segment)`
  padding: 25px;
  flex: 1;
`;

export { Panel };
export default Panel;
