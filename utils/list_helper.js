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

module.exports = {
  dummy,
  totalLikes
}