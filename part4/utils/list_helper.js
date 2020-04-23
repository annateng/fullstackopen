const _ = require('lodash')

/** SAMPLE USER OBJECTS TO USE */
const initialUsers = [
  {
    username: 'mark',
    password: 'password123',
    name: 'mark'
  },
  {
    username: 'ilovetoeatcock',
    password: 'hellogorgeous',
    name: 'steve'
  } ,
  {
    username: 'telletubylover12345',
    password: 'f83830FKT?29!',
    name: 'kreashawn'
  }
]

/** SAMPLE BLOG OBJECTS TO USE */
const listWithOneBlog = [
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const biggerList = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
]

const dummy = () => 1

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, 'likes')
}

// returns object showing author with most blogs
const mostBlogs = (blogs) => {

  let countsByAuthor = _(blogs)
    .countBy('author')
  
  let maxAuthor = countsByAuthor
    .toPairs()
    .maxBy(_.last)[0]

  return {
    author: maxAuthor,
    blogs: countsByAuthor.value()[maxAuthor]
  }

}

// returns object showing author with most likes
const mostLikes = (blogs) => {
  const sums = _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      'author': author,
      'likes': _.sumBy(blogs, 'likes') 
    }))
    .maxBy('likes')

  return sums

}

module.exports = {
  listWithOneBlog,
  biggerList,
  initialUsers,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes }