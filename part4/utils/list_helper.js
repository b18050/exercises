const dummy = (blogs) => {
  return 1;
}

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
	console.log(result)
	return (result);
}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}