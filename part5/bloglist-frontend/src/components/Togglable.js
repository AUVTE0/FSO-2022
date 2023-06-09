import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible? '': 'none' }
  const hideWhenVisible = { display: visible? 'none': '' }

  const toggleVisible = () => setVisible(!visible)
  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  return(
    <div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.showButtonText}</button>
      </div>
    </div>

  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  showButtonText: PropTypes.string.isRequired
}

export default Togglable