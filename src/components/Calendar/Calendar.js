// @flow
import * as React from 'react';
import { defaultProps } from 'recompose';
import TuiCalendar from 'tui-calendar';
import styled from 'styled-components';

type Props = {
  /** Unique id for the calendar instance */
  id: string,
  /** Height of the container div in px */
  height?: number,
  /** Tui Calendar options object */
  options?: Object
};

/** A React wrapper for the tui.calendar component */
@defaultProps({ height: 650, options: {} })
class Calendar extends React.Component<Props> {
  calendar: ?Object;

  componentDidMount() {
    const { id, options } = this.props;
    this.calendar = new TuiCalendar(`#${id}`, {
      defaultView: 'month',
      taskView: true,
      month: {
        visibleWeeksCount: 4
      },
      ...options
    });
  }

  render() {
    const { id, height } = this.props;
    return <CalendarContainer id={id} height={height} />;
  }
}

const CalendarContainer = styled.div`
  display: block;
  width: 100%;
  height: ${({ height }) => height + 'px'};
`;

export default Calendar;
