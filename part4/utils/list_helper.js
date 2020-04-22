const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, 'likes')
}

const mostBlogs = (blogs) => {
  let counts = _.countBy(blogs, 'author')
  let maxAuthor = _(blogs.map(blog => blog.author)).max()

  return {
    author: maxAuthor,
    blogs: counts[maxAuthor]
  }

}

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
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes }