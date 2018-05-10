// @flow
import * as React from 'react';
import styled from 'styled-components';
import { withStateHandlers } from 'recompose';
import { Flex } from 'reflexbox';
import { type Note as NoteType } from 'types/Note';
import Button from 'components/Button';
import Input from 'components/Input';
import TextArea from 'components/TextArea';

type Props = {
  /** The note object. Can be null if note is being created */
  note: NoteType,
  /** Whether or not to start the note as editing */
  forceEditing?: boolean,
  /** Whether or note the note is currently being edited */
  editing: boolean,
  /** Callback for when the note is saved */
  onSave?: Function,
  /** id of the note...if not defined then the note is new */
  id?: string,
  /** Local title (could differ if being edited) */
  title: string,
  /** Local text (could differ if being edited) */
  text: string,
  /** Set the local title */
  setTitle: string => void,
  /** Set the local text */
  setText: string => void,
  /** Set whether the note is currently being edited */
  setEditing: boolean => void,
  /** Function that is called when the note is being deleted */
  onDelete: void => void,
  className?: string
};

// $FlowIssue
const Note = ({
  id,
  note,
  title,
  setTitle,
  text,
  setText,
  editing,
  setEditing,
  forceEditing,
  onDelete,
  className,
  onSave
}: Props) => {
  const handleSave = () => {
    if (onSave) {
      const data = { title, text, lastEdited: new Date().getTime() };
      if (!forceEditing) {
        onSave(id, data);
      } else {
        onSave(data);
      }
    }
    if (!forceEditing) setEditing(false);
  };
  const editNote = () => setEditing(true);
  const cancelEdit = () => setEditing(false);
  return (
    <NoteContainer column className={className}>
      <Flex className="note-header__container" justify="space-between">
        <Flex column className="note-header__text">
          <NoteTitle className="note-header__title">
            {editing ? <Input value={title} onChange={setTitle} /> : title}
          </NoteTitle>
          {!editing &&
            <NoteTime>
              {new Date(note.lastEdited).toDateString()}
            </NoteTime>}
        </Flex>
        <Flex className="note-header__buttons">
          {editing && <Button onClick={handleSave} icon="save" />}
          {editing && <Button onClick={cancelEdit} icon="close" />}
          {!editing && <Button onClick={editNote} icon="edit" />}
          {!editing &&
            !forceEditing &&
            <Button onClick={onDelete} icon="delete" />}
        </Flex>
      </Flex>
      <NoteBody className="note-body" auto>
        {editing ? <StyledTextArea value={text} onChange={setText} /> : text}
      </NoteBody>
    </NoteContainer>
  );
};

const NoteTime = styled.span`color: gray;`;

const NoteTitle = styled.h3`
  // line-height: 38px;
  vertical-align: middle;
`;

const NoteBody = styled(Flex)`
  padding-top: 10px;
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  .textarea-instance {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
`;

const NoteContainer = styled(Flex)`
  padding: 10px;
  background: #fff;
  border-radius: 3px;
  min-width: 250px;
  min-height: 250px;
  max-width: 350px;
  max-height: 250px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
`;

export default withStateHandlers(
  ({ note, forceEditing }) => ({
    title: note && note.title ? note.title : '',
    text: note && note.text ? note.text : '',
    editing: forceEditing
  }),
  {
    setTitle: () => title => ({ title }),
    setText: () => text => ({ text }),
    setEditing: () => editing => ({ editing })
  }
)(Note);
