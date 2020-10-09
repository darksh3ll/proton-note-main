import React from 'react'

import Button from '../atoms/Button'
import Header from '../atoms/Header'

function AppHeader (props) {
  const { editing, onNewNote } = props

  return (
    <Header>
      <Button disabled={editing} type="solid" onClick={onNewNote}>
        New Note
      </Button>
    </Header>
  )
}

export default AppHeader
