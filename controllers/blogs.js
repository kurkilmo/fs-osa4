const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    likes: body.likes || 0,
    ...body,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter