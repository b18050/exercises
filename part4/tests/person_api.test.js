const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [ 
  { 
    title: 'React patterns', 
    author: 'Michael Chan', 
    url: 'https://reactpatterns.com/', 
    likes: 7, 
    
  },       
  { 
    title: 'Canonical string reduction', 
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12, 
  }, 
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/) 
})

test('all notes are returned', async () => {
    
  const response = await api.get('/api/blogs')
  const len =  response.body.length
  expect(len).toBe(initialBlogs.length)
})
  
test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)
  const authors = response.body.map(r => r.author)
  
  expect(authors).toContain(
    'Michael Chan'
  )
})



afterAll(() => {
  mongoose.connection.close()
})

// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')

// const api = supertest(app)

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })



// afterAll(() => {
//   mongoose.connection.close()
// })