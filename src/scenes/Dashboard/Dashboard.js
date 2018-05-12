import * as React from 'react';
import styled, { css } from 'styled-components';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';

// Local components
import TodoPanel from './components/TodoPanel';
import NotesPanel from './components/NotesPanel';
import CalendarPanel from './components/CalendarPanel';

type Props = {};

const Dashboard = () => {
  return (
    <PaddedLayout column>
      <PanelRow>
        <StyledTodoPanel />
        <StyledNotesPanel />
      </PanelRow>
      <StyledCalendarPanel fullWidth />
    </PaddedLayout>
  );
};

const PaddedLayout = styled(Layout)`
  padding: 20px;
`;

const PanelRow = styled(Flex)`
  width: 100%;
`;

const panelStyles = css`
  width: 100%;
  height: 280px;
  margin-top: ${({ fullWidth }) => (fullWidth ? '20px' : '0')};
`;

const StyledTodoPanel = styled(TodoPanel)`
  ${panelStyles}
  margin-right: 10px;
`;

const StyledNotesPanel = styled(NotesPanel)`
  ${panelStyles}
  margin-left: 10px;
`;

const StyledCalendarPanel = styled(CalendarPanel)`
  ${panelStyles}
  height: 350px;
`;

export default Dashboard;
