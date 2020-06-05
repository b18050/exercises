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
		countBlog[blog.author] = ++countBlog[blog.author] || 1 ;
		return countBlog
	},{})
	
	console.log(typeof(mostblog))
	// console.log(_.map(_.sortBy(mostblog, ''), _.values));

	return 1
}
module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}