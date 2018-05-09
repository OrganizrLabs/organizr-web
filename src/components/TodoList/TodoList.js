// @flow
import * as React from 'react';
import { Flex } from 'reflexbox';
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
  /** 
   * Function to toggle the completed todo, with the index of the 
   * todo passed in as a parameter
   */
  setCompleted: (string, boolean) => void
};

const TodoList = ({ todos, setCompleted }: Props) => {
  return (
    <Flex column>
      {todos &&
        Object.keys(todos).map(todoId =>
          <Todo
            key={todoId}
            id={todoId}
            todo={todos[todoId]}
            setCompleted={setCompleted}
          />
        )}
    </Flex>
  );
};

export default TodoList;
