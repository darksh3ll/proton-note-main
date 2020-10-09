import React from 'react'

import ListItem from '../atoms/ListItem'
import Icon from '../atoms/Icon'
import classes from './NoteListItem.module.css'
import clsx from 'clsx'

function NoteListItem ({
  encrypted,
  title,
  ...rest
}) {
  return (
    <ListItem clickable className={classes.listItem} {...rest}>
      {title}

      {
        encrypted
          ? (
            <Icon
              className={clsx(classes.listItemIcon, 'fas', 'fa-lock')}
              size="small"
            />
          ) : (
            <Icon
              className={clsx(classes.listItemIcon, 'fas', 'fa-unlock')}
              size="small"
              color="purple"
            />
          )
      }
    </ListItem>
  )
}

export default React.memo(NoteListItem)
