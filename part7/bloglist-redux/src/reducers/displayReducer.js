const displayReducer = (state = { newBlog: false }, action) => {
  switch (action.type) {
  case 'TOGGLE_NEW_BLOG': return { ...state, newBlog: !state.newBlog }
  default: return state
  }
}

export const toggleNewBlog = () => {
  return {
    type: 'TOGGLE_NEW_BLOG'
  }
}

export default displayReducer