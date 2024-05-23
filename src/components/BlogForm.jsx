import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:&nbsp;
        <input
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div>
        Author:&nbsp;
        <input
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:&nbsp;
        <input
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
        />
      </div>
      <button type="submit">
        Create
      </button>
    </form>
  )
}

export default BlogForm
