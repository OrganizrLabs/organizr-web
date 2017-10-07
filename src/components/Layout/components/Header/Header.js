// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { type RouterHistory } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import UiStore from 'stores/UiStore';

type Props = {
  history: RouterHistory,
  location: Object,
  ui: UiStore
};

@observer
class Header extends React.Component<Props> {
  handleClick = (e: Object) => {
    this.props.history.push(e.key);
  };

  render() {
    const { location } = this.props;
    console.log(location.pathname);
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[location.pathname]}
        mode="horizontal"
      >
        <Menu.Item key="/dashboard">
          <Icon type="appstore" />
          Dashboard
        </Menu.Item>
        <Menu.Item key="/settings">
          <Icon type="setting" />
          Settings
        </Menu.Item>
      </Menu>
    );
  }
}

export { Header };
export default inject('ui')(withRouter(Header));
