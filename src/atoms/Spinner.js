import React from 'react'
import clsx from 'clsx'

import Icon from './Icon'
import classes from './Spinner.module.css'

function Spinner ({ className, ...rest }) {
  const rootClassName = clsx(
    className,
    'fas fa-spinner',
    classes.root
  )

  return <Icon className={rootClassName} {...rest} />
}

export default Spinner
