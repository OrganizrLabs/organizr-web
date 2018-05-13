// @flow
import * as React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { defaultProps, withState } from 'recompose';
import TuiCalendar from 'tui-calendar';
import styled from 'styled-components';
import spinnerWhileLoading from 'hocs/spinnerWhileLoading';
import NewEventModal from './components/NewEventModal';

type Props = {
  /** Unique id for the calendar instance */
  id: string,
  /** Height of the container div */
  height?: string,
  /** Tui Calendar options object */
  options?: Object,
  firebase: Object,
  event: Object,
  setEvent: Object => void,
  newEventModalVisible: boolean,
  setNewEventModalVisible: boolean => void
};

/** A React wrapper for the tui.calendar component */
@defaultProps({ height: '650px', options: {} })
class Calendar extends React.Component<Props> {
  calendar: Object;

  componentDidMount() {
    const { id, options } = this.props;
    this.calendar = new TuiCalendar(`#${id}`, {
      defaultView: 'month',
      month: {
        visibleWeeksCount: 4
      },
      ...options
    });
    // create some sample events:
    this.calendar.createSchedules([
      {
        id: '1',
        calendarId: '1',
        title: 'my schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-05-12T22:30:00+09:00',
        end: '2018-05-13T02:30:00+09:00'
      },
      {
        id: '2',
        calendarId: '1',
        title: 'second schedule',
        category: 'time',
        dueDateClass: '',
        start: '2018-05-11T17:30:00+09:00',
        end: '2018-05-11T17:31:00+09:00',
        isReadOnly: true // schedule is read-only
      }
    ]);
    this.createCalendarListeners();
  }

  createCalendarListeners = () => {
    const { setNewEventModalVisible, setEvent } = this.props;
    this.calendar.on('beforeCreateSchedule', function(event) {
      console.log(event);
      if (event.triggerEventName === 'mouseup') {
        // open writing simple schedule popup
        setEvent(event);
        setNewEventModalVisible(true);
      } else if (event.triggerEventName === 'dblclick') {
        // open writing detail schedule popup
        console.log('doubleclicked');
      }

      // calendar.createSchedules([schedule]);
    });
  };

  render() {
    const {
      id,
      height,
      event,
      newEventModalVisible,
      setNewEventModalVisible
    } = this.props;
    const closeNewEventModal = () => setNewEventModalVisible(false);
    return (
      <CalendarContainer height={height}>
        {event &&
          newEventModalVisible &&
          <NewEventModal onClose={closeNewEventModal} event={event} />}
        <CalendarMount id={id} />
      </CalendarContainer>
    );
  }
}

const CalendarContainer = styled.div`
  width: 100%;
  height: ${({ height }) => height};
`;

const CalendarMount = styled.div`
  width: 100%;
  height: 100%;
`;

const mapStateToProps = ({ firebase: { data, auth } }) => ({
  events: data.events,
  auth
});

export default compose(
  firebaseConnect(['events']),
  connect(mapStateToProps),
  spinnerWhileLoading(
    ({ events, auth }) => !isLoaded(events) || !isLoaded(auth)
  ),
  withState('event', 'setEvent', null),
  withState('newEventModalVisible', 'setNewEventModalVisible', false)
)(Calendar);
