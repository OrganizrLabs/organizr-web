// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import DashboardStore from './DashboardStore';
import { Flex } from 'reflexbox';
import { Table } from 'antd';
import Layout from 'components/Layout';
import styled from 'styled-components';

type Props = {};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region'
  }
];

@observer
class Dashboard extends React.Component<Props> {
  store: DashboardStore;

  constructor(props: Props) {
    super(props);
    this.store = new DashboardStore();
  }

  componentDidMount() {
    this.store.getTeams();
  }

  render() {
    return (
      <Layout>
        <Flex column auto>
          <FlexTable
            bordered
            title={() => 'Teams'}
            dataSource={toJS(this.store.teams)}
            columns={columns}
            pagination={{
              defaultPageSize: 5
            }}
          />
        </Flex>
      </Layout>
    );
  }
}

const FlexTable = styled(Table)`
  margin: 30px;
  .ant-table {
    background: #fff;
  }
`;

export { Dashboard };
export default Dashboard;
