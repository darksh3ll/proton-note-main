import React from 'react'
import ReactMarkdown from 'react-markdown'

import classes from './NoteView.module.css'
import Icon from '../atoms/Icon'
import LabelledIconButton from './LabelledIconButton'
import Spinner from '../atoms/Spinner'
import NoteLayout from './NoteLayout'

function NoteView (props) {
  const {
    note,
    decryptedContent,
    decrypting,
    onEdit
  } = props

  function handleEditClick () {
    onEdit(true)
  }

  /*
   * There's some concern about potential XSS vulnerabiliities
   * regarding the use of this 3rd party Markdown renderer 'react-markdown'.
   *
   * Since at the moment there isn't a way to load in any markdown content
   * which was not produced on the machine that's also rendering the
   * markdown, even if there was a way to execute an injected script through
   * this, a user could only attack himself not others and also not be
   * attacked by others.
   *
   * The react-markdown docs state that by default it does not make use of
   * dangerouslySetInnerHTML (https://github.com/rexxars/react-markdown#notes)
   * unless the software user specifically opts into this behaviour, so by default
   * HTML inlined in the markdown source doesn't have a way to end up in the
   * generated HTML output.
   *
   * Markdown has some vulnerabilities in itself since it supports loading
   * resources through hyperlinks (e.g. an image) and further audits would be
   * necessary to determine whether this library has dealth with this issue
   * sufficiently, however for now, as long as this Application remains a
   * purely offline one (no user generated data-traffic) this is not a problem
   * it is something that is to be kept in mind however, should requirements change.
   */
  const content = decrypting
    ? (
      <div className={classes.spinnerContainer}>
        <Spinner />
      </div>
    )
    : (
      <div className={classes.content}>
        <ReactMarkdown source={decryptedContent} />
      </div>
    )

  const controls = (
    <LabelledIconButton
      label="Edit"
      disabled={decrypting}
      className={classes.edit}
      onClick={handleEditClick}
      icon={<Icon size="small" className="fas fa-pen" />}
    />
  )

  return (
    <NoteLayout
      title={note.title}
      content={content}
      controls={controls}
    />
  )
}

export default NoteView
