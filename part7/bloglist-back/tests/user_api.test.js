const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('../utils/test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is one user at database', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secure', 10)
        const user = new User({ username: 'root', passwordHash: 'password', name: 'name' })
        await user.save()
    })

    test('new user created with new username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'klaurila',
            name: 'Konsta Laurila',
            password: 'tosisalainen'
        }
        await api
        .post('/api/users/')
        .send(newUser)
        .expect(200).expect('Content-Type', /application\/json/)
    })

    test('user creation fails with invalid password or username', async() => {
        const usersAtStart = await helper.usersInDb()
        const testUsers = [
        {
            username: 't',
            name: 't wontwork',
            password: 'supersecretandvalid'
        },
        {
            username: 'ValidName',
            name: 'Cant Password',
            password: 'd'
        }
        ]
        await api.post('/api/users').send(testUsers[0]).expect(400)
        await api.post('/api/users').send(testUsers[1]).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user creation fails with status if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const nUser = {
            username: 'root',
            name: 'Superuser',
            password: 'secret'
        }

        const res = await api.post('/api/users')
        .send(nUser).expect(400).expect('Content-Type', /application\/json/)

        expect(res.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
  })