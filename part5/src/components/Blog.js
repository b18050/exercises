import React ,{ useState }from 'react'

const Blog = ({ blog , handleLikes, handleRemove, user }) => {

  const [isVisible, setIsVisible] = useState(false)

  const handleIsVisible = () => {
    console.log('showing blog details')
    console.log(blog)
    setIsVisible(!isVisible)
  }

  const blogStyle = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 0.2,
    marginBottom: 2
  }

  const ShowBlogDetails = ({ blog, handleLikeClicks, handleRemoveClick }) => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleIsVisible}> hide </button>
      <p> {blog.url} </p>
      <p> likes {blog.likes} <button id='like-button' onClick={handleLikeClicks}> like </button> </p>
      {blog.author}
      {user.username === (blog.user && blog.user.username) ? <button onClick={handleRemoveClick}> remove </button> : null }
    </div>
  )

  const ShowBlog = ({ blog }) => (
    <div style = {blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleIsVisible}> view </button>
    </div>
  )

  const handleLikeClicks = e => {
    e.stopPropagation()
    handleLikes(blog.id)
  }

  const handleRemoveClick = e => {
    e.stopPropagation()
    const remove = window.confirm(`remove blog ${blog.title}?`)
    if (remove) {
      handleRemove(blog.id)
    }
  }

  return (
    <div className = 'blog'>
      {!isVisible && <ShowBlog blog={blog} />}
      {isVisible && <ShowBlogDetails blog={blog} handleLikeClicks={handleLikeClicks} handleRemoveClick={handleRemoveClick } />}
    </div>

  )

}


export default Blog
