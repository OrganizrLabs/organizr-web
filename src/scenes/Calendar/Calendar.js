// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import Layout from 'components/Layout';
import Calendar from 'components/Calendar';
import styled from 'styled-components';
import { type Event } from 'types/Event';
import spinnerWhileLoading from 'hocs/spinnerWhileLoading';

type Props = {
  events: Array<Event>,
  auth: Object
};

const CalendarContent = spinnerWhileLoading(
  ({ events, auth }) => !isLoaded(auth) || !isLoaded(events)
)(({ auth, events }: Props) => {
  const eventList =
    !isEmpty(events) && events[auth.uid]
      ? Object.keys(events[auth.uid]).map(eventId => ({
          id: eventId,
          calendarId: '1',
          category: 'time',
          dueDateClass: '',
          isReadOnly: true,
          ...events[auth.uid][eventId]
        }))
      : [];
  return <Calendar id="calendar" events={eventList} />;
});

const CalendarScene = (props: Props) => {
  return (
    <PaddedLayout>
      <CalendarContent {...props} />
    </PaddedLayout>
  );
};

const PaddedLayout = styled(Layout)`
  padding: 20px;
`;

const mapStateToProps = ({ firebase: { data, auth } }) => ({
  events: data.events,
  auth
});

export default compose(firebaseConnect(['events']), connect(mapStateToProps))(
  CalendarScene
);
