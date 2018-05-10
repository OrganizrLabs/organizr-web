import * as React from 'react';
import { Checkbox } from 'antd';
import styled from 'styled-components';
import { type Todo as TodoType } from 'types/Todo';
import { Flex } from 'reflexbox';
import Button from 'components/Button';

type Props = {
  /** The todo data, like text, completed, etc */
  todo: TodoType,
  /** The unique id of the todo item */
  id: string,
  /** Remove the todo */
  onDelete: void => void,
  /** 
   * Function to toggle the completed todo, with the index of the 
   * todo passed in as a parameter
   */
  setCompleted: (string, boolean) => void,
  className: string
};

const Todo = ({
  todo: { text, completed },
  id,
  className,
  onDelete,
  setCompleted
}: Props) => {
  const handleCheckboxChange = (e: Event) => {
    setCompleted(id, e.target.checked);
  };
  return (
    <TodoContainer className={className} justify="space-between" align="center">
      <Flex className="todo-info" align="center">
        <Checkbox onChange={handleCheckboxChange} checked={completed} />
        <TodoText>
          {text}
        </TodoText>
      </Flex>
      <Flex className="todo-buttons">
        <Button icon="delete" onClick={onDelete} />
      </Flex>
    </TodoContainer>
  );
};

const TodoContainer = styled(Flex)`
  padding: 15px;
  background: #fff;
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

const TodoText = styled.span`font-size: 14px;`;

export default Todo;
