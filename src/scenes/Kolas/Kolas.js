// @flow
import * as React from 'react';
import { observer } from 'mobx-react';
import KolasStore from './KolasStore';
import { Flex } from 'reflexbox';
import { Table, Button, Input, Select } from 'antd';
import Layout from 'components/Layout';
import styled from 'styled-components';

const Option = Select.Option;

type Props = {};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region'
  },
  {
    title: 'Points',
    dataIndex: 'points',
    key: 'points'
  }
];

const data = [
  {
    name: 'Syracuse',
    region: 'Northeast',
    points: 14
  },
  {
    name: 'Villanova',
    region: 'Northeast',
    points: 12
  },
  {
    name: 'Louiville',
    region: 'Northeast',
    points: 9
  },
  {
    name: 'Georgetown',
    region: 'Midatlantic',
    points: 9
  },
  {
    name: 'University of Pennsylvania',
    region: 'Midatlantic',
    points: 8
  },
  {
    name: 'Florida State',
    region: 'South',
    points: 6
  }
];

@observer
class Kolas extends React.Component<Props> {
  store: KolasStore;

  constructor(props: Props) {
    super(props);
    this.store = new KolasStore();
  }

  componentDidMount() {
    this.store.getTeams();
  }

  handleGenderChange = () => {};

  render() {
    return (
      <Layout>
        <Flex column auto>
          <InputRow>
            <PaddedInput size="large" placeholder="filter teams" />
            <PaddedSelect
              defaultValue="all"
              size="large"
              stylelucy={{ width: 120 }}
              onChange={this.handleGenderChange}
            >
              <Option value="all">All Divisions</Option>
              <Option value="northeast">Northeast</Option>
              <Option value="midatlantic">Midatlantic</Option>
              <Option value="south">South</Option>
            </PaddedSelect>
            <PaddedSelect
              defaultValue="mens"
              size="large"
              style={{ width: 120 }}
              onChange={this.handleGenderChange}
            >
              <Option value="mens">Men's</Option>
              <Option value="lucy">Women's</Option>
            </PaddedSelect>
            <Button type="primary" size="large">
              Predict Bids
            </Button>
          </InputRow>
          <FlexTable
            bordered
            title={() => 'Predicted at Large Bids'}
            dataSource={data}
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

const PaddedSelect = styled(Select)`
  margin-right: 10px;
`;

const PaddedInput = styled(Input)`
  margin-right: 10px;
`;

const InputRow = styled(Flex)`
  margin: 30px;
  margin-bottom: 10px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  margin-top: 0px;
  .ant-table {
    background: #fff;
  }
`;

export { Kolas };
export default Kolas;
