import React from 'react'
import clsx from 'clsx'

import List from '../atoms/List'
import Icon from '../atoms/Icon'
import NoteListItem from './NoteListItem'
import classes from './Notes.module.css'

function Notes ({
  notes,
  decryptedContents,
  selectedNoteId,
  onSelectNote,
  editing
}) {
  function renderListItem (note) {
    function handleClick () {
      onSelectNote(note.id)
    }

    return (
      <NoteListItem
        key={note.id}
        title={note.title}
        selected={note.id === selectedNoteId}
        disabled={editing}
        encrypted={!(note.id in decryptedContents)}
        onClick={handleClick}
      />
    )
  }

  return (
    <List className={clsx(classes.notes, { [ classes.disabled ]: editing })}>
      {Object.values(notes).map(renderListItem)}
    </List>
  )
}

export default Notes
