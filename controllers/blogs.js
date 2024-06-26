const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { modifyVerification, userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    likes: body.likes || 0,
    user: user._id,
    ...body,
  })

  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)  // lisätään blogi käyttäjälle
  await user.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', userExtractor, modifyVerification, async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    body,
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog)
})

module.exports = blogRouter