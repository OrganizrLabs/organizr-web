// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import { observer } from 'mobx-react';
import DashboardStore from './DashboardStore';

type Props = {};

@observer
class Dashboard extends React.Component<Props> {
  store: DashboardStore;

  constructor(props: Props) {
    super(props);
    this.store = new DashboardStore();
  }

  render() {
    return (
      <Flex auto justify="center" column>
        Hello world
      </Flex>
    );
  }
}

export { Dashboard };
export default Dashboard;
