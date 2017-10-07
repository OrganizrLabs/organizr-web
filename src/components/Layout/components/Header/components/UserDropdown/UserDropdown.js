// @flow
import * as React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { inject, observer } from 'mobx-react';
import UserStore from 'stores/UserStore';
import styled from 'styled-components';

type Props = {
  className?: string,
  user: UserStore
};

@observer
class UserDropdown extends React.Component<Props> {
  logout = () => {
    console.log('Logging out');
    this.props.user.logout();
  };

  get menu() {
    return (
      <Menu>
        <Menu.Item key="0">
          <a onClick={this.logout}>Log Out</a>
        </Menu.Item>
      </Menu>
    );
  }

  render() {
    const { user, className } = this.props;
    return (
      <div className={className}>
        <Dropdown overlay={this.menu} className={className} trigger={['click']}>
          <a>
            <Icon type="user" style={{ fontSize: 20 }} />
            <Name>
              {user.name}
            </Name>
            <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    );
  }
}

const Name = styled.span`margin: 0 5px;`;

export default inject('user')(UserDropdown);
