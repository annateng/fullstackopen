const userReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_USER': return action.data.user
  case 'CLEAR_USER': return {}
  default: return state
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: { user }
  }
}

export const clearUser = () => {
  return {
    type: 'CLEAR_USER'
  }
}

export default userReducer