const reducer = (state = {}, action) => {
  switch(action.type) {
    case 'DISPLAY': {
      if (state.timeoutId) clearTimeout(state.timeoutId)
      return {
        message: action.data.notification,
        timeoutId: action.data.timeoutId
      }
    }
    case 'REMOVE': return {}
    default: return state
  }
}

export const setNotification = (notification, timeout) => {
  return dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'REMOVE' })
    }, timeout * 1000)

    dispatch({
      type: 'DISPLAY',
      data: { 
        notification,
        timeoutId 
      }
    })
    
  }
}

export default reducer