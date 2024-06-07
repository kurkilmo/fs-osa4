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

  after(async () => {
    await mongoose.connection.close()
  })
})