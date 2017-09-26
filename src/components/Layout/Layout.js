// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  className?: string,
};

const Layout = ({ children, className }: Props) =>
  <Flex column>
    <Header />
    <Content justify="center" className={className}>
      {children}
    </Content>
    <Footer />
  </Flex>;

const Content = styled(Flex)`
  max-width: 1250px;
  margin: auto;
`;

export { Layout };
export default Layout;
