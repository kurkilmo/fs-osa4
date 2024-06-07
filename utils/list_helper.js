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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Convert authors into a 'dictionary':
  let authors = blogs.map(blog => blog.author).reduce(
    (obj, auth) => ({ ...obj, [auth]: 0 }), {}
  )
  blogs.forEach(blog => authors[blog.author] += 1)  // Find blog counts for authors

  // Convert to list, sort and get last:
  const author = Object.entries(authors).sort((a, b) => (a[1] - b[1])).pop()
  return {
    'author': author[0],
    'blogs': author[1]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  let authors = blogs.map(blog => blog.author).reduce(
    (obj, auth) => ({ ...obj, [auth]: 0 }), {}
  )

  blogs.forEach(blog => authors[blog.author] += blog.likes)  // Find likes for authors
  const mostLikedAuthor = Object.entries(authors).sort(
    (a, b) => (a[1] - b[1])
  ).pop()

  return {
    'author': mostLikedAuthor[0],
    'likes': mostLikedAuthor[1]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}