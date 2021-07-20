const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('HTTP POST TESTS', () => {
    let loggedInToken = ""
    beforeAll(async () => {
        await User.deleteMany({})
        const tUser = await new User({
            username: "Tester",
            name: "Jaakko Testaaja",
            passwordHash: await bcrypt.hash("perfectpassword", 10)
        }).save()
        const userForToken = { name: tUser.name, username: tUser.username, id: tUser.id }
        loggedInToken = jwt.sign(userForToken, process.env.SECRET)
        return loggedInToken
    })

    test('HTTP POST works (lenght of blogs increases by one)', async () => {
    const blogs = await api.get('/api/blogs')
    const testBlog = 
    {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
    }
    await api.post('/api/blogs').set("Authorization", `bearer ${loggedInToken}`).send(testBlog).expect(200).expect('Content-Type', /application\/json/)
    blogsAfterPost = await api.get('/api/blogs')
    expect(blogs.body.length).toBe(blogsAfterPost.body.length - 1)
  })
  
  test('HTTP POST if blog has not set likes, likes are set to 0', async () => {
    const testBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    }
  
    await api.post('/api/blogs').set("Authorization", `bearer ${loggedInToken}`).send(testBlog)
    const blogs = await api.get('/api/blogs')
    const latestBlog = blogs.body.pop()
    expect(latestBlog.likes).toBe(0)
  })
  
  test('HTTP POST if title or url not defined, return 400 "Bad Request"', async () => {
    const testBlogs = [
    {
      _id: "5a422bc61b54a676234d17fc",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0    
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      likes: 2,
      __v: 0
    }]
    await api
      .post('/api/blogs').set("Authorization", `bearer ${loggedInToken}`).send(testBlogs[0])
      .expect(400)
  
    await api
      .post('/api/blogs').set("Authorization", `bearer ${loggedInToken}`).send(testBlogs[1])
      .expect(400)
  })
  
  test('HTTP DELETE works', async () => {
    const testBlog = {
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
    }
    
    await api.post('/api/blogs').set("Authorization", `bearer ${loggedInToken}`).send(testBlog)
    const blogs = await api.get('/api/blogs')
    await api.delete(`/api/blogs/${blogs.body.pop().id}`).set("Authorization", `bearer ${loggedInToken}`).expect(204)
  })

  test('HTTP POST returns 401 Unauthorized if no valid token', async () => {
      const testBlog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html"
      }
      await api.post('/api/blogs').send(testBlog).expect(401)
  })
})

afterAll(() => {
    mongoose.connection.close()
})