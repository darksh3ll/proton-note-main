import React from 'react'

import classes from './NoteLayout.module.css'

function NoteLayout ({ title, content, controls }) {
  return (
    <div className={classes.container}>
      <h2 className={classes.title}>
        {title}        
      </h2>

      <div className={classes.content}>
        {content}
      </div>

      <div className={classes.controls}>
        {controls}
      </div>
    </div>
  )
}

export default NoteLayout
