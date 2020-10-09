import React from 'react'
import clsx from 'clsx'

import Clickable from './Clickable'
import classes from './ListItem.module.css'

function ListItem ({
  className,
  selected,
  clickable,
  component = 'li',
  ...rest
}) {
  const rootClassName = clsx(
    className,
    classes.root,
    {
      [ classes.selected ]: selected,
      [ classes.clickable ]: clickable
    }
  )

  if (clickable) {
    return (
      <Clickable
        component="li"
        className={rootClassName}
        {...rest}
      />
    )
  }

  return (
    <li
      classsName={rootClassName}
      {...rest}
    />
  )
}

export default ListItem
