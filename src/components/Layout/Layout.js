// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { connect } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import SideMenu from './components/SideMenu';
import styled from 'styled-components';
import * as appActions from 'store/app/appActions';
import { getTheme } from 'store/app/appSelectors';
import { type Theme } from 'types/Theme';
import { media } from 'helpers/styles';

type Props = {
  children: React.Node,
  subheader?: React.Node,
  className?: string,
  onTabClick?: Function,
  actions?: React.Node,
  showSidebar?: boolean,
  sidebarCollapsed: boolean,
  sidebarVisible: boolean,
  primaryColor: string,
  theme: Theme,
  auth: Object,
  themeName: string,
  toggleSidebarCollapsed: void => void,
  toggleSidebarVisibility: void => void
};

const Layout = ({
  children,
  subheader,
  onTabClick,
  actions,
  theme,
  auth,
  themeName,
  showSidebar = true,
  primaryColor,
  sidebarCollapsed,
  sidebarVisible,
  toggleSidebarCollapsed,
  toggleSidebarVisibility,
  className
}: Props) => {
  return (
    <Background>
      {showSidebar &&
        sidebarVisible &&
        <StyledSideMenu
          collapsed={sidebarCollapsed}
          toggleCollapsed={toggleSidebarCollapsed}
          theme={theme}
          themeName={themeName}
          primaryColor={primaryColor}
          userName={auth.displayName || auth.email || 'New User'}
          title="App Title"
        />}
      {sidebarVisible && <Overlay onClick={toggleSidebarVisibility} />}
      <Content
        auto
        column
        collapsed={sidebarCollapsed}
        showSidebar={showSidebar}
        theme={theme}
      >
        <Header
          subheader={subheader}
          onTabClick={onTabClick}
          actions={actions}
          sidebarCollapsed={sidebarCollapsed}
          sidebarVisible={showSidebar}
          toggleSidebar={toggleSidebarVisibility}
          primaryColor={primaryColor}
        />
        <Panel
          auto
          column
          theme={theme}
          themeName={themeName}
          align="center"
          primary={primaryColor}
          className={className}
        >
          {children}
        </Panel>
        <Footer theme={theme} themeName={themeName} />
      </Content>
    </Background>
  );
};

const StyledSideMenu = styled(SideMenu)`
  ${media.tablet`display: none;`}
`;

const Overlay = styled.div`
  display: none;
  ${media.tablet`display: block;`} position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(200, 200, 200, 0.6);
`;

const Content = styled(Flex)`
  ${({ collapsed, showSidebar, theme }) => `
    padding-left: ${showSidebar ? (collapsed ? '64px' : '256px') : '0'};
    background: ${theme.background};
    color: ${theme.color};
  `};
`;

const Background = styled(Flex)`
  // background: #f0f2f5;
  min-height: 100vh;
`;

const Panel = styled(Flex)`
  margin: 0;
  background: ${({ themeName, theme }) =>
    themeName === 'light' ? '#f0f2f5' : theme.background};
  position: relative;
  z-index: 1;

  &:before {
    background: ${({ primary }) => primary};
    content: '';
    display: block;
    height: 550px;
    left: 0;
    position: absolute;
    right: 0;
    z-index: -1;
    -webkit-backface-visibility: hidden; // for Chrome Windows
    top: -315px;
    transform: skewY(-5.5deg);
    transform-origin: 100% 0;
  }
`;

const mapStateToProps = ({
  firebase: { auth },
  app,
  app: { sidebarVisible, sidebarCollapsed, primaryColor, theme }
}) => ({
  sidebarVisible,
  sidebarCollapsed,
  primaryColor,
  theme: getTheme(app),
  themeName: theme,
  auth
});

const mapDispatchToProps = (dispatch: Function) => ({
  toggleSidebarVisibility: () => dispatch(appActions.toggleSidebarVisibility()),
  toggleSidebarCollapsed: () => dispatch(appActions.toggleSidebarCollapsed())
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
