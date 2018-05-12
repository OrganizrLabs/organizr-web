// @flow
import * as React from 'react';
import styled from 'styled-components';
import { DatePicker, TimePicker } from 'antd';
import { connect } from 'react-redux';
import { withState } from 'recompose';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import Button from 'components/Button';
import Input from 'components/Input';
import spinnerWhileLoading from 'hocs/spinnerWhileLoading';
import { type Reminder as ReminderType } from 'types/Reminder';

type Props = {
  reminders: {
    [string]: {
      [string]: ReminderType
    }
  }
};

const enhance = compose(
  spinnerWhileLoading(({ reminders }) => !isLoaded(reminders)),
  withState('reminderText', 'setReminderText', '')
);

const ReminderContent = enhance(
  ({ reminders, reminderText, setReminderText, firebase }) => {
    const onDateSelect = (date, dateString) => {
      console.log(date, dateString);
    };
    const onTimeSelect = (time, timeString) => {
      console.log(time, timeString);
    };
    return (
      <Flex column align="center">
        <Flex>
          <ReminderInput
            placeholder="New Reminder..."
            value={reminderText}
            onChange={setReminderText}
          />
          {/* <DatePicker size="large" onChange={onDateSelect} />
        <TimePicker
          size="large"
          use12Hours
          format="h:mm a"
          onChange={onTimeSelect}
        /> */}
          <Button>Add Reminder</Button>
        </Flex>
        {isEmpty(reminders) ? <div>No Reminders</div> : <div>reminders</div>}
      </Flex>
    );
  }
);

const Reminders = (props: Props) => {
  return (
    <PaddedLayout>
      <ReminderContent {...props} />
    </PaddedLayout>
  );
};

const ReminderInput = styled(Input)`
  margin-right: 8px; 
  width: 350px;
`;

const PaddedLayout = styled(Layout)`
  padding: 80px 20px 20px 20px;
`;

const mapStateToProps = ({ firebase: { auth, data } }) => ({
  reminders: data.reminders,
  auth
});

export default compose(
  firebaseConnect(['reminders']),
  connect(mapStateToProps)
)(Reminders);
