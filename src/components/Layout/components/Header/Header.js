// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { type RouterHistory } from 'react-router-dom';
import { Menu, Button, Icon, Input } from 'semantic-ui-react';
import UiStore from 'stores/UiStore';
import styled from 'styled-components';

type Props = {
  history: RouterHistory,
  ui: UiStore,
};

@observer
class Header extends React.Component<Props> {
  handleMenuClick = () => {
    const { ui } = this.props;
    if (ui.sidebarOpen) {
      ui.closeSidebar();
    } else {
      ui.openSidebar();
    }
  };

  render() {
    const { history } = this.props;
    const goToDashboard = () => history.push('/dashboard');
    return (
      <ApplicationMenu color="teal" inverted>
        <MenuButton color="teal" icon onClick={this.handleMenuClick}>
          <Icon name="bars" />
        </MenuButton>
        <Menu.Item
          name="Dashboard"
          active={false}
          content="Dashboard"
          onClick={goToDashboard}
        />

        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </ApplicationMenu>
    );
  }
}

const MenuButton = styled(Button)`
  border-radius: 0 !important;  
`;

const ApplicationMenu = styled(Menu)`
  border-radius: 0 !important;  
`;

export { Header };
export default inject('ui')(withRouter(Header));
