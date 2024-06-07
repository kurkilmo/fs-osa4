const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []
    assert.strictEqual(listHelper.totalLikes(blogs), 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const blogs = [{ 'likes':7 }]
    assert.strictEqual(listHelper.totalLikes(blogs), 7)
  })
  test('of a bigger list is calculated right', () => {
    const blogs = [{ 'likes':7 }, { 'likes': 10 }, { 'likes': 3 }]
    assert.strictEqual(listHelper.totalLikes(blogs), 20)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const blogs = []
    assert.strictEqual(listHelper.favoriteBlog(blogs), null)
  })
  test('when list has only one blog is that', () => {
    const blogs = [{ 'title': 'titteli', 'likes': 8 }]
    const fav = listHelper.favoriteBlog(blogs)
    assert.strictEqual(fav.title, 'titteli')
    assert.strictEqual(fav.likes, 8)
  })
  test('of a bigger list is calculated right', () => {
    const blogs = [
      { 'title': 'titteli1', 'likes':7 },
      { 'title': 'titteli2','likes': 10 },
      { 'title': 'titteli3','likes': 3 }
    ]
    const fav = listHelper.favoriteBlog(blogs)
    assert.strictEqual(fav.title, 'titteli2')
    assert.strictEqual(fav.likes, 10)
  })
})