const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  if (!username || !password) return response.status(400).json({ error: 'provide username and password' })

  const user = await User.findOne({ username })
  if (user === null) return response.status(401).json({
    error: 'invalid username'
  })

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) return response.status(401).json({
    error: 'invalid password'
  })

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken,
    process.env.SECRET,
    { expiresIn: 3600 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter