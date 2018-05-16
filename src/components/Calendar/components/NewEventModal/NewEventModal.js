// @flow
import * as React from 'react';
import { compose } from 'redux';
import { DatePicker, TimePicker } from 'antd';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withStateHandlers } from 'recompose';
import { Flex } from 'reflexbox';
import styled, { css } from 'styled-components';
import Modal, { ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import Input from 'components/Input';
import Button from 'components/Button';
import Labelled from 'components/Labelled';
import moment from 'moment';

window.moment = moment;

type Props = {
  onClose: Function,
  event: Object,
  title: string,
  isOpen: boolean,
  auth: Object,
  firebase: Object,
  startDate: string,
  startTime: string,
  endDate: string,
  endTime: string,
  setStartDate: string => void,
  setStartTime: string => void,
  setEndDate: string => void,
  setEndTime: string => void,
  setTitle: string => void,
  description: string,
  setDescription: string => void
};

const NewEventModal = ({
  title,
  setTitle,
  description,
  setDescription,
  startDate,
  startTime,
  endDate,
  endTime,
  setStartDate,
  setStartTime,
  setEndDate,
  setEndTime,
  onClose,
  firebase,
  auth,
  isOpen,
  event
}: Props) => {
  console.log(startTime, endTime);
  const eventStartDate = moment(event.start._date);
  const eventEndDate = moment(event.end._date);
  const resetFieldsAndClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };
  const addEvent = () => {
    // Add the event
    if (startDate !== '' && endDate !== null) {
      firebase.push(`/events/${auth.uid}`, {
        title,
        description,
        start: moment(`${startDate} ${startTime}`).format(),
        end: moment(`${endDate} ${endTime}`).format()
      });
      resetFieldsAndClose();
    } else {
      console.log('Error adding event');
    }
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
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
            <StyledDatePicker
              size="large"
              defaultValue={eventStartDate}
              onChange={setStartDate}
            />
            <StyledTimePicker
              size="large"
              use12Hours
              format="h:mm a"
              defaultValue={eventStartDate}
              onChange={setStartTime}
            />
          </Flex>
        </LabelledSection>
        <LabelledSection label="End Date">
          <Flex>
            <StyledDatePicker
              size="large"
              defaultValue={eventEndDate}
              onChange={setEndDate}
            />
            <StyledTimePicker
              size="large"
              format="HH:MM"
              defaultValue={eventEndDate}
              onChange={setEndTime}
            />
          </Flex>
        </LabelledSection>
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={resetFieldsAndClose}>Cancel</CancelButton>
        <Button primary onClick={addEvent}>
          Add Event
        </Button>
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

const mapStateToProps = ({ firebase: { auth } }) => ({ auth });

export default compose(
  firebaseConnect(['events']),
  connect(mapStateToProps),
  withStateHandlers(
    ({ event }) => ({
      title: '',
      description: '',
      startDate: moment(event.start._date).format('YYYY-MM-DD'),
      startTime: moment(event.start._date).format('HH:MM'),
      endDate: moment(event.end._date).format('YYYY-MM-DD'),
      endTime: moment(event.end._date).format('HH:MM')
    }),
    {
      setTitle: () => title => ({ title }),
      setDescription: () => description => ({ description }),
      setStartDate: () => (_, startDate) => ({ startDate }),
      setStartTime: () => (_, startTime) => ({ startTime }),
      setEndDate: () => (_, endDate) => ({ endDate }),
      setEndTime: () => (_, endTime) => ({ endTime })
    }
  )
)(NewEventModal);
