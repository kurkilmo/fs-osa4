const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
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

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('when list has only one blog is that', () => {
    const fav = listHelper.favoriteBlog([blogs[0]])
    assert.strictEqual(fav.title, 'React patterns')
    assert.strictEqual(fav.likes, 7)
  })

  test('of a bigger list is calculated right', () => {
    const fav = listHelper.favoriteBlog(blogs)
    assert.strictEqual(fav.title, 'Canonical string reduction')
    assert.strictEqual(fav.likes, 12)
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('when list has only one author is the author of that', () => {
    assert.strictEqual(listHelper.mostBlogs([blogs[0]]).author, 'Michael Chan')
    assert.strictEqual(listHelper.mostBlogs([blogs[0]]).blogs, 1)
  })

  test('of a bigger list is returned right', () =>  {
    assert.strictEqual(listHelper.mostBlogs(blogs).author, 'Robert C. Martin')
    assert.strictEqual(listHelper.mostBlogs(blogs).blogs, 3)
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('when list has one entry is that entry', () => {
    assert.strictEqual(listHelper.mostLikes([blogs[0]]).author, blogs[0].author)
    assert.strictEqual(listHelper.mostLikes([blogs[0]]).likes, blogs[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    assert.strictEqual(listHelper.mostLikes(blogs).author, 'Edsger W. Dijkstra')
    assert.strictEqual(listHelper.mostLikes(blogs).likes, 17)
  })
})