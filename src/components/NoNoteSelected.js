import React from 'react'

import classes from './NoNoteSelected.module.css'
import Icon from '../atoms/Icon'

function NoNoteSelected () {
  return (
    <div className={classes.container}>
      <Icon className="fas fa-file" />
      <p>
        Select a note to view
      </p>
    </div>
  )
}

export default NoNoteSelected
