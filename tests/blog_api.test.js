const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('note-api', () => {
  test('blogs are in JSON form', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns correct amount of blogs', async () => {
    const resp = await api.get('/api/blogs')
    assert.strictEqual(resp.body.length, helper.initialBlogs.length)
  })

  test('blogs have a property \'id\'', async () => {
    const resp = await api.get('/api/blogs')
    assert(resp.body[0].id)
  })

  test('blogs can be added', async () => {
    const newBlog = {
      title: 'titteli',
      author: 'tuure',
      url: 'http.cat',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInEnd = await helper.blogsInDb()
    assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length + 1)
    const lastBlog = blogsInEnd.pop()
    assert.deepStrictEqual(lastBlog, { id: lastBlog.id, ...newBlog })
  })

  test('unspecified likes are set to 0', async () => {
    const newBlog = {
      title: 'titteli',
      author: 'tuure',
      url: 'http.cat'
    }
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
    assert.strictEqual(result.body.likes, 0)
  })

  test('missing title returns 400', async () => {
    const newBlog = {
      author: 'tuure',
      url: 'http.cat',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsInEnd = await helper.blogsInDb()
    assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length)
  })

  test('missing url returns 400', async () => {
    const newBlog = {
      title: 'titteli',
      author: 'tuure',
      likes: 200
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsInEnd = await helper.blogsInDb()
    assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length)
  })

  test('blogs can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const ids = blogsAtEnd.map(b => b.id)
    assert(!ids.includes(blogToDelete.id))
  })

  test('blogs can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.title = 'Updated title'

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    assert.strictEqual(updatedBlog.body.title, blogToUpdate.title)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})