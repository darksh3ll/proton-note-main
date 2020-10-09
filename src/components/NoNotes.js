import React from 'react'

import classes from './NoNotes.module.css'
import Icon from '../atoms/Icon'

function NoNotes () {
  return (
    <div className={classes.container}>
      <Icon className="fas fa-list" />
      <p>
        Add your first note by clicking on "New Note"
      </p>
    </div>
  )
}

export default NoNotes
