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

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  
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
  
test('a specific note is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)
  const authors = response.body.map(r => r.author)
  
  expect(authors).toContain(
    'Michael Chan'
  )
})

test('id is defined unqiuley for returned blogs', async () =>{
  const response = await api.get('/api/blogs')
  const _ids = response.body.map(r => r.id)
  expect(_ids).toBeDefined()
})

test('likes are deafault to 0  if no likes are present' , async() => {
  const newBlog = {
    title: 'I am King With 0 likes',
    author: ' Jkaciy Machelenghen',
    url: 'https://myblog.com'
  }

  const savedBlog = await api.post('/api/blogs').send(newBlog)
  expect(savedBlog.body).toHaveProperty('likes',0)
})

afterAll(() => {
  mongoose.connection.close()
})