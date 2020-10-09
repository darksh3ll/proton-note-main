import React from 'react'
import clsx from 'clsx'

import classes from './List.module.css'

function List ({
  className,
  selected,
  component,
  ordered,
  ...rest
}) {
  const rootClassName = clsx(
    className,
    classes.root
  )

  const Component = component || (ordered ? 'ol' : 'ul')

  return <Component className={rootClassName} {...rest} />
}

export default List
