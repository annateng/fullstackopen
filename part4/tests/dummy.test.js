const listHelper = require('../utils/list_helper')

/** sample blog arrays to test on */
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const biggerList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }  
]

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
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(listWithOneBlog[0].likes)
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