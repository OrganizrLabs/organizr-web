import * as React from 'react';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import DashboardPanel from './components/DashboardPanel';

type Props = {};

const Dashboard = () => {
  return (
    <Layout column>
      <PanelRow>
        <StyledDashboardPanel rightPadded>testing</StyledDashboardPanel>
        <StyledDashboardPanel leftPadded>testing</StyledDashboardPanel>
      </PanelRow>
      <StyledDashboardPanel fullWidth>testing</StyledDashboardPanel>
    </Layout>
  );
};

const PanelRow = styled(Flex)`
  width: 100%;
`;

const StyledDashboardPanel = styled(DashboardPanel)`
  width: 100%;
  height: ${({ height }) => (height ? height + 'px' : '250px')};
  margin-top: ${({ fullWidth }) => (fullWidth ? '20px' : '0')};
  margin-left: ${({ leftPadded }) => (leftPadded ? '10px' : '0')};
  margin-right: ${({ rightPadded }) => (rightPadded ? '10px' : '0')};
`;

export default Dashboard;
