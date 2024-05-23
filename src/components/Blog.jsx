import { useState } from "react"

const Blog = ({ blog }) => {
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
        {blog.title}&nbsp;
        <button onClick={toggleShowDetails}>Hide</button>
      </div>
      <div>{blog.url}</div>
      <div>
        Likes: {blog.likes}&nbsp;
        <button>Like</button>
      </div>
      <div>{blog.author}</div>
    </div>
  )
}

export default Blog
