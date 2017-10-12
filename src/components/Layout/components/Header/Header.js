// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { Link, type RouterHistory } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { Flex } from 'reflexbox';
import UiStore from 'stores/UiStore';
import styled from 'styled-components';
import UserDropdown from './components/UserDropdown';

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
    const { subheader } = this.props;
    return (
      <Flex column>
        <HeaderMenu selectedKeys={[this.getBasePath()]} mode="horizontal">
          <HeaderItem key="/kolas">
            <Icon type="appstore" />
            <Link to="/kolas">Kolas Calculator</Link>
          </HeaderItem>
          <HeaderItem key="/meets">
            <Icon type="schedule" />
            <Link to="/meets">Meets</Link>
          </HeaderItem>
          <HeaderItem key="/teams">
            <Icon type="team" />
            <Link to="/teams">Teams</Link>
          </HeaderItem>
          <HeaderItem key="/regions">
            <Icon type="flag" />
            <Link to="/regions">Regions</Link>
          </HeaderItem>
          <StyledUserDropdown />
        </HeaderMenu>
        {subheader &&
          <SubHeader auto>
            {subheader}
          </SubHeader>}
      </Flex>
    );
  }
}

const SubHeader = styled(Flex)`
  background: #404040;
  padding: 10px 50px;
  color: #fff;
`;

const HeaderItem = styled(Menu.Item)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledUserDropdown = styled(UserDropdown)`
  float: right;
`;

const HeaderMenu = styled(Menu)`
  padding: 0 30px;
`;

export { Header };
export default inject('ui')(withRouter(Header));
