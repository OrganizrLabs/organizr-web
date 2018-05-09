import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withState } from 'recompose';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import Input from 'components/Input';
import Button from 'components/Button';
import styled from 'styled-components';
import TodoList from 'components/TodoList';
import { type Todo } from 'types/Todo';

type Props = {
  todos: Array<Todo>,
  firebase: Object,
  todo: string,
  setTodo: string => void
};

const Home = ({ todos, firebase, auth, todo, setTodo }: Props) => {
  // Add a todo by pushing it to firebase
  const addTodo = () =>
    firebase.push(`todos/${auth.uid}`, {
      text: todo,
      completed: false,
      timestamp: new Date().getTime()
    });
  // Set whether or not a todo has been completed
  const setCompleted = (id: string, value: boolean) => {
    firebase.set(`todos/${auth.uid}/${id}/completed`, value);
  };
  return (
    <PaddedLayout column>
      {isLoaded(todos)
        ? <TodoList todos={todos} setCompleted={setCompleted} />
        : <div>Loading...</div>}
      <Flex>
        <Input value={todo} onChange={setTodo} />
        <Button onClick={addTodo}>Add todo</Button>
      </Flex>
    </PaddedLayout>
  );
};

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
)(Home);
