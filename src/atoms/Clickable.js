import React from 'react'

/*
 * A11y helper component to make natively non
 * keyboard-clickable elements keyboard-clickable
 */
function Clickable ({
  component: Component = 'button',
  tabIndex = 0,
  disabled,
  ...rest
}) {
  function handleKeyDown (e) {
    if (disabled) { return }

    if (e.key === 'Enter' && rest.onClick) {
      rest.onClick(e)
    }
  }

  return (
    <Component
      tabIndex={disabled ? -1 : tabIndex}
      onKeyDown={handleKeyDown}
      {...rest}
    />
  )
}

export default Clickable
