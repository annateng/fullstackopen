const listHelper = require('../utils/list_helper')


/** ******** BEGIN TESTS ************ */
test ('dummy returns one', () => {
  const blogs = []

  expect(listHelper.dummy(blogs)).toBe(1)
})

describe('total likes', () => {
  // expect totalLikes of empty list to be zero
  test ('of empty list is 0', () => {expect(listHelper.totalLikes([])).toBe(0)})

  // expect totalLikes of list with one element to be likes of that blog
  test ('list with one blog = blog.likes', () => {
    expect(listHelper.totalLikes(listHelper.listWithOneBlog)).toBe(listHelper.[0].likes)
  })

  // bigger list
  test ('list with 3 elements', () => {
    expect(listHelper.totalLikes(biggerList)).toBe(biggerList.reduce((sum, blog) => sum += blog.likes, 0))
  })
})

describe ('favorite blog', () => {
  // favorite of zero blogs is undefined
  test ('of empty list is undefined', () => {
    expect(listHelper.favoriteBlog([])).toBeUndefined()
  })

  // favorite of one blog is that blog
  test ('of one blog is that blog', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  // of biggerList is [2]
  test ('of multiple blogs', () => {
    expect(listHelper.favoriteBlog(biggerList)).toEqual(biggerList[2])
  })
})

// max blogs
test ('max blogs test', () => {
  expect(listHelper.mostBlogs(biggerList)).toEqual(
    {
      author: 'Robert C. Martin',
      blogs: 3
    }
  )
})

// most likes by author
test ('most likes by author', () => {
  expect(listHelper.mostLikes(biggerList)).toEqual(
    {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
  )
})