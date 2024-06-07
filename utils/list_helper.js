const exampleBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
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
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  }
]

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

  // Convert to list, sort and return last:
  const authorList = Object.entries(authors)
  return authorList.sort((a, b) => (a[1] - b[1])).pop()[0]
}

module.exports = {
  exampleBlogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}