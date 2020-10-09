import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid'

import AppHeader from './components/AppHeader'
import Notes from './components/Notes'
import NoNoteSelected from './components/NoNoteSelected'
import classes from './App.module.css'
import objectDelete from './utils/objectDelete'
import * as storage from './storage'
import * as encryption from './encryption'
import NoNotes from './components/NoNotes'
import NoteView from './components/NoteView'
import NoteEdit from './components/NoteEdit'
import arrayRemove from './utils/arrayRemove'

function createNewNote () {
  const id = uniqid()
 
  return {
    title: '',
    content: '',
    id
  }
}

const initialNotes = storage.getItem('notes') || {}

function App () {
  /*
   * { [ id: noteId ]: Note }
   *
   * encrypted notes
   */
  const [ notes, setNotes ] = useState(initialNotes)

  /* sync notes to storage on any change */
  useEffect(
    function () {
      storage.setItem('notes', notes)
    },
    [ notes ]
  )

  const [ selectedNoteId, setSelectedNoteId ] = useState(null)

  const [ editing, setEditing ] = useState(false)

  /*
   * { [ id: noteId ]: String }
   *
   * decrypted contents of notes, indexed by id
   *
   * avoids un-necessarily de-crypting during runtime
   * as well as on re-visits of the same note by memoizing
   * already de-crypted content
   */
  const [ decryptedContents, setDecryptedContents ] = useState({})

  /*
   * String []
   *
   * Array of noteIds, if a noteId is contained within this array it
   * means that this note has an decryption going on
   */
  const [ decryptionOngoing, setDecryptionOngoing ] = useState([])

  /*
   * String []
   *
   * Array of noteIds, if a noteId is contained within this array it
   * means that this note has an encryption going on
   */
  const [ encryptionOngoing, setEncryptionOngoing ] = useState([])

  function handleEdit () {
    setEditing(true)    
  }

  function handleCancel () {
    setEditing(false)
  }

  async function handleSave (unencryptedNote) {
    const { id, content } = unencryptedNote

    setDecryptedContents(
      currentDecryptedContents => ({
        ...currentDecryptedContents,
        [ id ]: content
      })
    )

    setEncryptionOngoing(
      currentIds => [ ...currentIds, id ]
    )

    const encryptedNoteContent = await encryption.encrypt(unencryptedNote.content)

    const encryptedNote = {
      ...unencryptedNote,
      content: encryptedNoteContent
    }

    const nextNotes = {
      ...notes,
      [ id ]: encryptedNote
    }

    setNotes(nextNotes)

    setEncryptionOngoing(
      currentIds => arrayRemove(currentIds, id)
    )

    setEditing(false)
  }

  function handleDelete (id) {
    setSelectedNoteId(null)

    setEditing(false)

    setNotes(
      currentNotes => objectDelete(currentNotes, id)
    )
  }

  function handleNewNote () {
    const newNote = createNewNote()

    setNotes(
      currentNotes => ({
        [ newNote.id ]: newNote,
        ...currentNotes
      })
    )

    setSelectedNoteId(newNote.id)

    setEditing(true)
  }

  async function handleSelectNote (id) {
    if (id === selectedNoteId) { return }

    if (editing) { setEditing(false) }

    setSelectedNoteId(id)

    if (!(id in decryptedContents) && !decryptionOngoing[id]) {
      setDecryptionOngoing(
        currentIds => [ ...currentIds, id ]
      )

      const decryptedContent = await encryption.decrypt(notes[id].content)

      setDecryptedContents(
        currentContents => ({
          ...currentContents,
          [ id ]: decryptedContent
        })
      )

      setDecryptionOngoing(
        currentIds => arrayRemove(currentIds, id)
      )
    }
  }

  return (
    <div className={classes.container}>
      <header className={classes.headerArea}>
        <AppHeader editing={editing} onNewNote={handleNewNote} />
      </header>
      
      <div className={classes.notesArea}>
        {
          Object.values(notes).length > 0
            ? (
              <Notes
                notes={notes}
                editing={editing}
                decryptedContents={decryptedContents}
                selectedNoteId={selectedNoteId}
                onSelectNote={handleSelectNote}
              />
            )
            : <NoNotes />
        }
      </div>

      <div className={classes.noteArea}>
        {
          selectedNoteId
            ? editing
              ? (
                <NoteEdit
                  key={selectedNoteId}
                  note={notes[selectedNoteId]}
                  decryptedContent={decryptedContents[selectedNoteId]}
                  encrypting={encryptionOngoing.includes(selectedNoteId)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onDelete={() => handleDelete(selectedNoteId)}
                />
              ) : (
                <NoteView
                  key={selectedNoteId}
                  note={notes[selectedNoteId]}
                  decryptedContent={decryptedContents[selectedNoteId]}
                  decrypting={decryptionOngoing.includes(selectedNoteId)}
                  onEdit={handleEdit}
                />
              )
            : <NoNoteSelected />
        }
      </div>
    </div>
  )
}

export default App
