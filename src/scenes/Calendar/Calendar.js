// @flow
import * as React from 'react';
import Layout from 'components/Layout';
import Calendar from 'components/Calendar';
import styled from 'styled-components';

const CalendarScene = () => {
  return (
    <PaddedLayout>
      <Calendar id="calendar" />
    </PaddedLayout>
  );
};

const PaddedLayout = styled(Layout)`
  padding: 20px;
`;

export default CalendarScene;
