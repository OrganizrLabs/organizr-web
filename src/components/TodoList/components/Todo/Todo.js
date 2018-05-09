import * as React from 'react';
import { Checkbox } from 'antd';
import { type Todo as TodoType } from 'types/Todo';
import { Flex } from 'reflexbox';

type Props = {
  /** The todo data, like text, completed, etc */
  todo: TodoType,
  /** The unique id of the todo item */
  id: string,
  /** 
   * Function to toggle the completed todo, with the index of the 
   * todo passed in as a parameter
   */
  setCompleted: (string, boolean) => void
};

const Todo = ({ todo: { text, completed }, id, setCompleted }: Props) => {
  const handleCheckboxChange = (e: Event) => {
    setCompleted(id, e.target.checked);
  };
  return (
    <Flex>
      <Checkbox onChange={handleCheckboxChange} checked={completed} />
      {text}
    </Flex>
  );
};

export default Todo;
