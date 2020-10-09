import React from 'react'
import clsx from 'clsx'

import classes from './Button.module.css'

function Button ({
  className,
  color,
  type = 'default',
  ...rest
}) {
  const rootClassName = clsx(
    className,
    classes.root,
    classes[color],
    classes[type],
    { [ classes.disabled ]: rest.disabled }
  )

  return (
    <button className={rootClassName} {...rest} />
  )
}

export default Button
