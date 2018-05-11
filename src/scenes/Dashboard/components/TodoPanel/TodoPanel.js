// @flow
import * as React from 'react';
import DashboardPanel from '../DashboardPanel';
import TodoList from 'containers/TodoList';

type Props = {
  className: string
};

const TodoPanel = ({ className }: Props) => {
  return (
    <DashboardPanel title="Todos" className={className}>
      <TodoList limit={3} />
    </DashboardPanel>
  );
};

export default TodoPanel;
