import React ,{ useState }from 'react'

const Blog = ({ blog }) => {
  
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

  const handleLikes = () => {
    console.log("log is clicked")
  }

  const ShowBlogDetails = ({blog}) => (
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
      {isVisible && <ShowBlogDetails blog={blog} />}
    </div>
   
  )
  
}


export default Blog
