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
  <Flex column>
    <Header />
    <Flex justify="center" className={className}>
      {children}
    </Flex>
    <Footer />
  </Flex>;

export { Layout };
export default Layout;
