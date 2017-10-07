// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import DashboardStore from './DashboardStore';
import Layout from 'components/Layout';

type Props = {};

@observer
class Dashboard extends React.Component<Props> {
  store: DashboardStore;

  constructor(props: Props) {
    super(props);
    this.store = new DashboardStore();
  }

  render() {
    return <Layout>Hello world</Layout>;
  }
}

export { Dashboard };
export default Dashboard;
