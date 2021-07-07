const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(o => o.toJSON())
}

const testToken = async () => {
}

module.exports = { usersInDb }