const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { title: 1, url: 1 , author: 1})
        response.json(users.map(u => u.toJSON()))
    } catch (exception) {
        next(exception)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const body = request.body

    if (!body.password || body.password.length < 3){
        return response.status(400).json({error: 'Invalid password'})
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    try {
        const savedUser = await user.save()    
        response.json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter