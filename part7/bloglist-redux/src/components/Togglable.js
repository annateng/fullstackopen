import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleNewBlog } from '../reducers/displayReducer'
import { Button } from '@material-ui/core'

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
        <Button variant='outlined' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable