import { useState } from "react"

const Blog = ({ blog, likeBlog, deleteBlog }) => {
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
      <div onClick={handleDelete}>
        <button>Remove</button>
      </div>
    </div>
  )
}

export default Blog
