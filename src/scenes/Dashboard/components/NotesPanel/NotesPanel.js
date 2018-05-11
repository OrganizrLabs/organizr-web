// @flow
import * as React from 'react';
import DashboardPanel from '../DashboardPanel';

type Props = {
  className: string
};

const NotesPanel = ({ className }: Props) => {
  return (
    <DashboardPanel title="Notes" className={className}>
      testing
    </DashboardPanel>
  );
};

export default NotesPanel;
