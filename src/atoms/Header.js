import React from 'react'
import clsx from 'clsx'

import classes from './Header.module.css'

function Header ({ className, ...rest }) {
  const rootClassName = clsx(classes.root, className)

  return (
    <header className={rootClassName} {...rest} />
  )
}

export default Header
