// @flow
import React from 'react';
import { Table } from 'antd';
import { Flex, Box } from 'reflexbox';
import styled from 'styled-components';

type Props = {
  meet: Object
};

const columns = [
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team'
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region'
  },
  {
    title: 'Placement',
    dataIndex: 'placement',
    key: 'placement'
  }
];

const results = [
  {
    team: 'Syracuse',
    region: 'Northeast',
    placement: 1
  },
  {
    team: 'Iona',
    region: 'Northeast',
    placement: 2
  },
  {
    team: 'Cornell',
    region: 'Northeast',
    placement: 3
  },
  {
    team: 'Georgetown',
    region: 'MidAtlantic',
    placement: 4
  },
  {
    team: 'University of Pennsylvania',
    region: 'MidAtlantic',
    placement: 5
  }
];

class MeetDetail extends React.Component<Props> {
  render() {
    const { meet } = this.props;
    return (
      <Flex auto>
        <Box w={[1, 3 / 4, 3 / 4]}>
          <FlexTable
            bordered
            title={() => 'Results'}
            dataSource={results}
            columns={columns}
            pagination={{
              defaultPageSize: 5
            }}
          />
        </Box>
        <Box w={[1, 1 / 4, 1 / 4]}>
          <AddOrInfo auto align="center" justify="center">
            Ad or More Info
          </AddOrInfo>
        </Box>
      </Flex>
    );
  }
}

const AddOrInfo = styled(Flex)`
  margin: 30px 30px 30px 0;
  height: 85%;
  background: #fff;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 20px;
`;

const FlexTable = styled(Table)`
  margin: 30px;
  .ant-table {
    background: #fff;
  }
`;

export default MeetDetail;
