import React from 'react'

import Spinner from '../atoms/Spinner'
import Icon from '../atoms/Icon'
import NoteLayout from './NoteLayout'
import LabelledIconButton from './LabelledIconButton'
import useFieldValue from '../hooks/use-field-value'
import classes from './NoteEdit.module.css'

function NoteEdit ({
  note,
  decryptedContent,
  encrypting,
  onSave,
  onDelete,
  onCancel
}) {
  const [ title, handleTitleChange ] = useFieldValue(note.title)

  const [ content, handleContentChange ] = useFieldValue(decryptedContent)

  function handleSaveClick () {
    onSave({
      id: note.id,
      title,
      content
    })
  }

  function handleDeleteClick () {
    onDelete()
  }

  function handleCancelClick () {
    onCancel()
  }

  return (
    <NoteLayout
      title={
        <input
          autoFocus
          className={classes.titleInput}
          value={title}
          onChange={handleTitleChange}
        />
      }
      content={
        <textarea
          className={classes.contentTextarea}
          value={content}
          onChange={handleContentChange}
        />
      }
      controls={
        <>
          <LabelledIconButton
            label="Cancel"
            disabled={encrypting}
            className={classes.cancel}
            onClick={handleCancelClick}
            icon={<Icon size="small" className="fas fa-times" />}
          />

          <LabelledIconButton
            label="Save"
            disabled={encrypting}
            onClick={handleSaveClick}
            icon={
              encrypting
                ? <Spinner size="small" />
                : <Icon size="small" className="fas fa-save" />
            }
          />

          <LabelledIconButton
            label="Delete"
            disabled={encrypting}
            className={classes.delete}
            onClick={handleDeleteClick}
            icon={<Icon size="small" className="fas fa-trash" />}
          />
        </>
      }
    />
  )
}

export default NoteEdit
