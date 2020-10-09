import React from 'react'
import clsx from 'clsx'

import classes from './Icon.module.css'

function Icon ({
  className,
  size = 'medium',
  color,
  ...rest
}) {
  const rootClassName = clsx(
    classes.root,
    classes[size],
    classes[color],
    className
  )

  return <i className={rootClassName} {...rest} />
}

export default Icon
