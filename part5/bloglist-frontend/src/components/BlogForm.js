import { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  return (
    <div>
      <h1>create new</h1>
      <form onSubmit = {e => {
        handleBlogCreate(e)
        setTitle('')
        setAuthor('')
        setUrl('')
      }}>
                title:
        <input
          id='title'
          type='text'
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        /><br/>
                author:
        <input
          id='author'
          type='text'
          name='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        /><br/>
                url:
        <input
          id='url'
          type='text'
          name='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        /><br/>
        <button id='create-button' type='submit'>create</button>
      </form>

    </div>
  )
}

export default BlogForm