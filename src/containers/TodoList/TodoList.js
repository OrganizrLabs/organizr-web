// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { Spin } from 'antd';
import TodoList from 'components/TodoList';
import { type Todo } from 'types/Todo';
import spinnerWhileLoading from 'hocs/spinnerWhileLoading';

type Props = {
  todos: {
    [string]: Todo
  },
  auth: Object,
  firebase: Object,
  className?: string
};

/** 
 * Container component for <TodoList /> which connects to firebase 
 * and handles all the update logic
 */
const TodoListContainer = spinnerWhileLoading(
  ({ todos }) => !isLoaded(todos)
)(({ firebase, todos, auth, className, ...otherProps }: Props) => {
  // Delete a todo item
  const deleteTodo = id => {
    firebase.remove(`todos/${auth.uid}/${id}`);
  };
  // Set whether or not a todo has been completed
  const setCompleted = (id: string, value: boolean) => {
    firebase.set(`todos/${auth.uid}/${id}/completed`, value);
  };
  return todos[auth.uid]
    ? <TodoList
        todos={todos[auth.uid]}
        setCompleted={setCompleted}
        deleteTodo={deleteTodo}
        className={className}
        {...otherProps}
      />
    : <div>No todos</div>;
});

// Map the firebase todos to our components props
const mapStateToProps = ({ firebase: { auth, data } }) => ({
  todos: data.todos,
  auth
});

export default compose(firebaseConnect(['todos']), connect(mapStateToProps))(
  TodoListContainer
);
