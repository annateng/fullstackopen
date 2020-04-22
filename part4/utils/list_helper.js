const dummy = () => 1

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum += blog.likes, 0)

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))

  return blogs.filter(blog => blog.likes === maxLikes)[0] // if multiple, just return 1
}

module.exports = { dummy, totalLikes, favoriteBlog }