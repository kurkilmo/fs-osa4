const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '6664bd8cc49d5eea90e0245e',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '6664bd8cc49d5eea90e02460',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '6664bd8cc49d5eea90e02460',
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '6664bd8cc49d5eea90e0245e',
    username: 'user1',
    name: 'user 1',
    password: 'salasana1',
    passwordHash: '$2b$10$XSECh3q4PKao7WK58EaBE.D3di5YTvXk7kpxxjeYI1NL81/g.gCbu',
    blogs: [],
    __v: 0
  },
  {
    _id: '6664bd8cc49d5eea90e02460',
    username: 'user2',
    name: 'user 2',
    password: 'salasana2',
    passwordHash: '$2b$10$3RL1Pe1.ny5fA5fOpEENPeWO4Q1MXsz8C.4ulfsPptyubkm2DrFiG',
    blogs: [],
    __v: 0
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}