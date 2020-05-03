const messageReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_MESSAGE': {
    if (state.timeoutId) clearTimeout(state.timeoutId)
    return { message: action.data.message, timeoutId: action.data.timeoutId}
  }
  case 'CLEAR': return { message: '', timeoutId: null }
  default: return state
  }
}

export const setMessage = (message, timeout) => {
  if (!timeout) timeout = 5000 // default timeout 5seconds
  return dispatch => {
    const timeoutId =
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, timeout)

    dispatch({
      type: 'SET_MESSAGE',
      data: { message, timeoutId}
    })
  }
}

export default messageReducer