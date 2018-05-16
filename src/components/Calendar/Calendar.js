// @flow
import * as React from 'react';
import { compose } from 'redux';
import { defaultProps, withState } from 'recompose';
import { Select } from 'antd';
import TuiCalendar from 'tui-calendar';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import NewEventModal from './components/NewEventModal';
import Button from 'components/Button';

const Option = Select.Option;

type Props = {
  /** Unique id for the calendar instance */
  id: string,
  /** Height of the container div */
  height?: string,
  /** Tui Calendar options object */
  options?: Object,
  /** Array of event objects to be passed into the calendar */
  events: Array<Object>,
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
    const { id, options, events } = this.props;
    this.calendar = new TuiCalendar(`#${id}`, {
      defaultView: 'month',
      month: {
        visibleWeeksCount: 4
      },
      ...options
    });
    this.calendar.createSchedules(events);
    this.createCalendarListeners();
  }

  createCalendarListeners = () => {
    const { setNewEventModalVisible, setEvent } = this.props;
    // Before a schedule is created
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
      // when a schedule is clicked
      // this.calendar.on('clickSchedule', function(event) {
      //   var schedule = event.schedule;
      //   console.log(event);
      // });
    });
  };

  renderCalendarTools = () => {
    const handleViewChange = view => {
      this.calendar.changeView(view, true);
    };
    const next = () => this.calendar.next();
    const prev = () => this.calendar.prev();
    const today = () => this.calendar.today();
    return (
      <CalendarTools auto align="center">
        <ViewSelect
          size="large"
          defaultValue="month"
          style={{ width: 120 }}
          onChange={handleViewChange}
        >
          <Option value="day">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
        </ViewSelect>
        <TodayButton onClick={today}>Today</TodayButton>
        <RoundButton icon="left" onClick={prev} />
        <RoundButton icon="right" onClick={next} />
      </CalendarTools>
    );
  };

  render() {
    const {
      id,
      height,
      event,
      newEventModalVisible,
      setNewEventModalVisible
    } = this.props;
    const closeNewEventModal = () => {
      setNewEventModalVisible(false);
    };
    return (
      <CalendarContainer column height={height}>
        {event &&
          <NewEventModal
            isOpen={newEventModalVisible}
            onClose={closeNewEventModal}
            event={event}
          />}
        {this.renderCalendarTools()}
        <CalendarMount id={id} />
      </CalendarContainer>
    );
  }
}

const TodayButton = styled(Button)`
  margin: 0 3px;
`;

const RoundButton = styled(Button)`
  width: 39px;
  border-radius: 50%;
  margin: 0 3px;
`;

const ViewSelect = styled(Select)`
  margin-right: 3px;
`;

const CalendarTools = styled(Flex)`
  min-height: 60px;
`;

const CalendarContainer = styled(Flex)`
  width: 100%;
  height: ${({ height }) => height};
`;

const CalendarMount = styled.div`
  width: 100%;
  height: calc(100% - 60px);
`;

export default compose(
  withState('event', 'setEvent', null),
  withState('newEventModalVisible', 'setNewEventModalVisible', false)
)(Calendar);
