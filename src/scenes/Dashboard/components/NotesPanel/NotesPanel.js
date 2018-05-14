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
import messageIfEmpty from 'hocs/messageIfEmpty';
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

type NoteSliderProps = Props & {
  activeId: number
};

const enhanceSlider = compose(
  spinnerWhileLoading(({ notes, auth }) => !isLoaded(notes) || !isLoaded(auth)),
  messageIfEmpty(
    ({ notes, auth }) => isLoaded(notes) && isLoaded(auth) && !notes[auth.uid],
    'No Notes'
  )
);

const NoteSlider = enhanceSlider(
  ({ activeId, notes, auth }: NoteSliderProps) => {
    return (
      <Flex auto justify="center" align="center">
        {Object.keys(notes[auth.uid]).map(id =>
          <StyledNote
            fluid
            simple
            note={notes[auth.uid][id]}
            visible={id === activeId}
          />
        )}
      </Flex>
    );
  }
);

const NotesPanel = (props: Props) => {
  const { className, activeIndex, setActiveIndex, notes, auth } = props;
  // We choose the first Note and then display it
  let userNotes,
    noteIds,
    activeId,
    goLeft,
    goRight,
    actions = null;
  // Need to wait until the data is loaded to do all of this
  if (isLoaded(auth) && isLoaded(notes)) {
    userNotes = notes[auth.uid];
    noteIds = Object.keys(userNotes);
    if (!userNotes) return <div>No Notes</div>;
    activeId = noteIds.sort(
      (a, b) => userNotes[a].lastEdited - userNotes[b].lastEdited
    )[activeIndex];
    // Button handlers
    goLeft = () => activeIndex > 0 && setActiveIndex(activeIndex - 1);
    goRight = () =>
      activeIndex < noteIds.length - 1 && setActiveIndex(activeIndex + 1);
    actions = [
      <RoundButton rightPadded icon="left" onClick={goLeft} />,
      <RoundButton icon="right" onClick={goRight} />
    ];
  }
  return (
    <StyledDashboardPanel title="Notes" className={className} actions={actions}>
      <NoteSlider activeId={activeId} {...props} />
    </StyledDashboardPanel>
  );
};

const RoundButton = styled(Button)`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: ${({ rightPadded }) => (rightPadded ? '3px' : '0')};
`;

const StyledNote = styled(Note)`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  flex: 1 1 auto;
  margin: 0 5px;
  height: 200px;
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

export default compose(
  firebaseConnect(['notes']),
  connect(mapStateToProps),
  withState('activeIndex', 'setActiveIndex', 0)
)(NotesPanel);
