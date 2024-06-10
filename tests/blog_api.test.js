const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

const api = supertest(app)

let token = ''
const login = async (index) => {
  const result = await api
    .post('/api/login')
    .send({
      username: `${helper.initialUsers[index].username}`,
      password: `${helper.initialUsers[index].password}`
    })
  token = `Bearer ${result.body.token}`
}

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await login(0)

  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('blog-api', () => {
  describe('getting blogs', () => {
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
  })

  describe('adding blogs', () => {
    test('blogs can be added', async () => {
      const newBlog = {
        title: 'titteli',
        author: 'tuure',
        url: 'http.cat',
        likes: 200
      }
      await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsInEnd = await helper.blogsInDb()
      assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length + 1)
      const lastBlog = blogsInEnd.pop()
      assert.deepStrictEqual(lastBlog, { id: lastBlog.id, user: lastBlog.user, ...newBlog })
    })

    test('unspecified likes are set to 0', async () => {
      const newBlog = {
        title: 'titteli',
        author: 'tuure',
        url: 'http.cat'
      }
      const result = await api
        .post('/api/blogs')
        .set('Authorization', token)
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
        .set('Authorization', token)
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
        .set('Authorization', token)
        .send(newBlog)
        .expect(400)

      const blogsInEnd = await helper.blogsInDb()
      assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length)
    })

    test('no token returns 401', async () => {
      const blog = {
        title: 'titteli',
        author: 'tuure',
        url: 'http.cat',
        likes: 200
      }

      const result = await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)

      const blogsInEnd = await helper.blogsInDb()
      assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length)
      assert(result.body.error.includes('token missing or invalid'))
    })
  })

  describe('deleting blogs', () => {
    test('blogs can be deleted with correct auth', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const ids = blogsAtEnd.map(b => b.id)
      assert(!ids.includes(blogToDelete.id))
    })

    test('blogs aren\'t deleted with wrong auth', async () => {
      await login(1)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const result = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', token)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
      assert(result.body.error.includes('you don\'t have permission to modify this blog'))
    })
  })

  describe('updating blogs', () => {
    test('blogs can be updated with correct auth', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.title = 'Updated title'

      const updatedBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .set('Authorization', token)
        .send(blogToUpdate)
        .expect(200)

      assert.strictEqual(updatedBlog.body.title, blogToUpdate.title)
      assert.strictEqual(updatedBlog.body.author, blogToUpdate.author)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})