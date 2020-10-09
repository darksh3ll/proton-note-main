import React from 'react'

import classes from './LabelledIconButton.module.css'
import Button from '../atoms/Button'
import clsx from 'clsx'

function LabelledIconButton ({ label, icon, className, ...rest }) {
  return (
    <Button className={clsx(classes.container, className)} {...rest}>
      <span className={classes.icon}>{icon}</span>
      {label}
    </Button>
  )
}

export default LabelledIconButton
