// @flow
import * as React from 'react';
import { compose } from 'redux';
import { DatePicker, TimePicker } from 'antd';
import { withState } from 'recompose';
import { Flex } from 'reflexbox';
import styled, { css } from 'styled-components';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import Labelled from 'components/Labelled';

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
  const onDateSelect = (date, dateString) => {
    console.log(date, dateString);
  };
  const onTimeSelect = (time, timeString) => {
    console.log(time, timeString);
  };
  return (
    <Modal onClose={onClose}>
      <ModalHeader title="Add Event" />
      <ModalBody>
        <StyledInput
          first
          flat
          label="Event title"
          placeholder="Enter a title..."
          value={title}
          onChange={setTitle}
        />
        <StyledInput
          flat
          label="Event description"
          placeholder="Enter a description..."
          value={description}
          onChange={setDescription}
        />
        <LabelledSection label="Start Date">
          <Flex>
            <StyledDatePicker size="large" onChange={onDateSelect} />
            <StyledTimePicker
              size="large"
              use12Hours
              format="h:mm a"
              onChange={onTimeSelect}
            />
          </Flex>
        </LabelledSection>
        <LabelledSection label="End Date">
          <Flex>
            <StyledDatePicker size="large" onChange={onDateSelect} />
            <StyledTimePicker
              size="large"
              use12Hours
              format="h:mm a"
              onChange={onTimeSelect}
            />
          </Flex>
        </LabelledSection>
      </ModalBody>
      <ModalFooter>
        <CancelButton>Cancel</CancelButton>
        <Button primary>Add Event</Button>
      </ModalFooter>
    </Modal>
  );
};

const CancelButton = styled(Button)`
  margin-right: 6px;
`;

const LabelledSection = styled(Labelled)`
  margin-top: 10px;
`;

const inputStyles = css`
  height: 39px;
  font-size: 14px;
  border-radius: 3px;
`;

const StyledDatePicker = styled(DatePicker)`
  flex: 1 1 auto;
  margin-right: 5px;
  .ant-calendar-picker-input {
    ${inputStyles}
  }
`;

const StyledTimePicker = styled(TimePicker)`
  flex: 1 1 auto;
  margin-left: 5px;
  .ant-time-picker-input {
    ${inputStyles}
  }
`;

const StyledInput = styled(Input)`
  margin-top: ${({ first }) => (!first ? '10px' : '0')};
`;

export default compose(
  withState('title', 'setTitle', ''),
  withState('description', 'setDescription', '')
)(NewEventModal);
