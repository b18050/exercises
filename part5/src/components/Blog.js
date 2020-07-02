import React ,{ useState }from 'react'

const Blog = ({ blog , handleLikes}) => {
  
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

  const ShowBlogDetails = ({blog, handleLikes}) => (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={handleIsVisible}> hide </button>
      <p> {blog.url} </p>
      <p> likes {blog.likes} <button onClick={handleLikes}> like </button> </p>
      {blog.author}
    </div>
  )

  const ShowBlog = ({blog}) => (
    <div style = {blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleIsVisible}> view </button>
    </div>
  )

  return (
    <div style={blogStyle}>
      {!isVisible && <ShowBlog blog={blog} />}
      {isVisible && <ShowBlogDetails blog={blog} handleLikes={handleLikes} />}
    </div>
   
  )
  
}


export default Blog
