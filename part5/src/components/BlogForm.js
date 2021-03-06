import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newauthor , setNewAuthor] = useState('')
  const [newtitle, setNewTitle] = useState('')
  const [newurl, setNewUrl] = useState('')

  const handleTitleChange = (event) => { setNewTitle(event.target.value)}
  const handleAuthorChange = (event) => { setNewAuthor(event.target.value)}
  const handleUrlChange = (event) => { setNewUrl(event.target.value)}

  const addBlog = (event) => {
    event.preventDefault()
    createBlog ({
      title : newtitle,
      author : newauthor,
      url : newurl
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')

  }
  return(
    <div className="formDiv">
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
                    title <input id='newtitle' value={newtitle} onChange={handleTitleChange} />
        </div>
        <div>
                    author <input id='newauthor' value={newauthor} onChange={handleAuthorChange} />
        </div>
        <div>
                    url <input id='newurl' value={newurl} onChange={handleUrlChange} />
        </div>

        <button id='save-blog' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm