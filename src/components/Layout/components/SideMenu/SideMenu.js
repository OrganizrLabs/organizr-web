// @flow
import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Flex } from 'reflexbox';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { scenes } from 'constants/app';
import styled from 'styled-components';
import Button from 'components/Button';
import { media } from 'helpers/styles';
import { type Theme } from 'types/Theme';

type Props = {
  /** Whether or not the sidebar is collapsed to only show icons */
  collapsed: boolean,
  /** Function to toggle whether the sidebar is collapsed */
  toggleCollapsed: Function,
  /** Object provided by React router to determine the current active route */
  location: Object,
  themeName: string,
  theme: Theme,
  userName: string,
  primaryColor: string,
  className: string
};

const getBasePath = pathname => {
  let slashCount = 0,
    ret = pathname;
  [...pathname].forEach((c, i) => {
    if (c === '/') {
      if (slashCount >= 1) {
        ret = pathname.substring(0, i);
      }
      slashCount++;
    }
  });
  return ret;
};

/**
 * Component that renders the sidebar for the application.
 */
const SideMenu = ({
  collapsed,
  toggleCollapsed,
  theme,
  themeName,
  userName,
  location,
  primaryColor,
  className
}: Props) => {
  const basePath = getBasePath(location.pathname);
  const handleItemClick = () => {};
  return (
    <SidebarContainer column collapsed={collapsed} className={className}>
      <SidebarHeader
        theme={theme}
        align="center"
        justify={collapsed ? 'center' : 'flex-start'}
        collapsed={collapsed}
      >
        <HeaderIcon type="user" collapsed={collapsed} />
        {!collapsed &&
          <ProjectTitle theme={theme}>
            {userName}
          </ProjectTitle>}
      </SidebarHeader>
      <Flex auto>
        <StyledMenu
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={basePath === '/checklist' ? ['/checklist'] : []}
          mode="inline"
          theme={themeName}
          inlineCollapsed={collapsed}
          primary={primaryColor}
          appTheme={theme}
        >
          {scenes.map((scene, i) => {
            if (scene.scenes.length > 0) {
              return (
                <StyledSubmenu
                  key={scene.path}
                  title={
                    <span>
                      <SubmenuHeaderLink
                        to={scene.path}
                        onClick={handleItemClick}
                        primaryColor={primaryColor}
                      >
                        <Icon type={scene.icon} />
                        <span>
                          {scene.name}
                        </span>
                      </SubmenuHeaderLink>
                    </span>
                  }
                >
                  {scene.scenes.map((subscene, j) =>
                    <SubmenuItem
                      key={subscene.path}
                      collapsed={collapsed}
                      theme={theme}
                    >
                      <SubmenuItemLink
                        to={subscene.path}
                        onClick={handleItemClick}
                        collapsed={collapsed}
                      >
                        <Icon type={subscene.icon} />
                        <span>
                          {subscene.name}
                        </span>
                      </SubmenuItemLink>
                    </SubmenuItem>
                  )}
                </StyledSubmenu>
              );
            }
            return (
              <Menu.Item key={scene.path}>
                <Link to={scene.path} onClick={handleItemClick}>
                  <Icon type={scene.icon} />
                  <span>
                    {scene.name}
                  </span>
                </Link>
              </Menu.Item>
            );
          })}
        </StyledMenu>
      </Flex>
      <CollapseButton
        onClick={toggleCollapsed}
        icon={collapsed ? 'menu-unfold' : 'menu-fold'}
        primaryColor={primaryColor}
      >
        {!collapsed ? `Collapse Menu` : ``}
      </CollapseButton>
    </SidebarContainer>
  );
};

const StyledSubmenu = styled(Menu.SubMenu)``;

const SubmenuItem = styled(Menu.Item)`
  ${({ collapsed, theme }) => `
    ${collapsed && `width: 200px;`}
    background: ${theme.title === 'light' ? '#fff' : '#404040'};
  `};
`;

const SubmenuItemLink = styled(Link)`
  ${({ collapsed }) => collapsed && `margin-left: 70px`};
`;

const SubmenuHeaderLink = styled(Link)`
  color: ${({ primaryColor }) => primaryColor};
`;

const ProjectTitle = styled.h3`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${({ theme }) => theme.color};
`;

const HeaderIcon = styled(Icon)`
  font-size: 18px;
  ${({ collapsed }) =>
    !collapsed &&
    `
    margin-right: 10px;
  `};
`;

const SidebarHeader = styled(Flex)`
  ${({ collapsed, theme }) => `
    height: 55px;
    z-index: 2;
    box-shadow: ${theme.shadow};
    background: ${theme.background};
    color: ${theme.color};
    ${!collapsed ? `padding: 0 15px;` : ''}
  `};
`;

const CollapseButton = styled(Button)`
  ${media.tablet`display: none;`}
  ${({ primaryColor }) => `
    height: 49px;
    border-radius: 0;
    box-shadow: none;
    border-top: 1px solid #bfbfbf;
    &:hover {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:active {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:focus {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
    &:visited {
      border-color: ${primaryColor};
      color: ${primaryColor};
    }
  `};
`;

const StyledMenu = styled(Menu)`
  ${({ primary, appTheme }) => `
    .ant-menu-item:hover, .ant-menu-item > a:hover, .ant-menu-item-selected, .ant-menu-item-selected > a {
      color: ${primary};
    }
    .ant-menu-dark .ant-menu-item-selected {
      background-color: ${appTheme.background} !important;
    }
    .ant-menu-item:after {
      border-right: 3px solid ${primary} !important;
    }
    ${media.desktop`
      .ant-menu-item {
        font-size: 18px;
        height: 52px;
        line-height: 52px;
      }
    `} 
    .ant-menu-submenu-selected.ant-menu-submenu-title {
      border-right: 3px solid ${primary} !important;
    }
  `};
`;

const SidebarContainer = styled(Flex)`
  width: ${({ collapsed }) => (collapsed ? '64px' : '256px')};
  overflow: hidden;
  z-index: 20;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
`;

export default withRouter(SideMenu);
