// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import Todo from './components/Todo';
import { type Todo as TodoType } from 'types/Todo';

type Props = {
  /**
   * A list of todos. Note that this is an object where the key is 
   * the id of the todo and the value is the todo object itself
   */
  todos: {
    [string]: TodoType
  },
  className: string,
  /** Function that deletes a specific todo by id */
  deleteTodo: string => void,
  /** 
   * Function to toggle the completed todo, with the index of the 
   * todo passed in as a parameter
   */
  setCompleted: (string, boolean) => void
};

const TodoList = ({ todos, className, deleteTodo, setCompleted }: Props) => {
  return (
    <TodoContainer column className={className}>
      {todos &&
        Object.keys(todos).map(todoId => {
          const deleteTodoItem = () => deleteTodo(todoId);
          return (
            <StyledTodo
              key={todoId}
              id={todoId}
              todo={todos[todoId]}
              setCompleted={setCompleted}
              onDelete={deleteTodoItem}
            />
          );
        })}
    </TodoContainer>
  );
};

const TodoContainer = styled(Flex)`
  width: 100%;
`;

const StyledTodo = styled(Todo)`
  margin: 5px;
`;

export default TodoList;
