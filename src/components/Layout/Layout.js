// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { inject, observer } from 'mobx-react';
import UiStore from 'stores/UiStore';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';

type Props = {
  children: React.Node,
  subheader?: React.Node,
  className?: string,
  ui: UiStore
};

const Layout = ({ children, subheader, ui, className }: Props) =>
  <Background column>
    <Header subheader={subheader} />
    <Panel justify="center" mobile={ui.isMobile} className={className}>
      {children}
    </Panel>
    <Footer />
  </Background>;

const Background = styled(Flex)`
  background: #f0f2f5;
`;

const Panel = styled(Flex)`
  ${({ mobile }) => (mobile ? `margin: 0px;` : `margin: 20px 35px;`)}
  background: #fff;
  border-radius: 5px;
`;

export { Layout };
export default inject('ui')(observer(Layout));
