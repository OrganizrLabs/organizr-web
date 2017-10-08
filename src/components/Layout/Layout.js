// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  className?: string
};

const Layout = ({ children, className }: Props) =>
  <Background column>
    <Header />
    <Flex justify="center" className={className}>
      {children}
    </Flex>
    <Footer />
  </Background>;

const Background = styled(Flex)`
  background: #f7f7f7;
`;

export { Layout };
export default Layout;
