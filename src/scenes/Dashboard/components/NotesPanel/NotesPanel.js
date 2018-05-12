// @flow
import * as React from 'react';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withState } from 'recompose';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import DashboardPanel from '../DashboardPanel';
import { type Note as NoteType } from 'types/Note';
import spinnerWhileLoading from 'hocs/spinnerWhileLoading';
import Button from 'components/Button';
import Note from 'components/Note';

type Props = {
  notes: {
    [string]: {
      [string]: NoteType
    }
  },
  auth: Object,
  className: string,
  activeIndex: number,
  setActiveIndex: number => void
};

const enhanceSlider = compose(
  spinnerWhileLoading(({ notes, auth }) => !isLoaded(notes) || !isLoaded(auth)),
  withState('activeIndex', 'setActiveIndex', 0)
);

const NoteSlider = enhanceSlider(
  ({ activeIndex, setActiveIndex, notes, auth }: Props) => {
    // We choose the first Note and then display it
    const userNotes = notes[auth.uid];
    const noteIds = Object.keys(userNotes);
    if (!userNotes) return <div>No Notes</div>;
    const goLeft = () => {
      if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    };
    const goRight = () => {
      if (activeIndex < noteIds.length - 1) setActiveIndex(activeIndex + 1);
    };
    const activeId = noteIds.sort(
      (a, b) => userNotes[a].lastEdited - userNotes[b].lastEdited
    )[activeIndex];
    console.log('ID', userNotes[activeId]);
    return (
      <Flex auto justify="center" align="center">
        <Button icon="left" onClick={goLeft} />
        <StyledNote fluid simple note={userNotes[activeId]} />
        <Button icon="right" onClick={goRight} />
      </Flex>
    );
  }
);

const NotesPanel = ({ className, ...otherProps }: Props) => {
  return (
    <StyledDashboardPanel title="Notes" className={className}>
      <NoteSlider {...otherProps} />
    </StyledDashboardPanel>
  );
};

const StyledNote = styled(Note)`
  flex: 1 1 auto;
  margin: 0 5px;
`;

const StyledDashboardPanel = styled(DashboardPanel)`
  .dashboardpanel-content {
    justify-content: center;
    align-items: center;
  }
`;

const mapStateToProps = ({ firebase: { auth, data } }) => ({
  notes: data.notes,
  auth
});

export default compose(firebaseConnect(['notes']), connect(mapStateToProps))(
  NotesPanel
);
