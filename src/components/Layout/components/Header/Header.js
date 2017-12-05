// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Link, type RouterHistory } from 'react-router-dom';
import { Menu, Button, Icon, Dropdown } from 'antd';
import { Flex } from 'reflexbox';
import UiStore from 'stores/UiStore';
import styled from 'styled-components';
import mfsIcon from 'assets/mfs_icon.png';

type Props = {
  history: RouterHistory,
  location: Object,
  subheader?: React.Node,
  ui: UiStore
};

@observer
class Header extends React.Component<Props> {
  getBasePath = () => {
    const pathname = this.props.location.pathname;
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

  render() {
    const { subheader, ui } = this.props;
    const menu = (
      <StyledMenu
        selectedKeys={[this.getBasePath()]}
        mode="horizontal"
        theme="dark"
      >
        <HeaderItem key="/" mobile={ui.isMobile}>
          <Icon type="home" />
          <Link to="/">Home</Link>
        </HeaderItem>
        <HeaderItem key="/timeline" mobile={ui.isMobile}>
          <Icon type="clock-circle-o" />
          <Link to="/timeline">Timeline</Link>
        </HeaderItem>
        <HeaderItem key="/media" mobile={ui.isMobile}>
          <Icon type="desktop" />
          <Link to="/media">Media</Link>
        </HeaderItem>
      </StyledMenu>
    );
    return (
      <HeaderWrapper justify="space-between">
        <Flex align="center">
          <StyledLink to="/">
            <MFSLogo src={mfsIcon} />
            <Title>
              {ui.isMobile ? 'MFS Dossier' : 'March For Science Dossier'}
            </Title>
          </StyledLink>
        </Flex>
        {ui.isMobile
          ? <Dropdown overlay={menu}>
              <DropdownButton icon="menu-fold" />
            </Dropdown>
          : menu}
        {subheader &&
          <SubHeader auto>
            {subheader}
          </SubHeader>}
      </HeaderWrapper>
    );
  }
}

const DropdownButton = styled(Button)`
  align-self: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledMenu = styled(Menu)`
  background: #333333 !important;
  .ant-menu-item {
    height: 100%;
  }
  .ant-menu-item.ant-menu-item-selected {
    background-color: inherit !important;
    border-bottom: 3px solid #108ee9 !important;
    color: #108ee9 !important;
  }
`;

const Title = styled.h2`color: #fff;`;

const HeaderWrapper = styled(Flex)`
  background: #333333;
  color: #fff;
  padding: 0 30px;
  height: 75px;
`;

const MFSLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const SubHeader = styled(Flex)`
  background: #404040;
  padding: 10px 50px;
  color: #fff;
`;

const HeaderItem = styled(Menu.Item)`
  display: flex;
  flex-direction: row;
  ${({ mobile }) =>
    mobile
      ? `
      justify-content: flex-start;
    `
      : `
    justify-content: center;
    align-items: center;
  `}

  i.anticon {
    padding-right: 10px;
  }
`;

export { Header };
export default inject('ui')(withRouter(Header));
