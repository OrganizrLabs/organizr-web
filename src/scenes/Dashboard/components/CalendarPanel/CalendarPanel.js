// @flow
import * as React from 'react';
import DashboardPanel from '../DashboardPanel';
import Calendar from 'components/Calendar';

type Props = {
  className: string
};

const CalendarPanel = ({ className }: Props) => {
  return (
    <DashboardPanel title="Calendar" className={className}>
      <Calendar
        id="dashboard-calendar"
        hideControls
        options={{ defaultView: 'week' }}
        height="100%"
      />
    </DashboardPanel>
  );
};

export default CalendarPanel;
