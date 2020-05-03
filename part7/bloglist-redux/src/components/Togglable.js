import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNewBlog } from '../reducers/displayReducer'

// props.buttonLabel, props.children
const Togglable = props => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.display.newBlog)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => { dispatch(toggleNewBlog()) }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable