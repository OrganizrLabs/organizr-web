// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withState } from 'recompose';
import { Spin } from 'antd';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import Input from 'components/Input';
import Button from 'components/Button';
import styled from 'styled-components';
import TodoList from 'components/TodoList';
import { type Todo } from 'types/Todo';

type Props = {
  todos: {
    [string]: Todo
  },
  auth: Object,
  firebase: Object,
  todo: string,
  setTodo: string => void
};

const Todos = ({ todos, firebase, auth, todo, setTodo }: Props) => {
  // Add a todo by pushing it to firebase
  const addTodo = () => {
    firebase.push(`todos/${auth.uid}`, {
      text: todo,
      completed: false,
      timestamp: new Date().getTime()
    });
    setTodo('');
  };
  // Delete a todo item
  const deleteTodo = id => {
    firebase.remove(`todos/${auth.uid}/${id}`);
  };
  // Set whether or not a todo has been completed
  const setCompleted = (id: string, value: boolean) => {
    firebase.set(`todos/${auth.uid}/${id}/completed`, value);
  };
  return (
    <PaddedLayout column>
      <NewTodoContainer justify="center">
        <TodoInput
          placeholder="New Todo..."
          value={todo}
          onChange={setTodo}
          onEnter={addTodo}
        />
        <Button onClick={addTodo}>Add todo</Button>
      </NewTodoContainer>
      {isLoaded(todos)
        ? <StyledTodoList
            todos={todos}
            setCompleted={setCompleted}
            deleteTodo={deleteTodo}
          />
        : <Spin />}
    </PaddedLayout>
  );
};

const StyledTodoList = styled(TodoList)`
  max-width: 600px;
`;

const TodoInput = styled(Input)`
  margin-right: 8px; 
  width: 350px;
`;

const NewTodoContainer = styled(Flex)`
  width: 100%;
  margin-bottom: 20px;
`;

const PaddedLayout = styled(Layout)`
  padding: 20px;
`;

// Map the firebase todos to our components props
const mapStateToProps = ({ firebase: { data, auth } }) => ({
  todos: !data.todos ? [] : data.todos[auth.uid],
  auth
});

export default compose(
  withState('todo', 'setTodo', ''),
  firebaseConnect(['todos']),
  connect(mapStateToProps)
)(Todos);
