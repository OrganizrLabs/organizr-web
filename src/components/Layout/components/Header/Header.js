// @flow
import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import { title } from 'constants/app';
import logo from 'assets/logo.png';

type Props = {
  firebase: Object
};

const Header = ({ history, firebase }: Props) => {
  const logout = () => {
    console.log(firebase);
    firebase.logout();
  };
  // Define the user menu markup
  const userMenu = (
    <Menu>
      <Menu.Item key="0">
        <a href="http://www.alipay.com/">1st menu item</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href="http://www.taobao.com/">2nd menu item</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <span onClick={logout}>Logout</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderWrapper justify="space-between">
      <Flex align="center">
        <StyledLink to="/home">
          <MFSLogo src={logo} />
          <Title>
            {title}
          </Title>
        </StyledLink>
      </Flex>
      <Flex>
        <Divider />
        <Dropdown overlay={userMenu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            <UserIcon type="user" />
          </a>
        </Dropdown>
      </Flex>
    </HeaderWrapper>
  );
};

const UserIcon = styled(Icon)`
  font-size: 20px;
  line-height: 55px;
  vertical-align: middle;
  margin-left: 15px;
  cursor: pointer;
`;

const Divider = styled.span`
  display: flex;
  align-self: center;
  height: 2rem;
  width: 1px;
  opacity: 0.1;
  margin: 0px 0.25rem;
  background: linear-gradient(
    rgb(255, 255, 255) 0%,
    rgb(0, 0, 0) 50%,
    rgb(255, 255, 255) 100%
  );
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.h2``;

const HeaderWrapper = styled(Flex)`
  background: #fff;
  padding: 0 30px;
  height: 55px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

const MFSLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export default firebaseConnect()(Header);
