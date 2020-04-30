export const displayNotification = notification => {
  return {
    type: 'DISPLAY',
    data: { notification }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE'
  }
}

const reducer = (state = '', action) => {
  switch(action.type) {
    case 'DISPLAY': {
      return action.data.notification
    }
    case 'REMOVE': return ''
    default: return state
  }
}

export default reducer