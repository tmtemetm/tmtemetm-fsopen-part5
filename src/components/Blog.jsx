import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
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
        <button onClick={() => handleLike(blog)}>Like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )
}

export default Blog
