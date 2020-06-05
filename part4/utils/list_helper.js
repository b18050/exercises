const _ = require('lodash')
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  const favblog = blogs.reduce((prev,current) => (prev.likes > current.likes) ? prev : current)
  const result = {
    title: favblog.title,
    author: favblog.author,
    likes: favblog.likes,
  }
  return (result)
}

const mostBlogs = (blogs) => {
	
  const mostblog = _.reduce(blogs, (countBlog, blog) => {
    countBlog[blog.author] = ++countBlog[blog.author] || 1 
    return countBlog
  },{})
	
  let author = 'X'
  let maxblogs = 0
  _.forIn(mostblog,(value,key) => {
    if(maxblogs < value){
      maxblogs = value
      author = key
    }	
    // console.log(`${key}: ${value}`)
  })
  // console.log(maxblogs)
  // console.log(author)
  const result ={author,blogs:maxblogs}
  // console.log(result)
  return result
}

const mostLikes = (blogs) => {
  const mostlike = _.reduce(blogs, (countLike, blog) => {
    countLike[blog.author] = countLike[blog.author]+blog.likes || blog.likes 
    return countLike
  },{})
  console.log(mostlike)

  let author = 'X'
  let likes = 0
  _.forIn(mostlike,(value,key) => {
    if(likes < value) {
      likes = value
      author = key
    }	
  })
  const result ={author,likes}
  return result
}
module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}