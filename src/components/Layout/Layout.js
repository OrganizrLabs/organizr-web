// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  subheader?: React.Node,
  className?: string
};

const Layout = ({ children, subheader, ui, className, ...restProps }: Props) =>
  <Background column>
    <Header subheader={subheader} />
    <Panel auto align="center" column className={className} {...restProps}>
      {children}
    </Panel>
    <Footer />
  </Background>;

const Background = styled(Flex)`
  background: #f0f2f5;
  min-height: 100vh;
`;

const Panel = styled(Flex)`
  margin: 20px 35px;
  // background: #fff;
  // border-radius: 5px;
`;

export { Layout };
export default Layout;
