const reducer = (state = '', action) => {
  switch(action.type) {
    case 'DISPLAY': {
      return action.data.notification
    }
    case 'REMOVE': return ''
    default: return state
  }
}

export const setNotification = (notification, timeOut) => {
  return dispatch => {
    dispatch({
      type: 'DISPLAY',
      data: { notification }
    })
    setTimeout(() => {
      dispatch({ type: 'REMOVE' })
    }, timeOut * 1000)
  }
}

export default reducer