// @flow
import * as React from 'react';
import { compose } from 'redux';
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { Icon, Spin } from 'antd';
import { connect } from 'react-redux';
import { withStateHandlers } from 'recompose';
import styled from 'styled-components';
import { Flex } from 'reflexbox';
import Layout from 'components/Layout';
import Note from 'components/Note';
import { type Note as NoteType } from 'types/Note';

type Props = {
  notes: {
    [string]: NoteType
  },
  auth: Object,
  firebase: Object,
  editing: boolean,
  setEditing: boolean => void
};

const Notes = ({ notes, firebase, auth, editing, setEditing }: Props) => {
  const toggleEditing = () => setEditing(!editing);
  const editNote = (id: string, note: NoteType) => {
    firebase.set(`notes/${auth.uid}/${id}`, note);
  };
  const createNote = (note: NoteType) => {
    firebase.push(`notes/${auth.uid}`, note);
    setEditing(false);
  };
  const hasNotes = Object.keys(notes).length > 0;
  if (!isLoaded(notes)) {
    return (
      <Layout>
        <Spin />
      </Layout>
    );
  }
  return (
    <PaddedLayout>
      <Flex wrap>
        {(hasNotes || editing) &&
          Object.keys(notes).map(noteId => {
            const handleDelete = () =>
              firebase.remove(`notes/${auth.uid}/${noteId}`);
            return (
              <StyledNote
                key={noteId}
                id={noteId}
                onDelete={handleDelete}
                onSave={editNote}
                note={notes[noteId]}
              />
            );
          })}
        {editing &&
          <StyledNote
            forceEditing
            onSave={createNote}
            note={{
              title: 'Test Note',
              text: 'This is some example text',
              lastEdited: new Date().getTime()
            }}
          />}
        {!editing &&
          <AddNote
            auto
            column
            justify="center"
            align="center"
            onClick={toggleEditing}
          >
            <PlusIcon type="plus" />
            Add a new Note
          </AddNote>}
      </Flex>
    </PaddedLayout>
  );
};

const PaddedLayout = styled(Layout)`
  padding: 20px;
`;

const PlusIcon = styled(Icon)`
  font-size: 30px;
  color: #000;
`;

const AddNote = styled(Flex)`
  width: 200px;
  max-width: 250px;
  min-height: 200px;
  color: #000;
  border-radius: 3px;
  border: 1px dashed #000;
  cursor: pointer;
  margin: 10px;
`;

const StyledNote = styled(Note)`
  margin: 10px;
`;

const mapStateToProps = ({ firebase: { data, auth } }) => ({
  notes: data.notes ? data.notes[auth.uid] : {},
  auth
});

export default compose(
  withStateHandlers(
    { editing: false },
    {
      setEditing: () => editing => ({ editing })
    }
  ),
  firebaseConnect(['notes']),
  connect(mapStateToProps)
)(Notes);
