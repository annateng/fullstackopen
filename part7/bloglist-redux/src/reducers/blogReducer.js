const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS': {
    for (let blog of action.data.blogs) blog.showDetail = false
    return [...action.data.blogs]
  }
  case 'CREATE_BLOG': {
    action.data.blog.showDetail = false
    return [...state, action.data.blog]
  }
  case 'UPDATE_BLOG': {
    const blogToUpdate = state.find(b => b.id === action.data.blog.id)
    const updatedBlog = {...blogToUpdate, likes: action.data.blog.likes}
    return [...state.filter(b => b.id !== action.data.blog.id), updatedBlog]
  }
  case 'DELETE_BLOG': return [...state.filter(b => b.id !== action.data.id)]
  case 'TOGGLE_BLOG_DETAIL': {
    const blogToUpdate = state.find(b => b.id === action.data.blog.id)
    const updatedBlog = { ...blogToUpdate, showDetail: !blogToUpdate.showDetail }
    return [...state.filter(b => b.id !== action.data.blog.id), updatedBlog]
  }
  default: return state
  }
}

export const initializeBlogs = blogs => {
  return {
    type: 'INITIALIZE_BLOGS',
    data: { blogs }
  }
}

export const createBlog = blog => {
  return {
    type: 'CREATE_BLOG',
    data: { blog }
  }
}

export const updateBlog = blog => {
  return {
    type: 'UPDATE_BLOG',
    data: { blog }
  }
}

export const deleteBlog = id => {
  return {
    type: 'DELETE_BLOG',
    data: { id }
  }
}

export const toggleBlogDetail = blog => {
  return {
    type: 'TOGGLE_BLOG_DETAIL',
    data: { blog }
  }
}

export default blogReducer