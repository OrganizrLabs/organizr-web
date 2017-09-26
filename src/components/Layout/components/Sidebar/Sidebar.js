// @flow
import * as React from 'react';
import { Sidebar as UiSidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import UiStore from 'stores/UiStore';

type Props = {
  children: React.Node,
  ui: UiStore
};

@observer
class Sidebar extends React.Component<Props> {
  render() {
    const { children, ui } = this.props;
    return (
      <PushableContainer as={Segment}>
        <UiSidebar
          as={Menu}
          animation="uncover"
          width="thin"
          visible={ui.sidebarOpen}
          icon="labeled"
          vertical
          inverted
        >
          <Menu.Item name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
          <Menu.Item name="gamepad">
            <Icon name="gamepad" />
            Games
          </Menu.Item>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Channels
          </Menu.Item>
        </UiSidebar>
        <UiSidebar.Pusher>
          {children}
        </UiSidebar.Pusher>
      </PushableContainer>
    );
  }
}

const PushableContainer = styled(UiSidebar.Pushable)`
  height: 100vh;
  border-radius: 0 !important;
  border: none !important;
`;

export { Sidebar };
export default inject('ui')(Sidebar);
