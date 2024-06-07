const dummy = (blogs_ignored) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeSum = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(likeSum, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  let favorite = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favorite.likes) favorite = blog
  })
  return favorite
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}