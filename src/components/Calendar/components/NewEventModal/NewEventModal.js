// @flow
import * as React from 'react';
import { compose } from 'redux';
import { withState } from 'recompose';
import styled from 'styled-components';
import Modal, { ModalHeader, ModalBody } from 'components/Modal';
import Input from 'components/Input';

type Props = {
  onClose: Function,
  event: Object,
  title: string,
  setTitle: string => void,
  description: string,
  setDescription: string => void
};

const NewEventModal = ({
  title,
  setTitle,
  description,
  setDescription,
  onClose,
  event
}: Props) => {
  return (
    <Modal onClose={onClose}>
      <ModalHeader title="Add Event" />
      <ModalBody>
        <StyledInput
          first
          label="Event title"
          placeholder="Enter a title..."
          value={title}
          onChange={setTitle}
        />
        <StyledInput
          label="Event description"
          placeholder="Enter a description..."
          value={description}
          onChange={setDescription}
        />
      </ModalBody>
    </Modal>
  );
};

const StyledInput = styled(Input)`
  margin-top: ${({ first }) => (!first ? '10px' : '0')};
`;

export default compose(
  withState('title', 'setTitle', ''),
  withState('description', 'setDescription', '')
)(NewEventModal);
