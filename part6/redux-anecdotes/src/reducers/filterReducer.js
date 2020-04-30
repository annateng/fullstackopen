export const setFilter = filter => {
  return {
    type: 'FILTER',
    data: { filter }
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER': return action.data.filter
    default: return state
  }
}

export default reducer