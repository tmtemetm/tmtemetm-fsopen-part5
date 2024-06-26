import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}${blog.author ? ' by ' + blog.author : ''}?`)) {
      deleteBlog(blog)
    }
  }

  if (!showDetails) {
    return (
      <div className="blog-list-item">
        {blog.title} {blog.author}&nbsp;
        <button onClick={toggleShowDetails}>View</button>
      </div>
    )
  }

  const deleteButton = user.username === blog.user.username
    ? (
      <div onClick={handleDelete}>
        <button>Remove</button>
      </div>
    )
    : null

  return (
    <div className="blog-list-item">
      <div>
        {blog.title} {blog.author}&nbsp;
        <button onClick={toggleShowDetails}>Hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes}&nbsp;
        <button onClick={() => likeBlog(blog)}>Like</button>
      </div>
      <div>{blog.user.name}</div>
      {deleteButton}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
